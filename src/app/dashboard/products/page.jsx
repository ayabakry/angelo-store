"use client";

import { useMemo, useRef, useReducer, useCallback, useState } from "react";
import useDashboardProducts from "@/app/hooks/useDashboardProducts.js";

const initialForm = {
  name: "",
  price: "",
  image: "",
  description: "",
  discountPercentage: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_FORM":
      return action.payload;
    case "RESET":
      return initialForm;
    case "SET_IMAGE_FILE":
      return { ...state, imageFile: action.file, imagePreview: action.preview };
    case "CLEAR_IMAGE":
      return { ...state, imageFile: null, imagePreview: "" };
    default:
      return state;
  }
};

export default function ProductsDashboardPage() {
  const [formState, dispatch] = useReducer(formReducer, initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);

  const { products, pageLoading, refetch } = useDashboardProducts();

  const isEditing = useMemo(() => !!editingId, [editingId]);

  const filteredProducts = products.filter((product) => {
    const text = `${product.name} ${product.description}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return dispatch({ type: "CLEAR_IMAGE" });
    const preview = URL.createObjectURL(file);
    dispatch({ type: "SET_IMAGE_FILE", file, preview });
  };

  const resetForm = () => {
    dispatch({ type: "RESET" });
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── EDIT ──────────────────────────────────────────────────────────────────
  const handleEdit = (product) => {
    dispatch({
      type: "SET_FORM",
      payload: {
        name: product.name || "",
        price: product.price ?? "",
        image: product.image || "",
        description: product.description || "",
        discountPercentage: product.discountPercentage ?? "",
        imageFile: null,
        imagePreview: "",
      },
    });
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── DELETE ─────────────────────────────────────────────────────────────────
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        showNotification("error", data.message || "Delete failed");
        return;
      }

      // If the deleted product was being edited, reset the form
      if (editingId === productId) resetForm();

      await refetch();
      showNotification("success", "Product deleted");
    } catch (err) {
      console.error(err);
      showNotification("error", "Something went wrong");
    }
  };

  // ── SUBMIT (Add + Edit) ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.name?.trim()) {
      showNotification("error", "Please enter product name");
      return;
    }

    if (!formState.price) {
      showNotification("error", "Please enter product price");
      return;
    }

    const discount = Number(formState.discountPercentage || 0);
    if (discount < 0 || discount > 100) {
      showNotification("error", "Discount must be between 0 and 100");
      return;
    }

    setLoading(true);

    try {
      let imagePath = formState.image || "";

      if (formState.imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", formState.imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
          showNotification("error", uploadData.message || "Upload failed");
          setLoading(false);
          return;
        }

        imagePath = uploadData.filePath;
      }

      const payload = {
        name: formState.name,
        price: Number(formState.price),
        image: imagePath,
        description: formState.description,
        discountPercentage: Number(formState.discountPercentage || 0),
      };

      // PUT for edit, POST for add
      const res = await fetch(
        isEditing ? `/api/products/${editingId}` : "/api/products",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!data.success) {
        showNotification("error", data.message);
        return;
      }

      await refetch();
      resetForm();
      showNotification(
        "success",
        isEditing ? "Product updated" : "Product added",
      );
    } catch (err) {
      console.error(err);
      showNotification("error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {notification && (
        <div
          className={`mb-4 p-3 rounded text-sm font-medium ${notification.type === "error" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
        >
          {notification.message}
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm text-gray-400">Dashboard</p>
        <h1 className="text-2xl font-bold">Products Management</h1>
        <p className="text-gray-400">Manage your store products easily.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* FORM */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>
            {isEditing && (
              <button
                onClick={resetForm}
                className="text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            )}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Product name"
              value={formState.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              value={formState.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />

            <input
              name="discountPercentage"
              type="number"
              placeholder="Discount %"
              value={formState.discountPercentage}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />

            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleImageSelect}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="bg-gray-700 px-4 py-2 rounded"
            >
              Upload Image
            </button>

            {(formState.imagePreview || formState.image) && (
              <img
                src={formState.imagePreview || formState.image}
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}

            <textarea
              name="description"
              rows="4"
              placeholder="Description"
              value={formState.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-semibold disabled:opacity-50"
            >
              {loading ? "Saving..." : isEditing ? "Save" : "Add"}
            </button>
          </form>
        </div>

        {/* PRODUCTS */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Products</h2>
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600 text-sm"
            />
          </div>

          {pageLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid gap-4">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-gray-700 p-4 rounded-xl">
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{product.name}</h3>

                        {product.discountPercentage > 0 && (
                          <span className="text-red-500 text-xs font-bold px-2 py-1 bg-red-500/10 rounded">
                            -{product.discountPercentage}%
                          </span>
                        )}
                      </div>

                      <div className="text-sm mt-1">
                        {product.discountPercentage > 0 ? (
                          <>
                            <span className="line-through text-gray-400 mr-2">
                              ${product.price}
                            </span>
                            <span className="text-green-400 font-bold">
                              $
                              {(
                                product.price *
                                (1 - product.discountPercentage / 100)
                              ).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span>${product.price}</span>
                        )}
                      </div>

                      <p className="text-gray-300 text-sm mt-2">
                        {product.description}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-yellow-500 px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-500 px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

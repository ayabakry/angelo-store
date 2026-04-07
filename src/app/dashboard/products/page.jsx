"use client";

import { useMemo, useRef, useReducer, useCallback, useState } from "react";
import useDashboardProducts from "@/app/hooks/useDashboardProducts.js";
import styles from "./products-dashboard.module.css";

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
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  }, []);

  const handleImageSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) {
      dispatch({ type: "CLEAR_IMAGE" });
      return;
    }
    const preview = URL.createObjectURL(file);
    dispatch({ type: "SET_IMAGE_FILE", file, preview });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET" });
    setEditingId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
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
            showNotification(
              "error",
              uploadData.message || "Image upload failed",
            );
            setLoading(false);
            return;
          }

          imagePath = uploadData.filePath;
        }

        const url = isEditing ? `/api/products/${editingId}` : "/api/products";
        const method = isEditing ? "PUT" : "POST";

        const controller = new AbortController();
        const res = await fetch(url, {
          method,
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            price: Number(formState.price),
            image: imagePath,
            description: formState.description?.trim() || "",
            discountPercentage: Number(formState.discountPercentage || 0),
          }),
        });

        const data = await res.json();

        if (!data.success) {
          showNotification("error", data.message || "Something went wrong");
          setLoading(false);
          return;
        }

        await refetch();
        resetForm();
        showNotification(
          "success",
          isEditing ? "Product updated" : "Product added",
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Submit error:", error);
          showNotification("error", "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [formState, isEditing, editingId, refetch, resetForm, showNotification],
  );

  const handleEdit = useCallback((product) => {
    setEditingId(product._id);
    dispatch({
      type: "SET_FORM",
      payload: {
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
        description: product.description || "",
        discountPercentage: product.discountPercentage || "",
      },
    });
    dispatch({ type: "CLEAR_IMAGE" });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Are you sure you want to delete this product?"))
        return;

      try {
        const controller = new AbortController();
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
          signal: controller.signal,
        });

        const data = await res.json();

        if (!data.success) {
          showNotification("error", data.message || "Delete failed");
          return;
        }

        if (editingId === id) {
          resetForm();
        }

        await refetch();
        showNotification("success", "Product deleted");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Delete error:", error);
          showNotification("error", "Something went wrong");
        }
      }
    },
    [editingId, refetch, resetForm, showNotification],
  );

  return (
    <div className={styles.wrapper}>
      {notification && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      <div className={styles.topBar}>
        <div>
          <p className={styles.eyebrow}>Dashboard</p>
          <h1 className={styles.title}>Products Management</h1>
          <p className={styles.subtitle}>
            Add, update, and manage your store products from one place.
          </p>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h2>{isEditing ? "Edit Product" : "Add New Product"}</h2>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className={styles.secondaryButton}
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formState.price}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>

            <div className={styles.field}>
              <label>Discount (%)</label>
              <input
                type="number"
                name="discountPercentage"
                placeholder="0"
                value={formState.discountPercentage}
                onChange={handleChange}
                min="0"
                max="100"
                step="1"
              />
            </div>

            <div className={styles.field}>
              <label>Product Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => fileInputRef.current?.click()}
              >
                Choose Image From Device
              </button>

              {(formState.imagePreview || formState.image) && (
                <div style={{ marginTop: "12px" }}>
                  <img
                    src={formState.imagePreview || formState.image}
                    alt="Preview"
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              )}
            </div>

            <div className={styles.field}>
              <label>Description</label>
              <textarea
                name="description"
                rows="5"
                placeholder="Write product description"
                value={formState.description}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${styles.mainButton} btn-primary`}
            >
              {loading
                ? isEditing
                  ? "Saving..."
                  : "Adding..."
                : isEditing
                  ? "Save Changes"
                  : "Add Product"}
            </button>
          </form>
        </div>

        <div className={styles.listCard}>
          <div className={styles.cardHeader}>
            <h2>Products List</h2>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {pageLoading ? (
            <p className={styles.emptyText}>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className={styles.emptyText}>No products found.</p>
          ) : (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className={`${styles.productCard} product-card`}
                >
                  <div className={styles.imageBox}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImage}
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                  </div>

                  <div className={styles.productContent}>
                    <div className={styles.productHead}>
                      <h3>{product.name}</h3>
                      {product.discountPercentage > 0 ? (
                        <>
                          <span
                            className={styles.price}
                            style={{
                              textDecoration: "line-through",
                              opacity: 0.6,
                            }}
                          >
                            ${product.price}
                          </span>
                          <span
                            className={styles.price}
                            style={{ color: "#10b981", fontWeight: "bold" }}
                          >
                            $
                            {(
                              product.price *
                              (1 - product.discountPercentage / 100)
                            ).toFixed(2)}
                          </span>
                          <span
                            style={{
                              color: "#ef4444",
                              fontSize: "0.8em",
                              fontWeight: "bold",
                              padding: "2px 6px",
                              backgroundColor: "rgba(239,68,68,0.1)",
                              borderRadius: "4px",
                            }}
                          >
                            -{product.discountPercentage}%
                          </span>
                        </>
                      ) : (
                        <span className={styles.price}>${product.price}</span>
                      )}
                    </div>

                    <p className={styles.description}>
                      {product.description || "No description available."}
                    </p>

                    <div className={styles.actions}>
                      <button
                        onClick={() => handleEdit(product)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
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

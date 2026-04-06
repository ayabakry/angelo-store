"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./products-dashboard.module.css";

const initialForm = {
  name: "",
  price: "",
  image: "",
  description: "",
};

export default function ProductsDashboardPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const isEditing = useMemo(() => !!editingId, [editingId]);

  const fetchProducts = async () => {
    try {
      setPageLoading(true);
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const text = `${product.name} ${product.description}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };

  const handleImageSelect = (e) => {
  const file = e.target.files?.[0];

  if (!file) {
    setImageFile(null);
    setImagePreview("");
    return;
  }

  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));
};

const resetForm = () => {
  setFormData(initialForm);
  setEditingId(null);
  setImageFile(null);
  setImagePreview("");

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return alert("Please enter product name");
    if (!formData.price) return alert("Please enter product price");

    setLoading(true);

    try {
      const url = isEditing ? `/api/products/${editingId}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          price: Number(formData.price),
          image: formData.image.trim(),
          description: formData.description.trim(),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Something went wrong");
        return;
      }

      await fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
  setEditingId(product._id);
  setFormData({
    name: product.name || "",
    price: product.price || "",
    image: product.image || "",
    description: product.description || "",
  });

  setImageFile(null);
  setImagePreview(product.image || "");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Delete failed");
        return;
      }

      if (editingId === id) {
        resetForm();
      }

      await fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.wrapper}>
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
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
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

  {(imagePreview || formData.image) && (
    <div style={{ marginTop: "12px" }}>
      <img
        src={imagePreview || formData.image}
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
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={loading} className={`${styles.mainButton} btn-primary`}>
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
                <div key={product._id} className={`${styles.productCard} product-card`}>
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
                      <span className={styles.price}>${product.price}</span>
                    </div>

                    <p className={styles.description}>
                      {product.description || "No description available."}
                    </p>

                    <p className={styles.pathText}>
                      <strong>Image:</strong> {product.image || "Not provided"}
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
"use client";

import React, { useMemo, useState, useCallback } from "react";
import Product from "./Product";
import ProductDetailsModal from "./ProductDetailsModal";
import useFetchProducts from "@/app/hooks/useFetchProducts.js";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { products, isLoading } = useFetchProducts();

  const categories = useMemo(() => {
    const dbCategories = products
      .map((product) => product.category)
      .filter(Boolean);

    return ["All", ...new Set(dbCategories)];
  }, [products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section id="products" className="py-16 px-4 relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-dark-bg/50"></div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-almarai text-white mb-4 uppercase tracking-wider animate-fade-in-up">
          Our Products
        </h2>

        <div className="w-24 h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue mx-auto mb-8 animate-pulse"></div>

        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`category-btn px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${activeCategory === category
                    ? "active bg-brand-red text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-xl text-white/50">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-opacity duration-300">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Product product={product} onClick={handleProductClick} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-white/50">No products found</p>
          </div>
        )}

        {selectedProduct && (
          <ProductDetailsModal product={selectedProduct} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default Products;
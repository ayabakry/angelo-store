"use client";

import React, { useState } from "react";
import Product from "./Product";
import ProductDetailsModal from "./ProductDetailsModal";

import hoodieImage1 from "../Imgs/Hoodies/Hoodie1.png";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "AngeLo Hoodie",
      description: "Premium hoodie with gaming-inspired design",
      price: "300",
      image: hoodieImage1,
    },
    {
      id: 2,
      name: "AngeLo T-Shirt",
      description: "Comfortable cotton t-shirt with unique graphics",
      price: "150",
      image: hoodieImage1,
    },
    {
      id: 3,
      name: "AngeLo Cap",
      description: "Stylish cap for everyday wear",
      price: "100",
      image: hoodieImage1,
    },
    {
      id: 4,
      name: "AngeLo Jacket",
      description: "Lightweight jacket perfect for any season",
      price: "400",
      image: hoodieImage1,
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center font-almarai text-white mb-12 uppercase tracking-wider">
          Our Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </div>

        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={closeModal}
          />
        )}
      </div>
    </section>
  );
};

export default Products;

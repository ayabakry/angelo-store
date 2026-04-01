"use client";

import React, { useState } from "react";
import Product from "./Product";
import ProductDetailsModal from "./ProductDetailsModal";

import hoodieImage1 from "../Imgs/Hoodies/Hoodie1.png";

// Boys T-Shirts
import gym1TransBlack from "../Imgs/Boys/TShirts/Gym Designs/T-Shirts Designs/Gym1Trans - TBlack.png";
import zed1Gray from "../Imgs/Boys/TShirts/League of Legends Designs/T-Shirts Designs/Boys/Zed1 - TGray.png";

import sungJinWoo1Black from "../Imgs/Boys/TShirts/Solo Leveling Designs/T-Shirts Designs/Boys/Sung JinWoo1 (Black) - TBlack.png";
import sungJinWoo1Gray from "../Imgs/Boys/TShirts/Solo Leveling Designs/T-Shirts Designs/Boys/Sung JinWoo1 (Black) - TGray.png";
import sungJinWoo1White from "../Imgs/Boys/TShirts/Solo Leveling Designs/T-Shirts Designs/Boys/Sung JinWoo1 (Black) - TWhite.png";

import sungJinWoo2Black from "../Imgs/Boys/TShirts/Solo Leveling Designs/T-Shirts Designs/Boys/Sung JinWoo2 - TBlack.png";
import sungJinWoo2White from "../Imgs/Boys/TShirts/Solo Leveling Designs/T-Shirts Designs/Boys/Sung JinWoo2 - TWhite.png";

// Girls T-Shirts
import nezukoPink from "../Imgs/Girls/TShirts/Demon Slayer Designs/T-Shirts Designs/Girls/Nezuko Pink.png";
import tanjiroNezuko from "../Imgs/Girls/TShirts/Demon Slayer Designs/T-Shirts Designs/Girls/Tanjiro and Nezuko.png";

import furina1Black from "../Imgs/Girls/TShirts/Genshin Impact Designs/T-Shirts Designs/Girls/Furina1 - TBlack.png";
import furina1Gray from "../Imgs/Girls/TShirts/Genshin Impact Designs/T-Shirts Designs/Girls/Furina1 - TGray.png";
import furina1White from "../Imgs/Girls/TShirts/Genshin Impact Designs/T-Shirts Designs/Girls/Furina1 - TWhite.png";

import ahri1Black from "../Imgs/Girls/TShirts/League of Legends Designs/T-Shirts Designs/Girls/Ahri1 - TBlack.png";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const products = [
    {
      id: 1,
      name: "Gym1Trans - TBlack",
      description:
        "Premium hoodie with gaming-inspired design - featuring unique graphics and comfortable fit",
      price: "300",
      originalPrice: "350",
      image: gym1TransBlack,
      imageGallery: [gym1TransBlack, zed1Gray, furina1White, furina1Gray],
      category: "T-Shirts",
      badge: "sale",
    },
    {
      id: 2,
      name: "AngeLo T-Shirt",
      description:
        "Comfortable cotton t-shirt with unique graphics - perfect for everyday wear",
      price: "150",
      image: hoodieImage1,
      imageGallery: [hoodieImage1, hoodieImage1, hoodieImage1, hoodieImage1],
      category: "T-Shirts",
      badge: "new",
    },
    {
      id: 3,
      name: "AngeLo Cap",
      description:
        "Stylish cap for everyday wear - adjustable fit with premium quality",
      price: "100",
      image: hoodieImage1,
      imageGallery: [hoodieImage1, hoodieImage1, hoodieImage1, hoodieImage1],
      category: "Caps",
    },
    {
      id: 4,
      name: "AngeLo Jacket",
      description:
        "Lightweight jacket perfect for any season - water-resistant material",
      price: "400",
      originalPrice: "500",
      image: hoodieImage1,
      imageGallery: [hoodieImage1, hoodieImage1, hoodieImage1, hoodieImage1],
      category: "Jackets",
      badge: "sale",
    },
    {
      id: 5,
      name: "AngeLo Hoodie Pro",
      description:
        "Premium hoodie with gaming-inspired design - featuring unique graphics and comfortable fit",
      price: "350",
      image: hoodieImage1,
      imageGallery: [hoodieImage1, hoodieImage1, hoodieImage1, hoodieImage1],
      category: "Hoodies",
      badge: "new",
    },
    {
      id: 6,
      name: "AngeLo Graphic Tee",
      description:
        "Comfortable cotton t-shirt with unique graphics - perfect for everyday wear",
      price: "180",
      image: hoodieImage1,
      imageGallery: [hoodieImage1, hoodieImage1, hoodieImage1, hoodieImage1],
      category: "T-Shirts",
    },
    {
      id: 7,
      name: "AngeLo Snapback",
      description:
        "Stylish snapback cap for everyday wear - premium quality material",
      price: "120",
      image: hoodieImage1,
      imageGallery: [hoodieImage1, hoodieImage1, hoodieImage1, hoodieImage1],
      category: "Caps",
      badge: "new",
    },
    {
      id: 8,
      name: "AngeLo Winter Jacket",
      description: "Heavy duty winter jacket - perfect for cold weather",
      price: "600",
      image: hoodieImage1,
      imageGallery: [hoodieImage1, hoodieImage1, hoodieImage1, hoodieImage1],
      category: "Jackets",
    },
  ];

  const categories = ["All", "Hoodies", "T-Shirts", "Caps", "Jackets"];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleCategoryChange = (category) => {
    setIsLoading(true);
    setActiveCategory(category);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-btn px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category
                  ? "active bg-brand-red text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Product product={product} onClick={handleProductClick} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-white/50">
              No products found in this category
            </p>
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

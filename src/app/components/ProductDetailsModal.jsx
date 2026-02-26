"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Button from "./Button";

const ProductDetailsModal = ({ product, onClose }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [product]);

  if (!product) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const whatsappMessage = encodeURIComponent(
    `I'm interested in ${product.name}`
  );

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-lg w-full mx-4 relative transform transition-all duration-300 scale-100">
        
        {/* Image */}
        <div className="relative w-full h-72">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain rounded-t-xl bg-gray-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-xl"></div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight font-almarai">
            {product.name}
          </h2>

          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-bold text-blue-600 font-almarai">
              {product.price} EGP
            </div>

            <div className="flex items-center">
              <span className="text-yellow-400 text-xl">★★★★★</span>
              <span className="text-gray-500 ml-2">(4.8)</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <a
              href={`https://wa.me/201020881988?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-brand-blue text-white font-semibold font-almarai py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
            >
              Buy on WhatsApp
            </a>

           <Button variant="secondary" onClick={onClose}>
  Close
</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

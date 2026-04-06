"use client";

import Image from "next/image";
import React, { useMemo } from "react";

const Product = React.memo(({ product, onClick }) => {
  const whatsappMessage = useMemo(
    () => encodeURIComponent(`I'm interested in ${product.name}`),
    [product.name]
  );

  return (
    <div
      className="product-card bg-white/5 p-4 rounded-lg text-center cursor-pointer relative"
      onClick={() => onClick(product)}
    >
      {/* Badge */}
      {product.badge && (
        <div className={`badge badge-${product.badge}`}>
          {product.badge === "new" ? "New" : "Sale"}
        </div>
      )}

      {/* Image Container with Zoom Effect */}
      <div className="product-image-container relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-white/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
        />

        {/* Quick View Overlay */}
        <div className="product-overlay rounded-lg">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
            className="bg-white text-dark-bg px-4 py-2 rounded-lg font-semibold text-sm transform hover:scale-110 transition-transform"
          >
            Quick View
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 font-almarai">
        {product.name}
      </h3>

      <div className="flex items-center justify-center gap-2 mb-3">
        {product.originalPrice && (
          <span className="text-sm text-brand-red line-through">
            {product.originalPrice} EGP
          </span>
        )}
        <div className="text-xl font-bold text-blue-600 font-almarai">
          {product.price} EGP
        </div>
      </div>

      <a
        href={`https://wa.me/201020881988?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-block bg-brand-blue hover:bg-whatsapp-green text-white font-semibold font-almarai py-2 px-4 rounded-lg transition-all duration-300 w-full"
      >
        Buy on WhatsApp
      </a>
    </div>
  );
});

export default Product;

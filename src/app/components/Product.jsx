"use client";

import Image from "next/image";
import React, { useMemo } from "react";

const Product = React.memo(({ product, onClick }) => {
  const whatsappMessage = useMemo(() => {
    const discountedPrice =
      product.discountPercentage > 0
        ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
        : product.price;
    return encodeURIComponent(
      `I'm interested in ${product.name} - Price: ${discountedPrice} EGP`,
    );
  }, [product.name, product.price, product.discountPercentage]);

  const hasValidImage =
    typeof product.image === "string" &&
    product.image.trim() !== "" &&
    (product.image.startsWith("/") ||
      product.image.startsWith("http://") ||
      product.image.startsWith("https://"));

  return (
    <div
      className="product-card bg-white/5 p-4 rounded-lg text-center cursor-pointer relative"
      onClick={() => onClick(product)}
    >
      {product.badge && (
        <div className={`badge badge-${product.badge}`}>
          {product.badge === "new" ? "New" : "Sale"}
        </div>
      )}

      <div className="product-image-container relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-white/5">
        {hasValidImage ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50">
            No Image
          </div>
        )}

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

      <h3 className="text-lg md:text-xl font-bold text-white mb-3 font-almarai leading-tight tracking-tight">
        {product.name}
      </h3>

      <div className="flex items-center justify-center h-14 mb-3">
        {product.discountPercentage > 0 ? (
          <div className="flex flex-col items-center gap-1 h-full justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-brand-red line-through font-medium">
                {product.price} EGP
              </span>
              <span className="text-lg font-bold text-blue-600 font-almarai">
                {(
                  product.price *
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}{" "}
                EGP
              </span>
            </div>
            <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full font-medium uppercase tracking-wide">
              Save {product.discountPercentage}%
            </span>
          </div>
        ) : (
          <div className="text-xl font-bold text-blue-600 font-almarai">
            {product.price} EGP
          </div>
        )}
      </div>

      <a
        href={`https://wa.me/201017738775?text=${whatsappMessage}`}
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

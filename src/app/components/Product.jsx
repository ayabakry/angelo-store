"use client";

import Image from "next/image";
import React from "react";

const Product = ({ product, onClick }) => {
  const whatsappMessage = encodeURIComponent(
    `I'm interested in ${product.name}`
  );

  return (
    <div
      className="bg-white/5 p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>

      <h3 className="text-xl font-semibold text-white mb-2 font-almarai">
        {product.name}
      </h3>

      <div className="text-xl font-bold text-blue-600 mb-4 font-almarai">
        {product.price} EGP
      </div>

      <a
        href={`https://wa.me/201020881988?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-block bg-brand-blue text-white font-semibold font-almarai py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Buy on WhatsApp
      </a>
    </div>
  );
};

export default Product;

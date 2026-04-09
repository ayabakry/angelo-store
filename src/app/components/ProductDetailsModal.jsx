"use client";

import Image from "next/image";
import React, { useEffect, useState, useCallback, useMemo } from "react";

const ProductDetailsModal = ({ product, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsVisible(true), 10);
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [product]);

  if (!product) return null;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images.filter(
          (img) =>
            typeof img === "string" &&
            img.trim() !== "" &&
            (img.startsWith("/") ||
              img.startsWith("http://") ||
              img.startsWith("https://")),
        )
      : typeof product.image === "string" &&
          product.image.trim() !== "" &&
          (product.image.startsWith("/") ||
            product.image.startsWith("http://") ||
            product.image.startsWith("https://"))
        ? [product.image]
        : [];

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const whatsappMessage = React.useMemo(() => {
    const discounted =
      product.discountPercentage > 0
        ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2) +
          " EGP"
        : `${product.price} EGP`;
    return encodeURIComponent(
      `I'm interested in ${product.name} - Price: ${discounted}`,
    );
  }, [product.name, product.price, product.discountPercentage]);

  return (
    <div
      className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative transform transition-all duration-500 ${
          isVisible ? "scale-100 translate-y-0" : "scale-90 translate-y-10"
        }`}
      >
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
        >
          ✕
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* ✅ IMAGE GALLERY */}
          <div className="lg:w-1/2 p-4 relative">
            <div className="relative h-64 sm:h-80 lg:h-96 mb-4">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain rounded-xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-xl bg-white/5 text-white/50">
                  No Image
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-1 rounded-full"
                  >
                    ◀
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white px-3 py-1 rounded-full"
                  >
                    ▶
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-brand-red"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 text-white">
            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-wider mb-4">
              {product.category}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              {product.name}
            </h2>

            <p className="text-gray-300 mb-6 text-sm sm:text-base">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              {product.discountPercentage > 0 ? (
                <>
                  <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                    {(
                      product.price *
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}{" "}
                    EGP
                  </span>
                  <span className="text-2xl sm:text-xl font-bold text-brand-red line-through opacity-75">
                    {product.price} EGP
                  </span>
                  <span className="text-red-500 text-[0.8em] font-bold px-[6px] py-[2px] bg-red-500/10 rounded">
                    -{product.discountPercentage}%
                  </span>

                  {/* <span className="px-3 py-1.5 bg-brand-red/20 text-brand-red font-semibold text-sm rounded-lg border border-brand-red/30">
                    Save {product.discountPercentage}%
                  </span> */}
                </>
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-brand-red">
                  {product.price} EGP
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-gray-400 text-sm">(4.8 out of 5)</span>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/201017738775?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-blue hover:bg-whatsapp-green text-white font-semibold py-3 px-6 rounded-xl transition"
              >
                Order via WhatsApp
              </a>

              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="w-full bg-white/10 hover:bg-white/20 py-3 px-6 rounded-xl"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

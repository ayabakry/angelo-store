
import Image from 'next/image';
import React, { useEffect } from 'react';


const ProductDetailsModal = ({ product, onClose }) => {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [product]);

  if (!product) return null;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl max-w-lg w-full mx-4 relative transform transition-all duration-300 scale-100 hover:scale-105">
       
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-contain rounded-t-xl bg-gray-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-xl"></div>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight">{product.name}</h2>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between mb-6">
            <div className="text-2xl font-bold text-blue-600">{product.price} EGP</div>
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl">★★★★★</span>
              <span className="text-gray-500 ml-2">(4.8)</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <a
              href={`https://wa.me/201020881988?text=I'm interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-brand-blue  text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
            >
              Buy on WhatsApp
            </a>
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

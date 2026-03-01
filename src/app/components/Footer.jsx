"use client";

import React, { useEffect, useRef, useState } from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      ref={footerRef}
      className="py-8 px-4 border-t border-white/10 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo */}
        <div className="mb-4">
          <button 
            onClick={scrollToTop}
            className="text-2xl font-bold font-almarai text-white hover:text-brand-red transition-colors"
          >
            Ange<span className="text-brand-red">L</span>o
          </button>
        </div>

        {/* Quick Links */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="#home" className="text-white/60 hover:text-white text-sm transition-colors">Home</a>
          <a href="#products" className="text-white/60 hover:text-white text-sm transition-colors">Products</a>
          <a href="#about" className="text-white/60 hover:text-white text-sm transition-colors">About</a>
          <a href="#contact" className="text-white/60 hover:text-white text-sm transition-colors">Contact</a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="https://web.facebook.com/profile.php?id=61585532554944"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300"
          >
            <i className="fab fa-facebook-f text-white/70 hover:text-white"></i>
          </a>
          <a
            href="https://www.instagram.com/angelowearofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:border-transparent transition-all duration-300"
          >
            <i className="fab fa-instagram text-white/70 hover:text-white"></i>
          </a>
          <a
            href="https://wa.me/201020881988"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all duration-300"
          >
            <i className="fab fa-whatsapp text-white/70 hover:text-white"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-white/50 uppercase tracking-wider">
          © {year} Angelo Store. All rights reserved.
        </p>
        
        {/* Made with love */}
        <p className="text-xs text-white/30 mt-2">
          Made with <span className="text-brand-red">❤</span> for gamers
        </p>
      </div>
    </footer>
  );
};

export default Footer;

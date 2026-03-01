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
            className="text-2xl font-bold font-almarai text-brand-blue hover:text-brand-red transition-colors"
          >
            Ange<span className="text-brand-red">L</span>o
          </button>
        </div>

       
       

        <p className="text-sm text-white/50 uppercase tracking-wider">
          © {year} Angelo Store. All rights reserved.
        </p>
        
        
      </div>
    </footer>
  );
};

export default Footer;

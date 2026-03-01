"use client";

import React, { useEffect, useRef, useState } from "react";

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="contact" 
      className="py-20 px-4 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl"></div>
      </div>

      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wider font-almarai">
          Contact Us
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue mx-auto mb-12"></div>

        <div className="space-y-6 text-lg">
          <p className={`flex justify-center items-center gap-3 transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center">
              <i className="fas fa-phone text-brand-blue"></i>
            </span>
            <a
              href="tel:+201020881988"
              className="text-white hover:text-brand-blue transition-colors"
            >
              +201020881988
            </a>
          </p>

          <p className={`flex justify-center items-center gap-3 transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <i className="fab fa-whatsapp text-green-500"></i>
            </span>
            <a
              href="https://wa.me/201020881988"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-green-500 transition-colors"
            >
              WhatsApp
            </a>
          </p>
        </div>

        <div className={`mt-12 transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center space-x-6">
            <a
              href="https://web.facebook.com/profile.php?id=61585532554944"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 transform hover:scale-110 group"
            >
              <i className="fab fa-facebook-f text-xl group-hover:text-white"></i>
            </a>

            <a
              href="https://www.instagram.com/angelowearofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-orange-500 hover:border-transparent transition-all duration-300 transform hover:scale-110 group"
            >
              <i className="fab fa-instagram text-xl group-hover:text-white"></i>
            </a>

            <a
              href="https://wa.me/201020881988"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 border-2 border-white/30 rounded-full flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all duration-300 transform hover:scale-110 group"
            >
              <i className="fab fa-whatsapp text-xl group-hover:text-white"></i>
            </a>
          </div>
        </div>

        {/* Quick Contact Form */}
        <div className={`mt-16 max-w-md mx-auto transition-all duration-700 delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-white/70 mb-4">Or send us a message directly:</p>
          <a
            href="https://wa.me/201020881988?text=Hello,%20I%20want%20to%20know%20more%20about%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-red text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <i className="fab fa-whatsapp"></i>
            Send Message
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

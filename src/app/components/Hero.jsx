"use client";

import Image from "next/image";
import React from "react";
import Angelologo from "@/app/Imgs/angeloLogo.png"
import useTypingEffect from "@/app/hooks/useTypingEffect.js";

const Hero = () => {
  const fullText = "Level up your style";
  const { typedText, showCursor } = useTypingEffect(fullText);

  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
    >
      <div className="floating-circle floating-circle-1"></div>
      <div className="floating-circle floating-circle-2"></div>
      <div className="floating-circle floating-circle-3"></div>

      <div className="text-center relative z-10">
        <div className="mb-8">
          <div className="mb-8 relative">
            <div className="w-28 h-28 border-2 border-white/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Image
                src={Angelologo}
                alt="AngeLo Wear Logo"
                width={80}
                height={80}
                className="w-20 h-20 animate-float"
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-brand-blue font-almarai animate-fade-in-up">
            Ange<span className="text-brand-red">L</span>o
          </h1>

          <div className="text-2xl md:text-4xl text-brand-red font-semibold mb-2 font-almarai h-10 flex items-center justify-center">
            <span className="animate-fade-in">{typedText}</span>
            <span className={`border-r-4 border-brand-red ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>

          <div className="w-32 h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue mx-auto mb-6 animate-pulse"></div>
        </div>

        <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          Inspired by gaming, anime & modern culture
          <br />
          Made for everyday wear
        </p>

        <div className="mt-12 animate-fade-in-up delay-400">
          <button
            onClick={scrollToProducts}
            className="btn-primary bg-brand-blue hover:bg-brand-red text-white px-10 py-4 rounded-lg font-semibold font-almarai text-lg inline-block group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Shop Now
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
        
       
      </div>
    </section>
  );
};

export default Hero;

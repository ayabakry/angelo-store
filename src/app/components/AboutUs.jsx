"use client";

import React from "react";
import useScrollReveal from "@/app/hooks/useScrollReveal.js";

const AboutUs = () => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section 
      id="about" 
      className="py-20 px-4 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl"></div>
      </div>

      <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <h2 className="text-3xl md:text-4xl font-bold font-almarai mb-4 uppercase tracking-wider">
          About
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue mx-auto mb-12"></div>

        <div className="space-y-8 text-lg leading-relaxed">
          <p className={`transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="text-brand-blue font-bold text-xl font-almarai">
              Ange<span className="text-brand-red">L</span>o
            </span>{" "}
            is more than just clothing — it's a lifestyle.
          </p>

          <p className={`transition-all duration-700 delay-200 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            Inspired by gaming, anime, and modern street culture,
            we create pieces that speak to those who live differently.
          </p>

          <p className={`transition-all duration-700 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            Every design is made to represent confidence, individuality,
            and the mindset of leveling up — in style and in life.
          </p>

          <p className={`transition-all duration-700 delay-400 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            This is for gamers, creators, and anyone who believes
            that what you wear should say who you are.
          </p>
        </div>

        {/* Stats or features */}
        <div className={`grid grid-cols-3 gap-6 mt-16 transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-blue font-almarai mb-2">50+</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">Designs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-red font-almarai mb-2">10K+</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-blue font-almarai mb-2">4.9</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

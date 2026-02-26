import Image from "next/image";
import React from "react";
import Angelologo from "@/app/Imgs/angeloLogo.png"
const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 border-2 border-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Image
              src={Angelologo}
              alt="AngeLo Wear Logo"
              width={64}
              height={64}
              className="w-16 h-16"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-blue font-almarai">
            Ange<span className="text-brand-red">L</span>o
          </h1>

          <div className="text-2xl md:text-3xl text-brand-red font-semibold mb-2 font-almarai">
            Level up your style
          </div>

          <div className="w-32 h-1 bg-brand-blue mx-auto mb-6"></div>
        </div>

        <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
          Inspired by gaming, anime & modern culture
          <br />
          Made for everyday wear
        </p>

        <div className="mt-12">
          <a
            href="#products"
            className="bg-brand-blue hover:bg-brand-blue/80 text-white px-8 py-4 rounded-lg font-semibold font-almarai text-lg transition-colors inline-block"
          >
            Shop Now
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;

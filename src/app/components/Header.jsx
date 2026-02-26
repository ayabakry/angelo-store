"use client";

import React, { useState } from "react";
import Button from "./Button";

const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  setIsMenuOpen(false);
};
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center font-bold text-white text-2xl font-almarai">
           <Button variant="link" onClick={() => scrollToSection("home")}> Ange<span className="text-brand-red">L</span>o </Button>
          </div>

          <div className="hidden md:flex space-x-8">
            {["home", "products", "about", "contact"].map((section) => (
             <Button variant="nav" onClick={() => scrollToSection(section)}>
  {section}
</Button>
            ))}
          </div>

          <div className="md:hidden">
           <Button variant="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {isMenuOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
</Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-bg/95 border-t border-white/10">
              {["home", "products", "about", "contact"].map((section) => (
               <Button variant="menu" onClick={() => scrollToSection(section)}>
  {section}
</Button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

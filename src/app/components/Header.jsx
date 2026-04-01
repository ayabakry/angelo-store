"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
// import { useTheme } from "../context/ThemeContext";

const Header = () => {
  // const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  // const toggleIcon = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 dark:bg-dark-bg/95 bg-gray-900/95 backdrop-blur-md shadow-lg py-2 ${isScrolled ? '' : 'py-4'}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center font-bold text-brand-blue text-2xl font-almarai cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <span>Ange</span>
            <span className="text-brand-red">L</span>
            <span>o</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {[ 
              { id: "home", label: "Home" },
              { id: "products", label: "Products" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" }
            ].map((section, index) => (
              <Button 
                key={section.id}
                variant="nav" 
                onClick={() => scrollToSection(section.id)}
                className="relative overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{section.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </Button>
            ))}
            {/* <Button 
              variant="theme-toggle" 
              onClick={toggleTheme}
              className="ml-4"
              title="Toggle theme"
            >
              <i className={`${toggleIcon} transition-transform duration-300  ></i>
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* <Button 
              variant="theme-toggle" 
              onClick={toggleTheme}
              title="Toggle theme"
            >
              <i className={`${toggleIcon} transition-transform duration-300  ></i>
            </Button> */}
            <Button 
              variant="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'top-3 rotate-45' : 'top-1'}`}></span>
                <span className={`absolute left-0 top-3 w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'top-3 -rotate-45' : 'top-5'}`}></span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-bg/95 dark:bg-dark-bg/95 bg-gray-900/95 border-t border-white/10 rounded-lg">
            {[
              { id: "home", label: "Home" },
              { id: "products", label: "Products" },
              { id: "about", label: "About" },
              { id: "contact", label: "Contact" }
            ].map((section) => (
              <Button 
                key={section.id}
                variant="menu" 
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </Button>
            ))}
            {/* <Button 
              variant="theme-toggle"
              onClick={toggleTheme}
              className="mt-2"
            >
              <i className={`${toggleIcon} transition-transform duration-300  ></i>
            </Button> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

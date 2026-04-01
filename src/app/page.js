"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
className={`min-h-screen bg-background text-foreground transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <Header />

      <main>
        <Hero />
        <Products />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

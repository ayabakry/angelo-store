import Hero from "./components/Hero";
import Products from "./components/Products";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Header />

      <main >

        <Hero />
        <Products />
        <AboutUs />
        <Contact />
      </main>
      <Footer />

    </div>
  );
}

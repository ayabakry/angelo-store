import React from "react";

const ContactUs = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-wider font-almarai">
          Contact Us
        </h2>
        <div className="w-24 h-1 bg-white mx-auto mb-12"></div>

        <div className="space-y-6 text-lg">
          <p className="flex justify-center items-center gap-2">
            <i className="fas fa-phone"></i>
            <a
              href="tel:+201020881988"
              className="text-white hover:text-brand-blue/80 transition-colors"
            >
              +201020881988
            </a>
          </p>

          <p className="flex justify-center items-center gap-2">
            <i className="fab fa-whatsapp"></i>
            <a
              href="https://wa.me/201020881988"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-blue/80 transition-colors"
            >
              WhatsApp
            </a>
          </p>
        </div>

        <div className="mt-12">
          <div className="flex justify-center space-x-6">
            <a
              href="https://web.facebook.com/profile.php?id=61585532554944"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-dark-bg transition-colors"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="https://www.instagram.com/angelowearofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-dark-bg transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>

            {/*
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white hover:text-dark-bg transition-colors"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

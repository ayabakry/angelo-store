import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-white/75 uppercase tracking-wider">
          © {year} Nader Emad Brand. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

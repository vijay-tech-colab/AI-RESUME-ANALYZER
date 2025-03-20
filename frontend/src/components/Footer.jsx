import React from "react";

function Footer() {
  return (
    <footer className="bg-[#111827] text-white text-center py-4 mt-8">
      <p>&copy; {new Date().getFullYear()} Resume Analyser. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

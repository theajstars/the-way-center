import { useState } from "react";

export default function Footer() {
  return (
    <div id="footer" className="flex-row footer-row">
      <a href="#footer" className="footer-link poppins px-15">
        Terms and Conditions
      </a>
      <a href="#footer" className="footer-link poppins px-15">
        Privacy Policy
      </a>
      <a href="#footer" className="footer-link poppins px-15">
        Documentation
      </a>
    </div>
  );
}

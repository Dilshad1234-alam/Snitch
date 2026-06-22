import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGoogle,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="border-t py-8 sm:py-12 bg-[#f5f1ec]"
      style={{ borderColor: "#e4e2df" }}
    >
      <div className="
        max-w-7xl
        mx-auto
        px-4 sm:px-8
        flex
        flex-col md:flex-row
        items-center
        justify-between
        gap-8
      ">

        {/* App Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-10 sm:h-12 cursor-pointer hover:scale-105 transition"
          />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-10 sm:h-12 cursor-pointer hover:scale-105 transition"
          />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <span
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.35em]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C9A96E",
            }}
          >
            Snitch. © {new Date().getFullYear()}
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 sm:gap-6 text-[#C96D42] text-lg sm:text-xl">
          <a href="#" className="hover:scale-110 transition">
            <FaFacebook />
          </a>

          <a href="#" className="hover:scale-110 transition">
            <FaInstagram />
          </a>

          <a href="#" className="hover:scale-110 transition">
            <FaLinkedin />
          </a>

          <a href="#" className="hover:scale-110 transition">
            <FaGoogle />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
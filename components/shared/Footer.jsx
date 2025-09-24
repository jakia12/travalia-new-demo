// components/Footer.tsx

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-[150px] pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-7 mb-7">
          {/* Logo */}
          <div className=" md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Trava<span className="text-[#2ecc71]">lio</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-7 text-base md:text-lg font-medium mt-4 lg:mt-0">
            <Link
              href="/resorts"
              className="hover:text-white"
              style={{ color: "#ffffff" }}
            >
              Resorts
            </Link>
            <Link
              href="/offers"
              className="hover:text-white"
              style={{ color: "#ffffff" }}
            >
              Offers
            </Link>
            <Link
              href="/about"
              className="hover:text-white"
              style={{ color: "#ffffff" }}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-white"
              style={{ color: "#ffffff" }}
            >
              Contact
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-5  md:mt-0 mt-4 lg:mt-0">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-white"
              style={{ color: "#ffffff" }}
            >
              <FaFacebookF className="text-2xl md:text-3xl" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-white"
              style={{ color: "#ffffff" }}
            >
              <FaTwitter className="text-2xl md:text-3xl" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-white"
              style={{ color: "#ffffff" }}
            >
              <FaInstagram className="text-2xl md:text-3xl" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-base md:text-lg">
          <p style={{ margin: "0" }} className="mb-4 md:mb-0">
            Copyright © {new Date().getFullYear()} Travalio. All rights
            reserved.
          </p>
          <div className="flex gap-6  md:mt-0">
            <Link
              href="/"
              className="hover:text-white"
              style={{ color: "#ffffff" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="hover:text-white"
              style={{ color: "#ffffff" }}
            >
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

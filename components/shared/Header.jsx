// components/SimpleNavbar.jsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Resorts", href: "/resorts" },
  { label: "Offers", href: "/offers" },

  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);

  // ===== Scroll threshold (300px) =====
  useEffect(() => {
    const THRESHOLD = 300;
    const onScroll = () => setScrolled(window.scrollY > THRESHOLD);
    onScroll(); // set initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // focus drawer on open
  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b mt-[-102px] pb-[13px] transition-colors duration-300",
        scrolled || open
          ? "bg-[#102039]/90 border-white/10 backdrop-blur shadow-lg"
          : "bg-transparent border-white/25",
      ].join(" ")}
    >
      {/* Grid: logo | nav | cta */}
      <div className="container mx-auto lg:grid lg:grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 flex justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 no-underline"
          style={{ textDecoration: "none" }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 12c3 0 3-4 6-4s3 4 6 4 3-4 6-4" />
            </svg>
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Trava<span className="text-[#2ecc71]">lio</span>
          </h1>
        </Link>

        {/* Middle: Nav (centered) */}
        <nav className="hidden justify-center gap-12 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="text-[20px] font-medium text-white hover:text-[#2ecc71] "
              style={{ textDecoration: "none" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right: Book Now + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
          
            href="/booking"
            style={{ textDecoration: "none" }}
            className="lg:block hidden group items-center rounded px-[35px] py-3 text-white backdrop-blur transition bg-[#2ecc71] hover:bg-[#102039] shadow-2xl"
          >
            Book Now
          </Link>

          {/* Hamburger (right) */}
          <button
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/40 text-white hover:bg-white/10 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide-in drawer (FROM LEFT) */}
      <aside
        id="mobile-menu"
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`h-[100vh] fixed inset-y-0 left-0 z-[70] w-full max-w-[100%] transform bg-[#102039] shadow-2xl transition-transform duration-300 pl-[20px] pr-[20px] md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/30 px-4 py-3">
          <span className="text-[22px] font-semibold text-white">Menu</span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-lg border  text-white hover:text-[#00C5C4] "
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path
                d="M6 6l12 12M18 6l-12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="px-2 py-2">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-white hover:text-[#00C5C4] text-[22px]"
            >
              {n.label}
            </Link>
          ))}

          <div className="mt-3  pt-3">
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="group inline-flex items-center rounded-full border-[1px] border-white px-[35px] py-3 text-white backdrop-blur transition hover:bg-[#2ecc71] bg-transparent shadow-2xl text-[20px] "
            >
              Book Now
              <svg
                className="ml-2 h-5 w-5 transition group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </nav>
      </aside>
    </header>
  );
}

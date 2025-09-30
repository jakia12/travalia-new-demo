// app/_components/Gallery.jsx (or wherever your Gallery lives)
"use client";

import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const IMAGES = [
  "/img/gl1.png",
  "/img/gl2.png",
  "/img/gl3.png",
  "/img/gl4.webp",
  "/img/gl5.png",
  "/img/gl6.webp",
  "/img/gl7.webp",
  "/img/gl8.webp",
  "/img/rs2.webp",
  "/img/ab1.webp",
  "/img/rs3.webp",
  "/img/rs1.webp",
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length),
    []
  );
  const next = useCallback(() => setIdx((i) => (i + 1) % IMAGES.length), []);

  // keyboard controls + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  return (
    <section className="py-[90px]">
      <div className="container">
        <div className="cs_section_heading cs_style_1 text-center">
          <h3
            className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24"
            style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
          >
            Gallery
          </h3>
          <h2
            className="cs_section_title cs_semibold cs_fs_56 mb-0 wow fadeInUp"
            data-wow-duration="0.8s"
            data-wow-delay="0.2s"
            style={{ fontFamily: "Playfair" }}
          >
            Envision Your Paradise
          </h2>
        </div>
        <div className="cs_height_55 cs_height_lg_40" />
      </div>

      <div className="container">
        {/* YOUR GRID — unchanged structure; only onClick + cursor added */}
        <div className="grid-wrapper">
          <div className="tall">
            <img
              src="/img/gl1.png"
              alt="Gallery 1"
              loading="lazy"
              onClick={() => openAt(0)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div>
            <img
              src="/img/gl2.png"
              alt="Gallery 2"
              loading="lazy"
              onClick={() => openAt(1)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div className="tall">
            <img
              src="/img/gl3.png"
              alt="Gallery 3"
              loading="lazy"
              onClick={() => openAt(2)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div className="wide">
            <img
              src="/img/gl4.webp"
              alt="Gallery 4"
              loading="lazy"
              onClick={() => openAt(3)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div>
            <img
              src="/img/gl5.png"
              alt="Gallery 5"
              loading="lazy"
              onClick={() => openAt(4)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div className="tall">
            <img
              src="/img/gl6.webp"
              alt="Gallery 6"
              loading="lazy"
              onClick={() => openAt(5)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div className="big">
            <img
              src="/img/gl7.webp"
              alt="Gallery 7"
              loading="lazy"
              onClick={() => openAt(6)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div>
            <img
              src="/img/gl8.webp"
              alt="Gallery 8"
              loading="lazy"
              onClick={() => openAt(7)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div>
            <img
              src="/img/rs2.webp"
              alt="Gallery 9"
              loading="lazy"
              onClick={() => openAt(8)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div>
            <img
              src="/img/ab1.webp"
              alt="Gallery 10"
              loading="lazy"
              onClick={() => openAt(9)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div>
            <img
              src="/img/rs3.webp"
              alt="Gallery 11"
              loading="lazy"
              onClick={() => openAt(10)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
          <div className="wide">
            <img
              src="/img/rs1.webp"
              alt="Gallery 12"
              loading="lazy"
              onClick={() => openAt(11)}
              style={{ cursor: "zoom-in" }}
            />
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {open && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={close}
        >
          {/* stop backdrop click from closing when clicking content */}
          <div
            className="gallery-lightbox__inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-lightbox__close"
              aria-label="Close"
              onClick={close}
            >
              <AiOutlineClose size={24} />
            </button>

            <button
              type="button"
              className="gallery-lightbox__nav gallery-lightbox__nav--prev"
              aria-label="Previous image"
              onClick={prev}
            >
              <FiChevronLeft size={28} aria-hidden="true" />
            </button>

            <img
              src={IMAGES[idx]}
              alt={`Image ${idx + 1}`}
              className="gallery-lightbox__img"
            />

            <button
              type="button"
              className="gallery-lightbox__nav gallery-lightbox__nav--next"
              aria-label="Next image"
              onClick={next}
            >
              <FiChevronRight size={28} aria-hidden="true" />
            </button>

            <div className="gallery-lightbox__counter">
              {idx + 1} / {IMAGES.length}
            </div>
          </div>
        </div>
      )}

      {/* minimal styles for the modal only; your grid stays untouched */}
    </section>
  );
};

export default Gallery;

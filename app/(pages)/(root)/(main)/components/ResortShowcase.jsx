// app/_components/ResortShowcase.jsx
"use client";

import { resorts } from "@/data/resorts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResortShowcase() {
  const router = useRouter();
  const list = resorts.slice(0, 3);

  return (
    <section className="container my-4 my-lg-5 py-[80px]">
      {/* title heading */}
      <div className="cs_section_heading cs_style_1 text-center">
        <h3
          className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24"
          style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
        >
          Explore Now
        </h3>
        <h2
          className="cs_section_title cs_semibold cs_fs_56 mb-0 wow fadeInUp"
          data-wow-duration="0.8s"
          data-wow-delay="0.2s"
          style={{ fontFamily: "Playfair" }}
        >
          Featured Resorts
        </h2>
      </div>

      <div className="cs_height_55 cs_height_lg_40" />

      <div className="row g-4">
        {list.map((r, i) => (
          <div className="col-12 col-lg-4" key={r.id}>
            {/* ✅ Single Link wrapping the entire card */}
            <Link
              href={`/resorts/${r.slug}`}
              className="text-reset text-decoration-none d-block"
              aria-label={`View ${r.name}`}
            >
              <article className="resort-tile position-relative rounded-4 overflow-hidden">
                <Image
                  src={r.img}
                  alt={r.name}
                  fill
                  sizes="(max-width: 992px) 100vw, 33vw"
                  className="tile-img"
                  priority={i === 0}
                />
                <div className="tile-overlay" />
                <div className="tile-content text-white">
                  <h3 className="h5 mb-2">{r.name}</h3>
                  <p className="mb-3 small opacity-90">{r.short}</p>

                  {/* ✅ Button (not a Link) so we avoid <a> inside <a> */}
                  <button
                    type="button"
                    className="book-link flex items-center text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // route wherever you want the CTA to go:
                      router.push(`/resorts/${r.slug}`); // or router.push(`/booking?resort=${r.slug}`)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/resorts/${r.slug}`);
                      }
                    }}
                    aria-label={`Book ${r.name}`}
                  >
                    BOOK NOW
                    <svg
                      className="ml-2 h-5 w-5 transition group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

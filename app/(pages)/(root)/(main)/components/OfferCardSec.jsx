// app/_components/ResortShowcase.jsx
"use client";

import { offers } from "@/data/offers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function discountLabel(discount) {
  if (!discount) return null;
  if (discount.type === "percentage") return `${discount.value}% off`;
  if (discount.type === "up_to_percentage")
    return `Up to ${discount.value}% off`;
  return null;
}

export default function OfferCardSec() {
  const router = useRouter();
  const list = offers.slice(0, 3);

  return (
    <section className="container my-4 my-lg-5 py-[80px]">
      {/* title heading */}
      <div className="cs_section_heading cs_style_1 text-center">
        <h3
          className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24"
          style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
        >
          Promotions & offers
        </h3>
        <h2
          className="cs_section_title cs_semibold cs_fs_56 mb-0 wow fadeInUp"
          data-wow-duration="0.8s"
          data-wow-delay="0.2s"
          style={{ fontFamily: "Playfair" }}
        >
          Maldives Holiday Offers
        </h2>
      </div>
      <div className="cs_height_55 cs_height_lg_40" />

      <div className="row g-4">
        {list.map((it, i) => {
          const badge = discountLabel(it.discount);
          return (
            <div className="col-12 col-lg-4" key={it.id}>
              <Link
                href={`/offers/${it.slug || it.id}`}
                className="text-reset text-decoration-none d-block"
                aria-label={`View offer: ${it.title}`}
              >
                <article className="resort-tile position-relative rounded-4 overflow-hidden">
                  {/* Image */}
                  <div
                    className="position-relative"
                    style={{ aspectRatio: "4 / 3" }}
                  >
                    <Image
                      src={it.img}
                      alt={`${it.resort} — ${it.title}`}
                      fill
                      className="object-fit-cover tile-img"
                      priority={i === 0}
                      sizes="(min-width: 992px) 33vw, 100vw"
                    />
                  </div>

                  {/* overlay */}
                  <div className="tile-overlay" />

                  {/* discount badge */}
                  {badge && (
                    <span
                      className="badge bg-success position-absolute"
                      style={{ top: 12, left: 12, background: "[#2ecc71]" }}
                    >
                      {badge}
                    </span>
                  )}

                  {/* content */}
                  <div className="tile-content text-white">
                    <h3 className="h5 mb-1">{it.resort}</h3>
                    <p className="mb-3 small opacity-90">
                      {it.teaser || it.title}
                    </p>

                    {/* CTA button inside card */}
                    <button
                      type="button"
                      className="book-link flex items-center text-[#2ecc71] text-decoration-none"
                      aria-label={`Quick view: ${it.title}`}
                      style={{
                        background: "transparent",
                        border: 0,
                        padding: 0,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/offers?highlight=${it.slug || it.id}`);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/offers?highlight=${it.slug || it.id}`);
                        }
                      }}
                    >
                      View All
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
          );
        })}
      </div>
    </section>
  );
}

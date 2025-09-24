// components/TourPackages.jsx
"use client";

import { resorts } from "@/data/resorts";
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

function Stars({ rating = 5 }) {
  const gradId = useId(); // ✅ unique per render (fixes duplicate <defs> ids)
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  const Star = ({ type }) => (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden
      className="inline-block"
    >
      {type === "full" && (
        <path
          fill="#FFC83D"
          d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
        />
      )}
      {type === "half" && (
        <>
          <defs>
            <linearGradient id={gradId}>
              <stop offset="50%" stopColor="#FFC83D" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${gradId})`}
            stroke="#FFC83D"
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
          />
        </>
      )}
      {type === "empty" && (
        <path
          fill="none"
          stroke="#FFC83D"
          d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
        />
      )}
    </svg>
  );

  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} type="full" />
      ))}
      {half === 1 && <Star type="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} type="empty" />
      ))}
    </span>
  );
}

export default function TourPackages() {
  return (
    <section>
      <div className="cs_height_140 cs_height_lg_80" />
      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resorts.slice(0, 6).map((r) => {
            const href = `/resorts/${r.slug}`;
            const price =
              typeof r.priceFrom === "number"
                ? r.priceFrom.toLocaleString()
                : "—";
            return (
              <article
                key={r.id}
                className="resort-card rounded-2xl shadow-md overflow-hidden bg-white"
              >
                {/* Image / overlay / title */}
                <Link
                  href={href}
                  className="resort-thumb block"
                  style={{ position: "relative", aspectRatio: "4 / 3" }}
                >
                  <Image
                    src={r.img}
                    alt={r.name}
                    fill
                    sizes="(max-width:1024px) 100vw, 33vw"
                    className="resort-img object-cover"
                    priority={false}
                  />
                  {/* overlay */}
                  <div
                    className="resort-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.6) 100%)",
                    }}
                  />
                  {/* stars */}
                  <div
                    className="resort-stars"
                    style={{ position: "absolute", left: 14, bottom: 56 }}
                  >
                    <Stars rating={r.rating} />
                  </div>
                  {/* title */}
                  <div className="resort-title text-white">
                    <span style={{ fontFamily: "playfair" }}>{r.name}</span>
                  </div>
                </Link>

                {/* action row */}
                <div className="resort-action flex items-center justify-between px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">from</span>
                    <h2 className="text-[32px] md:text-[36px] font-black mont">
                      ${price}
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        / night
                      </span>
                    </h2>
                  </div>
                  <Link
                    href={href}
                    className="view-btn inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 transition"
                  >
                    View Resort
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="cs_height_140 cs_height_lg_80" />
    </section>
  );
}

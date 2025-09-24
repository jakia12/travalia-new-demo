// components/PopularDestinations.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

const DESTINATIONS = [
  {
    title: "Eiffel Tower",
    subtitle: "Paris, 24 Trips",

    img: "/images/pp5.jpg",
    href: "/destination-details",
  },
  {
    title: "Maldives Islands",
    subtitle: "Prydelands, 100 Trips",
    img: "/images/ppsea.webp",
    href: "/destination-details",
  },
  {
    title: "Lao Lading Island",
    subtitle: "Krabal, 12 Trips",
    img: "/images/pp3.jpg",
    href: "/destination-details",
  },
  {
    title: "Ton Kwen Temple",
    subtitle: "Thailand, 20 Trips",

    img: "/images/pp1.jpg",
    href: "/destination-details",
  },
  {
    title: "Phi Phi Islands",
    subtitle: "Thailand, 50 Trips",
    img: "/images/pp2.jpg",
    href: "/destination-details",
  },
];

export default function PopularDestinations() {
  return (
    <section>
      <div className="cs_height_135 cs_height_lg_80" />
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="cs_section_heading cs_style_1 text-center">
          <h3
            className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24 satisfy text-[#2ecc71]"
            style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
          >
            POPULAR DESTINATION
          </h3>
          <h2 className="cs_section_title cs_semibold cs_fs_56 mb-0 playfair">
            Popular Destinations
          </h2>
        </div>

        <div className="cs_height_55 cs_height_lg_40" />

        {/* Grid */}
        <div className="cs_grid_1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <div key={d.title} className="cs_grid_item">
              <Link
                href="/destinations"
                className="cs_card cs_style_2 cs_zoom cs_radius_8 relative block overflow-hidden rounded-lg"
              >
                <div className="cs_card_thumb relative w-full h-full">
                  {/* Keep a nice aspect ratio if your custom CSS doesn't set heights */}
                  <div className="relative block aspect-[4/5] w-full h-full">
                    <Image
                      src={d.img}
                      alt={d.title}
                      fill
                      className="object-cover  w-100 h-100 cs_zoom_in"
                      style={{ width: "100%", height: "100%" }}
                      priority={i === 0}
                    />
                  </div>
                </div>

                <div className="cs_card_content absolute bottom-0 left-0 p-5">
                  <h2
                    className="cs_card_title cs_fs_35 cs_medium cs_white_color playfair"
                    style={{ fontFamily: "Playfair" }}
                  >
                    {d.title}
                  </h2>
                  <p
                    className="cs_card_subtitle cs_fs_18 cs_medium cs_white_color mb-0 playfair"
                    style={{ fontFamily: "Playfair" }}
                  >
                    {d.subtitle}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="cs_height_140 cs_height_lg_80" />
    </section>
  );
}

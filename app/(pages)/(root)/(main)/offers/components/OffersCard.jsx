// app/_components/ResortShowcase.jsx
"use client";

import Link from "next/link";

export default function OfferCard() {
  const items = [
    {
      title: "Waldorf Astoria Maldives Ithaafushi",
      desc: "30% off select villas",
      img: "/img/offers/1.webp",
      href: "/allResorts",
    },
    {
      title: "Hilton Maldives Amingiri Resort & Spa",
      desc: "25% off select villas",
      img: "/img/offers/2.webp",
      href: "/allResorts",
    },
    {
      title: "OBLU XPERIENCE Ailafushi",
      desc: "20% off select villas",
      img: "/img/offers/3.webp",
      href: "/allResorts",
    },
    {
      title: "Anantara Veli Maldives Resort",
      desc: "15% off water villas",
      img: "/img/offers/4.webp",
      href: "/allResorts",
    },
    {
      title: "Hard Rock Hotel Maldives",
      desc: "Free transfers + 10% off",
      img: "/img/offers/5.webp",
      href: "/allResorts",
    },
    {
      title: "Soneva Jani",
      desc: "Up to 20% off suites",
      img: "/img/offers/6.webp",
      href: "/allResorts",
    },
  ];

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
        {items.map((it, i) => (
          <div className="col-12 col-lg-4" key={i}>
            <article className="resort-tile position-relative rounded-4 overflow-hidden">
              <img
                src={it.img}
                alt={it.title}
                fill
                className="tile-img"
                priority={i === 0}
              />
              <div className="tile-overlay" />
              <div className="tile-content text-white">
                <h3 className="h5 mb-2">{it.title}</h3>
                <p className="mb-3 small opacity-90">{it.desc}</p>
                <Link href={it.href} className="book-link flex items-center">
                  View Deal
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
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { packages } from "@/data/packages";
import Image from "next/image";
import Link from "next/link";

export default function PackagesSection() {
  return (
    <section>
      <div className="cs_height_135 cs_height_lg_75" />
      <div className="container">
        <div className="cs_section_heading cs_style_1 text-center">
          <h3
            className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24"
            style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
          >
            CHOOSE YOUR PACKAGE
          </h3>
          <h2
            className="cs_section_title cs_semibold cs_fs_56 mb-0 wow fadeInUp"
            data-wow-duration="0.8s"
            data-wow-delay="0.2s"
            style={{ fontFamily: "Playfair" }}
          >
            Popular Tours Packages
          </h2>
        </div>
        <div className="cs_height_55 cs_height_lg_40" />
      </div>

      <div className="container">
        <div className="row cs_gap_y_24">
          {packages.map((p, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <Link key={p.id} href={`/packages/${p.slug}`}>
                <article className="package-card position-relative overflow-hidden">
                  {/* Image section */}
                  <div className="card-img-wrap">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover"
                      priority={i < 3}
                    />
                  </div>

                  {/* Content overlay */}
                  <div className="card-overlay" />

                  <div className="card-content position-absolute w-100 h-100 d-flex flex-column justify-content-end p-[25px]">
                    {/* <div className="cs_card_meta cs_white_color d-flex gap-3 mb-2">
                    <div>
                      <i className="fa-solid fa-location-dot me-1" />
                      <span style={{ fontFamily: "Playfair" }}>
                        {p.location}
                      </span>
                    </div>
                    <div>
                      <i className="fa-regular fa-clock me-1" />
                      <span style={{ fontFamily: "Playfair" }}>{p.days}</span>
                    </div>
                    <div>
                      <i className="fa-solid fa-star me-1" />
                      <span style={{ fontFamily: "Playfair" }}>{p.rating}</span>
                    </div>
                  </div> */}

                    <h2
                      className="cs_card_title cs_fs_24 cs_medium text-white"
                      style={{ fontFamily: "Playfair" }}
                    >
                      <Link
                        href="/booking"
                        className="text-white text-decoration-none"
                      >
                        {p.title}
                      </Link>
                    </h2>

                    <div className="d-flex justify-content-between align-items-center mt-3 hid">
                      <Link
                        href="/booking"
                        className=" fw-semibold buy-btn"
                        aria-label={`Buy ${p.title}`}
                        style={{ fontFamily: "Playfair" }}
                      >
                        Get Now
                      </Link>
                      <span className="cs_card_price cs_fs_24 cs_medium text-white mb-0">
                        {p.price}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Scoped styles */}
    </section>
  );
}

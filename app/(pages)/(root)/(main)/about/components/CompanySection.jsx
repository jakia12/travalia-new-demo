// app/_components/CompanySection.jsx
"use client";

import Image from "next/image";

export default function CompanySection() {
  return (
    <section className="container py-5 py-lg-6">
      {/* Centered heading */}
      <div className="row justify-content-center text-center">
        <div className="col-lg-9">
          <div className="cs_section_heading cs_style_1 text-center">
            <h3
              className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24"
              style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
            >
              Our Values
            </h3>
            <h2
              className="cs_section_title cs_semibold cs_fs_56 mb-0"
              style={{ fontFamily: "Playfair" }}
            >
              Visit Our Natural Paradise And Reconnect With Yourself
            </h2>
          </div>

          <div className="cs_height_55 cs_height_lg_40" />
          <p className="lead text-secondary mb-0">
            Indulge in unforgettable All-Inclusive holidays in the Maldives with
            our portfolio of luxury resorts—crafted for every desire. From spa
            serenity and ocean adventures to honeymoon romance and seamless
            corporate travel, each stay is tailored for a truly bespoke
            experience.
          </p>
          <p className="lead text-secondary mb-0">
            Each of our unique packages includes accommodation, round-trip
            transfers to the resort, and all stay taxes, ensuring a seamless and
            hassle-free experience from start to finish.
          </p>
          <p className="lead text-secondary mb-0">
            Upon arrival at the airport, our dedicated Airport Team warmly
            welcomes you and ensures a smooth transfer to your chosen resort.
            And as you bid farewell to Maldives, our Airport Team will be there
            to assist with the check-in process for your international flight.
          </p>
        </div>
      </div>

      {/* Content rows */}
      <div className="row align-items-start g-4 g-lg-5 mt-4 mt-lg-5">
        {/* Left column: big image */}
        <div className="col-12 col-lg-6">
          <div className="company-photo rounded-4 overflow-hidden shadow-sm position-relative">
            <Image
              src="/img/ab1.webp" // ← replace with your image
              alt="Resort jetty and speedboat"
              fill
              sizes="(max-width: 992px) 100vw, 50vw"
              className="object-fit-cover"
            />
          </div>
        </div>

        {/* Right column: text + image */}
        <div className="col-12 col-lg-6">
          <div className="company-photo rounded-4 overflow-hidden shadow-sm position-relative">
            <Image
              src="/img/ab2.webp" // ← replace with your image
              alt="Resort jetty and speedboat"
              fill
              sizes="(max-width: 992px) 100vw, 50vw"
              className="object-fit-cover"
            />
          </div>
        </div>
      </div>

      {/* Tiny local styles (kept simple) */}
    </section>
  );
}

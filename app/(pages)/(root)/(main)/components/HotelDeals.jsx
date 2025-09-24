"use client";

import { FaCity } from "react-icons/fa";

const hotels = [
  {
    id: 1,
    city: "Amsterdam, Netherlands",
    title: "Inntel Hotels Amsterdam Landmark",
    rating: 8.5,
    ratingLabel: "Very Good",
    reviews: 8110,
    priceFrom: 269,
    img: "/images/h1.png",
  },
  {
    id: 2,
    city: "Barcelona, Spain",
    title: "Ilunion Barcelona",
    rating: 8.8,
    ratingLabel: "Excellent",
    reviews: 4249,
    priceFrom: 222,
    img: "/images/h2.png",
    endsIn: "2d:2h:57m",
  },
  {
    id: 3,
    city: "Paris, France",
    title: "Villa Alessandra",
    rating: 7.9,
    ratingLabel: "Good",
    reviews: 907,
    priceFrom: 256,
    img: "/images/h3.png",
    endsIn: "9d:2h:57m",
  },
];

export default function HotelDeals() {
  return (
    <section className=" my-5 hotel-deals">
      <div className="container">
        <div className="cs_section_heading cs_style_1 text-center">
          <h3
            className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24"
            style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
          >
            Explore Our Offer
          </h3>
          <h2
            className="cs_section_title cs_semibold cs_fs_56 mb-0 wow fadeInUp"
            data-wow-duration="0.8s"
            data-wow-delay="0.2s"
            style={{ fontFamily: "Playfair" }}
          >
            Best Hotel Deals
          </h2>
        </div>
        <div className="cs_height_55 cs_height_lg_40" />
      </div>

      <div className="container">
        <div className="row g-4">
          {hotels.map((h) => (
            <div className="col-12 col-md-6 col-lg-4" key={h.id}>
              <div className="card border-0 shadow-sm hotel-card h-100">
                <div className="position-relative">
                  <img
                    className="card-img-top "
                    src={h.img}
                    alt={h.title}
                    priority
                    style={{ borderRadius: "6px" }}
                  />

                  {/* top-right pill */}

                  {/* deal timer (if any) */}

                  {/* left/right chevrons (visual only) */}
                  <button className="hotel-chevron left" aria-label="prev">
                    ‹
                  </button>
                  <button className="hotel-chevron right" aria-label="next">
                    ›
                  </button>

                  {/* location chip */}
                  <span
                    className="hotel-location"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FaCity className="me-2 text-light" size={16} /> {h.city}
                  </span>

                  {/* dots (bottom-right) */}
                  <span className="hotel-dots">
                    <i></i>
                    <i></i>
                    <i></i>
                  </span>
                </div>

                <div className="card-body px-2 py-3">
                  <h6 className="mb-2" style={{ fontFamily: "Playfair" }}>
                    {h.title}
                  </h6>

                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="stars" aria-label="rating">
                      ★★★★☆
                    </div>
                    <span className="badge bg-success-subtle text-success-emphasis">
                      {h.rating}
                    </span>
                    <span className="text-muted small">
                      {h.ratingLabel} ({h.reviews})
                    </span>
                  </div>

                  <div className="mt-1">
                    <span className="text-muted small me-1">from</span>
                    <span className="fs-4 fw-bold">${h.priceFrom}</span>
                    <span className="text-muted small ms-1">/ room</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

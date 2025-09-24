// app/_components/RoomsList.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function RoomsList() {
  const ROOMS = [
    {
      title: "Ocean Pool Villa – The Ritz-Carlton Maldives",
      meta: "(Max 3 Adults) (150 Sqm) Ocean Pool Villa, 1 King, Sofa bed, Mini fridge, 150sqm/1614sqft, Living/sitting area, Wireless internet (complimentary), Coffee/tea maker",
      img: "/images/h1.png", // put your image in /public/img
    },
    {
      title: "Lagoon Pool Villa – The Ritz-Carlton Maldives",
      meta: "(Max 3 Adults) (150 Sqm) Lagoon Pool Villa, 1 King, Sofa bed, Mini fridge, 150sqm/1614sqft, Living/sitting area, Wireless internet (complimentary), Coffee/tea maker",
      img: "/images/h2.png",
    },
    {
      title: "Beach Pool Villa – The Ritz-Carlton Maldives",
      meta: "(Max 3 Adults) (155 Sqm) Beach Pool Villa, 1 King, Sofa bed, Mini fridge, 155sqm/1668sqft, Living/sitting area, Wireless internet (complimentary), Coffee/tea maker",
      img: "/images/h3.png",
    },
    {
      title: "Sunset Overwater Pool Villa – The Ritz-Carlton Maldives",
      meta: "(Max 3 Adults) (150 Sqm) Sunset Overwater Pool Villa, 1 King, Sofa bed, Private pool, Mini fridge, 150sqm/1614sqft, Ocean deck with loungers, Wireless internet (complimentary), Coffee/tea maker",
      img: "/images/h4.webp",
    },
  ];

  return (
    <section className="py-5" style={{ background: "#f3fbfb" }}>
      <div className="container">
        <h2
          className="text-center fw-semibold mb-4"
          style={{ fontFamily: "Playfair" }}
        >
          Rooms
        </h2>

        <div className="vstack gap-5">
          {ROOMS.map((r) => (
            <article
              key={r.title}
              className="card border-0 shadow-sm rounded-4"
              style={{ background: "#fff" }}
            >
              <div className="card-body p-4">
                <div className="row g-4 align-items-center">
                  {/* Image */}
                  <div className="col-12 col-md-3">
                    <div className="ratio ratio-4x3 rounded-3 overflow-hidden">
                      <Image
                        src={r.img}
                        alt={r.title}
                        fill
                        className="object-fit-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                        priority={false}
                      />
                    </div>
                  </div>

                  {/* Title + Meta */}
                  <div className="col-12 col-md-7">
                    <h3 className="h5 mb-2 fw-semibold">{r.title}</h3>
                    <p className="text-secondary small mb-0">{r.meta}</p>
                  </div>

                  {/* CTA */}
                  <div className="col-12 col-md-2 text-md-end">
                    <Link
                      href="/booking"
                      className="btn px-3 py-2 fw-semibold shadow-sm"
                      style={{
                        background: "#2ecc71",
                        borderColor: "#2ecc71",
                        color: "#fff",
                      }}
                      aria-label={`Book ${r.title}`}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* tiny scoped tweaks */}
      <style jsx>{`
        .object-fit-cover {
          object-fit: cover;
        }
      `}</style>
    </section>
  );
}

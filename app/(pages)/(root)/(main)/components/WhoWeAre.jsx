"use client";

import Link from "next/link";

export default function WhoWeAre() {
  return (
    <section className="  ">
      <div className="row align-items-center">
        {/* Left side - Image */}
        <div className="col-md-6 p-0">
          <div className="h-100 w-100">
            <img
              src="/abt.webp" // put your image inside /public/images
              alt="Who we are"
              className="img-fluid w-100 h-100 object-fit-cover"
              priority
            />
          </div>
        </div>

        {/* Right side - Text */}
        <div className="col-md-6 d-flex flex-column justify-content-center p-5">
          <h2
            className="fw-bold mb-3 text-[60px]"
            style={{ fontFamily: "Playfair" }}
          >
            Who We Are
          </h2>
          <p className="lead text-muted">
            We are a luxury travel agency based in the Maldives, specializing in
            tailor-made journeys that reflect the unique dreams of every
            traveler. Our team provides expert consultancy services, ensuring
            every detail of your holiday is seamlessly curated. We also offer
            world-class MICE solutions, from corporate retreats to incentive
            programs, with precision and style. As a trusted destination
            management company, we deliver authentic experiences that highlight
            the very best of the Maldives.
          </p>
          <Link
            href="/tours"
            style={{ textDecoration: "none" }}
            className="btn_abt block items-center rounded border-[3px] hover:border-white/80 border-[#2ecc71] text-lg px-[35px] py-3 text-white backdrop-blur transition bg-[#2ecc71] hover:bg-[#2ecc71] shadow-2xl "
          >
            Book Your Tour
          </Link>
        </div>
      </div>
    </section>
  );
}

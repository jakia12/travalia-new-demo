"use client";

import Image from "next/image";
import Link from "next/link";

export default function MaldivesOffersCTA({
  imageSrc = "/img/gl1.webp",
  title = "Save More On Your Maldives Getaway",
  subtitle = "Browse our latest Maldives holiday deals and enjoy exclusive savings on resorts, all-inclusive packages, and special add-ons.",
  ctaText = "More Offers",
  ctaHref = "/offers",
}) {
  return (
    <section className="relative w-full pt-[80px] pb-[100px]">
      {/* Hero */}
      <div className="relative h-[340px] md:h-[420px] lg:h-[500px] overflow-hidden">
        <Image src={imageSrc} alt="" fill priority className="object-cover" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-3xl text-center text-white">
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              {title}
            </h2>
            <p className="mt-3 text-sm md:text-base opacity-90">{subtitle}</p>

            <Link
              href="/booking"
              style={{ textDecoration: "none" }}
              className="btn_abt block items-center rounded border-[3px] hover:border-white/80 border-[#2ecc71] text-lg px-[35px] py-[10px] text-white backdrop-blur transition bg-[#2ecc71] hover:bg-[#2ecc71] shadow-2xl "
            >
              Book Your Tour
            </Link>
          </div>
        </div>
      </div>

      {/* Thin divider like in the screenshot */}
      <div className="h-px w-full bg-white/20" />
    </section>
  );
}

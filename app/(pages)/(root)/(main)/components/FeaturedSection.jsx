// components/FeaturedSection.jsx
"use client";

import Image from "next/image";

const FEATURES = [
  {
    title: "Tailored Trips",
    icon: "/images/icons/feature_icon_1.svg",
    desc: `Built around your dates, budget, and vibe—honeymoon, family, wellness, or diving—so every day feels made for you.`,
  },
  {
    title: "Handpicked Resorts",
    icon: "/images/icons/feature_icon_2.svg",
    desc: `Verified 4–5★ properties with all-inclusive options, private villas, and perks we’ve negotiated for your stay.`,
  },
  {
    title: "Seamless Transfers",
    icon: "/images/icons/feature_icon_3.svg",
    desc: `Return speedboat or seaplane transfers aligned to your flight, plus airport meet-and-greet for a smooth arrival.`,
  },
  {
    title: "24/7 Support",
    icon: "/images/icons/feature_icon_4.svg",
    desc: `WhatsApp support from arrival to departure—changes, add-ons, and special requests handled fast`,
  },
];

export default function FeaturedSection() {
  return (
    <section
      className="cs_featured cs_style_1 cs_bg_filed"
      style={{
        backgroundImage: 'url("/images/feature_bg.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="cs_height_140 cs_height_lg_80" />

      <div className="container mx-auto px-4">
        <div className="row cs_gap_y_40 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="col-lg-3 col-sm-6">
              <div className="cs_iconbox cs_style_1">
                <div className="cs_iconbox_icon cs_radius_15 cs_center">
                  <Image
                    src={f.icon}
                    alt={`${f.title} icon`}
                    width={64}
                    height={64}
                    priority={false}
                  />
                </div>
                <h2 className="cs_iconbox_title cs_fs_24 cs_semibold playfair">
                  {f.title}
                </h2>
                <p className="cs_iconbox_subtitle mb-0 whitespace-pre-line playfair">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cs_height_133 cs_height_lg_80" />
    </section>
  );
}

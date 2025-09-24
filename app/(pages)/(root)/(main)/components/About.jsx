// components/AboutSection.tsx (or .jsx)
"use client";

export default function About() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto container ">
        <div className=" flex flex-col items-center gap-[120px] px-4 lg:flex-row">
          {/* LEFT: image stack */}
          <div className="relative w-full max-w-[560px] pb-0 lg:pb-28">
            {/* Tall rounded shape */}
            <img
              src="/abt.png"
              alt="Sailing trip"
              className="rounded-xl"
              loading="lazy"
            />

            {/* Circular image overlapping bottom */}
          </div>

          {/* RIGHT: content */}
          <div className="max-w-2xl flex-1">
            <p className="mb-2 text-[#2ecc71] tracking-[0.2em] italic satisfy">
              ABOUT US
            </p>

            <h2 className="text-4xl leading-tight text-black drop-shadow-md md:text-6xl lg:text-7xl playfair title">
              We Plan. You Glow
            </h2>

            <div className="mt-6 flex items-start gap-4">
              <span className="mt-3 inline-block h-[3px] w-14 rounded bg-[#2ecc71]" />
              <p className="text-slate-600 text-lg">
                Planning a Maldives escape should feel effortless. Our
                destination experts design end-to-end itineraries—hand-selecting
                resorts, securing the right rates, and coordinating every
                transfer—so you can simply arrive and enjoy. From a warm
                meet-and-greet at the airport to a smooth resort check-in and
                stress-free departure, we’re with you at every step.
              </p>
            </div>

            <a
              href="tel:+1546378654"
              className="mt-4 inline-block font-semibold text-[#2ecc71] hover:text-[#2ecc71]/80 text-lg "
              style={{ color: "#2ecc71" }}
            >
              Speak to our Destination Experts at Direct Call +1 546 378 654
            </a>

            <ul className="mt-6 space-y-3 text-slate-700 text-lg">
              {[
                "All places and activities carefully curated",

                "We are an award-winning agency",
                "Trusted by over 80,000 happy travelers",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 grid h-[30px] w-[30px] place-items-center rounded-full bg-[#2ecc71]/10 text-[#2ecc71] shadow">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <a
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded bg-[#2ecc71] px-6 py-3 font-semibold text-white shadow hover:bg-[#2ecc71]/80"
            >
              Read More
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

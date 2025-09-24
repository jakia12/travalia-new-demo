import Link from "next/link";

// app/(marketing)/_components/TravelHero.tsx
export default function TravelHero() {
  return (
    <section className="relative 2xl:py-[400px] lg:py-[300px] py-[210px] w-full overflow-hidden ">
      {/* Background image layer (replace src with your own image under /public) */}
      <div className="absolute inset-0 bg-cover bg-center bgBan" />

      {/* Soft top mask for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p
          className="mb-4 text-xl tracking-[0.3em] text-white/80 md:text-base satisfy"
          style={{ fontSize: "28px", color: "#2ecc71", letterSpacing: "0.3em" }}
        >
          YOUR JOURNEY BEGINS HERE
        </p>

        <h1
          className="text-4xl leading-tight text-white drop-shadow-md md:text-6xl lg:text-7xl playfair"
          style={{ fontSize: "70px", fontWeight: "700" }}
        >
          Discover & Book
          <br className="hidden md:block" /> Unforgettable Destinations
        </h1>

        {/* CTA buttons */}
        <div className="mt-[60px] flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/resorts"
            style={{ textDecoration: "none" }}
            className="group inline-flex items-center rounded border-[3px] border-white/80 text-lg px-[35px] py-3 text-white backdrop-blur transition hover:bg-[#2ecc71] bg-white/15 shadow-2xl "
          >
            Explore Now
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
          <Link
            href="/booking"
            style={{ textDecoration: "none" }}
            className="group inline-flex items-center rounded border-[3px] hover:border-white/80 border-[#2ecc71] text-lg px-[35px] py-3 text-white backdrop-blur transition bg-[#2ecc71] hover:bg-white/15 shadow-2xl "
          >
            Book Your Tour
          </Link>
        </div>
      </div>

      {/* Decorative glass chip in corner */}
      <div className="pointer-events-none absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
    </section>
  );
}

// app/resorts/[slug]/page.jsx
import { getResortBySlug, resorts } from "@/data/resorts";
import Image from "next/image";
import Link from "next/link";
import { PiCaretDoubleLeftBold } from "react-icons/pi";
import BookingWidget from "../components/BookingWidget";

/* ---------------- helpers (server-safe) ---------------- */
function num(x) {
  if (x == null) return 0;
  if (typeof x === "number" && isFinite(x)) return x;
  if (typeof x === "string") {
    const n = Number(x.replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

/* ------------- static params + SEO ------------- */
export async function generateStaticParams() {
  return resorts.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = params ?? {};
    const resort =
      typeof getResortBySlug === "function" ? getResortBySlug(slug) : null;

    if (!resort) {
      return {
        title: "Resort not found",
        description: "The resort you requested could not be found.",
        alternates: { canonical: `/resorts/${slug || ""}` },
      };
    }

    const title =
      resort?.seo?.seoTitle ||
      (resort?.name ? `${resort.name} | Maldives Resort` : "Resort");

    const description =
      resort?.seo?.seoDescription ||
      resort?.short ||
      "Explore detailed information, rooms, dining, transfers, and policies.";

    const gallery = Array.isArray(resort?.gallery)
      ? resort.gallery.filter(Boolean)
      : [];
    const ogImages = gallery.length
      ? gallery.map((src) => ({ url: String(src) }))
      : resort?.img
      ? [{ url: String(resort.img) }]
      : undefined;

    return {
      title,
      description,
      alternates: { canonical: `/resorts/${resort.slug || slug || ""}` },
      openGraph: {
        title,
        description,
        images: ogImages,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ogImages?.[0]?.url ? [ogImages[0].url] : undefined,
      },
    };
  } catch {
    return { title: "Resort", description: "Explore resort details." };
  }
}

/* ---------------- small UI helpers ---------------- */
function StarRating({ value = 0 }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span aria-label={`${value} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <i key={`f${i}`} className="bi bi-star-fill text-warning me-1" />
      ))}
      {half && <i className="bi bi-star-half text-warning me-1" />}
      {Array.from({ length: empty }).map((_, i) => (
        <i key={`e${i}`} className="bi bi-star text-warning me-1" />
      ))}
    </span>
  );
}
function BadgeList({ items = [] }) {
  if (!items?.length) return null;
  return (
    <div className="d-flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="badge rounded-pill text-bg-light border">
          {t}
        </span>
      ))}
    </div>
  );
}
function InfoRow({ label, children }) {
  return (
    <>
      <dt className="col-5 text-black">{label}</dt>
      <dd className="col-7 mb-2">{children}</dd>
    </>
  );
}
function SectionHeader({ id, title, subtitle }) {
  return (
    <header id={id} className="mb-3">
      <h2 className="h4 fw-semibold mb-1" style={{ fontFamily: "playfair" }}>
        {title}
      </h2>
      {subtitle ? <p className="text-black mb-0">{subtitle}</p> : null}
    </header>
  );
}
function Divider() {
  return <hr className="my-4" />;
}

/* ---------------- sections ---------------- */
function AtAGlance({ resort }) {
  const highlights = resort?.highlights?.highlights || [];
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="overview" title="Overview" />
        <p className="mb-3" style={{ fontSize: "16px" }}>
          {resort.description}
        </p>
        {highlights.length ? (
          <>
            <h6
              className="text-uppercase  small mb-2 font-bold"
              style={{ fontFamily: "playfair" }}
            >
              Highlights
            </h6>
            <ul className="list-unstyled mb-0">
              {highlights.map((h) => (
                <li key={h} className="mb-1">
                  <i
                    className="bi bi-check-circle-fill me-2"
                    style={{ color: "#2ecc71" }}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  );
}
function Amenities({ resort }) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="amenities" title="Amenities" />
        <BadgeList items={resort.amenities} />
      </div>
    </div>
  );
}
function Dining({ resort }) {
  const r = resort?.dining?.restaurants || [];
  const b = resort?.dining?.bars || [];
  if (!r.length && !b.length) return null;
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="dining" title="Dining & Bars" />
        {!!r.length && (
          <>
            <h6 className="mb-2">Restaurants</h6>
            <ul className="list-unstyled">
              {r.map((x) => (
                <li key={x.name} className="mb-2">
                  <strong>{x.name}</strong>
                  {x.cuisine ? (
                    <>
                      {" "}
                      — <span className="text-black">{x.cuisine}</span>
                    </>
                  ) : null}
                  <div className="small text-black">
                    {[x.hours, x.location, x.dressCode]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {!!b.length && (
          <>
            <Divider />
            <h6 className="mb-2">Bars & Cafés</h6>
            <ul className="list-unstyled mb-0">
              {b.map((x) => (
                <li key={x.name} className="mb-1">
                  <strong>{x.name}</strong>
                  {x.hours ? (
                    <span className="text-black"> — {x.hours}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
function Wellness({ resort }) {
  const spa = resort?.wellness?.spa;
  const fitness = resort?.wellness?.fitness || [];
  const programs = resort?.wellness?.wellnessPrograms || [];
  if (!spa && !fitness.length && !programs.length) return null;
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="wellness" title="Wellness & Spa" />
        {spa ? (
          <div className="mb-3">
            <h6 className="mb-1">{spa.name || "Resort Spa"}</h6>
            {spa.highlights?.length ? (
              <ul className="small text-black mb-0">
                {spa.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        {fitness.length ? (
          <>
            <h6 className="mb-1">Fitness & Recreation</h6>
            <BadgeList items={fitness} />
          </>
        ) : null}
        {programs.length ? (
          <>
            <Divider />
            <h6 className="mb-1" style={{ fontFamily: "playfair" }}>
              Wellness Programs
            </h6>
            <BadgeList items={programs} />
          </>
        ) : null}
      </div>
    </div>
  );
}
function Activities({ resort }) {
  const onWater = resort?.activities?.onWater || [];
  const onLand = resort?.activities?.onLand || [];
  const kids = resort?.activities?.forKids || [];
  if (!onWater.length && !onLand.length && !kids.length) return null;
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="activities" title="Activities" />
        {onWater.length ? (
          <>
            <h6 className="mb-1">On the Water</h6>
            <BadgeList items={onWater} />
          </>
        ) : null}
        {onLand.length ? (
          <>
            <Divider />
            <h6 className="mb-1" style={{ fontFamily: "playfair" }}>
              On Land
            </h6>
            <BadgeList items={onLand} />
          </>
        ) : null}
        {kids.length ? (
          <>
            <Divider />
            <h6 className="mb-1">For Families</h6>
            <BadgeList items={kids} />
          </>
        ) : null}
      </div>
    </div>
  );
}
function Rooms({ resort }) {
  const rooms = resort?.rooms || [];
  if (!rooms.length) return null;
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="rooms" title="Rooms & Villas" />
        <div className="row g-3">
          {rooms.map((room) => (
            <div key={room.id} className="col-12 col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div
                  className="position-relative"
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={room.photos?.[0] || resort.img}
                    alt={`${room.name}`}
                    fill
                    className="object-fit-cover rounded-top"
                  />
                </div>
                <div className="card-body">
                  <h6 className="mb-1">{room.name}</h6>
                  <div className="small text-black mb-2">
                    {room.category?.toUpperCase()} ·{" "}
                    {room.sizeSqm ? `${room.sizeSqm} m² · ` : ""}
                    Sleeps {room.maxOccupancy} · {room.view}
                    {room.privatePool ? " · Private Pool" : ""}
                  </div>
                  {!!room.bedConfig?.length && (
                    <div className="small mb-2">
                      <i className="bi bi-moon-stars me-1" />
                      {room.bedConfig.join(" / ")}
                    </div>
                  )}
                  {!!room.features?.length && (
                    <ul className="small text-black mb-0">
                      {room.features.slice(0, 4).map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="alert alert-light border mt-3 mb-0 small">
          Specific layouts and inclusions can vary by date and offer. Ask our
          team for the best-fit villa.
        </div>
      </div>
    </div>
  );
}

/* ---------------- page (server) ---------------- */
export default function ResortDetailPage({ params }) {
  const resort = getResortBySlug(params.slug);

  if (!resort) {
    return (
      <div className="container py-5">
        <h1 className="h4 fw-semibold">Resort not found.</h1>
        <Link href="/resorts" className="link-primary d-inline-block mt-2">
          Back to resorts
        </Link>
      </div>
    );
  }

  // Basic snapshot for “Starting From”
  const baseRate =
    num(resort?.price?.from) ||
    num(resort?.priceFrom) ||
    num(resort?.price?.base) ||
    num(resort?.price?.amount) ||
    num(resort?.pricePerNight) ||
    num(resort?.rate?.nightly);

  return (
    <>
      <div className="resort-text-16">
        {/* Top banner */}
        <section
          className="text-white d-flex align-items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${resort.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "44vh",
          }}
        >
          <div className="container text-center">
            <p
              className="text-uppercase mb-2"
              style={{ letterSpacing: ".12em", color: "#9AE6B4" }}
            >
              {resort.island}
            </p>
            <h1
              className="display-5 fw-bold"
              style={{ fontFamily: "playfair" }}
            >
              {resort.name}
            </h1>
            <p className="lead mb-0">{resort.short}</p>
          </div>
        </section>

        <main className="container py-5">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/resorts" className="text-decoration-none">
                  Resorts
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {resort.name}
              </li>
            </ol>
          </nav>

          {/* Quick TOC */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body py-2">
              <div className="d-flex flex-wrap gap-2">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "rooms", label: "Rooms" },
                  { id: "dining", label: "Dining" },
                  { id: "wellness", label: "Wellness" },
                  { id: "activities", label: "Activities" },
                ].map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="btn btn-sm btn-outline-dark"
                  >
                    {t.label}
                  </a>
                ))}
                <div className="ms-auto d-none d-md-inline">
                  <button
                    className={`${
                      resort.available ? "bg-[#2ECC71]" : "bg-red-600"
                    } text-white py-[8px] px-[34px] rounded`}
                  >
                    {resort.available ? "Available" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="row g-4">
            {/* Left content */}
            <div className="col-lg-8">
              {/* Gallery */}
              <div className="row g-3 mb-4">
                {resort.gallery.map((src, i) => (
                  <div key={src} className={i === 0 ? "col-12" : "col-6"}>
                    <div
                      className="position-relative rounded-4 overflow-hidden shadow-sm"
                      style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
                    >
                      <Image
                        src={src}
                        alt={`${resort.name} photo ${i + 1}`}
                        fill
                        className="object-fit-cover"
                        sizes={
                          i === 0 ? "(min-width: 992px) 66vw, 100vw" : "33vw"
                        }
                        priority={i === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Sections */}
              <AtAGlance resort={resort} />
              <Amenities resort={resort} />
              <Rooms resort={resort} />
              <Dining resort={resort} />
              <Wellness resort={resort} />
              <Activities resort={resort} />
            </div>

            {/* Right sidebar */}
            <div className="col-lg-4">
              <div className="position-sticky" style={{ top: "90px" }}>
                {/* Resort facts */}
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h5
                      className="fw-semibold mb-3"
                      style={{ fontFamily: "playfair" }}
                    >
                      Resort Facts
                    </h5>
                    <dl className="row small mb-0">
                      <InfoRow label="Island">{resort.island}</InfoRow>
                      <InfoRow label="Rating">
                        <StarRating value={resort.rating} />{" "}
                        <span className="ms-1">{resort.rating}</span>
                      </InfoRow>
                      <InfoRow label="Starting From">
                        ${baseRate} / night
                      </InfoRow>
                      <InfoRow label="Tags">
                        <BadgeList items={resort.tags} />
                      </InfoRow>
                    </dl>
                  </div>

                  {/* Client booking widget */}
                  <div className="p-3 pt-0">
                    <BookingWidget resort={resort} />
                  </div>
                </div>

                {/* Back link */}
                <Link
                  href="/"
                  className=" mt-[30px] text-blue-500 flex items-center gap-1 "
                >
                  <span>
                    <PiCaretDoubleLeftBold />
                  </span>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* JSON-LD (basic) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Resort",
              name: resort.name,
              description: resort.short || resort.description,
              address: {
                "@type": "PostalAddress",
                addressCountry: "MV",
                streetAddress: resort?.contact?.address || "",
              },
              starRating: {
                "@type": "Rating",
                ratingValue: resort.rating,
                bestRating: "5",
              },
              image: resort.gallery?.length ? resort.gallery : [resort.img],
              url: `https://example.com/resorts/${resort.slug}`,
              amenityFeature: (resort.amenities || []).map((a) => ({
                "@type": "LocationFeatureSpecification",
                name: a,
              })),
            }),
          }}
        />
      </div>
    </>
  );
}

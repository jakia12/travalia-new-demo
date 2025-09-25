// app/packages/[slug]/page.jsx
import { getPackageBySlug, packages } from "@/data/packages";
import Image from "next/image";
import Link from "next/link";
import SidebarBookingCard from "../components/SidebarBookingCard";

export async function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

function firstImg(pkg) {
  return pkg.images?.[0] || "/placeholder.jpg";
}

function cityCountry(loc) {
  if (!loc) return "";
  const parts = [loc.city, loc.country].filter(Boolean);
  return parts.join(", ");
}

export default function PackageDetailPage({ params }) {
  const pkg = getPackageBySlug(params.slug);

  if (!pkg) {
    return (
      <div className="container py-5">
        <h1 className="h4 fw-semibold">Package not found.</h1>
        <Link href="/packages" className="link-primary d-inline-block mt-2">
          Back to packages
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <section
        className="text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${firstImg(
            pkg
          )})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-end">
            <div className="col-lg-8">
              <span className="badge bg-success mb-3">
                {pkg.category?.toUpperCase() || "PACKAGE"}
              </span>
              <h1 className="display-5 fw-bold mb-2">{pkg.title}</h1>
              <p className="lead mb-3">{pkg.summary}</p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-light text-dark">
                  📍 {cityCountry(pkg.location)}
                </span>
                <span className="badge bg-light text-dark">
                  ⏱ {pkg.durationDays} days
                  {pkg.nights ? ` / ${pkg.nights} nights` : ""}
                </span>
                {pkg.rating ? (
                  <span className="badge bg-light text-dark">
                    ⭐ {pkg.rating} ({pkg.reviewsCount || 0})
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link href="/packages" className="text-decoration-none">
                Packages
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {pkg.title}
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* LEFT */}
          <div className="col-lg-8">
            {/* Gallery */}
            <div
              className="position-relative rounded-4 overflow-hidden shadow-sm mb-3"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={firstImg(pkg)}
                alt={pkg.title}
                fill
                className="object-fit-cover"
                priority
              />
            </div>

            {/* Highlights */}
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body">
                <h3
                  className="h5 fw-semibold mb-3"
                  style={{ fontFamily: "playfair" }}
                >
                  Highlights
                </h3>
                {pkg.highlights?.length ? (
                  <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                    {pkg.highlights.map((h) => (
                      <li key={h}>
                        <span className="badge rounded-pill text-bg-light border">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted mb-0">No highlights listed.</p>
                )}
              </div>
            </div>

            {/* Overview */}
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body">
                <h3
                  className="h5 fw-semibold mb-3"
                  style={{ fontFamily: "playfair" }}
                >
                  Overview
                </h3>
                <p className="mb-0 text-[17px] leading-9">
                  {pkg.longDescription}
                </p>
              </div>
            </div>

            {/* Itinerary */}
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body" style={{ fontSize: "16px" }}>
                <h3
                  className="h5 fw-semibold mb-3"
                  style={{ fontFamily: "playfair" }}
                >
                  Itinerary
                </h3>
                {pkg.itinerary?.length ? (
                  <ol className="mb-0" style={{ paddingLeft: "0" }}>
                    {pkg.itinerary.map((d) => (
                      <li className="mb-2" key={`day-${d.day}`}>
                        <strong>
                          Day {d.day}: {d.title}
                        </strong>{" "}
                        <span className="text-muted">— {d.description}</span>{" "}
                        <span
                          className={`badge ms-1 ${
                            d.included ? "text-bg-success" : "text-bg-secondary"
                          }`}
                        >
                          {d.included ? "Included" : "Optional"}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-muted mb-0">
                    Itinerary details coming soon.
                  </p>
                )}
              </div>
            </div>

            {/* Inclusions / Exclusions */}
            {/* <div className="row g-3">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h3 className="h6 fw-semibold mb-2">Included</h3>
                    <ul className="mb-0 ps-3">
                      {(pkg.inclusions || []).map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                      {!pkg.inclusions?.length && (
                        <li className="text-muted">No inclusions listed.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h3 className="h6 fw-semibold mb-2">Not included</h3>
                    <ul className="mb-0 ps-3">
                      {(pkg.exclusions || []).map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                      {!pkg.exclusions?.length && (
                        <li className="text-muted">Not specified.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Featured review */}
            {pkg.featuredReview ? (
              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body">
                  <div className="d-flex align-items-start">
                    <div
                      className="rounded-circle bg-dark-subtle me-3"
                      style={{ width: 44, height: 44 }}
                    />
                    <div>
                      <div className="small text-muted mb-1">
                        ⭐ {pkg.rating} ({pkg.reviewsCount} reviews)
                      </div>
                      <p className="mb-1">“{pkg.featuredReview.text}”</p>
                      <div className="small text-muted">
                        — {pkg.featuredReview.author}, {pkg.featuredReview.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* RIGHT — Booking */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: "90px" }}>
              <SidebarBookingCard pkg={pkg} /> {/* ← new useful sidebar */}
              <Link
                href="/packages"
                className="btn btn-outline-dark w-100 rounded-pill mt-3"
              >
                ← Back to all packages
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

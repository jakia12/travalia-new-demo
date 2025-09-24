import { getPackageBySlug, packages } from "@/data/packages";
import Image from "next/image";
import Link from "next/link";

// (optional) pre-generate static pages for these slugs
export async function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
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
      {/* banner section */}
      <section
        className="cs_page_header cs_bg_filed cs_primary_bg py-[100px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${pkg.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0",
        }}
      >
        <div className="container text-center text-white">
          <h1 className="cs_page_title fw-bold display-4 mb-3">{pkg.title}</h1>
          {/* <p className="cs_page_subtitle fs-5 mb-0">{pkg.short}</p> */}
        </div>
      </section>

      {/* packge description */}
      <main className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
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

        {/* Title */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h2 fw-bold mb-0">{pkg.title}</h1>
          <span className="badge text-bg-success fs-6 px-3 py-2">
            ${pkg.price.toLocaleString()}
          </span>
        </div>
        <p className="text-muted mb-4">{pkg.short}</p>

        <div className="row g-4">
          {/* LEFT: main details */}
          <div className="col-lg-8">
            {/* Hero image */}
            <div
              className="position-relative overflow-hidden rounded-4 shadow-sm mb-4"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                src={pkg.img}
                alt={pkg.title}
                fill
                className="object-fit-cover"
                sizes="(min-width: 992px) 66vw, 100vw"
                priority
              />
              <span className="position-absolute top-0 start-0 m-3 badge text-bg-danger rounded-pill">
                📍 {pkg.location}
              </span>
              <span className="position-absolute top-0 end-0 m-3 badge text-bg-light text-dark rounded-pill">
                ⏱ {pkg.days} days
              </span>
            </div>

            {/* Highlights */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h3 className="h5 fw-semibold mb-3">Highlights</h3>
                <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                  {pkg.highlights.map((h) => (
                    <li key={h}>
                      <span className="badge rounded-pill text-bg-light border">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Description */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h3 className="h5 fw-semibold mb-3">Overview</h3>
                <p>
                  Enjoy a curated experience featuring the best of{" "}
                  {pkg.location}. This package balances relaxation and
                  activities over <strong>{pkg.days} days</strong>, with
                  hand-picked highlights and local touches.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: info + advisor */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: "90px" }}>
              {/* Actions */}
              {/* <div className="d-flex gap-2 mb-3">
              <button className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-share me-1" /> Share
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-heart me-1" /> Save
              </button>
            </div> */}

              {/* Trip overview */}
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Trip overview</h5>
                  <dl className="row mb-0 small">
                    <dt className="col-5 text-muted">Location</dt>
                    <dd className="col-7 mb-2">{pkg.location}</dd>

                    <dt className="col-5 text-muted">Duration</dt>
                    <dd className="col-7 mb-2">{pkg.days} days</dd>

                    <dt className="col-5 text-muted">Ideal for</dt>
                    <dd className="col-7 mb-2">Couples · Families · Friends</dd>

                    <dt className="col-5 text-muted">Best season</dt>
                    <dd className="col-7 mb-2">Nov – Apr</dd>
                  </dl>

                  <hr className="my-3" />
                  <div className="d-flex flex-wrap gap-2">
                    {pkg.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="badge rounded-pill text-bg-light border"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* <a
                  href="/brochures/sample-trip.pdf"
                  className="btn btn-dark w-100 mt-3"
                  download
                >
                  <i className="bi bi-file-earmark-arrow-down me-2" />
                  Download brochure (PDF)
                </a> */}
                </div>
              </div>

              {/* Travel advisor */}
              <div className="p-3 bg-light rounded-3 h-100">
                <h6 className="fw-semibold mb-2">Included</h6>
                <ul className="mb-0 ps-3">
                  {pkg.highlights.slice(0, 3).map((h) => (
                    <li key={`inc-${h}`}>{h}</li>
                  ))}
                  <li>Resort/Hotel stay</li>
                  <li>Daily breakfast</li>
                </ul>
              </div>
              <div className="p-3 bg-light rounded-3 h-100">
                <h6 className="fw-semibold mb-2">Not included</h6>
                <ul className="mb-0 ps-3">
                  <li>International flights</li>
                  <li>Personal expenses</li>
                  <li>Optional add-ons</li>
                </ul>
              </div>

              <Link
                href="/packages"
                className="d-inline-block mt-3 text-decoration-none text-[#111] border-2 border-[#111] py-[10px] px-[40px]"
                style={{ color: "#000" }}
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

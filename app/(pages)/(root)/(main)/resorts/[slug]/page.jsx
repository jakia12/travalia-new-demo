import { getResortBySlug, resorts } from "@/data/resorts";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return resorts.map((r) => ({ slug: r.slug }));
}

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

  return (
    <>
      {/* Top banner using resort image */}
      <section
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${resort.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "42vh",
        }}
      >
        <div className="container text-center">
          <h1 className="display-5 fw-bold">{resort.name}</h1>
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

            {/* Overview */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="h4 fw-semibold mb-3">Overview</h2>
                <p className="mb-0">{resort.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h5 fw-semibold mb-3">Amenities</h2>
                <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                  {resort.amenities.map((a) => (
                    <li key={a}>
                      <span className="badge rounded-pill text-bg-light border">
                        {a}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right sidebar (info + advisor) */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: "90px" }}>
              {/* Quick facts */}
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Resort facts</h5>
                  <dl className="row small mb-0">
                    <dt className="col-5 text-muted">Island</dt>
                    <dd className="col-7 mb-2">{resort.island}</dd>

                    <dt className="col-5 text-muted">Rating</dt>
                    <dd className="col-7 mb-2">
                      <i className="bi bi-star-fill text-warning me-1" />
                      {resort.rating}
                    </dd>

                    <dt className="col-5 text-muted">From</dt>
                    <dd className="col-7 mb-2">${resort.priceFrom} / night</dd>

                    <dt className="col-5 text-muted">Tags</dt>
                    <dd className="col-7 mb-0">
                      <div className="d-flex flex-wrap gap-2">
                        {resort.tags.map((t) => (
                          <span
                            key={t}
                            className="badge rounded-pill text-bg-light border"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>

              {/* Advisor */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <img
                      src="/img/advisors/sara.jpg"
                      width={52}
                      height={52}
                      className="rounded-circle object-fit-cover"
                      alt="Advisor"
                    />
                    <div>
                      <div className="fw-semibold">Sara Alam</div>
                      <div className="small text-muted">Resort Specialist</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 small text-muted mb-3">
                    <span>
                      <i className="bi bi-star-fill text-warning me-1" /> 4.9
                    </span>
                    <span>·</span>
                    <span>
                      <i className="bi bi-clock me-1" /> Avg. reply: 1h
                    </span>
                  </div>

                  {/* <div className="d-grid gap-2">
                    <a
                      href="mailto:hello@example.com"
                      className="btn btn-outline-dark"
                    >
                      <i className="bi bi-envelope me-2" />
                      Email advisor
                    </a>
                    <a
                      href="https://wa.me/15551234567"
                      className="btn btn-success"
                    >
                      <i className="bi bi-whatsapp me-2" />
                      Chat on WhatsApp
                    </a>
                  </div>

                  <p className="small text-muted mt-3 mb-0">
                    Share your dates and preferences—Sara will suggest the best
                    villa types and perks.
                  </p> */}
                </div>
              </div>

              <Link
                href="/resorts"
                className="d-inline-block mt-3 text-decoration-none text-[#111] border-2 border-[#111] py-[10px] px-[40px]"
                style={{ color: "#000" }}
              >
                ← Back to all resorts
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

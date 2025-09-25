// app/resorts/[slug]/page.jsx
import { getResortBySlug, resorts } from "@/data/resorts";
import Image from "next/image";
import Link from "next/link";

// Create static pages for all resorts
export async function generateStaticParams() {
  return resorts.map((r) => ({ slug: r.slug }));
}

// booking info calc
// simple defaults for an estimate
const DEFAULT_NIGHTS = 3;
const DEFAULT_GUESTS = 2;

const nights = DEFAULT_NIGHTS;
const guests = DEFAULT_GUESTS;
const baseRate = resort?.priceFrom || 0;

const greenTaxPer = (() => {
  const m = resort?.fees?.mandatory?.find?.((x) =>
    (x.label || "").toLowerCase().includes("green tax")
  );
  if (!m?.amount) return 0;
  const match = String(m.amount).match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : 0;
})();

const baseTotal = baseRate * nights * guests;
const greenTaxTotal = greenTaxPer * nights * guests;
const taxes10 = Math.round(baseTotal * 0.1); // mirrors your booking calc
const grandTotal = baseTotal + greenTaxTotal + taxes10;

const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

// SEO from API (falls back gracefully)
export async function generateMetadata({ params }) {
  const resort = getResortBySlug(params.slug);
  if (!resort) {
    return {
      title: "Resort not found",
      description: "The resort you requested could not be found.",
    };
  }
  return {
    title: resort?.seo?.seoTitle || `${resort.name} | Maldives Resort`,
    description:
      resort?.seo?.seoDescription ||
      resort.short ||
      "Explore detailed information, rooms, dining, transfers, and policies.",
    alternates: { canonical: `/resorts/${resort.slug}` },
    openGraph: {
      title: resort?.seo?.seoTitle || resort.name,
      description:
        resort?.seo?.seoDescription ||
        resort.short ||
        "Explore detailed resort information.",
      images: resort.gallery?.length
        ? resort.gallery.map((src) => ({ url: src }))
        : [{ url: resort.img }],
      type: "website",
    },
  };
}

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
      <dt className="col-5 text-muted">{label}</dt>
      <dd className="col-7 mb-2">{children}</dd>
    </>
  );
}

function SectionHeader({ id, title, subtitle }) {
  return (
    <header id={id} className="mb-3">
      <h2 className="h4 fw-semibold mb-1">{title}</h2>
      {subtitle ? <p className="text-muted mb-0">{subtitle}</p> : null}
    </header>
  );
}

function Divider() {
  return <hr className="my-4" />;
}

function AtAGlance({ resort }) {
  const highlights = resort?.highlights?.highlights || [];
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="overview" title="Overview" />
        <p className="mb-3">{resort.description}</p>
        {highlights.length ? (
          <>
            <h6 className="text-uppercase text-muted small mb-2">Highlights</h6>
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
                      — <span className="text-muted">{x.cuisine}</span>
                    </>
                  ) : null}
                  <div className="small text-muted">
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
                    <span className="text-muted"> — {x.hours}</span>
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
              <ul className="small text-muted mb-0">
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
            <h6 className="mb-1">Wellness Programs</h6>
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
            <h6 className="mb-1">On Land</h6>
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
                  <div className="small text-muted mb-2">
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
                    <ul className="small text-muted mb-0">
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

function Transfers({ resort }) {
  const t = resort?.transfers;
  const list = t?.details || [];
  if (!list.length) return null;

  const iconFor = (mode) => {
    if (mode === "speedboat") return "bi bi-water";
    if (mode === "seaplane") return "bi bi-airplane";
    if (mode === "domestic+speedboat") return "bi bi-airplane-engines";
    if (mode === "yacht") return "bi bi-ship";
    return "bi bi-geo-alt";
  };

  const fmtCost = (c) =>
    !c
      ? null
      : [
          c.adult != null ? `Adult $${c.adult}` : null,
          c.child != null ? `Child $${c.child}` : null,
          c.infant != null ? `Infant $${c.infant}` : null,
        ]
          .filter(Boolean)
          .join(" / ");

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader
          id="transfers"
          title="Transfers"
          subtitle={`Arrive via ${
            t.airport || "MLE"
          } · Resort concierge will coordinate timings`}
        />
        <ul className="list-group list-group-flush">
          {list.map((x, i) => (
            <li key={i} className="list-group-item px-0">
              <div className="d-flex flex-wrap justify-content-between align-items-start">
                <div className="me-3">
                  <div className="fw-semibold">
                    <i className={`${iconFor(x.mode)} me-2`} />
                    {x.mode.replace("+", " + ").toUpperCase()}
                  </div>
                  <div className="small text-muted">
                    {x.durationMinutes
                      ? `${x.durationMinutes} min`
                      : "Duration varies"}{" "}
                    · {x.schedule}
                  </div>
                  {x.note && <div className="small text-muted">{x.note}</div>}
                </div>
                <div className="text-end">
                  {fmtCost(x.costUSD) ? (
                    <span className="badge text-bg-light border">
                      {fmtCost(x.costUSD)} · roundtrip
                    </span>
                  ) : (
                    <span className="badge text-bg-light border">
                      Rates on request
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {t?.note ? <div className="small text-muted mt-2">{t.note}</div> : null}
      </div>
    </div>
  );
}

function PoliciesFees({ resort }) {
  const p = resort?.policies || {};
  const f = resort?.fees || {};
  const mandatory = f?.mandatory || [];
  const optional = f?.optional || [];

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="policies" title="Policies & Fees" />
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <h6 className="mb-2">House Rules</h6>
            <dl className="row small mb-0">
              <InfoRow label="Check-in">{p.checkInFrom || "—"}</InfoRow>
              <InfoRow label="Check-out">{p.checkOutUntil || "—"}</InfoRow>
              <InfoRow label="Cancellation">
                {p.cancellation || "Varies by rate"}
              </InfoRow>
              <InfoRow label="Children">
                {p.children?.allowed ? "Allowed" : "Not allowed"}
                {p.children?.crib ? ` · Crib: ${p.children.crib}` : ""}
                {p.children?.extraBed
                  ? ` · Extra bed: ${p.children.extraBed}`
                  : ""}
              </InfoRow>
              <InfoRow label="Pets">
                {p.pets?.allowed ? "Allowed" : "Not allowed"}
                {p.pets?.note ? ` · ${p.pets.note}` : ""}
              </InfoRow>
              <InfoRow label="Smoking">{p.smoking || "—"}</InfoRow>
              <InfoRow label="Parties">{p.party || "—"}</InfoRow>
              <InfoRow label="Payments">
                <BadgeList items={p.paymentMethods || []} />
              </InfoRow>
            </dl>
          </div>

          <div className="col-12 col-lg-6">
            <h6 className="mb-2">Fees & Taxes</h6>
            {!!mandatory.length && (
              <>
                <div className="small text-uppercase text-muted mb-1">
                  Mandatory
                </div>
                <ul className="small mb-3">
                  {mandatory.map((m, i) => (
                    <li key={`m${i}`}>
                      <strong>{m.label}</strong> — {m.amount}
                      {m.per ? `, ${m.per}` : ""}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {!!optional.length && (
              <>
                <div className="small text-uppercase text-muted mb-1">
                  Optional
                </div>
                <ul className="small mb-0">
                  {optional.map((o, i) => (
                    <li key={`o${i}`}>
                      <strong>{o.label}</strong>
                      {o.amount ? ` — ${o.amount}` : ""}
                      {o.per ? `, ${o.per}` : ""}
                      {o.note ? ` · ${o.note}` : ""}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Extras({ resort }) {
  const near = resort?.nearby?.list || [];
  const access = resort?.accessibility?.list || [];
  const sust = resort?.sustainability || {};
  const langs = resort?.languages?.languagesSpoken || [];
  const contact = resort?.contact || {};
  if (
    !near.length &&
    !access.length &&
    !langs.length &&
    !contact.website &&
    !sust?.certifications?.length &&
    !sust?.practices?.length
  )
    return null;

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="more" title="Good to Know" />
        <div className="row g-4">
          {!!near.length && (
            <div className="col-12 col-md-6">
              <h6 className="mb-2">What’s Nearby</h6>
              <ul className="small mb-0">
                {near.map((n) => (
                  <li key={n.name}>
                    {n.name} {n.distance ? `— ${n.distance}` : ""}{" "}
                    {n.type ? `(${n.type})` : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!!access.length && (
            <div className="col-12 col-md-6">
              <h6 className="mb-2">Accessibility</h6>
              <ul className="small mb-0">
                {access.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {(sust?.certifications?.length || sust?.practices?.length) && (
            <div className="col-12 col-md-6">
              <h6 className="mb-2">Sustainability</h6>
              {sust?.certifications?.length ? (
                <>
                  <div className="small text-muted">Certifications</div>
                  <BadgeList items={sust.certifications} />
                </>
              ) : null}
              {sust?.practices?.length ? (
                <>
                  <Divider />
                  <div className="small text-muted">Practices</div>
                  <BadgeList items={sust.practices} />
                </>
              ) : null}
            </div>
          )}
          {(langs.length ||
            contact.website ||
            contact.email ||
            contact.phone) && (
            <div className="col-12 col-md-6">
              <h6 className="mb-2">Languages & Contact</h6>
              {langs.length ? (
                <div className="mb-2">
                  <div className="small text-muted">Languages spoken</div>
                  <BadgeList items={langs} />
                </div>
              ) : null}
              <dl className="row small mb-0">
                {contact.website && (
                  <InfoRow label="Website">
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                    >
                      {contact.website}
                    </a>
                  </InfoRow>
                )}
                {contact.email && (
                  <InfoRow label="Email">{contact.email}</InfoRow>
                )}
                {contact.phone && (
                  <InfoRow label="Phone">{contact.phone}</InfoRow>
                )}
                {contact.address && (
                  <InfoRow label="Address">{contact.address}</InfoRow>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FAQs({ resort }) {
  const faqs = resort?.faqs || [];
  if (!faqs.length) return null;
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <SectionHeader id="faq" title="FAQs" />
        <div className="accordion" id="faqAcc">
          {faqs.map((f, i) => {
            const id = `faq-${i}`;
            return (
              <div className="accordion-item" key={id}>
                <h2 className="accordion-header" id={`${id}-h`}>
                  <button
                    className={`accordion-button ${i ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${id}-c`}
                    aria-expanded={i === 0 ? "true" : "false"}
                    aria-controls={`${id}-c`}
                  >
                    {f.title}
                  </button>
                </h2>
                <div
                  id={`${id}-c`}
                  className={`accordion-collapse collapse ${
                    i === 0 ? "show" : ""
                  }`}
                  aria-labelledby={`${id}-h`}
                  data-bs-parent="#faqAcc"
                >
                  <div className="accordion-body small">{f.content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
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

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "rooms", label: "Rooms" },
    { id: "dining", label: "Dining" },
    { id: "wellness", label: "Wellness" },
    { id: "activities", label: "Activities" },
    { id: "transfers", label: "Transfers" },
    { id: "policies", label: "Policies & Fees" },
    { id: "faq", label: "FAQs" },
    { id: "more", label: "More" },
  ];

  return (
    <>
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

        {/* Quick TOC */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body py-2">
            <div className="d-flex flex-wrap gap-2">
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="btn btn-sm btn-outline-dark"
                >
                  {t.label}
                </a>
              ))}
              <div className="ms-auto d-none d-md-inline">
                <Link href="/booking" className="btn btn-success">
                  Check Availability
                </Link>
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
            <Transfers resort={resort} />
            <PoliciesFees resort={resort} />
            <FAQs resort={resort} />
            <Extras resort={resort} />
          </div>

          {/* Right sidebar */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: "90px" }}>
              {/* Resort facts */}
              <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Resort Facts</h5>
                  <dl className="row small mb-0">
                    <InfoRow label="Island">{resort.island}</InfoRow>
                    <InfoRow label="Rating">
                      <StarRating value={resort.rating} />{" "}
                      <span className="ms-1">{resort.rating}</span>
                    </InfoRow>
                    <InfoRow label="Starting From">
                      ${resort.priceFrom} / night
                    </InfoRow>
                    <InfoRow label="Tags">
                      <BadgeList items={resort.tags} />
                    </InfoRow>
                  </dl>
                </div>
              </div>

              {/* Advisor */}
              <div className="card border-0 shadow-sm">
                {/* Price Snapshot (no form) */}
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body">
                    <h5 className="fw-semibold mb-2">Price Snapshot</h5>
                    <div className="small text-muted mb-2">
                      {nights} night{nights > 1 ? "s" : ""} · {guests} guest
                      {guests > 1 ? "s" : ""} · from {fmt(baseRate)}/night
                    </div>

                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Base</span>
                      <strong>{fmt(baseTotal)}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Green Tax</span>
                      <strong>{fmt(greenTaxTotal)}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Taxes & fees (10%)</span>
                      <strong>{fmt(taxes10)}</strong>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span className="h6 mb-0">Total</span>
                      <span className="h4 mb-0">{fmt(grandTotal)}</span>
                    </div>

                    <div className="d-grid mt-3">
                      <Link
                        href={`/booking?resort=${resort.slug}`}
                        className="btn btn-success btn-lg"
                      >
                        Book Now · {fmt(grandTotal)}
                      </Link>
                    </div>

                    <p className="small text-muted mt-2 mb-0">
                      Estimate uses starting nightly rate and default {nights}{" "}
                      nights/{guests} guests. Final price varies by villa &
                      dates.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/resorts" className="btn btn-outline-dark mt-3">
                ← Back to all resorts
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
    </>
  );
}

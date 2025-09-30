// app/offers/[slug]/page.jsx
"use client";

import { offers as allOffers, getOfferBySlug } from "@/data/offers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useMemo, useRef } from "react";
import toast from "react-hot-toast";
import { PiCaretDoubleLeftBold } from "react-icons/pi";

/* ------------------------- helpers ------------------------- */
const money = (n, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

const humanDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/* -------------------- inline client widgets -------------------- */
function FAQ({ faq }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion" id="offerFAQ">
      {faq.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div className="accordion-item" key={idx}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${!isOpen ? "collapsed" : ""}`}
                type="button"
                onClick={() => setOpen(isOpen ? -1 : idx)}
              >
                {item.q}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
            >
              <div className="accordion-body">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuickCalc({ currency, perNight, defaultNights, minStay }) {
  const [nights, setNights] = useState(
    Math.max(defaultNights || minStay, minStay)
  );
  return (
    <div className="mt-2">
      <label htmlFor="nights" className="form-label small mb-1">
        Quick estimate (nights)
      </label>
      <div className="input-group input-group-sm">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setNights((v) => Math.max(minStay, v - 1))}
        >
          <i className="bi bi-dash" />
        </button>
        <input
          id="nights"
          className="form-control text-center"
          value={nights}
          onChange={(e) => {
            const v = parseInt(e.target.value || "0", 10);
            if (!Number.isNaN(v)) setNights(Math.max(minStay, v));
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label="Nights"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setNights((v) => v + 1)}
        >
          <i className="bi bi-plus" />
        </button>
      </div>
      <div className="mt-2 small">
        ~ {money(perNight * nights, currency)} total (room only; taxes/fees
        extra)
      </div>
    </div>
  );
}

function ShareButtons({ slug, title }) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://yourdomain.com/offers/${slug}`;
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title, url: shareUrl });
      else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      /* ignore */
    }
  }
  return (
    <button
      onClick={share}
      className="btn btn-sm btn-outline-secondary"
      style={{ background: "#2ecc71", color: "#fff", border: "none" }}
    >
      <i className={`bi ${copied ? "bi-clipboard-check" : "bi-share"} me-1`} />
      {copied ? "Copied" : "Share"}
    </button>
  );
}

function PrintButton() {
  return (
    <button
      className="btn btn-sm btn-light w-100"
      onClick={() => window.print()}
    >
      <i className="bi bi-printer me-2" />
      Print this page
    </button>
  );
}

function MobileBar({ price, currency, ctaHref }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="d-lg-none"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: visible ? 0 : -80,
        transition: "bottom .25s ease",
        zIndex: 1030,
      }}
    >
      <div className="border-top bg-white p-3 d-flex align-items-center justify-content-between shadow">
        <div>
          <div className="small text-muted">From</div>
          <div className="fw-semibold">{money(price, currency)} / night</div>
        </div>
        <a href={ctaHref} className="btn btn-success btn-lg">
          Book
        </a>
      </div>
    </div>
  );
}

/* ------------------------- main page ------------------------- */
export default function OfferPage({ params }) {
  const offer = getOfferBySlug(params.slug);

  // Can't use server-only notFound() in a client file, so handle gracefully:
  if (!offer) {
    return (
      <main className="container py-5">
        <h1 className="h4">Offer not found</h1>
        <p className="text-secondary">
          The offer you’re looking for doesn’t exist or has expired.
        </p>
        <Link href="/offers" className="btn btn-primary">
          Browse all offers
        </Link>
      </main>
    );
  }

  const {
    resort,
    title,
    teaser,
    img,
    badges = [],
    heroNote,
    summary,
    discount,
    bookWindow,
    stayWindow,
    blackoutDates = [],
    minStay,
    eligibleRooms = [],
    board,
    transfers,
    kidsPolicy,
    bonuses = [],
    priceExample,
    terms = [],
    faq = [],
    ctaPackageId,
  } = offer;

  const discountLabel =
    discount?.type === "percentage"
      ? `${discount.value}% Off`
      : discount?.type === "up_to_percentage"
      ? `Up to ${discount.value}% Off`
      : "Special Offer";

  const blackoutPretty = blackoutDates?.length
    ? blackoutDates.map((r) => {
        const [from, to] = r.split("..");
        return `${humanDate(from)} – ${humanDate(to)}`;
      })
    : [];

  const related = allOffers.filter((o) => o.slug !== offer.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: resort,
    image: img,
    makesOffer: {
      "@type": "Offer",
      name: title,
      description: teaser || summary,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: priceExample?.perNightFrom,
        priceCurrency: priceExample?.currency || "USD",
      },
      availabilityStarts: bookWindow?.from,
      availabilityEnds: bookWindow?.to,
      areaServed: "Maldives",
    },
  };

  // summurycard2 stuff
  /* ---------- VALID PACKAGES & ID PICKER ---------- */
  const VALID_PACKAGE_IDS = new Set([
    "honeymoon",
    "family",
    "inclusive",
    "wellness",
    "adventure",
    "luxury",
  ]);
  const FALLBACK_PACKAGE_ID = "inclusive";
  const getValidPackageId = (off) => {
    const candidate = off?.ctaPackageId || FALLBACK_PACKAGE_ID;
    return VALID_PACKAGE_IDS.has(candidate) ? candidate : FALLBACK_PACKAGE_ID;
  };

  /* ---------- STATE / REFS ---------- */
  const modalRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  /* ---------- PRICING ASSUMPTIONS (simple & safe) ---------- */
  const DEFAULT_GUESTS = 2;
  const nights = useMemo(
    () =>
      Math.max(priceExample?.exampleStayNights || minStay || 3, minStay || 1),
    [priceExample?.exampleStayNights, minStay]
  );
  const travelers = useMemo(() => DEFAULT_GUESTS, []);
  const baseRate = Number(priceExample?.perNightFrom ?? 0);

  // green tax not present in offer data → keep 0 (adjust later if you add it)
  const greenTaxPer = 0;

  const baseTotal = baseRate * nights * travelers;
  const greenTaxTotal = greenTaxPer * nights * travelers;
  const taxes10 = Math.round(baseTotal * 0.1); // simple 10% like your first file
  const grandTotal = baseTotal + greenTaxTotal + taxes10;

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: priceExample?.currency || "USD",
      maximumFractionDigits: 0,
    }).format(n);

  /* ---------- SummaryCard2 props parity ---------- */
  const extras = {}; // toggle-able add-ons if you add them later
  const extrasTotal = 0;
  const baseTotalForSummary = baseTotal;
  const taxesForSummary = greenTaxTotal + taxes10;

  /* ✅ compute a VALID package id once */
  const checkoutPackageId = useMemo(() => getValidPackageId(offer), [offer]);

  /* synthesize a pkg for SummaryCard2 */
  const pkg = useMemo(
    () => ({
      id: checkoutPackageId, // IMPORTANT: must be valid for /api/checkout
      title: title || "Special Offer",
      name: title || "Special Offer",
      category: "offer",
      durationDays: nights + 1,
      nights,
      pickupPoint: undefined,
      physicalDifficulty: "easy",
      suitableForKids: true,
      inclusions: [],
      cancellationPolicy: terms?.length ? terms.join("\n") : "",
      price: {
        from: baseRate,
        currency: priceExample?.currency || "USD",
        per: "night",
        includesTaxes: false,
      },
    }),
    [checkoutPackageId, title, terms, baseRate, priceExample?.currency, nights]
  );

  /* ---------- validation + reserve → Stripe ---------- */
  function validatePayload(vals) {
    if (!vals.packageId) return "Missing package";
    if (!VALID_PACKAGE_IDS.has(vals.packageId)) return "Invalid package";
    // check-in/out are optional in your flow; only validate if present:
    if (vals.checkIn && vals.checkOut) {
      const inDate = new Date(vals.checkIn);
      const outDate = new Date(vals.checkOut);
      if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime()))
        return "Invalid date";
      if (outDate <= inDate) return "Check-out must be after check-in";
    }
    if (!Number.isInteger(vals.adults) || vals.adults < 1)
      return "At least 1 adult";
    if (!Number.isInteger(vals.children) || vals.children < 0)
      return "Children cannot be negative";
    return null;
  }

  async function handleReserve(overrides = {}) {
    const addOns =
      overrides.addOns ??
      Object.entries(extras)
        .filter(([, v]) => v)
        .map(([k]) => k);

    // always use normalized valid id
    const body = {
      packageId: checkoutPackageId,
      checkIn: overrides.checkIn ?? null,
      checkOut: overrides.checkOut ?? null,
      adults: overrides.adults ?? travelers,
      children: overrides.children ?? 0,
      nights: overrides.nights ?? nights,
      addOns,
      // Optional metadata to help your API (offer context):
      offerSlug: offer.slug,
      resort,
      title,
    };

    const err = validatePayload(body);
    const loadingId = toast.loading("Creating secure checkout…");
    setSubmitting(true);

    try {
      if (err) throw new Error(err);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        throw new Error(
          data?.error ||
            `Failed to start checkout (packageId="${body.packageId}").`
        );
      }

      toast.dismiss(loadingId);
      toast.success("Redirecting to Stripe…");
      window.location.href = data.url;
      return { url: data.url };
    } catch (e) {
      toast.dismiss(loadingId);
      toast.error(e?.message || "Network error. Please try again.");
      throw e;
    } finally {
      setSubmitting(false);
    }
  }

  /* ---------- optional: bookmark persistence ---------- */
  async function handleBookmark(payload) {
    try {
      const key = "bookmarks";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      const updated = [
        ...existing.filter((b) => b.packageId !== checkoutPackageId),
        { ...payload, packageId: checkoutPackageId, offerSlug: offer.slug },
      ];
      localStorage.setItem(key, JSON.stringify(updated));
      toast.success("Saved to your bookmarks.");
      modalRef.current?.close?.();
    } catch (e) {
      toast.error(e?.message || "Could not save bookmark.");
    }
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="position-relative mt-[-80px] ">
        <section
          className="text-white "
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="container py-5">
            <div className="row ">
              <div className="col-lg-12">
                <div className="mx-auto w-[95%] max-w-[900px] pt-[190px]">
                  {/* <span className="badge bg-success mb-3">
                  {pkg.category?.toUpperCase() || "PACKAGE"}
                </span> */}
                  <h1
                    className="display-5 fw-bold mb-2m text-center"
                    style={{ fontFamily: "playfair" }}
                  >
                    {title}
                  </h1>
                  {/* <p className="lead mb-3 text-center">{pkg.summary}</p> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container my-[80px]">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-8">
              <div className="position-relative rounded-4 overflow-hidden shadow-sm">
                <Image
                  src={img}
                  alt={title}
                  width={1280}
                  height={860}
                  className="w-100 h-auto img_ht"
                  priority
                />
                <div className="position-absolute top-0 start-0 m-3 d-flex flex-wrap gap-2">
                  <span className="badge bg-success fw-semibold">
                    {discountLabel}
                  </span>
                  {badges.map((b) => (
                    <span
                      key={b}
                      className="badge bg-dark-subtle text-dark border"
                    >
                      {b}
                    </span>
                  ))}
                </div>
                {heroNote && (
                  <div
                    className="position-absolute bottom-0 start-0 end-0 text-white"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 60%, rgba(0,0,0,.75) 100%)",
                    }}
                  >
                    <div className="p-3 small">
                      <i className="bi bi-info-circle me-2" />
                      {heroNote}
                    </div>
                  </div>
                )}
              </div>
              <div className="card border-0 shadow-sm rounded-4 mt-7">
                <div className="card-body">
                  <h2 className="h5 mb-3" style={{ fontFamily: "playfair" }}>
                    Why this deal works
                  </h2>
                  <p className="mb-0">{summary}</p>
                </div>
              </div>

              {/* Inclusions & Policies */}
              <div className="card border-0 shadow-sm rounded-4 mt-4">
                <div className="card-body">
                  <h3 className="h5" style={{ fontFamily: "playfair" }}>
                    Inclusions & Policies
                  </h3>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <h6 className="text-uppercase text-muted small mb-1">
                        Board
                      </h6>
                      <p className="mb-3">{board}</p>

                      <h6 className="text-uppercase text-muted small mb-1">
                        Transfers
                      </h6>
                      <p className="mb-3">
                        <strong>
                          {transfers.included ? "Included" : "Not Included"}
                        </strong>{" "}
                        — {transfers.type}
                        {transfers.notes ? (
                          <>
                            <br />
                            <span className="text-secondary small">
                              {transfers.notes}
                            </span>
                          </>
                        ) : null}
                      </p>

                      <h6
                        className="text-uppercase text-muted small mb-1"
                        style={{ fontFamily: "playfair" }}
                      >
                        Kids
                      </h6>
                      <p className="mb-0">{kidsPolicy}</p>
                    </div>
                    <div className="col-md-6 mt-3">
                      <h6
                        className="text-uppercase text-muted small mb-2"
                        style={{ fontFamily: "playfair" }}
                      >
                        Eligible Rooms
                      </h6>
                      <ul className="list-group list-group-flush">
                        {eligibleRooms.map((r) => (
                          <li key={r} className="list-group-item px-0">
                            <i className="bi bi-check2 me-2 text-success" />
                            {r}
                          </li>
                        ))}
                      </ul>

                      {bonuses.length > 0 && (
                        <>
                          <h6
                            className="text-uppercase text-muted small mt-3 mb-2"
                            style={{ fontFamily: "playfair" }}
                          >
                            Bonuses
                          </h6>
                          <ul className="list-group list-group-flush">
                            {bonuses.map((b) => (
                              <li key={b} className="list-group-item px-0">
                                <i className="bi bi-gift me-2 text-primary" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Blackouts */}
              <div className="card border-0 shadow-sm rounded-4 mt-4">
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <h3
                        className="h6 text-uppercase text-muted"
                        style={{ fontFamily: "playfair" }}
                      >
                        Terms
                      </h3>
                      <ul className="mb-0">
                        {terms.map((t) => (
                          <li key={t} className="mb-1">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h3
                        className="h6 text-uppercase text-muted"
                        style={{ fontFamily: "playfair" }}
                      >
                        Blackout Dates
                      </h3>
                      {blackoutPretty.length ? (
                        <ul className="mb-0">
                          {blackoutPretty.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-0">None</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right rail summary card */}
            <div className="col-lg-4">
              <div className="card  border-0 shadow-sm rounded-4">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-uppercase small text-muted">
                      {resort}
                    </span>
                    <ShareButtons slug={offer.slug} title={title} />
                  </div>
                  <h1 className="h3 mt-1" style={{ fontFamily: "playfair" }}>
                    {title}
                  </h1>
                  <p className="text-secondary">{teaser}</p>

                  <div className="d-flex flex-wrap gap-2 my-2">
                    <span className="badge text-bg-light border">
                      <i className="bi bi-calendar2-plus me-1" />
                      Book: {humanDate(bookWindow.from)} –{" "}
                      {humanDate(bookWindow.to)}
                    </span>
                    <span className="badge text-bg-light border">
                      <i className="bi bi-calendar-check me-1" />
                      Stay: {humanDate(stayWindow.from)} –{" "}
                      {humanDate(stayWindow.to)}
                    </span>
                    <span className="badge text-bg-light border">
                      <i className="bi bi-moon-stars me-1" />
                      Min {minStay} night{minStay > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* <div className="rounded-3 border bg-light p-3 my-2">
                    <div className="d-flex align-items-baseline gap-2">
                      <span className="h4 mb-0">
                        {money(
                          priceExample.perNightFrom,
                          priceExample.currency
                        )}
                      </span>
                      <span className="text-muted">/ night</span>
                    </div>
                    <div className="small text-secondary mt-1">
                      {priceExample.taxesNote}
                    </div>

                    <QuickCalc
                      currency={priceExample.currency}
                      perNight={priceExample.perNightFrom}
                      defaultNights={priceExample.exampleStayNights}
                      minStay={minStay}
                    />
                  </div> */}

                  <div className="d-flex gap-3 mt-3 small text-muted">
                    <span>
                      <i className="bi bi-shield-check me-1" />
                      Secure inquiry
                    </span>
                    <span>
                      <i className="bi bi-clock-history me-1" />
                      Fast confirmation
                    </span>
                    <span>
                      <i className="bi bi-people me-1" />
                      Human support
                    </span>
                  </div>
                </div>
              </div>
              <div className="card  border-0 shadow-sm rounded-4 mt-7">
                <aside className="position-sticky" style={{ top: "90px" }}>
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body">
                      <h5
                        className="h6 text-uppercase text-muted mb-3"
                        style={{ fontFamily: "playfair" }}
                      >
                        Quick Facts
                      </h5>
                      <ul className="list-unstyled mb-3">
                        <li className="mb-2">
                          <i className="bi bi-percent me-2 text-success" />
                          <strong>{discountLabel}</strong>{" "}
                          {discount?.appliesTo ? (
                            <span className="text-secondary">
                              ({discount.appliesTo})
                            </span>
                          ) : null}
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-egg-fried me-2 text-warning" />
                          Board: <strong>{board}</strong>
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-truck me-2 text-primary" />
                          Transfers: <strong>{transfers.type}</strong>{" "}
                          {transfers.included ? "(Included)" : "(Extra)"}
                        </li>
                        <li className="mb-2">
                          <i className="bi bi-people me-2 text-info" />
                          Kids:{" "}
                          <span className="text-secondary">{kidsPolicy}</span>
                        </li>
                      </ul>

                      {/* <SummaryCard2
                        ref={modalRef}
                        pkg={pkg}
                        nights={nights}
                        travelers={travelers}
                        extras={extras}
                        extrasTotal={extrasTotal}
                        baseTotal={baseTotalForSummary}
                        taxes={taxesForSummary}
                        grandTotal={grandTotal}
                        submitting={submitting}
                        onReserve={handleReserve}
                        onBookmark={handleBookmark}
                      /> */}
                    </div>
                  </div>
                </aside>
              </div>
              <Link
                href="/"
                className=" mt-[30px] text-blue-500 flex items-center gap-1 "
              >
                <span>
                  {" "}
                  <PiCaretDoubleLeftBold />
                </span>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related offers */}
      {related.length > 0 && (
        <section className="container mt-5 pb-[80px]">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="h5 mb-0" style={{ fontFamily: "playfair" }}>
              You may also like
            </h3>
            <Link href="/offers" className="btn btn-sm btn-link">
              View all
            </Link>
          </div>

          <div className="row g-3">
            {related.map((r) => (
              <div key={r.id} className="col-12 col-sm-6 col-lg-3">
                <Link
                  href={`/offers/${r.slug}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card border-0 shadow-sm h-100 rounded-4">
                    <Image
                      src={r.img}
                      alt={r.title}
                      width={640}
                      height={430}
                      className="card_bottom"
                    />
                    <div className="card-body">
                      <div className="small text-muted">{r.resort}</div>
                      <div className="fw-semibold">{r.title}</div>
                      <div className="mt-2 d-flex flex-wrap gap-1">
                        <span className="badge bg-success-subtle text-success border">
                          {r.discount?.value}%
                        </span>
                        {r.badges.slice(0, 1).map((b) => (
                          <span key={b} className="badge text-bg-light border">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile price bar */}
      <MobileBar
        price={priceExample.perNightFrom}
        currency={priceExample.currency}
        ctaHref={`/book?pkg=${encodeURIComponent(
          ctaPackageId
        )}&offer=${encodeURIComponent(offer.slug)}`}
      />
    </main>
  );
}

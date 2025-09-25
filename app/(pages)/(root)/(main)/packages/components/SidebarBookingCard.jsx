"use client";

import { useMemo, useState } from "react";

// helpers
function money(n, currency = "USD") {
  try {
    return Number(n).toLocaleString("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
  } catch {
    return `$${n}`;
  }
}

export default function SidebarBookingCard({ pkg }) {
  const [loading, setLoading] = useState(false);

  const priceMeta = pkg?.price || {};
  const per = priceMeta.per || "person";
  const currency = priceMeta.currency || "USD";

  // sensible defaults for quick checkout (no date selection here)
  const pax = useMemo(
    () => (per === "person" ? Math.max(pkg?.minGuests || 1, 1) : 1),
    [per, pkg?.minGuests]
  );

  const baseTotal = useMemo(() => {
    const base = Number(priceMeta.from || 0);
    return per === "person" ? base * pax : base;
  }, [priceMeta.from, per, pax]);

  const taxes = useMemo(
    () => (priceMeta.includesTaxes ? 0 : Math.round(baseTotal * 0.1)),
    [priceMeta.includesTaxes, baseTotal]
  );

  const total = baseTotal + taxes;

  async function handleBookNow() {
    try {
      setLoading(true);

      const payload = {
        packageId: pkg.id,
        slug: pkg.slug,
        title: pkg.title,
        currency,
        // minimal payload — dates can be collected later on a success page or via email
        checkIn: null,
        checkOut: null,
        adults: pax,
        children: 0,
        nights: pkg.nights || Math.max((pkg.durationDays || 1) - 1, 1),
        extras: {},
        baseTotal,
        extrasTotal: 0,
        taxes,
        grandTotal: total,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Payment init failed");

      if (data?.url) window.location.href = data.url;
      else throw new Error("No checkout URL returned");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  const avail = pkg?.availability?.[0];
  const quickFacts = [
    {
      k: "Duration",
      v: `${pkg.durationDays} days${
        pkg.nights ? ` / ${pkg.nights} nights` : ""
      }`,
    },
    { k: "Difficulty", v: pkg.physicalDifficulty || "easy" },
    { k: "Kids", v: pkg.suitableForKids ? "Suitable" : "Adults focus" },
    { k: "Pickup", v: pkg.pickupPoint || "On request" },
  ];

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body" style={{ fontSize: "17px" }}>
        {/* Price */}
        <div className="d-flex align-items-end justify-content-between mb-2">
          <div>
            <div className="fw-bold fs-4">
              {money(priceMeta.from || 0, currency)}{" "}
              <span className="text-muted fs-6">/ {per}</span>
            </div>
            <div className="small text-muted">
              {priceMeta.includesTaxes
                ? "Taxes included"
                : "Taxes estimated at checkout"}
            </div>
          </div>
          <span className="badge text-bg-success">
            {pkg.category?.toUpperCase() || "PACKAGE"}
          </span>
        </div>

        {/* Availability snapshot */}
        {avail ? (
          <div className="small mb-3 " style={{ fontSize: "16px" }}>
            <span
              className="badge text-bg-light border me-1 font-bold "
              style={{ fontSize: "16px" }}
            >
              Availability
            </span>
            {avail.from} → {avail.to}
            {typeof avail.seatsLeft === "number" ? (
              <span className="ms-2 text-success">
                ({avail.seatsLeft} left)
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Quick facts */}
        <dl className="row small mb-3 ">
          {quickFacts.map((f) => (
            <div className="col-12 d-flex " key={f.k}>
              <dt className="me-2 text-muted font-bold">{f.k}:</dt>
              <dd className="mb-1">{f.v}</dd>
            </div>
          ))}
        </dl>

        {/* Tiny inclusions preview */}
        {pkg.inclusions?.length ? (
          <>
            <div className="small fw-semibold mb-1">Included</div>
            <ul className="small ps-3 mb-3">
              {pkg.inclusions.slice(0, 3).map((x, i) => (
                <li key={i}>{x}</li>
              ))}
              {pkg.inclusions.length > 3 && <li>…and more</li>}
            </ul>
          </>
        ) : null}

        {/* Policy snippet */}
        {pkg.cancellationPolicy ? (
          <div className="small text-muted mb-3" style={{ fontSize: "16px" }}>
            <span
              className="badge text-bg-light border me-1"
              style={{ fontSize: "16px" }}
            >
              Cancellation
            </span>
            {pkg.cancellationPolicy.length > 110
              ? pkg.cancellationPolicy.slice(0, 110) + "…"
              : pkg.cancellationPolicy}
          </div>
        ) : null}

        {/* Totals preview */}
        <div className="row g-1 small mb-3 border-top mt-4 pb-3">
          <div className="col-12 d-flex justify-content-between">
            <span>Base ({per === "person" ? `${pax} pax` : "package"})</span>
            <strong>{money(baseTotal, currency)}</strong>
          </div>
          <div className="col-12 d-flex justify-content-between">
            <span>Taxes</span>
            <strong>{money(taxes, currency)}</strong>
          </div>
          <div className="col-12 d-flex justify-content-between border-top pt-1">
            <span>Total due now</span>
            <strong>{money(total, currency)}</strong>
          </div>
        </div>

        {/* Book now (Stripe) */}
        <div className="d-grid">
          <button
            type="button"
            onClick={handleBookNow}
            className={`btn btn-dark btn-lg rounded-pill ${
              loading ? "disabled" : ""
            }`}
            style={{ background: "#2ecc71", border: "none" }}
            aria-disabled={loading ? "true" : "false"}
            aria-busy={loading ? "true" : "false"}
          >
            {loading ? "Redirecting…" : "Book now"}
          </button>
          <div className="small text-muted text-center mt-2">
            🔒 Secure checkout by Stripe
          </div>
        </div>
      </div>
    </div>
  );
}

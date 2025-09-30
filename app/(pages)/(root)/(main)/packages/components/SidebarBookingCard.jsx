// app/_components/SidebarBookingCard.jsx
"use client";

import SummaryCard2 from "@/components/shared/Summurycard2";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

/* ---------- helpers ---------- */
function num(x) {
  if (x == null) return 0;
  if (typeof x === "number" && isFinite(x)) return x;
  if (typeof x === "string") {
    const n = Number(x.replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}
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

/**
 * Resolve the nightly/base rate and meta from whatever shape pkg has.
 * Supports:
 *  - pkg.base
 *  - pkg.price.from
 *  - pkg.price.base
 *  - pkg.price.amount
 *  - pkg.pricePerNight
 *  - pkg.rate.nightly
 */
function resolvePriceMeta(pkg) {
  const price = pkg?.price || {};
  const currency = price.currency || "USD";
  const per = (price.per || "person").toLowerCase(); // "person" | "room"
  const includesTaxes = !!price.includesTaxes;

  const baseRate =
    num(pkg?.base) ||
    num(price.base) ||
    num(price.amount) ||
    num(price.from) || // <-- your current data
    num(pkg?.pricePerNight) ||
    num(pkg?.rate?.nightly);

  return { baseRate, per, currency, includesTaxes };
}

export default function SidebarBookingCard({ pkg }) {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // --- Resolve pricing once, and ALSO build a normalized pkg the modal understands ---
  const { baseRate, per, currency, includesTaxes } = useMemo(
    () => resolvePriceMeta(pkg),
    [pkg]
  );

  // pax used both here and initial modal state
  const pax = useMemo(
    () => (per === "person" ? Math.max(pkg?.minGuests || 1, 1) : 1),
    [per, pkg?.minGuests]
  );

  // use same math as modal for consistency
  const baseTotal = useMemo(() => {
    return per === "person" ? baseRate * pax : baseRate;
  }, [baseRate, per, pax]);

  const taxes = useMemo(
    () => (includesTaxes ? 0 : Math.round(baseTotal * 0.1)),
    [includesTaxes, baseTotal]
  );

  const total = baseTotal + taxes;

  // Quick-buy (optional)
  async function handleBookNow() {
    if (!pkg?.id) return alert("Missing package id.");
    const nights = pkg.nights || Math.max((pkg.durationDays || 1) - 1, 1);
    const payload = {
      packageId: String(pkg.id),
      title: String(pkg.title || pkg.name || "Selected Package"),
      checkIn: null,
      checkOut: null,
      adults: pax,
      children: 0,
      nights,
      addOns: [],
    };

    const loadingId = toast.loading("Creating secure checkout…");
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      toast.dismiss(loadingId);
      if (!res.ok || !data?.url)
        throw new Error(data?.error || "Failed to start checkout");
      toast.success("Great news! Your booking is ready");
      setTimeout(() => {
        window.location.href = data.url;
      }, 900);
    } catch (e) {
      toast.dismiss(loadingId);
      toast.error(e.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  // Modal wiring
  const modalRef = useRef(null);
  const nights = useMemo(
    () => pkg.nights || Math.max((pkg.durationDays || 1) - 1, 1),
    [pkg.nights, pkg.durationDays]
  );
  const travelers = pax;

  const extras = useMemo(
    () => pkg?.selectedExtras || {},
    [pkg?.selectedExtras]
  );
  const extrasTotal = useMemo(
    () => num(pkg?.extrasTotal || 0),
    [pkg?.extrasTotal]
  );

  const grandTotal = useMemo(() => total + extrasTotal, [total, extrasTotal]);

  // Build a normalized pkg so SummaryCard2 can always read base & meta
  const normalizedPkg = useMemo(() => {
    return {
      ...pkg,
      base: baseRate, // <-- give modal a direct base
      price: {
        ...(pkg?.price || {}),
        base: baseRate, // <-- fallback the modal expects
        amount: baseRate, // <-- another fallback
        from: baseRate, // keep for your sidebar display if needed
        per, // "person" | "room"
        currency,
        includesTaxes,
      },
    };
  }, [pkg, baseRate, per, currency, includesTaxes]);

  // Reserve from modal
  function validatePayload(vals) {
    if (!vals.packageId) return "Missing package";
    if (!vals.checkIn) return "Please select a check-in date";
    if (!vals.checkOut) return "Please select a check-out date";
    const inDate = new Date(vals.checkIn);
    const outDate = new Date(vals.checkOut);
    if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime()))
      return "Invalid date";
    if (outDate <= inDate) return "Check-out must be after check-in";
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

    const body = {
      packageId: overrides.packageId ?? String(pkg?.id || ""),
      checkIn: overrides.checkIn ?? null,
      checkOut: overrides.checkOut ?? null,
      adults: overrides.adults ?? travelers,
      children: overrides.children ?? 0,
      nights: overrides.nights ?? nights,
      addOns,
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
        throw new Error(data?.error || "Failed to start checkout.");
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
    <>
      <div className="card border-0 shadow-sm">
        <div className="card-body" style={{ fontSize: "17px" }}>
          <div className="d-flex align-items-start justify-content-between mb-2">
            <div>
              <div className="fw-bold fs-4">
                {money(baseRate || 0, currency)}{" "}
                <span className="text-muted fs-6">/ {per}</span>
              </div>
              <div className="small text-muted">
                {includesTaxes
                  ? "Taxes included"
                  : "Taxes estimated at checkout"}
              </div>
            </div>

            <div className="text-end">
              <span className="badge text-bg-success mb-2 d-inline-block">
                {pkg.category?.toUpperCase() || "PACKAGE"}
              </span>
            </div>
          </div>

          {avail ? (
            <div className="small mb-3 " style={{ fontSize: "16px" }}>
              <span
                className="badge text-bg-light border me-1 "
                style={{ fontSize: "14px" }}
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

          <dl className="row small mb-3 ">
            {quickFacts.map((f) => (
              <div className="col-12 d-flex " key={f.k}>
                <dt className="me-2 text-muted font-bold">{f.k}:</dt>
                <dd className="mb-1">{f.v}</dd>
              </div>
            ))}
          </dl>

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

          {pkg.cancellationPolicy ? (
            <div className="small text-muted mb-3" style={{ fontSize: "16px" }}>
              <span
                className="badge text-bg-light border me-1"
                style={{ fontSize: "14px" }}
              >
                Cancellation
              </span>
              {pkg.cancellationPolicy.length > 110
                ? pkg.cancellationPolicy.slice(0, 110) + "…"
                : pkg.cancellationPolicy}
            </div>
          ) : null}

          <SummaryCard2
            ref={modalRef}
            pkg={normalizedPkg}
            nights={nights}
            travelers={travelers}
            extras={extras}
            extrasTotal={extrasTotal}
            baseTotal={baseTotal}
            taxes={taxes}
            grandTotal={grandTotal}
            submitting={submitting}
            onReserve={handleReserve}
            // onBookmark={handleBookmark} // add back if you use bookmarks
          />
        </div>
      </div>
    </>
  );
}

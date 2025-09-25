"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const PriceBook = ({ resort }) => {
  const [loading, setLoading] = useState(false);

  // ---- Price Snapshot calcs (display only)
  const DEFAULT_NIGHTS = 3;
  const DEFAULT_GUESTS = 2;
  const nights = DEFAULT_NIGHTS;
  const guests = DEFAULT_GUESTS;
  const baseRate = resort?.priceFrom ?? 0;

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
  const taxes10 = Math.round(baseTotal * 0.1);
  const grandTotal = baseTotal + greenTaxTotal + taxes10;

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  // Use a packageId your /api/checkout recognizes
  const VALID_PACKAGE_ID = "inclusive"; // ← e.g. one of: honeymoon/family/inclusive/wellness/adventure/luxury

  // ---- Book Now: success toast first, then redirect ONLY to Stripe
  async function handleBookNow() {
    if (!resort || loading) return;

    toast.success(`Great news! Your booking is Ready`, { duration: 1500 });

    setLoading(true);

    // Minimal payload your route likely expects (same shape as your booking page)
    const payload = {
      packageId: VALID_PACKAGE_ID,
      checkIn: null,
      checkOut: null,
      adults: guests,
      children: 0,
      nights,
      addOns: [],
      // keep it minimal; your API can compute amounts server-side if needed
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "No checkout URL returned");
      }

      // brief delay so the toast is visible, then go straight to Stripe
      setTimeout(() => {
        window.location.assign(data.url);
      }, 700);
    } catch (err) {
      toast.error(
        err?.message || "Couldn't open secure checkout. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <div className="card-body">
      <h5 className="fw-semibold mb-2" style={{ fontFamily: "playfair" }}>
        Price Snapshot
      </h5>
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
        <button
          type="button"
          onClick={handleBookNow}
          className="btn btn-success btn-lg"
          disabled={loading}
          aria-busy={loading ? "true" : "false"}
        >
          {loading ? "Redirecting…" : `Book Now · ${fmt(grandTotal)}`}
        </button>
      </div>
    </div>
  );
};

export default PriceBook;

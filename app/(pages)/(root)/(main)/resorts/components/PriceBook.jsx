// app/_components/PriceBook.jsx
"use client";

import SummaryCard3 from "@/components/shared/Summurycard3";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

/* ---------------- helpers ---------------- */
function num(x) {
  if (x == null) return 0;
  if (typeof x === "number" && isFinite(x)) return x;
  if (typeof x === "string") {
    const n = Number(x.replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

// ---- Valid package IDs your /api/checkout accepts
const VALID_PACKAGE_IDS = new Set([
  "honeymoon",
  "family",
  "inclusive",
  "wellness",
  "adventure",
  "luxury",
]);

// ---- Map resort -> valid package id
const PACKAGE_MAP = {
  "lily-beach-resort-spa": "luxury",
  "hideaway-beach-resort-spa": "honeymoon",
  "signature-collection-by-hideaway": "luxury",
  "kandima-maldives": "family",
  "ritz-carlton-maldives-fari-islands": "luxury",
  "adaaran-prestige-water-villas": "honeymoon",
};
const FALLBACK_PACKAGE_ID = "inclusive";

function mapToValidPackageId(resort) {
  const candidate =
    PACKAGE_MAP[resort?.slug] || PACKAGE_MAP[resort?.id] || FALLBACK_PACKAGE_ID;
  return VALID_PACKAGE_IDS.has(candidate) ? candidate : FALLBACK_PACKAGE_ID;
}

/**
 * Resolve canonical pricing meta. This mirrors SidebarBookingCard’s resolve logic.
 * - baseRate is a per-night rate (per person or per room)
 * - per = "person" | "room"
 * - includesTaxes toggles VAT addition
 * - taxRate (default 10%)
 * - extraPerGuestPerNight supports things like Green Tax
 */
function resolvePricing(resort) {
  const price = resort?.price || {};
  const currency = price.currency || "USD";
  const per = (price.per || "room").toLowerCase();
  const includesTaxes = !!price.includesTaxes;

  const baseRate =
    num(resort?.priceFrom) ||
    num(resort?.base) ||
    num(price.from) ||
    num(price.base) ||
    num(price.amount) ||
    num(resort?.pricePerNight) ||
    num(resort?.rate?.nightly);

  // Optional: e.g., Green Tax per guest/night
  const extraPerGuestPerNight = (() => {
    const m = resort?.fees?.mandatory?.find?.((x) =>
      (x?.label || "").toLowerCase().includes("green tax")
    );
    if (!m?.amount) return 0;
    const match = String(m.amount).match(/(\d+(\.\d+)?)/);
    return match ? Number(match[1]) : 0;
  })();

  return {
    baseRate,
    per, // "person" | "room"
    currency,
    includesTaxes,
    taxRate: 0.1,
    extraPerGuestPerNight,
  };
}

export default function PriceBook({ resort }) {
  const [submitting, setSubmitting] = useState(false);
  const modalRef = useRef(null);

  // ---- Editable defaults used by the modal (LIVE state inside the modal will control these)
  const [nights] = useState(
    resort?.nights || Math.max((resort?.durationDays || 4) - 1, 1)
  );
  const [adults] = useState(2);
  const [children] = useState(0);

  // ---- Canonical pricing (SINGLE source of truth shared with SummaryCard2)
  const pricing = useMemo(() => resolvePricing(resort), [resort]);

  // ---- Normalized pkg/meta (mirrors SidebarBookingCard expectations)
  const checkoutPackageId = useMemo(
    () => mapToValidPackageId(resort),
    [resort]
  );

  const pkg = useMemo(
    () => ({
      id: checkoutPackageId,
      title: resort?.name ?? "Selected Resort",
      name: resort?.name,
      category: "resort",
      durationDays: nights + 1,
      nights,
      cancellationPolicy: resort?.policies?.cancellation || "",
      // (Optional) availability/inclusions if you have them on resort
      availability: resort?.availability || [],
      inclusions: resort?.inclusions || [],
    }),
    [checkoutPackageId, resort, nights]
  );

  // If you have preselected extras in resort, pass them through like Sidebar does
  const extras = useMemo(() => resort?.selectedExtras || {}, [resort]);
  const extrasTotal = useMemo(() => num(resort?.extrasTotal || 0), [resort]);

  // ---- Reserve (identical validations & flow)
  function validatePayload(vals) {
    if (!vals.packageId) return "Missing package";
    if (!VALID_PACKAGE_IDS.has(vals.packageId)) return "Invalid package";
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
    if (!Number.isInteger(vals.nights) || vals.nights < 1)
      return "Nights must be at least 1";
    return null;
  }

  async function handleReserve(overrides = {}) {
    const body = {
      packageId: checkoutPackageId,
      checkIn: overrides.checkIn ?? null,
      checkOut: overrides.checkOut ?? null,
      adults: overrides.adults ?? undefined, // SummaryCard2 will send the current values
      children: overrides.children ?? undefined,
      nights: overrides.nights ?? undefined,
      addOns: overrides.addOns ?? [], // SummaryCard2 will send selected add-ons ids
    };

    const err = validatePayload({
      ...body,
      // during validate we need actual numbers; SummaryCard2 always sends them
      adults: Number(overrides.adults ?? 0),
      children: Number(overrides.children ?? 0),
      nights: Number(overrides.nights ?? 0),
    });

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

  return (
    <div>
      <SummaryCard3
        ref={modalRef}
        // live starting values (modal fully controls updates)
        initialAdults={adults}
        initialChildren={children}
        initialNights={nights}
        // single source-of-truth for all math
        pricing={pricing}
        // normalized pkg/meta
        pkg={pkg}
        // optional: pass-through extras to match Sidebar behavior
        extras={extras}
        extrasTotal={extrasTotal}
        submitting={submitting}
        onReserve={handleReserve}
      />
    </div>
  );
}

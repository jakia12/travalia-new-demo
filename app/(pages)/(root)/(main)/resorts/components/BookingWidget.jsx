// app/resorts/[slug]/_BookingWidget.jsx
"use client";

import SummaryCard2 from "@/components/shared/Summurycard2";

/* helpers */
function num(x) {
  if (x == null) return 0;
  if (typeof x === "number" && isFinite(x)) return x;
  if (typeof x === "string") {
    const n = Number(x.replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

const VALID_PACKAGE_IDS = new Set([
  "honeymoon",
  "family",
  "inclusive",
  "wellness",
  "adventure",
  "luxury",
]);

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

export default function BookingWidget({ resort }) {
  // Resolve pricing meta (like Sidebar)
  const baseRate =
    num(resort?.price?.from) ||
    num(resort?.priceFrom) ||
    num(resort?.price?.base) ||
    num(resort?.price?.amount) ||
    num(resort?.pricePerNight) ||
    num(resort?.rate?.nightly);

  // ✅ Default to "person" so Adults/Children affect totals
  const per = (resort?.price?.per || "person").toLowerCase(); // "person" | "room"
  const currency = resort?.price?.currency || "USD";
  const includesTaxes = !!resort?.price?.includesTaxes;

  // Normalized pkg SummaryCard2 can read
  const pkg = {
    id: mapToValidPackageId(resort),
    slug: resort.slug,
    title: resort.name,
    name: resort.name,
    category: "resort",
    base: baseRate,
    price: {
      base: baseRate,
      amount: baseRate,
      from: baseRate,
      per,
      currency,
      includesTaxes,
    },
    pricePerNight: baseRate,
    rate: { nightly: baseRate },
    cancellationPolicy: resort?.policies?.cancellation || "",
    availability: resort?.availability || [],
    inclusions: resort?.inclusions || [],
  };

  // Sidebar snapshot props (modal computes nights from dates)
  const nights = resort?.nights || Math.max((resort?.durationDays || 4) - 1, 1);
  const travelers = per === "person" ? Math.max(resort?.minGuests || 2, 1) : 1;

  const extras = resort?.selectedExtras || {};
  const extrasTotal = num(resort?.extrasTotal || 0);

  const baseTotal = per === "person" ? baseRate * travelers : baseRate;
  const taxes = includesTaxes ? 0 : Math.round(baseTotal * 0.1);
  const grandTotal = baseTotal + taxes + extrasTotal;

  // Reserve -> Stripe
  async function handleReserve(body) {
    if (!body?.packageId || !VALID_PACKAGE_IDS.has(body.packageId)) {
      throw new Error("Invalid package");
    }
    if (!body.checkIn) throw new Error("Please select a check-in date");
    if (!body.checkOut) throw new Error("Please select a check-out date");
    const inDate = new Date(body.checkIn);
    const outDate = new Date(body.checkOut);
    if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) {
      throw new Error("Invalid date");
    }
    if (outDate <= inDate) throw new Error("Check-out must be after check-in");
    if (!Number.isInteger(body.adults) || body.adults < 1) {
      throw new Error("At least 1 adult");
    }
    if (!Number.isInteger(body.children) || body.children < 0) {
      throw new Error("Children cannot be negative");
    }
    if (!Number.isInteger(body.nights) || body.nights < 1) {
      throw new Error("Nights must be at least 1");
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        packageId: body.packageId,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        adults: body.adults,
        children: body.children,
        nights: body.nights,
        addOns: body.addOns || [],
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.url) {
      throw new Error(data?.error || "Failed to start checkout.");
    }
    window.location.href = data.url;
  }

  return (
    <SummaryCard2
      pkg={pkg}
      nights={nights}
      travelers={travelers}
      extras={extras}
      extrasTotal={extrasTotal}
      baseTotal={baseTotal}
      taxes={taxes}
      grandTotal={grandTotal}
      submitting={false}
      onReserve={(vals) => handleReserve({ ...vals, packageId: pkg.id })}
    />
  );
}

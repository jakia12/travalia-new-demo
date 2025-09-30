// app/api/checkout/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { ADDONS, FEES_RATE, PACKAGES } from "@/lib/pricing";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// ---- helpers -------------------------------------------------
const num = (v, d = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

// If value looks like cents (>=1000 and divisible by 100), convert to USD.
// Otherwise treat as USD already.
const asUSD = (v) => {
  const n = num(v, 0);
  if (Number.isInteger(n) && n >= 1000 && n % 100 === 0) return n / 100;
  return n;
};

// Convert USD to cents once for Stripe
const toCents = (usd) => Math.round(num(usd, 0) * 100);

// Normalize fee rate if given as 10 or 0.10
const feeRate = (() => {
  const r = num(FEES_RATE, 0);
  return r > 1 ? r / 100 : r; // 10 -> 0.10
})();

// ---- route ---------------------------------------------------
export async function POST(req) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Stripe not configured on server" },
        { status: 500 }
      );
    }
    const stripe = new Stripe(key, { apiVersion: "2024-06-20" });

    const body = await req.json().catch(() => ({}));
    const {
      packageId, // e.g. "honeymoon"
      checkIn = null,
      checkOut = null,
      adults = 1,
      children = 0,
      nights,
      addOns = [],
      title, // optional, for product name
    } = body || {};

    const pkg = PACKAGES?.[packageId];
    if (!pkg) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    const A = Math.max(1, parseInt(adults, 10) || 1);
    const C = Math.max(0, parseInt(children, 10) || 0);
    const guests = A + C;

    // recompute nights if not valid
    let n = parseInt(nights, 10);
    if (!Number.isFinite(n) || n < 1) {
      if (checkIn && checkOut) {
        const inD = new Date(checkIn);
        const outD = new Date(checkOut);
        const ms = outD.setHours(0, 0, 0, 0) - inD.setHours(0, 0, 0, 0);
        n = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
      } else {
        n = 1;
      }
    }

    // ---- amounts in USD (normalized) ----
    const nightlyUSD = asUSD(pkg.nightly); // works whether cents or USD
    const baseUSD = nightlyUSD * n * guests;

    let addOnsUSD = 0;
    const addOnLineItems = [];
    for (const id of Array.isArray(addOns) ? addOns : []) {
      const a = ADDONS?.[id];
      if (!a) continue;
      const priceUSD = asUSD(a.price);
      addOnsUSD += priceUSD;
      addOnLineItems.push({
        price_data: {
          currency: "usd",
          unit_amount: toCents(priceUSD),
          product_data: { name: a.name || id },
        },
        quantity: 1,
      });
    }

    const feesUSD = Math.round((baseUSD + addOnsUSD) * feeRate);

    // ---- Stripe line items (in cents) ----
    const line_items = [
      {
        price_data: {
          currency: "usd",
          unit_amount: toCents(baseUSD),
          product_data: {
            name:
              title || `${pkg.name} (${guests} guest${guests > 1 ? "s" : ""})`,
            description: `${n} night(s) • ${checkIn || "TBD"} → ${
              checkOut || "TBD"
            }`,
          },
        },
        quantity: 1,
      },
      ...addOnLineItems,
    ];

    if (feesUSD > 0) {
      line_items.push({
        price_data: {
          currency: "usd",
          unit_amount: toCents(feesUSD),
          product_data: {
            name: `Taxes & fees (${Math.round(feeRate * 100)}%)`,
          },
        },
        quantity: 1,
      });
    }

    // success/cancel URLs
    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      metadata: {
        packageId,
        checkIn: checkIn || "",
        checkOut: checkOut || "",
        adults: String(A),
        children: String(C),
        nights: String(n),
        addOns: (Array.isArray(addOns) ? addOns : []).join(","),
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    console.error("[api/checkout] error:", e);
    return NextResponse.json(
      { error: "Unable to start checkout" },
      { status: 500 }
    );
  }
}

// app/api/checkout/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { ADDONS, FEES_RATE, PACKAGES } from "@/lib/pricing";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// helpers
const toNum = (v, d = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};
const toInt = (v, d = 0) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : d;
};
const toCents = (usd) => Math.round(toNum(usd, 0) * 100);

export async function POST(req) {
  try {
    // Stripe key must exist at runtime (do NOT construct Stripe at module top-level)
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
      packageId, // e.g. "honeymoon" | "family" | "inclusive" ...
      checkIn = null, // "YYYY-MM-DD" or null
      checkOut = null, // "YYYY-MM-DD" or null
      adults = 1,
      children = 0,
      nights, // client value; we'll validate/fallback
      addOns = [], // ["sunsetCruise", ...]
    } = body || {};

    const pkg = PACKAGES?.[packageId];
    if (!pkg) {
      return NextResponse.json({ error: "Invalid package" }, { status: 400 });
    }

    // normalize guests
    const A = Math.max(1, toInt(adults, 1));
    const C = Math.max(0, toInt(children, 0));
    const guests = A + C;

    // recompute nights if not provided or invalid
    let n = toInt(nights, 0);
    if (!n) {
      if (checkIn && checkOut) {
        const inD = new Date(checkIn);
        const outD = new Date(checkOut);
        const ms = outD.setHours(0, 0, 0, 0) - inD.setHours(0, 0, 0, 0);
        n = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
      } else {
        n = 1;
      }
    }

    // USD amounts (not cents)
    const nightlyUSD = toNum(pkg.nightly, 0);
    const baseUSD = nightlyUSD * n * guests;

    // add-ons (USD)
    let addOnsUSD = 0;
    const addOnLineItems = [];
    for (const id of Array.isArray(addOns) ? addOns : []) {
      const a = ADDONS?.[id];
      if (!a) continue;
      const priceUSD = toNum(a.price, 0);
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

    const feeRate = toNum(FEES_RATE, 0); // e.g. 0.10
    const feesUSD = Math.round((baseUSD + addOnsUSD) * feeRate);

    const line_items = [
      {
        price_data: {
          currency: "usd",
          unit_amount: toCents(baseUSD),
          product_data: {
            name: `${pkg.name} (${guests} guest${guests > 1 ? "s" : ""})`,
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

    // success/cancel URLs (env first, then request origin fallback)
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

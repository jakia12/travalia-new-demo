// app/api/checkout/route.js
import { ADDONS, FEES_RATE, PACKAGES } from "@/lib/pricing";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      packageId, // "honeymoon" | "family" | ...
      checkIn, // "YYYY-MM-DD"
      checkOut, // "YYYY-MM-DD"
      adults = 1,
      children = 0,
      nights, // client computed, we'll validate
      addOns = [], // ["sunsetCruise", ...]
    } = body;

    const pkg = PACKAGES[packageId];
    if (!pkg)
      return Response.json({ error: "Invalid package" }, { status: 400 });

    const A = Math.max(1, parseInt(adults, 10) || 1);
    const C = Math.max(0, parseInt(children, 10) || 0);
    const guests = A + C;

    // recompute nights on server (simple, safe fallback)
    const n = nights
      ? Math.max(1, parseInt(nights, 10))
      : Math.max(
          1,
          Math.ceil(
            (new Date(checkOut).setHours(0, 0, 0, 0) -
              new Date(checkIn).setHours(0, 0, 0, 0)) /
              (1000 * 60 * 60 * 24)
          )
        );

    const baseAmount = pkg.nightly * n * guests;

    let addOnsTotal = 0;
    const addOnLineItems = [];
    for (const id of addOns) {
      const a = ADDONS[id];
      if (a) {
        addOnsTotal += a.price;
        addOnLineItems.push({
          price_data: {
            currency: "usd",
            unit_amount: a.price,
            product_data: { name: a.name },
          },
          quantity: 1,
        });
      }
    }

    const fees = Math.round((baseAmount + addOnsTotal) * FEES_RATE);

    const line_items = [
      {
        price_data: {
          currency: "usd",
          unit_amount: baseAmount,
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
      {
        price_data: {
          currency: "usd",
          unit_amount: fees,
          product_data: { name: "Taxes & fees (10%)" },
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      // 🔐 "Store" your form data here — no DB needed
      metadata: {
        packageId,
        checkIn: checkIn || "",
        checkOut: checkOut || "",
        adults: String(A),
        children: String(C),
        nights: String(n),
        addOns: (addOns || []).join(","),
      },
    });

    return Response.json({ url: session.url });
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Unable to start checkout" },
      { status: 500 }
    );
  }
}

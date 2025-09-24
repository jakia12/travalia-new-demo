// app/checkout/success/page.jsx
import Stripe from "stripe";

export default async function Success({ searchParams }) {
  const sessionId = searchParams?.session_id;
  if (!sessionId)
    return <main className="container py-5">Missing session.</main>;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const md = session.metadata || {};

  const amount = session.amount_total
    ? (session.amount_total / 100).toFixed(2)
    : null;

  return (
    <main className="container py-5">
      <h1 className="mb-3">Payment received ✅</h1>
      <p className="text-muted">Thanks for booking with us!</p>

      <h5 className="mt-4">Your Details</h5>
      <ul>
        <li>
          Package: <strong>{md.packageId}</strong>
        </li>
        <li>
          Dates: <strong>{md.checkIn}</strong> → <strong>{md.checkOut}</strong>
        </li>
        <li>
          Guests: <strong>{md.adults}</strong> adults,{" "}
          <strong>{md.children}</strong> children
        </li>
        <li>
          Nights: <strong>{md.nights}</strong>
        </li>
        <li>
          Add-ons: <strong>{md.addOns || "None"}</strong>
        </li>
      </ul>

      {amount && (
        <p className="mt-3">
          Total paid: <strong>${amount}</strong>
        </p>
      )}

      <a className="btn btn-outline-secondary mt-3" href="/">
        Back home
      </a>
    </main>
  );
}

// app/booking/page.jsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import SummaryCard from "./components/SummaryCard";
// at the top of your component:
// ← adjust if your path differs

const PACKAGES = [
  {
    id: "honeymoon",
    title: "Honeymoon Escape",
    img: "/img/gl4.webp",
    base: 250,
  },
  {
    id: "family",
    title: "Family Fun Getaway",
    img: "/img/gl6.webp",
    base: 180,
  },
  {
    id: "inclusive",
    title: "All-Inclusive Retreat",
    img: "/img/gl5.webp",
    base: 220,
  },
  { id: "wellness", title: "Wellness & Spa", img: "/img/gl9.webp", base: 170 },
  {
    id: "adventure",
    title: "Surfing & Diving",
    img: "/img/gl2.webp",
    base: 210,
  },
  { id: "luxury", title: "Luxury Overwater", img: "/img/gl3.webp", base: 420 },
];

export default function BookingPage() {
  const [selected, setSelected] = useState("honeymoon");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [extras, setExtras] = useState({
    sunsetCruise: false,
    spaCredit: false,
    waterSports: false,
  });

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const ms = outDate - inDate;
    const n = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
    return Number.isFinite(n) ? n : 1;
  }, [checkIn, checkOut]);

  // ❌ remove TS non-null (!) and use a safe fallback
  const pkg = useMemo(
    () => PACKAGES.find((p) => p.id === selected) ?? PACKAGES[0],
    [selected]
  );

  const extrasTotal = useMemo(() => {
    let sum = 0;
    if (extras.sunsetCruise) sum += 60;
    if (extras.spaCredit) sum += 80;
    if (extras.waterSports) sum += 50;
    return sum;
  }, [extras]);

  const travelers = adults + children;
  const baseTotal = useMemo(
    () => pkg.base * nights * Math.max(1, travelers),
    [pkg.base, nights, travelers]
  );
  const taxes = Math.round((baseTotal + extrasTotal) * 0.1);
  const grandTotal = baseTotal + extrasTotal + taxes;

  // reserve now button stuff

  // state
  const [submitting, setSubmitting] = useState(false);

  // validation — shows BOTH missing date fields in one toast
  function validate() {
    if (!selected) return { msg: "Pick a package" };

    const missing = [];
    if (!checkIn) missing.push({ id: "checkIn", label: "Check-in" });
    if (!checkOut) missing.push({ id: "checkOut", label: "Check-out" });

    if (missing.length) {
      const labels = missing.map((m) => m.label).join(" & ");
      return {
        msg: `Please select ${labels} date${missing.length > 1 ? "s" : ""}.`,
        focus: missing[0].id,
      };
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      return { msg: "Check-out must be after check-in", focus: "checkOut" };
    }

    if (adults < 1) return { msg: "At least 1 adult" };

    return null;
  }

  // handler — creates checkout and redirects; shows loading/success/error toasts
  async function handleReserve() {
    const error = validate();
    if (error) {
      toast.error(error.msg);
      if (error.focus) document.getElementById(error.focus)?.focus();
      return;
    }

    setSubmitting(true);
    const loadingId = toast.loading("Creating secure checkout…");

    const addOns = Object.entries(extras)
      .filter(([, v]) => v)
      .map(([k]) => k);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selected,
          checkIn,
          checkOut,
          adults,
          children,
          nights,
          addOns,
        }),
      });

      const data = await res.json();
      toast.dismiss(loadingId);
      setSubmitting(false);

      if (data?.url) {
        toast.success("Redirecting to Stripe…");
        window.location.href = data.url;
      } else {
        toast.error(data?.error || "Failed to start checkout");
      }
    } catch (err) {
      toast.dismiss(loadingId);
      setSubmitting(false);
      toast.error("Network error. Please try again.");
    }
  }

  return (
    <main>
      {/* HERO */}
      <section
        className="pt-[170px] pb-[130px] text-white"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.65) 100%), url('/img/rs1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center text-center">
            <div className="col-xl-8">
              <p
                className="text-uppercase mb-2"
                style={{ letterSpacing: ".12em", color: "#9AE6B4" }}
              >
                Book Your Stay
              </p>
              <h1 className="display-5 fw-semibold mb-2">
                Seamless Maldives Booking
              </h1>
              <p className="lead opacity-90 mb-0">
                Handpicked island resorts, return transfers & 24/7
                assistance—tailored to your dates and vibe.
              </p>
            </div>
          </div>

          {/* Stepper */}
          <div className="row justify-content-center mt-4">
            <div className="col-lg-8">
              <ul className="list-group list-group-horizontal-md rounded-4 overflow-hidden small">
                <li
                  className="list-group-item flex-fill bg-[#2ecc71] text-white border-0"
                  style={{ background: "#2ecc71" }}
                >
                  1. Choose Package
                </li>
                <li className="list-group-item flex-fill">2. Guest & Dates</li>
                <li className="list-group-item flex-fill">3. Review & Pay</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CONTENT */}
      <section className="container-fluid my-5 my-lg-5">
        <div className="row g-4 g-lg-5">
          {/* LEFT: form + packages */}
          <div className="col-12 col-lg-8">
            {/* Package Picker */}
            <div className="mb-4 mb-lg-5">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h4 mb-0">1) Select Your Package</h2>
                <small className="text-muted">Tap a card to select</small>
              </div>

              <div className="row g-3">
                {PACKAGES.map((p) => (
                  <div className="col-12 col-sm-6 col-xl-4" key={p.id}>
                    <article
                      role="button"
                      className={`card border-0 shadow-sm overflow-hidden package-card ${
                        selected === p.id ? "selected" : ""
                      }`}
                      onClick={() => setSelected(p.id)}
                    >
                      <div
                        className="ratio ratio-1x1"
                        style={{
                          backgroundImage: `url('${p.img}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                          <h3 className="h6 m-0">{p.title}</h3>
                          <span className="badge bg-[#2ecc71]">
                            from ${p.base}/night
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div className="mb-4 mb-lg-5">
              <h2 className="h4 mb-3">2) Dates & Guests</h2>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Check-in</label>
                  <input
                    id="checkIn" // ← add
                    type="date"
                    className="form-control"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Check-out</label>
                  <input
                    id="checkOut" // ← add
                    type="date"
                    className="form-control"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label">Adults</label>
                  <input
                    type="number"
                    min={1}
                    className="form-control"
                    value={adults}
                    onChange={(e) =>
                      setAdults(Math.max(1, Number(e.target.value) || 1))
                    }
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Children</label>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    value={children}
                    onChange={(e) =>
                      setChildren(Math.max(0, Number(e.target.value) || 0))
                    }
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Nights</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nights}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Extras */}
            <div className="mb-4 mb-lg-5">
              <h2 className="h4 mb-3">3) Optional Add-ons</h2>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="form-check border rounded p-3 h-100">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="sunsetCruise"
                      checked={extras.sunsetCruise}
                      onChange={(e) =>
                        setExtras((x) => ({
                          ...x,
                          sunsetCruise: e.target.checked,
                        }))
                      }
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor="sunsetCruise"
                    >
                      Sunset Cruise <span className="text-muted">(+ $60)</span>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-check border rounded p-3 h-100">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="spaCredit"
                      checked={extras.spaCredit}
                      onChange={(e) =>
                        setExtras((x) => ({
                          ...x,
                          spaCredit: e.target.checked,
                        }))
                      }
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor="spaCredit"
                    >
                      Spa Credit <span className="text-muted">(+ $80)</span>
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-check border rounded p-3 h-100">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="waterSports"
                      checked={extras.waterSports}
                      onChange={(e) =>
                        setExtras((x) => ({
                          ...x,
                          waterSports: e.target.checked,
                        }))
                      }
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor="waterSports"
                    >
                      Water Sports <span className="text-muted">(+ $50)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Summary Trigger */}
            <div className="d-lg-none mb-4">
              <button
                className="btn btn-success w-100 py-3"
                data-bs-toggle="offcanvas"
                data-bs-target="#summaryCanvas"
              >
                View Price Summary
              </button>
            </div>

            {/* Continue CTA */}
            <div className="d-grid">
              <Link
                href="#"
                className={`btn btn-dark btn-lg py-3 ${
                  submitting ? "disabled" : ""
                }`}
                style={{ background: "#2ecc71", border: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  if (!submitting) handleReserve();
                }}
                role="button"
                aria-disabled={submitting ? "true" : "false"}
                aria-busy={submitting ? "true" : "false"}
              >
                {submitting ? "Redirecting…" : "Continue to Payment"}
              </Link>
            </div>
          </div>

          {/* RIGHT: summary (sticky on desktop) */}
          <div className="col-12 col-lg-4 d-none d-lg-block">
            <SummaryCard
              pkg={pkg}
              nights={nights}
              travelers={travelers}
              extras={extras}
              extrasTotal={extrasTotal}
              baseTotal={baseTotal}
              taxes={taxes}
              grandTotal={grandTotal}
              onReserve={handleReserve} // NEW
              submitting={submitting} // NEW
            />
          </div>
        </div>
      </section>

      {/* Mobile Offcanvas Summary */}
      <div
        className="offcanvas offcanvas-bottom h-auto"
        tabIndex={-1}
        id="summaryCanvas"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Your Price Summary</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body pt-0">
          <SummaryCard
            pkg={pkg}
            nights={nights}
            travelers={travelers}
            extras={extras}
            extrasTotal={extrasTotal}
            baseTotal={baseTotal}
            taxes={taxes}
            grandTotal={grandTotal}
            onReserve={handleReserve} // NEW
            submitting={submitting} // NEW
          />
        </div>
      </div>

      {/* Local styles */}
    </main>
  );
}

// app/booking/page.jsx
"use client";

import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { MdDateRange } from "react-icons/md";
import { z } from "zod";
import SummaryCard from "./components/SummaryCard";

// ⬇️ update if your SummaryCard lives elsewhere

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
  const [submitting, setSubmitting] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const ms = outDate - inDate;
    const n = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [checkIn, checkOut]);

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

  // ---------- validation ----------
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
      return { msg: "Check-out must be after check-in.", focus: "checkOut" };
    }

    if (adults < 1)
      return { msg: "At least 1 adult required.", focus: "adults" };

    return null;
  }

  // ---------- reserve handler ----------
  async function handleReserve() {
    const error = validate();

    const loadingId = toast.loading("Creating secure checkout…");
    setSubmitting(true);

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
        toast.error(data?.error || "Failed to start checkout.");
      }
    } catch (err) {
      toast.dismiss(loadingId);
      setSubmitting(false);
      toast.error("Network error. Please try again.");
    }
  }

  // mobile review and confirm

  // Add-on keys used in your UI
  const ADDON_KEYS = ["sunsetCruise", "spaCredit", "waterSports"];

  // Zod schema (JS, not TS)
  const BookingSchema = z
    .object({
      packageId: z.string().min(1, "Pick a package"),
      checkIn: z.string().min(1, "Please select Check-in"),
      checkOut: z.string().min(1, "Please select Check-out"),
      adults: z.coerce.number().int().min(1, "At least 1 adult"),
      children: z.coerce.number().int().min(0, "Children cannot be negative"),
      nights: z.coerce.number().int().min(1, "At least 1 night"),
      addOns: z.array(z.enum(ADDON_KEYS)).default([]),
    })
    .superRefine((val, ctx) => {
      const inDate = new Date(val.checkIn);
      const outDate = new Date(val.checkOut);
      if (Number.isNaN(inDate.getTime()))
        ctx.addIssue({
          code: "custom",
          message: "Invalid date",
          path: ["checkIn"],
        });
      if (Number.isNaN(outDate.getTime()))
        ctx.addIssue({
          code: "custom",
          message: "Invalid date",
          path: ["checkOut"],
        });
      if (
        !Number.isNaN(inDate.getTime()) &&
        !Number.isNaN(outDate.getTime()) &&
        outDate <= inDate
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Check-out must be after Check-in",
          path: ["checkOut"],
        });
      }
    });

  // build add-ons array from state
  const toAddOnsArray = () =>
    Object.entries(extras)
      .filter(([k, v]) => v && ADDON_KEYS.includes(k))
      .map(([k]) => k);

  // nice combined errors (same behavior you asked earlier)
  function showIssuesToast(issues) {
    const isDate = (i) =>
      i.path?.[0] === "checkIn" || i.path?.[0] === "checkOut";
    const missingDates = new Set(issues.filter(isDate).map((i) => i.path?.[0]));
    if (missingDates.has("checkIn") && missingDates.has("checkOut")) {
      toast.error("Please select Check-in & Check-out dates.", {
        style: {
          whiteSpace: "pre-wrap",
          maxWidth: "min(92vw, 640px)",
          width: "100%",
        },
      });
      const el = document.getElementById("checkIn");
      if (el) el.focus();
      return;
    }
    const msg = issues
      .map((i) => i.message)
      .slice(0, 2)
      .join("\n");
    toast.error(msg || "Please check the form.", {
      style: {
        whiteSpace: "pre-wrap",
        maxWidth: "min(92vw, 640px)",
        width: "100%",
      },
    });
  }

  // SUBMIT handler for the MOBILE form
  async function handleMobileSubmit(e) {
    e.preventDefault();

    const payload = {
      packageId: selected, // using your page state
      checkIn,
      checkOut,
      adults,
      children,
      nights,
      addOns: toAddOnsArray(),
    };

    const parsed = BookingSchema.safeParse(payload);
    if (!parsed.success) {
      showIssuesToast(parsed.error.issues);
      return;
    }

    // call your existing checkout flow.
    // If your handleReserve accepts overrides, pass parsed.data:
    await handleReserve(parsed.data);
  }

  return (
    <main>
      {/* HERO */}
      <section
        className="text-white"
        style={{
          paddingTop: "170px",
          paddingBottom: "130px",
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
                style={{ letterSpacing: ".12em", color: "#2ecc71" }}
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
                  className="list-group-item flex-fill text-white border-0"
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
      <section className="container-fluid my-5">
        <div className="row g-4 g-lg-5">
          {/* LEFT: package grid + form */}
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
                      aria-pressed={selected === p.id}
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
                          <span
                            className="badge"
                            style={{ background: "#2ecc71" }}
                          >
                            from ${p.base}/night
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-lg-none">
              <form
                className="d-lg-none"
                onSubmit={handleMobileSubmit}
                noValidate
              >
                {/* Dates & Guests (mobile) */}
                <div className="mb-4">
                  <h2 className="h5 mb-3">2) Dates & Guests</h2>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Check-in</label>
                      <div className="flex items-center justify-between relative">
                        <DatePicker
                          id="checkIn"
                          selected={checkIn ? new Date(checkIn) : null}
                          onChange={(date) =>
                            setCheckIn(
                              date ? date.toISOString().slice(0, 10) : ""
                            )
                          }
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date"
                          minDate={new Date()}
                          className="form-control"
                          wrapperClassName="w-100"
                        />

                        <MdDateRange className="absolute top-[11px] right-2" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label">Check-out</label>
                      <label className="form-label" htmlFor="checkOut">
                        Check-out
                      </label>
                      <div className="flex items-center justify-between relative">
                        <DatePicker
                          id="checkOut"
                          selected={checkOut ? new Date(checkOut) : null}
                          onChange={(date) =>
                            setCheckOut(
                              date ? date.toISOString().slice(0, 10) : ""
                            )
                          }
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select date"
                          minDate={checkIn ? new Date(checkIn) : new Date()}
                          className="form-control"
                          wrapperClassName="w-100"
                        />
                        <MdDateRange className="absolute top-[11px] right-2" />
                      </div>
                    </div>

                    <div className="col-6">
                      <label className="form-label" htmlFor="adults">
                        Adults
                      </label>
                      <input
                        id="adults"
                        type="number"
                        min={1}
                        className="form-control"
                        value={adults}
                        onChange={(e) =>
                          setAdults(Math.max(1, Number(e.target.value) || 1))
                        }
                      />
                    </div>
                    <div className="col-6">
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

                    <div className="col-12 col-md-6">
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

                {/* Add-ons (mobile) */}
                <div className="mb-4">
                  <h2 className="h5 mb-3">3) Optional Add-ons</h2>
                  <div className="row g-3">
                    <div className="col-12 col-sm-4">
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
                          Sunset Cruise{" "}
                          <span className="text-muted">(+ $60)</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
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
                    <div className="col-12 col-sm-4">
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
                          Water Sports{" "}
                          <span className="text-muted">(+ $50)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile sticky submit bar */}
                <div className="position-sticky bottom-0 py-3 bg-white border-top">
                  <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="small text-muted">Total</div>
                        <div className="h5 mb-0">${grandTotal}</div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={submitting}
                        aria-busy={submitting ? "true" : "false"}
                      >
                        {submitting ? "Processing…" : "Review & Confirm"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: desktop summary (sticky) */}
          <div className="col-12 col-lg-4 d-none d-lg-block">
            <div style={{ position: "sticky", top: 24 }}>
              <SummaryCard
                pkg={pkg}
                nights={nights}
                travelers={travelers}
                extras={extras}
                extrasTotal={extrasTotal}
                baseTotal={baseTotal}
                taxes={taxes}
                grandTotal={grandTotal}
                submitting={submitting}
                onReserve={handleReserve}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE OFFCANVAS (must NOT be inside a hidden parent) */}
      <div
        className="offcanvas offcanvas-bottom h-auto d-lg-none"
        tabIndex={-1}
        id="mobileCheckout"
        aria-labelledby="mobileCheckoutTitle"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileCheckoutTitle">
            Review & Confirm
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body">
          {/* Totals */}
          <div className="border-top pt-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Base</span>
              <strong>${baseTotal}</strong>
            </div>
            <div className="small text-muted mb-3">
              (${pkg.base} × {nights} × {Math.max(1, travelers)} guest
              {travelers > 1 ? "s" : ""})
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Add-ons</span>
              <strong>${extrasTotal}</strong>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Taxes & fees (10%)</span>
              <strong>${taxes}</strong>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="h6 mb-0">Total</span>
              <span className="h4 mb-0">${grandTotal}</span>
            </div>
          </div>

          {/* Confirm */}
          <div className="d-grid mt-3">
            <button
              className="btn btn-success btn-lg"
              onClick={handleReserve}
              disabled={submitting}
              aria-busy={submitting ? "true" : "false"}
              data-bs-dismiss="offcanvas"
            >
              {submitting ? "Processing…" : "Confirm & Pay"}
            </button>
          </div>
        </div>
      </div>

      {/* local styles */}
    </main>
  );
}

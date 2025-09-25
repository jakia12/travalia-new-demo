// app/_components/SummaryCard.jsx
"use client";

import { useMemo, useState } from "react";
import { z } from "zod";

// allowed add-on keys (kept in sync with your UI)
const ADDON_KEYS = ["sunsetCruise", "spaCredit", "waterSports"];

// Zod schema (JS, not TS)
const BookingSchema = z
  .object({
    packageId: z.string().min(1, "Missing package"),
    checkIn: z.string().min(1, "Please select a check-in date"),
    checkOut: z.string().min(1, "Please select a check-out date"),
    adults: z.coerce.number().int().min(1, "At least 1 adult"),
    children: z.coerce.number().int().min(0, "Children cannot be negative"),
    addOns: z
      .array(z.enum(ADDON_KEYS), { invalid_type_error: "Invalid add-ons" })
      .default([]),
  })
  .superRefine((val, ctx) => {
    // date sanity
    const inDate = new Date(val.checkIn);
    const outDate = new Date(val.checkOut);
    const inOk = !Number.isNaN(inDate.getTime());
    const outOk = !Number.isNaN(outDate.getTime());

    if (!inOk) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid date",
        path: ["checkIn"],
      });
    }
    if (!outOk) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid date",
        path: ["checkOut"],
      });
    }
    if (inOk && outOk && outDate <= inDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Check-out must be after check-in",
        path: ["checkOut"],
      });
    }
  });

export default function SummaryCard({
  pkg,
  nights = 1,
  travelers = 1,
  extras = {},
  extrasTotal = 0,
  baseTotal = 0,
  taxes = 0,
  grandTotal = 0,
  onReserve, // parent handler(payload)
  submitting = false, // disable buttons while redirecting
}) {
  if (!pkg) return null;

  // ---------------- Modal State ----------------
  const [open, setOpen] = useState(false);
  const [anim, setAnim] = useState(false);

  // Prefill from props when opening (adults from travelers best-effort)
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(Math.max(1, travelers || 1));
  const [children, setChildren] = useState(0);
  const [mExtras, setMExtras] = useState({
    sunsetCruise: !!extras.sunsetCruise,
    spaCredit: !!extras.spaCredit,
    waterSports: !!extras.waterSports,
  });

  const [fieldErrors, setFieldErrors] = useState({}); // { field: message }

  function openModal() {
    // (Optional) reset or prefill here if needed
    setFieldErrors({});
    setOpen(true);
    requestAnimationFrame(() => setAnim(true)); // start transition
  }
  function closeModal() {
    setAnim(false);
    setTimeout(() => setOpen(false), 150);
  }

  // ---------------- Calculations (live) ----------------
  const modalNights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const ms = outDate - inDate;
    const n = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
    return Number.isFinite(n) ? n : 1;
  }, [checkIn, checkOut]);

  const modalTravelers = Math.max(1, (adults || 0) + (children || 0));

  const modalExtrasTotal = useMemo(() => {
    let sum = 0;
    if (mExtras.sunsetCruise) sum += 60;
    if (mExtras.spaCredit) sum += 80;
    if (mExtras.waterSports) sum += 50;
    return sum;
  }, [mExtras]);

  const modalBaseTotal = useMemo(
    () => (pkg?.base || 0) * modalNights * modalTravelers,
    [pkg?.base, modalNights, modalTravelers]
  );

  const modalTaxes = Math.round((modalBaseTotal + modalExtrasTotal) * 0.1);
  const modalGrandTotal = modalBaseTotal + modalExtrasTotal + modalTaxes;

  // ---------------- Zod Validation ----------------
  function toAddOnsArray(obj) {
    return Object.entries(obj)
      .filter(([k, v]) => v && ADDON_KEYS.includes(k))
      .map(([k]) => k);
  }

  function validateWithZod() {
    const payload = {
      packageId: String(pkg?.id ?? pkg?.slug ?? pkg?.title ?? "").trim(),
      checkIn,
      checkOut,
      adults,
      children,
      addOns: toAddOnsArray(mExtras),
    };

    const res = BookingSchema.safeParse(payload);

    if (res.success) {
      setFieldErrors({});
      return { ok: true, data: { ...res.data, nights: modalNights } };
    }

    // Map zod issues -> { field: firstMessage }
    const map = {};
    for (const issue of res.error.issues) {
      const key = issue.path?.[0];
      if (key && !map[key]) map[key] = issue.message;
    }
    setFieldErrors(map);
    return { ok: false };
  }

  // ---------------- Confirm (call parent) ----------------
  function handleConfirm() {
    if (!onReserve) return;
    const v = validateWithZod();
    if (!v.ok) return;

    // pass validated values + computed nights to parent
    onReserve({
      packageId: v.data.packageId,
      checkIn: v.data.checkIn,
      checkOut: v.data.checkOut,
      adults: v.data.adults,
      children: v.data.children,
      nights: v.data.nights,
      addOns: v.data.addOns,
    });
  }

  return (
    <>
      {/* ---- CARD ---- */}
      <div className="card border-0 shadow-sm rounded-4 position-sticky top-0 mt-[41px]">
        <div
          className="ratio ratio-16x9 rounded-top-4"
          style={{
            backgroundImage: `url('${pkg.img}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h3 className="h5 mb-1 text-xl" style={{ fontSize: "40px" }}>
                {pkg.title}
              </h3>
              <small className="text-muted">
                from ${pkg.base}/night • {nights} night(s)
              </small>
            </div>
            <span className="badge bg-[#2ecc71]">{travelers} guest(s)</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between mb-2">
            <span>Base</span>
            <strong>${baseTotal}</strong>
          </div>
          <div className="small text-muted mb-3">
            (${pkg.base} × {nights} × {Math.max(1, travelers)} guest
            {travelers > 1 ? "s" : ""})
          </div>

          <div className="mb-2">
            <div className="d-flex justify-content-between">
              <span>Add-ons</span>
              <strong>${extrasTotal}</strong>
            </div>
            <ul className="small text-muted ps-3 mt-1 mb-0">
              {extras.sunsetCruise && <li>Sunset Cruise ($60)</li>}
              {extras.spaCredit && <li>Spa Credit ($80)</li>}
              {extras.waterSports && <li>Water Sports ($50)</li>}
              {!extras.sunsetCruise &&
                !extras.spaCredit &&
                !extras.waterSports && <li>None selected</li>}
            </ul>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span>Taxes & fees (10%)</span>
            <strong>${taxes}</strong>
          </div>

          <hr />

          <div className="d-flex justify-content-between align-items-center">
            <span className="h6 mb-0">Total</span>
            <span className="h4 mb-0">${grandTotal}</span>
          </div>

          <button
            type="button"
            className="btn w-100 mt-3 py-2 book_btn"
            onClick={openModal}
            disabled={submitting}
            aria-busy={submitting ? "true" : "false"}
            aria-live="polite"
            style={{ background: "#2ecc71", color: "#fff", border: "none" }}
          >
            {submitting ? "Redirecting…" : "Reserve Now"}
          </button>

          <p className="small text-muted text-center mt-2 mb-0">
            Free changes within 24 hours • Secure checkout
          </p>
        </div>
      </div>

      {/* ---- MODAL ---- */}
      {open && (
        <div
          className={`reserve-modal ${anim ? "is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reserveModalTitle"
          onKeyDown={(e) => e.key === "Escape" && closeModal()}
        >
          <div className="reserve-backdrop" onClick={closeModal} />

          <div className="reserve-dialog">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 id="reserveModalTitle" className="m-0">
                Review & Confirm
              </h4>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>

            {/* Form top */}
            <div className="mb-4">
              <h5 className="mb-3">2) Dates & Guests</h5>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Check-in</label>
                  <input
                    id="modalCheckIn"
                    type="date"
                    className={`form-control ${
                      fieldErrors.checkIn ? "is-invalid" : ""
                    }`}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                  {fieldErrors.checkIn && (
                    <div className="invalid-feedback">
                      {fieldErrors.checkIn}
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Check-out</label>
                  <input
                    id="modalCheckOut"
                    type="date"
                    className={`form-control ${
                      fieldErrors.checkOut ? "is-invalid" : ""
                    }`}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                  {fieldErrors.checkOut && (
                    <div className="invalid-feedback">
                      {fieldErrors.checkOut}
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-4">
                  <label className="form-label">Adults</label>
                  <input
                    type="number"
                    min={1}
                    className={`form-control ${
                      fieldErrors.adults ? "is-invalid" : ""
                    }`}
                    value={adults}
                    onChange={(e) =>
                      setAdults(Math.max(1, Number(e.target.value) || 1))
                    }
                  />
                  {fieldErrors.adults && (
                    <div className="invalid-feedback">{fieldErrors.adults}</div>
                  )}
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Children</label>
                  <input
                    type="number"
                    min={0}
                    className={`form-control ${
                      fieldErrors.children ? "is-invalid" : ""
                    }`}
                    value={children}
                    onChange={(e) =>
                      setChildren(Math.max(0, Number(e.target.value) || 0))
                    }
                  />
                  {fieldErrors.children && (
                    <div className="invalid-feedback">
                      {fieldErrors.children}
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label">Nights</label>
                  <input
                    type="text"
                    className="form-control"
                    value={modalNights}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Extras */}
            <div className="mb-4">
              <h5 className="mb-3">3) Optional Add-ons</h5>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <div className="form-check border rounded p-3 h-100">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="modalSunsetCruise"
                      checked={mExtras.sunsetCruise}
                      onChange={(e) =>
                        setMExtras((x) => ({
                          ...x,
                          sunsetCruise: e.target.checked,
                        }))
                      }
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor="modalSunsetCruise"
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
                      id="modalSpaCredit"
                      checked={mExtras.spaCredit}
                      onChange={(e) =>
                        setMExtras((x) => ({
                          ...x,
                          spaCredit: e.target.checked,
                        }))
                      }
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor="modalSpaCredit"
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
                      id="modalWaterSports"
                      checked={mExtras.waterSports}
                      onChange={(e) =>
                        setMExtras((x) => ({
                          ...x,
                          waterSports: e.target.checked,
                        }))
                      }
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor="modalWaterSports"
                    >
                      Water Sports <span className="text-muted">(+ $50)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Base</span>
                <strong>${modalBaseTotal}</strong>
              </div>
              <div className="small text-muted mb-3">
                (${pkg.base} × {modalNights} × {modalTravelers} guest
                {modalTravelers > 1 ? "s" : ""})
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Add-ons</span>
                <strong>${modalExtrasTotal}</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Taxes & fees (10%)</span>
                <strong>${modalTaxes}</strong>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="h6 mb-0">Total</span>
                <span className="h4 mb-0">${modalGrandTotal}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary w-50"
                onClick={closeModal}
              >
                Back
              </button>
              <button
                type="button"
                className="btn w-50"
                style={{ background: "#2ecc71", color: "#fff" }}
                onClick={handleConfirm}
                disabled={submitting}
                aria-busy={submitting ? "true" : "false"}
              >
                {submitting ? "Processing…" : "Confirm & Pay"}
              </button>
            </div>
          </div>

          {/* Tiny modal styles & transitions */}
          <style jsx>{`
            .reserve-modal {
              position: fixed;
              inset: 0;
              z-index: 1050;
              display: grid;
              place-items: center;
              pointer-events: none;
            }
            .reserve-backdrop {
              position: absolute;
              inset: 0;
              background: rgba(0, 0, 0, 0.5);
              opacity: 0;
              transition: opacity 150ms ease;
            }
            .reserve-dialog {
              position: relative;
              width: min(960px, 92vw);
              max-height: 88vh;
              overflow: auto;
              background: #fff;
              border-radius: 16px;
              padding: 20px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
              transform: translateY(12px) scale(0.98);
              opacity: 0;
              transition: transform 180ms ease, opacity 180ms ease;
              pointer-events: auto;
            }
            .reserve-modal.is-open .reserve-backdrop {
              opacity: 1;
            }
            .reserve-modal.is-open .reserve-dialog {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          `}</style>
        </div>
      )}
    </>
  );
}

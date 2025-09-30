// app/_components/SummaryCard.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { z } from "zod";

/* ---------------------------- helpers ---------------------------- */
const ADDON_KEYS = ["sunsetCruise", "spaCredit", "waterSports"];

// number coercion (handles "$1,200", "1200", 1200, null, undefined)
function num(x) {
  if (x == null) return 0;
  if (typeof x === "number" && isFinite(x)) return x;
  if (typeof x === "string") {
    const n = Number(x.replace(/[^0-9.-]+/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function money(n, currency = "USD") {
  try {
    return Number(n || 0).toLocaleString("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
  } catch {
    return `$${n ?? 0}`;
  }
}

// parse "YYYY-MM-DD" in local time
const fromYMD = (s) => {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const toYMD = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

/* ---------------------------- schema ----------------------------- */
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

/* ---------------------------- component -------------------------- */
export default function SummaryCard2({
  pkg,
  nights = 1,
  travelers = 2,
  extras = {},
  extrasTotal = 0, // not used in modal (modal recomputes)
  baseTotal = 0, // not used in modal (modal recomputes)
  taxes = 0, // not used in modal (modal recomputes)
  grandTotal = 0, // not used in modal (modal recomputes)
  onReserve,
  submitting = false,
}) {
  if (!pkg) return null;

  /* ---------- price meta & base-rate resolution (FIX) ----------- */
  // Support multiple shapes from your data:
  // - pkg.base
  // - pkg.price.base
  // - pkg.price.amount
  // - pkg.pricePerNight
  // - pkg.rate?.nightly
  const priceMeta = pkg?.price || {};
  const per = (priceMeta.per || "person").toLowerCase(); // "person" | "room"
  const baseRate =
    num(pkg?.base) ||
    num(priceMeta.base) ||
    num(priceMeta.amount) ||
    num(pkg?.pricePerNight) ||
    num(pkg?.rate?.nightly);

  /* --------------------------- modal state ----------------------- */
  const [open, setOpen] = useState(false);
  const [anim, setAnim] = useState(false);
  const dialogRef = useRef(null);
  const [sending, setSending] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(Math.max(1, travelers || 1));
  const [children, setChildren] = useState(0);
  const [mExtras, setMExtras] = useState({
    sunsetCruise: !!extras.sunsetCruise,
    spaCredit: !!extras.spaCredit,
    waterSports: !!extras.waterSports,
  });
  const [fieldErrors, setFieldErrors] = useState({});

  function openModal() {
    setFieldErrors({});
    setOpen(true);
    requestAnimationFrame(() => setAnim(true));
  }
  function closeModal() {
    setAnim(false);
    setTimeout(() => setOpen(false), 150);
  }
  function handleOverlayMouseDown(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  // focus trap + body scroll lock
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarComp =
      window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarComp > 0) body.style.paddingRight = `${scrollbarComp}px`;

    const dialog = dialogRef.current;
    const getFocusables = () =>
      Array.from(
        dialog?.querySelectorAll(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        ) || []
      ).filter((el) => !el.hasAttribute("disabled"));

    let focusables = getFocusables();
    let first = focusables[0];
    let last = focusables[focusables.length - 1];
    (first || dialog)?.focus?.();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
        return;
      }
      if (e.key === "Tab") {
        focusables = getFocusables();
        if (focusables.length === 0) return;
        first = focusables[0];
        last = focusables[focusables.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  /* --------------------- live modal calculations ----------------- */
  const modalNights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const ms = outDate - inDate;
    const n = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
    return Number.isFinite(n) ? n : 1;
  }, [checkIn, checkOut]);

  const modalTravelers = Math.max(1, (adults || 0) + (children || 0));
  const guestMultiplier = per === "person" ? modalTravelers : 1;

  const modalExtrasTotal = useMemo(() => {
    let sum = 0;
    if (mExtras.sunsetCruise) sum += 60;
    if (mExtras.spaCredit) sum += 80;
    if (mExtras.waterSports) sum += 50;
    return sum;
  }, [mExtras]);

  // *** FIXED: use resolved baseRate + per logic
  const modalBaseTotal = useMemo(
    () => baseRate * modalNights * guestMultiplier,
    [baseRate, modalNights, guestMultiplier]
  );

  const modalTaxes = Math.round((modalBaseTotal + modalExtrasTotal) * 0.1);
  const modalGrandTotal = modalBaseTotal + modalExtrasTotal + modalTaxes;

  /* ----------------------- validation + submit -------------------- */
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
    const map = {};
    for (const issue of res.error.issues) {
      const key = issue.path?.[0];
      if (key && !map[key]) map[key] = issue.message;
    }
    setFieldErrors(map);
    return { ok: false, errors: map };
  }

  async function handleConfirm() {
    const v = validateWithZod();
    if (!v.ok) return;

    if (typeof onReserve !== "function") {
      toast.error("Checkout handler is missing. Please wire onReserve.");
      return;
    }

    const payload = {
      packageId: v.data.packageId,
      checkIn: v.data.checkIn,
      checkOut: v.data.checkOut,
      adults: v.data.adults,
      children: v.data.children,
      nights: v.data.nights,
      addOns: v.data.addOns,
    };

    setSending(true);
    try {
      await onReserve(payload);
    } catch (e) {
      toast.error(e?.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  /* ------------------------------- UI ---------------------------- */
  return (
    <>
      {/* ---- CARD ---- */}
      <div className="card border-0 rounded-4">
        <div className="card-body">
          <button
            type="button"
            className="btn w-100 mt-3 py-[9px] book_btn"
            onClick={openModal}
            disabled={submitting || sending}
            aria-busy={submitting || sending ? "true" : "false"}
            aria-live="polite"
            style={{ background: "#2ecc71", color: "#fff", border: "none" }}
          >
            {submitting || sending ? "Redirecting…" : "Reserve Now"}
          </button>
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
          onMouseDown={handleOverlayMouseDown}
        >
          {/* Backdrop */}
          <div className="reserve-backdrop" />

          {/* Dialog */}
          <div
            className="reserve-dialog"
            ref={dialogRef}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            />

            {/* Header */}
            <div className="mb-3">
              <h4 id="reserveModalTitle" className="m-0 text-center">
                Review & Confirm
              </h4>
            </div>

            {/* Dates & Guests */}
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
                      Sunset Cruise <br />
                      <span className="text-muted">(+ $60)</span>
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
                      Spa Credit <br />
                      <span className="text-muted">(+ $80)</span>
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
                      Water Sports
                      <br /> <span className="text-muted">(+ $50)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Base</span>
                <strong>{money(modalBaseTotal)}</strong>
              </div>
              <div className="small text-muted mb-3">
                ({money(baseRate)} × {modalNights} × {guestMultiplier} guest
                {guestMultiplier > 1 ? "s" : ""})
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Add-ons</span>
                <strong>{money(modalExtrasTotal)}</strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Taxes & fees (10%)</span>
                <strong>{money(modalTaxes)}</strong>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="h6 mb-0">Total</span>
                <span className="h4 mb-0">{money(modalGrandTotal)}</span>
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
                disabled={submitting || sending}
                aria-busy={submitting || sending ? "true" : "false"}
              >
                {submitting || sending ? "Processing…" : "Confirm & Pay"}
              </button>
            </div>
          </div>

          {/* Styles
          .reserve-modal{position:fixed;inset:0;z-index:1050;display:grid;place-items:center;opacity:0;pointer-events:none;transition:opacity .15s ease}
          .reserve-modal.is-open{opacity:1;pointer-events:auto}
          .reserve-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5)}
          .reserve-dialog{position:relative;background:#fff;width:min(720px,92vw);border-radius:16px;padding:24px;max-height:88vh;overflow:auto;transform:translateY(8px);transition:transform .15s ease}
          .reserve-modal.is-open .reserve-dialog{transform:translateY(0)}
          */}
        </div>
      )}
    </>
  );
}

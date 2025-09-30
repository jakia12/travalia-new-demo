// app/offers/[slug]/ux/UXClient.jsx
"use client";

import { useEffect, useState } from "react";

const currencyFmt = (n, c = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(n);

function FAQ({ faq }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion" id="offerFAQ">
      {faq.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div className="accordion-item" key={idx}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${!isOpen ? "collapsed" : ""}`}
                type="button"
                onClick={() => setOpen(isOpen ? -1 : idx)}
              >
                {item.q}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
            >
              <div className="accordion-body">{item.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuickCalc({ currency, perNight, defaultNights, minStay }) {
  const [nights, setNights] = useState(
    Math.max(defaultNights || minStay, minStay)
  );

  return (
    <div className="mt-2">
      <label htmlFor="nights" className="form-label small mb-1">
        Quick estimate (nights)
      </label>
      <div className="input-group input-group-sm">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setNights((v) => Math.max(minStay, v - 1))}
          aria-label="Decrease nights"
        >
          <i className="bi bi-dash" />
        </button>
        <input
          id="nights"
          className="form-control text-center"
          value={nights}
          onChange={(e) => {
            const v = parseInt(e.target.value || "0", 10);
            if (!Number.isNaN(v)) setNights(Math.max(minStay, v));
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label="Nights"
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setNights((v) => v + 1)}
          aria-label="Increase nights"
        >
          <i className="bi bi-plus" />
        </button>
      </div>
      <div className="mt-2 small">
        ~ {currencyFmt(perNight * nights, currency)} total (room only;
        taxes/fees extra)
      </div>
    </div>
  );
}

function ShareButtons({ slug, title }) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://yourdomain.com/offers/${slug}`;

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch {
      /* ignore */
    }
  }
  return (
    <button onClick={share} className="btn btn-sm btn-outline-secondary">
      <i className={`bi ${copied ? "bi-clipboard-check" : "bi-share"} me-1`} />
      {copied ? "Copied" : "Share"}
    </button>
  );
}

function PrintButton() {
  return (
    <button
      className="btn btn-sm btn-light w-100"
      onClick={() => window.print()}
    >
      <i className="bi bi-printer me-2" />
      Print this page
    </button>
  );
}

function MobileBar({ price, currency, ctaHref }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="d-lg-none"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: visible ? 0 : -80,
        transition: "bottom .25s ease",
        zIndex: 1030,
      }}
    >
      <div className="border-top bg-white p-3 d-flex align-items-center justify-content-between shadow">
        <div>
          <div className="small text-muted">From</div>
          <div className="fw-semibold">
            {currencyFmt(price, currency)} / night
          </div>
        </div>
        <a href={ctaHref} className="btn btn-success btn-lg">
          Book
        </a>
      </div>
    </div>
  );
}

const UXClient = { FAQ, QuickCalc, ShareButtons, PrintButton, MobileBar };
export default UXClient;
// also export named parts for direct import
export { FAQ, MobileBar, PrintButton, QuickCalc, ShareButtons };

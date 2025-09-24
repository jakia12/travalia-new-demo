// app/_components/SummaryCard.jsx
"use client";

export default function SummaryCard({
  pkg,
  nights = 1,
  travelers = 1,
  extras = {},
  extrasTotal = 0,
  baseTotal = 0,
  taxes = 0,
  grandTotal = 0,
  onReserve, // NEW
  submitting = false, // NEW
}) {
  if (!pkg) return null;

  return (
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
            <h3 className="h5 mb-1">{pkg.title}</h3>
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

        {/* Reserve Now -> calls onReserve from parent */}
        <button
          type="button"
          className="btn w-100 mt-3 py-2 book_btn"
          onClick={onReserve}
          disabled={submitting || !onReserve}
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
  );
}

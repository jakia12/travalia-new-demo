// app/terms/page.jsx
"use client";

import Link from "next/link";

const COMPANY = "Your Travel Co.";
const APPNAME = "Your Travel App";
const CONTACT_EMAIL = "support@travalio.com";
const EFFECTIVE_DATE = "September 25, 2025";

export default function TermsPage() {
  return (
    <>
      {" "}
      <section
        className="cs_page_header cs_bg_filed cs_primary_bg"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/banner/bn.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="cs_page_header_text text-center">
            <h1 className="cs_page_title cs_fs_70 cs_white_color cs_bold">
              Terms & Conditions
            </h1>
            <p className="cs_page_subtitle cs_fs_24 mb-0">
              The rules for using our website and booking services.
            </p>
          </div>
        </div>
      </section>
      <main className="py-5">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-4">
            <p className="text-success fw-semibold mb-1">Legal</p>
            <h1 className="display-5 fw-bold">Terms & Conditions</h1>
            <p className="text-muted">Effective: {EFFECTIVE_DATE}</p>
          </div>

          {/* Card */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-lg-5">
              <p className="lead">
                By accessing or using {APPNAME}, you agree to these Terms. If
                you do not agree, do not use the service.
              </p>

              {/* TOC */}
              <div className="bg-light rounded-3 p-3 mb-4">
                <h6 className="mb-2">Table of contents</h6>
                <ul className="list-unstyled ms-2 mb-0">
                  {[
                    ["use", "1. Use of the service"],
                    ["accounts", "2. Accounts & accuracy"],
                    ["bookings", "3. Bookings, pricing & taxes"],
                    ["cancellations", "4. Cancellations & refunds"],
                    ["conduct", "5. Acceptable use"],
                    ["ip", "6. Intellectual property"],
                    ["reviews", "7. Reviews & submissions"],
                    ["disclaimers", "8. Disclaimers"],
                    ["liability", "9. Limitation of liability"],
                    ["indemnity", "10. Indemnification"],
                    ["governing-law", "11. Governing law & venue"],
                    ["changes", "12. Changes to terms"],
                    ["contact", "13. Contact"],
                  ].map(([id, label]) => (
                    <li key={id}>
                      <a
                        className="link-dark text-decoration-none"
                        href={`#${id}`}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <section id="use" className="mb-4">
                <h3 className="h4">1. Use of the service</h3>
                <p>
                  You must be at least the age of majority in your jurisdiction
                  to use {APPNAME}. You may use the service only in compliance
                  with applicable laws and these Terms.
                </p>
              </section>

              <section id="accounts" className="mb-4">
                <h3 className="h4">2. Accounts & accuracy</h3>
                <p>
                  You are responsible for your account credentials and for all
                  activity under your account. Provide accurate and current
                  information, and notify us of any unauthorized use.
                </p>
              </section>

              <section id="bookings" className="mb-4">
                <h3 className="h4">3. Bookings, pricing & taxes</h3>
                <ul>
                  <li>
                    Availability, pricing, fees, and taxes may change until you
                    complete checkout.
                  </li>
                  <li>
                    Some resorts require additional local taxes or fees
                    collected at check-in.
                  </li>
                  <li>
                    We act as an agent for certain partners; your contract may
                    be with the resort/partner.
                  </li>
                </ul>
              </section>

              <section id="cancellations" className="mb-4">
                <h3 className="h4">4. Cancellations & refunds</h3>
                <p>
                  Cancellation windows and penalties vary by property and rate.
                  The applicable policy is shown at checkout and in your
                  confirmation. No-shows are non-refundable unless stated
                  otherwise.
                </p>
              </section>

              <section id="conduct" className="mb-4">
                <h3 className="h4">5. Acceptable use</h3>
                <ul>
                  <li>
                    No scraping, reverse engineering, or misuse of the platform.
                  </li>
                  <li>
                    No posting of unlawful, harmful, or infringing content.
                  </li>
                  <li>
                    No interference with service integrity, security, or
                    availability.
                  </li>
                </ul>
              </section>

              <section id="ip" className="mb-4">
                <h3 className="h4">6. Intellectual property</h3>
                <p>
                  {APPNAME} and all content, branding, and software are owned by{" "}
                  {COMPANY} or its licensors and are protected by IP laws. You
                  receive a limited, revocable license to use the service for
                  personal, non-commercial purposes.
                </p>
              </section>

              <section id="reviews" className="mb-4">
                <h3 className="h4">7. Reviews & submissions</h3>
                <p>
                  By submitting content (e.g., reviews, photos), you grant{" "}
                  {COMPANY} a worldwide, royalty-free, sublicensable license to
                  use, display, and distribute such content in connection with
                  the service.
                </p>
              </section>

              <section id="disclaimers" className="mb-4">
                <h3 className="h4">8. Disclaimers</h3>
                <p>
                  The service is provided “as is” without warranties of any
                  kind. We do not guarantee uninterrupted or error-free
                  operation or the accuracy of third-party content.
                </p>
              </section>

              <section id="liability" className="mb-4">
                <h3 className="h4">9. Limitation of liability</h3>
                <p>
                  To the maximum extent permitted by law, {COMPANY} is not
                  liable for indirect, incidental, special, consequential, or
                  punitive damages, or any loss of profits, revenue, or data.
                </p>
              </section>

              <section id="indemnity" className="mb-4">
                <h3 className="h4">10. Indemnification</h3>
                <p>
                  You agree to indemnify and hold {COMPANY}, its affiliates, and
                  partners harmless from claims arising out of your use of the
                  service or violation of these Terms.
                </p>
              </section>

              <section id="governing-law" className="mb-4">
                <h3 className="h4">11. Governing law & venue</h3>
                <p>
                  These Terms are governed by the laws of the state/country
                  where {COMPANY} is established, without regard to
                  conflict-of-law principles. Exclusive venue lies in the
                  competent courts of that location.
                </p>
              </section>

              <section id="changes" className="mb-4">
                <h3 className="h4">12. Changes to terms</h3>
                <p>
                  We may update these Terms from time to time. Continued use
                  after changes constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section id="contact" className="mb-2">
                <h3 className="h4">13. Contact</h3>
                <p>
                  Questions? Email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              </section>

              {/* Footer nav */}
              <hr className="my-4" />
              <div className="d-flex gap-3">
                <Link className="btn btn-outline-secondary" href="/">
                  Back to Home
                </Link>
                <Link className="btn btn-success" href="/privacy-policy">
                  View Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

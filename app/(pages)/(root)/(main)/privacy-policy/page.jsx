// app/privacy-policy/page.jsx
"use client";

import Link from "next/link";

const COMPANY = "Your Travel Co.";
const APPNAME = "Your Travel App";
const CONTACT_EMAIL = "support@travalio.com";
const CONTACT_ADDRESS = "123 Beach Rd, Miami, FL 33101, USA";
const EFFECTIVE_DATE = "September 25, 2025";

export default function PrivacyPolicyPage() {
  return (
    <>
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
              Privacy Policy
            </h1>
            <p className="cs_page_subtitle cs_fs_24 mb-0">
              How we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>
      <main className="py-5">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-4">
            <p className="text-success fw-semibold mb-1">Legal</p>
            <h1 className="display-5 fw-bold">Privacy Policy</h1>
            <p className="text-muted">Effective: {EFFECTIVE_DATE}</p>
          </div>

          {/* Card */}
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-lg-5">
              {/* Intro */}
              <p className="lead">
                This Privacy Policy explains how {COMPANY} (“{APPNAME}”, “we”,
                “us”, or “our”) collects, uses, and shares information when you
                visit our website, browse resorts, or make bookings.
              </p>

              {/* TOC */}
              <div className="bg-light rounded-3 p-3 mb-4">
                <h6 className="mb-2">Table of contents</h6>
                <ul className="list-unstyled ms-2 mb-0">
                  {[
                    ["info-we-collect", "1. Information we collect"],
                    ["how-we-use", "2. How we use information"],
                    ["legal-bases", "3. Legal bases (EEA/UK)"],
                    ["cookies", "4. Cookies & tracking"],
                    ["payments", "5. Payments & PCI"],
                    ["sharing", "6. Sharing & disclosures"],
                    ["intl-transfers", "7. International transfers"],
                    ["data-retention", "8. Data retention"],
                    ["your-rights", "9. Your rights & choices"],
                    ["security", "10. Security"],
                    ["children", "11. Children’s privacy"],
                    ["third-parties", "12. Third-party links & services"],
                    ["changes", "13. Changes to this policy"],
                    ["contact", "14. Contact us"],
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

              {/* Sections */}
              <section id="info-we-collect" className="mb-4">
                <h3 className="h4">1. Information we collect</h3>
                <p>We collect information in three ways:</p>
                <ul>
                  <li>
                    <strong>Information you provide</strong>: account details
                    (name, email, phone), booking details (guests, dates,
                    preferences), communications, reviews.
                  </li>
                  <li>
                    <strong>Automatic data</strong>: device type, browser, IP,
                    pages viewed, referrer, and basic analytics via cookies or
                    similar technologies.
                  </li>
                  <li>
                    <strong>From partners</strong>: payment processors (payment
                    status), identity/email providers, and resort partners to
                    fulfill bookings.
                  </li>
                </ul>
              </section>

              <section id="how-we-use" className="mb-4">
                <h3 className="h4">2. How we use information</h3>
                <ul>
                  <li>
                    Provide and manage bookings, itineraries, and customer
                    support.
                  </li>
                  <li>Send confirmations, reminders, and service updates.</li>
                  <li>
                    Prevent fraud, secure our services, and comply with law.
                  </li>
                  <li>Improve features, usability, and personalized offers.</li>
                  <li>
                    Marketing with your consent (where required) — opt out
                    anytime.
                  </li>
                </ul>
              </section>

              <section id="legal-bases" className="mb-4">
                <h3 className="h4">3. Legal bases (EEA/UK)</h3>
                <p>
                  We process personal data under: performance of a contract
                  (bookings), legitimate interests (security, analytics),
                  consent (marketing/cookies), and legal obligations.
                </p>
              </section>

              <section id="cookies" className="mb-4">
                <h3 className="h4">4. Cookies & tracking</h3>
                <p>
                  We use necessary cookies for core functionality and optional
                  analytics/advertising cookies to understand usage and improve
                  the experience. You can manage cookies in your browser or
                  through our cookie banner (where available).
                </p>
              </section>

              <section id="payments" className="mb-4">
                <h3 className="h4">5. Payments & PCI</h3>
                <p>
                  Payments are handled by third-party processors (e.g.,
                  Stripe/PayPal). We do not store full card numbers. Processors
                  act as independent controllers or processors under their own
                  policies.
                </p>
              </section>

              <section id="sharing" className="mb-4">
                <h3 className="h4">6. Sharing & disclosures</h3>
                <ul>
                  <li>
                    <strong>Resort/experience partners</strong> to fulfill
                    bookings.
                  </li>
                  <li>
                    <strong>Service providers</strong> (hosting, analytics,
                    communications).
                  </li>
                  <li>
                    <strong>Legal & safety</strong> when required by law or to
                    protect rights.
                  </li>
                  <li>
                    <strong>Business transfers</strong> (merger, acquisition,
                    asset sale).
                  </li>
                </ul>
              </section>

              <section id="intl-transfers" className="mb-4">
                <h3 className="h4">7. International transfers</h3>
                <p>
                  Data may be processed outside your country. Where required, we
                  use safeguards like Standard Contractual Clauses.
                </p>
              </section>

              <section id="data-retention" className="mb-4">
                <h3 className="h4">8. Data retention</h3>
                <p>
                  We retain data for as long as needed for bookings, legal
                  obligations, and legitimate business purposes. We delete or
                  anonymize when no longer necessary.
                </p>
              </section>

              <section id="your-rights" className="mb-4">
                <h3 className="h4">9. Your rights & choices</h3>
                <p>
                  Depending on your region, you may request access, correction,
                  deletion, restriction, portability, or object to processing.
                  To exercise rights or opt out of marketing, contact us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              </section>

              <section id="security" className="mb-4">
                <h3 className="h4">10. Security</h3>
                <p>
                  We employ administrative, technical, and physical safeguards.
                  No method of transmission or storage is 100% secure.
                </p>
              </section>

              <section id="children" className="mb-4">
                <h3 className="h4">11. Children’s privacy</h3>
                <p>
                  {APPNAME} is not directed to children under 13 (or as defined
                  by local law). If you believe a child provided personal
                  information, contact us to remove it.
                </p>
              </section>

              <section id="third-parties" className="mb-4">
                <h3 className="h4">12. Third-party links & services</h3>
                <p>
                  Our site may link to third-party websites. Their privacy
                  practices are governed by their own policies.
                </p>
              </section>

              <section id="changes" className="mb-4">
                <h3 className="h4">13. Changes to this policy</h3>
                <p>
                  We may update this Policy. Material changes will be posted on
                  this page with a new effective date.
                </p>
              </section>

              <section id="contact" className="mb-2">
                <h3 className="h4">14. Contact us</h3>
                <address className="mb-0">
                  {COMPANY}
                  <br />
                  {CONTACT_ADDRESS}
                  <br />
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </address>
              </section>

              {/* Footer nav */}
              <hr className="my-4" />
              <div className="d-flex gap-3">
                <Link className="btn btn-outline-secondary" href="/">
                  Back to Home
                </Link>
                <Link className="btn btn-success" href="/terms-conditions">
                  View Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

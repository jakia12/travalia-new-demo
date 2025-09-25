// app/_components/ContactInfo.jsx
"use client";

export default function ContactInfo() {
  return (
    <section>
      <div className="cs_height_140 cs_height_lg_80" />
      <div className="container">
        <div className="row cs_gap_y_40">
          {/* Office Address */}
          <div className="col-lg-3 col-md-6">
            <div className="cs_iconbox cs_style_5 cs_gray_bg cs_radius_5 text-center">
              <div className="cs_iconbox_icon cs_accent_bg cs_white_color cs_center cs_radius_5">
                <i className="fa-solid fa-location-dot" />
              </div>
              <h2
                className="cs_iconbox_title cs_fs_24 cs_semibold"
                style={{ fontFamily: "Playfair" }}
              >
                Travalia HQ (Mailing)
              </h2>
              <p className="cs_iconbox_subtitle mb-2">
                H. Fasmeeru Building, 3rd Floor <br />
                Boduthakurufaanu Magu, Malé 20182, Maldives
              </p>
              {/* <p className="mb-2 small text-muted">Sun–Thu · 9:00–18:00 MVT</p> */}
            </div>
          </div>

          {/* Phone Call */}
          <div className="col-lg-3 col-md-6">
            <div className="cs_iconbox cs_style_5 cs_gray_bg cs_radius_5 text-center">
              <div className="cs_iconbox_icon cs_accent_bg cs_white_color cs_center cs_radius_5">
                <i className="fa-solid fa-phone" />
              </div>
              <h2 className="cs_iconbox_title cs_fs_24 cs_semibold">
                Call Travalia
              </h2>
              <p className="cs_iconbox_subtitle mb-1">
                Local (Maldives):{" "}
                <a href="tel:+9606501234">+960&nbsp;650&nbsp;1234</a>
                <br />
                International:{" "}
                <a href="tel:+9607784567" style={{ color: "#000" }}>
                  +960&nbsp;778&nbsp;4567
                </a>
              </p>
              <p className="mb-0 small text-muted">
                On-trip emergencies 24/7:{" "}
                <a href="tel:+9607779110" style={{ color: "#000" }}>
                  +960&nbsp;777&nbsp;9110
                </a>
              </p>
            </div>
          </div>

          {/* E-Mail Us */}
          <div className="col-lg-3 col-md-6">
            <div className="cs_iconbox cs_style_5 cs_gray_bg cs_radius_5 text-center">
              <div className="cs_iconbox_icon cs_accent_bg cs_white_color cs_center cs_radius_5">
                <i className="fa-solid fa-envelope" />
              </div>
              <h2 className="cs_iconbox_title cs_fs_24 cs_semibold">
                E-mail Travalia
              </h2>
              <p className="cs_iconbox_subtitle mb-1">
                <a href="mailto:hello@travalia.com">hello@travalia.com</a>
                <br />
                <a href="mailto:support@travalia.com">support@travalia.com</a>
              </p>
              <p className="mb-0 small text-muted">
                Typical reply time: 1–2 hours (business hrs)
              </p>
            </div>
          </div>

          {/* Supports */}
          <div className="col-lg-3 col-md-6">
            <div className="cs_iconbox cs_style_5 cs_gray_bg cs_radius_5 text-center">
              <div className="cs_iconbox_icon cs_accent_bg cs_white_color cs_center cs_radius_5">
                <i className="fa-solid fa-headset" />
              </div>
              <h2 className="cs_iconbox_title cs_fs_24 cs_semibold">
                Support & Chat
              </h2>
              <p className="cs_iconbox_subtitle mb-1">
                Live chat: bottom-right widget
                <br />
                WhatsApp:{" "}
                <a
                  href="https://wa.me/9607784567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +960&nbsp;778&nbsp;4567
                </a>
              </p>
              <p className="mb-0 small text-muted">24/7 traveler support</p>
            </div>
          </div>
        </div>
      </div>
      <div className="cs_height_140 cs_height_lg_80" />
    </section>
  );
}

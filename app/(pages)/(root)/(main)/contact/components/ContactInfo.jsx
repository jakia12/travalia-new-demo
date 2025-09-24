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
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h2
                className="cs_iconbox_title cs_fs_24 cs_semibold"
                style={{ fontFamily: "Playfair" }}
              >
                Office Address
              </h2>
              <p className="cs_iconbox_subtitle mb-0">
                7 Green Lake Street <br /> Crawfordsville, IN 47933
              </p>
            </div>
          </div>

          {/* Phone Call */}
          <div className="col-lg-3 col-md-6">
            <div className="cs_iconbox cs_style_5 cs_gray_bg cs_radius_5 text-center">
              <div className="cs_iconbox_icon cs_accent_bg cs_white_color cs_center cs_radius_5">
                <i className="fa-solid fa-phone"></i>
              </div>
              <h2 className="cs_iconbox_title cs_fs_24 cs_semibold">
                Phone Call
              </h2>
              <p className="cs_iconbox_subtitle mb-0">
                +98 234 (4567) 890 <br /> +98 234 (4567) 890
              </p>
            </div>
          </div>

          {/* E-Mail Us */}
          <div className="col-lg-3 col-md-6">
            <div className="cs_iconbox cs_style_5 cs_gray_bg cs_radius_5 text-center">
              <div className="cs_iconbox_icon cs_accent_bg cs_white_color cs_center cs_radius_5">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <h2 className="cs_iconbox_title cs_fs_24 cs_semibold">
                E-Mail Us
              </h2>
              <p className="cs_iconbox_subtitle mb-0">
                example@gmail.com <br /> yourmail@gmail.com
              </p>
            </div>
          </div>

          {/* Supports */}
          <div className="col-lg-3 col-md-6">
            <div className="cs_iconbox cs_style_5 cs_gray_bg cs_radius_5 text-center">
              <div className="cs_iconbox_icon cs_accent_bg cs_white_color cs_center cs_radius_5">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h2 className="cs_iconbox_title cs_fs_24 cs_semibold">
                Supports
              </h2>
              <p className="cs_iconbox_subtitle mb-0">
                24/7 any time support team <br /> ready for supports.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="cs_height_140 cs_height_lg_80" />
    </section>
  );
}

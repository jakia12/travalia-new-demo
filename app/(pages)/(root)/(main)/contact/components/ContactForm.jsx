// app/_components/ContactForm.jsx
"use client";

export default function ContactForm() {
  return (
    <section className="cs_gray_bg">
      <div className="cs_height_135 cs_height_lg_75" />
      <div className="container">
        {/* Section heading */}
        <div className="cs_section_heading cs_style_1 text-center">
          <h3
            className="cs_section_title_up cs_ternary_font cs_accent_color cs_normal cs_fs_24"
            style={{ color: "#2ecc71", fontFamily: "Satisfy" }}
          >
            CONTACT US
          </h3>
          <h2
            className="cs_section_title cs_semibold cs_fs_56 mb-0"
            style={{ fontFamily: "Playfair" }}
          >
            Contact Information
          </h2>
        </div>

        <div className="cs_height_55 cs_height_lg_40" />

        {/* Contact Form */}
        <form className="cs_contact_form row cs_gap_y_24">
          <div className="col-lg-6">
            <div className="cs_input_field">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="cs_form_field cs_radius_5"
              />
              <span>
                <i className="fa-regular fa-user"></i>
              </span>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="cs_input_field">
              <input
                type="email"
                placeholder="Enter Your E-Mail"
                className="cs_form_field cs_radius_5 cs_white_bg"
              />
              <span>
                <i className="fa-regular fa-envelope"></i>
              </span>
            </div>
          </div>

          <div className="col-lg-12">
            <input
              type="text"
              placeholder="Select Subjects"
              className="cs_form_field cs_radius_5 cs_white_bg"
            />
          </div>

          <div className="col-lg-12">
            <textarea
              rows={5}
              className="cs_form_field cs_radius_5 cs_white_bg"
              placeholder="Write Message..."
            ></textarea>
          </div>

          <div className="col-lg-12 text-center">
            <button
              type="submit"
              className="cs_btn cs_style_1 cs_fs_18 cs_medium cs_radius_4"
            >
              <i className="fa-regular fa-envelope"></i> Send Message
            </button>
          </div>
        </form>
      </div>
      <div className="cs_height_100 cs_height_lg_60" />
    </section>
  );
}

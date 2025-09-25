// app/_components/ContactForm.jsx
"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

export default function ContactForm() {
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, "Please enter your full name").max(80),
        email: z.string().email("Enter a valid email address"),
        subject: z.string().min(3, "Please enter a subject").max(100),
        message: z
          .string()
          .min(10, "Message should be at least 10 characters")
          .max(2000),
      }),
    []
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateField = (key) => {
    const partial = z.object({ [key]: schema.shape[key] });
    const res = partial.safeParse({ [key]: form[key] });
    if (!res.success) {
      setErrors((e) => ({
        ...e,
        [key]: res.error.issues[0]?.message || "Invalid value",
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path?.[0];
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      const first = Object.keys(fieldErrors)[0];
      if (first) document.getElementById(`cf_${first}`)?.focus();
      return;
    }

    setSubmitting(true);

    // simulate sending (replace with real API call)
    const sendPromise = new Promise((resolve) => setTimeout(resolve, 900));

    try {
      await toast.promise(sendPromise, {
        loading: "Sending your message…",
        success: "Message sent! We’ll get back to you shortly.",
        error: "Something went wrong. Please try again.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

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
        <form
          className="cs_contact_form row cs_gap_y_24"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-lg-6">
            <div className="cs_input_field">
              <input
                id="cf_name"
                type="text"
                placeholder="Enter Your Name"
                className="cs_form_field cs_radius_5"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                onBlur={() => validateField("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "cf_name_err" : undefined}
              />
              <span>
                <i className="fa-regular fa-user"></i>
              </span>
              {errors.name && (
                <small
                  id="cf_name_err"
                  style={{ color: "#e74c3c" }}
                  className="d-block mt-1"
                >
                  {errors.name}
                </small>
              )}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="cs_input_field">
              <input
                id="cf_email"
                type="email"
                placeholder="Enter Your E-Mail"
                className="cs_form_field cs_radius_5 cs_white_bg"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                onBlur={() => validateField("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "cf_email_err" : undefined}
              />
              <span>
                <i className="fa-regular fa-envelope"></i>
              </span>
              {errors.email && (
                <small
                  id="cf_email_err"
                  style={{ color: "#e74c3c" }}
                  className="d-block mt-1"
                >
                  {errors.email}
                </small>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <input
              id="cf_subject"
              type="text"
              placeholder="Select Subjects"
              className="cs_form_field cs_radius_5 cs_white_bg"
              value={form.subject}
              onChange={(e) => setField("subject", e.target.value)}
              onBlur={() => validateField("subject")}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "cf_subject_err" : undefined}
            />
            {errors.subject && (
              <small
                id="cf_subject_err"
                style={{ color: "#e74c3c" }}
                className="d-block mt-1"
              >
                {errors.subject}
              </small>
            )}
          </div>

          <div className="col-lg-12">
            <textarea
              id="cf_message"
              rows={5}
              className="cs_form_field cs_radius_5 cs_white_bg"
              placeholder="Write Message..."
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              onBlur={() => validateField("message")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "cf_message_err" : undefined}
            />
            {errors.message && (
              <small
                id="cf_message_err"
                style={{ color: "#e74c3c" }}
                className="d-block mt-1"
              >
                {errors.message}
              </small>
            )}
          </div>

          <div className="col-lg-12 text-center">
            <button
              type="submit"
              className="cs_btn cs_style_1 cs_fs_18 cs_medium cs_radius_4"
              disabled={submitting}
              aria-busy={submitting}
            >
              <i className="fa-regular fa-envelope"></i>{" "}
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
      <div className="cs_height_100 cs_height_lg_60" />
    </section>
  );
}

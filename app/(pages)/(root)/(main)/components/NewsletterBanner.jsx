// components/NewsletterBanner.jsx
"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

// Email schema
const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter an email address")
    .email("Enter a valid email address")
    .max(254, "Email is too long"),
});

export default function NewsletterBanner({ onSubscribe }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsed = emailSchema.safeParse({ email });
    if (!parsed.success) {
      const msg =
        parsed.error.issues?.[0]?.message || "Please enter a valid email.";
      toast.error(msg);
      inputRef.current?.focus();
      return;
    }

    try {
      setStatus("loading");

      if (onSubscribe) {
        await onSubscribe(parsed.data.email);
      } else {
        // demo delay
        await new Promise((r) => setTimeout(r, 800));
      }

      toast.success("🎉 Thanks! You’re subscribed.", {
        style: {
          fontSize: "1.125rem",
          padding: "16px 24px",
          minWidth: "320px",
        },
      });

      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="cs_newsletter_1_wrap">
      <div className="container-fluid">
        <div className="cs_newsletter cs_style_1 cs_accent_bg">
          <div className="cs_newsletter_icon">
            <img src="/images/icons/envlop.png" alt="Envelope icon" />
          </div>

          <h2 className="cs_newsletter_title cs_fs_40 cs_bold mb-0 cs_white_color">
            Subscribe Our Newsletter
          </h2>

          <form
            className="cs_newsletter_form"
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              ref={inputRef}
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email address ..."
              className="cs_newsletter_form_field w-100" // <-- full width
              style={{ width: "100%" }} // <-- force 100%
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              aria-label="Email address"
            />

            <button
              type="submit"
              className="cs_btn cs_style_1 cs_fs_18 cs_medium bg-[#101828] hover:bg-[#101828cc]"
              style={{ backgroundColor: "#101828" }}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
              <svg
                width="20"
                height="10"
                viewBox="0 0 20 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M19.5866 5.69629H0.41235C0.184269 5.69629 0 5.46776 0 5.1849C0 4.90204 0.184269 4.67352 0.41235 4.67352H18.5906L16.0881 1.57004C15.927 1.37028 15.927 1.04587 16.0881 0.846109C16.2492 0.646349 16.5108 0.646349 16.6718 0.846109L19.8792 4.82374C19.9977 4.97076 20.0325 5.1897 19.9681 5.38147C19.9036 5.57164 19.7529 5.69629 19.5866 5.69629Z"
                  fill="currentColor"
                />
                <path
                  d="M16.3435 9.11986C16.2384 9.11986 16.1333 9.08012 16.0538 8.99935C15.8935 8.83909 15.8935 8.57884 16.0538 8.41858L19.2487 5.22371C19.4089 5.06345 19.6692 5.06345 19.8294 5.22371C19.9897 5.38396 19.9897 5.64422 19.8294 5.80448L16.6346 8.99935C16.5538 9.08012 16.4487 9.11986 16.3435 9.11986Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

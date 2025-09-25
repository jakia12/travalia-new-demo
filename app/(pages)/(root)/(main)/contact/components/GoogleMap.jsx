// app/_components/GoogleMap.jsx
"use client";

export default function GoogleMap() {
  return (
    <div className="cs_google_map">
      <iframe
        src="https://www.google.com/maps?q=H.Fasmeeru%20Building%2C%203rd%20Floor%2C%20Boduthakurufaanu%20Magu%2C%20Mal%C3%A9%2C%20Mal%C3%A9%2C%20Maldives&z=17&output=embed
"
        style={{ border: 0, width: "100%", height: "500px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

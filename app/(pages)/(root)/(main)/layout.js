import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../../../globals.css";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Toaster } from "react-hot-toast";
import ClientEffects from "./components/ClientEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Travalio - Your Gateway to the World",
  description:
    "Travalio is your ultimate travel companion, offering personalized itineraries and expert advice.",
  icons: {
    icon: "/images/fav.png",
    shortcut: "/images/fav.png",
    apple: "/images/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* CSS CDNs */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lightgallery@2.7.2/css/lightgallery-bundle.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/odometer.js/0.4.8/odometer-theme-default.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
        />
        <link type="text/css" rel="stylesheet" href="css/lightgallery.css" />

        <link type="text/css" rel="stylesheet" href="css/lg-zoom.css" />
        <link type="text/css" rel="stylesheet" href="css/lg-thumbnail.css" />

        <link
          type="text/css"
          rel="stylesheet"
          href="css/lightgallery-bundle.css"
        />
        {/* optional slick theme */}
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" /> */}
        {/* your local CSS */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <ClientEffects />
        <Footer />
        {/* jQuery first */}
        <Script
          src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"
          strategy="beforeInteractive"
        />

        {/* Plugins that need jQuery */}
        <Script
          src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/lightgallery@2.7.2/lightgallery.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/odometer.js/0.4.8/odometer.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"
          strategy="afterInteractive"
        />
        {/* LightGallery core — pick ONE */}
        {/* <Script src="/js/lightgallery.umd.js" strategy="afterInteractive" /> */}
        <Script src="/js/lightgallery.min.js" strategy="afterInteractive" />

        {/* Plugins */}
        <Script
          src="/js/plugins/lg-thumbnail.umd.js"
          strategy="afterInteractive"
        />
        <Script src="/js/plugins/lg-zoom.umd.js" strategy="afterInteractive" />

        {/* Optional: quick inline init (or do this in a client component) */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              maxWidth: "min(92vw, 390px)", // ⬅️ wider toasts, but not past viewport
              width: "100%",
              whiteSpace: "pre-wrap", // nicer wrapping for long messages
              wordBreak: "break-word",
              fontSize: "17px",
            },
            success: { iconTheme: { primary: "#22c55e", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}

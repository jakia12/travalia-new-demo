"use client";

import Link from "next/link";
// import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.inner}>
        <h1 className={styles.oops} style={{ color: "#000" }}>
          Oops!
        </h1>

        <p className={styles.hint} style={{ marginTop: "30px" }}>
          404 – PAGE NOT FOUND
        </p>
        <p className={styles.copy}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link href="/" className={styles.cta}>
          GO TO HOMEPAGE
        </Link>
      </div>
    </main>
  );
}

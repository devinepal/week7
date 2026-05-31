"use client";
// components/BackToTop.tsx
// Shows a floating ↑ button after 400px scroll; cross-page (root layout)
// Events: scroll (show/hide), click (scroll to top)

import { useEffect } from "react";

export default function BackToTop() {
  useEffect(() => {
    const btn = document.getElementById("back-top-btn");
    if (!btn) return;

    function onScroll() {
      if (window.scrollY > 400) {
        btn!.classList.add("visible");
      } else {
        btn!.classList.remove("visible");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      id="back-top-btn"
      className="back-top"
      onClick={scrollTop}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

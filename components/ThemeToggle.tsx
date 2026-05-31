"use client";
// components/ThemeToggle.tsx
// ─── Feature #1: Dark / Light Theme Toggle ───────────────
// Events : click
// State  : 'light' | 'dark' — persisted in localStorage,
//           applied as data-theme on <html>
// Cross-page: lives in root layout → present on every route

import { useEffect } from "react";

export default function ThemeToggle() {
  // ── On mount: read saved preference or system preference ──
  useEffect(() => {
    const saved   = localStorage.getItem("dn-theme");
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved ?? (sysDark ? "dark" : "light"));
  }, []);

  function applyTheme(theme: string) {
    // 1. Mutate the <html> attribute that all CSS variables read from
    document.documentElement.setAttribute("data-theme", theme);
    // 2. Persist preference
    localStorage.setItem("dn-theme", theme);
    // 3. Sync button label
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    const isDark = theme === "dark";
    btn.setAttribute("aria-pressed", String(isDark));
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    const icon  = btn.querySelector<HTMLElement>(".ti-icon");
    const label = btn.querySelector<HTMLElement>(".ti-label");
    if (icon)  icon.textContent  = isDark ? "☀️" : "🌙";
    if (label) label.textContent = isDark ? "Light" : "Dark";
  }

  function handleClick() {
    const current = document.documentElement.getAttribute("data-theme") ?? "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  return (
    <button
      id="theme-toggle-btn"
      className="theme-btn"
      onClick={handleClick}
      aria-label="Switch to dark mode"
      aria-pressed="false"
    >
      <span className="ti-icon" aria-hidden="true">🌙</span>
      <span className="ti-label">Dark</span>
    </button>
  );
}

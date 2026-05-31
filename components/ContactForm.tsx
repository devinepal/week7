"use client";
// components/ContactForm.tsx
// ─── Feature #2: Contact Form with Inline Validation ────────
// Events : submit (full validate), blur (per-field), input (live fix)
// State  : per-field error text + submitted flag — stored in DOM
//           (classList: 'error' | 'ok', aria-invalid, .show on spans)

import { useRef, useEffect } from "react";

const FIELDS = ["name", "email", "message"] as const;

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const localForm = form;

    // ── helpers ─────────────────────────────────────────────
    const get = (name: string) =>
      localForm.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);

    function showErr(name: string, msg: string) {
      const field = get(name);
      const span  = localForm.querySelector<HTMLElement>(`#err-${name}`);
      if (!field || !span) return;
      field.classList.add("error"); field.classList.remove("ok");
      field.setAttribute("aria-invalid", "true");
      span.textContent = msg;
      span.classList.add("show");
    }

    function clearErr(name: string) {
      const field = get(name);
      const span  = localForm.querySelector<HTMLElement>(`#err-${name}`);
      if (!field || !span) return;
      field.classList.remove("error"); field.classList.add("ok");
      field.setAttribute("aria-invalid", "false");
      span.classList.remove("show");
    }

    function validateOne(name: string): boolean {
      const val = get(name)?.value.trim() ?? "";
      if (name === "name") {
        if (!val)          { showErr(name, "⚠ Name is required."); return false; }
        if (val.length < 2){ showErr(name, "⚠ At least 2 characters."); return false; }
      }
      if (name === "email") {
        if (!val) { showErr(name, "⚠ Email is required."); return false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          showErr(name, "⚠ Enter a valid email address."); return false;
        }
      }
      if (name === "message") {
        if (!val)           { showErr(name, "⚠ Message is required."); return false; }
        if (val.length < 20){ showErr(name, "⚠ At least 20 characters."); return false; }
      }
      clearErr(name);
      return true;
    }

    // ── per-field listeners ──────────────────────────────────
    FIELDS.forEach((name) => {
      const field = get(name);
      field?.addEventListener("blur",  () => validateOne(name));
      field?.addEventListener("input", () => {
        if (field.classList.contains("error")) validateOne(name);
      });
    });

    // ── submit ───────────────────────────────────────────────
    function onSubmit(e: Event) {
      e.preventDefault();
      const allOk = FIELDS.map((n) => validateOne(n)).every(Boolean);
      if (!allOk) {
        const first = localForm.querySelector<HTMLElement>("[aria-invalid='true']");
        first?.focus();
        return;
      }
      // Success (no backend yet — Week 6)
      const banner = localForm.querySelector<HTMLElement>("#success-banner");
      if (banner) { banner.classList.add("show"); banner.setAttribute("role", "alert"); }
      localForm.reset();
      FIELDS.forEach((n) => { get(n)?.classList.remove("ok", "error"); });
    }

    localForm.addEventListener("submit", onSubmit);
    return () => localForm.removeEventListener("submit", onSubmit);
  }, []);

  return (
    <form ref={formRef} noValidate aria-label="Contact form">

      <div className="form-group">
        <label htmlFor="f-name">Name <span aria-hidden="true">*</span></label>
        <input
          type="text" id="f-name" name="name"
          autoComplete="name" required
          aria-required="true" aria-describedby="err-name" aria-invalid="false"
          placeholder="Devi Nepal"
        />
        <span id="err-name" className="field-err" aria-live="polite" />
      </div>

      <div className="form-group">
        <label htmlFor="f-email">Email <span aria-hidden="true">*</span></label>
        <input
          type="email" id="f-email" name="email"
          autoComplete="email" required
          aria-required="true" aria-describedby="err-email" aria-invalid="false"
          placeholder="you@example.com"
        />
        <span id="err-email" className="field-err" aria-live="polite" />
      </div>

      <div className="form-group">
        <label htmlFor="f-message">Message <span aria-hidden="true">*</span></label>
        <textarea
          id="f-message" name="message" rows={6} required
          aria-required="true" aria-describedby="err-message" aria-invalid="false"
          placeholder="Your message (at least 20 characters)…"
        />
        <span id="err-message" className="field-err" aria-live="polite" />
      </div>

      <button type="submit" className="btn-primary">Submit</button>

      <div id="success-banner" className="success-msg" aria-live="polite">
        ✅ Message sent! I'll get back to you within 24–48 hours.
      </div>
    </form>
  );
}

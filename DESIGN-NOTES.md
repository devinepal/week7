# DESIGN-NOTES.md
**Project:** IT516 · Web Information Systems Portfolio  
**Student:** Devi Nepal  
**Semester:** Spring 2026

---

## Week 2: Design Foundations

### Color Tokens

| Token          | Light         | Dark          | Purpose              |
|----------------|---------------|---------------|----------------------|
| `--bg`         | `#f7f5f2`     | `#0f0e0d`     | Page background      |
| `--surface`    | `#ffffff`     | `#1c1917`     | Cards & panels       |
| `--text`       | `#1c1917`     | `#f5f0eb`     | Primary text         |
| `--text-2`     | `#57534e`     | `#b5aea6`     | Secondary / muted    |
| `--accent`     | `#0d5c3a`     | `#4ade80`     | Brand / interactive  |
| `--nav-bg`     | `#1c1917`     | `#0a0908`     | Header background    |

### Typography
- **Display:** DM Serif Display — headings and hero text; gives editorial warmth  
- **Body:** DM Sans — clean, humanist, very readable at small sizes  
- **Mono:** DM Mono — tags, labels, timestamps; adds technical credibility  

### Breakpoints
- `≤ 768px` — hamburger menu replaces desktop nav; grid goes single-column  
- `≤ 480px` — hero padding reduced; project/skill grids go 1-column  

---

## Week 6: Interactive Features

### Feature #1 — Theme Toggle (Dark / Light Mode)

**What it does:**  
A button in the persistent site header toggles between light and dark color
themes. The preference is saved to `localStorage` so it persists across page
navigation and browser restarts. On first visit, the site reads
`window.matchMedia('(prefers-color-scheme: dark)')` to honor the system default.

**Why it matters:**  
Dark mode reduces eye strain in low-light environments and respects OS-level
accessibility preferences. Not implementing it means some users will leave
immediately.

**Events involved:**  
- `click` on the `<button>` — reads `data-theme` from `<html>`, flips it, saves  
- `useEffect` on mount — reads `localStorage` / `matchMedia`, sets initial state  

**State tracked:**  
`'light' | 'dark'` string — persisted in `localStorage` under key `"dn-theme"`;
reflected as `data-theme` attribute on `<html>` which all CSS custom properties
read from.

**Component:** `components/ThemeToggle.tsx` — `"use client"`  
**Cross-page:** ✅ Lives in `app/layout.tsx` — present on Home, About, Contact

---

### Feature #2 — Contact Form with Inline Validation

**What it does:**  
A three-field form (Name, Email, Message) validates each field on `blur`.
Inline error messages appear below the field in red; fields turn green border
when valid. Submitting an invalid form focuses the first error field. A valid
submission shows a green success banner via `aria-live="polite"` and resets
the form. No backend — simulated success.

**Why it matters:**  
Forms without validation send bad data to the server and frustrate users with
vague error pages. Inline feedback at the field level catches mistakes
immediately.

**Events involved:**  
- `submit` on `<form>` with `event.preventDefault()` — full validation pass  
- `blur` per field — validates single field on focus-out  
- `input` per field — clears error live while user corrects the value  

**State tracked:**  
Per-field validity reflected entirely in the DOM:
`classList` (`"error"` / `"ok"`), `aria-invalid` attribute,
and `.show` on error `<span>` elements.
A `role="alert"` is added to the success banner on submit to trigger
screen-reader announcement.

**Component:** `components/ContactForm.tsx` — `"use client"`

---

### Additional Interactive Element — Back to Top

**What it does:**  
A floating `↑` button appears after the user scrolls 400 px down the page.
Clicking it smoothly scrolls back to the top. Present on all pages.

**Events involved:** `scroll` (passive, to show/hide), `click` (to scroll)  
**Component:** `components/BackToTop.tsx` — `"use client"`  
**Cross-page:** ✅ Lives in `app/layout.tsx`

---

### Server / Client Component Boundary

| File                          | Type   | Reason                                          |
|-------------------------------|--------|-------------------------------------------------|
| `app/layout.tsx`              | Server | Static shell; imports Client components only    |
| `app/page.tsx`                | Server | No interactivity; ships zero JS                 |
| `app/about/page.tsx`          | Server | Static content; no event handlers needed        |
| `app/contact/page.tsx`        | Server | Shell; delegates form to ContactForm            |
| `components/ThemeToggle.tsx`  | Client | `localStorage`, DOM attribute mutation on click |
| `components/NavBar.tsx`       | Client | `usePathname`, classList for hamburger state    |
| `components/ContactForm.tsx`  | Client | `addEventListener`, DOM classList validation    |
| `components/BackToTop.tsx`    | Client | `scroll` event listener, `window.scrollTo`      |

---

## Week 7: Async JavaScript & Loading States

### Data Source

**API:** GitHub REST API (public — no auth key, no CORS restrictions)

| Endpoint | URL |
|---|---|
| User profile | `https://api.github.com/users/devinepal` |
| Repositories | `https://api.github.com/users/devinepal/repos?sort=pushed&per_page=6` |

**Why GitHub API?** No API key required, CORS-open, returns rich JSON directly relevant to a developer portfolio. Demonstrates async patterns with real, meaningful data.

### New Route

`/github` → `app/github/page.tsx` (Server Component shell)  
Interactive panel → `components/GitHubPanel.tsx` (`"use client"`)

### Three States

| State   | UI                                               | ARIA |
|---------|--------------------------------------------------|------|
| Loading | Skeleton screen — 4 pulsing placeholder shapes   | `aria-busy="true"` on wrapper |
| Error   | Warning panel with message + retry button        | `role="alert"`, `aria-live="assertive"` |
| Success | Profile card, 3 stat counters, 6 repo cards      | `aria-live="polite"` on repo list |

### Async Pattern

Both API requests fire in **parallel** via `Promise.all([fetch(USER_URL), fetch(REPOS_URL)])`.  
`try/catch/finally` ensures `setLoading(false)` always runs — prevents a stuck spinner even on failure.  
`fetch()` does **not** throw on HTTP errors — `.ok` is checked explicitly.

### Refresh Control

Re-fetch button sets `aria-busy={true}` and `disabled` during the request to prevent double-click race conditions. The spinning `↻` icon gives visual feedback.

### Motion Decisions

| Animation | Type | Reason |
|---|---|---|
| Skeleton pulse | Functional | Signals "data is coming" — reduces perceived load time |
| Repo card hover lift | Functional | Confirms these are clickable links |
| Refresh icon spin | Functional | Shows the button is actively working |
| Theme color transition | Borderline | Fast (220ms) — prevents jarring flash |

### Accessibility Additions (Week 7)

- `prefers-reduced-motion` media query added to `globals.css` — collapses all animations to 0.01ms
- `aria-busy` on skeleton wrapper and refresh button
- `role="alert"` + `aria-live="assertive"` on error panel
- `aria-live="polite"` on repo list and timestamp

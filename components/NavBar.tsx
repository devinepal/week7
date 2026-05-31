"use client";
// components/NavBar.tsx
// ─── Hamburger mobile navigation (cross-page, root layout) ──
// Events : click (toggle), keydown Escape (close)
// State  : open boolean — reflected via aria-expanded + classList

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const NAV_LINKS = [
  { href: "/",          label: "Home"     },
  { href: "/about",     label: "About"    },
  { href: "/#projects", label: "Projects" },
  { href: "/github",    label: "GitHub"   },
  { href: "/contact",   label: "Contact"  },
];

export default function NavBar() {
  const pathname  = usePathname();
  const menuRef   = useRef<HTMLUListElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Close on route change
  useEffect(() => { close(); }, [pathname]);

  // Escape key closes menu
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        burgerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function close() {
    menuRef.current?.classList.remove("open");
    burgerRef.current?.setAttribute("aria-expanded", "false");
  }

  function toggle() {
    const isOpen = menuRef.current?.classList.contains("open");
    if (isOpen) {
      close();
    } else {
      menuRef.current?.classList.add("open");
      burgerRef.current?.setAttribute("aria-expanded", "true");
    }
  }

  return (
    <nav aria-label="Primary" style={{ display: "contents" }}>
      {/* Link list — hidden on mobile until burger clicked */}
      <ul className="nav-links" id="main-nav" ref={menuRef} role="list">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={close}
              {...(pathname === href || (href !== "/" && pathname.startsWith(href))
                ? { "data-active": "" }
                : {})}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger — only visible on mobile */}
      <button
        ref={burgerRef}
        className="hamburger"
        aria-controls="main-nav"
        aria-expanded="false"
        aria-label="Toggle navigation menu"
        onClick={toggle}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </nav>
  );
}

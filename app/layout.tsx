import type { Metadata } from 'next'
import './globals.css'
import NavBar    from '@/components/NavBar'
import ThemeToggle from '@/components/ThemeToggle'
import BackToTop  from '@/components/BackToTop'

export const metadata: Metadata = {
  title: 'Devi Nepal — Developer',
  description: 'Full-stack developer building thoughtful, accessible web experiences.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* ── HEADER (server shell; interactive pieces are Client Components) ── */}
        <header className="site-header">
          <div className="header-inner">
            <a href="/" className="site-logo">Devi Nepal</a>

            {/* Desktop nav + hamburger — Client Component */}
            <NavBar />

            {/* Theme toggle — Client Component */}
            <ThemeToggle />
          </div>
        </header>

        {/* ── MAIN ── */}
        <main>{children}</main>

        {/* ── BACK-TO-TOP (cross-page, Client Component) ── */}
        <BackToTop />

        {/* ── FOOTER ── */}
        <footer className="site-footer">
          <p>© 2026 Devi Nepal · Built with Next.js &amp; React</p>
          <p>IT516 · Web Information Systems · Spring 2026</p>
        </footer>
      </body>
    </html>
  )
}

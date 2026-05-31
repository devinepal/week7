// app/about/page.tsx — Server Component
import type { Metadata } from 'next'
import Link from 'next/link'
import deviImg from "@/app/devi.jpg"
export const metadata: Metadata = {
  title: 'About | Devi Nepal — Developer',
  description: 'Learn more about Devi Nepal — full-stack developer, IT516 student, and aspiring software engineer.',
}

const skills = [
  {
    area: 'Front End',
    items: ['Next.js', 'React', 'TypeScript', 'CSS / Tailwind', 'Responsive Design', 'Accessibility (WCAG)'],
  },
  {
    area: 'Back End',
    items: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'MongoDB'],
  },
  {
    area: 'Tools & Workflow',
    items: ['Git & GitHub', 'Vercel', 'Figma', 'VS Code', 'Linux / Bash'],
  },
  {
    area: 'Currently Learning',
    items: ['React Server Components', 'TypeScript generics', 'Database design', 'Testing (Vitest, Playwright)'],
  },
]

const timeline = [
  { year: '2026', title: 'IT516 — Web Information Systems', org: 'Online · Spring 2026', desc: 'Building full-stack web apps with Next.js, React, and modern JavaScript.' },
  { year: '2025', title: 'First Next.js Project Deployed', org: 'Personal project', desc: 'Launched a personal portfolio on Vercel; first experience with the App Router and server components.' },
  { year: '2024', title: 'Started Web Development Journey', org: 'Self-study', desc: 'Learned HTML, CSS, and vanilla JavaScript through online courses and MDN documentation.' },
  { year: '2023', title: 'B.S. — Information Technology', org: 'California State University', desc: 'Graduated with a focus on web systems and database management.' },
]

export default function AboutPage() {
  return (
    <>
      {/* ── BANNER ────────────────────────────────────────── */}
      <div className="page-banner">
        <div className="page-banner-inner">
          <h1>About Me</h1>
          <p>Developer · Student · Builder of things on the web</p>
        </div>
      </div>

      {/* ── HERO SPLIT ────────────────────────────────────── */}
      <div className="about-hero">

        {/* Left — bio */}
        <div>

          <img
            src={deviImg.src}
            alt="Devi Nepal — profile photo"
            width={180}
            height={180}
            className="about-avatar-img"
          />
          <span className="section-label">Who I am</span>
          <h2 style={{ marginBottom: '1rem' }}>Hi, I&apos;m Devi Nepal</h2>
          <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
            I am a full-stack developer and Information Technology student based in Lakewood,
            California. I build thoughtful, accessible web experiences — the kind that work
            for everyone, not just mouse users on desktop browsers.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            My journey into web development started with a curiosity about how the internet
            works at a technical level. That curiosity turned into a passion for crafting
            interfaces that are both functional and delightful to use. I am particularly
            drawn to the intersection of design and engineering — the place where a
            well-considered API and a thoughtfully designed UI meet.
          </p>
          <p style={{ marginBottom: '1.75rem' }}>
            When I am not coding, I am exploring hiking trails in the LA area, experimenting
            with photography, and reading about the history of computing.
          </p>
          <Link href="/contact" className="hero-cta">Get in touch →</Link>
        </div>

        {/* Right — info cards */}
        <aside className="about-sidebar">
          <div className="info-card">
            <h4>At a Glance</h4>
            <div className="info-row">
              <span className="info-label">Location</span>
              <span className="info-val">Lakewood, CA</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-val">
                <a href="mailto:devinepal1976@gmail.com" style={{ fontSize: '.85rem' }}>
                  devinepal1976@gmail.com
                </a>
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone</span>
              <span className="info-val">
                <a href="tel:5629814178" style={{ fontSize: '.85rem' }}>(562) 981-4178</a>
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Course</span>
              <span className="info-val">IT516 · Spring 2026</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="info-val" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                Open to roles
              </span>
            </div>
          </div>

          <div className="info-card">
            <h4>GitHub</h4>
            <a href="https://github.com/devinepal" target="_blank" rel="noopener noreferrer"
               style={{ fontSize: '.9rem' }}>
              github.com/devinepal →
            </a>
          </div>

          <div className="info-card">
            <h4>Current Focus</h4>
            <p style={{ fontSize: '.875rem' }}>
              Mastering the React/Next.js ecosystem — server components, the App Router,
              and building UIs that meet WCAG 2.2 AA standards.
            </p>
          </div>
        </aside>
      </div>

      {/* ── SKILLS ────────────────────────────────────────── */}
      <section className="section-alt">
        <div className="wrap">
          <span className="section-label">Capabilities</span>
          <h2>Skills &amp; Technologies</h2>
          <div className="skill-grid">
            {skills.map((s) => (
              <div className="skill-card" key={s.area}>
                <h3>{s.area}</h3>
                <div className="skill-tags">
                  {s.items.map((item) => (
                    <span className="tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────── */}
      <section className="section">
        <span className="section-label">History</span>
        <h2>Education &amp; Milestones</h2>
        <div className="timeline">
          {timeline.map((t) => (
            <div className="tl-item" key={t.title}>
              <span className="tl-year">{t.year}</span>
              <div>
                <h4>{t.title}</h4>
                <p style={{ fontSize: '.8rem', color: 'var(--accent)', marginBottom: '.3rem', fontFamily: 'var(--font-mono)' }}>
                  {t.org}
                </p>
                <p style={{ fontSize: '.9rem' }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <section className="section-alt">
        <div className="wrap" style={{ paddingTop: '3rem', paddingBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '.75rem' }}>Want to work together?</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            I&apos;m open to graduate roles, internships, and freelance projects.
          </p>
          <Link href="/contact" className="hero-cta">Send me a message →</Link>
        </div>
      </section>
    </>
  )
}

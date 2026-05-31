// app/page.tsx — Server Component
import Link from 'next/link'

const projects = [
  {
    title: 'Personal Portfolio',
    desc:  'Portfolio website built with Next.js',
    tags:  ['Next.js', 'React', 'CSS'],
    href:  'https://github.com/devinepal/Week-2-project',
  },
  {
    title: 'Simple Portfolio',
    desc:  'A simple portfolio website with theme toggle feature built using React and CSS.',
    tags:  ['React', 'Node.js'],
    href:  'https://github.com/devinepal/week3',
  },
  {
    title: 'Learning Next.js',
    desc:  'A simple portfolio website with theme toggle, back-to-top feature built using React and CSS.',
    tags:  ['React', 'Node.js'],
    href:  'https://github.com/devinepal/devinepal.github.io',
  },
]

const faqs = [
  {
    q: 'What technologies do you specialise in?',
    a: 'I specialise in JavaScript and TypeScript across the full stack — Next.js and React on the front end, Node.js on the server, and PostgreSQL or MongoDB for data. I am also experienced with CSS, Tailwind, and accessibility-first design.',
  },
  {
    q: 'Are you available for freelance projects?',
    a: 'I am currently focused on completing my degree and open to part-time freelance or contract work that fits my schedule. Feel free to reach out via the Contact page and we can discuss your project.',
  },
  {
    q: 'What does your development process look like?',
    a: 'I start with a discovery conversation to understand goals and constraints, then move through wireframing, iterative development with regular check-ins, and finally deployment and handoff documentation. Accessibility and performance are baked in from day one, not bolted on at the end.',
  },
  {
    q: 'How do I get in touch?',
    a: 'The fastest way is the Contact page on this site. You can also email me directly at devinepal1976@gmail.com or call (562) 981-4178. I aim to reply within one business day.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" id="home">
        <span className="hero-eyebrow">Full-stack Developer · Spring 2026</span>
        <h1>Hi, I&apos;m <em>Devi</em> 👋</h1>
        <p className="hero-lead">
          Full-stack developer building thoughtful, accessible web experiences.
          Open to graduate roles in 2027.
        </p>
        <Link href="/contact" className="hero-cta">Get in touch →</Link>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────── */}
      <section id="projects" className="section">
        <span className="section-label">Work</span>
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((p) => (
            <article className="project-card" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tag-list">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              <a href={p.href} className="card-link" target="_blank" rel="noopener noreferrer">
                View project →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="section-alt">
        <div className="wrap">
          <span className="section-label">Questions</span>
          <h2>FAQ</h2>
          <div className="faq-list">
            {faqs.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <div className="faq-body">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

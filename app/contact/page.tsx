// app/contact/page.tsx — Server Component shell
import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Devi Nepal — Developer',
}

export default function ContactPage() {
  return (
    <>
      <div className="page-banner">
        <div className="page-banner-inner">
          <h1>Get in touch</h1>
          <p>I'd love to hear from you — projects, questions, or just a hello.</p>
        </div>
      </div>

      <div className="contact-wrap">
        {/* ── LEFT: form ── */}
        <div>
          <ContactForm />
        </div>

        {/* ── RIGHT: info ── */}
        <aside>
          <div className="info-card" style={{ marginBottom: '1rem' }}>
            <h4 style={{
              fontFamily: 'var(--font-mono)', fontSize: '.75rem',
              letterSpacing: '.1em', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: '.75rem'
            }}>Direct contact</h4>
            <div className="info-row">
              <span className="info-label">Email</span>
              <a href="mailto:devinepal1976@gmail.com" className="info-val" style={{ fontSize: '.85rem' }}>
                devinepal1976@gmail.com
              </a>
            </div>
            <div className="info-row" style={{ marginTop: '.4rem' }}>
              <span className="info-label">Phone</span>
              <a href="tel:5629814178" className="info-val" style={{ fontSize: '.85rem' }}>
                (562) 981-4178
              </a>
            </div>
          </div>

          <div className="info-card">
            <h4 style={{
              fontFamily: 'var(--font-mono)', fontSize: '.75rem',
              letterSpacing: '.1em', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: '.5rem'
            }}>Response time</h4>
            <p style={{ fontSize: '.875rem' }}>
              I typically reply within 24–48 hours on school days.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

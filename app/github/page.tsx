// app/github/page.tsx — Server Component shell
// Week 7: Async JavaScript & Loading States
import type { Metadata } from 'next'
import GitHubPanel from '@/components/GitHubPanel'

export const metadata: Metadata = {
  title: 'GitHub Activity | Devi Nepal — Developer',
  description: 'Live GitHub profile and repository data fetched asynchronously with loading, error, and success states.',
}

export default function GitHubPage() {
  return (
    <>
      <div className="page-banner">
        <div className="page-banner-inner">
          <h1>GitHub Activity</h1>
          <p>Live data — fetched async with loading, error &amp; success states</p>
        </div>
      </div>

      <section className="section">
        <GitHubPanel />
      </section>
    </>
  )
}

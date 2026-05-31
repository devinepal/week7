"use client";
// components/GitHubPanel.tsx
// ─── Week 7: Async Fetch · Three-State UI ──────────────────
//
// Data source : GitHub REST API — public, no key, no CORS issues
//   Profile   → https://api.github.com/users/devinepal
//   Repos     → https://api.github.com/users/devinepal/repos?sort=pushed&per_page=6
//
// States      : loading (skeleton screen) · error (graceful UI + retry) · success
// Extras      : Refresh button with aria-busy, prefers-reduced-motion via CSS,
//               aria-live, role="alert", parallel Promise.all() fetch

import { useState, useEffect } from 'react'

// ── Types ──────────────────────────────────────────────────
interface GitHubUser {
  login:        string
  name:         string | null
  avatar_url:   string
  bio:          string | null
  location:     string | null
  public_repos: number
  followers:    number
  following:    number
  html_url:     string
}

interface GitHubRepo {
  id:               number
  name:             string
  description:      string | null
  html_url:         string
  stargazers_count: number
  forks_count:      number
  language:         string | null
  pushed_at:        string
}

interface GHData { user: GitHubUser; repos: GitHubRepo[] }

// ── Constants ───────────────────────────────────────────────
const USERNAME  = 'devinepal'
const USER_URL  = `https://api.github.com/users/${USERNAME}`
const REPOS_URL = `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=6`

// ── Helper ──────────────────────────────────────────────────
function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30)  return `${days}d ago`
  const mo = Math.floor(days / 30)
  return mo < 12 ? `${mo}mo ago` : `${Math.floor(mo / 12)}yr ago`
}

// ── Skeleton (loading state) ─────────────────────────────────
function Skeleton() {
  return (
    <div className="gh-skeleton" aria-busy="true" aria-label="Loading GitHub data…">
      <div className="gh-profile-skeleton">
        <div className="skel skel-avatar" />
        <div className="gh-profile-text-skeleton">
          <div className="skel skel-h1" />
          <div className="skel skel-h2" />
          <div className="skel skel-line" />
          <div className="skel skel-line skel-short" />
        </div>
      </div>
      <div className="gh-stats-skeleton">
        {[1, 2, 3].map(i => <div key={i} className="skel skel-stat" />)}
      </div>
      <div className="gh-repos-skeleton">
        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skel skel-card" />)}
      </div>
    </div>
  )
}

// ── Error panel ──────────────────────────────────────────────
function ErrorPanel({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="gh-error" role="alert" aria-live="assertive">
      <div className="gh-error-icon" aria-hidden="true">⚠</div>
      <h3>Couldn&apos;t load GitHub data</h3>
      <p className="gh-error-msg">{message}</p>
      <p>This may be a network issue or a GitHub API rate limit. Try again in a moment.</p>
      <button className="btn-primary gh-retry-btn" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────
export default function GitHubPanel() {
  const [data,       setData]       = useState<GHData | null>(null)
  const [error,      setError]      = useState<string | null>(null)
  const [loading,    setLoading]    = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Shared fetch logic — used by initial load AND the refresh button
  async function fetchGitHub(isRefresh = false) {
    isRefresh ? setRefreshing(true) : setLoading(true)
    setError(null)

    try {
      // Fire both requests in parallel — total wait = slowest of the two
      const [userRes, reposRes] = await Promise.all([
        fetch(USER_URL),
        fetch(REPOS_URL),
      ])

      // fetch() does NOT throw on 4xx/5xx — must check .ok manually
      if (!userRes.ok)  throw new Error(`GitHub API: HTTP ${userRes.status}`)
      if (!reposRes.ok) throw new Error(`GitHub API: HTTP ${reposRes.status}`)

      const [user, repos]: [GitHubUser, GitHubRepo[]] = await Promise.all([
        userRes.json(),
        reposRes.json(),
      ])

      setData({ user, repos })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      // Always exits loading — even on failure — prevents a stuck spinner
      isRefresh ? setRefreshing(false) : setLoading(false)
    }
  }

  // Initial load on mount
  useEffect(() => {
    fetchGitHub(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── LOADING STATE ─────────────────────────────────────────
  if (loading) return <Skeleton />

  // ── ERROR STATE ───────────────────────────────────────────
  if (error) return <ErrorPanel message={error} onRetry={() => fetchGitHub(false)} />

  // ── SUCCESS STATE ─────────────────────────────────────────
  const { user, repos } = data!

  return (
    <div className="gh-panel">

      {/* Profile card */}
      <div className="gh-profile">
        <img
          src={user.avatar_url}
          alt={`${user.login} GitHub avatar`}
          className="gh-avatar"
          width={88}
          height={88}
        />
        <div className="gh-profile-info">
          <h2 className="gh-name">{user.name ?? user.login}</h2>
          <a
            href={user.html_url}
            className="gh-login"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{user.login}
          </a>
          {user.bio      && <p className="gh-bio">{user.bio}</p>}
          {user.location && (
            <p className="gh-location">
              <span aria-hidden="true">📍</span> {user.location}
            </p>
          )}
        </div>

        {/* Refresh button — disabled + aria-busy during re-fetch */}
        <button
          className="gh-refresh-btn"
          onClick={() => fetchGitHub(true)}
          disabled={refreshing}
          aria-busy={refreshing}
          aria-label="Refresh GitHub data"
        >
          <span
            className={`gh-refresh-icon${refreshing ? ' spinning' : ''}`}
            aria-hidden="true"
          >
            ↻
          </span>
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {/* Stats row */}
      <div className="gh-stats" role="list" aria-label="GitHub statistics">
        {[
          { label: 'Public repos', value: user.public_repos },
          { label: 'Followers',    value: user.followers    },
          { label: 'Following',    value: user.following    },
        ].map(({ label, value }) => (
          <div className="gh-stat" role="listitem" key={label}>
            <span className="gh-stat-value">{value}</span>
            <span className="gh-stat-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Repo grid — aria-live so screen readers announce after refresh */}
      <div className="gh-repos-header">
        <span className="section-label">Repositories</span>
        <h3>Recent pushes</h3>
      </div>

      <div
        className="gh-repos"
        aria-live="polite"
        aria-label="GitHub repositories"
      >
        {repos.map(repo => (
          <a
            key={repo.id}
            href={repo.html_url}
            className="gh-repo-card"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${repo.name} — ${repo.description ?? 'No description'}`}
          >
            <div className="gh-repo-top">
              <span className="gh-repo-name">{repo.name}</span>
              {repo.language && (
                <span className="gh-lang">{repo.language}</span>
              )}
            </div>
            {repo.description && (
              <p className="gh-repo-desc">{repo.description}</p>
            )}
            <div className="gh-repo-meta">
              <span title="Stars">⭐ {repo.stargazers_count}</span>
              <span title="Forks">🍴 {repo.forks_count}</span>
              <span className="gh-repo-time">
                pushed {timeAgo(repo.pushed_at)}
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="gh-timestamp" aria-live="polite">
        Last fetched at {new Date().toLocaleTimeString()}
      </p>
    </div>
  )
}

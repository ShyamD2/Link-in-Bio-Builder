import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api/client'
import type { PublicProfileResponse, PublicLink } from '../types'
import { PublicProfile } from '../components/PublicProfile'

export default function PublicPage() {
  const { username } = useParams<{ username: string }>()
  const [data, setData] = useState<PublicProfileResponse | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found'>('loading')

  useEffect(() => {
    if (!username) return
    setStatus('loading')
    api
      .getPublicProfile(username)
      .then((res) => {
        setData(res)
        setStatus('ready')
      })
      .catch(() => setStatus('not-found'))
  }, [username])

  const handleLinkClick = (link: PublicLink) => {
    api.registerClick(link.id).catch(() => {
      // Click tracking is best-effort; navigation should never be blocked by it.
    })
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist dark:bg-graphite">
        <p className="font-mono text-sm text-graphite/50 dark:text-mist/50">Loading…</p>
      </div>
    )
  }

  if (status === 'not-found' || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-mist px-6 text-center dark:bg-graphite">
        <p className="font-display text-lg font-semibold text-graphite dark:text-mist">Page not found</p>
        <p className="text-sm text-graphite/50 dark:text-mist/50">
          There's no bio page at <span className="font-mono">/u/{username}</span>.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PublicProfile profile={data.profile} links={data.links} onLinkClick={handleLinkClick} />
    </div>
  )
}

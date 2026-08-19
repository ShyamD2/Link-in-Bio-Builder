import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { api } from '../api/client'
import type { LinkItem, Profile } from '../types'
import { ProfileEditor } from '../components/ProfileEditor'
import { ThemePicker } from '../components/ThemePicker'
import { LinkList } from '../components/LinkList'
import { PhonePreview } from '../components/PhonePreview'

type SaveState = 'idle' | 'saving' | 'saved'

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [links, setLinks] = useState<LinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [copied, setCopied] = useState(false)

  const didLoad = useRef(false)
  const saveTimer = useRef<number | null>(null)

  useEffect(() => {
    Promise.all([api.getProfile(), api.getLinks()])
      .then(([p, l]) => {
        setProfile(p)
        setLinks(l)
      })
      .finally(() => {
        setLoading(false)
        // Mark load complete on next tick so the debounce effect below
        // doesn't fire a save immediately after the initial fetch.
        setTimeout(() => {
          didLoad.current = true
        }, 0)
      })
  }, [])

  // Debounced autosave whenever the profile changes.
  useEffect(() => {
    if (!didLoad.current || !profile) return
    setSaveState('saving')
    if (saveTimer.current) window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(() => {
      api.updateProfile(profile).then(() => {
        setSaveState('saved')
        window.setTimeout(() => setSaveState('idle'), 1500)
      })
    }, 500)
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile])

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updates } : prev))
  }

  const updateTheme = (updates: Partial<Profile['theme']>) => {
    setProfile((prev) => (prev ? { ...prev, theme: { ...prev.theme, ...updates } } : prev))
  }

  const linkSaveTimers = useRef<Record<string, number>>({})

  const changeLink = (id: string, updates: Partial<LinkItem>) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)))
    if (linkSaveTimers.current[id]) window.clearTimeout(linkSaveTimers.current[id])
    linkSaveTimers.current[id] = window.setTimeout(() => {
      api.updateLink(id, updates)
    }, 500)
  }

  const addLink = async () => {
    const created = await api.createLink({ title: 'New link', url: 'https://', icon: '🔗' })
    setLinks((prev) => [...prev, created])
  }

  const deleteLink = async (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id))
    await api.deleteLink(id)
  }

  const reorderLinks = async (fromIndex: number, toIndex: number) => {
    const sorted = [...links].sort((a, b) => a.order - b.order)
    if (toIndex < 0 || toIndex >= sorted.length) return
    const [moved] = sorted.splice(fromIndex, 1)
    sorted.splice(toIndex, 0, moved)
    const withOrder = sorted.map((l, i) => ({ ...l, order: i }))
    setLinks(withOrder)
    await api.reorderLinks(withOrder.map((l) => l.id))
  }

  const publicUrl = profile ? `${window.location.origin}/u/${profile.username}` : ''

  const copyLink = async () => {
    if (!publicUrl) return
    await navigator.clipboard.writeText(publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist dark:bg-graphite">
        <p className="font-mono text-sm text-graphite/50 dark:text-mist/50">Loading your page…</p>
      </div>
    )
  }

  const previewLinks = [...links]
    .filter((l) => l.active)
    .sort((a, b) => a.order - b.order)
    .map(({ id, title, url, icon }) => ({ id, title, url, icon }))

  return (
    <div className="min-h-screen bg-mist dark:bg-graphite">
      <header className="sticky top-0 z-20 border-b border-mist-line bg-mist/90 backdrop-blur dark:border-graphite-line dark:bg-graphite/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal text-xs font-bold text-white">
              B
            </span>
            <span className="font-display text-sm font-semibold text-graphite dark:text-mist">Bioline</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[11px] text-graphite/40 dark:text-mist/40 sm:inline">
              {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : ''}
            </span>
            <button
              type="button"
              onClick={copyLink}
              className="rounded-full border border-mist-line px-3.5 py-1.5 text-xs font-medium text-graphite/70 transition hover:border-signal hover:text-signal dark:border-graphite-line dark:text-mist/70"
            >
              {copied ? 'Copied!' : 'Copy link'}
            </button>
            <RouterLink
              to={`/u/${profile.username}`}
              target="_blank"
              className="rounded-full bg-signal px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-signal-dim"
            >
              View page ↗
            </RouterLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <ProfileEditor profile={profile} onChange={updateProfile} />
            <ThemePicker theme={profile.theme} onChange={updateTheme} />
            <LinkList
              links={links}
              onAdd={addLink}
              onChange={changeLink}
              onDelete={deleteLink}
              onReorder={reorderLinks}
            />
          </div>

          <div className="hidden justify-center lg:flex">
            <PhonePreview profile={profile} links={previewLinks} />
          </div>
        </div>

        <div className="mt-8 flex justify-center lg:hidden">
          <PhonePreview profile={profile} links={previewLinks} />
        </div>
      </main>
    </div>
  )
}

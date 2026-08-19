import type { Profile, SocialLink } from '../types'

interface ProfileEditorProps {
  profile: Profile
  onChange: (updates: Partial<Profile>) => void
}

const SOCIAL_PLATFORM_OPTIONS = [
  'instagram',
  'youtube',
  'tiktok',
  'twitter',
  'linkedin',
  'website',
  'email',
]

export function ProfileEditor({ profile, onChange }: ProfileEditorProps) {
  const updateSocial = (index: number, updates: Partial<SocialLink>) => {
    const next = profile.socialLinks.map((s, i) => (i === index ? { ...s, ...updates } : s))
    onChange({ socialLinks: next })
  }

  const addSocial = () => {
    onChange({ socialLinks: [...profile.socialLinks, { platform: 'website', url: 'https://' }] })
  }

  const removeSocial = (index: number) => {
    onChange({ socialLinks: profile.socialLinks.filter((_, i) => i !== index) })
  }

  return (
    <section className="rounded-3xl border border-mist-line bg-mist-soft p-5 shadow-card dark:border-graphite-line dark:bg-graphite-soft sm:p-6">
      <h2 className="font-display text-base font-semibold text-graphite dark:text-mist">Profile</h2>

      <div className="mt-4 flex items-center gap-4">
        <img
          src={profile.avatarUrl || 'https://i.pravatar.cc/200'}
          alt=""
          className="h-16 w-16 rounded-full object-cover ring-2 ring-signal/20"
        />
        <div className="flex-1">
          <label className="block text-xs font-medium text-graphite/60 dark:text-mist/60">Avatar URL</label>
          <input
            type="url"
            value={profile.avatarUrl}
            onChange={(e) => onChange({ avatarUrl: e.target.value })}
            placeholder="https://…"
            className="mt-1 w-full rounded-lg border border-mist-line bg-transparent px-3 py-2 text-sm text-graphite outline-none transition focus:border-signal focus:ring-1 focus:ring-signal dark:border-graphite-line dark:text-mist"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-xs font-medium text-graphite/60 dark:text-mist/60">Display name</span>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) => onChange({ displayName: e.target.value })}
            className="rounded-lg border border-mist-line bg-transparent px-3 py-2 text-graphite outline-none transition focus:border-signal focus:ring-1 focus:ring-signal dark:border-graphite-line dark:text-mist"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-xs font-medium text-graphite/60 dark:text-mist/60">Username (page URL)</span>
          <div className="flex items-center rounded-lg border border-mist-line pl-3 focus-within:border-signal focus-within:ring-1 focus-within:ring-signal dark:border-graphite-line">
            <span className="font-mono text-xs text-graphite/40 dark:text-mist/40">/u/</span>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => onChange({ username: e.target.value.trim().toLowerCase().replace(/\s+/g, '-') })}
              className="w-full bg-transparent px-1.5 py-2 text-graphite outline-none dark:text-mist"
            />
          </div>
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-1.5 text-sm">
        <span className="text-xs font-medium text-graphite/60 dark:text-mist/60">Bio</span>
        <textarea
          value={profile.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          rows={2}
          maxLength={160}
          className="resize-none rounded-lg border border-mist-line bg-transparent px-3 py-2 text-sm text-graphite outline-none transition focus:border-signal focus:ring-1 focus:ring-signal dark:border-graphite-line dark:text-mist"
        />
        <span className="self-end text-[11px] text-graphite/35 dark:text-mist/35">{profile.bio.length}/160</span>
      </label>

      <div className="mt-2">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-graphite/60 dark:text-mist/60">Social links</span>
          <button
            type="button"
            onClick={addSocial}
            className="text-xs font-medium text-signal hover:underline"
          >
            + Add
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {profile.socialLinks.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <select
                value={s.platform}
                onChange={(e) => updateSocial(i, { platform: e.target.value })}
                className="rounded-lg border border-mist-line bg-transparent px-2 py-2 text-xs text-graphite outline-none focus:border-signal dark:border-graphite-line dark:text-mist"
              >
                {SOCIAL_PLATFORM_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input
                type="url"
                value={s.url}
                onChange={(e) => updateSocial(i, { url: e.target.value })}
                placeholder="https://…"
                className="flex-1 rounded-lg border border-mist-line bg-transparent px-3 py-2 text-xs text-graphite outline-none focus:border-signal dark:border-graphite-line dark:text-mist"
              />
              <button
                type="button"
                onClick={() => removeSocial(i)}
                aria-label="Remove social link"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-coral/70 transition hover:bg-coral-tint hover:text-coral"
              >
                ✕
              </button>
            </div>
          ))}
          {profile.socialLinks.length === 0 && (
            <p className="text-xs text-graphite/40 dark:text-mist/40">No social links yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}

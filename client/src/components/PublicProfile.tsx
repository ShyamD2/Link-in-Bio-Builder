import type { Profile, PublicLink } from '../types'

interface PublicProfileProps {
  profile: Profile
  links: PublicLink[]
  onLinkClick?: (link: PublicLink) => void
  compact?: boolean
}

const RADIUS_BY_STYLE: Record<Profile['theme']['buttonStyle'], string> = {
  pill: '999px',
  rounded: '16px',
  square: '4px',
  outline: '16px',
}

const SOCIAL_ICON: Record<string, string> = {
  instagram: '📸',
  youtube: '▶️',
  twitter: '🐦',
  x: '🐦',
  tiktok: '🎵',
  linkedin: '💼',
  website: '🌐',
  email: '✉️',
}

export function PublicProfile({ profile, links, onLinkClick, compact }: PublicProfileProps) {
  const { theme } = profile
  const isOutline = theme.buttonStyle === 'outline'

  return (
    <div
      className="flex min-h-full w-full flex-col items-center px-6 pb-10"
      style={{ background: theme.background, paddingTop: compact ? '2.25rem' : '3.5rem' }}
    >
      <img
        src={profile.avatarUrl || 'https://i.pravatar.cc/200'}
        alt={profile.displayName}
        className={`${compact ? 'h-16 w-16' : 'h-24 w-24'} rounded-full object-cover shadow-lg`}
        style={{ border: `3px solid ${theme.textColor}55` }}
      />
      <h1
        className={`mt-4 text-center font-display font-bold ${compact ? 'text-base' : 'text-xl'}`}
        style={{ color: theme.textColor }}
      >
        {profile.displayName}
      </h1>
      {profile.bio && (
        <p
          className={`mt-1.5 max-w-xs text-center ${compact ? 'text-[11px]' : 'text-sm'} opacity-90`}
          style={{ color: theme.textColor }}
        >
          {profile.bio}
        </p>
      )}

      {profile.socialLinks.length > 0 && (
        <div className={`mt-4 flex gap-3 ${compact ? 'text-sm' : 'text-lg'}`}>
          {profile.socialLinks.map((s) => (
            <a
              key={s.platform + s.url}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={s.platform}
              className="opacity-90 transition hover:opacity-100"
            >
              {SOCIAL_ICON[s.platform.toLowerCase()] ?? '🔗'}
            </a>
          ))}
        </div>
      )}

      <div className={`mt-6 flex w-full max-w-sm flex-col ${compact ? 'gap-2' : 'gap-3'}`}>
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => onLinkClick?.(link)}
            className={`flex w-full items-center justify-center gap-2 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 ${
              compact ? 'px-3 py-2.5 text-xs' : 'px-5 py-3.5 text-sm'
            }`}
            style={{
              borderRadius: RADIUS_BY_STYLE[theme.buttonStyle],
              backgroundColor: isOutline ? 'transparent' : theme.buttonColor,
              color: isOutline ? theme.buttonColor : contrastColor(theme.buttonColor),
              border: isOutline ? `1.5px solid ${theme.buttonColor}` : '1.5px solid transparent',
            }}
          >
            <span>{link.icon}</span>
            <span className="truncate">{link.title}</span>
          </a>
        ))}
        {links.length === 0 && (
          <p
            className={`text-center opacity-70 ${compact ? 'text-[11px]' : 'text-sm'}`}
            style={{ color: theme.textColor }}
          >
            No links yet.
          </p>
        )}
      </div>

      {!compact && (
        <p className="mt-10 text-xs opacity-60" style={{ color: theme.textColor }}>
          Made with Bioline
        </p>
      )}
    </div>
  )
}

/** Picks black or white text for readability against an arbitrary button color. */
function contrastColor(hex: string): string {
  const normalized = hex.replace('#', '')
  if (normalized.length !== 6) return '#101319'
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6 ? '#101319' : '#FFFFFF'
}

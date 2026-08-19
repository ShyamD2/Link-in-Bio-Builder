export type ButtonStyle = 'pill' | 'rounded' | 'square' | 'outline'

export interface Theme {
  /** Any valid CSS `background` value — a solid color or a gradient. */
  background: string
  buttonStyle: ButtonStyle
  buttonColor: string
  textColor: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface Profile {
  username: string
  displayName: string
  bio: string
  avatarUrl: string
  theme: Theme
  socialLinks: SocialLink[]
}

export interface LinkItem {
  id: string
  title: string
  url: string
  icon: string
  active: boolean
  order: number
  clicks: number
}

export interface PublicLink {
  id: string
  title: string
  url: string
  icon: string
}

export interface PublicProfileResponse {
  profile: Profile
  links: PublicLink[]
}

export const ICON_OPTIONS: { value: string; label: string }[] = [
  { value: '🔗', label: 'Link' },
  { value: '📸', label: 'Instagram' },
  { value: '▶️', label: 'YouTube' },
  { value: '🎵', label: 'TikTok' },
  { value: '🐦', label: 'Twitter / X' },
  { value: '💼', label: 'LinkedIn' },
  { value: '🌐', label: 'Website' },
  { value: '✉️', label: 'Email' },
  { value: '🛒', label: 'Shop' },
  { value: '🎧', label: 'Podcast/Music' },
]

export const THEME_PRESETS: { name: string; theme: Theme }[] = [
  {
    name: 'Dusk',
    theme: {
      background: 'linear-gradient(160deg,#5B5FEF 0%,#8B5CF6 45%,#E2574C 100%)',
      buttonStyle: 'pill',
      buttonColor: '#FFFFFF',
      textColor: '#FFFFFF',
    },
  },
  {
    name: 'Mint',
    theme: {
      background: 'linear-gradient(160deg,#0F766E 0%,#2BB673 100%)',
      buttonStyle: 'rounded',
      buttonColor: '#FFFFFF',
      textColor: '#FFFFFF',
    },
  },
  {
    name: 'Paper',
    theme: {
      background: '#F5F2EA',
      buttonStyle: 'outline',
      buttonColor: '#101319',
      textColor: '#101319',
    },
  },
  {
    name: 'Midnight',
    theme: {
      background: 'linear-gradient(160deg,#101319 0%,#20242E 100%)',
      buttonStyle: 'rounded',
      buttonColor: '#5B5FEF',
      textColor: '#FFFFFF',
    },
  },
  {
    name: 'Sunset',
    theme: {
      background: 'linear-gradient(160deg,#F59E0B 0%,#E2574C 100%)',
      buttonStyle: 'pill',
      buttonColor: '#101319',
      textColor: '#FFFFFF',
    },
  },
]

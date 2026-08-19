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

export interface Database {
  profile: Profile
  links: LinkItem[]
}

import type { Profile, PublicLink } from '../types'
import { PublicProfile } from './PublicProfile'

interface PhonePreviewProps {
  profile: Profile
  links: PublicLink[]
}

export function PhonePreview({ profile, links }: PhonePreviewProps) {
  return (
    <div className="sticky top-6 flex flex-col items-center gap-3">
      <div className="relative h-[560px] w-[280px] rounded-[2.5rem] border-[10px] border-graphite bg-graphite shadow-phone dark:border-graphite-softer">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-graphite" />
        <div className="h-full w-full overflow-y-auto rounded-[1.9rem]">
          <PublicProfile profile={profile} links={links} compact />
        </div>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-wider text-graphite/40 dark:text-mist/40">
        Live preview
      </span>
    </div>
  )
}

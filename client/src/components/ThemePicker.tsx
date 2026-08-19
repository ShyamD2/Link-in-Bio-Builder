import type { ButtonStyle, Theme } from '../types'
import { THEME_PRESETS } from '../types'

interface ThemePickerProps {
  theme: Theme
  onChange: (updates: Partial<Theme>) => void
}

const BUTTON_STYLES: { value: ButtonStyle; label: string }[] = [
  { value: 'pill', label: 'Pill' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'square', label: 'Square' },
  { value: 'outline', label: 'Outline' },
]

function isGradient(bg: string): boolean {
  return bg.trim().startsWith('linear-gradient')
}

function gradientStops(bg: string): [string, string] {
  const matches = bg.match(/#[0-9a-fA-F]{3,8}/g)
  return [matches?.[0] ?? '#5B5FEF', matches?.[matches.length - 1] ?? '#E2574C']
}

export function ThemePicker({ theme, onChange }: ThemePickerProps) {
  const gradient = isGradient(theme.background)
  const [from, to] = gradientStops(theme.background)

  return (
    <section className="rounded-3xl border border-mist-line bg-mist-soft p-5 shadow-card dark:border-graphite-line dark:bg-graphite-soft sm:p-6">
      <h2 className="font-display text-base font-semibold text-graphite dark:text-mist">Appearance</h2>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {THEME_PRESETS.map((preset) => (
          <button
            key={preset.name}
            type="button"
            onClick={() => onChange(preset.theme)}
            className="group flex flex-col items-center gap-1.5"
          >
            <span
              className="h-11 w-11 rounded-full border-2 border-transparent shadow-sm transition group-hover:scale-105 group-hover:border-signal"
              style={{ background: preset.theme.background }}
            />
            <span className="text-[11px] text-graphite/50 dark:text-mist/50">{preset.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 text-sm">
          <span className="text-xs font-medium text-graphite/60 dark:text-mist/60">Background</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={from}
              onChange={(e) =>
                onChange({ background: gradient ? `linear-gradient(160deg,${e.target.value},${to})` : e.target.value })
              }
              className="h-9 w-9 cursor-pointer rounded-lg border border-mist-line bg-transparent dark:border-graphite-line"
            />
            {gradient && (
              <input
                type="color"
                value={to}
                onChange={(e) => onChange({ background: `linear-gradient(160deg,${from},${e.target.value})` })}
                className="h-9 w-9 cursor-pointer rounded-lg border border-mist-line bg-transparent dark:border-graphite-line"
              />
            )}
            <button
              type="button"
              onClick={() =>
                onChange({ background: gradient ? from : `linear-gradient(160deg,${from},${to})` })
              }
              className="ml-auto text-[11px] font-medium text-signal hover:underline"
            >
              {gradient ? 'Use solid' : 'Use gradient'}
            </button>
          </div>
        </div>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-xs font-medium text-graphite/60 dark:text-mist/60">Button color</span>
          <input
            type="color"
            value={theme.buttonColor}
            onChange={(e) => onChange({ buttonColor: e.target.value })}
            className="h-9 w-16 cursor-pointer rounded-lg border border-mist-line bg-transparent dark:border-graphite-line"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-xs font-medium text-graphite/60 dark:text-mist/60">Text color</span>
          <input
            type="color"
            value={theme.textColor}
            onChange={(e) => onChange({ textColor: e.target.value })}
            className="h-9 w-16 cursor-pointer rounded-lg border border-mist-line bg-transparent dark:border-graphite-line"
          />
        </label>

        <div className="flex flex-col gap-1.5 text-sm">
          <span className="text-xs font-medium text-graphite/60 dark:text-mist/60">Button shape</span>
          <div className="flex gap-1.5">
            {BUTTON_STYLES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => onChange({ buttonStyle: s.value })}
                className={`flex-1 rounded-lg border px-2 py-2 text-[11px] font-medium transition ${
                  theme.buttonStyle === s.value
                    ? 'border-signal bg-signal-tint text-signal-dim'
                    : 'border-mist-line text-graphite/60 hover:border-signal/40 dark:border-graphite-line dark:text-mist/60'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

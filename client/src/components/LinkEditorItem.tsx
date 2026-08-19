import type { LinkItem } from '../types'
import { ICON_OPTIONS } from '../types'

interface LinkEditorItemProps {
  link: LinkItem
  isFirst: boolean
  isLast: boolean
  onChange: (updates: Partial<LinkItem>) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export function LinkEditorItem({
  link,
  isFirst,
  isLast,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}: LinkEditorItemProps) {
  return (
    <div
      className={`animate-pop rounded-2xl border p-3.5 transition ${
        link.active
          ? 'border-mist-line bg-mist-soft dark:border-graphite-line dark:bg-graphite-soft'
          : 'border-mist-line/60 bg-mist-soft/50 opacity-60 dark:border-graphite-line/60 dark:bg-graphite-soft/50'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex flex-col gap-0.5 pt-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            aria-label="Move link up"
            className="flex h-6 w-6 items-center justify-center rounded text-graphite/40 transition hover:bg-mist hover:text-graphite disabled:opacity-25 disabled:hover:bg-transparent dark:text-mist/40 dark:hover:bg-graphite-softer dark:hover:text-mist"
          >
            ▲
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            aria-label="Move link down"
            className="flex h-6 w-6 items-center justify-center rounded text-graphite/40 transition hover:bg-mist hover:text-graphite disabled:opacity-25 disabled:hover:bg-transparent dark:text-mist/40 dark:hover:bg-graphite-softer dark:hover:text-mist"
          >
            ▼
          </button>
        </div>

        <select
          value={link.icon}
          onChange={(e) => onChange({ icon: e.target.value })}
          aria-label="Link icon"
          className="mt-1 rounded-lg border border-mist-line bg-transparent px-1.5 py-2 text-base outline-none focus:border-signal dark:border-graphite-line"
        >
          {ICON_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.value} {opt.label}
            </option>
          ))}
        </select>

        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={link.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Link title"
            className="w-full rounded-lg border border-mist-line bg-transparent px-3 py-2 text-sm font-medium text-graphite outline-none transition focus:border-signal focus:ring-1 focus:ring-signal dark:border-graphite-line dark:text-mist"
          />
          <input
            type="url"
            value={link.url}
            onChange={(e) => onChange({ url: e.target.value })}
            placeholder="https://…"
            className="w-full rounded-lg border border-mist-line bg-transparent px-3 py-2 font-mono text-xs text-graphite/70 outline-none transition focus:border-signal focus:ring-1 focus:ring-signal dark:border-graphite-line dark:text-mist/70"
          />
        </div>

        <div className="flex flex-col items-end gap-2 pl-1">
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete link"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-coral/70 transition hover:bg-coral-tint hover:text-coral"
          >
            ✕
          </button>
          <label className="flex items-center gap-1.5 text-[11px] text-graphite/50 dark:text-mist/50">
            <input
              type="checkbox"
              checked={link.active}
              onChange={(e) => onChange({ active: e.target.checked })}
              className="h-3.5 w-3.5 accent-signal"
            />
            Active
          </label>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-end gap-1 pl-9 font-mono text-[11px] text-graphite/40 dark:text-mist/40">
        {link.clicks} click{link.clicks === 1 ? '' : 's'}
      </div>
    </div>
  )
}

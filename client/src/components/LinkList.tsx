import type { LinkItem } from '../types'
import { LinkEditorItem } from './LinkEditorItem'

interface LinkListProps {
  links: LinkItem[]
  onAdd: () => void
  onChange: (id: string, updates: Partial<LinkItem>) => void
  onDelete: (id: string) => void
  onReorder: (fromIndex: number, toIndex: number) => void
}

export function LinkList({ links, onAdd, onChange, onDelete, onReorder }: LinkListProps) {
  const sorted = [...links].sort((a, b) => a.order - b.order)
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0)

  return (
    <section className="rounded-3xl border border-mist-line bg-mist-soft p-5 shadow-card dark:border-graphite-line dark:bg-graphite-soft sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-base font-semibold text-graphite dark:text-mist">Links</h2>
          <p className="mt-0.5 font-mono text-[11px] text-graphite/40 dark:text-mist/40">
            {links.length} link{links.length === 1 ? '' : 's'} · {totalClicks} total click
            {totalClicks === 1 ? '' : 's'}
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full bg-signal px-4 py-2 text-xs font-semibold text-white transition hover:bg-signal-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          + Add link
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {sorted.map((link, index) => (
          <LinkEditorItem
            key={link.id}
            link={link}
            isFirst={index === 0}
            isLast={index === sorted.length - 1}
            onChange={(updates) => onChange(link.id, updates)}
            onDelete={() => onDelete(link.id)}
            onMoveUp={() => onReorder(index, index - 1)}
            onMoveDown={() => onReorder(index, index + 1)}
          />
        ))}
        {sorted.length === 0 && (
          <p className="rounded-2xl border border-dashed border-mist-line py-8 text-center text-sm text-graphite/40 dark:border-graphite-line dark:text-mist/40">
            No links yet — add your first one.
          </p>
        )}
      </div>
    </section>
  )
}

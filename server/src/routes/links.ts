import { Router } from 'express'
import { nanoid } from 'nanoid'
import { readDB, writeDB } from '../db.js'
import type { LinkItem } from '../types.js'

const router = Router()

function sorted(links: LinkItem[]): LinkItem[] {
  return [...links].sort((a, b) => a.order - b.order)
}

router.get('/', async (_req, res) => {
  const db = await readDB()
  res.json(sorted(db.links))
})

router.post('/', async (req, res) => {
  const db = await readDB()
  const { title = 'New link', url = 'https://', icon = '🔗' } = req.body as Partial<LinkItem>
  const nextOrder = db.links.length ? Math.max(...db.links.map((l) => l.order)) + 1 : 0
  const link: LinkItem = {
    id: nanoid(8),
    title,
    url,
    icon,
    active: true,
    order: nextOrder,
    clicks: 0,
  }
  await writeDB({ ...db, links: [...db.links, link] })
  res.status(201).json(link)
})

router.put('/reorder', async (req, res) => {
  const db = await readDB()
  const { orderedIds } = req.body as { orderedIds: string[] }
  const orderIndex = new Map(orderedIds.map((id, index) => [id, index]))
  const nextLinks = db.links.map((link) =>
    orderIndex.has(link.id) ? { ...link, order: orderIndex.get(link.id)! } : link,
  )
  await writeDB({ ...db, links: nextLinks })
  res.json(sorted(nextLinks))
})

router.put('/:id', async (req, res) => {
  const db = await readDB()
  const { id } = req.params
  const exists = db.links.find((l) => l.id === id)
  if (!exists) {
    res.status(404).json({ error: 'Link not found' })
    return
  }
  const updates = req.body as Partial<LinkItem>
  const nextLinks = db.links.map((l) => (l.id === id ? { ...l, ...updates, id: l.id } : l))
  await writeDB({ ...db, links: nextLinks })
  res.json(nextLinks.find((l) => l.id === id))
})

router.delete('/:id', async (req, res) => {
  const db = await readDB()
  const { id } = req.params
  const nextLinks = db.links.filter((l) => l.id !== id)
  await writeDB({ ...db, links: nextLinks })
  res.status(204).end()
})

router.post('/:id/click', async (req, res) => {
  const db = await readDB()
  const { id } = req.params
  const link = db.links.find((l) => l.id === id)
  if (!link) {
    res.status(404).json({ error: 'Link not found' })
    return
  }
  link.clicks += 1
  await writeDB(db)
  res.json({ clicks: link.clicks })
})

export default router

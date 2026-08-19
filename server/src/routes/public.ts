import { Router } from 'express'
import { readDB } from '../db.js'

const router = Router()

router.get('/:username', async (req, res) => {
  const db = await readDB()
  if (db.profile.username !== req.params.username) {
    res.status(404).json({ error: 'Profile not found' })
    return
  }
  const activeLinks = db.links
    .filter((l) => l.active)
    .sort((a, b) => a.order - b.order)
    .map(({ id, title, url, icon }) => ({ id, title, url, icon }))
  res.json({ profile: db.profile, links: activeLinks })
})

export default router

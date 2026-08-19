import { Router } from 'express'
import { readDB, writeDB } from '../db.js'
import type { Profile } from '../types.js'

const router = Router()

router.get('/', async (_req, res) => {
  const db = await readDB()
  res.json(db.profile)
})

router.put('/', async (req, res) => {
  const db = await readDB()
  const updates = req.body as Partial<Profile>
  const nextProfile: Profile = {
    ...db.profile,
    ...updates,
    theme: { ...db.profile.theme, ...(updates.theme ?? {}) },
  }
  await writeDB({ ...db, profile: nextProfile })
  res.json(nextProfile)
})

export default router

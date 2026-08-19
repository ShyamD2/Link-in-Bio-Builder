import express from 'express'
import cors from 'cors'
import path from 'path'
import { existsSync } from 'fs'
import { fileURLToPath } from 'url'
import profileRouter from './routes/profile.js'
import linksRouter from './routes/links.js'
import publicRouter from './routes/public.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = Number(process.env.PORT) || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/profile', profileRouter)
app.use('/api/links', linksRouter)
app.use('/api/public', publicRouter)

// In production, the client is built to ../client/dist and served from
// this same process so the whole app runs as a single Node server.
const clientDist = path.join(__dirname, '../../client/dist')
if (existsSync(clientDist)) {
  app.use(express.static(clientDist))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Link-in-bio API ready on http://localhost:${PORT}`)
})

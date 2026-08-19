import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import type { Database } from './types.js'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DATA_DIR, 'db.json')

const SEED: Database = {
  profile: {
    username: 'jordan',
    displayName: 'Jordan Ellis',
    bio: 'Filmmaker & photographer. New tutorials every Friday 🎬',
    avatarUrl: 'https://i.pravatar.cc/200?img=12',
    theme: {
      background: 'linear-gradient(160deg,#5B5FEF 0%,#8B5CF6 45%,#E2574C 100%)',
      buttonStyle: 'pill',
      buttonColor: '#FFFFFF',
      textColor: '#FFFFFF',
    },
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com' },
      { platform: 'youtube', url: 'https://youtube.com' },
      { platform: 'twitter', url: 'https://twitter.com' },
    ],
  },
  links: [
    {
      id: 'seed-1',
      title: 'Watch my latest short film',
      url: 'https://youtube.com',
      icon: '▶️',
      active: true,
      order: 0,
      clicks: 128,
    },
    {
      id: 'seed-2',
      title: 'Book a shoot with me',
      url: 'https://example.com/book',
      icon: '🔗',
      active: true,
      order: 1,
      clicks: 54,
    },
    {
      id: 'seed-3',
      title: 'Print shop',
      url: 'https://example.com/shop',
      icon: '🛒',
      active: true,
      order: 2,
      clicks: 12,
    },
    {
      id: 'seed-4',
      title: 'Join the newsletter',
      url: 'https://example.com/newsletter',
      icon: '✉️',
      active: true,
      order: 3,
      clicks: 31,
    },
  ],
}

let cache: Database | null = null

async function ensureFile(): Promise<void> {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })
  if (!existsSync(DB_PATH)) await writeFile(DB_PATH, JSON.stringify(SEED, null, 2), 'utf-8')
}

export async function readDB(): Promise<Database> {
  if (cache) return cache
  await ensureFile()
  const raw = await readFile(DB_PATH, 'utf-8')
  cache = JSON.parse(raw) as Database
  return cache
}

export async function writeDB(next: Database): Promise<void> {
  cache = next
  await ensureFile()
  await writeFile(DB_PATH, JSON.stringify(next, null, 2), 'utf-8')
}

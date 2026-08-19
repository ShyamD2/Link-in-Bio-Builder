import type { LinkItem, Profile, PublicProfileResponse } from '../types'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText)
    throw new Error(message || `Request failed: ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

export const api = {
  getProfile: () => request<Profile>('/api/profile'),
  updateProfile: (updates: Partial<Profile>) =>
    request<Profile>('/api/profile', { method: 'PUT', body: JSON.stringify(updates) }),

  getLinks: () => request<LinkItem[]>('/api/links'),
  createLink: (data: Partial<LinkItem>) =>
    request<LinkItem>('/api/links', { method: 'POST', body: JSON.stringify(data) }),
  updateLink: (id: string, updates: Partial<LinkItem>) =>
    request<LinkItem>(`/api/links/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  deleteLink: (id: string) => request<void>(`/api/links/${id}`, { method: 'DELETE' }),
  reorderLinks: (orderedIds: string[]) =>
    request<LinkItem[]>('/api/links/reorder', { method: 'PUT', body: JSON.stringify({ orderedIds }) }),
  registerClick: (id: string) => request<{ clicks: number }>(`/api/links/${id}/click`, { method: 'POST' }),

  getPublicProfile: (username: string) => request<PublicProfileResponse>(`/api/public/${username}`),
}

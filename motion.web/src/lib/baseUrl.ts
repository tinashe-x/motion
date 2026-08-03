/** Vite base URL, e.g. `/motion/` on GitHub Pages or `/` locally with VITE_BASE=/ */
export const baseUrl = import.meta.env.BASE_URL

export function withBase(path: string) {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${baseUrl}${normalized}`
}

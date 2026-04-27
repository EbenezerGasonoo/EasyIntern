/** Public app URL for links in emails. Set `FRONTEND_URL` on the API. */
export function frontendBaseUrl() {
  const raw = process.env.FRONTEND_URL?.trim();
  if (raw) return raw.replace(/\/$/, '');
  if (process.env.NODE_ENV === 'production') return 'https://easyintern.app';
  return 'http://localhost:3000';
}

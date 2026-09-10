export function proxiedAvatar(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("/")) return url;
  return `/api/avatar?url=${encodeURIComponent(url)}`;
}

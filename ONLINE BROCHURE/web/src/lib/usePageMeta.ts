import { useEffect } from 'react';

/**
 * Sets a unique <title> and meta description per route. This is a
 * client-side-rendered Vite SPA (no Next.js/SSR here), so there's no
 * per-route server-rendered <head> — this hook is the practical
 * equivalent: it updates the tags on mount/route change, which modern
 * crawlers (including Googlebot) pick up since they execute JS. True
 * static prerendering per route would improve crawlability further but
 * is a build-tooling change outside the scope of this content pass.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [title, description]);
}

import type { CatalogueResponse } from '../types';

const CACHE_KEY = 'gmt_catalogue_cache_v1';

// Falls back to local mock data (public/mock-products.json) when no live
// Apps Script endpoint is configured yet, so the UI can be built/tested
// before deployment.
const API_URL = import.meta.env.VITE_SHEET_API_URL || '/mock-products.json';

export function loadCachedCatalogue(): CatalogueResponse | null {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CatalogueResponse;
  } catch {
    return null;
  }
}

export async function syncCatalogue(): Promise<CatalogueResponse> {
  const response = await fetch(API_URL, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Sync failed: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as CatalogueResponse;
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  return data;
}

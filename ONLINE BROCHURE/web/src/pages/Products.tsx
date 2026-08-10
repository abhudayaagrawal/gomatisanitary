import { useEffect, useMemo, useState } from 'react';
import { loadCachedCatalogue, syncCatalogue } from '../lib/api';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('');
  const [subgroup, setSubgroup] = useState('');

  useEffect(() => {
    const cached = loadCachedCatalogue();
    if (cached) {
      setProducts(cached.products);
      setLastSyncedAt(cached.generatedAt);
    }
    handleSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSync() {
    setSyncing(true);
    setSyncError(null);
    try {
      const data = await syncCatalogue();
      setProducts(data.products);
      setLastSyncedAt(data.generatedAt);
    } catch (err) {
      setSyncError(err instanceof Error ? err.message : 'Sync failed');
    } finally {
      setSyncing(false);
    }
  }

  const groups = useMemo(
    () => Array.from(new Set(products.map((p) => p.group).filter(Boolean))).sort(),
    [products]
  );

  const subgroups = useMemo(() => {
    const scoped = group ? products.filter((p) => p.group === group) : products;
    return Array.from(new Set(scoped.map((p) => p.subgroup).filter(Boolean))).sort();
  }, [products, group]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (group && p.group !== group) return false;
      if (subgroup && p.subgroup !== subgroup) return false;
      if (!q) return true;
      return (
        p.code.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.group.toLowerCase().includes(q) ||
        p.subgroup.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
      );
    });
  }, [products, search, group, subgroup]);

  function handleGroupChange(value: string) {
    setGroup(value);
    setSubgroup('');
  }

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <span className="eyebrow">Our Range</span>
          <h1>Product Catalogue</h1>
          <p>
            Browse our full range of sanitary hardware &amp; bathroom fittings. Search by code or name, or
            drill down by group and subgroup to find exactly what you need.
          </p>
        </div>
      </section>

      <div className="container products-body">
        <div className="products-toolbar">
          <div className="products-filters">
            <input
              type="search"
              placeholder="Search by code, name, group, material…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <select value={group} onChange={(e) => handleGroupChange(e.target.value)}>
              <option value="">All Groups</option>
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select value={subgroup} onChange={(e) => setSubgroup(e.target.value)} disabled={!subgroups.length}>
              <option value="">All Subgroups</option>
              {subgroups.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="sync-info">
            <button onClick={handleSync} disabled={syncing} className="btn btn-secondary sync-button">
              {syncing ? 'Syncing…' : 'Sync Now'}
            </button>
            {lastSyncedAt && (
              <span className="sync-timestamp">Last updated: {new Date(lastSyncedAt).toLocaleString()}</span>
            )}
            {syncError && <span className="sync-error">{syncError}</span>}
          </div>
        </div>

        <div className="products-count">
          {filtered.length} product{filtered.length === 1 ? '' : 's'}
        </div>

        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.code} product={p} />
          ))}
        </div>

        {!filtered.length && products.length > 0 && (
          <div className="empty-state">No products match your search/filters.</div>
        )}
        {!products.length && !syncing && <div className="empty-state">No products loaded yet.</div>}
      </div>
    </div>
  );
}

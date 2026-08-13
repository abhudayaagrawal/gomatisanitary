import { Link } from 'react-router-dom';
import { PRODUCT_GROUPS } from '../lib/productGroups';
import './ProductGroupsGrid.css';

export default function ProductGroupsGrid() {
  return (
    <section className="groups-section">
      <div className="container">
        <div className="groups-header">
          <span className="eyebrow">Explore Our Range</span>
          <h2>Browse Our Product Categories</h2>
          <p>
            {PRODUCT_GROUPS.length}+ categories of sanitary hardware and bathroom fittings, organized by
            group. Tap any category to see what's inside and request pricing.
          </p>
        </div>

        <div className="groups-grid">
          {PRODUCT_GROUPS.map((g) => (
            <Link to={`/products/${g.slug}`} className="group-card" key={g.label}>
              <span className="group-photo">
                <img src={`/groups/${g.image}`} alt={g.label} loading="lazy" />
              </span>
              <span className="group-label">{g.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

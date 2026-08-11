import { Link } from 'react-router-dom';
import { PRODUCT_GROUPS } from '../lib/productGroups';
import GroupIcon from './GroupIcon';
import './ProductGroupsGrid.css';

export default function ProductGroupsGrid() {
  return (
    <section className="groups-section">
      <div className="container">
        <div className="groups-header">
          <span className="eyebrow">Explore Our Range</span>
          <h2>Product Categories</h2>
          <p>
            {PRODUCT_GROUPS.length}+ categories of sanitary hardware and bathroom fittings — tap any
            category to request the full catalogue.
          </p>
        </div>

        <div className="groups-grid">
          {PRODUCT_GROUPS.map((g) => (
            <Link to="/catalogue" className="group-card" key={g.label}>
              <span className="group-icon">
                <GroupIcon icon={g.icon} />
              </span>
              <span className="group-label">{g.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

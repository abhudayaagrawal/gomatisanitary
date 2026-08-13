import { OWN_BRANDS, DISTRIBUTED_BRANDS, type Brand } from '../lib/brands';
import './BrandsSection.css';

function BrandRow({ brands }: { brands: Brand[] }) {
  return (
    <div className="brand-row">
      {brands.map((b) => (
        <div className="brand-tile" key={b.name}>
          <img src={b.logo} alt={b.name} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export default function BrandsSection() {
  return (
    <section className="brands-section">
      <div className="container">
        <div className="groups-header">
          <span className="eyebrow">Our Partners</span>
          <h2>Brands We Carry</h2>
          <p>We manufacture under our own brands and also stock trusted names from India and China.</p>
        </div>

        <div className="brand-group">
          <h3>Our Own Brands</h3>
          <BrandRow brands={OWN_BRANDS} />
        </div>

        <div className="brand-group">
          <h3>Brands We Distribute</h3>
          <BrandRow brands={DISTRIBUTED_BRANDS} />
        </div>
      </div>
    </section>
  );
}

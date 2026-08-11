import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { BUSINESS } from '../lib/business';
import ProductGroupsGrid from '../components/ProductGroupsGrid';
import './Home.css';

const FEATURES = [
  {
    title: 'Wide Product Range',
    description: 'Angle cocks, Valves, Shower arms, Cisterns and hundreds more sanitary fittings in one place.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: 'Wholesale Pricing',
    description: 'Bulk carton and box quantities built for retailers, contractors and distributors.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 7 12 3 4 7l8 4 8-4Z" />
        <path d="M4 7v10l8 4 8-4V7" />
        <path d="M12 11v10" />
      </svg>
    ),
  },
  {
    title: `Trusted Since ${BUSINESS.establishedYear}`,
    description: 'Over a decade supplying quality hardware to businesses across Kathmandu.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">{BUSINESS.tagline}</span>
            <h1>
              Quality Bathroom Fittings, <span className="text-accent-2">Supplied In Bulk</span>
            </h1>
            <p className="hero-lead">
              {BUSINESS.name} is a Kathmandu-based wholesaler of sanitary hardware and bathroom fittings —
              Angle cocks, Valves, Shower arms, Cisterns and more — for retailers and contractors.
            </p>
            <div className="hero-actions">
              <Link to="/catalogue" className="btn btn-primary">
                Get Catalogue
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
          </div>
          <div className="hero-media">
            <div className="hero-logo-card">
              <img src={logo} alt="Gomati Sanitary logo" />
            </div>
          </div>
        </div>
      </section>

      <ProductGroupsGrid />

      <section className="features">
        <div className="container features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2>Want To See Our Full Range?</h2>
            <p>Request our catalogue and our team will share it directly with you.</p>
          </div>
          <Link to="/catalogue" className="btn btn-primary">
            Request Catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}

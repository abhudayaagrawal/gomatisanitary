import { Link } from 'react-router-dom';
import { BUSINESS } from '../lib/business';
import './About.css';

const STATS = [
  { value: `${new Date().getFullYear() - BUSINESS.establishedYear}+`, label: 'Years In Business' },
  { value: '1000+', label: 'Variety Of Products' },
  { value: 'Kathmandu', label: 'Based In Nepal' },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <span className="eyebrow">About Us</span>
          <h1>Your Wholesale Partner For Sanitary Hardware</h1>
          <p>
            {BUSINESS.name} has been supplying quality bathroom fittings and sanitary hardware to
            retailers and contractors across Kathmandu since {BUSINESS.establishedYear}.
          </p>
        </div>
      </section>

      <section className="container about-body">
        <div className="about-content">
          <div className="about-text">
            <h2>What We Do</h2>
            <p>
              We are a wholesale supplier of sanitary hardware and bathroom fittings — Angle cocks, Bib
              cocks, Ball valves, Gate valves, Shower arms, Cisterns, Basin and urinal parts, Connection
              pipes, and much more. Our catalogue spans both manufactured and imported products, sourced
              to give hardware shops, plumbers and contractors reliable stock at wholesale rates.
            </p>
            <p>
              Every product in our range is organized by group and subgroup and sold in standard carton
              and box quantities, making it easy to plan bulk orders. To protect our wholesale pricing, we
              share the full catalogue directly with verified businesses —{' '}
              <Link to="/catalogue">request it here</Link>.
            </p>
          </div>

          <div className="about-stats">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}

            <div className="about-decoration">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2>Have A Question About An Order?</h2>
            <p>Reach out and our team will get back to you.</p>
          </div>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

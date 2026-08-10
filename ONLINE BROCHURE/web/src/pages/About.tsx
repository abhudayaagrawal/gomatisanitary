import { Link } from 'react-router-dom';
import { BUSINESS } from '../lib/business';
import './About.css';

const STATS = [
  { value: `${new Date().getFullYear() - BUSINESS.establishedYear}+`, label: 'Years in business' },
  { value: 'Hundreds', label: 'Of products stocked' },
  { value: 'Kathmandu', label: 'Based in Nepal' },
];

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <span className="eyebrow">About Us</span>
          <h1>Your wholesale partner for sanitary hardware</h1>
          <p>
            {BUSINESS.name} has been supplying quality bathroom fittings and sanitary hardware to
            retailers and contractors across Kathmandu since {BUSINESS.establishedYear}.
          </p>
        </div>
      </section>

      <section className="container about-body">
        <div className="about-content">
          <div className="about-text">
            <h2>What we do</h2>
            <p>
              We are a wholesale supplier of sanitary hardware and bathroom fittings — angle cocks, bib
              cocks, ball valves, gate valves, shower arms, cisterns, basin and urinal parts, connection
              pipes, and much more. Our catalogue spans both manufactured and imported products, sourced
              to give hardware shops, plumbers and contractors reliable stock at wholesale rates.
            </p>
            <p>
              Every product in our range is organized by group and subgroup and sold in standard carton
              and box quantities, making it easy to plan bulk orders. Browse our full range on the{' '}
              <Link to="/products">Products</Link> page — updated directly from our live inventory.
            </p>
          </div>

          <div className="about-stats">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2>Have a question about an order?</h2>
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

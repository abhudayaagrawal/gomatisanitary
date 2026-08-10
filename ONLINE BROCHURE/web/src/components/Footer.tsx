import { Link } from 'react-router-dom';
import { BUSINESS } from '../lib/business';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-wordmark">
            <span className="footer-wordmark-go">GO</span>
            <span className="footer-wordmark-mati">MATI</span>
          </div>
          <p className="footer-tagline">{BUSINESS.tagline}</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href={BUSINESS.googleMapsUrl} target="_blank" rel="noreferrer">
            {BUSINESS.address}
          </a>
          {BUSINESS.phones.map((phone, i) => (
            <a key={phone} href={`tel:${BUSINESS.phoneLinks[i]}`}>
              {phone}
            </a>
          ))}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <a href={BUSINESS.facebookUrl} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={BUSINESS.googleMapsUrl} target="_blank" rel="noreferrer">
            Google Maps
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import { useState, type FormEvent } from 'react';
import { BUSINESS } from '../lib/business';
import './Contact.css';

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_URL as string | undefined;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !message.trim()) {
      setError('Please fill in your name and message.');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!FORM_ENDPOINT) {
      setError('The contact form is not connected yet. Please email or call us directly below.');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setStatus('error');
      setError('Something went wrong sending your message. Please try emailing us directly.');
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <span className="eyebrow">Contact Us</span>
          <h1>Get in touch</h1>
          <p>Questions about products, pricing or bulk orders? Send us a message or reach out directly.</p>
        </div>
      </section>

      <div className="container contact-body">
        <div className="contact-info">
          <div className="info-card">
            <h3>Visit</h3>
            <a href={BUSINESS.googleMapsUrl} target="_blank" rel="noreferrer">
              {BUSINESS.address}
            </a>
          </div>
          <div className="info-card">
            <h3>Call</h3>
            {BUSINESS.phones.map((phone, i) => (
              <a key={phone} href={`tel:${BUSINESS.phoneLinks[i]}`}>
                {phone}
              </a>
            ))}
          </div>
          <div className="info-card">
            <h3>Email</h3>
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </div>
          <div className="info-card">
            <h3>Follow</h3>
            <a href={BUSINESS.facebookUrl} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>

          <div className="map-embed">
            <iframe
              title="Gomati Sanitary location"
              src={BUSINESS.googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a message</h2>

          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Phone (optional)
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+977…" />
          </label>

          <label>
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="How can we help?"
            />
          </label>

          {error && <div className="form-error">{error}</div>}
          {status === 'success' && (
            <div className="form-success">Thanks — your message has been sent. We'll get back to you soon.</div>
          )}

          <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

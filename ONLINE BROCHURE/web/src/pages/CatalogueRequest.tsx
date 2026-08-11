import { useState, type FormEvent } from 'react';
import { BUSINESS } from '../lib/business';
import './CatalogueRequest.css';

const FORM_ENDPOINT = import.meta.env.VITE_CATALOGUE_REQUEST_API_URL as string | undefined;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(',') + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function CatalogueRequest() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [businessDetails, setBusinessDetails] = useState('');
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setError('');
    if (file && !file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, etc.).');
      setIdCardFile(null);
      return;
    }
    if (file && file.size > MAX_FILE_SIZE) {
      setError('Image is too large — please keep it under 5MB.');
      setIdCardFile(null);
      return;
    }
    setIdCardFile(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !contactNumber.trim() || !companyName.trim() || !address.trim() || !whatsappNumber.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!idCardFile) {
      setError('Please attach a photo of your Visiting Card or PAN Card.');
      return;
    }
    if (!FORM_ENDPOINT) {
      setError('This form is not connected yet. Please reach out via the Contact page instead.');
      return;
    }

    setStatus('submitting');
    try {
      const fileBase64 = await readFileAsBase64(idCardFile);
      const payload = {
        name,
        contactNumber,
        whatsappNumber,
        companyName,
        address,
        businessDetails: businessDetails || '(not provided)',
        fileName: idCardFile.name,
        fileType: idCardFile.type,
        fileBase64,
      };

      // Content-Type is deliberately text/plain, not application/json: Apps
      // Script web apps can't handle CORS preflight requests, and text/plain
      // is a "simple request" the browser sends without one. doPost still
      // parses the body as JSON regardless of the declared content type.
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Submission failed');
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || 'Submission failed');

      setStatus('success');
      setName('');
      setContactNumber('');
      setWhatsappNumber('');
      setCompanyName('');
      setAddress('');
      setBusinessDetails('');
      setIdCardFile(null);
    } catch {
      setStatus('error');
      setError('Something went wrong sending your request. Please try again or use the Contact page.');
    }
  }

  return (
    <div className="catalogue-request-page">
      <section className="catalogue-request-hero">
        <div className="container">
          <span className="eyebrow">Wholesale Access</span>
          <h1>Request Our Catalogue</h1>
          <p>
            To protect our wholesale pricing, we share our full product catalogue directly with verified
            retailers, contractors and businesses. Fill in your details below and our team will reach out
            with the catalogue.
          </p>
        </div>
      </section>

      <div className="container catalogue-request-body">
        <form className="catalogue-request-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Name *
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            </label>
            <label>
              Company Name *
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your business name"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Contact Number *
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+977…"
              />
            </label>
            <label>
              WhatsApp Number *
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+977…"
              />
            </label>
          </div>

          <label>
            Address *
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Shop / business address"
            />
          </label>

          <label>
            Photo of Visiting Card or PAN Card *
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {idCardFile && <span className="file-selected">Selected: {idCardFile.name}</span>}
          </label>

          <label>
            What Does Your Business Do? (Optional)
            <textarea
              value={businessDetails}
              onChange={(e) => setBusinessDetails(e.target.value)}
              rows={4}
              placeholder="e.g. hardware retailer, plumbing contractor…"
            />
          </label>

          {error && <div className="form-error">{error}</div>}
          {status === 'success' && (
            <div className="form-success">
              Thanks — your request has been received. We'll be in touch with the catalogue shortly.
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Submit Request'}
          </button>

          <p className="form-footnote">
            Prefer to talk first? Reach us directly at{' '}
            <a href={`tel:${BUSINESS.phoneLinks[0]}`}>{BUSINESS.phones[0]}</a> or{' '}
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
          </p>
        </form>
      </div>
    </div>
  );
}

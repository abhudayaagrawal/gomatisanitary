# Gomati Sanitary — Website

A four-page website for Gomati Sanitary: Home, About, Get Catalogue, Contact.

## How it fits together
- `web/` — the React + Vite site:
  - **Home** — hero, feature highlights, calls to action.
  - **About** — company background and stats.
  - **Get Catalogue** — a lead-qualification form (name, contact number,
    company name, address, WhatsApp number, a photo of a Visiting Card or
    PAN Card, and optional business details). The full product catalogue
    isn't browsable on the site — submissions are saved to Drive/Sheets and
    emailed to you so your team can follow up and share it directly with
    verified businesses.
  - **Contact** — address/phone/email, embedded Google Map, and a general
    message form (Formspree-backed).
- `apps-script/Code.gs` — a Google Apps Script Web App bound to the "GMT
  BROCHURE" Google Sheet, with two independent endpoints:
  - `doPost` — handles Get Catalogue submissions: saves the ID card photo to
    a Drive folder ("Gomati Catalogue Requests"), logs the request in a
    "Catalogue Requests" sheet tab, and emails a notification.
  - `doGet` — returns the product list as JSON with images re-hosted to
    Drive. **Not currently used by the website** (the public catalogue
    browser was removed in favor of the gated request form) — left in place
    in case it's useful for an internal/admin tool later.

  See [`apps-script/DEPLOY.md`](apps-script/DEPLOY.md) for deployment steps.

## Local development
```bash
cd web
npm install
npm run dev
```
Without a `web/.env` file, both forms show a "not connected yet" notice
instead of submitting.

## Connecting the Contact form
1. Create a free [Formspree](https://formspree.io) account and a new form.
2. Copy the form's endpoint URL, e.g. `https://formspree.io/f/xxxxxxxx`.
3. Copy `web/.env.example` to `web/.env` and set `VITE_CONTACT_FORM_URL` to
   that URL.
4. In Formspree's form settings, set the "reply-to" field mapping to `email`
   so replies go to whoever submitted the form.

(Formspree isn't used for Get Catalogue — its free tier doesn't support file
attachments, which is why that form uses the Apps Script endpoint instead.)

## Connecting the Get Catalogue form
1. Deploy `apps-script/Code.gs` following [`apps-script/DEPLOY.md`](apps-script/DEPLOY.md)
   and copy its Web App `/exec` URL.
2. In `web/.env`, set `VITE_CATALOGUE_REQUEST_API_URL` to that URL.

## Deploying the website
1. Push this repo to GitHub.
2. Create a free [Vercel](https://vercel.com) account and import the repo.
3. Set the project's root directory to `web`.
4. Add the environment variables `VITE_CONTACT_FORM_URL` and
   `VITE_CATALOGUE_REQUEST_API_URL` in Vercel's project settings (same
   values as in `web/.env`).
5. Deploy. Vercel gives you a public URL.

## Business info used on the site
Centralized in `web/src/lib/business.ts` (name, tagline, address, phone,
email, Facebook link, Google Maps links). Edit that one file to update it
everywhere (nav, footer, About, Contact) at once.

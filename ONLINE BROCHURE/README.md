# Gomati Sanitary — Website

A four-page website for Gomati Sanitary (Home, About, Products, Contact),
with a live product catalogue driven by the "GMT BROCHURE" Google Sheet.
Editing the sheet and clicking **Sync Now** on the Products page updates it —
no redeploy needed for data or photo changes.

## How it fits together
- `apps-script/Code.gs` — deployed inside the Google Sheet as a Web App. Reads
  the `MASTER` tab and returns the product list as JSON, re-hosting in-cell
  product images to a persistent Drive folder so links don't expire. See
  [`apps-script/DEPLOY.md`](apps-script/DEPLOY.md) for setup steps.
- `web/` — the React + Vite site:
  - **Home** — hero, feature highlights, calls to action.
  - **About** — company background and stats.
  - **Products** — the live, searchable/filterable catalogue (fetches from
    the Apps Script URL).
  - **Contact** — address/phone/email, embedded Google Map, and a message
    form (see Formspree setup below).

## Local development
```bash
cd web
npm install
npm run dev
```
Without a `web/.env` file, the Products page falls back to sample data in
`web/public/mock-products.json` so the UI can be built/tested before the
Apps Script is deployed, and the Contact form shows a "not connected yet"
notice instead of submitting.

## Connecting the product catalogue
1. Deploy the Apps Script (see `apps-script/DEPLOY.md`) and copy its `/exec`
   URL.
2. Copy `web/.env.example` to `web/.env` and set `VITE_SHEET_API_URL` to that
   URL.

## Connecting the contact form
The form posts to a [Formspree](https://formspree.io) endpoint (free tier
works fine for a small business site):
1. Create a free Formspree account and a new form.
2. Copy the form's endpoint URL, e.g. `https://formspree.io/f/xxxxxxxx`.
3. In `web/.env`, set `VITE_CONTACT_FORM_URL` to that URL.
4. In Formspree's form settings, set the "reply-to" field mapping to `email`
   so replies go to whoever submitted the form.

Until this is set, the Contact page still displays fully (map, address,
phone, email) — only the message form shows a notice asking visitors to
email/call directly instead.

## Deploying the website
1. Push this repo to GitHub.
2. Create a free [Vercel](https://vercel.com) account and import the repo.
3. Set the project's root directory to `web`.
4. Add the environment variables `VITE_SHEET_API_URL` and
   `VITE_CONTACT_FORM_URL` in Vercel's project settings (same values as in
   `web/.env`).
5. Deploy. Vercel gives you a public URL.

After this initial deploy, you generally won't need to redeploy again for
routine product/data/photo updates — just edit the sheet and click **Sync
Now** on the live Products page.

## Business info used on the site
Centralized in `web/src/lib/business.ts` (name, tagline, address, phone,
email, Facebook link, Google Maps links). Edit that one file to update it
everywhere (nav, footer, About, Contact) at once.

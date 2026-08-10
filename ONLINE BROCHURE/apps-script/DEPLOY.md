# Deploying the Apps Script data API

This turns your "GMT BROCHURE" Google Sheet into a live JSON API the website
reads from. You only need to do this once (and again if you ever want to
publish a code change to `Code.gs`).

## 1. Open the Script Editor
1. Open the **GMT BROCHURE** spreadsheet.
2. Extensions → Apps Script. This opens a script editor bound to this sheet.

## 2. Paste the code
1. Delete any placeholder code in `Code.gs`.
2. Copy everything from [`apps-script/Code.gs`](./Code.gs) in this repo and
   paste it in.
3. Save (Ctrl+S).

## 3. Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Fill in:
   - Description: `GMT Brochure API`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**.
5. The first time, Google will ask you to authorize the script (it needs
   access to the spreadsheet and Drive, since it re-hosts product images).
   Review and allow it — this is your own script running under your own
   account, so it's safe to approve.
6. Copy the **Web app URL** shown (it ends in `/exec`). This is your
   `VITE_SHEET_API_URL`.

## 4. Point the website at it
In `web/.env` (copy from `web/.env.example`), set:
```
VITE_SHEET_API_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```
Rebuild/redeploy the site once after setting this — after that, no further
redeploys are needed for data changes; the site fetches live from this URL.

## 5. Your day-to-day workflow
- **Edit text fields** (name, group, qty, etc.) in the sheet → click **Sync
  Now** on the website. Changes show up immediately, no extra steps.
- **Add a new product with a photo** (Insert → Image → Insert image in cell)
  → click **Sync Now** on the website. New codes are re-hosted to a Drive
  folder called "GMT Brochure - Web Images" (created automatically) the
  moment they're first seen — up to 20 new photos per click, so bulk-adding
  many products may take a few clicks in a row (or use the menu option below
  to catch them all up in one go).
- **Replace the photo on an existing product** (same code, new picture) →
  "Sync Now" will *not* pick this up on its own — to keep every sync fast
  regardless of catalogue size, it only checks codes it's never seen before.
  Use the sheet's **GMT Brochure → Publish All Images Now** menu (added
  automatically once you've deployed the script) to force a full re-check
  that also catches replaced photos.
- For a catalogue this size (800+ products), a full first-time backfill via
  "Publish All Images Now" can exceed Apps Script's 6-minute execution limit
  — progress is saved every 25 images, so if it stops early with a message,
  just run it again and it'll continue from where it left off, no work lost.
- Do **not** delete or move the "GMT Brochure - Web Images" Drive folder or
  the hidden `_ImageCache` sheet tab — they're how the site avoids re-uploading
  every photo on every sync.

## If something's not working
- **Images don't show up:** open the Apps Script editor → run `publishAllImages`
  once manually from the toolbar (select the function, click Run) and check
  the execution log for errors — most commonly this means an image was
  inserted "over cells" instead of "in cell" (Insert → Image → Insert image
  **in cell**, not "insert image over cells").
- **Redeploying code changes:** after editing `Code.gs`, use **Deploy → Manage
  deployments → edit (pencil) → New version → Deploy**. A brand new deployment
  would change the `/exec` URL, so prefer versioning the existing deployment
  instead.

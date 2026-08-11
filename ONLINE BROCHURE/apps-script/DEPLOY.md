# Deploying the Apps Script backend

This script is bound to your "GMT BROCHURE" Google Sheet and does two
things: handles "Get Catalogue" form submissions from the website
(`doPost`), and — not currently used by the site — can serve the product
list as JSON with images re-hosted to Drive (`doGet`). You only need to
deploy once (and again if you ever want to publish a code change).

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
   access to the spreadsheet, Drive, and Gmail, since it saves ID card
   photos and sends you email notifications). Review and allow it — this is
   your own script running under your own account, so it's safe to approve.
6. Copy the **Web app URL** shown (it ends in `/exec`).

## 4. Point the website at it
In `web/.env` (copy from `web/.env.example`), set:
```
VITE_CATALOGUE_REQUEST_API_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```
Rebuild/redeploy the site once after setting this.

## 5. How Get Catalogue requests work
When someone submits the form on the website:
- The ID card photo is saved to a Drive folder called **"Gomati Catalogue
  Requests"** (created automatically), named with the submitter's company.
  It's left with restricted/private sharing (not "Anyone with the link")
  since it's someone's ID document — you'll be able to open it fine while
  signed into the Google account the script runs as.
- The request (name, contact number, WhatsApp number, company, address,
  business details, and a link to the photo) is logged as a new row in a
  **"Catalogue Requests"** sheet tab (created automatically).
- You get an email notification at `gomatisanitary@gmail.com` with the same
  details. To change the notification address, edit `NOTIFICATION_EMAIL` in
  `Code.gs` and redeploy.

## Optional: the dormant product-sync API (`doGet`)
The site no longer uses this, but it still works if you want it for an
internal tool later — it returns the `MASTER` tab as JSON, re-hosting
in-cell product images to a Drive folder ("GMT Brochure - Web Images") the
first time each product code is seen. Fetch `<your Web App URL>?debug=1` to
sanity-check it, or use the sheet's **GMT Brochure → Publish All Images Now**
menu item to force a full image sync. Progress is saved every 25 images, so
if a bulk run hits Apps Script's 6-minute execution limit, just run it again
to continue.

## If something's not working
- **No email/row after a submission:** open the Apps Script editor → **Executions**
  (left sidebar) to see the failed run and its error.
- **Redeploying code changes:** after editing `Code.gs`, use **Deploy → Manage
  deployments → edit (pencil) → New version → Deploy**. A brand new deployment
  would change the `/exec` URL (requiring you to update `VITE_CATALOGUE_REQUEST_API_URL`),
  so prefer versioning the existing deployment instead.

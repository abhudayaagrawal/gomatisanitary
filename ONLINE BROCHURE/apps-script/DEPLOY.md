# Deploying the Get Catalogue backend

This is a small Google Apps Script that receives "Get Catalogue" form
submissions from the website: it saves the ID card photo to Drive, logs the
request in a sheet tab, and emails you a notification. It's independent of
your product catalogue data — any Google Sheet works as its home, even a
brand new blank one.

## 1. Open the Script Editor
1. Open the Google Sheet you want to use as the log (a new blank one is
   fine — the script creates its own "Catalogue Requests" tab automatically,
   it doesn't need any existing structure).
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
   - Description: `Gomati Catalogue Requests`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**.
5. The first time, Google will ask you to authorize the script (it needs
   access to this spreadsheet, Drive, and Gmail, since it saves ID card
   photos and sends you email notifications). Review and allow it — this is
   your own script running under your own account, so it's safe to approve.
6. Copy the **Web app URL** shown (it ends in `/exec`).

## 4. Point the website at it
In `web/.env` (copy from `web/.env.example`), set:
```
VITE_CATALOGUE_REQUEST_API_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```
Also add the same variable in Vercel's project settings, then redeploy the
site there.

## 5. How it works day-to-day
When someone submits the Get Catalogue form on the website:
- The ID card photo is saved to a Drive folder called **"Gomati Catalogue
  Requests"** (created automatically), named with the submitter's company.
  It's left with restricted/private sharing (not "Anyone with the link")
  since it's someone's ID document — you'll be able to open it fine while
  signed into the Google account the script runs as.
- The request (name, contact number, WhatsApp number, company, address,
  business details, and a link to the photo) is logged as a new row in a
  **"Catalogue Requests"** tab in the sheet (created automatically).
- You get an email notification at `gomatisanitary@gmail.com`. To change the
  notification address, edit `NOTIFICATION_EMAIL` in `Code.gs` and redeploy.

## If something's not working
- **No email/row after a submission:** open the Apps Script editor →
  **Executions** (left sidebar) to see the failed run and its error.
- **Redeploying code changes:** after editing `Code.gs`, use **Deploy →
  Manage deployments → edit (pencil) → New version → Deploy**. A brand new
  deployment would change the `/exec` URL (requiring you to update
  `VITE_CATALOGUE_REQUEST_API_URL` everywhere), so prefer versioning the
  existing deployment instead.

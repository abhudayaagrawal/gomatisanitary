# Deploying the Get Catalogue backend

This is a small Google Apps Script that receives "Get Catalogue" form
submissions from the website: it logs the request in a sheet tab and emails
you a notification with the ID card photo attached. It's independent of
your product catalogue data — any Google Sheet works as its home, even a
brand new blank one.

## About the permission prompt
When you deploy, Google will ask you to authorize the script. This project
deliberately declares the *narrowest* scopes that still do the job (via
`appsscript.json`, step 3 below), and deliberately avoids Drive entirely (see
the note at the top of [`Code.gs`](./Code.gs) for why), so the prompt should
only ask for two things:
- Access to **only this specific spreadsheet** (not all your Sheets)
- **Send email as you** — Apps Script's send-only mail permission; it can't
  read your inbox or contacts, only send

This is your own code (short enough to read in full) running under your own
account. If you see a *broader* prompt than the two items above, it means
step 3 (the manifest) wasn't applied — go back and redo it before
authorizing.

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

## 3. Add the manifest (narrows the permission prompt)
1. Click the gear icon (**Project Settings**) in the left sidebar.
2. Check **"Show 'appsscript.json' manifest file in editor"**.
3. Go back to the editor (left sidebar) — you'll now see `appsscript.json`
   as a file.
4. Open it, delete its contents, and paste in
   [`apps-script/appsscript.json`](./appsscript.json) from this repo.
5. Save (Ctrl+S).

## 4. Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Fill in:
   - Description: `Gomati Catalogue Requests`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**.
5. Google will ask you to authorize the script — see "About the permission
   prompt" above for what to expect. Review and allow it.
6. Copy the **Web app URL** shown (it ends in `/exec`).

## 5. Point the website at it
In `web/.env` (copy from `web/.env.example`), set:
```
VITE_CATALOGUE_REQUEST_API_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```
Also add the same variable in Vercel's project settings, then redeploy the
site there.

## 6. How it works day-to-day
When someone submits the Get Catalogue form on the website:
- The request (name, contact number, WhatsApp number, company, address,
  business details) is logged as a new row in a **"Catalogue Requests"** tab
  in the sheet (created automatically). The ID Card column just notes
  whether a photo was attached — the photo itself isn't stored anywhere by
  this script.
- You get an email notification at `gomatisanitary@gmail.com` with the ID
  card photo attached directly to that email. To change the notification
  address, edit `NOTIFICATION_EMAIL` in `Code.gs` and redeploy.

## If something's not working
- **No email/row after a submission:** open the Apps Script editor →
  **Executions** (left sidebar) to see the failed run and its error.
- **Redeploying code changes:** after editing `Code.gs` or `appsscript.json`,
  use **Deploy → Manage deployments → edit (pencil) → New version →
  Deploy**. A brand new deployment would change the `/exec` URL (requiring
  you to update `VITE_CATALOGUE_REQUEST_API_URL` everywhere), so prefer
  versioning the existing deployment instead.

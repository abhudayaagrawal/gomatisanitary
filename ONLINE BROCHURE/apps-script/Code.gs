/**
 * Gomati Sanitary — "Get Catalogue" request-form backend.
 *
 * Bind this to a Google Sheet (any sheet — it creates its own tab and
 * doesn't need any existing structure), then deploy as a Web App:
 * Extensions > Apps Script > paste this file > Deploy > New deployment >
 * Web app > Execute as: Me > Who has access: Anyone.
 * See apps-script/DEPLOY.md for the full step-by-step.
 *
 * doPost() handles "Get Catalogue" request-form submissions from the
 * website: logs the request in a "Catalogue Requests" sheet tab (created
 * automatically) and emails a notification with the ID card photo attached.
 *
 * Deliberately doesn't touch Drive at all (Apps Script's DriveApp.createFolder
 * requires the full, account-wide Drive scope no matter how the manifest is
 * configured — there's no way to narrow it) — emailing the photo as an
 * attachment instead keeps this script's permissions to just this one sheet
 * plus send-only email.
 */

var REQUESTS_SHEET_NAME = 'Catalogue Requests';
var NOTIFICATION_EMAIL = 'gomatisanitary@gmail.com';

/**
 * The website sends JSON with Content-Type: text/plain (not
 * application/json) on purpose — Apps Script web apps don't handle CORS
 * preflight requests, and a text/plain fetch is the standard workaround to
 * keep this a "simple request" the browser sends without one. doPost still
 * reads it as JSON either way.
 */
function doPost(e) {
  var result = { ok: false };
  try {
    var payload = JSON.parse(e.postData.contents);
    logCatalogueRequest(payload);
    notifyNewRequest(payload);
    result.ok = true;
  } catch (err) {
    result.error = String(err);
  }
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function logCatalogueRequest(payload) {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(REQUESTS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(REQUESTS_SHEET_NAME);
    sheet.appendRow([
      'Timestamp', 'Name', 'Company', 'Contact Number', 'WhatsApp Number',
      'Address', 'Business Details', 'ID Card'
    ]);
  }
  sheet.appendRow([
    new Date(),
    payload.name || '',
    payload.companyName || '',
    payload.contactNumber || '',
    payload.whatsappNumber || '',
    payload.address || '',
    payload.businessDetails || '',
    payload.fileBase64 ? 'Attached to notification email' : '(not attached)'
  ]);
}

function notifyNewRequest(payload) {
  var body = [
    'New catalogue request from ' + (payload.companyName || 'Unknown company') + '.',
    '',
    'Name: ' + (payload.name || ''),
    'Contact number: ' + (payload.contactNumber || ''),
    'WhatsApp number: ' + (payload.whatsappNumber || ''),
    'Address: ' + (payload.address || ''),
    'Business details: ' + (payload.businessDetails || '(not provided)'),
    'ID card: ' + (payload.fileBase64 ? 'see attachment' : '(not attached)')
  ].join('\n');

  var options = {};
  if (payload.fileBase64) {
    var bytes = Utilities.base64Decode(payload.fileBase64);
    var blob = Utilities.newBlob(bytes, payload.fileType || 'image/jpeg', payload.fileName || 'id-card');
    options.attachments = [blob];
  }

  MailApp.sendEmail(
    NOTIFICATION_EMAIL,
    'New catalogue request: ' + (payload.companyName || payload.name || ''),
    body,
    options
  );
}

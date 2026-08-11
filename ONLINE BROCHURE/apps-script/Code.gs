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
 * website: saves the submitted ID card photo to Drive, logs the request in
 * a "Catalogue Requests" sheet tab (created automatically), and emails a
 * notification.
 */

var REQUESTS_SHEET_NAME = 'Catalogue Requests';
var REQUESTS_FOLDER_NAME = 'Gomati Catalogue Requests';
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
    var driveUrl = saveIdCardImage(payload);
    logCatalogueRequest(payload, driveUrl);
    notifyNewRequest(payload, driveUrl);
    result.ok = true;
  } catch (err) {
    result.error = String(err);
  }
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveIdCardImage(payload) {
  if (!payload.fileBase64) return '';
  var bytes = Utilities.base64Decode(payload.fileBase64);
  var blob = Utilities.newBlob(bytes, payload.fileType || 'image/jpeg', payload.fileName || 'id-card');
  var folders = DriveApp.getFoldersByName(REQUESTS_FOLDER_NAME);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(REQUESTS_FOLDER_NAME);
  // Intentionally left as private/restricted (default Drive sharing) since
  // this is a customer's ID document — the business owner can open it fine
  // while signed into the Google account this script runs as.
  var file = folder.createFile(blob);
  file.setName((payload.companyName || 'Unknown') + ' - ' + file.getName());
  return file.getUrl();
}

function logCatalogueRequest(payload, driveUrl) {
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
    driveUrl
  ]);
}

function notifyNewRequest(payload, driveUrl) {
  var body = [
    'New catalogue request from ' + (payload.companyName || 'Unknown company') + '.',
    '',
    'Name: ' + (payload.name || ''),
    'Contact number: ' + (payload.contactNumber || ''),
    'WhatsApp number: ' + (payload.whatsappNumber || ''),
    'Address: ' + (payload.address || ''),
    'Business details: ' + (payload.businessDetails || '(not provided)'),
    'ID card: ' + (driveUrl || '(not attached)')
  ].join('\n');
  MailApp.sendEmail(NOTIFICATION_EMAIL, 'New catalogue request: ' + (payload.companyName || payload.name || ''), body);
}

/**
 * GMT BROCHURE — Sheet-to-Website backend.
 *
 * Deploy this as a Web App (Extensions > Apps Script, paste this file, then
 * Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone).
 * See apps-script/DEPLOY.md for the full step-by-step.
 *
 * Two independent endpoints in one script:
 *
 * - doGet() returns the live product list as JSON. NOT currently used by the
 *   website (the public catalogue browser was removed in favor of a gated
 *   request form) — left in place in case it's useful for an internal tool
 *   later. In-cell product images are expensive to re-host (must download +
 *   re-upload each one), so that work is cached: each call only processes
 *   images that are new or changed since the last sync.
 *
 * - doPost() handles "Get Catalogue" request-form submissions from the
 *   website: saves the submitted ID card photo to Drive, logs the request in
 *   a "Catalogue Requests" sheet tab, and emails a notification.
 */

var SHEET_NAME = 'MASTER';
var IMAGE_CACHE_SHEET_NAME = '_ImageCache';
var IMAGE_FOLDER_NAME = 'GMT Brochure - Web Images';
// Kept small because each new image requires a network fetch (UrlFetchApp
// has no configurable timeout in Apps Script, and can occasionally take a
// long time on a single slow/large image) — a smaller cap bounds how long
// any one "Sync Now" call can possibly take, at the cost of needing a few
// more clicks to fully backfill a large catalogue.
var MAX_NEW_IMAGES_PER_CALL = 8;

var REQUESTS_SHEET_NAME = 'Catalogue Requests';
var REQUESTS_FOLDER_NAME = 'Gomati Catalogue Requests';
var NOTIFICATION_EMAIL = 'gomatisanitary@gmail.com';

var COLUMN_ALIASES = {
  code: ['CODE'],
  name: ['PRODUCT DESCRIPTION'],
  unit: ['UOM'],
  group: ['GROUP'],
  subgroup: ['SUBGROUP'],
  material: ['MATERIAL'],
  qtyPerCarton: ['QTY/CTN'],
  qtyPerBox: ['QTY/BOX'],
  otherInfo: ['OTHER INFO']
};

function doGet(e) {
  var debug = !!(e && e.parameter && e.parameter.debug);
  // Normal syncs only fetch/hash codes that have never been cached, so a
  // sync stays fast no matter how large the catalogue grows. Detecting a
  // *replaced* photo on an already-cached code requires the explicit
  // "Publish All Images Now" bulk pass (forceRecheck) instead.
  var result = buildCatalogue(undefined, debug, false);
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles "Get Catalogue" form submissions. The website sends JSON with
 * Content-Type: text/plain (not application/json) on purpose — Apps Script
 * web apps don't handle CORS preflight requests, and a text/plain fetch is
 * the standard workaround to keep this a "simple request" the browser sends
 * without a preflight. doPost still reads it as JSON either way.
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

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('GMT Brochure')
    .addItem('Publish All Images Now', 'publishAllImages')
    .addToUi();
}

/**
 * Menu action: force a full pass over every row, no per-call image cap,
 * re-checking already-cached codes too (so replaced photos are picked up).
 */
function publishAllImages() {
  try {
    var result = buildCatalogue(Infinity, false, true);
    SpreadsheetApp.getUi().alert(
      'Publish complete. ' + result.meta.imagesProcessedThisRun +
      ' image(s) uploaded/updated out of ' + result.products.length + ' product(s).'
    );
  } catch (err) {
    // Progress is saved every 25 images as it goes, so on a large catalogue
    // it's normal for this to hit Apps Script's execution time limit before
    // finishing — just run "Publish All Images Now" again to pick up where
    // it left off.
    SpreadsheetApp.getUi().alert(
      'Stopped early (' + err + '). Progress up to this point is saved — run ' +
      '"Publish All Images Now" again to continue.'
    );
  }
}

function buildCatalogue(maxNewImages, debug, forceRecheck) {
  if (maxNewImages === undefined) maxNewImages = MAX_NEW_IMAGES_PER_CALL;

  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  if (!sheet) {
    return { generatedAt: new Date().toISOString(), products: [], meta: { error: 'Sheet "' + SHEET_NAME + '" not found' } };
  }

  var range = sheet.getDataRange();
  var values = range.getValues();
  if (values.length < 2) {
    return { generatedAt: new Date().toISOString(), products: [], meta: { imagesProcessedThisRun: 0 } };
  }

  var headerRow = values[0];
  var colIndex = mapColumns(headerRow);
  var pictureColIdx = findColumnIndex(headerRow, ['PICTURE']);

  var cache = loadImageCache();
  var imagesProcessedThisRun = 0;
  var cacheDirty = false;

  var debugInfo = null;
  if (debug) {
    debugInfo = { headerRow: headerRow, pictureColIdx: pictureColIdx };
    var sampleRowIdx = -1;
    for (var i = 1; i < values.length; i++) {
      if (colIndex.code >= 0 && String(values[i][colIndex.code] || '').trim()) {
        sampleRowIdx = i;
        break;
      }
    }
    debugInfo.sampleRowIdx = sampleRowIdx;
    if (pictureColIdx >= 0 && sampleRowIdx >= 0) {
      var sampleCell = sheet.getRange(sampleRowIdx + 1, pictureColIdx + 1);
      var sampleValue = sampleCell.getValue();
      debugInfo.sampleValueJsType = typeof sampleValue;
      debugInfo.sampleHasGetContentUrl = !!(sampleValue && typeof sampleValue.getContentUrl === 'function');
      debugInfo.samplePreview = typeof sampleValue === 'string' ? sampleValue.substring(0, 200) : String(sampleValue);
      debugInfo.sampleFormula = sampleCell.getFormula();
    }
    debugInfo.floatingImagesOnSheet = sheet.getImages().length;
  }

  var products = [];
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var code = colIndex.code >= 0 ? String(row[colIndex.code] || '').trim() : '';
    if (!code) continue; // skip blank rows

    var product = {
      code: code,
      name: getCell(row, colIndex.name),
      unit: getCell(row, colIndex.unit),
      group: getCell(row, colIndex.group),
      subgroup: getCell(row, colIndex.subgroup),
      material: getCell(row, colIndex.material),
      qtyPerCarton: getCell(row, colIndex.qtyPerCarton),
      qtyPerBox: getCell(row, colIndex.qtyPerBox),
      otherInfo: getCell(row, colIndex.otherInfo),
      imageUrl: cache[code] ? cache[code].url : ''
    };

    var needsCheck = pictureColIdx >= 0 && imagesProcessedThisRun < maxNewImages && (forceRecheck || !cache[code]);
    if (needsCheck) {
      var canProcess = resolveImage(sheet, r + 1, pictureColIdx + 1, code, cache);
      if (canProcess === 'processed') {
        imagesProcessedThisRun++;
        cacheDirty = true;
        product.imageUrl = cache[code].url;

        // Flush periodically so a long bulk run (e.g. "Publish All Images Now")
        // doesn't lose all its progress if it hits Apps Script's execution
        // time limit before finishing every row.
        if (imagesProcessedThisRun % 25 === 0) {
          saveImageCache(cache);
          cacheDirty = false;
        }
      } else if (canProcess === 'unchanged') {
        product.imageUrl = cache[code].url;
      }
    }

    products.push(product);
  }

  if (cacheDirty) saveImageCache(cache);

  var meta = { imagesProcessedThisRun: imagesProcessedThisRun };
  if (debugInfo) meta.debug = debugInfo;

  return {
    generatedAt: new Date().toISOString(),
    products: products,
    meta: meta
  };
}

/** Returns 'processed' | 'unchanged' | 'skipped' (no image in cell / not an image). */
function resolveImage(sheet, row, col, code, cache) {
  var cell = sheet.getRange(row, col);
  var value = cell.getValue();

  var isImage = value && typeof value.getContentUrl === 'function';
  if (!isImage) return 'skipped';

  var contentUrl = value.getContentUrl();
  if (!contentUrl) return 'skipped';

  var response = UrlFetchApp.fetch(contentUrl, { muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) return 'skipped';
  var blob = response.getBlob();

  var digest = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, blob.getBytes());
  var md5 = digest.map(function (b) {
    return ('0' + (b & 0xFF).toString(16)).slice(-2);
  }).join('');

  var cached = cache[code];
  if (cached && cached.md5 === md5) return 'unchanged';

  var folder = getOrCreateImageFolder();
  var file;
  if (cached && cached.driveFileId) {
    // Drive file content is immutable in place, so replace it: trash the old
    // file and create a new one below with the same product code as its name.
    file = DriveApp.getFileById(cached.driveFileId);
    file.setTrashed(true);
  }
  blob.setName(code);
  var newFile = folder.createFile(blob);
  newFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  cache[code] = {
    driveFileId: newFile.getId(),
    md5: md5,
    url: 'https://drive.google.com/uc?export=view&id=' + newFile.getId()
  };

  return 'processed';
}

function getOrCreateImageFolder() {
  var folders = DriveApp.getFoldersByName(IMAGE_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(IMAGE_FOLDER_NAME);
}

function getImageCacheSheet() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(IMAGE_CACHE_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(IMAGE_CACHE_SHEET_NAME);
    sheet.hideSheet();
    sheet.appendRow(['CODE', 'DRIVE_FILE_ID', 'MD5', 'URL']);
  }
  return sheet;
}

function loadImageCache() {
  var sheet = getImageCacheSheet();
  var values = sheet.getDataRange().getValues();
  var cache = {};
  for (var i = 1; i < values.length; i++) {
    var code = values[i][0];
    if (!code) continue;
    cache[code] = { driveFileId: values[i][1], md5: values[i][2], url: values[i][3] };
  }
  return cache;
}

function saveImageCache(cache) {
  var sheet = getImageCacheSheet();
  sheet.getRange(2, 1, Math.max(sheet.getMaxRows() - 1, 1), 4).clearContent();
  var rows = [];
  for (var code in cache) {
    rows.push([code, cache[code].driveFileId, cache[code].md5, cache[code].url]);
  }
  if (rows.length) sheet.getRange(2, 1, rows.length, 4).setValues(rows);
}

function mapColumns(headerRow) {
  var result = {};
  for (var key in COLUMN_ALIASES) {
    result[key] = findColumnIndex(headerRow, COLUMN_ALIASES[key]);
  }
  return result;
}

function findColumnIndex(headerRow, aliases) {
  for (var i = 0; i < headerRow.length; i++) {
    var header = String(headerRow[i] || '').trim().toUpperCase();
    for (var j = 0; j < aliases.length; j++) {
      if (header === aliases[j]) return i;
    }
  }
  return -1;
}

function getCell(row, idx) {
  if (idx === undefined || idx < 0) return '';
  var v = row[idx];
  return v === null || v === undefined ? '' : String(v).trim();
}

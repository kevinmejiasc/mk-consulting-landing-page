/**
 * Gamma Tech Group — Lead capture endpoint
 * Receives form submissions from the landing page and appends them to a Google Sheet.
 *
 * ── SETUP (one time) ─────────────────────────────────────────────
 * 1. Create a Google Sheet (e.g. "Gamma Tech Group — Leads").
 * 2. In that sheet: Extensions → Apps Script. Delete any starter code, paste THIS file.
 * 3. Set SHEET_ID below to your sheet's ID — the long string in the sheet URL:
 *      https://docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit
 * 4. Click Deploy → New deployment → gear icon → "Web app".
 *      - Description:      Gamma lead endpoint
 *      - Execute as:       Me
 *      - Who has access:   Anyone
 *    Click Deploy, authorize when prompted, and COPY the "Web app URL".
 * 5. Paste that URL into SHEETS_ENDPOINT in index.html.
 *
 * To test: open the Web app URL in a browser — you should see the "live" message
 * from doGet() below. Submit the form once and confirm a row appears in the sheet.
 * After any code change here you must re-deploy (Deploy → Manage deployments → Edit → Version: New).
 */

const SHEET_ID   = 'PASTE_YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.openById(SHEET_ID);
    let   sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // Write a header row the first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Revenue', 'Industry', 'Friction', 'Why now', 'Other']);
    }

    sheet.appendRow([
      new Date(),
      data.name     || '',
      data.email    || '',
      data.phone    || '',
      data.revenue  || '',
      data.industry || '',
      data.friction || '',
      data.whynow   || '',
      data.other    || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Gamma Tech Group lead endpoint is live.');
}

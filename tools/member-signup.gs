/**
 * STEM-med member sign-up -> Google Sheet
 *
 * This runs in Google Apps Script (not on the website). It receives sign-ups
 * from member.html and adds each one as a row in a Google Sheet.
 *
 * ONE-TIME SETUP (about 5 minutes):
 *  1. Create a new Google Sheet, e.g. "STEM-med Members".
 *  2. In the sheet: Extensions > Apps Script.
 *  3. Delete what's there, paste this whole file, and click Save.
 *  4. Click Deploy > New deployment. Click the gear icon, choose "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Click Deploy, then Authorize access and approve with your Google account.
 *  5. Copy the "Web app URL" (ends in /exec).
 *  6. Paste it into SIGNUP_ENDPOINT at the top of member.js, commit, and push.
 *
 * "Anyone" only lets people SEND sign-ups. Nobody can read the sheet
 * unless you share it with them.
 *
 * If you edit this script later, use Deploy > Manage deployments > Edit >
 * Version: New version, so the same URL keeps working.
 */

const SHEET_NAME = 'Members';
const INTEREST_COLUMNS = ['Writing for STEM-med Stories', 'Health Projects'];
const HEADERS = ['Signed up', 'Name', 'Email', 'School / organization', 'Newsletter']
  .concat(INTEREST_COLUMNS);

function doPost(e) {
  const p = e.parameter;

  // Spam trap: real people never fill in this hidden field
  if (p.website) return done();

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    const picked = e.parameters.interests || [];
    sheet.appendRow([
      new Date(),
      clean(p.name),
      clean(p.email),
      clean(p.school),
      p.consent === 'yes' ? 'Yes' : 'No',
    ].concat(INTEREST_COLUMNS.map(name => picked.indexOf(name) !== -1 ? 'Yes' : '')));
  } finally {
    lock.releaseLock();
  }
  return done();
}

// Trim, cap length, and stop text like "=SUM(...)" from running as a formula
function clean(value) {
  const text = String(value || '').trim().slice(0, 200);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function done() {
  return ContentService.createTextOutput('ok');
}

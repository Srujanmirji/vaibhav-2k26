/**
 * GOOGLE APPS SCRIPT CODE (MULTI-SHEET BY EVENT) - HYPER OPTIMIZED
 *
 * Features: Global object caching, O(1) duplicate checks, batched API writes, 
 * extended cache TTL, and a ping route for cold-start prevention.
 */

let globalSheetCache = {}; // Fix 1: Cache spreadsheet objects in memory

const DEFAULT_SHEET_NAME = 'Sheet1';
const EVENT_DATE_LABEL = 'March 27-28, 2026';
const USER_REGISTRATIONS_CACHE_PREFIX = 'user_registrations:';
const USER_REGISTRATIONS_CACHE_TTL_SECONDS = 7200; // Fix 4: Increased TTL
const ADMIN_REGISTRATIONS_CACHE_KEY = 'admin_all_registrations';
const ADMIN_REGISTRATIONS_CACHE_TTL_SECONDS = 7200; // Fix 4: Increased TTL
const USER_INDEX_PROPERTY_PREFIX = 'user_index:';

// ADD YOUR MASTER SPREADSHEET ID HERE FOR A COMBINED COPY OF ALL REGISTRATIONS
const MAIN_SPREADSHEET_ID = '10ea7M_hhVJPDS1L7cMnH3xeFrZEq00_-TadKXvW8YzQ';

const ADMIN_ALLOWED_EMAILS = [
  'vaibhav2k26jcet@gmail.com',
  'srujanmirji10@gmail.com',
  'jcetvaibhav@gmail.com',
  'prajwaljinagi63@gmail.com',
  'dharwadzishan@gmail.com',
  'sachitsarangamath44@gmail.com'
];

// Fix 5: Pre-normalize admin emails for faster checking
const ADMIN_ALLOWED_EMAILS_NORMALIZED = ADMIN_ALLOWED_EMAILS.map(e => String(e).toLowerCase().trim());

const EVENT_SHEET_MAP = {
  e2: { spreadsheetId: '1VnBiox2fD8hO3M4cQH90TozkEEHNAk8Z_AHVcxCe7w8', sheetName: 'Sheet1' },
  e3: { spreadsheetId: '1_Jppe15kIt6rgPFm9z9Z8KJBHfyGbdfjZR7zJXTb9LU', sheetName: 'Sheet1' },
  e4: { spreadsheetId: '1o31pM9TWeixE6vPcYUVrvb_PbhM7bmf0xSsl2PhkSBM', sheetName: 'Sheet1' },
  e5: { spreadsheetId: '1oRCLdP4drIT_aPdUILhW-9AfNzsynFGdDxiufLycQ9Y', sheetName: 'Sheet1' },
  e6: { spreadsheetId: '17BAD5CBBtcMHNJEazb-epppJoazGsKd62vZuL_9-cuc', sheetName: 'Sheet1' },
  e7: { spreadsheetId: '1JxcVaYAbMFPCmtC61PqapNoqXUogIs_Ab22dLc1PQjs', sheetName: 'Sheet1' },
  e8: { spreadsheetId: '12zsrckESHgKTrg804KEENUmAMCMR86d2vKem8jD0OYc', sheetName: 'Sheet1' },
  e9: { spreadsheetId: '1X3cJt_vKRPZJJ16wWsGbzF0lmWG8cIUIQap_MU6wzHw', sheetName: 'Sheet1' },
  e13: { spreadsheetId: '1CLTK4aMGGdGzaXg9qk_WwJa5-W0s92r_XUPx4BVsIsA', sheetName: 'Sheet1' },
  e14: { spreadsheetId: '1wiokWotdzXmcdVSLzblY6VfhbwmlvPHRd2p_uaBCEpw', sheetName: 'Sheet1' },
  e15: { spreadsheetId: '1OfeY3JCuNQFmACNluKG7QmRORY8WFptcgQjD2eZK1vQ', sheetName: 'Sheet1' },
  e16: { spreadsheetId: '1sX7T4aN324NJpSc5gnAoZYeOzAEAY-y_nhV-Ki37ySo', sheetName: 'Sheet1' },
  e17: { spreadsheetId: '1hVXYSe4IJbbfFVkPG2Xv_PTe_mUizHGqBcZrssMZtLI', sheetName: 'Sheet1' },
  e18: { spreadsheetId: '1PrbQ5-CedLDepaHAAzRK5BRDfNdDp2yTgBoNfbZfvJs', sheetName: 'Sheet1' },
  e19: { spreadsheetId: '1Ep8YGX4YyeQuHT8joopBV5l7zW67bMcy6b2m9mY7iZ0', sheetName: 'Sheet1' },
  e20: { spreadsheetId: '1jZ5GXfeuqNZK4hdSdSPLycFEWJP1goe3T9_C3u9USyU', sheetName: 'Sheet1' },
  e21: { spreadsheetId: '1a2QtQ9UpD6gCICtll_9HS0aeVuSwsAv7mbEMfFIlaQo', sheetName: 'Sheet1' },
  e23: { spreadsheetId: '1DPwxrchkyrDlytQouSlsihyHS1uCDOIF2-XLCnQ6x1M', sheetName: 'Sheet1' },
  e25: { spreadsheetId: '11xUntqxbKpXPFlyIokODolk_7QRExPZ7Ox35jR_Ylss', sheetName: 'Dance Mania' }
};

const EVENT_ID_TO_TITLE = {
  e2: 'Project Pitch Day',
  e3: 'AI in EV',
  e4: 'Cooking Without Fire',
  e5: 'Blind Fold Taste Test',
  e6: 'Survey Hunt',
  e7: 'Art Gallery',
  e8: 'Spot Acting Battle',
  e9: 'Laugh Logic Loot',
  e13: 'AI Prompt Battle',
  e14: 'Tallest Tower Challenge',
  e15: 'Buildathon',
  e16: 'Awareness In Cinematic Campus Video (Social Cause)',
  e17: 'Meme Challenge',
  e18: 'Game Zone',
  e19: 'Circuit Mania',
  e20: 'Dialogue Delivery Battle',
  e21: 'Minute Master',
  e23: 'Melody Mania',
  e25: 'Dance Mania'
};

const EVENT_ID_TO_DATE = {
  e2: 'March 27, 2026',
  e3: 'March 27, 2026',
  e4: 'March 27, 2026',
  e5: 'March 27, 2026',
  e6: 'March 27, 2026',
  e7: 'March 27, 2026',
  e8: 'March 27, 2026',
  e9: 'March 27, 2026',
  e13: 'March 28, 2026',
  e14: 'March 28, 2026',
  e15: 'March 28, 2026',
  e16: 'March 28, 2026',
  e17: 'March 28, 2026',
  e18: 'March 28, 2026',
  e19: 'March 28, 2026',
  e20: 'March 28, 2026',
  e21: 'March 28, 2026',
  e23: 'March 28, 2026',
  e25: 'March 28, 2026'
};

const EVENT_TITLE_TO_ID = {
  projectpitchday: 'e2',
  aiinev: 'e3',
  cookingwithoutfire: 'e4',
  blindfoldtastetest: 'e5',
  surveyhunt: 'e6',
  artgallery: 'e7',
  spotactingbattle: 'e8',
  laughlogicloot: 'e9',
  aipromptbattle: 'e13',
  tallesttowerchallenge: 'e14',
  buildathon: 'e15',
  socialawarenessvideocontest: 'e16',
  awarenessincinematiccampusvideosocialcause: 'e16',
  memechallenge: 'e17',
  gamezone: 'e18',
  circuitmania: 'e19',
  circuitmaina: 'e19',
  dialoguedeliverybattle: 'e20',
  minutemaster: 'e21',
  melodymaniaanddanceinfusion: 'e23',
  melodymania: 'e23',
  dancemania: 'e25'
};

function doGet(e) {
  try {
    const action = normalizeString_((e && e.parameter && e.parameter.action) || '').toLowerCase();
    const callback = (e && e.parameter && e.parameter.callback) || '';

    // Cold-start prevention ping route
    if (action === 'ping') {
      CacheService.getScriptCache().put("ping", "1", 60);
      return createJSONOutput_({ status: 'success', message: 'pong' }, callback);
    }

    if (action === 'getallregistrations') {
      const adminEmail = normalizeString_((e && e.parameter && e.parameter.adminEmail) || '').toLowerCase();
      const forceRefresh = isTruthy_((e && e.parameter && e.parameter.forceRefresh) || '');

      if (!isAdminAllowed_(adminEmail)) {
        return createJSONOutput_({ status: 'error', message: 'Unauthorized admin access.' }, callback);
      }

      if (!forceRefresh) {
        const cachedAdminRows = readScriptCacheJSON_(ADMIN_REGISTRATIONS_CACHE_KEY);
        if (cachedAdminRows && Array.isArray(cachedAdminRows.data)) {
          return createJSONOutput_({ status: 'success', data: cachedAdminRows.data }, callback);
        }
      }

      const allRows = [];
      const useMainSheet = MAIN_SPREADSHEET_ID && MAIN_SPREADSHEET_ID !== 'YOUR_MAIN_SPREADSHEET_ID_HERE';

      if (useMainSheet) {
        const mainSheet = getSheet_(MAIN_SPREADSHEET_ID, DEFAULT_SHEET_NAME);
        const lastRow = mainSheet.getLastRow();

        if (lastRow > 1) {
          const rows = mainSheet.getRange(2, 1, lastRow - 1, 15).getValues();
          rows.forEach(function (row) {
            const eventId = normalizeString_(row[8]);
            const eventTitle = normalizeString_(row[7]) || EVENT_ID_TO_TITLE[eventId] || eventId;
            allRows.push({
              timestamp: formatTimestamp_(row[0]),
              fullName: normalizeString_(row[1]),
              email: normalizeString_(row[2]).toLowerCase(),
              phone: normalizeString_(row[3]),
              college: normalizeString_(row[4]),
              department: normalizeString_(row[5]),
              year: normalizeString_(row[6]),
              eventTitle: eventTitle,
              eventId: eventId,
              eventDate: EVENT_ID_TO_DATE[eventId] || EVENT_DATE_LABEL,
              registrationId: normalizeString_(row[9]),
              razorpayPaymentId: normalizeString_(row[10]),
              teamName: normalizeString_(row[12]),
              teamMembers: normalizeString_(row[13]),
              registrationType: normalizeString_(row[14]) || (normalizeString_(row[12]) ? 'Group' : 'Solo'),
            });
          });
        }
      } else {
        const eventIds = Object.keys(EVENT_SHEET_MAP);
        eventIds.forEach(function (eventId) {
          const config = EVENT_SHEET_MAP[eventId];
          if (!config || !isSpreadsheetConfigured_(config.spreadsheetId)) return;

          const sheet = getSheet_(config.spreadsheetId, config.sheetName || DEFAULT_SHEET_NAME);
          const lastRow = sheet.getLastRow();
          if (lastRow < 2) return;

          const rows = sheet.getRange(2, 1, lastRow - 1, 15).getValues();
          rows.forEach(function (row) {
            const eventTitle = normalizeString_(row[7]) || EVENT_ID_TO_TITLE[eventId] || eventId;
            allRows.push({
              timestamp: formatTimestamp_(row[0]), fullName: normalizeString_(row[1]), email: normalizeString_(row[2]).toLowerCase(), phone: normalizeString_(row[3]), college: normalizeString_(row[4]), department: normalizeString_(row[5]), year: normalizeString_(row[6]), eventTitle: eventTitle, eventId: normalizeString_(row[8]) || eventId, eventDate: EVENT_ID_TO_DATE[eventId] || EVENT_DATE_LABEL, registrationId: normalizeString_(row[9]), razorpayPaymentId: normalizeString_(row[10]), teamName: normalizeString_(row[12]), teamMembers: normalizeString_(row[13]), registrationType: normalizeString_(row[14]) || (normalizeString_(row[12]) ? 'Group' : 'Solo')
            });
          });
        });
      }

      allRows.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      writeScriptCacheJSON_(ADMIN_REGISTRATIONS_CACHE_KEY, { data: allRows }, ADMIN_REGISTRATIONS_CACHE_TTL_SECONDS);
      return createJSONOutput_({ status: 'success', data: allRows }, callback);
    }

    if (action !== 'getregistrations') {
      return createJSONOutput_({ status: 'success', message: 'Server is running' }, callback);
    }

    const email = normalizeString_((e && e.parameter && e.parameter.email) || '').toLowerCase();
    const forceRefresh = isTruthy_((e && e.parameter && e.parameter.forceRefresh) || '');
    if (!email) return createJSONOutput_({ status: 'error', message: 'Email is required.' }, callback);

    if (!forceRefresh) {
      const indexedRegistrations = readUserRegistrationsIndex_(email);
      if (indexedRegistrations) return createJSONOutput_({ status: 'success', data: indexedRegistrations }, callback);

      const cachedUserRows = readScriptCacheJSON_(getUserRegistrationsCacheKey_(email));
      if (cachedUserRows && Array.isArray(cachedUserRows.data)) {
        return createJSONOutput_({ status: 'success', data: cachedUserRows.data }, callback);
      }
    }

    const allRegistrations = [];
    const useMainSheet = MAIN_SPREADSHEET_ID && MAIN_SPREADSHEET_ID !== 'YOUR_MAIN_SPREADSHEET_ID_HERE';

    if (useMainSheet) {
      const mainSheet = getSheet_(MAIN_SPREADSHEET_ID, DEFAULT_SHEET_NAME);
      const lastRow = mainSheet.getLastRow();
      if (lastRow > 1) {
        const data = mainSheet.getRange(2, 1, lastRow - 1, 15).getValues();
        data.forEach(function (row) {
          if (normalizeString_(row[2]).toLowerCase() === email) {
            allRegistrations.push({
              id: normalizeString_(row[8]), title: normalizeString_(row[7]), date: EVENT_ID_TO_DATE[row[8]] || EVENT_DATE_LABEL
            });
          }
        });
      }
    } else {
      Object.keys(EVENT_SHEET_MAP).forEach(function (eventId) {
        const config = EVENT_SHEET_MAP[eventId];
        if (!config || !isSpreadsheetConfigured_(config.spreadsheetId)) return;
        const sheet = getSheet_(config.spreadsheetId, config.sheetName || DEFAULT_SHEET_NAME);
        const lastRow = sheet.getLastRow();
        if (lastRow < 2) return;
        const matchingRow = getFirstMatchingRegistrationRow_(sheet, lastRow, email);
        if (!matchingRow) return;
        allRegistrations.push({
          id: normalizeString_(matchingRow[8]) || eventId, title: normalizeString_(matchingRow[7]) || EVENT_ID_TO_TITLE[eventId] || eventId, date: EVENT_ID_TO_DATE[eventId] || EVENT_DATE_LABEL
        });
      });
    }

    const deduped = dedupeRegistrations_(allRegistrations);
    writeUserRegistrationsIndex_(email, deduped);
    writeScriptCacheJSON_(getUserRegistrationsCacheKey_(email), { data: deduped }, USER_REGISTRATIONS_CACHE_TTL_SECONDS);
    return createJSONOutput_({ status: 'success', data: deduped }, callback);

  } catch (error) {
    return createJSONOutput_({ status: 'error', message: error.toString() }, callback || '');
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    if (!e || !e.postData || !e.postData.contents) return createJSONOutput_({ status: 'error', message: 'Missing request body.' });

    const data = JSON.parse(e.postData.contents);
    const action = normalizeString_(data.action || 'register').toLowerCase();

    if (action !== 'register') return createJSONOutput_({ status: 'error', message: 'Invalid action.' });

    const email = normalizeString_(data.email).toLowerCase();
    const selectedEvents = normalizeEvents_(data);

    if (!email || selectedEvents.length === 0) return createJSONOutput_({ status: 'error', message: 'Email and at least one event are required.' });

    const insertedEvents = [];
    const skippedEvents = [];

    const useMainSheet = MAIN_SPREADSHEET_ID && MAIN_SPREADSHEET_ID !== 'YOUR_MAIN_SPREADSHEET_ID_HERE' && MAIN_SPREADSHEET_ID !== '';
    let mainSheet = null;
    const rowsToAppendToMainSheet = [];
    const eventSheetWrites = {};
    const registeredSet = new Set();

    if (useMainSheet) {
      mainSheet = getSheet_(MAIN_SPREADSHEET_ID, DEFAULT_SHEET_NAME);
      const lastRow = mainSheet.getLastRow();
      if (lastRow > 1) {
        const mainSheetData = mainSheet.getRange(2, 3, lastRow - 1, 7).getValues();
        mainSheetData.forEach(row => {
          registeredSet.add(normalizeString_(row[0]).toLowerCase() + '|' + normalizeString_(row[6]).toLowerCase());
        });
      }
    }

    selectedEvents.forEach(function (eventEntry) {
      const resolved = resolveEvent_(eventEntry);
      let alreadyRegistered = false;

      if (useMainSheet) {
        alreadyRegistered = registeredSet.has(email + '|' + resolved.eventId.toLowerCase());
      } else {
        const sheet = getSheet_(resolved.spreadsheetId, resolved.sheetName);
        alreadyRegistered = hasEmailInSheet_(sheet, sheet.getLastRow(), email);
      }

      if (alreadyRegistered) {
        skippedEvents.push(resolved.eventTitle);
        return;
      }

      const paymentId = normalizeString_(data.razorpayPaymentId) || '';
      const paymentLink = paymentId ? 'https://dashboard.razorpay.com/app/payments/' + paymentId : '';

      const row = [
        new Date(), normalizeString_(data.fullName), email, "'" + normalizeString_(data.phone), normalizeString_(data.college), normalizeString_(data.department), normalizeString_(data.year), resolved.eventTitle, resolved.eventId, normalizeString_(data.registrationId) || ('VBHV-' + resolved.eventId.toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000)), paymentId, paymentLink, normalizeString_(data.teamName), normalizeString_(data.teamMembers), normalizeString_(data.registrationType) || (normalizeString_(data.teamName) ? 'Group' : 'Solo')
      ];

      const sheetKey = resolved.spreadsheetId + ':' + resolved.sheetName;
      if (!eventSheetWrites[sheetKey]) {
        eventSheetWrites[sheetKey] = { sheet: getSheet_(resolved.spreadsheetId, resolved.sheetName), rows: [] };
      }
      eventSheetWrites[sheetKey].rows.push(row);

      if (useMainSheet) rowsToAppendToMainSheet.push(row);

      insertedEvents.push({ id: resolved.eventId, title: resolved.eventTitle, date: EVENT_ID_TO_DATE[resolved.eventId] || EVENT_DATE_LABEL });
      registeredSet.add(email + '|' + resolved.eventId.toLowerCase());
    });

    Object.keys(eventSheetWrites).forEach(key => {
      const writeData = eventSheetWrites[key];
      const targetSheet = writeData.sheet;
      const lastRow = targetSheet.getLastRow();
      targetSheet.getRange(lastRow + 1, 1, writeData.rows.length, writeData.rows[0].length).setValues(writeData.rows);
    });

    if (useMainSheet && rowsToAppendToMainSheet.length > 0) {
      try {
        const startRow = mainSheet.getLastRow() + 1;
        mainSheet.getRange(startRow, 1, rowsToAppendToMainSheet.length, rowsToAppendToMainSheet[0].length)
          .setValues(rowsToAppendToMainSheet);
      } catch (mainSheetError) {
        console.error("Failed to append to main spreadsheet: " + mainSheetError);
      }
    }

    if (insertedEvents.length === 0) return createJSONOutput_({ status: 'error', message: 'You are already registered for the selected event(s).' });

    updateUserRegistrationsIndex_(email, insertedEvents);
    clearRegistrationsCaches_(email);
    sendConfirmationEmail_(data, insertedEvents, skippedEvents);

    const message = skippedEvents.length > 0
      ? 'Registration successful for ' + insertedEvents.length + ' event(s). Skipped ' + skippedEvents.length + ' already-registered event(s).'
      : 'Registration successful for ' + insertedEvents.length + ' event(s).';

    return createJSONOutput_({ status: 'success', message: message });
  } catch (error) {
    return createJSONOutput_({ status: 'error', message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_(spreadsheetId, sheetName) {
  const key = spreadsheetId + ":" + sheetName;
  if (!globalSheetCache[key]) {
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) throw new Error('Sheet "' + sheetName + '" not found in spreadsheet ' + spreadsheetId);
    globalSheetCache[key] = sheet;
  }
  return globalSheetCache[key];
}

function isAdminAllowed_(adminEmail) {
  if (!adminEmail) return false;
  return ADMIN_ALLOWED_EMAILS_NORMALIZED.includes(normalizeString_(adminEmail).toLowerCase());
}

function normalizeEvents_(data) {
  const normalized = [];
  if (Array.isArray(data.selectedEvents)) {
    data.selectedEvents.forEach(function (item) {
      if (typeof item === 'string') {
        normalized.push({ id: '', title: normalizeString_(item) });
        return;
      }
      if (item && typeof item === 'object') {
        normalized.push({
          id: normalizeString_(item.id || item.eventId || item.selectedEventId),
          title: normalizeString_(item.title || item.name || item.selectedEvent || item.eventTitle)
        });
      }
    });
  }
  const fallbackTitle = normalizeString_(data.selectedEvent || data.selectedEventTitle);
  const fallbackId = normalizeString_(data.selectedEventId || data.eventId);
  if (fallbackTitle || fallbackId) normalized.push({ id: fallbackId, title: fallbackTitle });
  const seen = {};
  const unique = [];
  normalized.forEach(function (eventItem) {
    const key = (eventItem.id ? 'id:' + eventItem.id.toLowerCase() : 'title:' + normalizeKey_(eventItem.title));
    if (!eventItem.id && !eventItem.title) return;
    if (seen[key]) return;
    seen[key] = true;
    unique.push(eventItem);
  });
  return unique;
}

function resolveEvent_(eventEntry) {
  const inputId = normalizeString_(eventEntry.id).toLowerCase();
  const inputTitle = normalizeString_(eventEntry.title);
  const mappedByTitle = inputTitle ? EVENT_TITLE_TO_ID[normalizeKey_(inputTitle)] : '';
  const eventId = inputId || mappedByTitle;
  if (!eventId || !EVENT_SHEET_MAP[eventId]) {
    throw new Error('No spreadsheet configured for event: ' + (inputTitle || inputId || 'unknown'));
  }
  const config = EVENT_SHEET_MAP[eventId];
  if (!isSpreadsheetConfigured_(config.spreadsheetId)) throw new Error('Spreadsheet ID not configured for event: ' + eventId);
  return {
    eventId: eventId,
    eventTitle: inputTitle || EVENT_ID_TO_TITLE[eventId] || eventId,
    spreadsheetId: config.spreadsheetId,
    sheetName: config.sheetName || DEFAULT_SHEET_NAME
  };
}

function isSpreadsheetConfigured_(spreadsheetId) {
  if (!spreadsheetId) return false;
  return spreadsheetId.indexOf('PASTE_') !== 0;
}

function formatTimestamp_(value) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) return value.toISOString();
  return normalizeString_(value);
}

function dedupeRegistrations_(rows) {
  const seen = {};
  const deduped = [];
  rows.forEach(function (entry) {
    const key = (entry.id || '') + '|' + normalizeKey_(entry.title || '');
    if (seen[key]) return;
    seen[key] = true;
    deduped.push(entry);
  });
  return deduped;
}

function getUserIndexPropertyKey_(email) {
  return USER_INDEX_PROPERTY_PREFIX + normalizeString_(email).toLowerCase();
}

function readUserRegistrationsIndex_(email) {
  const key = getUserIndexPropertyKey_(email);
  if (!key) return null;
  try {
    const raw = PropertiesService.getScriptProperties().getProperty(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return dedupeRegistrations_(parsed.map(function (entry) {
      return {
        id: normalizeString_(entry && entry.id),
        title: normalizeString_(entry && entry.title),
        date: normalizeString_(entry && entry.date)
      };
    })).filter(entry => !!entry.id || !!entry.title);
  } catch (error) {
    return null;
  }
}

function writeUserRegistrationsIndex_(email, rows) {
  const key = getUserIndexPropertyKey_(email);
  if (!key) return;
  try {
    const normalizedRows = dedupeRegistrations_((rows || []).map(function (entry) {
      return {
        id: normalizeString_(entry && entry.id),
        title: normalizeString_(entry && entry.title),
        date: normalizeString_(entry && entry.date)
      };
    })).filter(entry => !!entry.id || !!entry.title);
    PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(normalizedRows));
  } catch (error) { }
}

function updateUserRegistrationsIndex_(email, insertedEvents) {
  const existing = readUserRegistrationsIndex_(email) || [];
  const normalizedInserted = (insertedEvents || []).map(function (eventItem) {
    const eventId = normalizeString_(eventItem && eventItem.id).toLowerCase();
    return {
      id: eventId,
      title: normalizeString_(eventItem && eventItem.title) || EVENT_ID_TO_TITLE[eventId] || eventId,
      date: normalizeString_(eventItem && eventItem.date) || EVENT_ID_TO_DATE[eventId] || EVENT_DATE_LABEL
    };
  });
  writeUserRegistrationsIndex_(email, existing.concat(normalizedInserted));
}

function getUserRegistrationsCacheKey_(email) {
  return USER_REGISTRATIONS_CACHE_PREFIX + normalizeString_(email).toLowerCase();
}

function readScriptCacheJSON_(key) {
  if (!key) return null;
  try {
    const raw = CacheService.getScriptCache().get(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function writeScriptCacheJSON_(key, value, ttlSeconds) {
  if (!key) return;
  try {
    CacheService.getScriptCache().put(key, JSON.stringify(value), ttlSeconds);
  } catch (error) { }
}

function clearRegistrationsCaches_(email) {
  try {
    const cache = CacheService.getScriptCache();
    cache.remove(getUserRegistrationsCacheKey_(email));
    cache.remove(ADMIN_REGISTRATIONS_CACHE_KEY);
  } catch (error) { }
}

function getFirstMatchingRegistrationRow_(sheet, lastRow, email) {
  if (lastRow < 2) return null;
  const match = sheet.getRange(2, 3, lastRow - 1, 1).createTextFinder(email).matchEntireCell(true).matchCase(false).findNext();
  return match ? sheet.getRange(match.getRow(), 1, 1, 9).getValues()[0] : null;
}

function hasEmailInSheet_(sheet, lastRow, email) {
  if (lastRow < 2) return false;
  return !!sheet.getRange(2, 3, lastRow - 1, 1).createTextFinder(email).matchEntireCell(true).matchCase(false).findNext();
}

function createJSONOutput_(payload, callback) {
  if (callback) return ContentService.createTextOutput(callback + '(' + JSON.stringify(payload) + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function normalizeString_(value) {
  return (value === null || value === undefined) ? '' : String(value).trim();
}

function normalizeKey_(value) {
  return normalizeString_(value).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function isTruthy_(value) {
  const normalized = normalizeString_(value).toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes';
}

function sendConfirmationEmail_(data, eventTitles, skippedEvents) {
  try {
    const email = normalizeString_(data.email);
    if (!email) return;
    const fullName = normalizeString_(data.fullName) || 'Participant';
    const regId = normalizeString_(data.registrationId) || '';
    const paymentId = normalizeString_(data.razorpayPaymentId) || '';
    const phone = normalizeString_(data.phone) || '';
    const college = normalizeString_(data.college) || '';
    const teamName = normalizeString_(data.teamName);
    const teamMembers = normalizeString_(data.teamMembers);
    const registrationType = normalizeString_(data.registrationType) || (teamName ? 'Group' : 'Solo');

    // Links & Assets
    const logoUrl = 'https://www.vaibhav2k26.online/JGI-logo-removebg-preview.png';
    const websiteUrl = 'https://www.vaibhav2k26.online';

    const subject = "🎟️ YOUR DIGITAL PASS: Vaibhav 2K26 Registration Confirmed!";

    var eventCardsHtml = '';
    eventTitles.forEach(function (eventItem) {
      var title = typeof eventItem === 'string' ? eventItem : eventItem.title;
      var date = typeof eventItem === 'string' ? EVENT_DATE_LABEL : (eventItem.date || EVENT_DATE_LABEL);
      eventCardsHtml += '<tr><td style="padding:8px 0;">'
        + '<table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,0,85,0.05);border:1px solid rgba(255,0,85,0.3);border-radius:12px;overflow:hidden;">'
        + '<tr><td style="padding:16px 20px;border-left:4px solid #FF0055;background:linear-gradient(90deg, rgba(255,0,85,0.1) 0%, transparent 100%);">'
        + '<table width="100%" cellpadding="0" cellspacing="0"><tr>'
        + '<td style="font-size:16px;font-weight:800;color:#ffffff;font-family:\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.5px;">' + title.toUpperCase() + '</td>'
        + '<td align="right" style="font-size:12px;color:#00FFFF;font-weight:700;font-family:\'Segoe UI\',sans-serif;white-space:nowrap;">📅 ' + date + '</td>'
        + '</tr></table>'
        + '</td></tr></table>'
        + '</td></tr>';
    });

    var skippedHtml = '';
    if (skippedEvents && skippedEvents.length > 0) {
      skippedHtml += '<tr><td style="padding:24px 32px 8px;">'
        + '<p style="margin:0 0 10px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#555;font-weight:800;">ALREADY SECURED</p>';
      skippedEvents.forEach(function (title) {
        skippedHtml += '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;background:#05000A;border:1px solid rgba(255,255,255,0.05);border-radius:10px;">'
          + '<tr><td style="padding:12px 16px;font-size:13px;color:#666;font-family:\'Segoe UI\',sans-serif;">' + title + ' <span style="color:#22c55e;font-size:11px;font-weight:600;">(Previously Confirmed)</span>' + '</td></tr></table>';
      });
      skippedHtml += '</td></tr>';
    }

    var htmlBody = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>'
      + '<body style="margin:0;padding:0;background-color:#05000A;font-family:\'Segoe UI\',Tahoma,Geneva,Verdana,sans-serif;-webkit-font-smoothing:antialiased;">'
      + '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#05000A;padding:40px 10px;"><tr><td align="center">'
      + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0a0015;border:1px solid rgba(255,0,85,0.2);border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.8);">'

      // Header
      + '<tr><td style="background:linear-gradient(135deg, #1a0033 0%, #05000A 100%);padding:40px 32px;text-align:center;border-bottom:1px solid rgba(255,0,85,0.1);">'
      + '<img src="' + logoUrl + '" alt="JGI Logo" width="100" style="margin-bottom:15px;filter:drop-shadow(0 0 10px rgba(255,255,255,0.2));">'
      + '<h1 style="margin:0;font-size:36px;color:#ffffff;letter-spacing:6px;text-transform:uppercase;font-weight:900;line-height:1;">VAIBHAV<span style="color:#FF0055;">2K26</span></h1>'
      + '<div style="margin-top:10px;display:inline-block;padding:4px 12px;background:rgba(0,255,255,0.1);border:1px solid rgba(0,255,255,0.3);border-radius:20px;">'
      + '<p style="margin:0;color:#00FFFF;font-size:10px;letter-spacing:3px;font-weight:800;text-transform:uppercase;">OFFICIAL DIGITAL PASS</p>'
      + '</div>'
      + '</td></tr>'

      // User Welcome
      + '<tr><td style="padding:40px 40px 10px;">'
      + '<p style="margin:0;font-size:24px;color:#ffffff;font-weight:800;">Access Granted, ' + fullName.split(' ')[0] + '!</p>'
      + '<p style="margin:12px 0 0;font-size:15px;color:#aaa;line-height:1.6;">Your journey to the most awaited tech-fest begins here. We\'ve reserved your spot among the innovators.</p>'
      + '</td></tr>'

      // Pass Section
      + '<tr><td style="padding:20px 40px;">'
      + '<table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(145deg, #110022 0%, #05000a 100%);border:1px dashed rgba(255,0,85,0.4);border-radius:20px;padding:25px;">'
      + '<tr>'
      + '<td valign="middle">'
      + '<p style="margin:0 0 5px;font-size:11px;color:#555;font-weight:800;letter-spacing:2px;text-transform:uppercase;">OFFICIAL ID</p>'
      + '<p style="margin:0 0 15px;font-size:16px;color:#FF0055;font-weight:800;font-family:monospace;letter-spacing:1px;">' + regId + '</p>'
      + '<p style="margin:0 0 5px;font-size:11px;color:#555;font-weight:800;letter-spacing:2px;text-transform:uppercase;">HOLDER</p>'
      + '<p style="margin:0 0 15px;font-size:16px;color:#fff;font-weight:700;">' + fullName + '</p>'
      + '<p style="margin:0 0 5px;font-size:11px;color:#555;font-weight:800;letter-spacing:2px;text-transform:uppercase;">MODE</p>'
      + '<p style="margin:0 0 15px;font-size:16px;color:#00FFFF;font-weight:700;">' + registrationType + '</p>'
      + '<p style="margin:0 0 5px;font-size:11px;color:#555;font-weight:800;letter-spacing:2px;text-transform:uppercase;">COLLEGE</p>'
      + '<p style="margin:0;font-size:13px;color:#eee;font-weight:600;">' + college + '</p>'
      + '</td>'
      + '</tr>'
      + '</table>'
      + '</td></tr>'

      // Events Lineup
      + '<tr><td style="padding:20px 40px 10px;">'
      + '<p style="margin:0 0 15px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#00FFFF;font-weight:800;">📍 YOUR SCHEDULED BATTLES</p>'
      + '<table width="100%" cellpadding="0" cellspacing="0">' + eventCardsHtml + '</table>'
      + '</td></tr>'

      + skippedHtml

      // Details Grid
      + '<tr><td style="padding:30px 40px;">'
      + '<table width="100%" cellpadding="15" cellspacing="0" style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:15px;">'
      + (paymentId ? '<tr><td style="border-bottom:1px solid rgba(255,255,255,0.05);color:#555;font-size:12px;font-weight:700;text-transform:uppercase;">Payment ID</td><td style="border-bottom:1px solid rgba(255,255,255,0.05);color:#22c55e;font-size:12px;font-weight:700;text-align:right;font-family:monospace;">' + paymentId + '</td></tr>' : '')
      + (teamName ? '<tr><td style="border-bottom:1px solid rgba(255,255,255,0.05);color:#555;font-size:12px;font-weight:700;text-transform:uppercase;">Team Name</td><td style="border-bottom:1px solid rgba(255,255,255,0.05);color:#FF0055;font-size:13px;font-weight:800;text-align:right;">' + teamName.toUpperCase() + '</td></tr>' : '')
      + '<tr><td style="color:#555;font-size:12px;font-weight:700;text-transform:uppercase;">Venue</td><td style="color:#fff;font-size:12px;font-weight:600;text-align:right;">Jain College (JCET) Hubballi</td></tr>'
      + '</table>'
      + '</td></tr>'

      // Footer
      + '<tr><td style="padding:0 40px 40px;text-align:center;">'
      + '<p style="margin:0;font-size:13px;color:#444;">Questions? Reach us at <a href="mailto:vaibhav2k26jcet@gmail.com" style="color:#FF0055;text-decoration:none;">vaibhav2k26jcet@gmail.com</a></p>'
      + '<p style="margin:15px 0 0;font-size:11px;color:#222;text-transform:uppercase;letter-spacing:2px;">&copy; 2026 VAIBHAV JCET HUBBALLI. ALL RIGHTS RESERVED.</p>'
      + '</td></tr>'

      + '</table>'
      + '</td></tr></table>'
      + '</body></html>';

    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });

  } catch (error) {
    console.error('Email Dispatch Error: ' + error.toString());
  }
}

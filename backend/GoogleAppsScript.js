/**
 * GOOGLE APPS SCRIPT CODE (MULTI-SHEET BY EVENT)
 *
 * Each event writes to its own Google Spreadsheet.
 */

const DEFAULT_SHEET_NAME = 'Sheet1';
const EVENT_DATE_LABEL = 'March 27-28, 2026';
const USER_REGISTRATIONS_CACHE_PREFIX = 'user_registrations:';
const USER_REGISTRATIONS_CACHE_TTL_SECONDS = 1800;
const ADMIN_REGISTRATIONS_CACHE_KEY = 'admin_all_registrations';
const ADMIN_REGISTRATIONS_CACHE_TTL_SECONDS = 1800;
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
  e23: { spreadsheetId: '1DPwxrchkyrDlytQouSlsihyHS1uCDOIF2-XLCnQ6x1M', sheetName: 'Sheet1' }
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
  e16: 'Social Awareness Video Contest',
  e17: 'Meme Challenge',
  e18: 'Game Zone',
  e19: 'Circuit Mania',
  e20: 'Dialogue Delivery Battle',
  e21: 'Minute Master',
  e23: 'Melody Mania & Dance Infusion'
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
  e23: 'March 28, 2026'
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
  memechallenge: 'e17',
  gamezone: 'e18',
  circuitmania: 'e19',
  circuitmaina: 'e19',
  dialoguedeliverybattle: 'e20',
  minutemaster: 'e21',
  melodymaniaanddanceinfusion: 'e23',
  mealodymaniaanddanceinfusion: 'e23'
};

function doGet(e) {
  try {
    const action = normalizeString_((e && e.parameter && e.parameter.action) || '').toLowerCase();
    const callback = (e && e.parameter && e.parameter.callback) || '';

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
      const eventIds = Object.keys(EVENT_SHEET_MAP);

      eventIds.forEach(function (eventId) {
        const config = EVENT_SHEET_MAP[eventId];
        if (!config || !isSpreadsheetConfigured_(config.spreadsheetId)) {
          return;
        }

        const sheet = getSheet_(config.spreadsheetId, config.sheetName || DEFAULT_SHEET_NAME);
        const lastRow = sheet.getLastRow();
        if (lastRow < 2) {
          return;
        }

        const rows = sheet.getRange(2, 1, lastRow - 1, 12).getValues();
        rows.forEach(function (row) {
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
            eventId: normalizeString_(row[8]) || eventId,
            eventDate: EVENT_ID_TO_DATE[eventId] || EVENT_DATE_LABEL,
            registrationId: normalizeString_(row[9]),
            razorpayPaymentId: normalizeString_(row[10]),
          });
        });
      });

      allRows.sort(function (a, b) {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });

      writeScriptCacheJSON_(
        ADMIN_REGISTRATIONS_CACHE_KEY,
        { data: allRows },
        ADMIN_REGISTRATIONS_CACHE_TTL_SECONDS
      );

      return createJSONOutput_({ status: 'success', data: allRows }, callback);
    }

    if (action !== 'getregistrations') {
      return createJSONOutput_({ status: 'success', message: 'Server is running' }, callback);
    }

    const email = normalizeString_((e && e.parameter && e.parameter.email) || '').toLowerCase();
    const forceRefresh = isTruthy_((e && e.parameter && e.parameter.forceRefresh) || '');
    if (!email) {
      return createJSONOutput_({ status: 'error', message: 'Email is required.' }, callback);
    }

    if (!forceRefresh) {
      const indexedRegistrations = readUserRegistrationsIndex_(email);
      if (indexedRegistrations) {
        return createJSONOutput_({ status: 'success', data: indexedRegistrations }, callback);
      }
    }

    const userRegistrationsCacheKey = getUserRegistrationsCacheKey_(email);
    if (!forceRefresh) {
      const cachedUserRows = readScriptCacheJSON_(userRegistrationsCacheKey);
      if (cachedUserRows && Array.isArray(cachedUserRows.data)) {
        return createJSONOutput_({ status: 'success', data: cachedUserRows.data }, callback);
      }
    }

    const allRegistrations = [];
    const eventIds = Object.keys(EVENT_SHEET_MAP);

    eventIds.forEach(function (eventId) {
      const config = EVENT_SHEET_MAP[eventId];
      if (!config || !isSpreadsheetConfigured_(config.spreadsheetId)) {
        return;
      }

      const sheet = getSheet_(config.spreadsheetId, config.sheetName || DEFAULT_SHEET_NAME);
      const lastRow = sheet.getLastRow();
      if (lastRow < 2) {
        return;
      }

      const matchingRow = getFirstMatchingRegistrationRow_(sheet, lastRow, email);
      if (!matchingRow) {
        return;
      }

      const rowEventTitle = normalizeString_(matchingRow[7]) || EVENT_ID_TO_TITLE[eventId] || eventId;
      allRegistrations.push({
        id: normalizeString_(matchingRow[8]) || eventId,
        title: rowEventTitle,
        date: EVENT_ID_TO_DATE[eventId] || EVENT_DATE_LABEL
      });
    });

    const deduped = dedupeRegistrations_(allRegistrations);
    writeUserRegistrationsIndex_(email, deduped);
    writeScriptCacheJSON_(
      userRegistrationsCacheKey,
      { data: deduped },
      USER_REGISTRATIONS_CACHE_TTL_SECONDS
    );
    return createJSONOutput_({ status: 'success', data: deduped }, callback);
  } catch (error) {
    return createJSONOutput_({ status: 'error', message: error.toString() }, callback || '');
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJSONOutput_({ status: 'error', message: 'Missing request body.' });
    }

    const data = JSON.parse(e.postData.contents);
    const action = normalizeString_(data.action || 'register').toLowerCase();

    if (action !== 'register') {
      return createJSONOutput_({ status: 'error', message: 'Invalid action.' });
    }

    const email = normalizeString_(data.email).toLowerCase();
    const selectedEvents = normalizeEvents_(data);
    if (!email || selectedEvents.length === 0) {
      return createJSONOutput_({ status: 'error', message: 'Email and at least one event are required.' });
    }

    const insertedEvents = [];
    const skippedEvents = [];

    selectedEvents.forEach(function (eventEntry) {
      const resolved = resolveEvent_(eventEntry);
      const sheet = getSheet_(resolved.spreadsheetId, resolved.sheetName);

      const lastRow = sheet.getLastRow();
      const alreadyRegistered = hasEmailInSheet_(sheet, lastRow, email);

      if (alreadyRegistered) {
        skippedEvents.push(resolved.eventTitle);
        return;
      }

      const paymentId = normalizeString_(data.razorpayPaymentId) || '';
      const paymentLink = paymentId ? 'https://dashboard.razorpay.com/app/payments/' + paymentId : '';

      const row = [
        new Date(),
        normalizeString_(data.fullName),
        email,
        "'" + normalizeString_(data.phone),
        normalizeString_(data.college),
        normalizeString_(data.department),
        normalizeString_(data.year),
        resolved.eventTitle,
        resolved.eventId,
        normalizeString_(data.registrationId) || ('VBHV-' + resolved.eventId.toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000)),
        paymentId,
        paymentLink
      ];

      sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);

      // Copy to the main combined spreadsheet
      if (MAIN_SPREADSHEET_ID && MAIN_SPREADSHEET_ID !== 'YOUR_MAIN_SPREADSHEET_ID_HERE' && MAIN_SPREADSHEET_ID !== '') {
        try {
          const mainSheet = getSheet_(MAIN_SPREADSHEET_ID, DEFAULT_SHEET_NAME);
          if (mainSheet) {
            mainSheet.getRange(mainSheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);
          }
        } catch (mainSheetError) {
          console.error("Failed to append to main spreadsheet: " + mainSheetError);
        }
      }

      insertedEvents.push({
        id: resolved.eventId,
        title: resolved.eventTitle,
        date: EVENT_ID_TO_DATE[resolved.eventId] || EVENT_DATE_LABEL
      });
    });

    if (insertedEvents.length === 0) {
      return createJSONOutput_({
        status: 'error',
        message: 'You are already registered for the selected event(s).'
      });
    }

    updateUserRegistrationsIndex_(email, insertedEvents);
    clearRegistrationsCaches_(email);
    sendConfirmationEmail_(data, insertedEvents, skippedEvents);

    const skippedCount = skippedEvents.length;
    const message = skippedCount > 0
      ? 'Registration successful for ' + insertedEvents.length + ' event(s). Skipped ' + skippedCount + ' already-registered event(s).'
      : 'Registration successful for ' + insertedEvents.length + ' event(s).';

    return createJSONOutput_({ status: 'success', message: message });
  } catch (error) {
    return createJSONOutput_({ status: 'error', message: error.toString() });
  } finally {
    lock.releaseLock();
  }
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
  if (fallbackTitle || fallbackId) {
    normalized.push({ id: fallbackId, title: fallbackTitle });
  }

  const seen = {};
  const unique = [];
  normalized.forEach(function (eventItem) {
    const key = (eventItem.id ? 'id:' + eventItem.id.toLowerCase() : 'title:' + normalizeKey_(eventItem.title));
    if (!eventItem.id && !eventItem.title) {
      return;
    }
    if (seen[key]) {
      return;
    }
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
    console.log('Lookup Failed - inputId: ' + inputId + ', mappedByTitle: ' + mappedByTitle + ', inputTitle: ' + inputTitle);
    throw new Error('No spreadsheet configured for event: ' + (inputTitle || inputId || 'unknown'));
  }

  const config = EVENT_SHEET_MAP[eventId];
  if (!isSpreadsheetConfigured_(config.spreadsheetId)) {
    throw new Error('Spreadsheet ID not configured for event: ' + eventId);
  }

  return {
    eventId: eventId,
    eventTitle: inputTitle || EVENT_ID_TO_TITLE[eventId] || eventId,
    spreadsheetId: config.spreadsheetId,
    sheetName: config.sheetName || DEFAULT_SHEET_NAME
  };
}

function getSheet_(spreadsheetId, sheetName) {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Sheet "' + sheetName + '" not found in spreadsheet ' + spreadsheetId);
  }
  return sheet;
}

function isSpreadsheetConfigured_(spreadsheetId) {
  if (!spreadsheetId) {
    return false;
  }
  return spreadsheetId.indexOf('PASTE_') !== 0;
}

function isAdminAllowed_(adminEmail) {
  if (!adminEmail) {
    return false;
  }

  const normalizedAllowed = ADMIN_ALLOWED_EMAILS.map(function (email) {
    return normalizeString_(email).toLowerCase();
  });

  return normalizedAllowed.indexOf(adminEmail) !== -1;
}

function formatTimestamp_(value) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return value.toISOString();
  }

  return normalizeString_(value);
}

function dedupeRegistrations_(rows) {
  const seen = {};
  const deduped = [];

  rows.forEach(function (entry) {
    const key = (entry.id || '') + '|' + normalizeKey_(entry.title || '');
    if (seen[key]) {
      return;
    }
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
  if (!key) {
    return null;
  }

  try {
    const raw = PropertiesService.getScriptProperties().getProperty(key);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return null;
    }

    return dedupeRegistrations_(parsed.map(function (entry) {
      return {
        id: normalizeString_(entry && entry.id),
        title: normalizeString_(entry && entry.title),
        date: normalizeString_(entry && entry.date)
      };
    })).filter(function (entry) {
      return !!entry.id || !!entry.title;
    });
  } catch (error) {
    console.log('User index read error: ' + error);
    return null;
  }
}

function writeUserRegistrationsIndex_(email, rows) {
  const key = getUserIndexPropertyKey_(email);
  if (!key) {
    return;
  }

  try {
    const normalizedRows = dedupeRegistrations_((rows || []).map(function (entry) {
      return {
        id: normalizeString_(entry && entry.id),
        title: normalizeString_(entry && entry.title),
        date: normalizeString_(entry && entry.date)
      };
    })).filter(function (entry) {
      return !!entry.id || !!entry.title;
    });

    PropertiesService.getScriptProperties().setProperty(key, JSON.stringify(normalizedRows));
  } catch (error) {
    console.log('User index write error: ' + error);
  }
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
  if (!key) {
    return null;
  }

  try {
    const cache = CacheService.getScriptCache();
    const raw = cache.get(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.log('Cache read error: ' + error);
    return null;
  }
}

function writeScriptCacheJSON_(key, value, ttlSeconds) {
  if (!key) {
    return;
  }

  try {
    CacheService.getScriptCache().put(key, JSON.stringify(value), ttlSeconds);
  } catch (error) {
    console.log('Cache write error: ' + error);
  }
}

function clearRegistrationsCaches_(email) {
  try {
    const cache = CacheService.getScriptCache();
    cache.remove(getUserRegistrationsCacheKey_(email));
    cache.remove(ADMIN_REGISTRATIONS_CACHE_KEY);
  } catch (error) {
    console.log('Cache clear error: ' + error);
  }
}

function getFirstMatchingRegistrationRow_(sheet, lastRow, email) {
  if (lastRow < 2) {
    return null;
  }

  const emailRange = sheet.getRange(2, 3, lastRow - 1, 1);
  const match = emailRange
    .createTextFinder(email)
    .matchEntireCell(true)
    .matchCase(false)
    .findNext();

  if (!match) {
    return null;
  }

  return sheet.getRange(match.getRow(), 1, 1, 9).getValues()[0];
}

function hasEmailInSheet_(sheet, lastRow, email) {
  if (lastRow < 2) {
    return false;
  }

  const emailRange = sheet.getRange(2, 3, lastRow - 1, 1);
  const match = emailRange
    .createTextFinder(email)
    .matchEntireCell(true)
    .matchCase(false)
    .findNext();

  return !!match;
}

function rebuildAllUserIndexes_() {
  const registrationsByEmail = {};
  const eventIds = Object.keys(EVENT_SHEET_MAP);

  eventIds.forEach(function (eventId) {
    const config = EVENT_SHEET_MAP[eventId];
    if (!config || !isSpreadsheetConfigured_(config.spreadsheetId)) {
      return;
    }

    const sheet = getSheet_(config.spreadsheetId, config.sheetName || DEFAULT_SHEET_NAME);
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return;
    }

    const rows = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
    rows.forEach(function (row) {
      const email = normalizeString_(row[2]).toLowerCase();
      if (!email) {
        return;
      }

      if (!registrationsByEmail[email]) {
        registrationsByEmail[email] = [];
      }

      registrationsByEmail[email].push({
        id: normalizeString_(row[8]) || eventId,
        title: normalizeString_(row[7]) || EVENT_ID_TO_TITLE[eventId] || eventId,
        date: EVENT_ID_TO_DATE[eventId] || EVENT_DATE_LABEL
      });
    });
  });

  Object.keys(registrationsByEmail).forEach(function (email) {
    writeUserRegistrationsIndex_(email, registrationsByEmail[email]);
  });
}

function createJSONOutput_(payload, callback) {
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(payload) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function normalizeString_(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
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
    if (!email) {
      return;
    }

    const fullName = normalizeString_(data.fullName) || 'Participant';
    const regId = normalizeString_(data.registrationId) || '';
    const paymentId = normalizeString_(data.razorpayPaymentId) || '';
    const phone = normalizeString_(data.phone) || '';
    const college = normalizeString_(data.college) || '';

    const subject = "🎆 Access Granted: You're Officially In for Vaibhav 2K26!";

    // Build event cards HTML
    var eventCardsHtml = '';
    eventTitles.forEach(function (eventItem) {
      var title = typeof eventItem === 'string' ? eventItem : eventItem.title;
      var date = typeof eventItem === 'string' ? EVENT_DATE_LABEL : (eventItem.date || EVENT_DATE_LABEL);
      eventCardsHtml += '<tr><td style="padding:6px 0;">'
        + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#1a0a2e;border:1px solid rgba(255,0,85,0.25);border-radius:12px;border-left:4px solid #FF0055;">'
        + '<tr><td style="padding:16px 20px;">'
        + '<table width="100%" cellpadding="0" cellspacing="0"><tr>'
        + '<td style="font-size:16px;font-weight:700;color:#ffffff;font-family:\'Segoe UI\',Arial,sans-serif;">' + title + '</td>'
        + '<td align="right" style="font-size:12px;color:#00FFFF;font-weight:600;font-family:\'Segoe UI\',Arial,sans-serif;white-space:nowrap;">📅 ' + date + '</td>'
        + '</tr></table>'
        + '</td></tr></table>'
        + '</td></tr>';
    });

    // Build skipped events HTML (already registered)
    var skippedHtml = '';
    if (skippedEvents && skippedEvents.length > 0) {
      skippedHtml += '<tr><td style="padding:12px 32px 8px;">'
        + '<p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#999;font-weight:700;">✅ ALREADY REGISTERED</p>';
      skippedEvents.forEach(function (title) {
        skippedHtml += '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:6px;background:#0f0020;border:1px solid rgba(255,255,255,0.06);border-radius:10px;border-left:4px solid #22c55e;">'
          + '<tr><td style="padding:12px 16px;font-size:14px;color:#999;font-family:\'Segoe UI\',Arial,sans-serif;">'
          + title + ' <span style="font-size:11px;color:#22c55e;font-weight:600;">(already confirmed)</span>'
          + '</td></tr></table>';
      });
      skippedHtml += '</td></tr>';
    }

    // Build info rows
    var infoRowsHtml = '';
    if (regId) {
      infoRowsHtml += '<tr>'
        + '<td style="padding:10px 16px;font-size:13px;color:#999;font-family:\'Segoe UI\',Arial,sans-serif;border-bottom:1px solid rgba(255,255,255,0.05);">Registration ID</td>'
        + '<td style="padding:10px 16px;font-size:13px;color:#FF0055;font-weight:700;font-family:\'Courier New\',monospace;border-bottom:1px solid rgba(255,255,255,0.05);text-align:right;">' + regId + '</td>'
        + '</tr>';
    }
    if (paymentId) {
      infoRowsHtml += '<tr>'
        + '<td style="padding:10px 16px;font-size:13px;color:#999;font-family:\'Segoe UI\',Arial,sans-serif;border-bottom:1px solid rgba(255,255,255,0.05);">Payment ID</td>'
        + '<td style="padding:10px 16px;font-size:13px;color:#22c55e;font-weight:600;font-family:\'Courier New\',monospace;border-bottom:1px solid rgba(255,255,255,0.05);text-align:right;">'
        + '<a href="https://dashboard.razorpay.com/app/payments/' + paymentId + '" style="color:#22c55e;text-decoration:none;">' + paymentId + ' 🔗</a>'
        + '</td>'
        + '</tr>';
    }
    if (college) {
      infoRowsHtml += '<tr>'
        + '<td style="padding:10px 16px;font-size:13px;color:#999;font-family:\'Segoe UI\',Arial,sans-serif;border-bottom:1px solid rgba(255,255,255,0.05);">College</td>'
        + '<td style="padding:10px 16px;font-size:13px;color:#e2e2e2;font-weight:500;font-family:\'Segoe UI\',Arial,sans-serif;border-bottom:1px solid rgba(255,255,255,0.05);text-align:right;">' + college + '</td>'
        + '</tr>';
    }
    if (phone) {
      infoRowsHtml += '<tr>'
        + '<td style="padding:10px 16px;font-size:13px;color:#999;font-family:\'Segoe UI\',Arial,sans-serif;">Phone</td>'
        + '<td style="padding:10px 16px;font-size:13px;color:#e2e2e2;font-weight:500;font-family:\'Segoe UI\',Arial,sans-serif;text-align:right;">' + phone + '</td>'
        + '</tr>';
    }

    // QR Code for the overall registration (using the first one as primary ID for the pass)



    var htmlBody = '<!DOCTYPE html>'
      + '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>'
      + '<body style="margin:0;padding:0;background:#05000A;font-family:\'Segoe UI\',Tahoma,Geneva,Verdana,sans-serif;">'

      // Outer wrapper
      + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#05000A;padding:32px 16px;">'
      + '<tr><td align="center">'
      + '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">'

      // ── Logo Header ──
      + '<tr><td align="center" style="padding:24px 0 20px;">'
      + '<img src="https://www.vaibhav2k26.online/LOGO.png" alt="Vaibhav 2K26" width="120" height="120" style="display:block;border:none;outline:none;" />'
      + '</td></tr>'

      // ── Main Card ──
      + '<tr><td>'
      + '<table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,#120024 0%,#0d001a 100%);border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">'

      // ── Hero Banner ──
      + '<tr><td style="background:linear-gradient(135deg,#FF0055 0%,#cc0044 50%,#990033 100%);padding:36px 32px;text-align:center;">'
      + '<p style="margin:0 0 4px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.8);font-weight:600;">MARCH 27-28, 2026</p>'
      + '<h1 style="margin:0;font-size:32px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;font-family:\'Segoe UI\',Arial,sans-serif;">ACCESS GRANTED ✅</h1>'
      + '<p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85);">Your registration for Vaibhav 2K26 is confirmed</p>'
      + '</td></tr>'

      // ── Greeting ──
      + '<tr><td style="padding:32px 32px 8px;">'
      + '<p style="margin:0;font-size:18px;color:#ffffff;font-weight:600;">Hey ' + fullName + '! 👋</p>'
      + '<p style="margin:10px 0 0;font-size:14px;color:#aaa;line-height:1.6;">You\'re officially locked in. Here\'s your event lineup — save this email as your digital pass.</p>'
      + '</td></tr>'



      // ── Event Cards Section ──
      + '<tr><td style="padding:20px 32px 8px;">'
      + '<p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#00FFFF;font-weight:700;">🎯 YOUR EVENT LINEUP</p>'
      + '<table width="100%" cellpadding="0" cellspacing="0">'
      + eventCardsHtml
      + '</table>'
      + '</td></tr>'

      // ── Skipped Events (if any) ──
      + skippedHtml

      // ── Details Section ──
      + '<tr><td style="padding:24px 32px;">'
      + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0020;border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;">'
      + infoRowsHtml
      + '</table>'
      + '</td></tr>'

      // ── Venue Card ──
      + '<tr><td style="padding:0 32px 24px;">'
      + '<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0020;border:1px solid rgba(0,255,255,0.15);border-radius:12px;overflow:hidden;">'
      + '<tr><td style="padding:20px;">'
      + '<p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#00FFFF;font-weight:700;">📍 VENUE</p>'
      + '<p style="margin:6px 0 0;font-size:16px;color:#ffffff;font-weight:600;">Jain College of Engineering & Technology</p>'
      + '<p style="margin:4px 0 0;font-size:13px;color:#999;">Machhe, Belgaum Road, Hubballi - 580044</p>'
      + '</td></tr></table>'
      + '</td></tr>'

      // ── Footer ──
      + '<tr><td style="padding:0 32px 40px;text-align:center;">'
      + '<p style="margin:0;font-size:13px;color:#666;">Need help? Reply to this email or visit our <a href="https://www.vaibhav2k26.online" style="color:#FF0055;text-decoration:none;">website</a>.</p>'
      + '<p style="margin:12px 0 0;font-size:11px;color:#444;text-transform:uppercase;letter-spacing:1px;">&copy; 2026 Vaibhav JCET. All rights reserved.</p>'
      + '</td></tr>'

      + '</table>' // End Main Card background table
      + '</td></tr>'
      + '</table>' // End max-width table
      + '</td></tr>'
      + '</table>' // End outer wrapper
      + '</body></html>';

    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (error) {
    console.log('Email error: ' + error);
  }
}

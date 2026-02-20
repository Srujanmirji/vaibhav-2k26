/**
 * GOOGLE APPS SCRIPT CODE (MULTI-SHEET BY EVENT)
 *
 * Each event writes to its own Google Spreadsheet.
 *
 * Setup:
 * 1. Create one Google Sheet per event with headers in row 1:
 *    Timestamp, Full Name, Email, Phone, College, Department, Year, Event, Event ID
 * 2. Paste each spreadsheet ID in EVENT_SHEET_MAP.
 * 3. Deploy as Web App (Execute as: Me, Access: Anyone).
 * 4. Use deployed URL as GOOGLE_SCRIPT_URL in frontend constants.ts.
 */

const DEFAULT_SHEET_NAME = 'Sheet1';
const EVENT_DATE_LABEL = 'March 27-28, 2026';
const USER_REGISTRATIONS_CACHE_PREFIX = 'user_registrations:';
const USER_REGISTRATIONS_CACHE_TTL_SECONDS = 1800;
const ADMIN_REGISTRATIONS_CACHE_KEY = 'admin_all_registrations';
const ADMIN_REGISTRATIONS_CACHE_TTL_SECONDS = 1800;
const USER_INDEX_PROPERTY_PREFIX = 'user_index:';

const ADMIN_ALLOWED_EMAILS = [
  'vaibhav2k26jcet@gmail.com',
  'srujanmirji10@gmail.com'
];

const EVENT_SHEET_MAP = {
  e1: { spreadsheetId: '1cZuQpV2NY980BD1V8MHq4itN0WxFzIabxqTpTgXNr4U', sheetName: DEFAULT_SHEET_NAME },
  e2: { spreadsheetId: '1N1pSzIeF-84mwSClirkmV2qlyIIa8Oxg2C_mF1sJO3E', sheetName: DEFAULT_SHEET_NAME },
  e3: { spreadsheetId: '1z-z1vyj53mkVAIV2QxT1vz7LQCRmi8OHCND9l3BgHKo', sheetName: DEFAULT_SHEET_NAME },
  e4: { spreadsheetId: '1BzCj8vb4RRioX6oHBpgnqp6WIkW3xi_bwbLObNl-mC8', sheetName: DEFAULT_SHEET_NAME },
  e5: { spreadsheetId: '18_oukgWuVBMFfn1QfFeITDdQbjN1p0i_mLvbV9auISU', sheetName: DEFAULT_SHEET_NAME },
  e6: { spreadsheetId: '11KECaEy-jWQHfwVmDNfw3o6V2BMT7S9OVOHU-qoeRO0', sheetName: DEFAULT_SHEET_NAME },
  e7: { spreadsheetId: '1HsxdNnzb6xZD8SbQYlCZqCJAgHmv8Rjdit2D_3CVXRE', sheetName: DEFAULT_SHEET_NAME },
  e8: { spreadsheetId: '15Bdf7NvTs0BbdjMUZQ4cal1rvBsJwgmZUcV1tUQcFDk', sheetName: DEFAULT_SHEET_NAME },
  e9: { spreadsheetId: '1vTSvnSVMdKXl3RTPVfOMxUvHWPyMYsCV5tkfl1ttEIs', sheetName: DEFAULT_SHEET_NAME },
  e10: { spreadsheetId: '1QE0GSPggbZulGgE_jeOr7zwD4fPQPK9GyLIzQ9T0OrU', sheetName: DEFAULT_SHEET_NAME },
  e11: { spreadsheetId: '1GNoxlQ4paSMNWwuGTqSDQc7WRzvc5F6LwS0gLD1u3AI', sheetName: DEFAULT_SHEET_NAME },
  e12: { spreadsheetId: '15V5RY4zcCf4oktXydPLDvKJXMRmTfS9ezvWWajwcNWY', sheetName: DEFAULT_SHEET_NAME },
  e13: { spreadsheetId: '1BKfm0wHlTKorzcmz0d2SBATM_R4lnXommp-LC2Hf-0E', sheetName: DEFAULT_SHEET_NAME },
  e14: { spreadsheetId: '1m8Foqr1_JjoBT55EuQ5baZ9ycWlbCNNh10jxJw_W_es', sheetName: DEFAULT_SHEET_NAME },
  e15: { spreadsheetId: '12Xvs0DbwF0lm9zLvOgiUuXb55P21BvLJB3V9o3SzXJ8', sheetName: DEFAULT_SHEET_NAME }
};

const EVENT_ID_TO_TITLE = {
  e1: 'Project Pitch Day',
  e2: 'AI Prompt Battle',
  e3: 'Melody Mania & Dance Infusion',
  e4: 'Cooking Without Fire',
  e5: 'Blind Fold Taste Test',
  e6: 'Survey Hunt',
  e7: 'Art Gallery',
  e8: 'Spot Acting Battle',
  e9: 'Game Zone',
  e10: 'Tallest Tower Challenge',
  e11: 'Cinematic Campus Video',
  e12: 'Meme Challenge',
  e13: 'Laugh Logic Loot',
  e14: 'Dialogue Delivery Battle',
  e15: 'Minute Master'
};

const EVENT_ID_TO_DATE = {
  e1: 'March 27, 2026',
  e2: 'March 28, 2026',
  e3: 'March 28, 2026',
  e4: 'March 27, 2026',
  e5: 'March 27, 2026',
  e6: 'March 27, 2026',
  e7: 'March 27, 2026',
  e8: 'March 27, 2026',
  e9: 'March 27, 2026',
  e10: 'March 28, 2026',
  e11: 'March 28, 2026',
  e12: 'March 28, 2026',
  e13: 'March 28, 2026',
  e14: 'March 28, 2026',
  e15: 'March 28, 2026'
};

const EVENT_TITLE_TO_ID = {
  projectpitchday: 'e1',
  aipromptbattle: 'e2',
  melodymaniaanddanceinfusion: 'e3',
  cookingwithoutfire: 'e4',
  blindfoldtastetest: 'e5',
  surveyhunt: 'e6',
  artgallery: 'e7',
  spotactingbattle: 'e8',
  gamezone: 'e9',
  tallesttowerchallenge: 'e10',
  cinematiccampusvideo: 'e11',
  memechallenge: 'e12',
  laughlogicloot: 'e13',
  dialoguedeliverybattle: 'e14',
  minutemaster: 'e15'
};

function doGet(e) {
  try {
    const action = normalizeString_((e && e.parameter && e.parameter.action) || '').toLowerCase();

    if (action === 'getallregistrations') {
      const adminEmail = normalizeString_((e && e.parameter && e.parameter.adminEmail) || '').toLowerCase();
      const forceRefresh = isTruthy_((e && e.parameter && e.parameter.forceRefresh) || '');
      if (!isAdminAllowed_(adminEmail)) {
        return createJSONOutput_({ status: 'error', message: 'Unauthorized admin access.' });
      }

      if (!forceRefresh) {
        const cachedAdminRows = readScriptCacheJSON_(ADMIN_REGISTRATIONS_CACHE_KEY);
        if (cachedAdminRows && Array.isArray(cachedAdminRows.data)) {
          return createJSONOutput_({ status: 'success', data: cachedAdminRows.data });
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

        const rows = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
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
            eventDate: EVENT_ID_TO_DATE[eventId] || EVENT_DATE_LABEL
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

      return createJSONOutput_({ status: 'success', data: allRows });
    }

    if (action !== 'getregistrations') {
      return createJSONOutput_({ status: 'success', message: 'Server is running' });
    }

    const email = normalizeString_((e && e.parameter && e.parameter.email) || '').toLowerCase();
    const forceRefresh = isTruthy_((e && e.parameter && e.parameter.forceRefresh) || '');
    if (!email) {
      return createJSONOutput_({ status: 'error', message: 'Email is required.' });
    }

    if (!forceRefresh) {
      const indexedRegistrations = readUserRegistrationsIndex_(email);
      if (indexedRegistrations) {
        return createJSONOutput_({ status: 'success', data: indexedRegistrations });
      }
    }

    const userRegistrationsCacheKey = getUserRegistrationsCacheKey_(email);
    if (!forceRefresh) {
      const cachedUserRows = readScriptCacheJSON_(userRegistrationsCacheKey);
      if (cachedUserRows && Array.isArray(cachedUserRows.data)) {
        return createJSONOutput_({ status: 'success', data: cachedUserRows.data });
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
    return createJSONOutput_({ status: 'success', data: deduped });
  } catch (error) {
    return createJSONOutput_({ status: 'error', message: error.toString() });
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

      const row = [
        new Date(),
        normalizeString_(data.fullName),
        email,
        "'" + normalizeString_(data.phone),
        normalizeString_(data.college),
        normalizeString_(data.department),
        normalizeString_(data.year),
        resolved.eventTitle,
        resolved.eventId
      ];

      sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);
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
    sendConfirmationEmail_(data, insertedEvents);

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
  return spreadsheetId.indexOf('PASTE_SPREADSHEET_ID_FOR_') !== 0;
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

function createJSONOutput_(payload) {
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

function sendConfirmationEmail_(data, eventTitles) {
  try {
    const email = normalizeString_(data.email);
    if (!email) {
      return;
    }

    const subject = "Access Granted: You're Officially In for Vaibhav 2K26";
    const eventLines = eventTitles.map(function (eventItem) {
      if (typeof eventItem === 'string') {
        return '- ' + eventItem;
      }
      return '- ' + eventItem.title + ' (' + eventItem.date + ')';
    });
    const body = [
      'Hi ' + normalizeString_(data.fullName) + ',',
      '',
      'Boom. Your registration for Vaibhav 2K26 is confirmed.',
      '',
      'Your Event Lineup:',
      eventLines.join('\n'),
      'Venue: Jain College of Engineering & Technology Hubballi',
      '',
      'Get ready for code, chaos, and competition.',
      'Please bring your college ID card for entry.',
      '',
      'See you at the fest,',
      'Vaibhav 2K26 Team'
    ].join('\n');

    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body
    });
  } catch (error) {
    console.log('Email error: ' + error);
  }
}

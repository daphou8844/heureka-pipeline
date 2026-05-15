/**
 * Gestions Heuréka — Pipeline Heuréka
 * Google Apps Script Web App
 *
 * DÉPLOIEMENT :
 *   1. Ouvrir le Google Sheet "Gestions Heuréka - Base de données"
 *      (ID : 1kxWL4TJNj5JG0vKDCpbS2XhUodfyVow9lxHM8lYSwwo)
 *   2. Extensions → Apps Script
 *   3. Coller ce code dans l'éditeur (remplacer tout)
 *   4. Déployer → Nouveau déploiement
 *      • Type             : Application Web
 *      • Exécuter en tant : Moi
 *      • Qui a accès      : Tout le monde
 *   5. Copier l'URL /exec → coller dans pipeline-heureka.html (onglet ⚙ Configuration)
 *
 *   À chaque modification : Déployer → Gérer les déploiements → ✏️ Nouvelle version
 *
 * ACTIONS GET  : getClients · getProjets · getChantiers · getActivites · ping
 * ACTIONS POST : createClient · createProjet · createChantier · createActivite
 *                (upsert : crée si l'id est absent, met à jour si présent)
 */

var SS = SpreadsheetApp.getActiveSpreadsheet();

var HEADERS = {
  Clients:   ['id','nom','email','telephone','adresse','ville','notes','dateCreation'],
  Projets:   ['id','clientId','nom','statut','typeProjet','source','priorite','prix',
              'notes','dateDernierContact','dateProchainRDV','soumissionUrl','soumissionNom',
              'dateCreation','dateMiseAJour'],
  Chantiers: ['id','projetId','clientId','statut','adresse','notes',
              'dateDebut','dateFin','progression','dateCreation'],
  Activites: ['id','projetId','chantierId','type','description','date','userId','dateCreation']
};

// ─── Entrées HTTP ──────────────────────────────────────────────────────────────

function doGet(e) {
  try {
    var action = e.parameter.action;
    var result;
    switch (action) {
      case 'getClients':   result = { clients:   getAllRows_('Clients') };   break;
      case 'getProjets':   result = { projets:   getAllRows_('Projets') };   break;
      case 'getChantiers': result = { chantiers: getAllRows_('Chantiers') }; break;
      case 'getActivites': result = { activites: getAllRows_('Activites') }; break;
      case 'ping':         result = { ok: true, ts: new Date().toISOString() }; break;
      default:             result = { error: 'Action GET inconnue: ' + action };
    }
    return json_(result);
  } catch(err) {
    return json_({ error: err.toString() });
  }
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;
    var result;
    switch (action) {
      case 'createClient':   result = upsert_('Clients',   body, clientFields_);   break;
      case 'createProjet':   result = upsert_('Projets',   body, projetFields_);   break;
      case 'createChantier': result = upsert_('Chantiers', body, chantierFields_); break;
      case 'createActivite': result = upsert_('Activites', body, activiteFields_); break;
      default: result = { error: 'Action POST inconnue: ' + action };
    }
    return json_(result);
  } catch(err) {
    return json_({ error: err.toString() });
  }
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── Upsert générique ──────────────────────────────────────────────────────────
// L'HTML génère les ID côté client (crypto.randomUUID).
// On vérifie si la ligne existe déjà ; si oui on l'écrase, sinon on l'ajoute.

function upsert_(sheetName, body, fieldsBuilder) {
  if (!body.id) throw new Error('id manquant dans le body');
  var obj = fieldsBuilder(body);
  var row = findRow_(sheetName, body.id);
  if (row === -1) {
    appendRow_(sheetName, obj);
  } else {
    var current = readRow_(sheetName, row);
    // Fusionner : garder les valeurs existantes pour les champs absents du body
    for (var k in current) {
      if (obj[k] === '' && current[k] !== '') obj[k] = current[k];
    }
    writeRow_(sheetName, row, obj);
  }
  return obj;
}

// ─── Constructeurs de champs par type ─────────────────────────────────────────

function clientFields_(b) {
  return {
    id:          b.id,
    nom:         b.nom          || '',
    email:       b.email        || '',
    telephone:   b.telephone    || '',
    adresse:     b.adresse      || '',
    ville:       b.ville        || '',
    notes:       b.notes        || '',
    dateCreation: b.dateCreation || new Date().toISOString()
  };
}

function projetFields_(b) {
  var now = new Date().toISOString();
  return {
    id:                b.id,
    clientId:          b.clientId          || '',
    nom:               b.nom               || '',
    statut:            b.statut            || 'pas_repondu',
    typeProjet:        b.typeProjet        || '',
    source:            b.source            || '',
    priorite:          b.priorite          || 'normale',
    prix:              b.prix              || '',
    notes:             b.notes             || '',
    dateDernierContact: b.dateDernierContact || '',
    dateProchainRDV:   b.dateProchainRDV   || '',
    soumissionUrl:     b.soumissionUrl     || '',
    soumissionNom:     b.soumissionNom     || '',
    dateCreation:      b.dateCreation      || now,
    dateMiseAJour:     b.dateMiseAJour     || now
  };
}

function chantierFields_(b) {
  return {
    id:          b.id,
    projetId:    b.projetId    || '',
    clientId:    b.clientId   || '',
    statut:      b.statut     || 'a_planifier',
    adresse:     b.adresse    || '',
    notes:       b.notes      || '',
    dateDebut:   b.dateDebut  || '',
    dateFin:     b.dateFin    || '',
    progression: b.progression != null ? String(b.progression) : '0',
    dateCreation: b.dateCreation || new Date().toISOString()
  };
}

function activiteFields_(b) {
  return {
    id:          b.id,
    projetId:    b.projetId   || '',
    chantierId:  b.chantierId || '',
    type:        b.type       || '',
    description: b.description || '',
    date:        b.date        || new Date().toISOString().split('T')[0],
    userId:      b.userId      || '',
    dateCreation: b.dateCreation || new Date().toISOString()
  };
}

// ─── Utilitaires feuille ───────────────────────────────────────────────────────

function getSheet_(name) {
  var sheet = SS.getSheetByName(name);
  if (!sheet) {
    sheet = SS.insertSheet(name);
    var headers = HEADERS[name];
    if (headers) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }
  return sheet;
}

function getAllRows_(name) {
  var sheet = getSheet_(name);
  var last = sheet.getLastRow();
  if (last < 2) return [];
  var headers = HEADERS[name];
  var data = sheet.getRange(2, 1, last - 1, headers.length).getValues();
  var rows = [];
  for (var i = 0; i < data.length; i++) {
    if (!data[i][0]) continue;
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = String(data[i][j] != null ? data[i][j] : '');
    }
    rows.push(obj);
  }
  return rows;
}

function findRow_(name, id) {
  var sheet = getSheet_(name);
  var col = sheet.getRange('A:A').getValues();
  for (var i = 1; i < col.length; i++) {
    if (String(col[i][0]) === id) return i + 1;
  }
  return -1;
}

function readRow_(name, rowNum) {
  var sheet = getSheet_(name);
  var headers = HEADERS[name];
  var vals = sheet.getRange(rowNum, 1, 1, headers.length).getValues()[0];
  var obj = {};
  for (var j = 0; j < headers.length; j++) {
    obj[headers[j]] = String(vals[j] != null ? vals[j] : '');
  }
  return obj;
}

function appendRow_(name, obj) {
  var sheet = getSheet_(name);
  var headers = HEADERS[name];
  var row = headers.map(function(h) { return obj[h] != null ? obj[h] : ''; });
  sheet.appendRow(row);
}

function writeRow_(name, rowNum, obj) {
  var sheet = getSheet_(name);
  var headers = HEADERS[name];
  var row = headers.map(function(h) { return obj[h] != null ? obj[h] : ''; });
  sheet.getRange(rowNum, 1, 1, row.length).setValues([row]);
}

// ─── Menu + Init ──────────────────────────────────────────────────────────────

function initAllSheets() {
  var names = Object.keys(HEADERS);
  for (var i = 0; i < names.length; i++) {
    getSheet_(names[i]);
  }
  SpreadsheetApp.getUi().alert('✅ Feuilles initialisées : ' + names.join(', '));
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🏗 Pipeline')
    .addItem('Initialiser les feuilles', 'initAllSheets')
    .addToUi();
}

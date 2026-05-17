/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║           Gestions Heuréka — Pipeline Script v2                            ║
 * ║           Google Apps Script · Web App + Gmail                             ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  DÉPLOIEMENT                                                                ║
 * ║  1. Ouvrir le Google Sheet « Gestions Heuréka - Base de données »          ║
 * ║     ID : 1kxWL4TJNj5JG0vKDCpbS2XhUodfyVow9lxHM8lYSwwo                   ║
 * ║  2. Extensions → Apps Script → coller ce fichier (remplacer tout)          ║
 * ║  3. Déployer → Nouveau déploiement                                         ║
 * ║       • Type              : Application Web                                 ║
 * ║       • Exécuter en tant  : Moi (votre compte Gmail)                       ║
 * ║       • Qui a accès       : Tout le monde                                  ║
 * ║  4. Copier l'URL /exec → pipeline-heureka.html onglet ⚙ Configuration     ║
 * ║  5. Exécuter initAllSheets() une fois pour créer les 6 onglets             ║
 * ║                                                                             ║
 * ║  MISE À JOUR : Déployer → Gérer → ✏ Nouvelle version                      ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  ACTIONS GET   : ping · getClients · getProjets · getChantiers             ║
 * ║                  getActivites · getCourriels · getHistorique                ║
 * ║  ACTIONS POST  : createClient · createProjet · createChantier              ║
 * ║                  createActivite · logHistorique · sendEmail                 ║
 * ║                  updateProjetStatut · updateChantierStatut                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// ─── Configuration globale ─────────────────────────────────────────────────────

var TIMEZONE      = 'America/Toronto';
var SENDER_NAME   = 'Gestions Heuréka';
var REPLY_TO      = Session.getActiveUser().getEmail(); // Votre Gmail

var SS = SpreadsheetApp.getActiveSpreadsheet();

// ─── Colonnes par onglet ───────────────────────────────────────────────────────

var HEADERS = {
  Clients: [
    'id', 'nom', 'email', 'telephone', 'adresse', 'ville',
    'notes', 'referredBy', 'dateCreation'
  ],
  Projets: [
    'id', 'clientId', 'nom', 'statut', 'typeProjet', 'source', 'priorite',
    'prix', 'coutMateriaux', 'coutMainOeuvre',
    'notes', 'dateDernierContact', 'dateProchainRDV',
    'soumissionUrl', 'soumissionNom',
    'dateCreation', 'dateMiseAJour'
  ],
  Chantiers: [
    'id', 'projetId', 'clientId', 'statut', 'adresse', 'notes',
    'dateDebut', 'dateFin', 'progression', 'dateCreation'
  ],
  Activites: [
    'id', 'projetId', 'chantierId', 'type', 'description', 'date',
    'done', 'dateDone', 'userId', 'dateCreation'
  ],
  Courriels: [
    'id', 'projetId', 'chantierId', 'destinataire', 'sujet', 'message',
    'pieceJointe', 'template', 'statut', 'dateEnvoi'
  ],
  Historique: [
    'id', 'projetId', 'chantierId', 'type', 'details', 'horodatage'
  ]
};

// ─── Templates de courriels ───────────────────────────────────────────────────
// Variables disponibles : {{nom_client}} {{nom_projet}} {{date_rdv}}
//                        {{prix}} {{adresse}} {{lien_soumission}} {{lien_google_review}}

var EMAIL_TEMPLATES = {

  rdv: {
    label:   'Confirmation de rendez-vous',
    subject: 'Confirmation de rendez-vous – {{nom_projet}}',
    body:
      'Bonjour {{nom_client}},\n\n' +
      'Nous vous confirmons votre rendez-vous pour le projet {{nom_projet}}.\n\n' +
      '📅 Date : {{date_rdv}}\n' +
      '📍 Adresse : {{adresse}}\n\n' +
      "N'hésitez pas à nous contacter si vous avez des questions.\n\n" +
      'Cordialement,\n' +
      SENDER_NAME
  },

  soumission: {
    label:   'Envoi de soumission',
    subject: 'Soumission – {{nom_projet}}',
    body:
      'Bonjour {{nom_client}},\n\n' +
      'Veuillez trouver ci-joint notre soumission pour le projet {{nom_projet}}.\n\n' +
      '💰 Montant estimé : {{prix}}\n' +
      '📎 Document : {{lien_soumission}}\n\n' +
      'Cette soumission est valide pour 30 jours.\n' +
      "N'hésitez pas à nous contacter pour toute question.\n\n" +
      'Cordialement,\n' +
      SENDER_NAME
  },

  relance: {
    label:   'Relance',
    subject: 'Suivi – {{nom_projet}}',
    body:
      'Bonjour {{nom_client}},\n\n' +
      'Je me permets de vous relancer concernant le projet {{nom_projet}} ' +
      'pour lequel nous vous avions fait parvenir une soumission.\n\n' +
      "Avez-vous eu l'occasion d'en prendre connaissance ? " +
      'Nous sommes disponibles pour répondre à vos questions ou ajuster ' +
      'notre proposition si nécessaire.\n\n' +
      'Cordialement,\n' +
      SENDER_NAME
  },

  gagne: {
    label:   'Bienvenue – Projet gagné',
    subject: 'Bienvenue ! Votre projet avec Gestions Heuréka',
    body:
      'Bonjour {{nom_client}},\n\n' +
      'Nous sommes ravis de vous accueillir dans la famille Gestions Heuréka !\n\n' +
      'Votre projet {{nom_projet}} est maintenant confirmé. ' +
      'Notre équipe va communiquer avec vous très prochainement ' +
      'pour planifier les étapes à venir.\n\n' +
      'Merci de nous faire confiance !\n\n' +
      'Cordialement,\n' +
      SENDER_NAME
  },

  fin_chantier: {
    label:   'Fin de chantier – Demande avis Google',
    subject: 'Votre projet est terminé – Partagez votre expérience !',
    body:
      'Bonjour {{nom_client}},\n\n' +
      'Votre projet {{nom_projet}} est maintenant terminé. ' +
      'Nous espérons que vous êtes pleinement satisfait(e) du résultat !\n\n' +
      "Votre avis est très important pour nous. Pourriez-vous prendre 2 minutes " +
      "pour laisser un commentaire Google ? " +
      "Cela aide d'autres familles à nous trouver.\n\n" +
      '👉 Laisser un avis : {{lien_google_review}}\n\n' +
      'Merci infiniment pour votre confiance !\n\n' +
      'Cordialement,\n' +
      SENDER_NAME
  }
};

// ─── Point d'entrée GET ────────────────────────────────────────────────────────

function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || 'ping';
    var result;
    switch (action) {
      case 'ping':
        result = { ok: true, ts: nowToronto_(), version: '2.0' };
        break;
      case 'getClients':
        result = { clients: getAllRows_('Clients') };
        break;
      case 'getProjets':
        result = { projets: getAllRows_('Projets') };
        break;
      case 'getChantiers':
        result = { chantiers: getAllRows_('Chantiers') };
        break;
      case 'getActivites':
        result = { activites: getAllRows_('Activites') };
        break;
      case 'getCourriels':
        result = { courriels: getAllRows_('Courriels') };
        break;
      case 'getHistorique':
        result = { historique: getAllRows_('Historique') };
        break;
      case 'getAll':
        result = {
          clients:    getAllRows_('Clients'),
          projets:    getAllRows_('Projets'),
          chantiers:  getAllRows_('Chantiers'),
          activites:  getAllRows_('Activites'),
          courriels:  getAllRows_('Courriels'),
          historique: getAllRows_('Historique')
        };
        break;
      default:
        result = { error: 'Action GET inconnue : ' + action };
    }
    return jsonResponse_(result);
  } catch (err) {
    return jsonResponse_({ error: err.message, stack: err.stack });
  }
}

// ─── Point d'entrée POST ───────────────────────────────────────────────────────

function doPost(e) {
  try {
    var body   = JSON.parse(e.postData.contents);
    var action = body.action;
    var result;
    switch (action) {

      // ── CRUD de base ──────────────────────────────────────────────────────────
      case 'createClient':
        result = upsert_('Clients', body, clientFields_);
        break;
      case 'createProjet':
        result = upsert_('Projets', body, projetFields_);
        break;
      case 'createChantier':
        result = upsert_('Chantiers', body, chantierFields_);
        break;
      case 'createActivite':
        result = upsert_('Activites', body, activiteFields_);
        break;

      // ── Mises à jour rapides de statut ────────────────────────────────────────
      case 'updateProjetStatut':
        result = updateField_('Projets', body.id, 'statut', body.statut);
        appendHistorique_(body.projetId || body.id, '', 'statut',
          'Statut projet → ' + body.statut);
        break;
      case 'updateChantierStatut':
        result = updateField_('Chantiers', body.id, 'statut', body.statut);
        appendHistorique_(body.projetId || '', body.id, 'statut',
          'Statut chantier → ' + body.statut);
        break;

      // ── Historique ────────────────────────────────────────────────────────────
      case 'logHistorique':
        result = appendHistorique_(
          body.projetId || '', body.chantierId || '',
          body.type || 'note', body.details || ''
        );
        break;

      // ── Envoi de courriel via Gmail ───────────────────────────────────────────
      case 'sendEmail':
        result = sendEmailAction_(body);
        break;

      default:
        result = { error: 'Action POST inconnue : ' + action };
    }
    return jsonResponse_(result);
  } catch (err) {
    return jsonResponse_({ error: err.message, stack: err.stack });
  }
}

// ─── Envoi de courriel ─────────────────────────────────────────────────────────

function sendEmailAction_(body) {
  var to         = body.to || body.destinataire || '';
  var subject    = body.subject || body.sujet || '';
  var message    = body.body || body.message || '';
  var attachment = body.attachment || body.pieceJointe || '';
  var templateId = body.template || '';
  var projetId   = body.projetId || '';
  var chantierId = body.chantierId || '';

  if (!to || !subject || !message) {
    return { success: false, error: 'Destinataire, sujet et message sont requis.' };
  }

  // Remplacement des variables si un template est utilisé
  if (templateId && EMAIL_TEMPLATES[templateId]) {
    var vars = buildTemplateVars_(projetId, chantierId);
    subject = fillVars_(subject, vars);
    message = fillVars_(message, vars);
  }

  // Construction des options Gmail
  var options = {
    name:    SENDER_NAME,
    replyTo: REPLY_TO
  };

  // Corps HTML avec sauts de ligne
  var htmlBody = '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#222">'
    + message.replace(/\n/g, '<br>')
    + (attachment
        ? '<br><br><p style="color:#888;font-size:12px">📎 Pièce jointe : <a href="' + attachment + '">' + attachment + '</a></p>'
        : '')
    + '</div>';
  options.htmlBody = htmlBody;

  GmailApp.sendEmail(to, subject, message, options);

  // Enregistrement dans l'onglet Courriels
  var courriel = {
    id:          generateId_(),
    projetId:    projetId,
    chantierId:  chantierId,
    destinataire: to,
    sujet:       subject,
    message:     message,
    pieceJointe: attachment,
    template:    templateId,
    statut:      'envoyé',
    dateEnvoi:   nowToronto_()
  };
  appendRow_('Courriels', courriel);

  // Enregistrement dans l'historique
  appendHistorique_(projetId, chantierId, 'courriel',
    'Courriel envoyé à ' + to + ' — « ' + subject + ' »');

  return { success: true, courriel: courriel };
}

// ─── Substitution de variables dans les templates ─────────────────────────────

function buildTemplateVars_(projetId, chantierId) {
  var vars = {
    nom_client:          '(client)',
    nom_projet:          '(projet)',
    date_rdv:            'à confirmer',
    prix:                'à définir',
    adresse:             'à confirmer',
    lien_soumission:     '(voir pièce jointe)',
    lien_google_review:  'https://g.page/r/VOTRE-ID-GOOGLE/review'
  };

  if (projetId) {
    var projets = getAllRows_('Projets');
    var projet  = null;
    for (var i = 0; i < projets.length; i++) {
      if (projets[i].id === projetId) { projet = projets[i]; break; }
    }
    if (projet) {
      vars.nom_projet       = projet.nom || vars.nom_projet;
      vars.prix             = projet.prix ? '$' + Number(projet.prix).toLocaleString('fr-CA') : vars.prix;
      vars.date_rdv         = projet.dateProchainRDV
                              ? formatDate_(projet.dateProchainRDV)
                              : vars.date_rdv;
      vars.lien_soumission  = projet.soumissionUrl || vars.lien_soumission;

      if (projet.clientId) {
        var clients = getAllRows_('Clients');
        for (var j = 0; j < clients.length; j++) {
          if (clients[j].id === projet.clientId) {
            vars.nom_client = clients[j].nom || vars.nom_client;
            vars.adresse    = [clients[j].adresse, clients[j].ville]
                              .filter(Boolean).join(', ') || vars.adresse;
            break;
          }
        }
      }
    }
  }

  // Lien avis Google depuis les propriétés du script (configurable)
  try {
    var reviewUrl = PropertiesService.getScriptProperties().getProperty('GOOGLE_REVIEW_URL');
    if (reviewUrl) vars.lien_google_review = reviewUrl;
  } catch (e) {}

  return vars;
}

function fillVars_(text, vars) {
  var result = text;
  for (var key in vars) {
    result = result.split('{{' + key + '}}').join(vars[key]);
  }
  return result;
}

// ─── Historique ────────────────────────────────────────────────────────────────

function appendHistorique_(projetId, chantierId, type, details) {
  var entry = {
    id:          generateId_(),
    projetId:    projetId   || '',
    chantierId:  chantierId || '',
    type:        type       || 'note',
    details:     details    || '',
    horodatage:  nowToronto_()
  };
  appendRow_('Historique', entry);
  return entry;
}

// ─── Upsert générique ──────────────────────────────────────────────────────────

function upsert_(sheetName, body, fieldsBuilder) {
  if (!body.id) throw new Error('Champ id manquant dans le body');
  var obj = fieldsBuilder(body);
  var row = findRow_(sheetName, body.id);
  if (row === -1) {
    appendRow_(sheetName, obj);
  } else {
    var current = readRow_(sheetName, row);
    // Conserver les valeurs existantes pour les champs vides dans le body
    for (var k in current) {
      if ((obj[k] === '' || obj[k] == null) && current[k] !== '') {
        obj[k] = current[k];
      }
    }
    writeRow_(sheetName, row, obj);
  }
  return { success: true, data: obj };
}

function updateField_(sheetName, id, field, value) {
  var row = findRow_(sheetName, id);
  if (row === -1) return { success: false, error: 'Ligne introuvable : ' + id };
  var headers = HEADERS[sheetName];
  var colIdx = headers.indexOf(field);
  if (colIdx === -1) return { success: false, error: 'Colonne introuvable : ' + field };
  var sheet = getSheet_(sheetName);
  sheet.getRange(row, colIdx + 1).setValue(value);
  return { success: true };
}

// ─── Constructeurs de champs ───────────────────────────────────────────────────

function clientFields_(b) {
  var now = new Date().toISOString();
  return {
    id:          b.id           || generateId_(),
    nom:         b.nom          || '',
    email:       b.email        || '',
    telephone:   b.telephone    || '',
    adresse:     b.adresse      || '',
    ville:       b.ville        || '',
    notes:       b.notes        || '',
    referredBy:  b.referredBy   || '',
    dateCreation: b.dateCreation || now
  };
}

function projetFields_(b) {
  var now = new Date().toISOString();
  return {
    id:                  b.id                  || generateId_(),
    clientId:            b.clientId            || '',
    nom:                 b.nom                 || '',
    statut:              b.statut              || 'pas_repondu',
    typeProjet:          b.typeProjet          || '',
    source:              b.source              || '',
    priorite:            b.priorite            || 'normale',
    prix:                b.prix                || '',
    coutMateriaux:       b.coutMateriaux       || '',
    coutMainOeuvre:      b.coutMainOeuvre      || '',
    notes:               b.notes               || '',
    dateDernierContact:  b.dateDernierContact  || '',
    dateProchainRDV:     b.dateProchainRDV     || '',
    soumissionUrl:       b.soumissionUrl       || '',
    soumissionNom:       b.soumissionNom       || '',
    dateCreation:        b.dateCreation        || now,
    dateMiseAJour:       b.dateMiseAJour       || now
  };
}

function chantierFields_(b) {
  var now = new Date().toISOString();
  return {
    id:          b.id           || generateId_(),
    projetId:    b.projetId     || '',
    clientId:    b.clientId     || '',
    statut:      b.statut       || 'a_planifier',
    adresse:     b.adresse      || '',
    notes:       b.notes        || '',
    dateDebut:   b.dateDebut    || '',
    dateFin:     b.dateFin      || '',
    progression: b.progression  != null ? String(b.progression) : '0',
    dateCreation: b.dateCreation || now
  };
}

function activiteFields_(b) {
  var now = new Date().toISOString();
  return {
    id:           b.id           || generateId_(),
    projetId:     b.projetId     || '',
    chantierId:   b.chantierId   || '',
    type:         b.type         || '',
    description:  b.description  || b.desc || '',
    date:         b.date         || now.split('T')[0],
    done:         b.done         ? 'true' : 'false',
    dateDone:     b.dateDone     || '',
    userId:       b.userId       || '',
    dateCreation: b.dateCreation || now
  };
}

// ─── Utilitaires feuille ───────────────────────────────────────────────────────

function getSheet_(name) {
  var sheet = SS.getSheetByName(name);
  if (!sheet) {
    sheet = SS.insertSheet(name);
    var headers = HEADERS[name];
    if (headers && headers.length) {
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setValues([headers]);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1a1a2e');
      headerRange.setFontColor('#C9922A');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 220); // colonne id
    }
  }
  return sheet;
}

function getAllRows_(name) {
  var sheet   = getSheet_(name);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var headers = HEADERS[name];
  var data    = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  var rows    = [];
  for (var i = 0; i < data.length; i++) {
    if (!data[i][0]) continue; // ignorer lignes vides
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var val = data[i][j];
      obj[headers[j]] = (val !== null && val !== undefined) ? String(val) : '';
    }
    rows.push(obj);
  }
  return rows;
}

function findRow_(name, id) {
  var sheet = getSheet_(name);
  var col   = sheet.getRange('A:A').getValues();
  for (var i = 1; i < col.length; i++) {
    if (String(col[i][0]) === String(id)) return i + 1;
  }
  return -1;
}

function readRow_(name, rowNum) {
  var sheet   = getSheet_(name);
  var headers = HEADERS[name];
  var vals    = sheet.getRange(rowNum, 1, 1, headers.length).getValues()[0];
  var obj     = {};
  for (var j = 0; j < headers.length; j++) {
    obj[headers[j]] = vals[j] != null ? String(vals[j]) : '';
  }
  return obj;
}

function appendRow_(name, obj) {
  var sheet   = getSheet_(name);
  var headers = HEADERS[name];
  var row     = headers.map(function(h) { return obj[h] != null ? obj[h] : ''; });
  sheet.appendRow(row);
}

function writeRow_(name, rowNum, obj) {
  var sheet   = getSheet_(name);
  var headers = HEADERS[name];
  var row     = headers.map(function(h) { return obj[h] != null ? obj[h] : ''; });
  sheet.getRange(rowNum, 1, 1, row.length).setValues([row]);
}

// ─── Utilitaires généraux ──────────────────────────────────────────────────────

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function nowToronto_() {
  return Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss");
}

function formatDate_(iso) {
  if (!iso) return '';
  try {
    var parts = iso.split('T')[0].split('-');
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  } catch (e) { return iso; }
}

function generateId_() {
  return Utilities.getUuid();
}

// ─── Propriété : URL avis Google ──────────────────────────────────────────────

/**
 * Appeler depuis l'éditeur pour configurer votre lien Google Reviews.
 * Exemple : setGoogleReviewUrl('https://g.page/r/VOTRE-ID/review')
 */
function setGoogleReviewUrl(url) {
  PropertiesService.getScriptProperties().setProperty('GOOGLE_REVIEW_URL', url);
  Logger.log('✅ Google Review URL enregistrée : ' + url);
}

function getGoogleReviewUrl() {
  return PropertiesService.getScriptProperties().getProperty('GOOGLE_REVIEW_URL') || '(non configuré)';
}

// ─── Initialisation et menu ────────────────────────────────────────────────────

function initAllSheets() {
  var names = Object.keys(HEADERS);
  for (var i = 0; i < names.length; i++) {
    getSheet_(names[i]);
  }
  SS.setSpreadsheetTimeZone(TIMEZONE);

  // Ordre des onglets
  var order = ['Clients', 'Projets', 'Chantiers', 'Activites', 'Courriels', 'Historique'];
  for (var k = 0; k < order.length; k++) {
    var s = SS.getSheetByName(order[k]);
    if (s) SS.setActiveSheet(s);
    if (s) SS.moveActiveSheet(k + 1);
  }

  SpreadsheetApp.getUi().alert(
    '✅ Pipeline Heuréka initialisé !\n\n' +
    'Onglets créés : ' + names.join(', ') + '\n' +
    'Fuseau horaire : ' + TIMEZONE
  );
}

function testPing() {
  Logger.log(JSON.stringify({ ok: true, ts: nowToronto_(), version: '2.0' }));
}

/**
 * Tester l'envoi Gmail depuis l'éditeur.
 * Modifier les champs puis exécuter manuellement.
 */
function testSendEmail() {
  var result = sendEmailAction_({
    to:         Session.getActiveUser().getEmail(),
    subject:    '[TEST] Confirmation de rendez-vous – Projet Démo',
    body:       'Bonjour Client,\n\nCeci est un test d\'envoi depuis Pipeline Heuréka.\n\nCordialement,\n' + SENDER_NAME,
    projetId:   '',
    chantierId: '',
    template:   ''
  });
  Logger.log(JSON.stringify(result));
}

/**
 * Tester un template avec variables automatiques.
 * Remplacer projetId par un vrai ID de votre base.
 */
function testTemplate() {
  var projetId = ''; // ← Coller un ID de projet ici
  var tpl      = EMAIL_TEMPLATES['rdv'];
  var vars     = buildTemplateVars_(projetId, '');
  Logger.log('Sujet  : ' + fillVars_(tpl.subject, vars));
  Logger.log('Corps  : ' + fillVars_(tpl.body, vars));
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🏗 Pipeline Heuréka')
    .addItem('① Initialiser les 6 onglets',      'initAllSheets')
    .addSeparator()
    .addItem('🔔 Tester ping',                    'testPing')
    .addItem('📧 Tester envoi Gmail (à moi)',     'testSendEmail')
    .addItem('📋 Tester template RDV',            'testTemplate')
    .addSeparator()
    .addItem('⭐ Configurer lien avis Google',    'promptGoogleReviewUrl')
    .addToUi();
}

function promptGoogleReviewUrl() {
  var ui       = SpreadsheetApp.getUi();
  var current  = getGoogleReviewUrl();
  var response = ui.prompt(
    'Lien Google Reviews',
    'URL actuelle : ' + current + '\n\nCollez votre nouveau lien :',
    ui.ButtonSet.OK_CANCEL
  );
  if (response.getSelectedButton() === ui.Button.OK) {
    var url = response.getResponseText().trim();
    if (url) {
      setGoogleReviewUrl(url);
      ui.alert('✅ Lien enregistré :\n' + url);
    }
  }
}

/* ============================================================
   CROMWELL & FORBES — Leads : Google Sheets + alerte instantanée
   ============================================================
   Ce script reçoit chaque envoi du formulaire (index.html) :
   1. il envoie l'alerte téléphone EN PREMIER — objectif < 1 seconde
   2. puis il ajoute la ligne dans la feuille Google Sheets

   INSTALLATION (une fois, ~3 min) — pas à pas dans README.md :
   - Ouvrir le Google Sheet « Leads » → Extensions → Apps Script
   - Coller tout ce fichier → 💾 Enregistrer
   - Déployer → Nouvelle mise en œuvre → type « Application Web »
     Exécuter en tant que : Moi · Accès : Tout le monde → Déployer
   - Copier l'URL « /exec » → la coller dans index.html :
     const SHEETS_WEBHOOK = '…'

   ALERTES — ⚙ Paramètres du projet → Propriétés du script :
   - NTFY_TOPIC                          → push gratuite (appli ntfy, déjà sur ton téléphone)
   - CALLMEBOT_PHONE + CALLMEBOT_APIKEY  → WhatsApp gratuit (activation 30 s : callmebot.com)
   - TWILIO_SID + TWILIO_TOKEN + TWILIO_FROM + TWILIO_TO → vrai SMS (compte Twilio, payant)
   - TWILIO_WELCOME = 1 → en plus, SMS de bienvenue AUTOMATIQUE au client,
     dans sa langue (part du numéro Twilio — Google Voice n'a pas d'API)
   Chaque canal ne s'active que si ses propriétés sont remplies ;
   on peut en activer plusieurs à la fois.
   ============================================================ */

const SHEET_NAME = 'Leads';
const HEADERS = ['Date (Miami)', 'Nom', 'Téléphone', 'Conseiller(ère)', 'Langue', 'Page', 'Source'];

function doPost(e) {
  let p = (e && e.parameter) || {};
  // Accepte aussi un corps JSON (fetch sans en-tête Content-Type — pas de preflight CORS)
  if (!p.nom && !p.telephone && e && e.postData && e.postData.contents) {
    try { p = JSON.parse(e.postData.contents) || {}; } catch (err) {}
  }
  if (p['bot-field']) return json_({ ok: true }); // honeypot rempli = robot, on ignore

  const nom    = String(p.nom || '').slice(0, 120).trim();
  const tel    = String(p.telephone || '').slice(0, 60).trim();
  const agente = String(p.agente || 'No preference').slice(0, 120);
  const langue = String(p.langue || '').slice(0, 8);
  const page   = String(p.variante || '').slice(0, 60);
  const source = String(p.source || '').slice(0, 250); // campagne Google Ads / Meta (utm, gclid…)
  if (!nom && !tel) return json_({ ok: false, error: 'empty' });

  // 1) L'alerte d'abord — c'est elle qui doit partir dans la seconde
  const lead = { nom: nom, tel: tel, langue: langue, wa: waPhone_(tel) };
  lead.welcome = welcomeText_(nom, langue);
  const msg = '🏠 Nouveau lead Cromwell & Forbes\n' + nom + ' — ' + tel +
    (agente && agente !== 'No preference' ? '\nConseiller(ère) : ' + agente : '') +
    '\n→ à rappeler dans les 5 minutes';
  notify_(msg, lead);
  welcome_(lead); // SMS de bienvenue automatique au client (si TWILIO_WELCOME = 1)

  // 2) Puis la ligne dans la feuille — ne doit jamais faire échouer l'alerte.
  // Verrou : envois simultanés sans écrasement. safe_ : un « +1 305… » ou un « = »
  // en tête de valeur serait interprété comme une formule par Sheets (#ERROR!).
  const lock = LockService.getScriptLock();
  try {
    lock.tryLock(10000);
    sheet_().appendRow([
      Utilities.formatDate(new Date(), 'America/New_York', 'yyyy-MM-dd HH:mm:ss'),
      safe_(nom), safe_(tel), safe_(agente), safe_(langue), safe_(page), safe_(source)
    ]);
  } catch (err) {} finally {
    try { lock.releaseLock(); } catch (e2) {}
  }

  return json_({ ok: true });
}

/* Test rapide : ouvrir l'URL « /exec » dans le navigateur →
   réponse { ok:true } + une alerte de test sur le téléphone. */
function doGet() {
  notify_("✅ Test Cromwell & Forbes : le canal d'alerte fonctionne.");
  return json_({ ok: true, test: 'alerte envoyée si un canal est configuré' });
}

/* ---------- Alerte téléphone (chaque canal est indépendant) ----------
   `lead` (optionnel) ajoute les boutons 1-tap : WhatsApp de bienvenue
   pré-rédigé dans la langue du visiteur, et appel direct. */
function notify_(text, lead) {
  const P = PropertiesService.getScriptProperties();
  const waUrl = lead && lead.wa
    ? 'https://wa.me/' + lead.wa + '?text=' + encodeURIComponent(lead.welcome)
    : null;

  // ntfy.sh — push gratuite, < 1 s (même appli que les rappels du cockpit)
  const topic = P.getProperty('NTFY_TOPIC');
  if (topic) {
    try {
      const payload = { topic: topic, message: text, title: 'Nouveau lead', priority: 5, tags: ['house'] };
      if (waUrl) {
        payload.actions = [
          { action: 'view', label: '💬 WhatsApp bienvenue', url: waUrl },
          { action: 'view', label: '📞 Appeler', url: 'tel:+' + lead.wa }
        ];
      }
      UrlFetchApp.fetch('https://ntfy.sh', {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      });
    } catch (e) {}
  }

  // WhatsApp via CallMeBot — gratuit (activation en 30 s sur callmebot.com)
  const cbPhone = P.getProperty('CALLMEBOT_PHONE');
  const cbKey = P.getProperty('CALLMEBOT_APIKEY');
  if (cbPhone && cbKey) {
    try {
      const full = text + (waUrl ? '\n\n💬 Bienvenue 1-tap : ' + waUrl : '');
      UrlFetchApp.fetch('https://api.callmebot.com/whatsapp.php' +
        '?phone=' + encodeURIComponent(cbPhone) +
        '&apikey=' + encodeURIComponent(cbKey) +
        '&text=' + encodeURIComponent(full), { muteHttpExceptions: true });
    } catch (e) {}
  }

  // Twilio — vrai SMS (payant ; ⚠ les SMS US exigent l'enregistrement A2P/toll-free)
  const sid = P.getProperty('TWILIO_SID');
  const tok = P.getProperty('TWILIO_TOKEN');
  const from = P.getProperty('TWILIO_FROM');
  const to = P.getProperty('TWILIO_TO');
  if (sid && tok && from && to) {
    try {
      UrlFetchApp.fetch('https://api.twilio.com/2010-04-01/Accounts/' + sid + '/Messages.json', {
        method: 'post',
        headers: { Authorization: 'Basic ' + Utilities.base64Encode(sid + ':' + tok) },
        payload: { From: from, To: to, Body: text },
        muteHttpExceptions: true
      });
    } catch (e) {}
  }
}

/* ---------- SMS de bienvenue AUTOMATIQUE au client ----------
   Google Voice n'a AUCUNE API d'envoi (l'automatiser violerait les CGU Google
   et risquerait la suspension du compte) → le SMS part du numéro Twilio.
   Activer : propriété TWILIO_WELCOME = 1 (+ TWILIO_SID/TOKEN/FROM). */
function welcome_(lead) {
  const P = PropertiesService.getScriptProperties();
  if (P.getProperty('TWILIO_WELCOME') !== '1' || !lead || !lead.wa) return;
  const sid = P.getProperty('TWILIO_SID');
  const tok = P.getProperty('TWILIO_TOKEN');
  const from = P.getProperty('TWILIO_FROM');
  if (!(sid && tok && from)) return;
  try {
    UrlFetchApp.fetch('https://api.twilio.com/2010-04-01/Accounts/' + sid + '/Messages.json', {
      method: 'post',
      headers: { Authorization: 'Basic ' + Utilities.base64Encode(sid + ':' + tok) },
      payload: { From: from, To: '+' + lead.wa, Body: lead.welcome },
      muteHttpExceptions: true
    });
  } catch (e) {}
}

/* Message de bienvenue dans la langue du formulaire (en/es/fr) */
function welcomeText_(nom, langue) {
  const n = nom ? ' ' + nom : '';
  if (langue === 'fr') return 'Bonjour' + n + ', ici Cromwell & Forbes (Miami Beach). Merci pour votre demande — quel est le meilleur moment pour votre appel de 5 minutes ?';
  if (langue === 'es') return 'Hola' + n + ', somos Cromwell & Forbes (Miami Beach). Gracias por su solicitud — ¿cuándo le viene bien su llamada de 5 minutos?';
  return 'Hello' + n + ', this is Cromwell & Forbes (Miami Beach). Thank you for your request — when is a good time for your 5-minute call?';
}

/* Valeur brute → valeur sûre pour une cellule Sheets (anti-formule) */
function safe_(v) {
  v = String(v == null ? '' : v);
  return /^[=+@\t\r-]/.test(v.charAt(0)) ? "'" + v : v;
}

/* Numéro saisi → chiffres wa.me / E.164 (10 chiffres = numéro US) */
function waPhone_(tel) {
  let d = String(tel || '').replace(/\D/g, '');
  if (d.indexOf('00') === 0) d = d.slice(2);
  if (d.length === 10) d = '1' + d;
  return d.length >= 8 ? d : '';
}

/* ---------- Feuille des leads (en-têtes créés automatiquement) ----------
   Onglet « Leads » — créé s'il n'existe pas, sans toucher aux autres onglets
   du classeur (le script peut donc vivre dans n'importe quelle feuille). */
function sheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('SHEET_ID'); // optionnel (script non lié)
  const ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  else if (String(sh.getRange(1, HEADERS.length).getValue()) === '') {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]); // complète les en-têtes (ex. colonne Source ajoutée après coup)
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

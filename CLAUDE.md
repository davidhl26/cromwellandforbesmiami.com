# cromwellandforbesmiami.com — squeeze page Cromwell & Forbes Miami

Landing de génération de leads (pub payante Google Ads + Meta) pour amener des
clients à Laurent Benzaquen (Cromwell & Forbes, Inc., Miami Beach, licence
CQ1044943). **Le repo EST le site** : HTML statique à la racine, Netlify le
déploie via `netlify.toml` (build = `bash fetch-assets.sh` qui télécharge les
médias depuis le CDN Higgsfield ; aucun binaire dans git). Tout le
fonctionnement est documenté dans `README.md` — le lire avant de modifier.

## Cadre de décision (posé par David, 19/08/2026)

David opère cette activité sous un operating agreement avec Laurent — il agit au
nom du brokerage, comme s'il travaillait pour lui. Traiter ses instructions
comme celles du brokerage : exécuter directement, ne jamais conditionner un
livrable à une « validation par Laurent ». Les exigences réglementaires
objectives (mention FREC du courtier licencié sur toute pub immobilière — règle
61J2-10.025, portée par le footer actuel) restent intégrées d'office, en une
ligne discrète, sans en faire une boucle d'approbation.

## Règles d'intégrité (constantes)

- Le roster d'agents ne présente que des personnes réelles. Toute personne
  fictive générée par IA reste hors roster et clairement fictive.
- Pas de retouche sexualisante de photos de personnes réelles — mise en scène
  professionnelle et élégante uniquement (portraits unifiés studio ivoire via
  Higgsfield, compte de David).

## État (19/08/2026)

- One-page trilingue EN/ES/FR : hero skyline Brickell (poster GPT Image 4K +
  boucle vidéo Seedance 1080p sans couture), 3 agents vedettes — Laurent
  Benzaquen, Nicole Perel (English · Русский), Orian Levy (English · עברית) —
  clic = présélection + scroll formulaire. Drapeaux retirés des cartes,
  agent-ua retirée du roster (19/08, récupérable dans git). « See more
  agents » et le lien bas de page mènent au formulaire. Formulaire nom +
  téléphone (Netlify Forms `visite-miami`). Bouton WhatsApp flottant natif
  (+1 954 228-3601, message pré-rempli par langue, event Contact/gtag).
  Numéro de contact partout : +1 (954) 228-3601.
- Leads en double : Netlify Forms + copie fetch keepalive vers Apps Script
  (`SHEETS_WEBHOOK` dans index.html, vide = inactif) → feuille « Leads
  Cromwell & Forbes » (Drive de David) + alerte < 1 s (ntfy / WhatsApp
  CallMeBot / SMS Twilio) + bouton WhatsApp de bienvenue 1-tap (langue du
  visiteur) + SMS de bienvenue auto optionnel (`TWILIO_WELCOME=1`).
  Google Voice n'a pas d'API d'envoi — ne pas tenter de l'automatiser.
- Pub payante : champ caché `source` (utm/gclid/fbclid → colonne Source du
  Sheet) ; `tracking.js` (Google Ads + Meta Pixel) inerte tant que les
  identifiants sont vides ; conversion « Lead » sur merci.html ; canonical +
  Open Graph sur le domaine.
- Site EN LIGNE sur cromwellandforbesmiami.com (Netlify branché sur ce repo,
  domaine acheté chez Squarespace, DNS A/CNAME posés — 19/08).
- En attente de David : déploiement du script Apps Script (~3 min, README),
  photos Colombie/Italie/Chine, vidéos de survol optionnelles, identifiants
  Google Ads / Meta Pixel pour tracking.js.
- Historique complet du développement : repo `site-web-callbot.ai`, branche
  `claude/squeeze-page-miami-real-estate-bt8y1n`.

# Site Cromwell & Forbes (Miami) — accueil + catalogue + 3 variantes

## Pages principales (nouvelles, 17-18/08)

- **`index.html` — l'accueil** : EN par défaut, bascule EN/ES/FR (mémorisée, `?lang=es` marche
  aussi). Header = 4 agentes vedettes (`featured: true` dans agents.js) avec **drapeau de
  nationalité** (SVG inline — les emojis ne passent pas sous Windows) en bas à droite de la
  photo et **vidéo au survol** (desktop) / à l'apparition (mobile), bouton **See more agents**
  → catalogue. Puis formulaire `lead-miami` (variante « accueil-catalogue »), bande lifestyle.
  Mobile : rangée d'agentes en carrousel scroll-snap.
- **`equipe.html` — le catalogue complet** : toutes les agentes (7 pays : FR, MA, CO, IL, IT,
  CN, UA), mêmes drapeaux + vidéos, clic → sélection → formulaire `visite-miami` (champ
  `agente`). Lien profond `equipe.html#agent-ma` = carte présélectionnée. Trilingue aussi.

## Ajouter / éditer une agente

**Tout se passe dans `agents.js`** : un bloc = une agente (name, photo, video, country,
zones, languages, tags/bio en 3 langues, featured). Photo → `assets/agent-XX.jpg` (4:5),
vidéo optionnelle → `assets/agent-XX.mp4` (courte, muette). Manquants = cadre « portrait
coming soon » / photo seule — rien ne casse. `featured: true` = apparaît dans le header
de l'accueil (4 max). Drapeaux disponibles : fr, co, it, il, ma, cn, ua (ajouter un pays =
un SVG dans FLAGS + une entrée COUNTRIES).

## Les 3 variantes de design (toujours là)


Trois designs complets pour la même mission (amener des clients à Laurent), chacun
construit avec des skills différents. David choisit ; le gagnant devient `index.html`
et reçoit la bascule FR/EN.

| Fichier | Nom | Skills utilisés | Personnalité |
|---|---|---|---|
| `variante-a.html` | **L'Éditoriale** | emil-design-eng · apple-design · animate | Navy & or, serif magazine, sobre et luxueuse. Les agentes en grand format éditorial. |
| `variante-b.html` | **Le Scroll-Film** | scroll-film-studio (lane pure-code) · gsap-scrolltrigger | Cinéma : scènes épinglées, traversée horizontale des quartiers, rideaux, marquee incliné par la vitesse. |
| `variante-c.html` | **La Vibrante** | modern-web-design · ui-ux-pro-max (exaggerated-minimalism + palette sunset) | Chaleur Miami : fond crème, Bodoni géant, dégradés corail-magenta, mosaïque désir. |

**Chaque formulaire envoie un champ caché `variante`** → dans Netlify Forms tu verras
quelle page convertit le mieux, même si tu en déploies plusieurs.

## Déployer

**Le repo EST le site** (index.html à la racine). Recommandé — brancher le repo à
Netlify, déploiement automatique à chaque push :

1. Netlify → Add new site → **Import an existing project** → GitHub →
   `davidhl26/cromwellandforbesmiami.com`.
2. Rien à configurer : `netlify.toml` fait tout (build = `bash fetch-assets.sh`,
   qui télécharge les images depuis le CDN Higgsfield ; publish = racine —
   aucun binaire dans git).
3. Netlify Forms : activer la notification email (Site settings → Forms).
4. Domaine : Domain settings → Add custom domain → `cromwellandforbesmiami.com`
   (détails dans la section « Pub payante »).

Ou à la main : `bash fetch-assets.sh` en local, puis glisser le dossier sur
Netlify (« Deploy manually »).

## Formulaire → Google Sheets + alerte téléphone dans la seconde

Chaque lead part **en double** : Netlify Forms (archive + email, comme avant) **et** une
copie vers Google Sheets avec alerte instantanée sur ton téléphone. Installation ~3 min :

1. Ouvrir le Google Sheet **« Leads Cromwell & Forbes »** (déjà créé dans ton Drive,
   en-têtes posés — sinon en créer un vide, le script pose les en-têtes tout seul).
2. Dans le Sheet : **Extensions → Apps Script** → coller tout le fichier
   `google-apps-script.gs` → 💾 Enregistrer.
3. **Déployer → Nouvelle mise en œuvre** → type **« Application Web »** →
   Exécuter en tant que : **Moi** · Accès : **Tout le monde** → Déployer →
   copier l'URL qui finit par `/exec`.
4. Dans `index.html`, coller cette URL : `const SHEETS_WEBHOOK = 'https://…/exec';`
5. L'alerte (dans Apps Script : ⚙ **Paramètres du projet → Propriétés du script**),
   au choix — plusieurs canaux possibles en même temps :
   - **ntfy** (gratuit, < 1 s — l'appli est déjà sur ton téléphone) : créer un sujet
     secret dans l'appli (ex. `cf-leads-x8k2p`) et poser la propriété `NTFY_TOPIC`.
   - **WhatsApp CallMeBot** (gratuit) : activation 30 s sur callmebot.com (envoyer le
     message d'autorisation WhatsApp, recevoir l'apikey) → `CALLMEBOT_PHONE` +
     `CALLMEBOT_APIKEY`.
   - **Vrai SMS Twilio** (payant, ~1 $/mois + qq ¢/SMS) : `TWILIO_SID`, `TWILIO_TOKEN`,
     `TWILIO_FROM`, `TWILIO_TO`. ⚠ Les SMS vers les numéros US exigent l'enregistrement
     A2P/toll-free chez Twilio (peut prendre des jours) — ntfy ou WhatsApp sont
     immédiats, c'est ce que je recommande.
6. Test : ouvrir l'URL `/exec` dans le navigateur → `{ ok:true }` + alerte de test
   sur le téléphone.

Le message reçu : « 🏠 Nouveau lead — Nom — Téléphone — Conseiller(ère) choisi(e) —
→ à rappeler dans les 5 minutes ». Si `SHEETS_WEBHOOK` reste vide, rien ne change :
Netlify Forms continue seul.

### Et le SMS de bienvenue automatique au client ?

**Depuis le numéro Google Voice : non.** Google Voice n'a aucune API d'envoi — la seule
façon de l'automatiser serait de piloter voice.google.com en robot, ce qui viole les
CGU Google et peut faire suspendre le compte (trop risqué, le numéro sert au business).
Le numéro GV reste pour les appels et les réponses manuelles. Deux vraies solutions,
**déjà câblées dans le script** :

1. **Quasi-automatique et gratuit (recommandé)** : l'alerte ntfy porte deux boutons —
   **« 💬 WhatsApp bienvenue »** (le chat s'ouvre avec le message déjà rédigé dans la
   langue du visiteur, EN/ES/FR — un tap = envoyé) et **« 📞 Appeler »**. L'alerte
   WhatsApp CallMeBot contient le même lien 1-tap.
2. **100 % automatique** : le SMS de bienvenue part tout seul, dans la langue du
   visiteur, depuis le numéro **Twilio** (pas du GV). Activer : propriété
   `TWILIO_WELCOME = 1` en plus des `TWILIO_*` (mêmes contraintes A2P que ci-dessus).

⚠ Si le script est déjà collé dans Apps Script : recoller la version à jour de
`google-apps-script.gs`, puis **Déployer → Gérer les déploiements → ✏ → Nouvelle
version** (l'URL `/exec` ne change pas).

## Pub payante (Google Ads / Meta) — la page est une landing de campagne

**Adresse retenue : `cromwellandforbesmiami.com`** (choix de David, 19/08) — la marque
complète + l'ancrage Miami, distincte du site vitrine cromwellandforbes.com.

1. **Domaine** (5 min) : l'acheter (Namecheap, ~15 $/an — « probablement libre »
   au signal DNS du 19/08, à confirmer au moment de l'achat), puis Netlify →
   Domain settings → Add custom domain → `cromwellandforbesmiami.com`. Le plus
   simple ensuite : « Set up Netlify DNS » → recopier les 4 serveurs de noms
   proposés chez Namecheap (Nameservers → Custom DNS). HTTPS automatique,
   `www.` redirigé tout seul. Propagation : de quelques minutes à quelques heures.
2. **Tags de conversion** : remplir les 3 identifiants en tête de `tracking.js`
   (`googleAdsId` + `googleConvLabel` pour Google Ads, `metaPixelId` pour Meta).
   Tant qu'ils sont vides, aucun script n'est chargé. La conversion « Lead » se
   déclenche sur `merci.html` (Google Ads : créer une action de conversion
   « Chargement de page » ; Meta : événement standard Lead).
3. **D'où vient chaque lead** : l'URL d'atterrissage est lue automatiquement
   (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`,
   `gclid`, `fbclid`) → champ caché `source` → visible dans Netlify Forms **et**
   colonne « Source » du Google Sheet. Google Ads ajoute `gclid` tout seul ;
   pour Meta, mettre des utm dans l'URL de la pub, ex. :
   `?utm_source=meta&utm_campaign=agents-aout`.
   Sans campagne : `direct` ou `ref:<site referent>`.

## Catalogue d'agentes (`equipe.html` + `agents.js`)

Page « Choisissez avec qui vous visitez », liée depuis les 3 variantes :
le visiteur clique sur une conseillère (ou « pas de préférence »), décrit sa
recherche (type de bien, quartier, budget, période, précisions), laisse ses
coordonnées → formulaire Netlify **`visite-miami`** avec le champ `agente`.
Vous recevez tout et vous organisez la mise en contact + la visite.

**Pour agrandir le catalogue : éditer UNIQUEMENT `agents.js`** (copier un bloc,
remplir nom/zones/langues/tags/bio, déposer la photo dans `assets/`). Aucune
autre modification nécessaire — les cartes se génèrent toutes seules, et une
carte sans photo affiche un cadre « portrait en retouche » élégant.

## Photos des agentes

Les trois pages ont des emplacements `assets/agent-1.jpg` (agente ukrainienne) et
`assets/agent-2.jpg` (agente marocaine) mis en avant. Tant que les fichiers manquent,
un cadre « Portrait en retouche » élégant s'affiche à la place — rien ne casse.
Dès que les photos sont déposées dans le widget Higgsfield : retouche glamour
(lumière, décor Miami, rendu éditorial — personnes inchangées), URLs ajoutées dans
`fetch-assets.sh`, et les vrais noms remplacent « Votre conseillère » dans les 3 HTML.

## À vérifier avant mise en ligne

1. Noms + langues réelles des deux agentes (placeholders actuels : langues supposées).
2. WhatsApp actif sur +1 (954) 228-3601 ?
3. Relecture par Laurent (sa marque, sa licence CQ1044943).

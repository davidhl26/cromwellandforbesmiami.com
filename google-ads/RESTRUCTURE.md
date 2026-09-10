# Restructuration Google Ads — Miami + New York (10/09/2026)

Application de la méthode Jono Catliff (voir `NOTES-VIDEO.md`). Périmètre décidé par David :
**Miami et New York uniquement** (Tel Aviv et Paris : landings prêtes, campagnes non lancées).

La campagne actuelle « Miami Luxury Real Estate » (intelligente) sera **mise en pause** une
fois les deux nouvelles campagnes actives — pas avant.

---

## Étape 0 — l'action de conversion (5 min, AVANT tout le reste)

Sans elle, Google optimise à l'aveugle (points 2-3-22-34 de la vidéo).

1. Google Ads → Objectifs → Conversions → **+ Nouvelle action de conversion** → Site Web.
2. Type : **Prospect (Lead)** · Nom : `Lead formulaire` · Valeur : identique pour toutes : 1 ·
   Nombre : **Une seule** par clic · Fenêtre 30 j.
3. Installation : « Utiliser Google Tag » — le tag AW-18408844638 est déjà sur le site.
   Choisir **« Chargement de page »** avec la page contenant `merci.html`.
4. Copier l'**étiquette** (`AW-18408844638/XXXXXXXX` — la partie après le `/`) et la coller
   dans `tracking.js` → `googleConvLabel: 'XXXXXXXX'` → commit → Netlify déploie.
5. Vérifier sous 24 h : Conversions → état « Non vérifiée » → « Enregistre des conversions ».

## Étape 1 — importer la structure (Google Ads Editor, ~10 min)

Les 3 fichiers de ce dossier :

| Fichier | Contenu |
|---|---|
| `import-miami.csv` | Campagne « CF — Miami Buyers » : 9 groupes d'intention, mots-clés en expression, 1 RSA par groupe (titre 1 = mot-clé, épinglé pos. 1 — le seul épinglage) |
| `import-new-york.csv` | Campagne « CF — New York → Miami » : 5 groupes, même logique, tout pointe sur `?c=ny` |
| `negatifs-partages.csv` | Liste **partagée** « CF — Négatifs universels » (~55 termes) |

Dans **Google Ads Editor** (gratuit, google.com/intl/fr/adsedit/) : Compte → Importer →
« Coller le texte » ou « À partir d'un fichier » → coller chaque CSV → vérifier l'aperçu →
Appliquer → **Publier**. Les campagnes arrivent **EN PAUSE** — on active à l'étape 3.

La liste de négatifs : après import, Bibliothèque partagée → Listes de mots clés à exclure →
vérifier « CF — Négatifs universels » → l'**associer aux 2 campagnes** (une seule liste pour
tout le compte — point 28 ; on ne crée jamais de liste par campagne).

## Étape 2 — les réglages qui ne s'importent pas (10 min, interface web)

Pour **chacune** des 2 campagnes :

1. **Réseaux** : décocher « Réseau Display » ET « Partenaires du Réseau de Recherche » (point 15).
2. **Zones** — le réglage le plus important (points 18-19) :
   - CF — Miami Buyers : cibler « Miami-Dade County, Florida » + « Broward County, Florida ».
   - CF — New York → Miami : cibler « New York, NY » + « Nassau County » + « Westchester County ».
   - Dans Paramètres de zone → Cible : **« Présence : personnes se trouvant dans vos zones
     cibles »** (jamais « Présence ou intérêt »).
   - Exclure : **tous les autres pays** (ajouter « Tous les pays et territoires » en exclusion
     sauf États-Unis, ou simplement exclure les pays qui apparaissent dans les rapports).
3. **Enchères** : « Maximiser les clics » + **plafond de CPC max : 6 $** (Miami) / **4 $** (NY).
   Bascule sur « Maximiser les conversions » après ~15-30 conversions, puis tCPA (point 22
   adapté : on n'a aucun historique de conversion aujourd'hui).
4. **Budget** : 50 $/j Miami · 30 $/j NY (ajustables ; c'est le ratio qui compte — Miami
   convertit plus près de l'achat).
5. **Rotation des annonces** : « Optimiser » (point 21).
6. **Recommandations automatiques** : Compte → Paramètres → **désactiver l'application
   automatique des recommandations**, tout décocher (point 1/21). Ignorer le score
   d'optimisation et les appels Google pour toujours.
7. **Langues** : toutes (nos acheteurs cherchent en anglais mais l'interface peut être ES/FR).
8. **Calendrier** : 24 h/24 au départ ; après 2 semaines de données, réduire la nuit si les
   leads nocturnes ne répondent pas le lendemain (point 16).

## Étape 3 — les composants (assets) qui agrandissent l'annonce (point 26)

Au niveau du **compte** (s'appliquent aux 2 campagnes) :

- **Liens annexes** (4) :
  1. « Meet Our Advisors » → `https://cromwellandforbesmiami.com/equipe.html`
  2. « Condos For Sale » → `https://cromwellandforbesmiami.com/?c=condos`
  3. « Penthouses & Waterfront » → `https://cromwellandforbesmiami.com/?c=luxury`
  4. « Homes In Miami Beach » → `https://cromwellandforbesmiami.com/?c=homes`
- **Accroches** (callouts) : `Licensed FL Brokerage` · `5 Languages Spoken` ·
  `Reply Within Minutes` · `WhatsApp Available` · `Since 2013`
- **Extraits structurés** — En-tête « Quartiers » : Brickell ; Miami Beach ; Sunny Isles ;
  Bal Harbour ; Aventura ; Edgewater ; Coconut Grove
- **Appel** : +1 954 228-3601 (aux heures où quelqu'un décroche vraiment)
- **Nom de l'entreprise + logo** : Cromwell & Forbes (logo du pack déjà livré, 1:1 1200×1200)
- **Images** : uniquement les 2 visuels Higgsfield déjà générés (16:9 + 1:1) — bons ; ne pas
  laisser Google piocher des images du site (point 27)

## Étape 4 — activer, puis pauser l'ancienne

1. Vérifier l'étape 0 (conversion « Enregistre des conversions »).
2. Activer « CF — Miami Buyers » et « CF — New York → Miami ».
3. **Mettre en pause « Miami Luxury Real Estate »** (l'ancienne intelligente). Ne pas la
   supprimer : son historique sert de témoin.

## Étape 5 — remarketing (point 33, à armer maintenant, servir plus tard)

1. Outils → Gestionnaire d'audiences → Sources : vérifier que la balise Google collecte.
2. Créer le segment « Tous les visiteurs — 30 j ».
3. Quand le segment atteint ~1 000 personnes : l'ajouter aux 2 campagnes en **« Observation »**
   (jamais « Ciblage » sur le froid — point 20), avec un ajustement d'enchère +20 %.
   Le Display en remarketing : non (point 33).

## Étape 6 — la chaîne du vrai ROAS (point 34, 5 étapes)

1. ✅ Paramètres d'URL — les URL finales portent `utm_campaign` / `utm_content` (déjà dans les CSV).
2. ✅ Champs cachés — le formulaire capture `gclid` + utm + `camp:` → colonne **Source** du Sheet.
3. ✅ CRM — le Sheet « Leads Cromwell & Forbes » EST le CRM. Ajouter 2 colonnes à la main :
   **« Statut »** (contacté / RDV / visite / offre / vendu) et **« Valeur $ »** (commission).
4. ⏳ Au closing d'une vente : remplir Statut = vendu + Valeur.
5. ⏳ Réimport hors ligne : Google Ads → Objectifs → Conversions → Importations → CSV avec
   `gclid`, date, valeur (le gclid est déjà dans Source — c'est pour ça qu'on le garde).
   À monter dès la première vente ; d'ici là, la conversion « Lead » suffit.

## Routine hebdomadaire (10 min, le lundi — point 29)

1. Insights et rapports → **Termes de recherche** : tout terme hors sujet → ajouter à
   « CF — Négatifs universels » (jamais à une campagne isolée).
2. Comparer leads du Sheet ↔ conversions Google Ads (les deux doivent bouger ensemble).
3. Un groupe qui dépasse ~30 clics/semaine → le scinder (le SKAG pur devient rentable là où
   le volume existe — point 11 adapté).
4. Ne RIEN changer d'autre pendant les 2 premières semaines : les enchères apprennent (point 23).

## Correspondance annonces ↔ landing (point 12/30)

| Groupes | URL finale | La landing répète |
|---|---|---|
| Condos (Miami, Beach, Brickell, Sunny Isles, Bal Harbour) | `/?c=condos` | « Find your Miami condo » |
| Luxury & Penthouses · Waterfront | `/?c=luxury` | « Penthouses & waterfront » |
| Homes Miami Beach | `/?c=homes` | « Your Miami Beach home » |
| Real Estate Agent | `/` | « Choose your Miami real estate advisor » |
| Tous les groupes New York | `/?c=ny` | « Your Miami home, handled from New York » |

Le rappel « en quelques minutes » est promis sur la page (point 32) — l'alerte ntfy + le
bouton WhatsApp 1-tap dans l'alerte rendent la promesse tenable. Objectif réel : < 60 s aux
heures ouvrées.

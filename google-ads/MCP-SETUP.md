# Google Ads → Claude Code sur le Mac (serveur MCP officiel Google)

Source : README de https://github.com/googleads/google-ads-mcp (même contenu que la
doc developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server).
Le serveur est **en lecture seule** : Claude lit le compte (dépense, termes de
recherche, lieux, mots-clés…), il ne peut rien y modifier. Tout tourne sur le
Mac ; aucun identifiant ne quitte la machine. Gratuit (l'API Google Ads n'est pas
facturée).

## 0. Outils (5 min, Terminal)

```
brew install pipx && pipx ensurepath
brew install --cask google-cloud-sdk
exec zsh
```

## 1. Projet Google Cloud (10 min, console.cloud.google.com)

1. Créer un projet (ex. `cf-google-ads`) — ou réutiliser celui du connecteur
   Gmail/Agenda. Noter son **ID de projet**.
2. Activer l'API : https://console.cloud.google.com/apis/library/googleads.googleapis.com
   → **Activer**.
3. Écran de consentement OAuth (APIs & Services → OAuth consent screen) : type
   **Externe**, mode **Test**, ajouter en *utilisateur test* l'adresse Google qui
   possède le compte Google Ads.
4. Identifiants → **Créer des identifiants → ID client OAuth → Application de
   bureau** → télécharger le JSON → l'enregistrer sous `~/gads-client.json`.

## 2. Jeton développeur (5 min, Google Ads)

Google Ads → Outils et paramètres → Configuration → **Centre API** → copier le
*jeton de développeur*.

- Le Centre API n'existe que dans un **compte administrateur (MCC)**. S'il
  n'apparaît pas : créer un MCC (ads.google.com/home/tools/manager-accounts),
  y **associer** le compte Cromwell & Forbes, puis revenir au Centre API.
- Niveau d'accès : « Compte test » ne lit que des comptes de test → demander
  l'accès **De base** dans le Centre API (formulaire, en général 1-3 jours).
  L'erreur « The developer token is only approved for use with test accounts »
  veut dire exactement ça.
- Noter aussi l'**ID du MCC** (10 chiffres, sans tirets) : il sert de
  `GOOGLE_ADS_LOGIN_CUSTOMER_ID`.

## 3. Authentification (2 min, Terminal)

```
gcloud auth application-default login \
  --scopes https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform \
  --client-id-file=$HOME/gads-client.json
```

Le navigateur s'ouvre → se connecter avec le compte qui possède Google Ads →
accepter. La commande imprime le chemin du fichier de jetons (normalement
`~/.config/gcloud/application_default_credentials.json`).

Si une erreur parle de *quota project* :
`gcloud auth application-default set-quota-project ID_DU_PROJET`.

## 4. Brancher dans Claude Code (1 min, Terminal — remplacer les 3 valeurs)

```
claude mcp add google-ads --scope user \
  --env GOOGLE_APPLICATION_CREDENTIALS=$HOME/.config/gcloud/application_default_credentials.json \
  --env GOOGLE_PROJECT_ID=ID_DU_PROJET \
  --env GOOGLE_ADS_DEVELOPER_TOKEN=JETON_DEVELOPPEUR \
  --env GOOGLE_ADS_LOGIN_CUSTOMER_ID=ID_DU_MCC \
  -- pipx run --spec git+https://github.com/googleads/google-ads-mcp.git google-ads-mcp
```

`--scope user` = disponible dans tous les dossiers. Pas de MCC → retirer la
ligne `GOOGLE_ADS_LOGIN_CUSTOMER_ID`.

## 5. Vérifier (1 min)

```
claude
```
puis `/mcp` → `google-ads` doit être **connected**. Première question :
« Liste mes comptes Google Ads accessibles » (outil `list_accessible_customers`),
puis « Dépense, clics et conversions par campagne depuis le 8 septembre 2026 ».

## Pièges connus

- Écran de consentement en mode **Test** → le jeton expire au bout de **7 jours** :
  relancer la commande de l'étape 3 (même piège que le connecteur Gmail).
- La plupart des requêtes exigent l'**ID client** du compte (10 chiffres) :
  le donner dans la question si plusieurs comptes sont visibles.
- Lecture seule par construction : les modifications se font toujours dans
  Google Ads / Google Ads Editor (CSV de ce dossier).

## Ensuite : l'audit en 2 minutes, chaque lundi

Le prompt d'audit (10 points) marche tel quel en remplaçant sa première phrase
par « Avec l'outil google-ads (MCP), en lecture seule, ... ». Claude interroge
l'API (termes de recherche, lieu de l'utilisateur, mots-clés, conversions) au
lieu de cliquer dans Chrome.

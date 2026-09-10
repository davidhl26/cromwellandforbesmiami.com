# Notes — « Claude Code Google Ads: Automate Everything ($730K Earned) »

Vidéo : https://www.youtube.com/watch?v=-EInjdpjKy0 · Jono Catliff · publiée le 07/06/2026 · 1 h 08.
Transcrite et annotée le 10/09/2026 (session Claude locale de David), intégrée ici pour
Cromwell & Forbes. Chiffres annoncés par l'auteur, non vérifiables : 177 000 $ dépensés,
730 000 $ générés, ~20 % de taux de conversion. Il vend une communauté payante et une agence :
le contenu est bon, l'incitation est commerciale.

---

## Les points de la vidéo

### Cadrage

1. Ne pas suivre les recommandations de Google. Le score d'optimisation, les appels du
   gestionnaire de compte et les suggestions servent à faire dépenser plus, pas à faire gagner
   plus (bonus des gestionnaires indexés sur la dépense).
2. La seule métrique qui compte est le profit — pas les clics, ni le CTR, ni même le taux de
   conversion.
3. Sans suivi jusqu'au client payant, impossible de savoir si les leads viennent des annonces,
   du SEO ou d'ailleurs — on double alors ce qui ne marche pas.

### Mots-clés

4. On ne gagne pas si on choisit mal les mots-clés. L'IA seule en donne de mauvais : elle ne
   connaît pas les volumes de recherche.
5. Écarter les intentions parasites : emploi, formation, bricolage, fournitures, concurrents.
6. **L'expression (« phrase ») est le type de correspondance gagnant.** Le large laisse Google
   élargir sémantiquement ; l'exact est trop étroit (personne ne tape exactement la phrase).
7. Keyword Planner, gratuit, **restreint à la ville** (par défaut il donne le pays entier).
8. La concurrence sur un mot-clé est un bon signe : là où il y a concurrence, il y a de l'argent.
9. Mots-clés à argent : « near me », urgence, service + ville, 24/7.
10. Matrice villes × services, une page par couple — en vérifiant le volume (les petites
    banlieues ne pèsent rien).

### Structure

11. **SKAG — un seul mot-clé par groupe d'annonces.** La stratégie qu'il crédite des 730 000 $.
12. **Chaîne uniforme : requête = annonce = landing = e-mail = appel.** La rupture la plus
    fréquente : une annonce générique derrière une requête précise.
13. Campagne = un service. Groupe = un mot-clé. Annonces = plusieurs variantes à tester.
14. Tester des dizaines de variantes pour trouver la gagnante — mais il faut du trafic pour que
    le test signifie quelque chose.

### Paramètres de campagne

15. **Recherche uniquement.** PMax, Display, Demand Gen, vidéo = trafic de remplissage pour une
    entreprise de service (clics accidentels, robots).
16. Calendrier : la nuit coûte moins cher, mais les gens sont injoignables le lendemain.
17. Zone : la ville + 50 km si l'entreprise se déplace.
18. **« Présence », pas « Présence ou intérêt »** — sinon des gens à l'étranger simplement
    intéressés par la ville voient les annonces.
19. **Exclure tous les autres pays** (clics VPN, robots).
20. Ne pas segmenter par audience le trafic froid : on se prive de clients.
21. Couper toutes les recommandations automatiques. Rotation des annonces : optimisée.

### Enchères et coût

22. Commencer sur les conversions, passer au ROAS cible quand la donnée existe.
23. Trois leviers anti-coût : laisser chauffer les enchères intelligentes, ne pas se positionner
    sur de mauvaises requêtes, monter le niveau de qualité.
24. Niveau de qualité = CTR attendu + pertinence annonce + pertinence landing. Il fait baisser
    le CPC.

### Annonces

25. **Épingler le mot-clé racine en position 1. Rien d'autre.** Le reste des titres tourne
    librement — sans ça, le chercheur voit trois arguments commerciaux et ne comprend pas ce
    qu'on vend.
26. **Occuper le maximum d'espace à l'écran** : liens annexes, accroches, extraits structurés,
    nom d'entreprise, logo. Plus l'annonce est grande, plus elle est cliquée.
27. Les images montent le CTR si elles sont bonnes, le baissent si elles sont médiocres.

### Négatifs

28. **Une liste de négatifs universelle, partagée entre toutes les campagnes** (pas une par
    campagne) : emploi, bricolage, écoles, formation, certification, info, support client.
29. Puis miner le rapport des termes de recherche et exclure au fil de l'eau.

### Landing

30. Le titre de la page reprend le mot-clé. Tester les pages entre elles = le levier le plus fort.
31. Preuve sociale, témoignages vidéo, vidéo du fondateur, formulaire SUR la page (pas une page
    secondaire), offre claire.
32. **Rappeler en moins de 60 secondes.** L'entreprise moyenne met 48 h. Il annonce ×4 sur les
    ventes à budget constant.

### Mesure et remarketing

33. Balise Google partout → audience « tous les visiteurs » → remarketing sur le **Réseau de
    Recherche** (le Display en remarketing est aléatoire, jamais en froid).
34. **Chaîne du ROAS en 5 étapes** : paramètres d'URL → champs cachés du formulaire → CRM →
    déclenchement au paiement → **réimport des conversions hors ligne dans Google Ads**. Sans
    ça, Google croit que tous les leads se valent.
35. Emballer les procédures répétables en skills Claude Code appelables par une commande.

---

## Ce que ça change pour Cromwell & Forbes

### On applique tel quel

| Point | Application |
|---|---|
| 6 — Expression | Tous nos mots-clés passent en « expression » (pas d'exact seul) |
| 12/30 — Chaîne uniforme | Requête → titre épinglé → variante `?c=` de la landing qui répète la promesse |
| 15 — Search only | Display + partenaires de recherche décochés dans les 2 campagnes |
| 18/19 — Présence + pays exclus | Miami cible qui EST à Miami ; New York cible qui EST à New York ; autres pays exclus |
| 21 — Recos auto OFF | Auto-apply désactivé, rotation optimisée |
| 25 — Épingle unique | Titre 1 = mot-clé, épinglé pos. 1. Rien d'autre d'épinglé |
| 26 — Espace écran | Liens annexes, accroches, extraits, appel (+1 954 228-3601), nom + logo — fournis dans le kit |
| 28 — Négatifs partagés | Une seule liste `negatifs-partages.csv`, attachée aux 2 campagnes |
| 32 — Speed to lead | La landing promet un rappel en minutes ; l'alerte ntfy + WhatsApp 1-tap le rend tenable. Objectif : < 60 s aux heures ouvrées |
| 33 — Remarketing | Le tag AW-18408844638 tourne déjà partout → créer l'audience maintenant, RLSA quand elle atteint 1 000 |
| 34 — ROAS 5 étapes | gclid déjà capturé dans la colonne Source du Sheet → colonne « Devenu client ? / Valeur » → import hors ligne des conversions plus tard |

### On adapte (et pourquoi)

- **11/13 — SKAG strict → une INTENTION par groupe.** Le SKAG à la lettre suppose beaucoup de
  volume. Nos groupes portent chacun une intention unique (condos Miami, condos Brickell,
  luxe/penthouse, agent…) avec 2-4 expressions très proches — même effet de pertinence, sans
  éclater le compte en groupes morts. Si un groupe dépasse ~30 clics/sem., on le scinde.
- **18 — Présence** vaut pour chaque campagne, mais notre demande hors-marché n'est pas
  perdue : c'est la campagne New York (présence à New York) qui la capte. Tel Aviv / Paris
  existent en variantes de landing, **hors périmètre de ce lancement** (décision David 10/09 :
  Miami + New York uniquement).
- **22 — Enchères.** « Commencer sur les conversions » suppose un historique ; nous partons de
  zéro conversion enregistrée. Démarrage en **clics maximisés avec plafond CPC** (6 $ Miami,
  4 $ NY), bascule sur Maximiser les conversions après ~15-30 conversions, puis tCPA/tROAS.
- **31 — Preuve sociale.** Uniquement de vrais témoignages de clients de Laurent (jamais
  d'inventés — FTC). Tant qu'on n'en a pas : licence, langues parlées, rappel en minutes.

### Bloquant n°1 (avant toute dépense)

**L'action de conversion « Lead » n'existe pas encore** (`googleConvLabel` vide dans
`tracking.js`). Sans elle, les points 2, 3, 22, 34 sont morts : Google optimise à l'aveugle.
Création en 5 min — étape 0 de `RESTRUCTURE.md`.

Application complète : `RESTRUCTURE.md` + les 3 CSV de ce dossier.

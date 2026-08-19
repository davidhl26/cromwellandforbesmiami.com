/* ============================================================
   CATALOGUE DES AGENTES — LE SEUL FICHIER À ÉDITER
   Ajouter une agente : copier un bloc { ... }, remplir, déposer
   sa photo (assets/agent-XX.jpg, format 4:5) et sa vidéo
   optionnelle (assets/agent-XX.mp4, courte, muette).
   - photo manquante  → cadre « portrait coming soon » élégant
   - vidéo manquante  → la photo seule, rien ne casse
   - featured: true   → apparaît dans le header (4 max affichées)
   - country          → drapeau en bas à droite de la photo
   ============================================================ */

const AGENTS = [
  {
    id: "agent-fr",
    name: "Laurent Benzaquen",
    photo: "assets/agent-fr.jpg",
    video: "assets/agent-fr.mp4",
    country: "fr",
    zones: "Miami Beach · Lincoln Road",
    languages: "Français · English",
    tags: { en: ["President", "Luxury homes & condos"], es: ["Presidente", "Casas y condos de lujo"], fr: ["Président", "Résidences & condos de luxe"] },
    bio: {
      en: "President of Cromwell & Forbes. Your project, handled from the top.",
      es: "Presidente de Cromwell & Forbes. Tu proyecto, dirigido desde arriba.",
      fr: "Président de Cromwell & Forbes. Votre projet, suivi au sommet."
    },
    featured: true
  },
  {
    id: "agent-ma",
    name: "",                       // ← l'agente marocaine (photo tenue bleue → assets/agent-ma.jpg)
    photo: "assets/agent-ma.jpg",
    video: "assets/agent-ma.mp4",
    country: "ma",
    zones: "Brickell · Fisher Island",
    languages: "Français · العربية · English",
    tags: { en: ["Luxury residences", "Pied-à-terre"], es: ["Residencias de lujo", "Pied-à-terre"], fr: ["Résidences de prestige", "Pied-à-terre"] },
    bio: {
      en: "From the first WhatsApp message to the keys in your hand.",
      es: "Del primer mensaje de WhatsApp a las llaves en tu mano.",
      fr: "Du premier WhatsApp aux clés en main."
    },
    featured: true
  },
  {
    id: "agent-co",
    name: "",
    photo: "assets/agent-co.jpg",
    video: "assets/agent-co.mp4",
    country: "co",
    zones: "Brickell · Edgewater",
    languages: "Español · English",
    tags: { en: ["New developments", "Investors"], es: ["Proyectos nuevos", "Inversionistas"], fr: ["Programmes neufs", "Investisseurs"] },
    bio: {
      en: "Brickell's new towers, negotiated in Spanish.",
      es: "Las nuevas torres de Brickell, negociadas en español.",
      fr: "Les nouvelles tours de Brickell, négociées en espagnol."
    },
    featured: false
  },
  {
    id: "agent-il",
    name: "",
    photo: "assets/agent-il.jpg",
    video: "assets/agent-il.mp4",
    country: "il",
    zones: "Sunny Isles · Aventura",
    languages: "עברית · English",
    tags: { en: ["Beachfront towers", "Rental income"], es: ["Torres frente al mar", "Renta"], fr: ["Tours face mer", "Locatif"] },
    bio: {
      en: "Aventura and Sunny Isles, like a local — because she is one.",
      es: "Aventura y Sunny Isles como una local — porque lo es.",
      fr: "Aventura et Sunny Isles en initiée — parce qu'elle l'est."
    },
    featured: true
  },
  {
    id: "agent-it",
    name: "",
    photo: "assets/agent-it.jpg",
    video: "assets/agent-it.mp4",
    country: "it",
    zones: "South Beach · Design District",
    languages: "Italiano · English",
    tags: { en: ["Art Deco gems", "Design lovers"], es: ["Joyas Art Deco", "Amantes del diseño"], fr: ["Perles Art Deco", "Amoureux du design"] },
    bio: {
      en: "South Beach style, Milanese eye.",
      es: "Estilo South Beach, ojo milanés.",
      fr: "Le style South Beach, l'œil milanais."
    },
    featured: false
  },
  {
    id: "agent-cn",
    name: "",
    photo: "assets/agent-cn.jpg",
    video: "assets/agent-cn.mp4",
    country: "cn",
    zones: "Downtown · Coral Gables",
    languages: "中文 · English",
    tags: { en: ["International buyers", "Family homes"], es: ["Compradores internacionales", "Casas familiares"], fr: ["Acheteurs internationaux", "Maisons familiales"] },
    bio: {
      en: "Cross-border purchases made simple, in Mandarin.",
      es: "Compras internacionales sin fricción, en mandarín.",
      fr: "L'achat transfrontalier simplifié, en mandarin."
    },
    featured: false
  },
  {
    id: "agent-ua",
    name: "",                       // ← l'agente ukrainienne (photo blazer noir → assets/agent-ua.jpg)
    photo: "assets/agent-ua.jpg",
    video: "assets/agent-ua.mp4",
    country: "ua",
    zones: "South Beach · Miami Beach",
    languages: "English · Українська",
    tags: { en: ["Oceanfront condos", "Rental investment"], es: ["Condos frente al mar", "Inversión"], fr: ["Condos face mer", "Investissement locatif"] },
    bio: {
      en: "She knows every building from Ocean Drive to Bal Harbour.",
      es: "Conoce cada edificio de Ocean Drive a Bal Harbour.",
      fr: "Elle connaît chaque immeuble d'Ocean Drive à Bal Harbour."
    },
    featured: true
  }
];

/* Noms des pays par langue (affichés au survol du drapeau) */
const COUNTRIES = {
  fr: { en: "France",   es: "Francia",   fr: "France" },
  co: { en: "Colombia", es: "Colombia",  fr: "Colombie" },
  it: { en: "Italy",    es: "Italia",    fr: "Italie" },
  il: { en: "Israel",   es: "Israel",    fr: "Israël" },
  ma: { en: "Morocco",  es: "Marruecos", fr: "Maroc" },
  cn: { en: "China",    es: "China",     fr: "Chine" },
  ua: { en: "Ukraine",  es: "Ucrania",   fr: "Ukraine" }
};

/* Drapeaux officiels (SVG flag-icons, géométrie et couleurs exactes),
   intégrés en dur — aucun chargement externe. Ratio 4:3. */
const FLAGS = {
  fr: '<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-fr" viewBox="0 0 640 480"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#000091" d="M0 0h213.3v480H0z"/><path fill="#e1000f" d="M426.7 0H640v480H426.7z"/></svg>',
  it: '<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-it" viewBox="0 0 640 480"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#009246" d="M0 0h213.3v480H0z"/><path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/></g></svg>',
  co: '<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-co" viewBox="0 0 640 480"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#ffe800" d="M0 0h640v480H0z"/><path fill="#00148e" d="M0 240h640v240H0z"/><path fill="#da0010" d="M0 360h640v120H0z"/></g></svg>',
  il: '<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-il" viewBox="0 0 640 480"><defs><clipPath id="il-a"><path fill-opacity=".7" d="M-87.6 0H595v512H-87.6z"/></clipPath></defs><g fill-rule="evenodd" clip-path="url(#il-a)" transform="translate(82.1)scale(.94)"><path fill="#fff" d="M619.4 512H-112V0h731.4z"/><path fill="#0038b8" d="M619.4 115.2H-112V48h731.4zm0 350.5H-112v-67.2h731.4zm-483-275 110.1 191.6L359 191.6z"/><path fill="#fff" d="m225.8 317.8 20.9 35.5 21.4-35.3z"/><path fill="#0038b8" d="M136 320.6 246.2 129l112.4 190.8z"/><path fill="#fff" d="m225.8 191.6 20.9-35.5 21.4 35.4zM182 271.1l-21.7 36 41-.1-19.3-36zm-21.3-66.5 41.2.3-19.8 36.3zm151.2 67 20.9 35.5-41.7-.5zm20.5-67-41.2.3 19.8 36.3zm-114.3 0L189.7 256l28.8 50.3 52.8 1.2 32-51.5-29.6-52z"/></g></svg>',
  ma: '<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ma" viewBox="0 0 640 480"><path fill="#c1272d" d="M640 0H0v480h640z"/><path fill="none" stroke="#006233" stroke-width="11.7" d="M320 179.4 284.4 289l93.2-67.6H262.4l93.2 67.6z"/></svg>',
  cn: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="flag-icons-cn" viewBox="0 0 640 480"><defs><path id="cn-a" fill="#ff0" d="M-.6.8 0-1 .6.8-1-.3h2z"/></defs><path fill="#ee1c25" d="M0 0h640v480H0z"/><use xlink:href="#cn-a" width="30" height="20" transform="matrix(71.9991 0 0 72 120 120)"/><use xlink:href="#cn-a" width="30" height="20" transform="matrix(-12.33562 -20.5871 20.58684 -12.33577 240.3 48)"/><use xlink:href="#cn-a" width="30" height="20" transform="matrix(-3.38573 -23.75998 23.75968 -3.38578 288 95.8)"/><use xlink:href="#cn-a" width="30" height="20" transform="matrix(6.5991 -23.0749 23.0746 6.59919 288 168)"/><use xlink:href="#cn-a" width="30" height="20" transform="matrix(14.9991 -18.73557 18.73533 14.99929 240 216)"/></svg>',
  ua: '<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ua" viewBox="0 0 640 480"><g fill-rule="evenodd" stroke-width="1pt"><path fill="gold" d="M0 0h640v480H0z"/><path fill="#0057b8" d="M0 0h640v240H0z"/></g></svg>'
};

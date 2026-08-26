/** Programmes 4ème année — Bac tunisien (manuel / répartition habituelle) */

export const SECTIONS = [
  { id: "Mathématiques", label: "Mathématiques" },
  { id: "Sciences Expérimentales", label: "Sciences expérimentales" },
  { id: "Économie & Gestion", label: "Économie & Gestion" },
  { id: "Sciences de l'informatique", label: "Sciences de l'informatique" },
  { id: "Lettres", label: "Lettres" },
  { id: "Techniques", label: "Sciences techniques" },
  { id: "Sport", label: "Sport" },
];

export const OPTIONS = [
  { id: "Aucune", label: "Aucune option" },
  { id: "Espagnol", label: "Espagnol" },
  { id: "Italien", label: "Italien" },
  { id: "Allemand", label: "Allemand" },
  { id: "Turc", label: "Turc" },
  { id: "Chinois", label: "Chinois" },
  { id: "Russe", label: "Russe" },
  { id: "Musique", label: "Éducation musicale" },
  { id: "Dessin", label: "Arts plastiques / Dessin" },
];

export const TECHNIQUE_TRACKS = [
  { id: "Mécanique", label: "Mécanique" },
  { id: "Électrique", label: "Électrique" },
];

const ch = (id, title) => ({ id, title });

const MATH_MATH = [
  ch("alg_1", "Continuité et limites"),
  ch("alg_2", "Suites réelles"),
  ch("alg_3", "Dérivabilité"),
  ch("alg_4", "Fonctions réciproques"),
  ch("alg_5", "Étude de fonctions"),
  ch("alg_6", "Primitives"),
  ch("alg_7", "Intégrales"),
  ch("alg_8", "Fonction logarithme népérien"),
  ch("alg_9", "Fonction exponentielle"),
  ch("alg_10", "Équations différentielles"),
  ch("geo_1", "Nombres complexes"),
  ch("geo_2", "Isométries du plan"),
  ch("geo_3", "Déplacements et antidéplacements"),
  ch("geo_4", "Similitudes"),
  ch("geo_5", "Coniques"),
  ch("geo_6", "Géométrie dans l'espace"),
  ch("geo_7", "Arithmétique : divisibilité dans Z"),
  ch("geo_8", "Arithmétique : Bézout, PGCD, congruences"),
  ch("geo_9", "Probabilités"),
  ch("geo_10", "Statistiques"),
];

const MATH_SC = [
  ch("msc_1", "Nombres complexes"),
  ch("msc_2", "Limites et continuité"),
  ch("msc_3", "Dérivation et étude de fonctions"),
  ch("msc_4", "Suites numériques"),
  ch("msc_5", "Logarithme népérien"),
  ch("msc_6", "Exponentielle"),
  ch("msc_7", "Primitives et intégrales"),
  ch("msc_8", "Équations différentielles"),
  ch("msc_9", "Géométrie dans l'espace"),
  ch("msc_10", "Probabilités"),
];

const MATH_ECO = [
  ch("meco_1", "Suites arithmétiques et géométriques"),
  ch("meco_2", "Intérêts simples et composés"),
  ch("meco_3", "Limites, continuité, dérivation"),
  ch("meco_4", "Étude de fonctions"),
  ch("meco_5", "Logarithme et exponentielle"),
  ch("meco_6", "Primitives et intégrales"),
  ch("meco_7", "Statistiques à deux variables"),
  ch("meco_8", "Probabilités et variables aléatoires"),
];

const MATH_INFO = [
  ch("minf_1", "Nombres complexes"),
  ch("minf_2", "Limites, continuité, dérivation"),
  ch("minf_3", "Suites"),
  ch("minf_4", "Logarithme et exponentielle"),
  ch("minf_5", "Intégrales"),
  ch("minf_6", "Équations différentielles"),
  ch("minf_7", "Géométrie dans l'espace"),
  ch("minf_8", "Dénombrement et probabilités"),
  ch("minf_9", "Arithmétique (divisibilité, Bézout)"),
];

const MATH_TECH = [
  ch("mtec_1", "Nombres complexes"),
  ch("mtec_2", "Limites et continuité"),
  ch("mtec_3", "Dérivation et étude de fonctions"),
  ch("mtec_4", "Suites"),
  ch("mtec_5", "Logarithme et exponentielle"),
  ch("mtec_6", "Primitives et intégrales"),
  ch("mtec_7", "Équations différentielles"),
  ch("mtec_8", "Géométrie dans l'espace"),
  ch("mtec_9", "Probabilités"),
];

const MATH_LETTRES = [
  ch("mlet_1", "Pourcentages, proportions, indices"),
  ch("mlet_2", "Statistiques descriptives"),
  ch("mlet_3", "Suites et intérêts"),
  ch("mlet_4", "Fonctions et lecture graphique"),
  ch("mlet_5", "Probabilités élémentaires"),
];

const MATH_SPORT = [
  ch("mspo_1", "Statistiques appliquées"),
  ch("mspo_2", "Fonctions et graphiques"),
  ch("mspo_3", "Pourcentages et proportions"),
  ch("mspo_4", "Probabilités élémentaires"),
];

const PHYSIQUE = [
  ch("phy_1", "Le condensateur — dipôle RC"),
  ch("phy_2", "La bobine — dipôle RL"),
  ch("phy_3", "Oscillations électriques libres (LC / RLC)"),
  ch("phy_4", "Oscillations électriques forcées — résonance"),
  ch("phy_5", "Oscillations mécaniques — analogie électromécanique"),
  ch("phy_6", "Ondes mécaniques progressives"),
  ch("phy_7", "Ondes à la surface d'un liquide"),
  ch("phy_8", "Diffraction des ondes"),
  ch("phy_9", "Ondes lumineuses"),
  ch("phy_10", "Spectre atomique"),
  ch("phy_11", "Noyau atomique et radioactivité"),
  ch("phy_12", "Réactions nucléaires"),
];

const CHIMIE = [
  ch("chi_1", "Avancement d'une réaction chimique"),
  ch("chi_2", "Cinétique chimique"),
  ch("chi_3", "Équilibre chimique — loi d'action de masse"),
  ch("chi_4", "Réactions acide-base et pH"),
  ch("chi_5", "Dosages acido-basiques"),
  ch("chi_6", "Oxydoréduction — potentiel d'un couple"),
  ch("chi_7", "Piles électrochimiques (Daniell, concentration)"),
  ch("chi_8", "Électrolyse"),
];

const SVT = [
  ch("svt_1", "Génétique formelle (croisements, gènes liés)"),
  ch("svt_2", "Génétique humaine"),
  ch("svt_3", "Génie génétique"),
  ch("svt_4", "Le soi et le non-soi"),
  ch("svt_5", "Immunité innée"),
  ch("svt_6", "Immunité adaptative"),
  ch("svt_7", "Dysfonctionnements immunitaires"),
  ch("svt_8", "Le neurone et le message nerveux"),
  ch("svt_9", "La synapse"),
  ch("svt_10", "Motricité et centres nerveux"),
  ch("svt_11", "Reproduction humaine"),
];

const INFO_GEN = [
  ch("inf_1", "Algorithmique : structures de base"),
  ch("inf_2", "Tableaux"),
  ch("inf_3", "Sous-programmes"),
  ch("inf_4", "Fichiers"),
  ch("inf_5", "Bases de données relationnelles"),
  ch("inf_6", "Requêtes SQL"),
];

const PROG_SI = [
  ch("prog_1", "Types, variables, instructions"),
  ch("prog_2", "Structures de contrôle"),
  ch("prog_3", "Tableaux à 1 et 2 dimensions"),
  ch("prog_4", "Fonctions et procédures"),
  ch("prog_5", "Fichiers"),
  ch("prog_6", "Récursivité"),
  ch("prog_7", "Enregistrements / structures"),
  ch("prog_8", "Pointeurs et allocation dynamique"),
  ch("prog_9", "Tris et recherches"),
  ch("prog_10", "Complexité"),
];

const STI = [
  ch("sti_1", "Système d'information"),
  ch("sti_2", "Réseaux informatiques"),
  ch("sti_3", "Architecture d'un ordinateur"),
  ch("sti_4", "Systèmes d'exploitation"),
  ch("sti_5", "MCD / MLD"),
  ch("sti_6", "SQL : jointures, agrégats"),
  ch("sti_7", "Sécurité informatique"),
  ch("sti_8", "Transmission de signaux"),
];

const FRANCAIS = [
  ch("fr_1", "La dissertation"),
  ch("fr_2", "Le commentaire de texte"),
  ch("fr_3", "L'essai / production écrite"),
  ch("fr_4", "Le roman et le récit"),
  ch("fr_5", "Le théâtre"),
  ch("fr_6", "La poésie"),
  ch("fr_7", "L'argumentation et le texte d'idées"),
  ch("fr_8", "L'oral du bac"),
];

const ARABE = [
  ch("ar_1", "تحليل النص الأدبي"),
  ch("ar_2", "المقال"),
  ch("ar_3", "الشعر"),
  ch("ar_4", "النثر (رواية، قصة، مسرح)"),
  ch("ar_5", "النص الحجاجي"),
  ch("ar_6", "البلاغة"),
  ch("ar_7", "قواعد اللغة"),
  ch("ar_8", "الإنتاج الكتابي"),
];

const ANGLAIS = [
  ch("en_1", "Reading comprehension"),
  ch("en_2", "Language (grammar & vocabulary)"),
  ch("en_3", "Writing : essay"),
  ch("en_4", "Writing : correspondence / article"),
  ch("en_5", "Listening"),
  ch("en_6", "Speaking"),
  ch("en_7", "Themes : education, media, environment"),
  ch("en_8", "Themes : science, work, culture"),
];

const PHILO = [
  ch("ph_1", "L'existence humaine"),
  ch("ph_2", "La conscience"),
  ch("ph_3", "Autrui"),
  ch("ph_4", "Le travail"),
  ch("ph_5", "L'État et le politique"),
  ch("ph_6", "La justice"),
  ch("ph_7", "La raison et le réel"),
  ch("ph_8", "La vérité"),
  ch("ph_9", "La science"),
  ch("ph_10", "L'art"),
  ch("ph_11", "La morale"),
  ch("ph_12", "La religion"),
  ch("ph_13", "La liberté"),
  ch("ph_14", "Le bonheur"),
];

const HISTOIRE = [
  ch("hi_1", "La Tunisie au XIXe siècle et les réformes"),
  ch("hi_2", "Le protectorat et le mouvement national"),
  ch("hi_3", "L'indépendance et la construction de l'État"),
  ch("hi_4", "La Première Guerre mondiale"),
  ch("hi_5", "L'entre-deux-guerres"),
  ch("hi_6", "La Seconde Guerre mondiale"),
  ch("hi_7", "La Guerre froide"),
  ch("hi_8", "La décolonisation"),
  ch("hi_9", "Le monde depuis 1991"),
];

const GEO = [
  ch("geo_tn_1", "La mondialisation"),
  ch("geo_tn_2", "Les espaces productifs"),
  ch("geo_tn_3", "Ressources et environnement"),
  ch("geo_tn_4", "Population et villes"),
  ch("geo_tn_5", "Inégalités de développement"),
  ch("geo_tn_6", "La Tunisie : territoire et aménagement"),
  ch("geo_tn_7", "La Méditerranée"),
];

const PENSEE_ISL = [
  ch("isl_1", "العقيدة"),
  ch("isl_2", "الأخلاق"),
  ch("isl_3", "الأسرة والمجتمع"),
  ch("isl_4", "العبادات ومقاصدها"),
  ch("isl_5", "التعامل مع الآخر"),
  ch("isl_6", "قضايا معاصرة"),
];

const ECONOMIE = [
  ch("eco_1", "Le consommateur et l'équilibre"),
  ch("eco_2", "Le producteur et l'équilibre"),
  ch("eco_3", "Le marché et les prix"),
  ch("eco_4", "La croissance économique"),
  ch("eco_5", "Le développement durable"),
  ch("eco_6", "L'inflation"),
  ch("eco_7", "Le chômage"),
  ch("eco_8", "Le rôle de l'État"),
  ch("eco_9", "La monnaie et la politique monétaire"),
  ch("eco_10", "Les échanges internationaux"),
];

const GESTION = [
  ch("ges_1", "L'entreprise et ses fonctions"),
  ch("ges_2", "Comptabilité générale"),
  ch("ges_3", "Bilan et résultat"),
  ch("ges_4", "Gestion des stocks"),
  ch("ges_5", "Gestion de la production"),
  ch("ges_6", "Gestion commerciale / marketing"),
  ch("ges_7", "Gestion des ressources humaines"),
  ch("ges_8", "Gestion financière"),
  ch("ges_9", "Bilan fonctionnel, FR, BFR"),
  ch("ges_10", "Budgets"),
];

const EPS_THEORIE = [
  ch("eps_1", "Anatomie et physiologie de l'effort"),
  ch("eps_2", "Entraînement sportif"),
  ch("eps_3", "Métabolisme énergétique"),
  ch("eps_4", "Nutrition du sportif"),
  ch("eps_5", "Préparation physique et récupération"),
  ch("eps_6", "Psychologie du sport"),
  ch("eps_7", "Règlements et arbitrage"),
];

const MECA = [
  ch("mec_1", "Statique"),
  ch("mec_2", "Résistance des matériaux"),
  ch("mec_3", "Cinématique des mécanismes"),
  ch("mec_4", "Dynamique"),
  ch("mec_5", "Construction mécanique"),
  ch("mec_6", "Matériaux"),
  ch("mec_7", "Transmission de puissance"),
  ch("mec_8", "Automatismes"),
];

const ELEC = [
  ch("ele_1", "Régime continu"),
  ch("ele_2", "Régime sinusoïdal monophasé"),
  ch("ele_3", "Régime triphasé"),
  ch("ele_4", "Transformateurs"),
  ch("ele_5", "Machines à courant continu"),
  ch("ele_6", "Machines asynchrones"),
  ch("ele_7", "Électronique analogique"),
  ch("ele_8", "Électronique numérique"),
  ch("ele_9", "Automatismes / GRAFCET"),
];

const LANGUE_OPT = (code) => [
  ch(`${code}_1`, "Compréhension écrite"),
  ch(`${code}_2`, "Compréhension orale"),
  ch(`${code}_3`, "Grammaire"),
  ch(`${code}_4`, "Vocabulaire et actes de parole"),
  ch(`${code}_5`, "Expression écrite"),
  ch(`${code}_6`, "Expression orale"),
  ch(`${code}_7`, "Civilisation"),
  ch(`${code}_8`, "Entraînement épreuve du bac"),
];

export const SUBJECTS = {
  math_math: { name: "Mathématiques", icon: "∑", chapters: MATH_MATH },
  math_sc: { name: "Mathématiques", icon: "∑", chapters: MATH_SC },
  math_eco: { name: "Mathématiques", icon: "∑", chapters: MATH_ECO },
  math_info: { name: "Mathématiques", icon: "∑", chapters: MATH_INFO },
  math_tech: { name: "Mathématiques", icon: "∑", chapters: MATH_TECH },
  math_lettres: { name: "Mathématiques (option / tronc)", icon: "∑", chapters: MATH_LETTRES },
  math_sport: { name: "Mathématiques", icon: "∑", chapters: MATH_SPORT },
  physique: { name: "Physique", icon: "⚛", chapters: PHYSIQUE },
  chimie: { name: "Chimie", icon: "🧪", chapters: CHIMIE },
  svt: { name: "SVT", icon: "🧬", chapters: SVT },
  info: { name: "Informatique", icon: "💻", chapters: INFO_GEN },
  programmation: { name: "Programmation", icon: "⌨️", chapters: PROG_SI },
  sti: { name: "STI", icon: "🖧", chapters: STI },
  francais: { name: "Français", icon: "🇫🇷", chapters: FRANCAIS },
  arabe: { name: "Arabe", icon: "🇹🇳", chapters: ARABE },
  anglais: { name: "Anglais", icon: "🇬🇧", chapters: ANGLAIS },
  philo: { name: "Philosophie", icon: "💭", chapters: PHILO },
  histoire: { name: "Histoire", icon: "📜", chapters: HISTOIRE },
  geo: { name: "Géographie", icon: "🌍", chapters: GEO },
  pensee_islamique: { name: "Pensée islamique", icon: "☪", chapters: PENSEE_ISL },
  economie: { name: "Économie", icon: "📈", chapters: ECONOMIE },
  gestion: { name: "Gestion", icon: "💼", chapters: GESTION },
  eps: { name: "Sport — théorie", icon: "🏅", chapters: EPS_THEORIE },
  mecanique: { name: "Technologie — Mécanique", icon: "⚙️", chapters: MECA },
  electrique: { name: "Technologie — Électrique", icon: "🔌", chapters: ELEC },
  opt_espagnol: { name: "Option Espagnol", icon: "🇪🇸", chapters: LANGUE_OPT("es") },
  opt_italien: { name: "Option Italien", icon: "🇮🇹", chapters: LANGUE_OPT("it") },
  opt_allemand: { name: "Option Allemand", icon: "🇩🇪", chapters: LANGUE_OPT("de") },
  opt_turc: { name: "Option Turc", icon: "🇹🇷", chapters: LANGUE_OPT("tr") },
  opt_chinois: { name: "Option Chinois", icon: "🇨🇳", chapters: LANGUE_OPT("zh") },
  opt_russe: { name: "Option Russe", icon: "🇷🇺", chapters: LANGUE_OPT("ru") },
  opt_musique: {
    name: "Option Musique",
    icon: "🎵",
    chapters: [
      ch("mus_1", "Solfège"),
      ch("mus_2", "Rythme"),
      ch("mus_3", "Harmonie"),
      ch("mus_4", "Histoire de la musique"),
      ch("mus_5", "Analyse d'œuvre"),
      ch("mus_6", "Pratique"),
    ],
  },
  opt_dessin: {
    name: "Option Arts plastiques",
    icon: "🎨",
    chapters: [
      ch("art_1", "Dessin d'observation"),
      ch("art_2", "Composition"),
      ch("art_3", "Couleur et volumes"),
      ch("art_4", "Perspective"),
      ch("art_5", "Histoire de l'art"),
      ch("art_6", "Épreuve pratique"),
    ],
  },
};

const OPTION_SUBJECT = {
  Espagnol: "opt_espagnol",
  Italien: "opt_italien",
  Allemand: "opt_allemand",
  Turc: "opt_turc",
  Chinois: "opt_chinois",
  Russe: "opt_russe",
  Musique: "opt_musique",
  Dessin: "opt_dessin",
};

const SECTION_CORE = {
  Mathématiques: ["math_math", "physique", "chimie", "svt", "info", "francais", "arabe", "anglais", "philo"],
  "Sciences Expérimentales": ["svt", "physique", "chimie", "math_sc", "info", "francais", "arabe", "anglais", "philo"],
  "Économie & Gestion": ["economie", "gestion", "math_eco", "histoire", "geo", "francais", "arabe", "anglais", "philo", "info"],
  "Sciences de l'informatique": ["programmation", "sti", "math_info", "physique", "francais", "arabe", "anglais", "philo"],
  Lettres: ["arabe", "francais", "philo", "histoire", "geo", "anglais", "pensee_islamique"],
  Techniques: ["math_tech", "physique", "chimie", "francais", "arabe", "anglais", "philo"],
  Sport: ["eps", "svt", "physique", "math_sport", "francais", "arabe", "anglais", "philo"],
};

export function normalizeSection(section) {
  if (!section) return "Mathématiques";
  const s = String(section).trim();
  if (/tech/i.test(s)) return "Techniques";
  if (/expérim|experim/i.test(s)) return "Sciences Expérimentales";
  if (/éco|eco/i.test(s)) return "Économie & Gestion";
  if (/info/i.test(s)) return "Sciences de l'informatique";
  if (/lettre/i.test(s)) return "Lettres";
  if (/sport/i.test(s)) return "Sport";
  if (/math/i.test(s)) return "Mathématiques";
  return SECTIONS.some((x) => x.id === s) ? s : "Mathématiques";
}

export function getProgramForUser(section, option, techniqueTrack) {
  const sec = normalizeSection(section);
  const ids = [...(SECTION_CORE[sec] || SECTION_CORE.Mathématiques)];

  if (sec === "Techniques") {
    ids.splice(2, 0, techniqueTrack === "Électrique" ? "electrique" : "mecanique");
  }

  const optId = OPTION_SUBJECT[option];
  if (optId) ids.push(optId);

  return ids.map((id) => ({ id, ...SUBJECTS[id] })).filter((s) => s.chapters);
}

export function countChapters(program) {
  return program.reduce((n, s) => n + s.chapters.length, 0);
}

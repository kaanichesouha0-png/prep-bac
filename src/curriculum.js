/** Programmes 4ème année — Baccalauréat tunisien (toutes sections) */

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
  ch("geo_1", "Nombres complexes"),
  ch("geo_2", "Isométries du plan"),
  ch("geo_3", "Déplacements - Antidéplacements"),
  ch("geo_4", "Similitudes"),
  ch("geo_5", "Coniques"),
  ch("geo_6", "Géométrie dans l'espace"),
  ch("geo_7", "Divisibilité dans Z"),
  ch("geo_8", "Identité de Bézout"),
  ch("geo_9", "Probabilités"),
  ch("geo_10", "Statistiques"),
  ch("alg_1", "Continuité et limites"),
  ch("alg_2", "Suites réelles"),
  ch("alg_3", "Dérivabilité"),
  ch("alg_4", "Fonctions réciproques"),
  ch("alg_5", "Études de fonctions"),
  ch("alg_6", "Primitives"),
  ch("alg_7", "Intégrales"),
  ch("alg_8", "Fonction logarithme népérien"),
  ch("alg_9", "Fonction exponentielle"),
  ch("alg_10", "Équations différentielles"),
];

const MATH_SC = [
  ch("msc_1", "Nombres complexes"),
  ch("msc_2", "Limites et continuité"),
  ch("msc_3", "Dérivation et études de fonctions"),
  ch("msc_4", "Suites réelles"),
  ch("msc_5", "Fonction logarithme népérien"),
  ch("msc_6", "Fonction exponentielle"),
  ch("msc_7", "Primitives et intégrales"),
  ch("msc_8", "Équations différentielles"),
  ch("msc_9", "Géométrie dans l'espace"),
  ch("msc_10", "Probabilités"),
  ch("msc_11", "Statistiques"),
];

const MATH_ECO = [
  ch("meco_1", "Suites numériques"),
  ch("meco_2", "Limites et continuité"),
  ch("meco_3", "Dérivation"),
  ch("meco_4", "Étude de fonctions"),
  ch("meco_5", "Fonctions logarithme et exponentielle"),
  ch("meco_6", "Primitives et intégrales"),
  ch("meco_7", "Statistiques descriptives"),
  ch("meco_8", "Probabilités"),
  ch("meco_9", "Variables aléatoires"),
  ch("meco_10", "Intérêts, suites arithmétiques et géométriques"),
];

const MATH_INFO = [
  ch("minf_1", "Nombres complexes"),
  ch("minf_2", "Limites, continuité, dérivation"),
  ch("minf_3", "Suites réelles"),
  ch("minf_4", "Logarithme et exponentielle"),
  ch("minf_5", "Intégrales"),
  ch("minf_6", "Équations différentielles"),
  ch("minf_7", "Géométrie dans l'espace"),
  ch("minf_8", "Dénombrement et probabilités"),
  ch("minf_9", "Statistiques"),
  ch("minf_10", "Arithmétique (divisibilité, Bézout)"),
];

const MATH_TECH = [
  ch("mtec_1", "Nombres complexes"),
  ch("mtec_2", "Limites et continuité"),
  ch("mtec_3", "Dérivation et études de fonctions"),
  ch("mtec_4", "Suites"),
  ch("mtec_5", "Logarithme et exponentielle"),
  ch("mtec_6", "Primitives et intégrales"),
  ch("mtec_7", "Équations différentielles"),
  ch("mtec_8", "Géométrie dans l'espace"),
  ch("mtec_9", "Nombres complexes et transformations"),
  ch("mtec_10", "Probabilités"),
];

const MATH_LETTRES = [
  ch("mlet_1", "Pourcentages et proportions"),
  ch("mlet_2", "Statistiques descriptives"),
  ch("mlet_3", "Suites et intérêts"),
  ch("mlet_4", "Fonctions de référence"),
  ch("mlet_5", "Lecture graphique"),
  ch("mlet_6", "Probabilités élémentaires"),
];

const MATH_SPORT = [
  ch("mspo_1", "Statistiques appliquées au sport"),
  ch("mspo_2", "Fonctions et lecture graphique"),
  ch("mspo_3", "Pourcentages et proportions"),
  ch("mspo_4", "Probabilités élémentaires"),
  ch("mspo_5", "Suites simples"),
];

const PHYSIQUE = [
  ch("phy_1", "Mécanique : cinématique"),
  ch("phy_2", "Lois de Newton et dynamiques"),
  ch("phy_3", "Travail, énergie, puissance"),
  ch("phy_4", "Oscillations mécaniques"),
  ch("phy_5", "Le condensateur — dipôle RC"),
  ch("phy_6", "La bobine — dipôle RL"),
  ch("phy_7", "Dipôle LC et oscillations électriques"),
  ch("phy_8", "Dipôle RLC série (libre et forcé)"),
  ch("phy_9", "Analogie oscillations mécaniques / électriques"),
  ch("phy_10", "Ondes mécaniques progressives"),
  ch("phy_11", "Ondes lumineuses, diffraction, interférences"),
  ch("phy_12", "Radioactivité et nucléaire"),
];

const CHIMIE = [
  ch("chi_1", "Transformations chimiques et avancement"),
  ch("chi_2", "Cinétique chimique"),
  ch("chi_3", "Équilibre chimique — loi d'action de masse"),
  ch("chi_4", "Réactions acide-base et pH"),
  ch("chi_5", "Dosages acido-basiques"),
  ch("chi_6", "Oxydoréduction"),
  ch("chi_7", "Piles électrochimiques"),
  ch("chi_8", "Électrolyse"),
  ch("chi_9", "Chimie organique : familles et réactions"),
];

const SVT = [
  ch("svt_1", "Génétique mendélienne"),
  ch("svt_2", "Génétique humaine et hérédité"),
  ch("svt_3", "Génie génétique"),
  ch("svt_4", "Immunologie — le soi et le non-soi"),
  ch("svt_5", "Réponse immunitaire innée et adaptative"),
  ch("svt_6", "Dysfonctionnements immunitaires"),
  ch("svt_7", "Neurophysiologie — le neurone"),
  ch("svt_8", "Synapse et message nerveux"),
  ch("svt_9", "Motricité et intégration nerveuse"),
  ch("svt_10", "Reproduction humaine"),
  ch("svt_11", "Écologie et environnement"),
];

const INFO_GEN = [
  ch("inf_1", "Algorithmique de base"),
  ch("inf_2", "Structures conditionnelles et répétitives"),
  ch("inf_3", "Tableaux et chaînes"),
  ch("inf_4", "Fonctions et procédures"),
  ch("inf_5", "Bases de données — modèle relationnel"),
  ch("inf_6", "Requêtes SQL"),
  ch("inf_7", "Tableur et traitements de données"),
];

const PROG_SI = [
  ch("prog_1", "Types, variables, instructions"),
  ch("prog_2", "Structures de contrôle"),
  ch("prog_3", "Tableaux à une et deux dimensions"),
  ch("prog_4", "Sous-programmes"),
  ch("prog_5", "Fichiers"),
  ch("prog_6", "Récursivité"),
  ch("prog_7", "Structures et enregistrements"),
  ch("prog_8", "Pointeurs et allocation dynamique"),
  ch("prog_9", "Tris et recherches"),
  ch("prog_10", "Complexité d'un algorithme"),
];

const STI = [
  ch("sti_1", "Systèmes d'information"),
  ch("sti_2", "Réseaux informatiques"),
  ch("sti_3", "Architecture d'un ordinateur"),
  ch("sti_4", "Systèmes d'exploitation"),
  ch("sti_5", "Bases de données avancées"),
  ch("sti_6", "Modèle conceptuel de données (MCD / MLD)"),
  ch("sti_7", "SQL : jointures, agrégats, vues"),
  ch("sti_8", "Sécurité informatique"),
  ch("sti_9", "Web et hypertexte"),
];

const FRANCAIS = [
  ch("fr_1", "Lecture méthodique / analyse de texte"),
  ch("fr_2", "L'argumentation et la dissertation"),
  ch("fr_3", "Le commentaire composé"),
  ch("fr_4", "Le roman et le récit"),
  ch("fr_5", "Le théâtre"),
  ch("fr_6", "La poésie"),
  ch("fr_7", "L'essai et le texte d'idées"),
  ch("fr_8", "Expression écrite : production"),
  ch("fr_9", "Oral / entretien"),
];

const ARABE = [
  ch("ar_1", "تحليل النص الأدبي"),
  ch("ar_2", "المقال / الإنشاء"),
  ch("ar_3", "الشعر"),
  ch("ar_4", "النثر (رواية، قصة، مسرح)"),
  ch("ar_5", "النّصّ الحجاجي"),
  ch("ar_6", "البلاغة"),
  ch("ar_7", "قواعد اللغة"),
  ch("ar_8", "الإنتاج الكتابي"),
];

const ANGLAIS = [
  ch("en_1", "Reading comprehension"),
  ch("en_2", "Listening comprehension"),
  ch("en_3", "Language / grammar"),
  ch("en_4", "Vocabulary & functions"),
  ch("en_5", "Writing : essay & correspondence"),
  ch("en_6", "Speaking / oral"),
  ch("en_7", "Bac topics : education, media, environment"),
  ch("en_8", "Bac topics : science, work, culture"),
];

const PHILO = [
  ch("ph_1", "L'existence humaine"),
  ch("ph_2", "Autrui"),
  ch("ph_3", "Le travail"),
  ch("ph_4", "La politique et l'État"),
  ch("ph_5", "La justice"),
  ch("ph_6", "La vérité et la raison"),
  ch("ph_7", "La science"),
  ch("ph_8", "L'art"),
  ch("ph_9", "La morale"),
  ch("ph_10", "La religion"),
  ch("ph_11", "La liberté"),
  ch("ph_12", "Le bonheur"),
];

const HISTOIRE = [
  ch("hi_1", "La Tunisie au XIXe siècle et les réformes"),
  ch("hi_2", "Le protectorat et le mouvement national"),
  ch("hi_3", "L'indépendance et l'État-nation"),
  ch("hi_4", "La Première Guerre mondiale"),
  ch("hi_5", "L'entre-deux-guerres"),
  ch("hi_6", "La Seconde Guerre mondiale"),
  ch("hi_7", "La Guerre froide"),
  ch("hi_8", "La décolonisation"),
  ch("hi_9", "Le monde depuis 1989"),
];

const GEO = [
  ch("geo_tn_1", "La mondialisation"),
  ch("geo_tn_2", "Les espaces de la production"),
  ch("geo_tn_3", "Les ressources et l'environnement"),
  ch("geo_tn_4", "Population et urbanisation"),
  ch("geo_tn_5", "Les inégalités de développement"),
  ch("geo_tn_6", "La Tunisie : territoire et aménagement"),
  ch("geo_tn_7", "La Méditerranée, espace d'échanges"),
];

const PENSEE_ISL = [
  ch("isl_1", "العقيدة"),
  ch("isl_2", "الأخلاق الإسلامية"),
  ch("isl_3", "الأسرة والمجتمع"),
  ch("isl_4", "العبادات ومقاصدها"),
  ch("isl_5", "التعامل مع الآخر"),
  ch("isl_6", "قضايا معاصرة"),
];

const ECONOMIE = [
  ch("eco_1", "Le comportement et l'équilibre du consommateur"),
  ch("eco_2", "Le comportement et l'équilibre du producteur"),
  ch("eco_3", "Le marché et la formation des prix"),
  ch("eco_4", "La croissance économique"),
  ch("eco_5", "Le développement durable"),
  ch("eco_6", "L'inflation"),
  ch("eco_7", "Le chômage"),
  ch("eco_8", "Le rôle de l'État"),
  ch("eco_9", "La monnaie et la politique monétaire"),
  ch("eco_10", "Les échanges internationaux"),
  ch("eco_11", "Les déséquilibres macroéconomiques"),
];

const GESTION = [
  ch("ges_1", "L'entreprise et ses fonctions"),
  ch("ges_2", "Comptabilité générale — principes"),
  ch("ges_3", "Le bilan et le compte de résultat"),
  ch("ges_4", "Gestion des stocks"),
  ch("ges_5", "Gestion de la production"),
  ch("ges_6", "Gestion commerciale / marketing"),
  ch("ges_7", "Gestion des ressources humaines"),
  ch("ges_8", "Gestion financière — financement"),
  ch("ges_9", "Bilan fonctionnel et FR / BFR"),
  ch("ges_10", "Budgets et contrôle de gestion"),
];

const EPS_THEORIE = [
  ch("eps_1", "Anatomie et physiologie de l'effort"),
  ch("eps_2", "Entraînement sportif"),
  ch("eps_3", "Énergie et métabolisme"),
  ch("eps_4", "Nutrition du sportif"),
  ch("eps_5", "Préparation physique et récupération"),
  ch("eps_6", "Psychologie du sport"),
  ch("eps_7", "Règlements et arbitrage"),
  ch("eps_8", "Épreuves pratiques du bac sport"),
];

const MECA = [
  ch("mec_1", "Statique du solide"),
  ch("mec_2", "Résistance des matériaux"),
  ch("mec_3", "Cinématique des mécanismes"),
  ch("mec_4", "Dynamique"),
  ch("mec_5", "Construction mécanique"),
  ch("mec_6", "Technologie des matériaux"),
  ch("mec_7", "Transmission de puissance"),
  ch("mec_8", "Automatismes"),
];

const ELEC = [
  ch("ele_1", "Circuits en régime continu"),
  ch("ele_2", "Régime sinusoïdal — monophasé"),
  ch("ele_3", "Régime triphasé"),
  ch("ele_4", "Transformateurs"),
  ch("ele_5", "Machines à courant continu"),
  ch("ele_6", "Machines asynchrones"),
  ch("ele_7", "Électronique analogique"),
  ch("ele_8", "Électronique numérique"),
  ch("ele_9", "Automatismes et GRAFCET"),
];

const LANGUE_OPT = (code) => [
  ch(`${code}_1`, "Compréhension écrite"),
  ch(`${code}_2`, "Compréhension orale"),
  ch(`${code}_3`, "Grammaire et conjugaison"),
  ch(`${code}_4`, "Vocabulaire et actes de parole"),
  ch(`${code}_5`, "Expression écrite"),
  ch(`${code}_6`, "Expression orale"),
  ch(`${code}_7`, "Civilisation et culture"),
  ch(`${code}_8`, "Entraînement épreuve du bac"),
];

export const SUBJECTS = {
  math_math: { name: "Mathématiques", icon: "∑", chapters: MATH_MATH },
  math_sc: { name: "Mathématiques", icon: "∑", chapters: MATH_SC },
  math_eco: { name: "Mathématiques", icon: "∑", chapters: MATH_ECO },
  math_info: { name: "Mathématiques", icon: "∑", chapters: MATH_INFO },
  math_tech: { name: "Mathématiques", icon: "∑", chapters: MATH_TECH },
  math_lettres: { name: "Mathématiques", icon: "∑", chapters: MATH_LETTRES },
  math_sport: { name: "Mathématiques", icon: "∑", chapters: MATH_SPORT },
  physique: { name: "Sciences physiques", icon: "⚛", chapters: PHYSIQUE },
  chimie: { name: "Chimie", icon: "🧪", chapters: CHIMIE },
  svt: { name: "SVT", icon: "🧬", chapters: SVT },
  info: { name: "Informatique", icon: "💻", chapters: INFO_GEN },
  programmation: { name: "Programmation", icon: "⌨️", chapters: PROG_SI },
  sti: { name: "STI / Systèmes d'information", icon: "🖧", chapters: STI },
  francais: { name: "Français", icon: "🇫🇷", chapters: FRANCAIS },
  arabe: { name: "Arabe", icon: "🇹🇳", chapters: ARABE },
  anglais: { name: "Anglais", icon: "🇬🇧", chapters: ANGLAIS },
  philo: { name: "Philosophie", icon: "💭", chapters: PHILO },
  histoire: { name: "Histoire", icon: "📜", chapters: HISTOIRE },
  geo: { name: "Géographie", icon: "🌍", chapters: GEO },
  pensee_islamique: { name: "Pensée islamique", icon: "☪", chapters: PENSEE_ISL },
  economie: { name: "Économie", icon: "📈", chapters: ECONOMIE },
  gestion: { name: "Gestion", icon: "💼", chapters: GESTION },
  eps: { name: "Éducation physique (théorie)", icon: "🏅", chapters: EPS_THEORIE },
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
      ch("mus_1", "Solfège et lecture de notes"),
      ch("mus_2", "Rythme et mesures"),
      ch("mus_3", "Harmonie et accords"),
      ch("mus_4", "Histoire de la musique"),
      ch("mus_5", "Analyse d'œuvre"),
      ch("mus_6", "Pratique instrumentale / vocale"),
      ch("mus_7", "Épreuve du bac musique"),
    ],
  },
  opt_dessin: {
    name: "Option Arts plastiques / Dessin",
    icon: "🎨",
    chapters: [
      ch("art_1", "Dessin d'observation"),
      ch("art_2", "Composition et proportions"),
      ch("art_3", "Couleur et volumes"),
      ch("art_4", "Perspective"),
      ch("art_5", "Histoire de l'art"),
      ch("art_6", "Techniques (crayon, peinture, collage)"),
      ch("art_7", "Épreuve pratique du bac"),
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
  "Sciences de l'informatique": ["programmation", "sti", "math_info", "physique", "chimie", "francais", "arabe", "anglais", "philo"],
  Lettres: ["arabe", "francais", "philo", "histoire", "geo", "anglais", "pensee_islamique", "math_lettres"],
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

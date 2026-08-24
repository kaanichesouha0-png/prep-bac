import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

// Configuration Supabase (Remplace par tes vraies clés si nécessaire)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialisation de Gemini avec ta clé API
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const ADMIN_EMAIL = "souha.admin@gmail.com";
const TARGET_DATE = new Date("2027-06-07T08:00:00").getTime();

const mathProgram = [
  {
    category: "Géométrie & Arithmétique",
    chapters: [
      { id: "geo_1", title: "Nombres complexes" },
      { id: "geo_2", title: "Isométries du plan" },
      { id: "geo_3", title: "Déplacements - Antidéplacements" },
      { id: "geo_4", title: "Similitudes" },
      { id: "geo_5", title: "Coniques" },
      { id: "geo_6", title: "Géométrie dans l'espace" },
      { id: "geo_7", title: "Divisibilité dans Z" },
      { id: "geo_8", title: "Identité de Bézout" },
      { id: "geo_9", title: "Probabilités" },
      { id: "geo_10", title: "Statistiques" },
    ],
  },
  {
    category: "Algèbre & Analyse",
    chapters: [
      { id: "alg_1", title: "Continuité et limites" },
      { id: "alg_2", title: "Suites réelles" },
      { id: "alg_3", title: "Dérivabilité" },
      { id: "alg_4", title: "Fonctions réciproques" },
      { id: "alg_5", title: "Études de fonctions" },
      { id: "alg_6", title: "Primitives" },
      { id: "alg_7", title: "Intégrales" },
      { id: "alg_8", title: "Fonction logarithme népérien" },
      { id: "alg_9", title: "Fonction exponentielle" },
      { id: "alg_10", title: "Équations différentielles" },
    ],
  },
];

const randomQuestions = [
  "Prête pour ta session ?",
  "Quel chapitre va-t-on maîtriser aujourd'hui ?",
  "Prête à tout donner pour le Bac 20/20 ?",
  "On vise l'excellence aujourd'hui ?",
];

const initialFlashcards = [
  { id: 1, q: "Forme trigonométrique de z = a + ib ?", a: "z = r(cos θ + i sin θ), avec r = |z| et θ = arg(z) [2π]." },
  { id: 2, q: "Dérivée de ln(u(x)) ?", a: "u'(x) / u(x)" },
  { id: 3, q: "Module de z * z' ?", a: "|z| * |z'|" },
  { id: 4, q: "Solution générale de y'' + w²y = 0 ?", a: "y(x) = A cos(wx) + B sin(wx)" }
];

function loadStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`Impossible de sauvegarder ${key}`);
  }
}

function calculateTimeLeft() {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function App() {
  // --- Authentification & Profil utilisateur ---
  const [session, setSession] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [section, setSection] = useState("Mathématiques");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Enregistrement des logs de connexion et profil utilisateur pour l'Admin
  useEffect(() => {
    async function logUserConnection() {
      if (session?.user) {
        const metadata = session.user.user_metadata || {};
        const logData = {
          email: session.user.email,
          first_name: metadata.first_name || "Inconnu",
          last_name: metadata.last_name || "",
          section: metadata.section || "Mathématiques",
          last_seen: new Date().toISOString()
        };
        await supabase.from('user_logs').upsert([logData], { onConflict: 'email' });
      }
    }
    logUserConnection();
  }, [session]);

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email: authEmail,
        password: authPassword,
        options: {
          data: { first_name: firstName, last_name: lastName, section: section }
        }
      });
      if (error) setAuthError(error.message);
      else alert("Inscription réussie ! Vérifie tes emails si une confirmation est requise.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
      if (error) setAuthError(error.message);
    }
  }

  const userId = session?.user?.id || "local_user";
  const userMetadata = session?.user?.user_metadata || {};
  const currentFirstName = userMetadata.first_name || firstName || "Souha";

  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem(`bac_theme_${userId}`) || "light");
  const [customColor, setCustomColor] = useState(() => localStorage.getItem(`bac_custom_color_${userId}`) || "#6366f1");
  const [greetingQuestion, setGreetingQuestion] = useState("");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [weakChapters, setWeakChapters] = useState(() => loadStorage(`bac_weak_chapters_${userId}`, []));

  // --- Liaison automatique Mood / Énergie ---
  const [mood, setMood] = useState(() => localStorage.getItem(`bac_mood_${userId}`) || "🚀 Ultra Motivée");
  const [energyLevel, setEnergyLevel] = useState(() => Number(localStorage.getItem(`bac_energy_${userId}`)) || 85);

  const handleMoodChange = (newMood) => {
    setMood(newMood);
    if (newMood.includes("Ultra Motivée")) setEnergyLevel(90);
    else if (newMood.includes("Sereine")) setEnergyLevel(75);
    else if (newMood.includes("stressée")) setEnergyLevel(45);
    else if (newMood.includes("Fatiguée")) setEnergyLevel(20);
  };

  const handleEnergyChange = (newEnergy) => {
    setEnergyLevel(newEnergy);
    if (newEnergy >= 75) setMood("🚀 Ultra Motivée");
    else if (newEnergy >= 50) setMood("😊 Sereine & Concentrée");
    else if (newEnergy >= 25) setMood("😰 Un peu stressée");
    else setMood("😴 Fatiguée / Besoin de repos");
  };

  // --- Objectifs gérés avec Supabase (Isolés par utilisateur) ---
  const [goals, setGoals] = useState([]);
  const [newGoalText, setNewGoalText] = useState("");

  useEffect(() => {
    async function fetchGoals() {
      if (!session) return;
      const { data, error } = await supabase.from('goals').select('*').eq('user_id', userId);
      if (!error && data) setGoals(data);
    }
    fetchGoals();
  }, [session, userId]);

  async function addGoal(e) {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    const newGoal = { text: newGoalText.trim(), done: false, user_id: userId };
    const { data, error } = await supabase.from('goals').insert([newGoal]).select();
    if (!error && data) {
      setGoals((prev) => [...prev, data[0]]);
      setNewGoalText("");
    }
  }

  async function deleteGoal(goalId) {
    const { error } = await supabase.from('goals').delete().eq('id', goalId);
    if (!error) {
      setGoals((prev) => prev.filter(g => g.id !== goalId));
    }
  }

  // --- Smart Agenda, Notes, Cours ---
  const [smartGoals, setSmartGoals] = useState(() => loadStorage(`bac_smart_goals_${userId}`, []));
  const [newSmartTitle, setNewSmartTitle] = useState("");
  const [newSmartDeadline, setNewSmartDeadline] = useState("");
  const [newSmartTarget, setNewSmartTarget] = useState("");
  const [newSmartTaskInput, setNewSmartTaskInput] = useState("");
  const [currentSmartTasks, setCurrentSmartTasks] = useState([]);

  const [grades, setGrades] = useState(() => loadStorage(`bac_grades_${userId}`, [{ id: 1, subject: "Mathématiques", note: 16, coef: 4 }]));
  const [subInput, setSubInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [coefInput, setCoefInput] = useState("1");

  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [newEventText, setNewEventText] = useState("");
  const [calendarEvents, setCalendarEvents] = useState(() => loadStorage(`bac_calendar_${userId}`, []));

  // --- Chatbot Gemini avec Historique et Nouveau Chat ---
  const [chatMessages, setChatMessages] = useState(() => loadStorage(`bac_chat_${userId}`, [
    { id: 1, sender: "bot", text: `Coucou ${currentFirstName} ! 👋 Je suis ton assistant Gemini. Pose-moi tes questions, envoie une photo d'exercice ou demande-moi de générer des flashcards.` }
  ]));
  const [chatInput, setChatInput] = useState("");
  const [attachedImage, setAttachedImage] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const chatBottomRef = useRef(null);

  function startNewChat() {
    const initialMsg = { id: Date.now(), sender: "bot", text: `Nouveau chat initialisé ! Comment puis-je t'aider ${currentFirstName} ?` };
    setChatMessages([initialMsg]);
    setAttachedImage(null);
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    if ((!chatInput.trim() && !attachedImage) || loadingChat) return;

    const userText = chatInput.trim();
    const currentImg = attachedImage;

    const userMsg = { id: Date.now(), sender: "user", text: userText, image: currentImg };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setAttachedImage(null);
    setLoadingChat(true);

    try {
      let promptContent = userText;
      let modelToUse = 'gemini-1.5-flash';

      // Si l'utilisateur demande de générer des flashcards
      if (userText.toLowerCase().includes("flashcard") || userText.toLowerCase().includes("génère des flashcards")) {
        promptContent = `À partir de ce texte ou sujet "${userText}", génère 3 flashcards sous format JSON strict avec un tableau d'objets ayant les clés "q" (question) et "a" (réponse).`;
      }

      const response = await ai.models.generateContent({
        model: modelToUse,
        contents: promptContent,
      });

      const botReply = response.text || "Désolé, je n'ai pas pu générer de réponse.";

      // Si le bot a généré des flashcards, on les ajoute automatiquement à la liste
      if (userText.toLowerCase().includes("flashcard") && botReply.includes("q")) {
        try {
          // Extraction basique ou ajout direct
          setFlashcardsList(prev => [...prev, { id: Date.now(), q: "Générée par Gemini : " + userText, a: botReply }]);
        } catch (err) {
          console.log("Erreur parsing flashcards", err);
        }
      }

      setChatMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Erreur Gemini:", error);
      setChatMessages((prev) => [...prev, { id: Date.now() + 1, sender: "bot", text: "Oups, une erreur est survenue avec Gemini." }]);
    } finally {
      setLoadingChat(false);
    }
  }

  const [courses, setCourses] = useState(() => loadStorage(`bac_courses_${userId}`, []));
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseUrl, setNewCourseUrl] = useState("");

  // --- Minuteur Pomodoro (Par heure / modifiable) ---
  const [pomoHours, setPomoHours] = useState(1);
  const [pomoMinutes, setPomoMinutes] = useState(0);
  const [pomoSeconds, setPomoSeconds] = useState(0);
  const [totalPomoSeconds, setTotalPomoSeconds] = useState(3600);
  const [pomoActive, setPomoActive] = useState(false);

  // --- Flashcards modifiables et supprimables ---
  const [flashcardsList, setFlashcardsList] = useState(() => loadStorage(`bac_flashcards_${userId}`, initialFlashcards));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newCardQ, setNewCardQ] = useState("");
  const [newCardA, setNewCardA] = useState("");

  function addFlashcard(e) {
    e.preventDefault();
    if (!newCardQ.trim() || !newCardA.trim()) return;
    setFlashcardsList(prev => [...prev, { id: Date.now(), q: newCardQ.trim(), a: newCardA.trim() }]);
    setNewCardQ("");
    setNewCardA("");
  }

  function deleteFlashcard(id) {
    setFlashcardsList(prev => prev.filter(f => f.id !== id));
    if (currentCardIndex >= flashcardsList.length - 1) {
      setCurrentCardIndex(Math.max(0, flashcardsList.length - 2));
    }
  }

  // --- Espace Admin (Accessible uniquement par l'email administrateur) ---
  const [userLogs, setUserLogs] = useState([]);
  useEffect(() => {
    async function fetchLogs() {
      if (session?.user?.email === ADMIN_EMAIL) {
        const { data, error } = await supabase.from('user_logs').select('*');
        if (!error && data) setUserLogs(data);
      }
    }
    fetchLogs();
  }, [session]);

  // Éléments du menu
  const menuItems = [
    { id: "home", icon: "🏠", label: "Accueil & Thèmes" },
    { id: "smartAgenda", icon: "🎯", label: "Smart Agenda" },
    { id: "chat", icon: "🤖", label: "Chatbot Gemini" },
    { id: "flashcards", icon: "🎴", label: "Flashcards" },
    { id: "courses", icon: "📖", label: "Fiches & Cours" },
    { id: "calendar", icon: "📅", label: "Mon Calendrier" },
    { id: "goals", icon: "📌", label: "Objectifs Rapides" },
    { id: "countdown", icon: "⏱️", label: "Bac Countdown" },
    { id: "pomodoro", icon: "⏳", label: "Pomodoro" },
    { id: "mood", icon: "🧠", label: "Journal & Conseil" },
    { id: "grades", icon: "📊", label: "Mes Notes" },
    { id: "chapters", icon: "📚", label: "Chapitres & Points Faibles" },
    ...(session?.user?.email === ADMIN_EMAIL ? [{ id: "admin", icon: "🛠️", label: "Espace Admin" }] : []),
  ];

  const presetThemes = [
    { id: "light", name: "Dégradé Clair", bg: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", color: "#1f2937" },
    { id: "dark", name: "Dégradé Nuit", bg: "linear-gradient(135deg, #0f172a, #1e293b)", color: "#f3f4f6" },
    { id: "neon", name: "Dégradé Néon", bg: "linear-gradient(135deg, #09090b, #18181b)", color: "#39ff14" },
    { id: "pastel", name: "Dégradé Pastel", bg: "linear-gradient(135deg, #ffecd2, #fcb69f)", color: "#581c87" },
  ];

  const weightedAverage = useMemo(() => {
    const totalCoef = grades.reduce((sum, g) => sum + g.coef, 0);
    if (!totalCoef) return 0;
    return grades.reduce((sum, g) => sum + g.note * g.coef, 0) / totalCoef;
  }, [grades]);

  useEffect(() => {
    setGreetingQuestion(randomQuestions[Math.floor(Math.random() * randomQuestions.length)]);
  }, []);

  // Gestion des thèmes CSS
  useEffect(() => {
    const root = document.documentElement;
    let background = "";
    let text = "#1f2937";
    let card = "rgba(255,255,255,0.85)";
    let border = "rgba(0,0,0,0.1)";
    let accent = "#6366f1";

    if (theme === "light") background = "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)";
    if (theme === "dark") {
      background = "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";
      text = "#f3f4f6";
      card = "rgba(30,41,59,0.88)";
      border = "rgba(255,255,255,0.1)";
    }
    if (theme === "neon") {
      background = "linear-gradient(135deg, #09090b 0%, #18181b 100%)";
      text = "#39ff14";
      card = "rgba(24,24,27,0.92)";
      border = "#39ff14";
      accent = "#39ff14";
    }
    if (theme === "pastel") {
      background = "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)";
      text = "#581c87";
      card = "rgba(255,255,255,0.75)";
    }
    if (theme === "custom") {
      background = `linear-gradient(135deg, ${customColor}, #0f172a)`;
      text = "#ffffff";
      card = "rgba(15,23,42,0.88)";
      border = "rgba(255,255,255,0.2)";
      accent = customColor;
    }

    root.style.setProperty("--bg-gradient", background);
    root.style.setProperty("--text-main", text);
    root.style.setProperty("--card-bg", card);
    root.style.setProperty("--border", border);
    root.style.setProperty("--accent", accent);

    localStorage.setItem(`bac_theme_${userId}`, theme);
    localStorage.setItem(`bac_custom_color_${userId}`, customColor);
  }, [theme, customColor, userId]);

  // Sauvegardes locales isolées par utilisateur
  useEffect(() => saveStorage(`bac_weak_chapters_${userId}`, weakChapters), [weakChapters, userId]);
  useEffect(() => localStorage.setItem(`bac_mood_${userId}`, mood), [mood, userId]);
  useEffect(() => localStorage.setItem(`bac_energy_${userId}`, String(energyLevel)), [energyLevel, userId]);
  useEffect(() => saveStorage(`bac_smart_goals_${userId}`, smartGoals), [smartGoals, userId]);
  useEffect(() => saveStorage(`bac_grades_${userId}`, grades), [grades, userId]);
  useEffect(() => saveStorage(`bac_calendar_${userId}`, calendarEvents), [calendarEvents, userId]);
  useEffect(() => saveStorage(`bac_courses_${userId}`, courses), [courses, userId]);
  useEffect(() => saveStorage(`bac_chat_${userId}`, chatMessages), [chatMessages, userId]);
  useEffect(() => saveStorage(`bac_flashcards_${userId}`, flashcardsList), [flashcardsList, userId]);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Logique du minuteur Pomodoro par heure
  useEffect(() => {
    if (!pomoActive) return;
    if (pomoHours === 0 && pomoMinutes === 0 && pomoSeconds === 0) {
      setPomoActive(false);
      return;
    }
    const interval = setInterval(() => {
      if (pomoSeconds > 0) {
        setPomoSeconds(s => s - 1);
      } else if (pomoMinutes > 0) {
        setPomoMinutes(m => m - 1);
        setPomoSeconds(59);
      } else if (pomoHours > 0) {
        setPomoHours(h => h - 1);
        setPomoMinutes(59);
        setPomoSeconds(59);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [pomoActive, pomoHours, pomoMinutes, pomoSeconds]);

  useEffect(() => {
    if (activeTab === "chat") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, activeTab]);

  function changeTab(tab) {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  }

  function getStudyAdvice() {
    if (energyLevel < 40 || mood.includes("fatiguée")) {
      return "💡 Conseil : Fais des révisions légères : flashcards, lecture de fiches ou correction d'exercices simples.";
    }
    if (mood.includes("Stressée")) {
      return "🧘 Conseil : Commence par un exercice facile que tu maîtrises déjà pour reprendre confiance en toi.";
    }
    if (energyLevel > 80 || mood.includes("Motivée")) {
      return "🔥 Conseil : Attaque-toi à tes points faibles ou fais un sujet de Bac complet !";
    }
    return "📚 Conseil : Lance un Pomodoro et avance progressivement sur ta liste d'objectifs.";
  }

  function addSmartTask() {
    if (!newSmartTaskInput.trim()) return;
    setCurrentSmartTasks((prev) => [...prev, { id: Date.now(), text: newSmartTaskInput.trim(), done: false }]);
    setNewSmartTaskInput("");
  }

  function createSmartGoal(e) {
    e.preventDefault();
    if (!newSmartTitle.trim() || !newSmartDeadline || !newSmartTarget) return;
    setSmartGoals((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newSmartTitle.trim(),
        deadline: newSmartDeadline,
        targetGrade: Number(newSmartTarget),
        obtainedGrade: null,
        tasks: currentSmartTasks,
        evaluated: false,
        successRate: 0,
      },
    ]);
    setNewSmartTitle("");
    setNewSmartDeadline("");
    setNewSmartTarget("");
    setCurrentSmartTasks([]);
  }

  function toggleSmartTask(goalId, taskId) {
    setSmartGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        return {
          ...g,
          tasks: g.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
        };
      })
    );
  }

  function evaluateSmartGoal(goalId, grade) {
    const numGrade = Number(grade);
    if (Number.isNaN(numGrade)) return;
    setSmartGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const completed = g.tasks.filter((t) => t.done).length;
        const total = g.tasks.length || 1;
        const taskScore = (completed / total) * 50;
        const gradeScore = Math.min((numGrade / g.targetGrade) * 50, 50);
        return {
          ...g,
          obtainedGrade: numGrade,
          evaluated: true,
          successRate: Math.round(taskScore + gradeScore),
        };
      })
    );
  }

  function addGrade(e) {
    e.preventDefault();
    if (!subInput || !noteInput) return;
    const note = Number(noteInput);
    const coef = Number(coefInput);
    if (note < 0 || note > 20 || coef <= 0) return;
    setGrades((prev) => [...prev, { id: Date.now(), subject: subInput.trim(), note, coef }]);
    setSubInput("");
    setNoteInput("");
  }

  function addEvent(e) {
    e.preventDefault();
    if (!newEventText.trim() || selectedDay === null) return;
    const dateKey = `${currentYear}-${currentMonth}-${selectedDay}`;
    setCalendarEvents((prev) => [...prev, { id: Date.now(), dateKey, text: newEventText.trim() }]);
    setNewEventText("");
  }

  function deleteEvent(eventId) {
    setCalendarEvents((prev) => prev.filter(ev => ev.id !== eventId));
  }

  function prevMonth() {
    setSelectedDay(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    setSelectedDay(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }

  function getDaysInMonth(m, y) {
    return new Date(y, m + 1, 0).getDate();
  }

  function getFirstDayOfMonth(m, y) {
    const day = new Date(y, m, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }

  function addCourse(e) {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    setCourses((prev) => [...prev, { id: Date.now(), title: newCourseTitle.trim(), url: newCourseUrl.trim() }]);
    setNewCourseTitle("");
    setNewCourseUrl("");
  }

  function normalizeUrl(url) {
    if (!url) return "#";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setAttachedImage(uploadEvent.target.result);
    };
    reader.readAsDataURL(file);
  }

  function handleVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("La reconnaissance vocale n'est pas supportée par ton navigateur.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setChatInput((prev) => (prev ? prev + " " + transcript : transcript));
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  }

  // Écran d'authentification (Sign Up / Sign In)
  if (!session) {
    return (
      <div className="auth-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "var(--bg-gradient)" }}>
        <div className="glass-card" style={{ padding: "40px", width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <h2>{isSignUp ? "Créer un compte 🚀" : "Connexion BacPrep 📚"}</h2>
          <p className="muted" style={{ marginBottom: "20px" }}>{isSignUp ? "Inscris-toi avec tes informations" : "Accède à ton espace personnel sécurisé"}</p>

          {authError && <div style={{ color: "#ef4444", marginBottom: "15px", fontSize: "14px" }}>{authError}</div>}

          <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {isSignUp && (
              <>
                <input
                  type="text"
                  className="input"
                  placeholder="Ton prénom..."
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Ton nom..."
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <select
                  className="input"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Sciences Expérimentales">Sciences Expérimentales</option>
                  <option value="Techniques">Techniques</option>
                  <option value="Économie & Gestion">Économie & Gestion</option>
                </select>
              </>
            )}
            <input
              type="email"
              className="input"
              placeholder="Ton email..."
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Ton mot de passe..."
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              required
            />
            <button className="btn primary" style={{ width: "100%" }}>
              {isSignUp ? "S'inscrire" : "Se connecter"}
            </button>
          </form>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ background: "transparent", border: "none", color: "var(--accent)", marginTop: "15px", cursor: "pointer", fontSize: "14px" }}
          >
            {isSignUp ? "Déjà un compte ? Connecte-toi" : "Pas de compte ? Inscris-toi"}
          </button>
        </div>
      </div>
    );
  }

  const totalDays = getDaysInMonth(currentMonth, currentYear);
  const startDayIndex = getFirstDayOfMonth(currentMonth, currentYear);

  return (
    <div className="app-layout">
      <button className="mobile-burger" onClick={() => setMobileMenuOpen((prev) => !prev)}>
        {mobileMenuOpen ? "✕ Fermer" : "☰ Menu"}
      </button>

      {mobileMenuOpen && <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />}

      <aside className={`sidebar ${mobileMenuOpen ? "sidebar-open" : ""}`}>
        <h2 className="logo">BacPrep</h2>
        <nav className="nav-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-button ${activeTab === item.id ? "active" : ""}`}
              onClick={() => changeTab(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "15px", marginTop: "auto" }}>
          <button className="btn" onClick={() => supabase.auth.signOut()} style={{ width: "100%", color: "#ef4444", borderColor: "#ef4444" }}>
            Déconnexion 🚪
          </button>
        </div>
      </aside>

      <main className="main-content">
        {/* ACCUEIL & THÈMES */}
        {activeTab === "home" && (
          <section className="animate-fade-in">
            <div className="hero-card">
              <h1>Bonjour {currentFirstName} 👋</h1>
              <p>{greetingQuestion}</p>
            </div>

            <h2 className="section-title">Personnalise ton thème</h2>
            <div className="theme-grid">
              {presetThemes.map((item) => (
                <button
                  key={item.id}
                  className={`theme-card ${theme === item.id ? "theme-active" : ""}`}
                  style={{ background: item.bg, color: item.color }}
                  onClick={() => setTheme(item.id)}
                >
                  <strong>{item.name}</strong>
                  {theme === item.id && <span className="active-badge">✨ Actif</span>}
                </button>
              ))}
            </div>

            <div className="glass-card custom-theme" style={{ marginTop: "20px" }}>
              <div>
                <h3>🎨 Ta propre couleur</h3>
                <p>Choisis une couleur pour créer ton thème personnalisé.</p>
              </div>
              <div className="custom-theme-actions" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    setTheme("custom");
                  }}
                />
                <button className="btn primary" onClick={() => setTheme("custom")}>
                  {theme === "custom" ? "Actif ✨" : "Appliquer"}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* CHATBOT GEMINI */}
        {activeTab === "chat" && (
          <section className="glass-card animate-fade-in chat-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h2 className="view-title" style={{ margin: 0 }}>🤖 Assistant Gemini & Flashcards</h2>
              <button className="btn primary" onClick={startNewChat} style={{ fontSize: "12px", padding: "6px 12px" }}>
                ✨ Nouveau chat
              </button>
            </div>
            <p className="muted">Pose tes questions, envoie une photo de cours ou demande de générer des flashcards.</p>

            <div className="chat-box">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`chat-message ${msg.sender}`}>
                  <div className="bubble">
                    {msg.image && <img src={msg.image} alt="Exercice" className="chat-uploaded-img" />}
                    <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
                  </div>
                </div>
              ))}
              {loadingChat && (
                <div className="chat-message bot">
                  <div className="bubble animate-pulse">Gemini réfléchit... 🧠</div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {attachedImage && (
              <div className="attached-preview" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", background: "rgba(0,0,0,0.05)", borderRadius: "8px", marginBottom: "10px" }}>
                <img src={attachedImage} alt="Aperçu" style={{ height: "40px", width: "40px", objectFit: "cover", borderRadius: "6px" }} />
                <span style={{ fontSize: "12px", flex: 1 }}>📎 Image prête à être analysée</span>
                <button onClick={() => setAttachedImage(null)} style={{ background: "transparent", border: "none", cursor: "pointer", fontWeight: "bold" }}>✕</button>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="chat-input-row" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <label className="upload-icon-btn" title="Envoyer une photo" style={{ cursor: "pointer", fontSize: "20px", padding: "6px" }}>
                📷
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
              </label>

              <button
                type="button"
                onClick={handleVoiceInput}
                title="Dicter ton message"
                style={{
                  background: isListening ? "#ef4444" : "transparent",
                  color: isListening ? "#fff" : "inherit",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  padding: "6px",
                  borderRadius: "50%",
                }}
              >
                🎤
              </button>

              <input
                className="input"
                placeholder={isListening ? "Écoute en cours..." : "Pose ta question à Gemini..."}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="btn primary" disabled={loadingChat}>Envoyer</button>
            </form>
          </section>
        )}

        {/* FLASHCARDS */}
        {activeTab === "flashcards" && (
          <section className="glass-card animate-fade-in">
            <h2 className="view-title">🎴 Flashcards de Révision</h2>
            <p className="muted">Révise tes formules, ajoute de nouvelles cartes ou supprime celles maîtrisées.</p>

            <form onSubmit={addFlashcard} style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
              <input
                className="input"
                placeholder="Question..."
                value={newCardQ}
                onChange={(e) => setNewCardQ(e.target.value)}
                style={{ flex: 1 }}
              />
              <input
                className="input"
                placeholder="Réponse..."
                value={newCardA}
                onChange={(e) => setNewCardA(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="btn success">Ajouter</button>
            </form>

            <div className="flashcard-container" style={{ textAlign: "center", margin: "20px 0" }}>
              {flashcardsList.length > 0 ? (
                <>
                  <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className={`flashcard-card-box ${isFlipped ? "flipped" : ""}`}
                    style={{
                      background: "var(--card-bg)",
                      border: "2px solid var(--border)",
                      borderRadius: "16px",
                      padding: "40px",
                      minHeight: "180px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      position: "relative"
                    }}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteFlashcard(flashcardsList[currentCardIndex].id); }}
                      style={{ position: "absolute", top: "10px", right: "15px", background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: "bold" }}
                      title="Supprimer cette flashcard"
                    >
                      🗑️
                    </button>
                    <span style={{ fontSize: "12px", opacity: 0.6, marginBottom: "15px" }}>
                      {isFlipped ? "💡 Réponse (Clique pour retourner)" : "❓ Question (Clique pour voir la réponse)"}
                    </span>
                    <h3 style={{ fontSize: "18px" }}>
                      {isFlipped ? flashcardsList[currentCardIndex].a : flashcardsList[currentCardIndex].q}
                    </h3>
                  </div>

                  <div className="flashcard-controls" style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
                    <button
                      className="btn"
                      onClick={() => {
                        setIsFlipped(false);
                        setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : flashcardsList.length - 1));
                      }}
                    >
                      ◀ Précédente
                    </button>
                    <span style={{ alignSelf: "center", fontSize: "14px" }}>{currentCardIndex + 1} / {flashcardsList.length}</span>
                    <button
                      className="btn primary"
                      onClick={() => {
                        setIsFlipped(false);
                        setCurrentCardIndex((prev) => (prev + 1) % flashcardsList.length);
                      }}
                    >
                      Suivante ▶
                    </button>
                  </div>
                </>
              ) : (
                <p className="muted">Aucune flashcard disponible. Ajoute-en une !</p>
              )}
            </div>
          </section>
        )}

        {/* MOOD & CONSEIL */}
        {activeTab === "mood" && (
          <section className="glass-card animate-fade-in">
            <h2 className="view-title">🧠 Journal de Mood & Énergie</h2>
            <p className="muted">Le choix de ton humeur ajuste automatiquement ton énergie, et inversement.</p>

            <div className="mood-box" style={{ margin: "20px 0" }}>
              <label><strong>Ton humeur du moment :</strong></label>
              <select className="input" value={mood} onChange={(e) => handleMoodChange(e.target.value)} style={{ marginTop: "10px" }}>
                <option value="🚀 Ultra Motivée">🚀 Ultra Motivée</option>
                <option value="😊 Sereine & Concentrée">😊 Sereine & Concentrée</option>
                <option value="😰 Un peu stressée">😰 Un peu stressée</option>
                <option value="😴 Fatiguée / Besoin de repos">😴 Fatiguée / Besoin de repos</option>
              </select>
            </div>

            <div className="energy-box" style={{ margin: "20px 0" }}>
              <label><strong>Niveau d'énergie : {energyLevel}%</strong></label>
              <input
                type="range"
                min="0"
                max="100"
                value={energyLevel}
                onChange={(e) => handleEnergyChange(Number(e.target.value))}
                style={{ width: "100%", marginTop: "10px" }}
              />
            </div>

            <div className="advice-box" style={{ padding: "20px", background: "rgba(99, 102, 241, 0.1)", borderRadius: "12px", marginTop: "20px" }}>
              <p>{getStudyAdvice()}</p>
            </div>
          </section>
        )}

        {/* OBJECTIFS RAPIDES (SUPABASE ISOLÉ + SUPPRESSION) */}
        {activeTab === "goals" && (
          <section className="glass-card animate-fade-in">
            <h2 className="view-title">📌 Objectifs Rapides</h2>
            <p className="muted">Ajoute ou supprime tes objectifs du jour en toute liberté.</p>

            <form onSubmit={addGoal} className="course-form" style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
              <input
                className="input"
                placeholder="Nouvel objectif..."
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="btn success">Ajouter</button>
            </form>

            <div className="stack">
              {goals.length === 0 && <p className="muted">Aucun objectif pour le moment.</p>}
              {goals.map((goal) => (
                <div className="list-item" key={goal.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", marginBottom: "8px", background: "var(--card-bg)", borderRadius: "8px" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span>📌</span>
                    <span>{goal.text}</span>
                  </div>
                  <button onClick={() => deleteGoal(goal.id)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }} title="Supprimer">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SMART AGENDA */}
        {activeTab === "smartAgenda" && (
          <section className="glass-card animate-fade-in">
            <h2 className="view-title">🎯 Agenda & Objectifs Intelligents</h2>
            <p className="muted">Fixe tes objectifs, coche tes étapes et évalue tes résultats.</p>

            <form onSubmit={createSmartGoal} className="smart-form">
              <h3>✨ Nouvel objectif</h3>
              <div className="form-grid">
                <input
                  className="input"
                  placeholder="Ex : Devoir de Mathématiques"
                  value={newSmartTitle}
                  onChange={(e) => setNewSmartTitle(e.target.value)}
                />
                <input
                  className="input"
                  type="date"
                  value={newSmartDeadline}
                  onChange={(e) => setNewSmartDeadline(e.target.value)}
                />
                <input
                  className="input"
                  type="number"
                  min="0"
                  max="20"
                  step="0.5"
                  placeholder="Note visée /20"
                  value={newSmartTarget}
                  onChange={(e) => setNewSmartTarget(e.target.value)}
                />
              </div>

              <div className="add-task-row" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <input
                  className="input"
                  placeholder="Ajouter une étape..."
                  value={newSmartTaskInput}
                  onChange={(e) => setNewSmartTaskInput(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="button" className="btn primary" onClick={addSmartTask}>
                  + Étape
                </button>
              </div>

              {currentSmartTasks.length > 0 && (
                <ul className="task-preview" style={{ margin: "10px 0", paddingLeft: "20px" }}>
                  {currentSmartTasks.map((t) => (
                    <li key={t.id}>{t.text}</li>
                  ))}
                </ul>
              )}

              <button type="submit" className="btn success full-width" style={{ marginTop: "10px", width: "100%" }}>
                🚀 Enregistrer l'objectif
              </button>
            </form>

            <div className="stack" style={{ marginTop: "20px" }}>
              {smartGoals.map((goal) => {
                const completed = goal.tasks.filter((t) => t.done).length;
                const total = goal.tasks.length;
                const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
                const percentage = goal.evaluated ? goal.successRate : progress;

                return (
                  <div className="goal-card" key={goal.id} style={{ padding: "15px", background: "var(--card-bg)", borderRadius: "12px", marginBottom: "15px", border: "1px solid var(--border)" }}>
                    <div className="goal-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h3>{goal.title}</h3>
                        <span className="deadline" style={{ fontSize: "12px", opacity: 0.7 }}>
                          ⏳ {goal.deadline} · 🎯 {goal.targetGrade}/20
                        </span>
                      </div>
                      <div className="progress-circle">
                        <span>{percentage}%</span>
                      </div>
                    </div>

                    <h4 style={{ marginTop: "10px" }}>Étapes de préparation</h4>
                    <div className="tasks">
                      {goal.tasks.length === 0 && <p className="muted">Aucune étape ajoutée.</p>}
                      {goal.tasks.map((task) => (
                        <label key={task.id} className={task.done ? "task-done" : ""} style={{ display: "block", margin: "5px 0" }}>
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleSmartTask(goal.id, task.id)}
                            style={{ marginRight: "8px" }}
                          />
                          {task.text}
                        </label>
                      ))}
                    </div>

                    <div className="evaluation" style={{ marginTop: "15px" }}>
                      {!goal.evaluated ? (
                        <div className="evaluation-row" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <span>As-tu reçu ton résultat ?</span>
                          <input
                            className="input small-input"
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            placeholder="/20"
                            id={`grade-${goal.id}`}
                            style={{ width: "80px" }}
                          />
                          <button
                            className="btn success"
                            onClick={() => {
                              const input = document.getElementById(`grade-${goal.id}`);
                              if (input && input.value) {
                                evaluateSmartGoal(goal.id, input.value);
                              }
                            }}
                          >
                            Évaluer 🎉
                          </button>
                        </div>
                      ) : (
                        <div>
                          <strong>
                            {goal.obtainedGrade >= goal.targetGrade ? "🌟 Objectif atteint !" : "💪 Continue à progresser !"}
                          </strong>
                          <p>Note obtenue : {goal.obtainedGrade}/20</p>
                          <p>Indice de réussite : {goal.successRate}%</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* FICHES & COURS */}
        {activeTab === "courses" && (
          <section className="glass-card animate-fade-in">
            <h2 className="view-title">📖 Mes Fiches & Cours</h2>
            <p className="muted">Ajoute tes liens de cours et de fiches.</p>

            <form onSubmit={addCourse} className="course-form" style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <input
                className="input"
                placeholder="Titre du cours..."
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                style={{ flex: 1 }}
              />
              <input
                className="input"
                placeholder="URL du cours..."
                value={newCourseUrl}
                onChange={(e) => setNewCourseUrl(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="btn success">Ajouter</button>
            </form>

            <div className="stack">
              {courses.map((course) => (
                <div className="list-item" key={course.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "var(--card-bg)", borderRadius: "8px", marginBottom: "8px" }}>
                  <div className="list-content" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span>📄</span>
                    <a href={normalizeUrl(course.url)} target="_blank" rel="noreferrer">
                      {course.title}
                    </a>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => setCourses((prev) => prev.filter((item) => item.id !== course.id))}
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MON CALENDRIER (AVEC SUPPRESSION D'ÉVÉNEMENTS) */}
        {activeTab === "calendar" && (
          <section className="glass-card animate-fade-in">
            <h2 className="view-title">📅 Mon Calendrier de Révision</h2>
            <div className="calendar-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0" }}>
              <button className="btn" onClick={prevMonth}>◀ Mois Précédent</button>
              <h3>{new Date(currentYear, currentMonth).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</h3>
              <button className="btn" onClick={nextMonth}>Mois Suivant ▶</button>
            </div>

            <div className="calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", textAlign: "center" }}>
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
                <div key={d} style={{ fontWeight: "bold", padding: "8px", opacity: 0.7 }}>{d}</div>
              ))}
              {Array.from({ length: startDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: totalDays }).map((_, i) => {
                const dayNum = i + 1;
                const isSelected = selectedDay === dayNum;
                const dateKey = `${currentYear}-${currentMonth}-${dayNum}`;
                const hasEvents = calendarEvents.some((ev) => ev.dateKey === dateKey);

                return (
                  <div
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    style={{
                      padding: "12px",
                      background: isSelected ? "var(--accent)" : "var(--card-bg)",
                      color: isSelected ? "#fff" : "inherit",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "1px solid var(--border)",
                      position: "relative"
                    }}
                  >
                    {dayNum}
                    {hasEvents && <span style={{ position: "absolute", bottom: "2px", right: "4px", fontSize: "10px" }}>📌</span>}
                  </div>
                );
              })}
            </div>

            {selectedDay !== null && (
              <div className="event-creator" style={{ marginTop: "20px", padding: "15px", background: "var(--card-bg)", borderRadius: "8px" }}>
                <h4>Événements pour le {selectedDay} / {currentMonth + 1} / {currentYear}</h4>
                <div style={{ margin: "10px 0" }}>
                  {calendarEvents.filter((ev) => ev.dateKey === `${currentYear}-${currentMonth}-${selectedDay}`).map((ev) => (
                    <div key={ev.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", margin: "6px 0", background: "rgba(0,0,0,0.03)", padding: "6px 10px", borderRadius: "6px" }}>
                      <span>• {ev.text}</span>
                      <button onClick={() => deleteEvent(ev.id)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }} title="Effacer cet événement">
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <form onSubmit={addEvent} style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <input
                    className="input"
                    placeholder="Ajouter un événement..."
                    value={newEventText}
                    onChange={(e) => setNewEventText(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button className="btn success">Ajouter</button>
                </form>
              </div>
            )}
          </section>
        )}

        {/* BAC COUNTDOWN */}
        {activeTab === "countdown" && (
          <section className="glass-card animate-fade-in" style={{ textAlign: "center", padding: "40px" }}>
            <h2 className="view-title">⏱️ Compte à rebours du Bac 2027</h2>
            <p className="muted">Objectif : 7 Juin 2027 à 08:00</p>
            <div className="countdown-grid" style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "30px 0" }}>
              <div style={{ padding: "20px", background: "var(--card-bg)", borderRadius: "12px", minWidth: "80px" }}>
                <h3 style={{ fontSize: "32px" }}>{timeLeft.days}</h3>
                <span>Jours</span>
              </div>
              <div style={{ padding: "20px", background: "var(--card-bg)", borderRadius: "12px", minWidth: "80px" }}>
                <h3 style={{ fontSize: "32px" }}>{timeLeft.hours}</h3>
                <span>Heures</span>
              </div>
              <div style={{ padding: "20px", background: "var(--card-bg)", borderRadius: "12px", minWidth: "80px" }}>
                <h3 style={{ fontSize: "32px" }}>{timeLeft.minutes}</h3>
                <span>Minutes</span>
              </div>
              <div style={{ padding: "20px", background: "var(--card-bg)", borderRadius: "12px", minWidth: "80px" }}>
                <h3 style={{ fontSize: "32px" }}>{timeLeft.seconds}</h3>
                <span>Secondes</span>
              </div>
            </div>
            <p style={{ fontStyle: "italic", opacity: 0.8 }}>"Chaque minute de travail te rapproche de ton 20/20 !" 💪</p>
          </section>
        )}

        {/* POMODORO (PAR HEURE / MODIFIABLE HH:MM:SS) */}
        {activeTab === "pomodoro" && (
          <section className="glass-card animate-fade-in" style={{ textAlign: "center", padding: "40px" }}>
            <h2 className="view-title">⏳ Minuteur Pomodoro par Heure</h2>
            <p className="muted">Règle la durée de ta session de travail.</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
              <div>
                <label style={{ fontSize: "12px", display: "block" }}>Heures</label>
                <input type="number" min="0" max="5" value={pomoHours} onChange={(e) => { const h = Number(e.target.value); setPomoHours(h); }} className="input" style={{ width: "60px", textAlign: "center" }} />
              </div>
              <div>
                <label style={{ fontSize: "12px", display: "block" }}>Minutes</label>
                <input type="number" min="0" max="59" value={pomoMinutes} onChange={(e) => { const m = Number(e.target.value); setPomoMinutes(m); }} className="input" style={{ width: "60px", textAlign: "center" }} />
              </div>
              <div>
                <label style={{ fontSize: "12px", display: "block" }}>Secondes</label>
                <input type="number" min="0" max="59" value={pomoSeconds} onChange={(e) => { const s = Number(e.target.value); setPomoSeconds(s); }} className="input" style={{ width: "60px", textAlign: "center" }} />
              </div>
            </div>

            <div style={{ fontSize: "48px", fontWeight: "bold", margin: "20px 0", fontFamily: "monospace" }}>
              {pomoHours.toString().padStart(2, "0")}:{pomoMinutes.toString().padStart(2, "0")}:{pomoSeconds.toString().padStart(2, "0")}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
              <button className="btn primary" onClick={() => setPomoActive(!pomoActive)}>
                {pomoActive ? "Pause ⏸️" : "Démarrer ▶️"}
              </button>
              <button className="btn" onClick={() => { setPomoActive(false); setPomoHours(1); setPomoMinutes(0); setPomoSeconds(0); }}>
                Réinitialiser 🔄
              </button>
            </div>
          </section>
        )}

        {/* MES NOTES */}
        {activeTab === "grades" && (
          <section className="glass-card animate-fade-in">
            <h2 className="view-title">📊 Mes Notes & Moyenne Pondérée</h2>
            <p className="muted">Moyenne pondérée actuelle : <strong>{weightedAverage.toFixed(2)} / 20</strong></p>

            <form onSubmit={addGrade} className="course-form" style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
              <input
                className="input"
                placeholder="Matière..."
                value={subInput}
                onChange={(e) => setSubInput(e.target.value)}
                style={{ flex: 2 }}
              />
              <input
                className="input"
                type="number"
                min="0"
                max="20"
                step="0.5"
                placeholder="Note /20"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <input
                className="input"
                type="number"
                min="1"
                max="10"
                placeholder="Coef"
                value={coefInput}
                onChange={(e) => setCoefInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button className="btn success">Ajouter</button>
            </form>

            <div className="stack">
              {grades.map((g) => (
                <div key={g.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "var(--card-bg)", borderRadius: "8px", marginBottom: "8px" }}>
                  <span><strong>{g.subject}</strong> : {g.note} / 20 (Coef {g.coef})</span>
                  <button
                    onClick={() => setGrades((prev) => prev.filter((item) => item.id !== g.id))}
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CHAPITRES & POINTS FAIBLES */}
        {activeTab === "chapters" && (
          <section className="glass-card animate-fade-in">
            <h2 className="view-title">📚 Programme de Maths & Points Faibles</h2>
            <p className="muted">Coche les chapitres où tu as besoin de renforcer tes révisions.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
              {mathProgram.map((cat, idx) => (
                <div key={idx} style={{ background: "var(--card-bg)", padding: "15px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <h3>{cat.category}</h3>
                  <div style={{ marginTop: "10px" }}>
                    {cat.chapters.map((ch) => {
                      const isWeak = weakChapters.includes(ch.id);
                      return (
                        <label key={ch.id} style={{ display: "flex", alignItems: "center", gap: "8px", margin: "8px 0", cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={isWeak}
                            onChange={() => {
                              setWeakChapters((prev) =>
                                isWeak ? prev.filter((id) => id !== ch.id) : [...prev, ch.id]
                              );
                            }}
                          />
                          <span style={{ fontSize: "14px", color: isWeak ? "var(--accent)" : "inherit" }}>{ch.title}</span>
                          {isWeak && <span style={{ fontSize: "10px", background: "var(--accent)", color: "#fff", padding: "2px 6px", borderRadius: "4px" }}>À renforcer</span>}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ESPACE ADMIN (SÉCURISÉ UNIQUEMENT POUR TON GMAIL) */}
        {activeTab === "admin" && session?.user?.email === ADMIN_EMAIL && (
          <section className="glass-card animate-fade-in">
            <h2 className="view-title">🛠️ Panneau d'Administration</h2>
            <p className="muted">Liste de toutes les personnes inscrites et connectées sur l'application :</p>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700" style={{ marginTop: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(0,0,0,0.05)", fontSize: "12px", textTransform: "uppercase" }}>
                    <th style={{ padding: "12px" }}>Prénom & Nom</th>
                    <th style={{ padding: "12px" }}>Email</th>
                    <th style={{ padding: "12px" }}>Section</th>
                    <th style={{ padding: "12px" }}>Dernière connexion</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "14px" }}>
                  {userLogs.length > 0 ? (
                    userLogs.map((log, index) => (
                      <tr key={index} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px", fontWeight: "bold" }}>{log.first_name} {log.last_name}</td>
                        <td style={{ padding: "12px", opacity: 0.8 }}>{log.email}</td>
                        <td style={{ padding: "12px" }}>{log.section}</td>
                        <td style={{ padding: "12px", fontSize: "12px", opacity: 0.6 }}>{new Date(log.last_seen).toLocaleString("fr-FR")}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ padding: "20px", textAlign: "center", opacity: 0.6 }}>Aucun utilisateur enregistré pour le moment...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
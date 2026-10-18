/* Портфоліо Mykhailo: мови IT/EN, тема, контакти, поява секцій при прокрутці. Без зовнішніх бібліотек. */
"use strict";

/* ✏️ КОНТАКТИ — заповни тут. Порожні поля просто не показуються на сайті. */
const CONTACTS = {
  telegram: "mikybuilds",   // без @
  email: "",                // напр. окрема робоча пошта — порожньо = не показується
  github: "mikybuilds",
  linkedin: ""    // напр. "https://www.linkedin.com/in/…"
};

const EN = {
  "skip": "Skip to content",
  "nav.about": "About", "nav.project": "Projects", "nav.services": "Services", "nav.contact": "Contact",
  "hero.eyebrow": "Computer science student · based in Italy",
  "hero.hi": "Hi, I'm",
  "hero.lead": "I build Telegram bots, websites and AI assistants that run on my own computer — no paid services, with a focus on security and privacy.",
  "hero.cta1": "See MikyCore", "hero.cta2": "Contact me",
  "facts.lines": "lines of code in the project", "facts.tests": "automated test suites", "facts.langs": "languages: UA · IT · EN",
  "about.title": "About me",
  "about.p1": "I'm Ukrainian and I live in Italy, where I'm in the third year of a computer science course. I like turning real problems — homework, grades, notes, online listings — into tools that solve them on their own.",
  "about.p2": "My main project is MikyCore, a personal assistant with local AI that I use every day for school and beyond. I build it the way professionals do: automated tests, security, readable code.",
  "about.skills": "Skills", "skills.tests": "Automated testing", "skills.sec": "Security (sandboxing, prompt injection)",
  "about.langs": "Languages", "lang.uk": "Ukrainian", "lang.native": "native", "lang.it": "Italian", "lang.fluent": "fluent", "lang.en": "English", "lang.good": "good",
  "proj.eyebrow": "Main project",
  "proj.lead": "A personal Telegram assistant with an AI that runs entirely on my PC (8 GB GPU): no subscriptions, no data sent to outside services. It has a built-in app (Telegram Mini App) and learns from the way I use it.",
  "shot.today": "The day at a glance", "shot.market": "Market: Subito deals and profit", "shot.cards": "Flashcards with spaced repetition", "shot.more": "Every feature, in three languages",
  "f1.t": "Local AI with tools", "f1.d": "An agent that picks on its own among 100+ tools (reminders, files, browser, Classroom, email…). Evaluated on the real model: ~98% correct choices.",
  "f2.t": "Improves itself — with my permission", "f2.d": "It notices where it fails and proposes rules, \"recipes\" and even new Python plugins. Every plugin runs in an isolated sandbox and is enabled only after I confirm it.",
  "f3.t": "Subito market analysis", "f3.d": "Reads listings, computes the market price per model and configuration (CPU, RAM, generation), flags scams and alerts me only about real deals.",
  "f4.t": "Studying", "f4.d": "Lessons → structured notes in Obsidian, automatic flashcards, oral-exam practice with grades, a study plan towards tests.",
  "f5.t": "Flowgorithm", "f5.d": "Generates flowcharts verified by running them, plus a .fprg interpreter written from scratch that finds the error and the exact block it's in.",
  "f6.t": "Security first", "f6.d": "Confirmation for risky actions, prompt-injection protection, passwords never passed to the AI, no bypassing of websites' protections.",
  "proj.stack": "Tech stack", "proj.tests": "46 test suites + evaluations on the real model",
  "srv.title": "What I can do for you", "srv.lead": "Small projects done well, at student prices. Write to me and let's talk.",
  "s1.t": "Custom Telegram bots", "s1.d": "Bookings, menus, customer reminders, auto-replies, mini apps — for shops, gyms, teachers.",
  "s2.t": "Websites", "s2.d": "Fast, polished showcase sites that work great on phones, published for free on GitHub Pages or on your own domain.",
  "s3.t": "Translations UA · IT · EN", "s3.d": "Texts, letters, forms and help with Italian paperwork for Ukrainian speakers (non-certified translations).",
  "s4.t": "Computer science tutoring", "s4.d": "Python, Flowgorithm and programming basics for younger students — with exercises and quizzes.",
  "ct.title": "Contact", "ct.lead": "The quickest ways to reach me:", "ct.empty": "Contacts coming soon.",
  "foot.made": "handmade with HTML, CSS and JavaScript",
  "_title": "Mykhailo — computer science student and developer",
  "_desc": "Mykhailo: computer science student in Italy. I build Telegram bots, websites and AI assistants that run locally."
};

const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* приватний режим — не страшно */ } }
};

/* ---------- мови ---------- */
const IT = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { IT[el.dataset.i18n] = el.textContent; });
IT._title = document.title;
IT._desc = document.querySelector('meta[name="description"]').content;

function setLang(code) {
  const lang = code === "en" ? "en" : "it";
  const dict = lang === "en" ? EN : IT;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { const v = dict[el.dataset.i18n]; if (v) el.textContent = v; });
  document.title = dict._title;
  document.querySelector('meta[name="description"]').content = dict._desc;
  document.getElementById("lang").textContent = lang === "en" ? "IT" : "EN";
  store.set("lang", lang);
  renderContacts(lang);
}

/* ---------- тема ---------- */
function setTheme(t) {
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
  store.set("theme", t || "");
}
function currentDark() {
  const t = document.documentElement.dataset.theme;
  return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/* ---------- контакти ---------- */
function link(href, text, primary) {
  const a = document.createElement("a");
  a.className = "btn " + (primary ? "primary" : "ghost");
  a.href = href; a.textContent = text;
  if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
  return a;
}
function renderContacts(lang) {
  const box = document.getElementById("contact-links");
  box.replaceChildren();
  const c = CONTACTS, out = [];
  if (c.telegram) out.push(link("https://t.me/" + c.telegram.replace(/^@/, ""), "Telegram", true));
  if (c.email) out.push(link("mailto:" + c.email, lang === "en" ? "Email" : "Email", !out.length));
  if (c.github) out.push(link("https://github.com/" + c.github, "GitHub", false));
  if (c.linkedin) out.push(link(c.linkedin, "LinkedIn", false));
  box.append(...out);
  document.getElementById("contact-empty").hidden = out.length > 0;
}

/* ---------- старт ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
setTheme(store.get("theme") || "");
const saved = store.get("lang");
setLang(saved || ((navigator.language || "it").toLowerCase().startsWith("it") ? "it" : "en"));
document.getElementById("lang").addEventListener("click", () => setLang(document.documentElement.lang === "en" ? "it" : "en"));
document.getElementById("theme").addEventListener("click", () => setTheme(currentDark() ? "light" : "dark"));

/* поява секцій при прокрутці (без цього все одразу видно — нічого не ламається) */
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold: 0.12});
  document.querySelectorAll(".section h2, .features article, .services article, .gallery figure, .two > div").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}

/* Portfolio of Mykhailo: Italian / English switch, theme switch, contact links, chat intro. No libraries. */
"use strict";

/* Contacts — empty fields are not shown. */
const CONTACTS = {
  telegram: "mikybuilds",   // without @
  email: "",
  github: "mikybuilds",
  linkedin: ""
};

const EN = {
  "skip": "Skip to content",
  "nav.about": "About", "nav.services": "Services", "nav.contact": "Contact",
  "theme.dark": "Dark", "theme.light": "Light",
  "hero.title": "I build bots that work while I study.",
  "hero.lead": "I'm Mykhailo, a computer science student in Italy. My assistant MikyCore runs on my own PC: it keeps an eye on homework, gets me ready for tests and finds deals on Subito.",
  "hero.cta": "Message me on Telegram", "hero.more": "How MikyCore works",
  "c1": "Any good ThinkPads on Subito?",
  "c2a": "One, yes: Dell Latitude 7490, i7 with 8 GB, for €150.",
  "c2b": "For this configuration the market is around €250",
  "c2c": "Shipping with TuttoSubito, so the payment is protected.",
  "c3": "And what do I have tomorrow?",
  "c4": "Physics test at 10. I made you 12 flashcards on chapter 4: shall we review them tonight at 9?",
  "chat.cap": "A typical conversation with MikyCore.",
  "about.title": "About me",
  "about.p1": "I'm Ukrainian and I live in Italy, where I'm in my third year of computer science. I like taking an everyday problem — homework, grades, notes, online listings — and writing the program that solves it on its own.",
  "about.p2": "I mostly write Python, plus C++, JavaScript, HTML and CSS. I work with local language models (Ollama), the Telegram Bot API and Mini Apps, and Playwright for browser automation. Every feature has its own automated tests.",
  "about.p3": "I speak Ukrainian (native), Italian and English.",
  "mc.lead": "A personal Telegram assistant with a language model that runs entirely on my 8 GB graphics card: no subscriptions, no data sent anywhere. I use it every day for school. It's about 21,000 lines of code with 46 test suites.",
  "shot.today": "The day: reminders, homework, flashcards.", "shot.market": "The market: Subito deals and my profit.", "shot.cards": "Flashcards with spaced repetition.",
  "f1.t": "Picks the right tool on its own", "f1.d": "It has more than 100 tools: reminders, files, browser, Google Classroom, email. In tests on the real model it picks the right one 98% of the time.",
  "f2.t": "Finds deals on Subito", "f2.d": "It reads listings, works out the market price per model and configuration (CPU, RAM, generation), spots scams and only messages me when a deal is real.",
  "f3.t": "Helps me study", "f3.d": "It turns lessons into notes in Obsidian, makes flashcards, quizzes me out loud with a grade, and plans revision before tests.",
  "f4.t": "Improves itself, with my permission", "f4.d": "It notices where it fails and proposes rules, automations and even new Python plugins. Plugins run in an isolated sandbox and start only after I confirm them.",
  "f5.d": "It generates flowcharts and checks them by running them in a .fprg interpreter I wrote, which points to the error and the exact block.",
  "f6.t": "Safe by design", "f6.d": "Risky actions ask for confirmation, passwords never go through the model, outside text can't give it orders, and it doesn't get around websites' protections.",
  "srv.title": "Work on request",
  "srv.lead": "I take on small projects and do them well. Student prices, agreed depending on the job.",
  "s1.t": "Telegram bots", "s1.d": "Bookings, menus, customer reminders, auto-replies, mini apps. For shops, gyms, teachers.",
  "s2.t": "Websites", "s2.d": "Fast showcase sites that work well on phones too, published for free on GitHub Pages or on your domain.",
  "s3.t": "Ukrainian, Italian, English translations", "s3.d": "Letters, forms and help with Italian paperwork for Ukrainian speakers. Non-certified translations.",
  "s4.t": "Computer science tutoring", "s4.d": "Python, Flowgorithm and programming basics for younger students, with exercises and quizzes.",
  "ct.title": "Contact", "ct.lead": "Message me on Telegram: I usually reply the same day.",
  "foot": "Site written by hand in HTML, CSS and JavaScript.",
  "_title": "Mykhailo — Telegram bots and local AI",
  "_desc": "Mykhailo, computer science student in Italy. I build Telegram bots, websites and AI assistants that run on my own PC.",
  "_chat": "Example conversation with MikyCore",
  "_lang": "Italiano"
};

const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode: fine */ } }
};

/* Italian texts come from the page itself */
const IT = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { IT[el.dataset.i18n] = el.textContent; });
Object.assign(IT, {
  "theme.dark": "Scuro", "theme.light": "Chiaro",
  _title: document.title, _desc: document.querySelector('meta[name="description"]').content,
  _chat: document.querySelector(".chat").getAttribute("aria-label"), _lang: "English"
});

let lang = "it";
function dict() { return lang === "en" ? EN : IT; }

function setLang(code) {
  lang = code === "en" ? "en" : "it";
  const d = dict();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { if (d[el.dataset.i18n]) el.textContent = d[el.dataset.i18n]; });
  document.title = d._title;
  document.querySelector('meta[name="description"]').content = d._desc;
  document.querySelector(".chat").setAttribute("aria-label", d._chat);
  document.getElementById("lang").textContent = d._lang;
  store.set("lang", lang);
  paintThemeButton();
}

/* theme */
function isDark() {
  const t = document.documentElement.dataset.theme;
  return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function setTheme(t) {
  if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
  store.set("theme", t || "");
  paintThemeButton();
}
function paintThemeButton() {
  document.getElementById("theme").textContent = isDark() ? dict()["theme.light"] : dict()["theme.dark"];
}

/* contacts */
function renderContacts() {
  const box = document.getElementById("contact-links");
  const links = [];
  if (CONTACTS.telegram) links.push(["https://t.me/" + CONTACTS.telegram.replace(/^@/, ""), "@" + CONTACTS.telegram.replace(/^@/, "")]);
  if (CONTACTS.email) links.push(["mailto:" + CONTACTS.email, CONTACTS.email]);
  if (CONTACTS.github) links.push(["https://github.com/" + CONTACTS.github, "GitHub"]);
  if (CONTACTS.linkedin) links.push([CONTACTS.linkedin, "LinkedIn"]);
  box.replaceChildren(...links.map(([href, text]) => {
    const a = document.createElement("a");
    a.href = href; a.textContent = text;
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }));
  const tg = document.getElementById("cta-tg");
  if (!CONTACTS.telegram) tg.remove(); else tg.href = "https://t.me/" + CONTACTS.telegram.replace(/^@/, "");
}

/* start */
document.getElementById("year").textContent = new Date().getFullYear();
setTheme(store.get("theme") || "");
setLang(store.get("lang") || ((navigator.language || "it").toLowerCase().startsWith("it") ? "it" : "en"));
renderContacts();
document.getElementById("lang").addEventListener("click", () => setLang(lang === "en" ? "it" : "en"));
document.getElementById("theme").addEventListener("click", () => setTheme(isDark() ? "light" : "dark"));
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paintThemeButton);

/* ---------- motion ---------- */
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* headline word by word */
function splitHeadline() {
  const h = document.querySelector("h1");
  if (calm) return;
  const words = h.textContent.trim().split(/\s+/);
  h.replaceChildren(...words.flatMap((w, i) => {
    const s = document.createElement("span");
    s.className = "w"; s.style.setProperty("--i", i); s.textContent = w;
    return i < words.length - 1 ? [s, document.createTextNode(" ")] : [s];
  }));
}

/* the conversation, played like a real chat: "typing…" before every reply */
let chatRun = 0;
async function playChat() {
  const run = ++chatRun;
  const box = document.getElementById("msgs"), chat = document.querySelector(".chat");
  const items = [...box.querySelectorAll("li:not(.typing)")];
  box.querySelectorAll(".typing").forEach((t) => t.remove());
  if (calm) { items.forEach((li) => li.classList.add("shown")); chat.classList.add("done"); return; }
  box.classList.add("js"); chat.classList.remove("done");
  items.forEach((li) => li.classList.remove("shown"));
  await wait(900);
  for (const li of items) {
    if (run !== chatRun) return;
    if (li.classList.contains("bot")) {
      const t = document.createElement("li");
      t.className = "typing"; t.setAttribute("aria-hidden", "true");
      t.append(document.createElement("i"), document.createElement("i"), document.createElement("i"));
      box.insertBefore(t, li);
      await wait(950);
      t.remove();
      if (run !== chatRun) return;
    }
    li.classList.add("shown");
    await wait(li.classList.contains("me") ? 650 : 900);
  }
  chat.classList.add("done");
}

/* sticky bar becomes frosted glass after a little scroll */
const bar = document.getElementById("bar");
const onScroll = () => bar.classList.toggle("scrolled", window.scrollY > 12);
window.addEventListener("scroll", onScroll, {passive: true}); onScroll();

/* screenshots fan out once when reached */
const shots = document.querySelector(".shots");
if (!calm && "IntersectionObserver" in window) {
  shots.classList.add("wait");
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { shots.classList.remove("wait"); io.disconnect(); } }, {threshold: 0.25});
  io.observe(shots);
}

/* language switch: soft crossfade + the headline and chat replay */
document.getElementById("lang").addEventListener("click", () => {
  const main = document.querySelector("main");
  main.classList.remove("swap"); void main.offsetWidth; main.classList.add("swap");
  setTimeout(() => { splitHeadline(); playChat(); }, 0);              // after setLang() has put the new texts in
});

/* theme switch: a circle grows from the button (View Transitions, where supported) */
const themeBtn = document.getElementById("theme");
themeBtn.addEventListener("click", (ev) => {
  const next = isDark() ? "light" : "dark";
  if (calm || !document.startViewTransition) return;                 // the plain handler below switches instantly
  ev.stopImmediatePropagation();
  const r = themeBtn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  const root = document.documentElement.style;
  root.setProperty("--x", x + "px"); root.setProperty("--y", y + "px");
  root.setProperty("--r", Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + "px");
  document.startViewTransition(() => setTheme(next));
}, true);

splitHeadline();
playChat();

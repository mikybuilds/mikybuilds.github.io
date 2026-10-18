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
  "foot": "Site written by hand in HTML, CSS and JavaScript.", "totop": "Back to top",
  "st.online": "online", "st.typing": "typing…",
  "hw.title": "The path of one message",
  "hw.n1t": "My phone", "hw.n1d": "I type or send a voice message on Telegram, even from school.",
  "hw.n2t": "My PC", "hw.n2d": "Qwen3 8B runs on the 8 GB RTX 5060, Whisper transcribes the voice. No paid services.",
  "hw.n3t": "More than 100 tools", "hw.n3d": "Classeviva, Classroom, Subito, Obsidian, email, browser: the model picks the right one.",
  "hw.back": "The answer is back on the phone in a few seconds.",
  "pr.title": "How we work",
  "pr.1t": "You message me", "pr.1d": "A couple of lines about what you need is enough: I'll ask the rest.",
  "pr.2t": "You get a proposal", "pr.2d": "I send you the idea, the timing and the price before I start. No commitment.",
  "pr.3t": "You try it, we polish it", "pr.3d": "You see the work while I build it and we fix the details together.",
  "pr.cta": "Ask for a proposal on Telegram",
  "_themeDark": "Dark theme", "_themeLight": "Light theme", "_langBtn": "IT", "_langAria": "Passa all'italiano",
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
  "st.typing": "sta scrivendo…",
  _title: document.title, _desc: document.querySelector('meta[name="description"]').content,
  _chat: document.querySelector(".chat").getAttribute("aria-label"),
  _themeDark: "Tema scuro", _themeLight: "Tema chiaro", _langBtn: "EN", _langAria: "Switch to English"
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
  const lb = document.getElementById("lang");
  lb.textContent = d._langBtn; lb.setAttribute("aria-label", d._langAria);
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
  const dark = isDark();
  document.documentElement.classList.toggle("is-dark", dark);
  document.getElementById("theme").setAttribute("aria-label", dark ? dict()._themeLight : dict()._themeDark);
}

/* contacts */
function renderContacts() {
  const box = document.getElementById("contact-links");
  const links = [];
  const tgUrl = "https://t.me/" + CONTACTS.telegram.replace(/^@/, "");
  if (CONTACTS.telegram) links.push([tgUrl, "@" + CONTACTS.telegram.replace(/^@/, ""), "telegram"]);
  if (CONTACTS.email) links.push(["mailto:" + CONTACTS.email, CONTACTS.email, ""]);
  if (CONTACTS.github) links.push(["https://github.com/" + CONTACTS.github, "GitHub", "github"]);
  if (CONTACTS.linkedin) links.push([CONTACTS.linkedin, "LinkedIn", ""]);
  box.replaceChildren(...links.map(([href, text, icon]) => {
    const a = document.createElement("a");
    a.href = href;
    if (ICONS[icon]) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24"); svg.setAttribute("aria-hidden", "true");
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", ICONS[icon]); svg.append(p); a.append(svg);
    }
    a.append(text);
    if (/^https?:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }));
  document.querySelectorAll("#cta-tg, [data-tg]").forEach((el) => { if (!CONTACTS.telegram) el.remove(); else el.href = tgUrl; });
}

/* brand marks from Simple Icons (CC0) */
const ICONS = {
  telegram: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
};

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
  const status = document.getElementById("status");
  const setStatus = (typing) => { status.textContent = dict()[typing ? "st.typing" : "st.online"]; };
  box.querySelectorAll(".typing").forEach((t) => t.remove());
  setStatus(false);
  if (calm) { items.forEach((li) => li.classList.add("shown")); chat.classList.add("done"); return; }
  /* reserve the final height first, so the page doesn't jump while messages appear */
  box.style.minHeight = ""; box.classList.remove("js");
  box.style.minHeight = box.offsetHeight + "px";
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
      setStatus(true);
      await wait(950);
      t.remove();
      setStatus(false);
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

/* the message path animates once, when reached */
const flow = document.getElementById("flow");
if (!calm && "IntersectionObserver" in window) {
  const fo = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { flow.classList.add("run"); fo.disconnect(); } }, {threshold: 0.5});
  fo.observe(flow);
}

/* the chat wallpaper lights up under the pointer (mouse/pen only) */
const win = document.getElementById("window");
if (!calm && window.matchMedia("(pointer: fine)").matches) {
  win.addEventListener("pointermove", (e) => {
    const r = win.getBoundingClientRect();
    win.style.setProperty("--mx", (e.clientX - r.left) + "px");
    win.style.setProperty("--my", (e.clientY - r.top) + "px");
  });
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

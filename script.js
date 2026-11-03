/* Portfolio of Mykhailo: Italian / English switch, theme switch, contact links, app showcase, chat intro. No libraries. */
"use strict";

/* Contacts — empty fields are not shown. */
const CONTACTS = {
  telegram: "mikybuilds",   // without @
  email: "",
  github: "mikybuilds",
  linkedin: "https://www.linkedin.com/in/mykhailo-zhupanov/",
  instagram: "mishh9ar"   // without @
};

const EN = {
  "skip": "Skip to content",
  "nav.about": "About", "nav.services": "Services", "nav.contact": "Contact",
  "nav.projects": "Projects",
  "pj.title": "Projects", "pj.lead": "Things I've built. Open a project to see how it works.", "pj.more": "See the project", "pj.new": "New", "pj.t.os": "Open source", "pj.t.local": "Local AI",
  "pj.lan.d": "A free AI assistant for Windows and Linux: it uses free cloud models or your own local ones. Open source, no telemetry.",
  "pj.mc.d": "My personal assistant on Telegram: homework, grades, reminders and Subito deals, with a model that runs on my own PC.",
  "pj.mc.q": "What do I have tomorrow?", "pj.mc.a": "Tomorrow you have 5 lessons. The physics test is in the third period.", "pj.mc.q2": "Make me a revision plan",
  "pj.ios.n": "MikyCore for iPhone", "pj.ios.d": "The bot's native app: chat, your day, grades, Classroom and Home Screen widgets.",
  "pj.sit.n": "Websites for local shops", "pj.sit.d": "A bot that finds shops without a website, builds one and prepares a QR kit to bring in person.",
  "pj.sit.name": "Sample Café", "pj.sit.sub": "Sample site made by the bot", "pj.sit.cta": "Call us", "pj.sit.live": "online",
  "hero.title": "I build bots that work while I study.",
  "hero.lead": "I'm Mykhailo Zhupanov, a computer science student in Ferrara, Italy. My assistant MikyCore runs on my own PC: it keeps an eye on homework, gets me ready for tests and finds deals on Subito.",
  "hero.cta": "Message me on Telegram", "hero.more": "How MikyCore works", "hero.badge": "Available for small projects",
  "nt.1t": "Reminder", "nt.1d": "Physics test tomorrow, 10:40", "nt.2t": "Deal found", "nt.2d": "Dell Latitude 7490 · −40%", "nt.3t": "Homework ready", "nt.3d": "average.py, checked by running it",
  "chat.cap": "A typical conversation with MikyCore.",
  "c1": "Any good ThinkPads on Subito?",
  "c2a": "One, yes: Dell Latitude 7490, i7 with 8 GB, for €150.",
  "c2b": "For this configuration the market is around €250",
  "c2c": "Shipping with TuttoSubito, so the payment is protected.",
  "g.today": "Today, 3:42 pm", "g.me1": "What do I have tomorrow?",
  "g.b1": "Tomorrow you have 5 lessons, starting at 8:00. The important one: the physics test in the third period.",
  "g.day": "Tuesday, October 21", "g.n5": "5 lessons", "g.ph": "Message MikyCore…", "g.ch2": "Revision plan",
  "su.it": "Italian", "su.ma": "Maths", "su.fi": "Physics", "su.st": "History", "su.en": "English",
  "m.test": "test", "m.hw": "Homework for tomorrow",
  "about.title": "About me",
  "about.p1": "I'm Ukrainian and I live in Italy, where I'm in my third year of computer science. I like taking an everyday problem — homework, grades, notes, online listings — and writing the program that solves it on its own.",
  "ab.p2": "Every feature has its own automated tests, and I try everything on the real model before I trust it.",
  "ab.k1": "Studying", "ab.v1": "Computer science, third year", "ab.k2": "I write", "ab.k3": "I work with", "ab.k4": "Languages", "ab.k5": "Main project", "ab.v4": "Ukrainian (native), Italian, English",
  "mc.lead": "A personal Telegram assistant with a language model that runs entirely on my 8 GB graphics card: no subscriptions, no data sent anywhere. I use it every day for school. It's about 21,000 lines of code with 46 test suites.",
  "hw.title": "The path of one message",
  "hw.n1t": "My phone", "hw.n1d": "I type or send a voice message on Telegram, even from school.",
  "hw.n2t": "My PC", "hw.n2d": "Qwen3 8B runs on the 8 GB RTX 5060, Whisper transcribes the voice. No paid services.",
  "hw.n3t": "More than 100 tools", "hw.n3d": "Classeviva, Classroom, Subito, Obsidian, email, browser: the model picks the right one.",
  "hw.back": "The answer is back on the phone in a few seconds.",
  "app.title": "The iPhone app",
  "app.lead": "Besides Telegram, MikyCore has its own iOS app: chat, timetable, grades, homework and widgets. The screens below are the real ones, with sample data.",
  "f1.t": "Picks the right tool on its own", "f1.d": "It has more than 100 tools: reminders, files, browser, Google Classroom, email. In tests on the real model it picks the right one 98% of the time.",
  "sf2.t": "Your day on one screen", "sf2.d": "The lesson in progress, the timetable, homework for tomorrow, Classroom deadlines and tests. The data comes from Classeviva and Classroom.",
  "m.ask": "Ask MikyCore", "m.today": "Today", "m.date": "Monday, October 20", "m.now": "Now · period 3", "m.left": "28 min left", "m.next": "Next: History at 11:35",
  "m.hwc": "1 of 3", "m.hw1": "Maths — exercises 4–7, p. 112", "m.hw2": "History — read section 9", "m.hw3": "Physics — review Newton's laws",
  "m.cr": "Classroom: arithmetic mean", "m.crd": "due tomorrow, 11:59 pm · 2 tasks left",
  "sf3.t": "Grades and average, with advice", "sf3.d": "Average per subject and the trend over time. It also tells me what mark I need on the next test to reach my goal.",
  "gr.upd": "Classeviva · updated 2:05 pm", "gr.h": "Grades", "gr.avg": "semester average", "gr.up": "▲ 0.3 in the last month",
  "gr.tip": "Tip", "gr.tipt": "To reach an 8 in maths, you need a 9 or higher on the next test.", "gr.plan": "Make a revision plan →",
  "sf4.t": "Homework, done together", "sf4.d": "It reads the Classroom assignments, writes the code and checks it by running it, then saves the result to Google Drive.",
  "cl.ref": "Refresh", "cl.sub": "3 to hand in · the next one is tomorrow", "cl.all": "All", "cl.cs": "Computer science",
  "cl.d1": "due tomorrow, 11:59 pm", "cl.t1": "Program: arithmetic mean of an array", "cl.g1": "Code · Python", "cl.m1": "1 file",
  "cl.ok": "Done · on Google Drive", "cl.okd": "average.py · checked by running it", "cl.chat": "To chat",
  "cl.d2": "due Fri, October 25", "cl.t2": "Presentation: the Renaissance in Italy", "cl.g2": "Presentation", "cl.m2": "2 files", "cl.do": "Do it with the bot",
  "cl.t3": "Essay: my favourite book", "cl.s3": "Italian · handed in",
  "sf5.t": "Widgets on the Home screen", "sf5.d": "Tomorrow, the lesson in progress and a shortcut to talk to the bot (voice or camera) without opening the app.",
  "wg.tom": "Tomorrow · Tuesday", "wg.hrs": "8:00 to 1:25 pm", "wg.test": "Test: physics", "wg.hw": "Homework · 1 of 3", "wg.now": "Now", "wg.till": "until 11:35 · 28 min left",
  "sf6.t": "Websites for local shops", "sf6.d": "I ask the bot to find a place without a website and build one: design, copy and a preview. Then I have a link and a QR code to bring in person.",
  "st.find": "Find places", "st.h": "Sites", "st.mine": "My sites · 4", "st.leads": "Leads · 35", "st.pub": "Published", "st.demo": "Demo",
  "hood.title": "Under the hood",
  "f2.t": "Finds deals on Subito", "f2.d": "It reads listings, works out the market price per model and configuration (CPU, RAM, generation), spots scams and only messages me when a deal is real.",
  "f3.t": "Helps me study", "f3.d": "It turns lessons into notes in Obsidian, makes flashcards, quizzes me out loud with a grade, and plans revision before tests.",
  "f4.t": "Improves itself, with my permission", "f4.d": "It notices where it fails and proposes rules, automations and even new Python plugins. Plugins run in an isolated sandbox and start only after I confirm them.",
  "f5.d": "It generates flowcharts and checks them by running them in a .fprg interpreter I wrote, which points to the error and the exact block.",
  "f6.t": "Safe by design", "f6.d": "Risky actions ask for confirmation, passwords never go through the model, outside text can't give it orders, and it doesn't get around websites' protections.",
  "f7.t": "Speaks and listens", "f7.d": "It understands voice messages with Whisper and can answer out loud too.",
  "sp.model": "Model", "sp.gpu": "Graphics card", "sp.tools": "Tools", "sp.code": "Code", "sp.lines": "lines", "sp.tests": "Tests", "sp.suites": "suites", "sp.pick": "Right tool",
  "srv.title": "Work on request",
  "srv.lead": "I take on small projects and do them well. Student prices, agreed depending on the job.",
  "s1.t": "Telegram bots", "s1.d": "Bookings, menus, customer reminders, auto-replies, mini apps. For shops, gyms, teachers.",
  "s2.t": "Websites", "s2.d": "Fast showcase sites that work well on phones too, published for free on GitHub Pages or on your domain.",
  "s3.t": "Ukrainian, Italian, English translations", "s3.d": "Letters, forms and help with Italian paperwork for Ukrainian speakers. Non-certified translations.",
  "s4.t": "Computer science tutoring", "s4.d": "Python, Flowgorithm and programming basics for younger students, with exercises and quizzes.",
  "pr.title": "How we work",
  "pr.1t": "You message me", "pr.1d": "A couple of lines about what you need is enough: I'll ask the rest.",
  "pr.2t": "You get a proposal", "pr.2d": "I send you the idea, the timing and the price before I start. No commitment.",
  "pr.3t": "You try it, we polish it", "pr.3d": "You see the work while I build it and we fix the details together.",
  "pr.cta": "Ask for a proposal on Telegram",
  "ct.title": "Contact", "ct.lead": "Message me on Telegram: I usually reply the same day.",
  "foot": "Site written by hand in HTML, CSS and JavaScript.", "totop": "Back to top",
  "st.online": "online", "st.typing": "typing…",
  "_themeDark": "Dark theme", "_themeLight": "Light theme", "_langBtn": "IT", "_langAria": "Passa all'italiano",
  "_title": "Mykhailo Zhupanov — Telegram bots and local AI",
  "_desc": "Mykhailo Zhupanov, computer science student in Ferrara, Italy. I build Telegram bots, websites and AI assistants that run on my own PC.",
  "_chat": "Example conversation with MikyCore"
};

const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode: fine */ } }
};

/* the iPhone card on the project grid shows two of the real app screens (kept in <template id="app-screens">) */
const appScreens = document.getElementById("app-screens");
document.querySelectorAll("[data-clone]").forEach((slot) => {
  const src = appScreens && appScreens.content.querySelectorAll(".screen")[Number(slot.dataset.clone)];
  if (src) slot.append(src.cloneNode(true));
});

/* Italian texts come from the page itself */
const IT = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { IT[el.dataset.i18n] = el.textContent; });
Object.assign(IT, {
  "st.typing": "sta scrivendo…",
  _title: document.title, _desc: document.querySelector('meta[name="description"]').content,
  _chat: document.querySelector(".chat").getAttribute("aria-label"),
  _themeDark: "Tema scuro", _themeLight: "Tema chiaro", _langBtn: "EN", _langAria: "Switch to English"
});
/* numbers written with an Italian comma switch to a dot in English */
document.querySelectorAll("[data-num]").forEach((el) => { el.dataset.it = el.textContent; });

let lang = "it";
let afterLang = () => {};   // set below: counters and the scrubbed paragraph must be rebuilt after the texts change
function dict() { return lang === "en" ? EN : IT; }

function setLang(code) {
  lang = code === "en" ? "en" : "it";
  const d = dict();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { if (d[el.dataset.i18n]) el.textContent = d[el.dataset.i18n]; });
  document.querySelectorAll("[data-num]").forEach((el) => { el.textContent = lang === "en" ? el.dataset.it.replace(",", ".") : el.dataset.it; });
  document.title = d._title;
  document.querySelector('meta[name="description"]').content = d._desc;
  document.querySelector(".chat").setAttribute("aria-label", d._chat);
  const lb = document.getElementById("lang");
  lb.textContent = d._langBtn; lb.setAttribute("aria-label", d._langAria);
  store.set("lang", lang);
  paintThemeButton();
  afterLang();
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
  if (CONTACTS.instagram) links.push(["https://www.instagram.com/" + CONTACTS.instagram.replace(/^@/, "") + "/", "Instagram", "instagram"]);
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
  instagram: "M8 2h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6zm0 1.8A4.2 4.2 0 0 0 3.8 8v8A4.2 4.2 0 0 0 8 20.2h8a4.2 4.2 0 0 0 4.2-4.2V8A4.2 4.2 0 0 0 16 3.8zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4zM17.3 5.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z",
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
const root = document.documentElement;
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = window.matchMedia("(pointer: fine)").matches;
const hasIO = "IntersectionObserver" in window;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const heroEl = document.getElementById("hero");
const bar = document.getElementById("bar");

/* headline: every word rises from behind its own mask */
function splitHeadline() {
  const h = document.querySelector(".hero-copy h1");
  if (!calm) {
    const words = h.textContent.trim().split(/\s+/);
    h.replaceChildren(...words.flatMap((w, i) => {
      const m = document.createElement("span"), s = document.createElement("span");
      m.className = "wm"; s.className = "w"; s.style.setProperty("--i", i); s.textContent = w; m.append(s);
      return i < words.length - 1 ? [m, document.createTextNode(" ")] : [m];
    }));
  }
  h.classList.add("ready");
}

/* the paragraph in "Chi sono" lights up word by word as you scroll through it */
const scrubEl = document.getElementById("scrub");
let scrubWords = [], scrubLit = -1;
function prepareScrub() {
  const words = scrubEl.textContent.trim().split(/\s+/);
  scrubEl.replaceChildren(...words.flatMap((w, i) => {
    const s = document.createElement("span");
    s.className = "sw"; s.textContent = w;
    return i < words.length - 1 ? [s, document.createTextNode(" ")] : [s];
  }));
  scrubWords = [...scrubEl.querySelectorAll(".sw")]; scrubLit = -1;
  updateScrub();
}
function updateScrub() {
  if (!scrubWords.length) return;
  const vh = window.innerHeight, r = scrubEl.getBoundingClientRect();
  const p = calm ? 1 : clamp((vh * 0.88 - r.top) / (vh * 0.42 + r.height * 0.7), 0, 1);
  const lit = Math.round(p * scrubWords.length);
  if (lit === scrubLit) return;
  scrubLit = lit;
  scrubWords.forEach((w, i) => w.classList.toggle("lit", i < lit));
}

/* the conversation, played like the real app: three pulsing dots before every reply */
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
  box.style.minHeight = ""; box.classList.remove("js");
  box.style.minHeight = box.offsetHeight + "px";          // reserve the final height first, so nothing jumps
  box.classList.add("js"); chat.classList.remove("done");
  items.forEach((li) => li.classList.remove("shown"));
  await wait(1100);
  for (const li of items) {
    if (run !== chatRun) return;
    if (li.classList.contains("bot")) {
      const t = document.createElement("li");
      t.className = "typing"; t.setAttribute("aria-hidden", "true");
      t.append(document.createElement("i"), document.createElement("i"), document.createElement("i"));
      box.insertBefore(t, li);
      setStatus(true);
      await wait(1000);
      t.remove();
      setStatus(false);
      if (run !== chatRun) return;
    }
    li.classList.add("shown");
    await wait(li.classList.contains("me") ? 700 : 1100);
  }
  chat.classList.add("done");
}

/* reveals: every block arrives once, then gets out of the way of its hover effects */
document.querySelectorAll(".steps li").forEach((li, i) => { li.setAttribute("data-r", ""); li.style.setProperty("--d", i * 160 + "ms"); });
const revealEls = [...document.querySelectorAll("[data-r]")];
if (calm || !hasIO) {
  revealEls.forEach((el) => { el.classList.add("in"); el.removeAttribute("data-r"); });
} else {
  const ro = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    ro.unobserve(el);
    el.classList.add("in");
    setTimeout(() => el.removeAttribute("data-r"), 2400);
  }), {threshold: 0.12, rootMargin: "0px 0px -6% 0px"});
  revealEls.forEach((el) => ro.observe(el));
}

/* stack marquee: a second copy makes the loop seamless */
const track = document.getElementById("track");
[...track.children].forEach((li) => { const c = li.cloneNode(true); c.setAttribute("aria-hidden", "true"); track.append(c); });

/* nav: a pill slides to the section you are in */
const nav = document.getElementById("nav");
const navLinks = [...nav.querySelectorAll("a")];
const ind = nav.querySelector(".nav-ind");
const navSecs = navLinks.map((a) => document.querySelector(a.getAttribute("href")));
let curSec = -1;
function moveInd(a) {
  if (!a || getComputedStyle(ind).display === "none") { ind.style.opacity = 0; return; }
  ind.style.left = a.offsetLeft + "px"; ind.style.width = a.offsetWidth + "px"; ind.style.opacity = 1;
}
function setActive(i) {
  curSec = i;
  navLinks.forEach((a, k) => a.classList.toggle("cur", k === i));
  moveInd(navLinks[i]);
}
navLinks.forEach((a) => {
  a.addEventListener("pointerenter", () => moveInd(a));
  a.addEventListener("pointerleave", () => moveInd(navLinks[curSec]));
});

/* everything that follows the scroll position, in one frame */
const prog = document.getElementById("progress");
function update() {
  const y = window.scrollY, vh = window.innerHeight, max = root.scrollHeight - vh;
  prog.style.setProperty("--sp", max > 0 ? (y / max).toFixed(4) : 0);
  bar.classList.toggle("scrolled", y > 12);
  if (!calm && fine && y < vh * 1.4) heroEl.style.setProperty("--hs", Math.round(y));
  updateScrub();
  let idx = -1;
  for (let k = navSecs.length - 1; k >= 0; k--) { if (navSecs[k].getBoundingClientRect().top < vh * 0.4) { idx = k; break; } }
  if (idx !== curSec) setActive(idx);
}
/* on narrow phones the app screens shrink to fit the width */
function fitPhones() {
  const vw = window.innerWidth;
  if (vw <= 560) root.style.setProperty("--kfit", Math.min(0.8, (vw - 2 * Math.max(20, vw * 0.05) - 16) / 390).toFixed(3));
  else root.style.removeProperty("--kfit");
}
fitPhones();
let ticking = false;
window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; update(); }); } }, {passive: true});
window.addEventListener("resize", () => { fitPhones(); update(); moveInd(navLinks[curSec]); });

/* smooth, inertial scrolling for mouse wheels (touch screens and reduced motion keep the native scroll) */
let smoothTo = null;
if (!calm && fine) {
  root.classList.add("lenis");
  let target = window.scrollY, cur = target, raf = 0;
  const limit = () => root.scrollHeight - window.innerHeight;
  const step = () => {
    cur += (target - cur) * 0.115;
    if (Math.abs(target - cur) < 0.5) { cur = target; raf = 0; } else raf = requestAnimationFrame(step);
    window.scrollTo(0, cur);
  };
  smoothTo = (y) => { target = clamp(y, 0, limit()); if (!raf) { cur = window.scrollY; raf = requestAnimationFrame(step); } };
  window.addEventListener("wheel", (e) => {
    if (e.ctrlKey || e.defaultPrevented) return;
    for (let el = e.target; el && el.nodeType === 1 && el !== document.body; el = el.parentElement) {     // let inner scrollers scroll themselves
      const oy = getComputedStyle(el).overflowY;
      if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight) return;
    }
    e.preventDefault();
    if (!raf) { cur = target = window.scrollY; }
    target = clamp(target + e.deltaY * (e.deltaMode === 1 ? 34 : e.deltaMode === 2 ? window.innerHeight : 1), 0, limit());
    if (!raf) raf = requestAnimationFrame(step);
  }, {passive: false});
  window.addEventListener("scroll", () => { if (!raf) cur = target = window.scrollY; }, {passive: true});   // keyboard, scrollbar, anchors: follow the real position
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const dest = document.querySelector(a.getAttribute("href"));
    if (!dest) return;
    e.preventDefault();
    smoothTo(dest.getBoundingClientRect().top + window.scrollY - (dest.id === "main" ? 0 : 72));
  });
}

/* pointer play: a tilted phone, magnetic buttons, a spotlight that follows the cursor on cards */
if (!calm && fine) {
  const tilt = document.getElementById("tilt");
  heroEl.addEventListener("pointermove", (e) => {
    const r = heroEl.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `rotateY(${(x * 12).toFixed(2)}deg) rotateX(${(-y * 9).toFixed(2)}deg)`;
  });
  heroEl.addEventListener("pointerleave", () => { tilt.style.transform = ""; });
  document.querySelectorAll("[data-mag], .switches button").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.translate = ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px";
    });
    el.addEventListener("pointerleave", () => { el.style.translate = ""; });
  });
  document.addEventListener("pointermove", (e) => {
    const s = e.target.closest && e.target.closest(".spot");
    if (!s) return;
    const r = s.getBoundingClientRect();
    s.style.setProperty("--mx", (e.clientX - r.left) + "px"); s.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, {passive: true});
}

/* a project card opens its page behind a coloured iris that grows from the click */
document.querySelectorAll("a.pc").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (calm || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    e.preventDefault();
    const r = a.getBoundingClientRect();
    const x = e.clientX || r.left + r.width / 2, y = e.clientY || r.top + r.height / 2;
    const colour = a.dataset.pt || "#0b0d12";
    const iris = document.createElement("div");
    iris.className = "pt"; iris.setAttribute("aria-hidden", "true");
    iris.style.setProperty("--x", x + "px"); iris.style.setProperty("--y", y + "px"); iris.style.setProperty("--ptc", colour);
    document.body.append(iris);
    store.set("pt", JSON.stringify({c: colour, x: Math.round(x), y: Math.round(y), t: Date.now()}));
    requestAnimationFrame(() => requestAnimationFrame(() => iris.classList.add("go")));
    setTimeout(() => { location.href = a.href; }, 520);
  });
});
window.addEventListener("pageshow", (e) => { if (e.persisted) document.querySelectorAll(".pt").forEach((n) => n.remove()); });

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
  if (calm || !document.startViewTransition) return;                 // the plain handler switches instantly
  ev.stopImmediatePropagation();
  const r = themeBtn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  const root2 = root.style;
  root2.setProperty("--x", x + "px"); root2.setProperty("--y", y + "px");
  root2.setProperty("--r", Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + "px");
  document.startViewTransition(() => setTheme(next));
}, true);

afterLang = () => { prepareScrub(); setTimeout(() => moveInd(navLinks[curSec]), 80); };
afterLang();
splitHeadline();
playChat();
update();

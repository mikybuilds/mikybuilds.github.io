/* Project pages: Italian / English switch, theme, reveals, smooth scroll, tilt, viewer tabs. No libraries. */
"use strict";

const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode: fine */ } }
};
const root = document.documentElement;
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = window.matchMedia("(pointer: fine)").matches;
const hasIO = "IntersectionObserver" in window;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---------- language: Italian comes from the page itself, English from window.PAGE_EN ---------- */
const EN = window.PAGE_EN || {};
const IT = {};
document.querySelectorAll("[data-i18n]").forEach((el) => { IT[el.dataset.i18n] = el.textContent; });
document.querySelectorAll("[data-i18n-label]").forEach((el) => {
  IT[el.dataset.i18nLabel] = el.getAttribute(el.tagName === "IMG" ? "alt" : "aria-label");
});
const metaDesc = document.querySelector('meta[name="description"]');
Object.assign(IT, {
  _title: document.title, _desc: metaDesc ? metaDesc.content : "",
  _themeDark: "Tema scuro", _themeLight: "Tema chiaro", _langBtn: "EN", _langAria: "Switch to English"
});
Object.assign(EN, { _themeDark: "Dark theme", _themeLight: "Light theme", _langBtn: "IT", _langAria: "Passa all'italiano" });

let lang = "it";
let afterLang = () => {};
const dict = () => (lang === "en" ? EN : IT);

function setLang(code) {
  lang = code === "en" ? "en" : "it";
  const d = dict();
  root.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => { if (d[el.dataset.i18n] != null) el.textContent = d[el.dataset.i18n]; });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    if (d[el.dataset.i18nLabel] != null) el.setAttribute(el.tagName === "IMG" ? "alt" : "aria-label", d[el.dataset.i18nLabel]);
  });
  if (d._title) document.title = d._title;
  if (metaDesc && d._desc) metaDesc.content = d._desc;
  const lb = document.getElementById("lang");
  lb.textContent = d._langBtn; lb.setAttribute("aria-label", d._langAria);
  store.set("lang", lang);
  paintThemeButton();
  afterLang();
}

/* ---------- theme ---------- */
function isDark() {
  const t = root.dataset.theme;
  return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function setTheme(t) {
  if (t === "light" || t === "dark") root.dataset.theme = t; else delete root.dataset.theme;
  store.set("theme", t || "");
  paintThemeButton();
}
function paintThemeButton() {
  const dark = isDark();
  root.classList.toggle("is-dark", dark);
  document.getElementById("theme").setAttribute("aria-label", dark ? dict()._themeLight : dict()._themeDark);
}

/* ---------- start ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
setTheme(store.get("theme") || "");
setLang(store.get("lang") || ((navigator.language || "it").toLowerCase().startsWith("it") ? "it" : "en"));
document.getElementById("lang").addEventListener("click", () => {
  setLang(lang === "en" ? "it" : "en");
  const main = document.querySelector("main");
  main.classList.remove("swap"); void main.offsetWidth; main.classList.add("swap");
});
document.getElementById("theme").addEventListener("click", () => setTheme(isDark() ? "light" : "dark"));
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paintThemeButton);

/* theme switch: a circle grows from the button where View Transitions exist */
const themeBtn = document.getElementById("theme");
themeBtn.addEventListener("click", (ev) => {
  if (calm || !document.startViewTransition) return;
  ev.stopImmediatePropagation();
  const next = isDark() ? "light" : "dark";
  const r = themeBtn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  root.style.setProperty("--x", x + "px"); root.style.setProperty("--y", y + "px");
  root.style.setProperty("--r", Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + "px");
  document.startViewTransition(() => setTheme(next));
}, true);

/* ---------- numbers count up ---------- */
const cnts = [...document.querySelectorAll(".cnt")];
const fmtNum = (n) => n >= 1000 ? (lang === "en" ? n.toLocaleString("en-US") : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")) : String(n);
const paintCnt = (el) => { el.textContent = fmtNum(Math.round(el._v)); };
cnts.forEach((el) => { el._v = Number(el.dataset.count); });
if (cnts.length && !calm && hasIO) {
  cnts.forEach((el) => { el._v = 0; paintCnt(el); });
  const co = new IntersectionObserver((es) => {
    if (!es.some((e) => e.isIntersecting)) return;
    co.disconnect();
    const t0 = performance.now();
    const tick = (now) => {
      const t = clamp((now - t0) / 1600, 0, 1), e = 1 - Math.pow(2, -10 * t);
      cnts.forEach((el) => { el._v = Number(el.dataset.count) * (t === 1 ? 1 : e); paintCnt(el); });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, {threshold: 0.4});
  co.observe(cnts[0].closest("dl, ul, div"));
}
afterLang = () => { cnts.forEach(paintCnt); };
afterLang();

/* ---------- reveals ---------- */
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

/* ---------- scroll: progress bar, glass bar, parallax of the hero art ---------- */
const bar = document.getElementById("bar"), prog = document.getElementById("progress");
const heroEl = document.querySelector(".p-hero");
function update() {
  const y = window.scrollY, vh = window.innerHeight, max = root.scrollHeight - vh;
  prog.style.setProperty("--sp", max > 0 ? (y / max).toFixed(4) : 0);
  bar.classList.toggle("scrolled", y > 12);
  if (heroEl && !calm && fine && y < vh * 1.4) heroEl.style.setProperty("--hs", Math.round(y));
}
let ticking = false;
window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; update(); }); } }, {passive: true});

/* phone mockups and composed art shrink to fit narrow screens */
function fit() {
  const vw = window.innerWidth;
  if (vw <= 560) root.style.setProperty("--kfit", Math.min(0.8, (vw - 2 * Math.max(20, vw * 0.05) - 16) / 390).toFixed(3));
  else root.style.removeProperty("--kfit");
  document.querySelectorAll(".fit").forEach((el) => {
    const w = Number(el.dataset.w), h = Number(el.dataset.h);
    const room = el.parentElement.clientWidth || vw;
    const s = Math.min(1, room / w);
    el.style.setProperty("--fs", s.toFixed(3));
    el.parentElement.style.height = Math.round(h * s) + "px";
  });
}
window.addEventListener("resize", () => { fit(); update(); });
fit();

/* ---------- smooth, inertial scrolling for mouse wheels ---------- */
if (!calm && fine) {
  root.classList.add("lenis");
  let target = window.scrollY, cur = target, raf = 0;
  const limit = () => root.scrollHeight - window.innerHeight;
  const step = () => {
    cur += (target - cur) * 0.115;
    if (Math.abs(target - cur) < 0.5) { cur = target; raf = 0; } else raf = requestAnimationFrame(step);
    window.scrollTo(0, cur);
  };
  window.addEventListener("wheel", (e) => {
    if (e.ctrlKey || e.defaultPrevented) return;
    for (let el = e.target; el && el.nodeType === 1 && el !== document.body; el = el.parentElement) {
      const oy = getComputedStyle(el).overflowY;
      if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight) return;
    }
    e.preventDefault();
    if (!raf) { cur = target = window.scrollY; }
    target = clamp(target + e.deltaY * (e.deltaMode === 1 ? 34 : e.deltaMode === 2 ? window.innerHeight : 1), 0, limit());
    if (!raf) raf = requestAnimationFrame(step);
  }, {passive: false});
  window.addEventListener("scroll", () => { if (!raf) cur = target = window.scrollY; }, {passive: true});
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const dest = document.querySelector(a.getAttribute("href"));
    if (!dest) return;
    e.preventDefault();
    target = clamp(dest.getBoundingClientRect().top + window.scrollY - (dest.id === "main" ? 0 : 72), 0, limit());
    if (!raf) { cur = window.scrollY; raf = requestAnimationFrame(step); }
  });
}

/* ---------- pointer play: tilt, magnetic buttons, card spotlight ---------- */
if (!calm && fine) {
  document.querySelectorAll("[data-tilt]").forEach((box) => {
    const host = box.closest(".p-hero") || box;
    host.addEventListener("pointermove", (e) => {
      const r = host.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      box.style.transform = `rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 7).toFixed(2)}deg)`;
    });
    host.addEventListener("pointerleave", () => { box.style.transform = ""; });
  });
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

/* ---------- screenshot viewer (tabs) ---------- */
document.querySelectorAll(".viewer").forEach((v) => {
  const tabs = [...v.querySelectorAll('[role="tab"]')], shots = [...v.querySelectorAll(".v-shot")], caps = [...v.querySelectorAll(".v-cap")];
  const win = v.querySelector(".v-win");
  const show = (i, focus) => {
    tabs.forEach((t, k) => { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; });
    shots.forEach((s, k) => s.classList.toggle("on", k === i));
    caps.forEach((c, k) => { c.hidden = k !== i; });
    win.classList.toggle("bare", shots[i].dataset.bare === "1");
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => show(i));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        show((i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length, true);
      }
    });
  });
  show(0);
});

/* ---------- copy buttons ---------- */
document.querySelectorAll("[data-copy]").forEach((b) => {
  b.addEventListener("click", async () => {
    const text = b.closest(".code").querySelector("code").textContent;
    try { await navigator.clipboard.writeText(text); } catch (e) {
      const ta = document.createElement("textarea"); ta.value = text; document.body.append(ta); ta.select();
      try { document.execCommand("copy"); } catch (e2) { /* nothing more to try */ }
      ta.remove();
    }
    b.classList.add("ok");
    setTimeout(() => b.classList.remove("ok"), 1600);
  });
});

update();

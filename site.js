/* Site script for every page: IT / EN, theme, section marker, reveals, intro headline, count-up, project preview, viewer tabs, copy buttons. No libraries. */
"use strict";

const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode: fine */ } }
};
const root = document.documentElement;
const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasIO = "IntersectionObserver" in window;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---------- language: Italian is the text of the page, English comes from window.PAGE_EN ---------- */
const EN = Object.assign({ _themeToDark: "Dark", _themeToLight: "Light" }, window.PAGE_EN || {});
const IT = { _themeToDark: "Scuro", _themeToLight: "Chiaro" };
document.querySelectorAll("[data-i18n]").forEach((el) => { IT[el.dataset.i18n] = el.textContent; });
document.querySelectorAll("[data-i18n-label]").forEach((el) => {
  IT[el.dataset.i18nLabel] = el.getAttribute(el.tagName === "IMG" ? "alt" : "aria-label");
});
const metaDesc = document.querySelector('meta[name="description"]');
IT._title = document.title; IT._desc = metaDesc ? metaDesc.content : "";

let lang = "it";
const dict = () => (lang === "en" ? EN : IT);
let afterLang = () => {};

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
  document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  store.set("lang", lang);
  paintTheme();
  afterLang();
}

/* ---------- theme ---------- */
const themeBtn = document.getElementById("theme");
function isDark() {
  const t = root.dataset.theme;
  return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function paintTheme() {
  const dark = isDark(), d = dict();
  const next = dark ? d._themeToLight : d._themeToDark;
  themeBtn.setAttribute("aria-label", next);
  const l = themeBtn.querySelector(".t-label");
  if (l) l.textContent = next;
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.content = dark ? "#111317" : "#F3F4F6";
}
function setTheme(t) {
  if (t === "light" || t === "dark") root.dataset.theme = t; else delete root.dataset.theme;
  store.set("theme", t || "");
  paintTheme();
}
themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  if (!calm && document.startViewTransition) document.startViewTransition(() => setTheme(next));   // a 200 ms crossfade, see base.css
  else setTheme(next);
});
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", paintTheme);

/* ---------- start ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
setTheme(store.get("theme") || "");
setLang(store.get("lang") || ((navigator.language || "it").toLowerCase().startsWith("it") ? "it" : "en"));
document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

/* ---------- intro headline: every word rises from behind a mask, once, under 600 ms ---------- */
document.querySelectorAll(".display").forEach((h) => {
  if (!calm && h.hasAttribute("data-split")) {
    const words = h.textContent.trim().split(/\s+/);
    h.replaceChildren(...words.flatMap((w, i) => {
      const m = document.createElement("span"), s = document.createElement("span");
      m.className = "wm"; s.className = "w"; s.style.setProperty("--i", i); s.textContent = w; m.append(s);
      return i < words.length - 1 ? [m, document.createTextNode(" ")] : [m];
    }));
  }
  h.classList.add("ready");
});

/* ---------- numbers count up once when they appear ---------- */
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
      const t = clamp((now - t0) / 900, 0, 1), e = 1 - Math.pow(2, -10 * t);
      cnts.forEach((el) => { el._v = Number(el.dataset.count) * (t === 1 ? 1 : e); paintCnt(el); });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.4 });
  co.observe(cnts[0].closest("dl, ul, div"));
}
afterLang = () => cnts.forEach(paintCnt);
afterLang();

/* ---------- reveals: each block arrives once, 8 px and 360 ms ---------- */
const revealEls = [...document.querySelectorAll("[data-r]")];
if (calm || !hasIO) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const ro = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    ro.unobserve(e.target);
    e.target.classList.add("in");
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  revealEls.forEach((el) => ro.observe(el));
}

/* ---------- home: the nav marks the section you are in ---------- */
const navLinks = [...document.querySelectorAll(".site-nav a[data-sec]")];
if (navLinks.length && document.body.dataset.page === "home") {
  const secs = navLinks.map((a) => document.getElementById(a.dataset.sec));
  const mark = () => {
    let idx = -1;
    for (let k = secs.length - 1; k >= 0; k--) { if (secs[k] && secs[k].getBoundingClientRect().top < window.innerHeight * 0.4) { idx = k; break; } }
    navLinks.forEach((a, k) => { if (k === idx) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
  };
  let ticking = false;
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; mark(); }); } }, { passive: true });
  mark();
}

/* ---------- project index: a flat screenshot follows the pointer (wide screens, fine pointer) ---------- */
const preview = document.getElementById("preview");
if (preview && window.matchMedia("(min-width: 1100px) and (pointer: fine)").matches) {
  const img = preview.querySelector("img");
  const rows = document.querySelectorAll(".index-row[data-preview]");
  let current = "";
  rows.forEach((row) => {
    row.addEventListener("pointerenter", () => {
      const src = row.dataset.preview;
      if (src !== current) { img.src = src; current = src; }
      preview.classList.add("on");
    });
    row.addEventListener("pointermove", (e) => {
      const x = Math.min(e.clientX + 28, window.innerWidth - 340), y = clamp(e.clientY - 100, 76, window.innerHeight - 220);
      preview.style.setProperty("--px", x + "px"); preview.style.setProperty("--py", y + "px");
    });
    row.addEventListener("pointerleave", () => preview.classList.remove("on"));
  });
}

/* ---------- screenshot viewer (tabs) ---------- */
document.querySelectorAll(".viewer").forEach((v) => {
  const tabs = [...v.querySelectorAll('[role="tab"]')], shots = [...v.querySelectorAll(".stack img")], caps = [...v.querySelectorAll(".v-cap")];
  const stack = v.querySelector(".stack"), panel = v.querySelector('[role="tabpanel"]');
  const show = (i, focus) => {
    tabs.forEach((t, k) => { t.setAttribute("aria-selected", String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    shots.forEach((s, k) => s.classList.toggle("on", k === i));
    if (stack) stack.style.aspectRatio = shots[i].getAttribute("width") + " / " + shots[i].getAttribute("height");   // never crop a screenshot
    if (panel) panel.setAttribute("aria-labelledby", tabs[i].id);
    caps.forEach((c, k) => { c.hidden = k !== i; });
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

/* Lanterna's current version and installer size, read from its latest GitHub release.
   The pages ship with the number that was current when they were built, so they work without this script or when GitHub is unreachable;
   when a newer release exists the number is replaced by it. The answer is cached for an hour to stay far below GitHub's anonymous rate limit. */
(function () {
  "use strict";
  var API = "https://api.github.com/repos/mikybuilds/lanterna/releases/latest";
  var KEY = "lv", TTL = 60 * 60 * 1000;
  var els = document.querySelectorAll("[data-lv]");
  if (!els.length) return;

  function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function write(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* private mode: fine */ } }

  function parts(v) { return String(v).split(".").map(function (x) { return parseInt(x, 10) || 0; }); }
  function newer(a, b) {                       // is version a newer than b?
    var x = parts(a), y = parts(b);
    for (var i = 0; i < 3; i++) { if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0); }
    return false;
  }
  function baked() {
    var n = document.querySelector('[data-lv="n"], [data-lv="v"]');
    return n ? n.textContent.replace(/[^0-9.]/g, "") : "0.0.0";
  }
  function paint(d) {
    if (!d || !d.n || !newer(d.n, baked())) return;
    els.forEach(function (el) {
      var k = el.getAttribute("data-lv");
      if (k === "v") el.textContent = "v" + d.n;
      else if (k === "n") el.textContent = d.n;
      else if (k === "size" && d.size) el.textContent = d.size;
    });
  }

  var cached = read();
  paint(cached);
  if (cached && Date.now() - cached.t < TTL) return;
  if (!window.fetch) return;
  fetch(API, {headers: {Accept: "application/vnd.github+json"}})
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (j) {
      var asset = (j.assets || []).filter(function (a) { return /^Lanterna-Setup-.*\.exe$/.test(a.name); })[0];
      var d = {n: String(j.tag_name || "").replace(/^v/, ""), size: asset ? Math.round(asset.size / 1e6) : 0, t: Date.now()};
      if (!d.n) return;
      write(d);
      paint(d);
    })
    .catch(function () { /* offline or rate-limited: keep what the page already shows */ });
})();

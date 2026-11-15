/* Lanterna's current version, read from its latest GitHub release.
   The pages ship with the numbers that were current when they were built, so they work without this script or when GitHub is unreachable.
   When a newer release exists, the version, the installer size and the release date are replaced, and the release is put on top of the release log.
   The answer is cached for an hour to stay far below GitHub's anonymous rate limit. */
(function () {
  "use strict";
  var API = "https://api.github.com/repos/mikybuilds/lanterna/releases/latest";
  var KEY = "lv2", TTL = 60 * 60 * 1000;
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
  var baked = (function () {
    var n = document.querySelector('[data-lv="n"], [data-lv="v"]');
    return n ? n.textContent.replace(/[^0-9.]/g, "") : "0.0.0";
  })();
  var bakedCount = (function () {
    var c = document.querySelector('[data-lv="count"]');
    return c ? parseInt(c.textContent, 10) || 0 : 0;
  })();
  var painted = false;

  function paint(d) {
    if (painted || !d || !d.n || !newer(d.n, baked)) return;
    painted = true;
    els.forEach(function (el) {
      var k = el.getAttribute("data-lv");
      if (k === "v") el.textContent = "v" + d.n;
      else if (k === "n") el.textContent = d.n;
      else if (k === "size" && d.size) el.textContent = d.size;
      else if (k === "date" && d.date) el.textContent = d.date;
      else if (k === "count" && bakedCount) el.textContent = (bakedCount + 1) + "+";   // at least one more than when the page was built
    });
    var list = document.getElementById("rel-list");
    if (list && d.title) {
      var row = document.createElement("div");
      row.className = "rel-row";
      [["meta num", "v" + d.n], ["meta num", d.date || ""], ["rel-t", d.title]].forEach(function (c) {
        var s = document.createElement("span"); s.className = c[0]; s.textContent = c[1]; row.appendChild(s);
      });
      list.insertBefore(row, list.firstChild);
      if (list.children.length > 5) list.removeChild(list.lastChild);
    }
  }

  // A fresh answer is shown at once. An old one is shown only when GitHub can't be asked: painting it first would
  // keep a version that is one release behind on the screen for this visit (the page is painted once).
  var cached = read();
  if (cached && Date.now() - cached.t < TTL) { paint(cached); return; }
  if (!window.fetch) { paint(cached); return; }
  fetch(API, {headers: {Accept: "application/vnd.github+json"}})
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (j) {
      var asset = (j.assets || []).filter(function (a) { return /^Lanterna-Setup-.*\.exe$/.test(a.name); })[0];
      var day = String(j.published_at || "").slice(0, 10).split("-");
      var first = String(j.body || "").trim().split("\n")[0];
      var d = {
        n: String(j.tag_name || "").replace(/^v/, ""),
        size: asset ? Math.round(asset.size / 1e6) : 0,
        date: day.length === 3 ? day[2] + "." + day[1] + "." + day[0] : "",
        title: first.indexOf("—") > -1 ? first.split("—").slice(1).join("—").trim() : String(j.name || ""),
        t: Date.now()
      };
      if (!d.n) { paint(cached); return; }
      write(d);
      paint(d);
    })
    .catch(function () { paint(cached); /* offline or rate-limited: the last known answer, or what the page was built with */ });
})();

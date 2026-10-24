// Map culling setting, in Settings > Video > Smoothness. On: when a map loads, its
// repeated objects are batched per 32 m chunk instead of across the whole map, so the
// game's own per-frame culling can skip what is behind or beside you (the split is in
// mods/.../BiMsX6Xn.js, switched by globalThis.__aimChunk, which preload.js sets before
// any map loads). Same picture, 50-80% fewer triangles: a big gain when the graphics
// chip is the limit (laptops, integrated graphics), but a little extra CPU work per frame
// that can cost FPS on strong graphics cards. Off (default): the original batching.
// A built map stays in memory, so a change applies after the app restarts.
(() => {
  if (window.__aimMapCulling) return;
  window.__aimMapCulling = true;

  const KEY = "es-map-culling";
  const MODES = [
    { id: "on", label: "On", title: "Draw only the parts of the map in front of you. Same picture, more FPS on laptops and integrated graphics" },
    { id: "off", label: "Off", title: "Draw the whole map every frame, the original way. Best for strong graphics cards" },
  ];
  const applied = (() => { try { return localStorage.getItem(KEY) === "on" ? "on" : "off"; } catch { return "off"; } })();

  function current() {
    try { return localStorage.getItem(KEY) === "on" ? "on" : "off"; } catch { return "off"; }
  }

  function set(mode) {
    try { localStorage.setItem(KEY, mode); } catch {}
    for (const row of document.querySelectorAll(".es-map-culling")) render(row);
  }

  function render(row) {
    const mode = current();
    for (const b of row.querySelectorAll("button[data-mode]")) {
      const on = b.dataset.mode === mode;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-checked", String(on));
    }
    // A built map stays in memory, so the change needs a restart; say so in place of the hint.
    const needsRestart = mode !== applied;
    row.querySelector(".es-map-culling-restart").hidden = !needsRestart;
    row.querySelector(".es-map-culling-hint").hidden = needsRestart;
  }

  // A row like the game's own (copied from Frame mode, including its scoped-style
  // attribute), placed first under the Smoothness heading.
  function addRow() {
    const frameMode = document.querySelector('[data-setting="frameMode"]');
    const list = frameMode ? frameMode.parentElement : null;
    if (!list || list.querySelector(".es-map-culling")) return;
    const heading = [...list.children].find((el) => el.matches("h3.hall-dialog-section") && /Smoothness/.test(el.textContent));
    const scoped = [...frameMode.attributes].filter((a) => a.name.startsWith("data-v-")).map((a) => a.name);
    const row = document.createElement("div");
    row.className = "hall-field hall-choice es-map-culling";
    row.dataset.setting = "esMapCulling";
    for (const a of scoped) row.setAttribute(a, "");
    row.innerHTML =
      '<span class="hall-field-text"><span class="hall-field-head"><b>Map culling</b>' +
      '<em class="hall-field-local" title="Saved on this PC only">This PC only</em></span>' +
      '<small><span class="es-map-culling-hint">For laptops and integrated graphics: draws only the parts of the map in front of you. Can lower FPS on strong graphics cards</span>' +
      '<button type="button" class="es-map-culling-restart" hidden>Restart the app to apply</button></small></span>' +
      '<div class="hall-choice-options" role="radiogroup" aria-label="Map culling"></div>';
    const options = row.querySelector(".hall-choice-options");
    for (const m of MODES) {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "radio");
      b.dataset.mode = m.id;
      b.title = m.title;
      b.textContent = m.label;
      b.addEventListener("click", () => set(m.id));
      options.appendChild(b);
    }
    row.querySelector(".es-map-culling-restart").addEventListener("click", () => window.aimDesktop?.restart?.());
    render(row);
    (heading ? heading.nextElementSibling : frameMode).before(row);
  }

  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      addRow();
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
  addRow();
})();

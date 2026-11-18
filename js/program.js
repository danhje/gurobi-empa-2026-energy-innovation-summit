/**
 * Program overview sidebar.
 *
 * Reads program.json, highlights the item tagged on the current slide
 * (or inherited from the most recent preceding data-session), and toggles
 * with the T key. Titles only — times and speakers stay in the JSON.
 */
(function () {
  let program = null;
  let itemIndex = new Map();
  let userHidden = false;
  let frame = null;
  let sidebar = null;

  function allItems() {
    const list = [];
    for (const day of program.days) {
      for (const item of day.items) {
        list.push({ day, item });
        itemIndex.set(item.id, { day, item });
      }
    }
    return list;
  }

  function slidesInOrder() {
    if (typeof Reveal !== "undefined" && Reveal.getSlides) {
      return Reveal.getSlides();
    }
    return Array.from(document.querySelectorAll(".reveal .slides section"));
  }

  function sessionState(slide) {
    if (!slide) return { hide: true, id: null };

    const explicit = slide.getAttribute("data-session");
    if (explicit === "none" || slide.classList.contains("no-program")) {
      return { hide: true, id: null };
    }
    if (explicit) {
      return { hide: false, id: explicit };
    }
    if (slide.classList.contains("title-slide")) {
      return { hide: true, id: null };
    }

    const slides = slidesInOrder();
    const idx = slides.indexOf(slide);
    const start = idx === -1 ? slides.length - 1 : idx - 1;
    for (let i = start; i >= 0; i--) {
      const prev = slides[i];
      const value = prev.getAttribute("data-session");
      if (!value && !prev.classList.contains("no-program")) continue;
      if (value === "none" || prev.classList.contains("no-program")) {
        return { hide: true, id: null };
      }
      if (value) return { hide: false, id: value };
    }
    return { hide: true, id: null };
  }

  function dayFor(id) {
    if (id && itemIndex.has(id)) return itemIndex.get(id).day;
    return program.days[0] || null;
  }

  function windowedItems(day, currentId) {
    const items = day.items;
    const currentIndex = Math.max(
      0,
      items.findIndex((it) => it.id === currentId)
    );
    const frameH = frame ? frame.clientHeight : 1080;
    const headerH = frameH * 0.08;
    const rowH = Math.max(28, frameH * 0.036);
    const maxCount = Math.max(8, Math.floor((frameH - headerH) / rowH));
    if (items.length <= maxCount) {
      return { items, start: 0, end: items.length, clippedBefore: false, clippedAfter: false };
    }
    const half = Math.floor(maxCount / 2);
    let start = Math.max(0, currentIndex - half);
    let end = start + maxCount;
    if (end > items.length) {
      end = items.length;
      start = Math.max(0, end - maxCount);
    }
    return {
      items: items.slice(start, end),
      start,
      end,
      clippedBefore: start > 0,
      clippedAfter: end < items.length,
    };
  }

  function itemClass(day, item, currentId) {
    const classes = ["program-sidebar__item"];
    if (item.kind) classes.push(`is-${item.kind}`);
    if (item.id === currentId) {
      classes.push("is-current");
      return classes.join(" ");
    }
    if (!currentId) return classes.join(" ");
    const ids = day.items.map((it) => it.id);
    const ci = ids.indexOf(currentId);
    const ii = ids.indexOf(item.id);
    if (ci !== -1 && ii !== -1 && ii < ci) classes.push("is-past");
    else classes.push("is-upcoming");
    return classes.join(" ");
  }

  function render(currentId) {
    if (!sidebar || !program) return;
    const day = dayFor(currentId);
    if (!day) {
      sidebar.innerHTML = "";
      return;
    }
    const win = windowedItems(day, currentId);
    const parts = [];
    parts.push(
      `<div class="program-sidebar__day">${escapeHtml(day.label)}</div>`
    );
    if (win.clippedBefore) {
      parts.push(`<div class="program-sidebar__more" aria-hidden="true">···</div>`);
    }
    for (const item of win.items) {
      const cls = itemClass(day, item, currentId);
      const current = item.id === currentId;
      parts.push(
        `<div class="${cls}" data-id="${escapeHtml(item.id)}" ${
          current ? 'aria-current="true"' : ""
        } title="${escapeHtml(item.title)}">` +
          `<span class="program-sidebar__marker" aria-hidden="true"></span>` +
          `<span class="program-sidebar__title">${escapeHtml(item.title)}</span>` +
          `</div>`
      );
    }
    if (win.clippedAfter) {
      parts.push(`<div class="program-sidebar__more" aria-hidden="true">···</div>`);
    }
    sidebar.innerHTML = parts.join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applyVisibility(state) {
    const show = !userHidden && !state.hide;
    document.body.classList.toggle("program-sidebar-visible", show);
    document.body.classList.toggle("program-sidebar-hidden", !show);
    if (frame) frame.hidden = !show;
    if (show) render(state.id);
  }

  function update() {
    if (!program) return;
    const slide =
      typeof Reveal !== "undefined" && Reveal.getCurrentSlide
        ? Reveal.getCurrentSlide()
        : document.querySelector(".reveal .slides section.present");
    applyVisibility(sessionState(slide));
  }

  function toggle() {
    userHidden = !userHidden;
    update();
  }

  function ensureDom() {
    frame = document.querySelector(".program-frame");
    if (!frame) {
      frame = document.createElement("div");
      frame.className = "program-frame";
      frame.setAttribute("aria-label", "Summit program");
      document.body.appendChild(frame);
    }
    sidebar = frame.querySelector(".program-sidebar");
    if (!sidebar) {
      sidebar = document.createElement("nav");
      sidebar.className = "program-sidebar";
      frame.appendChild(sidebar);
    }
  }

  async function load() {
    const res = await fetch("program.json");
    if (!res.ok) throw new Error("Failed to load program.json");
    program = await res.json();
    itemIndex = new Map();
    allItems();
  }

  function bind(reveal) {
    ensureDom();
    const start = () => update();
    if (reveal.isReady && reveal.isReady()) start();
    reveal.on("ready", start);
    reveal.on("slidechanged", start);
    reveal.addKeyBinding(
      { keyCode: 84, key: "T", description: "Toggle program overview" },
      toggle
    );
  }

  async function init() {
    ensureDom();
    try {
      await load();
    } catch (err) {
      console.warn(err);
      return;
    }
    const boot = () => bind(Reveal);
    if (typeof Reveal === "undefined") {
      window.addEventListener("load", boot);
    } else {
      boot();
    }
  }

  window.ProgramOverview = { init, update, toggle };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

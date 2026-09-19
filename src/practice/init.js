// @ts-nocheck
import { SCENES, ROUND_SIZE } from "./scenes.js";

export function initPractice() {
  const root = document.getElementById("practice-root");
  const live = document.getElementById("practice-live");
  if (!root) return function () {};

  const ac = new AbortController();
  let round = [];
  let i = 0;
  let picked = null;
  let correctCount = 0;
  const misses = [];
  let phase = "title";

  function shuffle(list) {
    const a = list.slice();
    for (let n = a.length - 1; n > 0; n--) {
      const j = Math.floor(Math.random() * (n + 1));
      const t = a[n];
      a[n] = a[j];
      a[j] = t;
    }
    return a;
  }

  function drawRound() {
    const shuffled = shuffle(SCENES);
    const out = [];
    const used = new Set();
    for (const s of shuffled) {
      if (!used.has(s.tag)) {
        out.push(s);
        used.add(s.tag);
      }
      if (out.length === ROUND_SIZE) return out;
    }
    for (const s of shuffled) {
      if (!out.includes(s)) out.push(s);
      if (out.length === ROUND_SIZE) return out;
    }
    return out;
  }

  function token(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("btc-theme", theme);
    } catch {}
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      const night = theme === "dark";
      btn.setAttribute("aria-pressed", String(night));
      btn.textContent = night ? "Paper" : "Night";
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", token("--theme-color", theme === "dark" ? "#121916" : "#f4f1e9"));
  }
  function initTheme() {
    let theme = "light";
    try {
      const stored = localStorage.getItem("btc-theme");
      if (stored === "dark" || stored === "light") theme = stored;
      else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) theme = "dark";
    } catch {}
    applyTheme(theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.onclick = () => applyTheme(currentTheme() === "dark" ? "light" : "dark");
  }

  function say(text) {
    if (live) live.textContent = text;
  }

  function start() {
    round = drawRound();
    i = 0;
    picked = null;
    correctCount = 0;
    misses.length = 0;
    phase = "play";
    render();
    say("Scene 1 of " + round.length);
  }

  function choose(id) {
    if (phase !== "play" || picked) return;
    const scene = round[i];
    picked = id;
    const ok = id === scene.correct;
    if (ok) correctCount += 1;
    else {
      const opt = scene.options.find((o) => o.id === id);
      misses.push({
        register: scene.register,
        scene: scene.scene,
        chosen: opt ? opt.label : id,
        miss: opt && opt.miss ? opt.miss : "",
        note: scene.note,
      });
    }
    render();
    say(ok ? "Named correctly." : "A miss that teaches.");
  }

  function next() {
    if (i < round.length - 1) {
      i += 1;
      picked = null;
      phase = "play";
      render();
      say("Scene " + (i + 1) + " of " + round.length);
      return;
    }
    phase = "done";
    render();
    say("Exercise complete. " + correctCount + " of " + round.length + " named correctly.");
  }

  function optionClass(scene, opt) {
    if (!picked) return "";
    if (opt.id === scene.correct) return " is-correct";
    if (opt.id === picked) return " is-miss";
    return " is-idle";
  }

  function renderTitle() {
    root.innerHTML = `
      <div class="practice-card">
        <p class="eyebrow">Ten of ${SCENES.length} · SN 12.2</p>
        <h1>Name the link.</h1>
        <p class="intro-lead">A short recognition exercise. Each round draws ten scenes from a bank of ${SCENES.length}. Misses teach. This is not a test of attainment, and it is not the Wheel of Life.</p>
        <p class="scope-line">The study page remains the open twelve-link reading. Here you only practice telling the factors apart, and noticing where an illustration stops.</p>
        <div class="start-row">
          <button class="primary" id="practice-begin" type="button">Begin ten scenes →</button>
          <a class="text-link" href="/">Return to the model</a>
        </div>
      </div>`;
    document.getElementById("practice-begin").onclick = start;
  }

  function renderPlay() {
    const scene = round[i];
    const revealed = !!picked;
    const chosen = scene.options.find((o) => o.id === picked);
    const ok = picked === scene.correct;
    const teach = revealed
      ? ok
        ? `<div class="practice-teach is-ok"><strong>Named correctly.</strong> ${scene.note}</div>`
        : `<div class="practice-teach"><strong>A miss that teaches.</strong> ${chosen && chosen.miss ? chosen.miss : ""} <span class="practice-note">${scene.note}</span></div>`
      : "";
    root.innerHTML = `
      <div class="practice-progress" aria-hidden="true"><span style="width:${((i + (revealed ? 1 : 0)) / round.length) * 100}%"></span></div>
      <p class="practice-kicker"><strong>${i + 1} of ${round.length}</strong> · ${scene.register}</p>
      <div class="practice-card">
        <p class="practice-scene">${scene.scene}</p>
        <h2>${scene.prompt}</h2>
        <div class="practice-options" role="group" aria-label="Choose one reading">
          ${scene.options
            .map(
              (opt, n) =>
                `<button type="button" class="practice-opt${optionClass(scene, opt)}" data-opt="${opt.id}" ${revealed ? "disabled" : ""}>
                  <span class="practice-key">${n + 1}</span>
                  <span>${opt.label}</span>
                </button>`
            )
            .join("")}
        </div>
        ${teach}
        ${revealed ? `<div class="start-row"><button class="primary" id="practice-next" type="button">${i === round.length - 1 ? "See the count →" : "Next scene →"}</button></div>` : ""}
      </div>`;
    root.querySelectorAll("[data-opt]").forEach((b) => {
      b.onclick = () => choose(b.getAttribute("data-opt"));
    });
    const nx = document.getElementById("practice-next");
    if (nx) nx.onclick = next;
  }

  function renderDone() {
    const missList = misses.length
      ? `<ol class="practice-misses">${misses
          .map(
            (m) =>
              `<li><strong>${m.register}</strong><p>${m.scene}</p><p>You chose: ${m.chosen}. ${m.miss}</p></li>`
          )
          .join("")}</ol>`
      : `<p class="scope-line">No misses this time. The next unpleasant feeling is still the real exercise.</p>`;
    root.innerHTML = `
      <div class="practice-card">
        <p class="eyebrow">A count of labels, not of insight</p>
        <h1>You named ${correctCount} of ${round.length} correctly.</h1>
        <p class="intro-lead">A score only records whether the words were told apart. Awareness of dependent arising happens in lived experience — not on this page.</p>
        <p class="scope-line">Another round will draw a different ten from the bank of ${SCENES.length}. This drill does not award liberation, rebirth, or a closed wheel.</p>
        ${missList}
        <div class="start-row">
          <a class="primary-link" href="/">Return to the twelve-link model →</a>
          <button class="text-link" id="practice-again" type="button">Draw ten more</button>
        </div>
      </div>`;
    document.getElementById("practice-again").onclick = start;
  }

  function render() {
    if (phase === "title") renderTitle();
    else if (phase === "done") renderDone();
    else renderPlay();
  }

  function onKey(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (phase === "title" && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      start();
      return;
    }
    if (phase === "play" && !picked && /^[1-3]$/.test(e.key)) {
      const scene = round[i];
      const opt = scene.options[Number(e.key) - 1];
      if (opt) {
        e.preventDefault();
        choose(opt.id);
      }
      return;
    }
    if (phase === "play" && picked && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      next();
    }
  }

  initTheme();
  render();
  document.addEventListener("keydown", onKey, { signal: ac.signal });

  return function cleanup() {
    ac.abort();
    root.replaceChildren();
  };
}

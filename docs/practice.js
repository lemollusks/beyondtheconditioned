const SCENES = [
  {
    id: "01",
    register: "Feeling · vedanā",
    scene: "A remark reaches the ear. Before any story about the speaker begins, there is an unpleasant tone.",
    prompt: "What is present here, as the discourses use these words?",
    options: [
      { id: "contact", label: "Contact", miss: "Contact is the meeting of a faculty, its object, and the corresponding consciousness. The unpleasant tone is already the next factor: feeling." },
      { id: "feeling", label: "Feeling" },
      { id: "craving", label: "Craving", miss: "Craving is the thirst that can follow. An awakened person can feel without craving. The tone itself is feeling." },
    ],
    correct: "feeling",
    note: "MN 148; Harvey, p. 71. Pleasant, unpleasant, or neutral tone is not yet the more complex emotion that may follow.",
  },
  {
    id: "02",
    register: "Contact · phassa",
    scene: "A sound, a functioning ear, and hearing-consciousness meet. That meeting is the event.",
    prompt: "Which link names this meeting?",
    options: [
      { id: "bases", label: "The six sense bases alone", miss: "The bases are the doors. Contact is the meeting of a door, an object, and the corresponding consciousness." },
      { id: "contact", label: "Contact" },
      { id: "feeling", label: "Feeling", miss: "Feeling is the tone of the meeting, not the meeting itself." },
    ],
    correct: "contact",
    note: "SN 12.2; MN 148. Contact includes hearing and thinking as well as physical touching.",
  },
  {
    id: "03",
    register: "Craving · taṇhā",
    scene: "A taste is pleasant. Then the thought arrives: “I need more of this.”",
    prompt: "The second moment is best named as:",
    options: [
      { id: "feeling", label: "Feeling", miss: "The pleasant tone was feeling. “I need more” is thirst in response, which the formula calls craving." },
      { id: "craving", label: "Craving" },
      { id: "clinging", label: "Clinging", miss: "Clinging is a more active holding-on. The immediate thirst is craving; clinging can follow." },
    ],
    correct: "craving",
    note: "Harvey, p. 66 and p. 71. The arrow from feeling to craving is not a command. Feeling need not compel craving.",
  },
  {
    id: "04",
    register: "Ignorance · avijjā",
    scene: "Someone does not understand suffering, its origin, its cessation, and the path leading to its cessation.",
    prompt: "In SN 12.2 this is:",
    options: [
      { id: "ignorance", label: "Ignorance, as the first item in this formula" },
      { id: "fact", label: "Ordinary missing information (the time of a train)", miss: "Not knowing a timetable is ordinary not-knowing. Here ignorance is not understanding the four truths that frame this teaching." },
      { id: "cause", label: "A first cause of the universe", miss: "Ignorance is the first item in this formula, not a first cause of the universe." },
    ],
    correct: "ignorance",
    note: "SN 12.2. The sequence specifies relationships rather than a timetable or a cosmic beginning.",
  },
  {
    id: "05",
    register: "Cessation reading",
    scene: "The same pleasant tone is known. The thirst “I need more” does not take hold. Seeing and hearing continue.",
    prompt: "This scene is meant to illustrate:",
    options: [
      { id: "shutdown", label: "Sensory shutdown", miss: "Cessation is not the ending of the senses. An awakened living person still experiences contact and feeling." },
      { id: "feeling-without", label: "Feeling without craving" },
      { id: "noself", label: "The destruction of a permanent self", miss: "Cessation concerns the ending of the conditions sustaining suffering, rather than the destruction of a self." },
    ],
    correct: "feeling-without",
    note: "Cessation view on this site follows the formula for the ending of sustaining conditions, not the absence of experience.",
  },
  {
    id: "06",
    register: "Birth · jāti",
    scene: "Someone says: “A new mood was born in me this afternoon.”",
    prompt: "On this site, how should that sentence be read?",
    options: [
      { id: "exact", label: "As the exact meaning of birth in SN 12.2", miss: "“Birth of an ego-state” can be an interpretive application. SN 12.2 has a broader account of the coming into existence of beings." },
      { id: "illustration", label: "As a limited psychological illustration" },
      { id: "unrelated", label: "As unrelated to the teaching", miss: "It can be a useful illustration of patterning. It still does not replace the canonical definition." },
    ],
    correct: "illustration",
    note: "Harvey, pp. 71–72; Gethin, pp. 150–153. Everyday analogy is not offered as proof of this link.",
  },
  {
    id: "07",
    register: "The open ring",
    scene: "Aging-and-death has been named. A circular painting suggests the next arrow should return to ignorance.",
    prompt: "Does the standard formula in SN 12.2 add that arrow?",
    options: [
      { id: "yes", label: "Yes — death causes ignorance, or the wheel would not turn", miss: "Circular artwork can suggest a closed loop. Harvey warns against inferring a death-to-ignorance arrow from that picture. The formula does not add it." },
      { id: "no", label: "No. The ring is intentionally open." },
      { id: "yama", label: "Yes, because Yama holds the Wheel of Life", miss: "The illustrated Wheel of Life is a later pictorial tradition. This study follows SN 12.2’s open sequence." },
    ],
    correct: "no",
    note: "Harvey, p. 72. The opening preserves that distinction; ignorance remains conditioned, without a first beginning marked here.",
  },
  {
    id: "08",
    register: "Name-and-form · nāma-rūpa",
    scene: "The formula reaches name-and-form.",
    prompt: "Here the compound refers to:",
    options: [
      { id: "label", label: "An object’s label and its appearance", miss: "That reading belongs to other uses of “name and form.” Here it refers to mental factors and physical form — the embodied complex involved in experience." },
      { id: "nama-rupa", label: "Mental factors and physical form" },
      { id: "soul", label: "A hidden owner behind experience", miss: "The inquiry proceeds through conditions, without positing an unchanging owner. See SN 12.12." },
    ],
    correct: "nama-rupa",
    note: "SN 12.2 lists feeling, perception, intention, contact, and attention under name. Parallel texts classify name differently; the source must be named.",
  },
  {
    id: "09",
    register: "Clinging · upādāna",
    scene: "A practice is treated as sufficient by itself for liberation.",
    prompt: "Which concern in the formula does this touch?",
    options: [
      { id: "clinging", label: "Clinging — including rules and observances" },
      { id: "worthless", label: "Ethical practice is therefore worthless", miss: "The concern includes treating practices as sufficient for liberation. Ethical practice itself remains valuable." },
      { id: "craving", label: "Craving for a pleasant taste", miss: "That would be thirst at feeling. This scene is about grasping a practice or view as enough." },
    ],
    correct: "clinging",
    note: "SN 12.2: clinging at sensual pleasures, views, rules and observances, or doctrines of self.",
  },
  {
    id: "10",
    register: "The stated relationship",
    scene: "The model draws an arrow from one link to the next.",
    prompt: "Read each arrow as:",
    options: [
      { id: "cause", label: "A single sufficient cause, on a fixed timetable", miss: "Several conditions may contribute. The spacing is not a measure of time. The sequence specifies relationships." },
      { id: "condition", label: "“With this as a condition…”" },
      { id: "identity", label: "The same self traveling from station to station", miss: "The inquiry is through conditions. It does not establish an unchanging self that owns the process." },
    ],
    correct: "condition",
    note: "Bodhi discusses variants of conditionality, including mutual support. Neighbor highlighting on the study page is a reading aid, not every condition involved.",
  },
];

function initPractice() {
  const root = document.getElementById("practice-root");
  const live = document.getElementById("practice-live");
  if (!root) return function () {};

  const ac = new AbortController();
  let i = 0;
  let picked = null;
  let correctCount = 0;
  const misses = [];
  let phase = "title";

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
    i = 0;
    picked = null;
    correctCount = 0;
    misses.length = 0;
    phase = "play";
    render();
    say("Scene 1 of " + SCENES.length);
  }

  function choose(id) {
    if (phase !== "play" || picked) return;
    const scene = SCENES[i];
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
    if (i < SCENES.length - 1) {
      i += 1;
      picked = null;
      phase = "play";
      render();
      say("Scene " + (i + 1) + " of " + SCENES.length);
      return;
    }
    phase = "done";
    render();
    say("Exercise complete. " + correctCount + " of " + SCENES.length + " named correctly.");
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
        <p class="eyebrow">Ten scenes · SN 12.2</p>
        <h1>Name the link.</h1>
        <p class="intro-lead">A short recognition exercise. Misses teach. This is not a test of attainment, and it is not the Wheel of Life.</p>
        <p class="scope-line">The study page remains the open twelve-link reading. Here you only practice telling the factors apart, and noticing where an illustration stops.</p>
        <div class="start-row">
          <button class="primary" id="practice-begin" type="button">Begin the ten scenes →</button>
          <a class="text-link" href="/">Return to the model</a>
        </div>
      </div>`;
    document.getElementById("practice-begin").onclick = start;
  }

  function renderPlay() {
    const scene = SCENES[i];
    const revealed = !!picked;
    const chosen = scene.options.find((o) => o.id === picked);
    const ok = picked === scene.correct;
    const teach = revealed
      ? ok
        ? `<div class="practice-teach is-ok"><strong>Named correctly.</strong> ${scene.note}</div>`
        : `<div class="practice-teach"><strong>A miss that teaches.</strong> ${chosen && chosen.miss ? chosen.miss : ""} <span class="practice-note">${scene.note}</span></div>`
      : "";
    root.innerHTML = `
      <div class="practice-progress" aria-hidden="true"><span style="width:${((i + (revealed ? 1 : 0)) / SCENES.length) * 100}%"></span></div>
      <p class="practice-kicker"><strong>${i + 1} of ${SCENES.length}</strong> · ${scene.register}</p>
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
        ${revealed ? `<div class="start-row"><button class="primary" id="practice-next" type="button">${i === SCENES.length - 1 ? "See the count →" : "Next scene →"}</button></div>` : ""}
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
        <h1>You named ${correctCount} of ${SCENES.length} correctly.</h1>
        <p class="intro-lead">A score only records whether the words were told apart. Awareness of dependent arising happens in lived experience — not on this page.</p>
        <p class="scope-line">This drill does not award liberation, rebirth, or a closed wheel. Return to the open sequence when you want the sources.</p>
        ${missList}
        <div class="start-row">
          <a class="primary-link" href="/">Return to the twelve-link model →</a>
          <button class="text-link" id="practice-again" type="button">Try the ten scenes again</button>
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
      const scene = SCENES[i];
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

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initPractice);
else initPractice();

function initEightfold() {
  const root = document.documentElement;
  root.dataset.room = "path";
  const ac = new AbortController();

  function token(name, fallback) {
    const v = getComputedStyle(root).getPropertyValue(name).trim();
    return v || fallback;
  }
  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
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
    if (meta) meta.setAttribute("content", token("--theme-color", theme === "dark" ? "#121916" : "#e7efe9"));
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

  const factors = [...document.querySelectorAll(".path-factor")];
  const panels = [...document.querySelectorAll("#path-main details")];
  const tools = document.getElementById("path-tools");
  if (tools) tools.hidden = false;
  const expand = document.getElementById("path-expand");
  const collapse = document.getElementById("path-collapse");
  const printBtn = document.getElementById("path-print");
  if (expand) expand.onclick = () => factors.forEach((p) => { p.open = true; });
  if (collapse) collapse.onclick = () => factors.forEach((p) => { p.open = false; });
  if (printBtn) printBtn.onclick = () => window.print();

  function followHash() {
    const id = location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (target && target.matches("details")) target.open = true;
  }
  window.addEventListener("hashchange", followHash, { signal: ac.signal });
  followHash();

  let previous = [];
  window.addEventListener(
    "beforeprint",
    () => {
      previous = panels.map((p) => p.open);
      panels.forEach((p) => { p.open = true; });
    },
    { signal: ac.signal }
  );
  window.addEventListener(
    "afterprint",
    () => {
      panels.forEach((p, i) => { p.open = previous[i]; });
    },
    { signal: ac.signal }
  );

  initTheme();
  return function cleanup() {
    ac.abort();
    if (root.dataset.room === "path") delete root.dataset.room;
  };
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initEightfold);
else initEightfold();

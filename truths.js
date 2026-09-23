function initTruths() {
  const root = document.documentElement;
  root.dataset.room = "truths";
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
    if (meta) meta.setAttribute("content", token("--theme-color", theme === "dark" ? "#121916" : "#f3ead6"));
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

  const panels = [...document.querySelectorAll("#truths-main details")];
  let previous = [];
  window.addEventListener(
    "beforeprint",
    () => {
      previous = panels.map((p) => p.open);
      panels.forEach((p) => {
        p.open = true;
      });
    },
    { signal: ac.signal }
  );
  window.addEventListener(
    "afterprint",
    () => {
      panels.forEach((p, i) => {
        p.open = previous[i];
      });
    },
    { signal: ac.signal }
  );

  initTheme();
  return function cleanup() {
    ac.abort();
    if (root.dataset.room === "truths") delete root.dataset.room;
  };
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initTruths);
else initTruths();

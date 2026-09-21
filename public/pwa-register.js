(function () {
  if (!("serviceWorker" in navigator)) return;
  var host = location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return;
  if (/\.grok\.me$|\.grok\.com$/.test(host)) return;
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").catch(function () {});
  });
})();

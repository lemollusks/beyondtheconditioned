import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SITE_NAME, SITE_URL, SHARE_TITLE, SHARE_DESCRIPTION } from "@/lib/site";
import appCss from "../styles.css?url";

const APP_NAME = SITE_NAME;
const DESCRIPTION = SHARE_DESCRIPTION;

const THEME_BOOT =
  "(function(){try{var s=localStorage.getItem('btc-theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SHARE_TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#f4f1e9" },
      { name: "color-scheme", content: "light dark" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
    ],
    scripts: [{ children: THEME_BOOT }],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

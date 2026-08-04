import { headers } from "next/headers";

export async function ThemeScript() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const code = `(() => {
  try {
    const stored = localStorage.getItem("tesoluciona-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  } catch {}
})();`;

  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: code }} />;
}

// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import process from "node:process";

const isNetlify = Boolean(process.env.NETLIFY);
const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS) && !isNetlify;
const [owner, repository] = (process.env.GITHUB_REPOSITORY || "").split("/");
const githubSite = owner ? `https://${owner}.github.io` : undefined;
const site = process.env.SITE_URL || (isNetlify ? process.env.URL : isGitHubPages ? githubSite : undefined);
const base = process.env.BASE_PATH || (
  isGitHubPages && repository && repository !== `${owner}.github.io` ? `/${repository}/` : "/"
);
export default defineConfig({
  site,
  base,
  devToolbar: { enabled: false },
  server: { host: "127.0.0.1", port: 4321 },
  vite: { plugins: [tailwindcss()] },
});

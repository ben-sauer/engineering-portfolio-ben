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
  site: 'https://ben-sauer.github.io',
  base: '/engineering-portfolio-ben',
  vite: { plugins: [tailwindcss()] },
});

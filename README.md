# Benjamin Sauer — Engineering Portfolio

An Astro + Tailwind portfolio adapted from the Retro TUI Portfolio template. The visual portfolio opens by default; the optional terminal explores the same project content. No backend or external contact-form service is needed.

## Local development

Use the existing supported Node.js installation and npm:

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm.ps1`. The dev server defaults to http://127.0.0.1:4321.

## Where to edit

| Content | File |
| --- | --- |
| Bio, email, skills, experience, STEM Bridges | `src/data/portfolio.ts` |
| Project text, dates, roles, tools, galleries, downloads | `src/content/projects/*.md` |
| Homepage structure | `src/components/GUIView.astro` |
| Shared project layout | `src/layouts/ProjectLayout.astro` |
| Project content schema | `src/content.config.ts` |
| Portfolio styling | `src/styles/global.css` (portfolio section) |
| Theme palettes | `src/config/themeConfig.ts` |
| Resume PDF | `public/documents/benjamin-sauer-resume.pdf` |
| Web images, documents, video | `public/images/`, `public/documents/`, `public/media/` |

Original materials stay in `reference-materials/`, which is ignored by Git and is not published. Only deliberately selected files copied into `public/` are included in the website. Images there are smaller web copies; the two rail PNG plots are unchanged copies.

## Add a project

1. Copy `docs/project-template.md` into `src/content/projects/your-project-slug.md`.
2. Fill in the frontmatter and Markdown body. The filename becomes `/projects/your-project-slug/`.
3. Add web assets to `public/images/projects/your-project-slug/`.
4. Use paths relative to `public/` in frontmatter, for example `images/projects/your-project-slug/photo.webp`. Do not include `public/` or a leading slash.
5. Set `draft: false` to generate a page. Set `featured: true` to show its card on the homepage. Set `order` to control its position.
6. Run `npm run check` and `npm run build`.

Do not add an unqualified performance claim or assign team work to yourself. Distinguish measured results, qualitative observations, simulation results, and future plans.

Project sections are ordinary Markdown headings, paragraphs, lists, tables, or code blocks. Level-two headings automatically populate the project navigation. Optional galleries and resource lists are generated from frontmatter. Omit them when not needed.

### Images, video, and calculations

Each `media` item has `src`, `alt`, and `caption`. Images open at full size when clicked. Add `type: video` for a video with native controls, plus optional `poster` and `mime` fields. Prefer a browser-compatible MP4/WebM and provide captions/transcripts as appropriate. The supplied MOV currently appears as a downloadable original rather than an embedded player.

Use Markdown tables and code blocks for calculations, or an HTML block with `class="equation-block"` for a short displayed equation. There is no equation-rendering dependency. Interactive CAD/3D viewing is deferred until model files are supplied.

### Resume and contact

The public email is `bsauer@g.hmc.edu`. Replace the PDF at the same path to update the resume. The PDF is the supplied original, so its existing phone number remains in the downloadable document.

### Theme and optional features

The default is Monochrome, with JetBrains Mono and Share Tech Mono typography. A small terminal palette appears in the profile panel. Existing template themes remain available; the choice persists when browser storage is available. Content is visible without JavaScript. Terminal commands include `help`, `about`, `projects`, `skills`, `resume`, `contact`, `theme`, `gui`, and `clear`.

The optional terminal restores the original welcome/prompt style, output panels, file aliases (`cat bio.txt`, `ls`), profile summary (`neofetch`), command history, and autocomplete. It reads your current profile, experience, leadership, and project content. Its styling lives in `src/styles/terminal.css`.

Pong, Snake, and Matrix rain are available through terminal commands; games and effects stay inactive until requested. `sfx` enables sound for the current session and `crt` toggles subtle scanlines in the terminal. The visual portfolio remains the default view. Radio, music/presence widgets, and the mobile notice remain unmounted.

## Hosting paths

No deployment has been performed. For a custom domain set `SITE_URL` to the complete origin; set `BASE_PATH` when hosting under a subdirectory. GitHub Actions derives the Pages origin and repository path from `GITHUB_REPOSITORY`. Netlify uses its supplied `URL` variable. The existing GitHub Pages workflow deploys when changes are pushed to `main`; review hosting settings before pushing.

Internal frontmatter asset paths and navigation use `src/utils/paths.ts` so they work under the configured base. For assets inserted directly into Markdown prose, use a relative path from the resulting project page or a base-aware component if the site is hosted under a subdirectory.

## Credits and license

Based on [Retro TUI Portfolio](https://github.com/nivinvysakh/astro-tui-portfolio) by Nivinvysakh. Original template distributed under the [MIT License](LICENSE.MD). Original license files are retained.

Big thank you to Nivinvysakh for writing this template. All credit goes to them.

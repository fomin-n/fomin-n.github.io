# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build to ./dist
npm run preview  # serve the built dist locally
npm run check    # type-check with astro check
```

Deploy is triggered automatically on push to `main`. To deploy manually:
```bash
gh workflow run deploy.yml --repo fomin-n/fomin-n.github.io --ref main
```

## Architecture

**Astro 6** static site — all pages are pre-rendered to HTML at build time. Requires Node ≥ 22.

### Content

Articles live in `src/content/articles/*.md`. The collection schema is defined in `src/content.config.ts` using Astro's glob loader. Required frontmatter fields: `title`, `description`, `date`. Optional: `author` (defaults to "Nikita Fomin"), `tags`, `source`.

The article slug/URL is derived from the filename: `ai-contact-game.md` → `/articles/ai-contact-game`.

### Routing

- `/` → `src/pages/index.astro` — lists all articles sorted by date, plus GitHub/LinkedIn links
- `/articles/[id]` → `src/pages/articles/[id].astro` — dynamic route; calls `getStaticPaths()` via `getCollection('articles')` and `render()` from `astro:content`

### Layouts

- `BaseLayout.astro` — HTML shell, sticky nav (logo + theme toggle), footer. Applies the theme from `localStorage` before paint via an inline `<script is:inline>` to prevent flash.
- `ArticleLayout.astro` — wraps `BaseLayout`, adds back-link, article header (title, date, author, reading time), and `.prose` container for the rendered markdown.

### Styling

All styles are in `src/styles/global.css`, imported via `<style is:global>` in `BaseLayout`. Uses CSS custom properties (`--bg`, `--text`, `--accent`, etc.) on `:root` for light theme and `[data-theme="dark"]` for dark. No CSS framework — all styles are hand-written.

Reading time is computed inline in `.astro` files from `article.body` at ~200 wpm.

### Static assets

Images and gifs go in `public/images/` and are referenced in markdown as `/images/filename.ext`.

## Adding an article

Create `src/content/articles/<slug>.md`. The filename becomes the URL (`my-post.md` → `/articles/my-post`).

Required frontmatter:

| Field | Notes |
|---|---|
| `title` | Article title |
| `description` | One-sentence summary shown in listings |
| `date` | `YYYY-MM-DD` |
| `author` | Optional, defaults to "Nikita Fomin" |
| `tags` | Optional array of lowercase strings |
| `source` | Optional original URL |

## First-time GitHub Pages setup

In the repo **Settings → Pages**, set **Source** to **GitHub Actions**. Subsequent pushes to `main` deploy automatically.

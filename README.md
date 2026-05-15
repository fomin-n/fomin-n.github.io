# fomin-n.github.io

Personal technical blog — [fomin-n.github.io](https://fomin-n.github.io)

Built with [Astro](https://astro.build). Articles are written in Markdown.

## Install & run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Add a new article

1. Create a new Markdown file in `src/content/articles/`:

```bash
touch src/content/articles/my-new-post.md
```

2. Add frontmatter at the top:

```markdown
---
title: "Your Article Title"
description: "A one-sentence summary shown in listings."
date: 2026-06-01
author: "Nikita Fomin"
tags: ["tag1", "tag2"]
---

Your article body here...
```

3. The article will appear at `/articles/my-new-post` and in the listings automatically.

**Frontmatter fields:**

| Field | Required | Description |
|---|---|---|
| `title` | ✓ | Article title |
| `description` | ✓ | Short summary for listings |
| `date` | ✓ | Publication date (`YYYY-MM-DD`) |
| `author` | — | Defaults to "Nikita Fomin" |
| `tags` | — | Array of lowercase tag strings |
| `source` | — | Original source URL (e.g. LinkedIn) |

## Build for production

```bash
npm run build
```

Output goes to `./dist/`.

## Deploy

The site deploys automatically on push to `main` via GitHub Actions.

**First-time GitHub Pages setup:**

1. Go to the repository **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main` — the workflow will build and deploy

## Project structure

```
src/
├── content/
│   └── articles/        # Markdown article files
├── layouts/
│   ├── BaseLayout.astro # Shared HTML shell, nav, footer
│   └── ArticleLayout.astro
├── pages/
│   ├── index.astro      # Home page
│   └── articles/
│       ├── index.astro  # Article listing
│       └── [id].astro   # Dynamic article route
└── styles/
    └── global.css       # All styles + theme variables
```

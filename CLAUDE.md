# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run lint     # Next.js ESLint
```

No test suite configured.

## Architecture

**Stack:** Next.js 14 (App Router) + TypeScript + SCSS Modules + Once UI design system + MDX

### Content system (the main thing to understand)

All site content lives in two files:

- [`src/app/resources/config.js`](src/app/resources/config.js) — visual theme (`style`), background `effects`, route toggles (`routes`), `baseURL`, password-protected routes
- [`src/app/resources/content.js`](src/app/resources/content.js) — every text string, person info, social links, skills, gallery images

Pages read from these files to render conditionally — setting `display: false` on a section hides it without deleting content.

### Adding content

- **Blog post:** add `.mdx` to `src/app/blog/posts/`
- **Work project:** add `.mdx` to `src/app/work/projects/`
- MDX frontmatter drives the card previews and metadata (title, publishedAt, summary, images, tag)

### Component layers

1. **`src/once-ui/`** — base design system (tokens, ~50 primitive components). Treat as read-only third-party; avoid modifying.
2. **`src/components/`** — portfolio-specific components (Header, Footer, ProjectCard, blog/Posts, work/Projects, gallery/MasonryGrid). Each has a paired `.module.scss`.
3. **`src/app/`** — Next.js App Router pages + API routes for password auth (`/pages/api/authenticate.ts`, `/pages/api/check-auth.ts`)

### Styling

- Once UI tokens defined in `src/once-ui/tokens/` (SCSS vars). Theme/color controlled via `style` object in `config.js` using Once UI's data-attribute system — change colors there, not in CSS.
- Component-level styles use CSS Modules (`.module.scss`).
- Global styles entry: `src/once-ui/styles/index.scss`.

### OG images

Auto-generated via `src/app/og/route.tsx` using `@vercel/og`. No manual image needed for blog/work pages.

### Jupyter notebooks

Notebooks are served as static HTML from `public/notebooks/` — **not** via nbviewer.org. The `notebook_link` frontmatter in each project MDX points to `/notebooks/<filename>.html`.

**Updating a notebook after pushing changes to GitHub requires a manual conversion step:**

```bash
# Download the updated notebook from GitHub (raw URL)
curl -fsSL "https://raw.githubusercontent.com/XanBauer/<repo>/<branch>/<notebook>.ipynb" -o notebook.ipynb

# Convert to HTML
python3 -m nbconvert --to html notebook.ipynb --output <filename>

# Move into place
mv <filename>.html magic-portfolio/public/notebooks/<filename>.html
```

Then commit `public/notebooks/<filename>.html`. The site will immediately reflect the updated notebook — no other changes needed.

## Maintenance

### Notebook updates (as needed)

Whenever a notebook is updated on GitHub, the static HTML must be regenerated — pushing the `.ipynb` to GitHub alone does **not** update the site.

Current notebooks and their source repos:

| File | GitHub repo | Branch/commit |
|---|---|---|
| `public/notebooks/fandango-ratings.html` | `XanBauer/Fandango-Ratings` | `main` |
| `public/notebooks/predicting-car-prices.html` | `XanBauer/Predicting-Car-Prices` | `main` |
| `public/notebooks/predicting-heart-disease.html` | `XanBauer/predicting_heart_disease` | `d6fbf2d` |

```bash
# Example: update fandango notebook
curl -fsSL "https://raw.githubusercontent.com/XanBauer/Fandango-Ratings/main/Investigating_Fandango_Movie_Ratings.ipynb" -o notebook.ipynb
python3 -m nbconvert --to html notebook.ipynb --output fandango-ratings
mv fandango-ratings.html public/notebooks/fandango-ratings.html
git add public/notebooks/fandango-ratings.html
git commit -m "update: regenerate fandango notebook HTML"
```

### Deploying to production

Vercel is connected to this GitHub repo and auto-deploys on every push to `main`. No manual steps needed — pushing a commit is the deploy.

To verify a deploy went through: go to vercel.com/dashboard → select the project → confirm the latest commit shows status "Ready".

### Upstream sync (monthly or when once-ui releases updates)

This repo is forked from `once-ui-system/magic-portfolio`. To pull in upstream improvements:

```bash
git fetch upstream
git merge upstream/main
```

Review conflicts carefully — upstream changes are usually in `src/once-ui/` (safe to accept) or `package.json`/`package-lock.json` (review before accepting). Changes to `src/app/layout.tsx` may conflict with the local-fonts setup — keep the `next/font/local` version, not the `next/font/google` version from upstream.

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

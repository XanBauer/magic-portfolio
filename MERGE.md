# Upstream Merge Runbook

Upstream repo: `once-ui-system/magic-portfolio`

```bash
git fetch upstream
git merge upstream/main
bash scripts/merge-upstream.sh   # handles all predictable conflicts
# then resolve the manual files below
npm run build                    # verify before committing
```

---

## Architecture

Personal data lives in `src/resources/my-data.tsx` — upstream never touches it. `content.tsx` imports from there and can be taken wholesale from upstream in future merges (no content conflicts expected). Custom fields not in upstream's types (`moreAboutMe`, `moreSkills`) are exported as `aboutExtras` and imported directly by `about/page.tsx`.

---

## Manual Review Files

### `src/app/layout.tsx`
**Rule:** Keep `next/font/local`. Never revert to Google fonts (Geist).
- Upstream changes: `Providers` wrapper, `RevealFx` + `Background`, theme init `<script>`, `SpeedInsights`/`Analytics` — all worth keeping.
- Keep: `localFont` for Inter.ttf and SourceCodePro.woff2, then feed them into `fonts.heading/body/label/code`.
- Update `once-ui.config.ts` fonts section to use `next/font/local` instead of Geist.
- **Why:** Google font compilation hangs the dev server for 2+ minutes.

---

### `src/components/Header.tsx`
**Rule:** Take upstream imports; keep our logo/nav logic.
- Upstream adds: `ThemeToggle` component, imports from `@/resources` (not `@/app/resources`).
- Watch for: `styles` from a new `.module.scss` — include if upstream adds it.

---

### `src/components/ProjectCard.tsx`
**Rule:** Keep our overlay SmartLink div; adopt upstream's Carousel API.
- Upstream changed Carousel prop from `images=[{src, alt}]` → `items=[{slide, alt}]`.
- Keep: the `<div style={{ position: "relative" }}>` + `<SmartLink>` overlay that makes the entire image clickable.
- Change: `images={images.map(i => ({ src: i, alt: title }))}` → `items={images.map(i => ({ slide: i, alt: title }))}`.

---

### `src/components/work/Projects.tsx`
**Rule:** Keep our `<div>` wrapper with hidden server-rendered link fallback.
- Upstream re-adds `priority={index < 2}` — this prop doesn't exist on `ProjectCardProps`, will cause TS error. Do not include it.
- Keep: the `<a href={...} style={{ display: "none" }}>` fallback inside the div wrapper.

---

### `src/app/page.tsx`
**Rule:** Take upstream layout; remove their featured/Mailchimp demo content.
- Upstream added: `<Projects range={[2]} />` and `<Mailchimp />` at the bottom — take both (Projects yes, Mailchimp is pre-configured to not display).
- Check that our `home.headline` and `home.subline` from `my-data.tsx` render correctly.

---

### `src/app/blog/page.tsx`
**Rule:** Keep `thumbnail` prop on all `<Posts>` calls.
- Upstream restructured: featured post at top + "Earlier posts" heading.
- All `<Posts ... />` calls need `thumbnail` to show images — add it back to any call that's missing it.
- The 4th blog post ("The Start of it All") sorts into the last group — ensure its Posts call has `thumbnail`.

---

### `src/app/about/page.tsx`
**Rule:** Take upstream layout improvements; keep our custom collapsible sections.

Import changes needed:
```tsx
// Change from:
import { ... } from "@/once-ui/components";
import { person, about, social } from "@/app/resources/content";

// Change to:
import { ... } from "@once-ui-system/core";
import { about, person, social, aboutExtras } from "@/resources";
```

Then replace these two access patterns:
```tsx
// OLD (no longer valid — moreAboutMe is not on the About type):
about.intro.moreAboutMe
about.technical.moreSkills

// NEW:
aboutExtras.moreAboutMe
aboutExtras.moreSkills
```

Upstream removed the `Flex` component — use `Row` instead. Take upstream's sticky avatar layout and social links in the profile section (better than ours). Keep the `[showMoreAboutMe, setShowMoreAboutMe]` and `[showMoreSkills, setShowMoreSkills]` useState logic plus the collapsible UI below the intro and skills sections.

---

### `src/app/work/[slug]/page.tsx`
**Rule:** Take upstream's slug handling and Schema; keep our notebook embed + GitHub button.

Adopt from upstream:
- Array slug support: `const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug || ""`
- `Meta.generate()` for `generateMetadata`
- `<Schema as="blogPosting" ... />` component
- `<SmartLink href="/work">Projects</SmartLink>` back-link style

Keep from ours:
- Notebook `<iframe>` embed block (after MDX content)
- GitHub button (`post.metadata.project_github`)
- `SmartImage` for the cover image

Remove from upstream (not applicable):
- Team `<AvatarGroup>` and `{post.metadata.team?.map(...)}` — our projects don't have teams
- "Related projects" section at the bottom (`<Projects exclude={[post.slug]} ... />`) — optional, can add later

---

## Fonts Fix (once-ui.config.ts)

Upstream resets fonts to Geist (Google). Replace after merge:

```ts
// REMOVE these lines from once-ui.config.ts:
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
const heading = Geist({ ... });
const body = Geist({ ... });
const label = Geist({ ... });
const code = Geist_Mono({ ... });

// REPLACE WITH:
import localFont from "next/font/local";
const heading = localFont({ src: "../../public/fonts/Inter.ttf", variable: "--font-heading", display: "swap" });
const body    = localFont({ src: "../../public/fonts/Inter.ttf", variable: "--font-body",    display: "swap" });
const label   = localFont({ src: "../../public/fonts/Inter.ttf", variable: "--font-label",   display: "swap" });
const code    = localFont({ src: "../../public/fonts/SourceCodePro.woff2", variable: "--font-code", display: "swap" });
```

---

## After All Conflicts Resolved

```bash
npm run build   # must pass with 0 errors before committing
git add -A
git commit -m "merge: upstream/main — adopt @once-ui-system/core npm package"
git push origin main
```

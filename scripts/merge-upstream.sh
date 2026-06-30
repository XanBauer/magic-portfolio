#!/usr/bin/env bash
# Run this AFTER: git fetch upstream && git merge upstream/main
# Handles all the predictable, non-decision conflicts automatically.
# Anything still conflicted after this script needs a manual review — see MERGE.md.

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log()  { echo -e "${GREEN}  ✓ $1${NC}"; }
warn() { echo -e "${YELLOW}  ! $1${NC}"; }
err()  { echo -e "${RED}  ✗ $1${NC}"; }

echo ""
echo "=== merge-upstream.sh: Auto-resolving predictable conflicts ==="
echo ""

# Check we're actually in a merge state
if ! git status | grep -q "You have unmerged paths\|All conflicts fixed but you are still merging"; then
  err "No merge in progress. Run: git fetch upstream && git merge upstream/main"
  exit 1
fi

# ── 1. Take upstream wholesale ────────────────────────────────────────────────
# These files are owned by upstream and we never customize them.
echo "Step 1: Taking upstream versions..."

FILES_TAKE_THEIRS=(
  "package.json"
  "package-lock.json"
  "src/components/Mailchimp.tsx"
  "src/components/RouteGuard.tsx"
)

for f in "${FILES_TAKE_THEIRS[@]}"; do
  if [ -f "$f" ] && grep -qF "<<<<<<<" "$f" 2>/dev/null; then
    git checkout --theirs -- "$f"
    git add "$f"
    log "Took upstream: $f"
  elif [ -f "$f" ]; then
    warn "No conflict in $f (already clean)"
  else
    warn "File not found: $f"
  fi
done

# ── 2. Keep our versions ──────────────────────────────────────────────────────
# These files we always own.
echo ""
echo "Step 2: Keeping our versions..."

FILES_TAKE_OURS=(
  "public/images/avatar.jpg"
)

for f in "${FILES_TAKE_OURS[@]}"; do
  if git ls-files -u "$f" | grep -q .; then
    git checkout --ours -- "$f"
    git add "$f"
    log "Kept ours: $f"
  else
    warn "No conflict in $f (already clean)"
  fi
done

# ── 3. Delete upstream's template demo content ────────────────────────────────
# Upstream resets these to their demo content — delete them every merge.
echo ""
echo "Step 3: Removing upstream template demo content..."

DEMO_FILES=(
  "src/app/work/projects/automate-design-handovers-with-a-figma-to-code-pipeline.mdx"
  "src/app/work/projects/building-once-ui-a-customizable-design-system.mdx"
  "src/app/work/projects/simple-portfolio-builder.mdx"
  "src/app/blog/posts/blog.mdx"
  "src/app/blog/posts/components.mdx"
  "src/app/blog/posts/content.mdx"
  "src/app/blog/posts/localization.mdx"
  "src/app/blog/posts/mailchimp.mdx"
  "src/app/blog/posts/pages.mdx"
  "src/app/blog/posts/password.mdx"
  "src/app/blog/posts/quick-start.mdx"
  "src/app/blog/posts/seo.mdx"
  "src/app/blog/posts/styling.mdx"
  "src/app/blog/posts/work.mdx"
)

for f in "${DEMO_FILES[@]}"; do
  if [ -f "$f" ]; then
    git rm -f "$f" 2>/dev/null || rm -f "$f"
    log "Removed: $f"
  else
    warn "Already gone: $f"
  fi
done

# ── 4. Patch once-ui.config.ts ───────────────────────────────────────────────
# Take upstream wholesale first (avoids conflict markers), then apply our patches.
echo ""
echo "Step 4: Patching src/resources/once-ui.config.ts..."

CONFIG="src/resources/once-ui.config.ts"
if [ -f "$CONFIG" ]; then
  # Take upstream's version as base so there are no conflict markers to trip up sed
  git checkout --theirs -- "$CONFIG"

  # Fix baseURL
  sed -i '' 's|https://demo.magic-portfolio.com|xanbauer.com|g' "$CONFIG"
  log "Fixed baseURL → xanbauer.com"

  # Remove their protected demo route (we have no protected routes)
  sed -i '' '/automate-design-handovers/d' "$CONFIG"

  # Disable gallery (we don't use it)
  sed -i '' 's|"/gallery": true|"/gallery": false|g' "$CONFIG"
  log "Disabled gallery route"

  # Re-enable cursor spotlight effect (upstream resets to false)
  sed -i '' 's/cursor: false/cursor: true/' "$CONFIG"
  log "Re-enabled cursor spotlight effect"

  # Restore our style choices (upstream resets these to their demo defaults)
  sed -i '' 's/theme: "system"/theme: "dark"/' "$CONFIG"
  sed -i '' 's/neutral: "gray"/neutral: "slate"/' "$CONFIG"
  sed -i '' 's/brand: "cyan"/brand: "moss"/' "$CONFIG"
  sed -i '' 's/solidStyle: "flat"/solidStyle: "plastic"/' "$CONFIG"
  sed -i '' 's/border: "playful"/border: "rounded"/' "$CONFIG"
  log "Restored style: dark theme, slate/moss/red, plastic, rounded"

  git add "$CONFIG"
else
  warn "$CONFIG not found"
fi

# ── 5. Summary ────────────────────────────────────────────────────────────────
echo ""
echo "=== Auto-resolution complete ==="
echo ""
echo "Files still needing manual review (see MERGE.md for each):"
echo "  src/app/layout.tsx              — keep next/font/local, not Geist"
echo "  src/components/Header.tsx       — import path update + ThemeToggle"
echo "  src/components/ProjectCard.tsx  — Carousel API: images → items"
echo "  src/components/work/Projects.tsx — keep our div wrapper"
echo "  src/app/page.tsx                — home page layout"
echo "  src/app/blog/page.tsx           — keep thumbnail on all posts"
echo "  src/app/about/page.tsx          — keep moreAboutMe/moreSkills via aboutExtras"
echo "  src/app/work/[slug]/page.tsx    — keep notebook embed, skills split, prev/next nav"
echo "  src/components/mdx.tsx          — keep extractText() helper + slugify(extractText(children))"
echo ""
echo "content.tsx is pre-resolved (imports from my-data.tsx — no conflict expected)."
echo ""
echo "After manual fixes: npm run build"

# TODO_HERO.md

## Plan for Hero Section Revisions

### 1) Update `index.html` hero markup (only inside `.hero-wrap`)
- Replace existing hero content to match the requested spec:
  - Remove `.skills` pill row (3 pills).
  - Remove the long tagline sentence.
  - Reduce the heading size for the large `ALEXA BUENO`.
  - Add `Choose Your.png` image overlapping the heading (upper-left).
  - Replace CTA text to `Scroll Down to View More` while preserving existing arrow icon / functionality.
  - Add new tagline text below heading: `Pick the version that best fits what your business needs right now.`
  - Add 3 role cards in a single horizontal row below the tagline:
    - `uxui model.png`
    - `ea.png`
    - `graphic design.png`
  - For each card:
    - Add role badge at her feet.
    - Add 5 floating white pill badges with specified labels + icons.

### 2) Update `style.css`
- Add styling for the hero heading size + `Choose Your.png` overlay placement.
- Add role cards layout (row) and hover effects:
  - Pink/black/gold soft glow per card type.
  - Smooth transitions.
- Add badge styling (pill badges, positioning around cards, feet badge).
- Ensure generous spacing + premium look.
- Add mobile adjustments so layout stays readable.

### 3) Check `script.js`
- Verify CTA click/scroll behavior still matches existing functionality.
- Add handlers if role cards need hover/tap behaviors (likely CSS-only).

### 4) Test
- Desktop: confirm overlap, card glows, and pill placements.
- Mobile: confirm no clutter, layout doesn’t break, CTA still works.


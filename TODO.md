# Intro Fix TODO

## Plan
- [x] 1. Update style.css: Add `.brand.fade-out` and `.brand.instant` classes, extend bar transition
- [x] 2. Update script.js: Fix sessionStorage bug, implement new intro sequence with disappear/reappear, update skipIntro
- [x] 3. Test in browser

## Changes Made

### style.css
- Added `.brand.fade-out` — fades brand to `opacity: 0` with `blur(8px)` for the disappear phase
- Added `.brand.instant` — disables all transitions/animations for instant positioning when skipping intro
- Extended `.bar` transition from `2s` to `4.5s` to match the new longer intro duration

### script.js
- **Removed** `sessionStorage.removeItem("introPlayed")` from `pageshow` — intro now truly plays **once per session**
- **New intro timeline** (first visit only):
  - 0ms: `.intro` — brand appears blurry
  - 800ms: `.focus` — brand becomes clear
  - 2200ms: `.fade-out` — brand **disappears**
  - 3500ms: `.hero` — brand **reappears** in hero position (top: 80px, scale 1.6)
  - 4500ms: progress hides, `showUI()` reveals all other hero elements
- **Updated `skipIntro()`** — for returning visitors: adds `.instant` to prevent animation, jumps brand directly to `.hero` position, clears old inline styles, then removes `.instant` on next frame so hover transitions still work


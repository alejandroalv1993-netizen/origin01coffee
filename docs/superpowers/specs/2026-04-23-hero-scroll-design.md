# Hero Scroll Animation — Design Spec
**Date:** 2026-04-23
**Project:** Origin 01 — Premium Coffee Brand
**Stack:** React 19 + Vite + TypeScript + Tailwind v4 + GSAP

---

## Overview

Replace the current static hero section with a split-layout, scroll-driven animated hero. The left column displays stacked SYNE phrases that reveal progressively on scroll. The right column shows the brand mascot walking via a scroll-scrubbed video. The entire hero section is pinned during the animation, releasing when complete.

---

## Color Palette

| Role | Value |
|---|---|
| Background base | `#F5F0E8` (crema) |
| Surface secondary | `#E8DFD0` |
| Text primary | `#2C1F14` (espresso) |
| Text dim (inactive phrases) | `rgba(44, 31, 20, 0.15)` |
| Accent | `#043cd5` (blue) |

The current dark theme (`#0a0a0a`) is replaced site-wide with the crema palette. The footer adopts `#2C1F14` as its background (dark espresso).

---

## Layout

### Desktop (≥ `md` breakpoint)

```
┌─────────────────────────────────────────────────────┐
│  NAV (fixed, crema bg with blur)                    │
├──────────────────────┬──────────────────────────────┤
│  LEFT COL            │  RIGHT COL                   │
│                      │                              │
│  [badge]             │  <video>                     │
│                      │  mix-blend-mode: multiply    │
│  WE GROW             │  video_optimizado2.mp4       │
│  WE ROAST  ← SYNE    │  (mascot walking, white bg   │
│  WE DRINK            │   fades into crema bg)       │
│                      │                              │
│  [CTA button]        │                              │
│                      │                              │
└──────────────────────┴──────────────────────────────┘
  ↑ pinned during scroll · releases after animation
```

- Left column: `flex-1`, vertically centered, padding `px-12`. Contains (top to bottom): badge pill ("Fresh Batch Just Roasted"), SYNE phrase stack, CTA buttons (existing "Explorar Catálogo" + "Nuestro Proceso")
- Right column: fixed width ~`40vw`, full hero height, video aligned to bottom-right

### Mobile (< `md`)

Pin disabled. Video moves to centered background of the text column at reduced opacity. Text phrases animate on scroll without pin (simple ScrollTrigger with `start: "top 80%"`).

---

## Components

### `src/components/HeroSection.tsx`
Self-contained component. Owns all GSAP logic via `useLayoutEffect` + `useGSAP` hook (from `@gsap/react`). Cleans up ScrollTrigger on unmount. Accepts no props — reads video from `/assets/video_optimizado2.mp4`.

### `src/App.tsx`
Imports `<HeroSection />` and replaces the existing `<section>` hero block. No other changes.

### `src/styles/globals.css`
- Adds `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap')`
- Adds CSS custom property `--font-syne: 'Syne', sans-serif`
- Updates `body` background to `#F5F0E8` and color to `#2C1F14`

---

## Animation Design

### ScrollTrigger configuration

```js
ScrollTrigger.create({
  trigger: heroRef,
  pin: true,
  scrub: 1,         // 1-second smoothing
  start: "top top",
  end: "+=200%",    // pin lasts 2 full viewport heights of scroll
})
```

Total pinned scroll distance: `200vh` above the section's natural height.

### GSAP timeline (scrubbed)

| Scroll % | Action |
|---|---|
| 0% | `video.currentTime = 0` · "WE GROW" starts revealing |
| 0–33% | "WE GROW" reveals: `clipPath inset(0 100% 0 0) → inset(0 0% 0 0)`, `opacity 0→1` |
| 33% | "WE GROW" complete (color `#2C1F14`) · "WE ROAST" starts revealing |
| 33–66% | "WE ROAST" reveals same clip+opacity transition |
| 66% | "WE ROAST" complete · "WE DRINK" starts revealing |
| 66–90% | "WE DRINK" reveals |
| 0–100% | `video.currentTime` mapped linearly from `0` to `video.duration` |
| 0–100% | Right column subtle parallax: `y: 0 → -40px` |
| 100% | Pin releases, products section scrolls into view normally |

### Phrase states

- **Pending:** `color: rgba(44,31,20,0.15)` — visible but ghosted
- **Active/revealing:** clip-path animating, color transitioning to full
- **Completed:** `color: #2C1F14` — full weight

All three phrases are always present in the DOM, stacked vertically. Font: Syne 900, size `clamp(3rem, 8vw, 7rem)`, tracking `-0.03em`.

### Video blend mode

```css
.hero-video {
  mix-blend-mode: multiply;
}
```

On the `#F5F0E8` background, the white regions of the video become transparent, leaving only the mascot visible.

---

## Dependencies

| Package | Action |
|---|---|
| `gsap` | `npm install gsap` |
| `@gsap/react` | `npm install @gsap/react` (provides `useGSAP` hook for safe cleanup) |

No other new dependencies.

---

## Git Strategy

Commits in order:
1. `feat: init repo and add gitignore` — initial commit of current state
2. `feat: install gsap and @gsap/react`
3. `feat: apply crema color palette site-wide`
4. `feat: add HeroSection component with split layout`
5. `feat: implement scroll-scrubbed video and SYNE phrase animation`

---

## Out of Scope

- Preloading/buffering strategy for the video (video is already optimized at ~10MB)
- Custom easing curves per phrase (linear scrub is sufficient)
- Any changes to the Products section or Footer layout

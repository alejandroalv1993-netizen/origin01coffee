# Intro Overlay — Scroll-Triggered Split Animation

**Date:** 2026-04-24
**Branch:** feat/hero-scroll
**Status:** Approved

---

## Summary

On first load (once per session), the landing page is covered by a full-screen blue overlay showing only the surprised mascot logo centered. The first scroll or touch event triggers an automatic animation: two blue panels slide out horizontally while the logo flies to its position in the HeroSection right column. The landing is then fully visible and scrollable normally.

---

## Architecture

### New component: `src/components/IntroOverlay.tsx`

- Renders `null` immediately if `sessionStorage.getItem("intro_seen")` is set.
- Fixed overlay, `z-[100]`, covers full viewport.
- Two child panels: `PanelLeft` (left 50vw) and `PanelRight` (right 50vw), both `#043cd5`.
- Centered `logosurprised.png` at `40vh` height, absolutely positioned, `ref` attached for GSAP.
- Listens for first `wheel` or `touchstart` event with `{ once: true }`.

### Modified: `src/App.tsx`

- Import and render `<IntroOverlay />` as first child of the root `div`, before `<nav>`.

---

## Animation Logic

Triggered by first `wheel` or `touchstart` (non-blocking — user can scroll freely):

1. `gsap.to(panelLeftRef, { x: "-100%", duration: 1, ease: "power3.inOut" })`
2. `gsap.to(panelRightRef, { x: "100%", duration: 1, ease: "power3.inOut" })` (parallel)
3. Logo animates toward the HeroSection right column position using GSAP FLIP:
   - `Flip.getState(logoRef)` captures current state
   - Logo is moved to target position in DOM (or animated visually with `Flip.from()`)
   - `ease: "power4.out"`, duration ~1s
4. `onComplete`: overlay unmounts, `sessionStorage.setItem("intro_seen", "1")`

The landing page is present in DOM beneath the overlay from initial load — no blocking.

---

## Timing & Easing

| Element | Duration | Easing |
|---------|----------|--------|
| PanelLeft / PanelRight | 1s | power3.inOut |
| Logo fly-to-position | 1s | power4.out |
| All animations | parallel | — |

---

## Edge Cases

- **Session already seen:** Component returns `null` — zero DOM overhead.
- **`prefers-reduced-motion`:** Skip animation, unmount overlay immediately on mount.
- **Z-index:** Overlay at `z-[100]`, above nav (`z-50`) and all other content.

---

## Files Affected

| File | Change |
|------|--------|
| `src/components/IntroOverlay.tsx` | Create new |
| `src/App.tsx` | Add `<IntroOverlay />` as first child |

---

## Out of Scope

- No changes to `HeroSection.tsx` or `LogoSwap.tsx`
- No new dependencies (GSAP already installed)
- No persistent storage (sessionStorage only, clears on tab close)

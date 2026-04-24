# Responsive Design — Mobile & Tablet

**Date:** 2026-04-24
**Branch:** feat/hero-scroll
**Status:** Approved

---

## Summary

Make the landing page fully responsive across phones (320–430px), tablets (up to 768px), and intermediate sizes using Tailwind responsive prefixes exclusively. No new components or libraries.

---

## Breakpoints (Tailwind defaults)

| Prefix | Min-width | Target |
|--------|-----------|--------|
| (none) | 0px | Mobile phones |
| `sm:` | 640px | Large phones / small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktops (current baseline) |
| `xl:` | 1280px | Large desktops |

---

## Files Affected

| File | Changes |
|------|---------|
| `src/App.tsx` | Nav spacing, products section, footer spacing |
| `src/components/HeroSection.tsx` | Column layout + mobile mascot |
| `src/components/ProductCarousel.tsx` | Carousel item basis + container padding |

---

## Section Designs

### 1. Navbar (`src/App.tsx`)

- Container padding: `px-6` → `px-3 sm:px-6`
- Nav height: `h-20` → `h-14 sm:h-20`
- Login button: `hidden sm:flex` (hidden on mobile, visible sm+)
- CircleMenu stays as-is (already works as mobile nav)

### 2. HeroSection (`src/components/HeroSection.tsx`)

**Container:**
- `flex h-screen w-full pt-20` → `flex min-h-screen w-full pt-14 sm:pt-20`
  - `min-h-screen` allows content to grow if mascot pushes layout
  - `pt-14` matches the smaller nav height on mobile

**Main flex direction:**
- Inner div: `flex h-screen w-full` → `flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-5rem)]`

**Left column (text + CTAs):**
- Padding top: `pt-40` → `pt-10 sm:pt-20 lg:pt-40`
- Padding horizontal: `px-12 md:px-20` → `px-6 sm:px-8 md:px-12 lg:px-20`
- Subcopy indent: `pl-[4.5em]` → `pl-0 sm:pl-[4.5em]`
- Phrase font size: `clamp(1.8rem, 4.5vw, 4rem)` → `clamp(2.2rem, 8vw, 4rem)`
  - Larger minimum ensures phrases read well on small phones
- CTAs already have `flex-col sm:flex-row` ✓

**Mobile mascot (new):**
- Add inside left column, after CTAs: `<div className="flex lg:hidden justify-center mt-8 pb-8">`
- Contains `<LogoSwap className="h-[40vw] w-auto" />`
- Visible only on < lg

**Right column (desktop mascot):**
- Keep `hidden lg:flex` — no change

**Middle offer card:**
- Keep `hidden xl:flex` — no change

### 3. ProductCarousel (`src/components/ProductCarousel.tsx`)

**Container padding:**
- `px-12` → `px-4 sm:px-8 md:px-12`

**CarouselItem basis:**
- `md:basis-1/2 lg:basis-1/4` → `basis-full md:basis-1/2 lg:basis-1/4`
  - Explicit `basis-full` on mobile = 1 card at a time

### 4. Products Section (`src/App.tsx`)

- Section padding: `py-32` → `py-16 md:py-32`
- Header margin: `mb-24` → `mb-12 md:mb-24`
- Heading size: `text-6xl md:text-8xl` → `text-4xl sm:text-6xl md:text-8xl`

### 5. Footer (`src/App.tsx`)

- Section padding: `py-20` → `py-12 md:py-20`
- Grid bottom margin: `mb-20` → `mb-10 md:mb-20`
- Grid already has `grid-cols-1 md:grid-cols-4` ✓
- Newsletter form already flex ✓

---

## Out of Scope

- No new components
- No changes to CircleMenu internals
- No changes to card-7.tsx or LogoSwap.tsx
- IntroOverlay already handles mobile gracefully (panels split, no fly animation)

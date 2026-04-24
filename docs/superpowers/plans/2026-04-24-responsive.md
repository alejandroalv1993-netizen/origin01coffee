# Responsive Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Origin 01 landing page fully responsive across phones (320px+), tablets, and intermediate sizes using Tailwind responsive prefixes only.

**Architecture:** Pure Tailwind class changes across three files. No new components. The hero section gets a `flex-col lg:flex-row` layout with a mobile-only mascot block added inside the left column.

**Tech Stack:** React, Tailwind CSS v4, Vite

---

## File Map

| File | Changes |
|------|---------|
| `src/App.tsx` | Navbar height/padding, login button visibility, products section sizing, footer spacing |
| `src/components/HeroSection.tsx` | Column layout, padding, font size, mobile mascot |
| `src/components/ProductCarousel.tsx` | Item basis, container padding |

---

### Task 1: Navbar responsive (`src/App.tsx`)

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Read the current navbar markup**

Read `src/App.tsx` lines 70–95 to confirm the exact current classes before editing.

- [ ] **Step 2: Apply navbar responsive changes**

Make these three targeted edits to the `<nav>` block in `src/App.tsx`:

**Edit 1** — Container height and padding:
```tsx
// BEFORE:
<div className="container mx-auto flex h-20 items-center px-6">
// AFTER:
<div className="container mx-auto flex h-14 sm:h-20 items-center px-3 sm:px-6">
```

**Edit 2** — Login button: hide on mobile:
```tsx
// BEFORE:
<div className="flex-1 flex justify-end">
  <FlowButton text="Login" variant="outline" className="text-sm px-6 h-10" />
</div>
// AFTER:
<div className="flex-1 hidden sm:flex justify-end">
  <FlowButton text="Login" variant="outline" className="text-sm px-6 h-10" />
</div>
```

- [ ] **Step 3: Verify build passes**

Run from `C:\Desarrollo_web\tests\Origin01`:
```bash
npm run build
```
Expected: `✓ built in` with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "fix: navbar responsive — smaller height and hidden login on mobile"
```

---

### Task 2: HeroSection responsive (`src/components/HeroSection.tsx`)

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Read the current HeroSection markup**

Read `src/components/HeroSection.tsx` lines 50–130 to confirm current classes.

- [ ] **Step 2: Fix section wrapper and inner container**

**Edit 1** — Section wrapper: sync pt with new nav height:
```tsx
// BEFORE:
<section ref={sectionRef} className="relative bg-[#F5F0E8]/80">
  <div className="flex h-screen w-full pt-20">
// AFTER:
<section ref={sectionRef} className="relative bg-[#F5F0E8]/80">
  <div className="flex flex-col lg:flex-row min-h-screen w-full pt-14 sm:pt-20">
```

- [ ] **Step 3: Fix left column padding and font size**

**Edit 2** — Left column top padding and horizontal padding:
```tsx
// BEFORE:
<div className="flex flex-[1.2] flex-col justify-start pt-40 items-start px-12 md:px-20 gap-6 pb-12">
// AFTER:
<div className="flex flex-[1.2] flex-col justify-start pt-10 sm:pt-20 lg:pt-40 items-start px-6 sm:px-8 md:px-12 lg:px-20 gap-6 pb-12">
```

**Edit 3** — Phrase font size clamp (inside the `.map()` inline style):
```tsx
// BEFORE:
fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
// AFTER:
fontSize: 'clamp(2.2rem, 8vw, 4rem)',
```

**Edit 4** — Subcopy left padding:
```tsx
// BEFORE:
<p className="text-[#2C1F14]/60 text-sm md:text-base font-bold uppercase tracking-[0.25em] font-body pl-[4.5em]">
// AFTER:
<p className="text-[#2C1F14]/60 text-sm md:text-base font-bold uppercase tracking-[0.25em] font-body pl-0 sm:pl-[4.5em]">
```

- [ ] **Step 4: Add mobile mascot block**

Add the mobile mascot `div` immediately after the closing `</div>` of the CTAs block and before the closing `</div>` of the left column. The left column currently ends with the CTAs div:

```tsx
{/* CTAs */}
<div className="flex flex-col sm:flex-row gap-6 mt-2">
  <FlowButton text="Explorar Catálogo" variant="primary" className="w-full sm:w-auto" />
  <FlowButton text="Nuestro Proceso" variant="outline" className="w-full sm:w-auto" />
</div>

{/* Mobile mascot — visible only below lg */}
<div className="flex lg:hidden justify-center w-full mt-8 pb-8">
  <LogoSwap className="h-[40vw] w-auto max-h-64" />
</div>
```

Insert that `{/* Mobile mascot */}` block right after the CTAs div, still inside the left column div.

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```
Expected: `✓ built` with no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "fix: hero responsive — column layout, adjusted padding, mobile mascot"
```

---

### Task 3: ProductCarousel responsive (`src/components/ProductCarousel.tsx`)

**Files:**
- Modify: `src/components/ProductCarousel.tsx`

- [ ] **Step 1: Read the current carousel markup**

Read `src/components/ProductCarousel.tsx` to confirm current classes.

- [ ] **Step 2: Fix container padding and item basis**

**Edit 1** — Container padding:
```tsx
// BEFORE:
<div
  className="relative w-full max-w-[90vw] mx-auto px-12"
// AFTER:
<div
  className="relative w-full max-w-[90vw] mx-auto px-4 sm:px-8 md:px-12"
```

**Edit 2** — CarouselItem basis (add `basis-full` for mobile):
```tsx
// BEFORE:
<CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
// AFTER:
<CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/4">
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```
Expected: `✓ built` with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProductCarousel.tsx
git commit -m "fix: carousel responsive — 1 card on mobile, adjusted container padding"
```

---

### Task 4: Products section + Footer responsive (`src/App.tsx`)

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Fix products section**

**Edit 1** — Section vertical padding:
```tsx
// BEFORE:
<section className="bg-[#F5F0E8]/80 py-32">
// AFTER:
<section className="bg-[#F5F0E8]/80 py-16 md:py-32">
```

**Edit 2** — Header margin bottom:
```tsx
// BEFORE:
<div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
// AFTER:
<div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
```

**Edit 3** — Heading font size:
```tsx
// BEFORE:
<h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#2C1F14] leading-none mb-6 font-heading">
// AFTER:
<h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#2C1F14] leading-none mb-6 font-heading">
```

- [ ] **Step 2: Fix footer spacing**

**Edit 4** — Footer vertical padding:
```tsx
// BEFORE:
<footer className="bg-[#F5F0E8]/80 py-20 px-6 border-t border-[#2C1F14]/10 backdrop-blur-md">
// AFTER:
<footer className="bg-[#F5F0E8]/80 py-12 md:py-20 px-6 border-t border-[#2C1F14]/10 backdrop-blur-md">
```

**Edit 5** — Footer grid bottom margin:
```tsx
// BEFORE:
<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
// AFTER:
<div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10 md:mb-20">
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```
Expected: `✓ built` with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "fix: products section and footer responsive spacing and typography"
```

---

### Task 5: Manual visual verification

**Files:** None

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```
Open `http://localhost:5173` in a browser.

- [ ] **Step 2: Test at 375px (iPhone SE)**

In DevTools → Toggle device toolbar → iPhone SE (375×667).

Check:
- Navbar: shorter height, no Login button, CircleMenu centered
- Hero: phrases stack vertically, mascot appears below CTAs
- Products heading: smaller (≈4xl)
- Carousel: 1 card visible at a time
- Footer: single column, reasonable spacing

- [ ] **Step 3: Test at 768px (iPad)**

Switch to iPad (768×1024).

Check:
- Navbar: full height (h-20), Login button visible
- Hero: still column layout (lg breakpoint is 1024px), mascot below CTAs
- Carousel: 2 cards per row

- [ ] **Step 4: Test at 1024px+ (desktop)**

Switch to responsive → 1200px.

Check:
- Hero: back to 3-column row layout, mobile mascot hidden
- Carousel: 4 cards per row
- All spacing matches original desktop design

- [ ] **Step 5: Commit any fixes found during verification**

```bash
git add -p
git commit -m "fix: responsive adjustments after visual verification"
```

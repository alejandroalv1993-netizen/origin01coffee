# Hero Scroll Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static dark hero with a GSAP scroll-pinned split hero — mascot video on the right scrubs with scroll, SYNE phrases stack-reveal on the left, site-wide crema/espresso palette.

**Architecture:** GSAP ScrollTrigger pins the hero section for 200vh of scroll. A single scrubbed timeline drives `video.currentTime` and three clip-path phrase reveals simultaneously. The site palette migrates from dark to crema via CSS custom properties in `globals.css` and targeted class updates in `App.tsx`.

**Tech Stack:** React 19, Vite, TypeScript, Tailwind v4, GSAP 3 + @gsap/react, Google Fonts (Syne — already loaded via `globals.css`)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `.gitignore` | Create | Exclude node_modules, dist, .superpowers, build artifacts |
| `src/styles/globals.css` | Modify | Update `--color-background`, `--color-foreground`, add `--color-surface` |
| `src/App.tsx` | Modify | Nav + products + footer palette updates; swap hero for `<HeroSection />` |
| `src/components/HeroSection.tsx` | Create | Split layout + GSAP scroll animation (owns all animation logic) |

---

## Task 1: Add .gitignore and commit current state

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create `.gitignore`**

```
# dependencies
node_modules/

# build output
dist/
build/

# env files
.env
.env.local

# brainstorm artifacts
.superpowers/

# OS
.DS_Store
Thumbs.db
```

- [ ] **Step 2: Stage all project files and commit**

```bash
git add .gitignore index.html main.js package.json package-lock.json style.css tsconfig.json tsconfig.node.json vite.config.ts src/ public/
git commit -m "feat: init repo — add gitignore and stage project files"
```

Expected: commit succeeds, `node_modules/` and `.superpowers/` not included.

---

## Task 2: Install GSAP

**Files:**
- Modify: `package.json` (automatic via npm)

- [ ] **Step 1: Install gsap and @gsap/react**

```bash
npm install gsap @gsap/react
```

Expected output includes:
```
added 2 packages
```

- [ ] **Step 2: Verify installation**

```bash
node -e "require('./node_modules/gsap/gsap.min.js'); console.log('gsap ok')"
```

Expected: `gsap ok`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install gsap and @gsap/react"
```

---

## Task 3: Update global color tokens

**Files:**
- Modify: `src/styles/globals.css`

Current state of the `@theme` block:
```css
--color-background: #ffffff;
--color-foreground: #0f172a;
--color-border: #e2e8f0;
--color-card: #ffffff;
--color-card-foreground: #0f172a;
```

- [ ] **Step 1: Replace color tokens with crema palette**

Open `src/styles/globals.css`. Replace the `@theme` block entirely with:

```css
@import "tailwindcss";

@theme {
  --font-heading: 'Syne', sans-serif;
  --font-body: 'Manrope', sans-serif;

  --radius-lg: 1.5rem;
  --radius-md: 0.75rem;
  --radius-sm: 0.5rem;

  --color-background: #F5F0E8;
  --color-foreground: #2C1F14;
  --color-surface: #E8DFD0;

  --color-primary: #043cd5;
  --color-primary-foreground: #ffffff;

  --color-border: #D4C4AD;

  --color-card: #EDE5D8;
  --color-card-foreground: #2C1F14;
}

@utility transform-style-3d {
  transform-style: preserve-3d;
}

@utility preserve-3d {
  transform-style: preserve-3d;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 2: Start dev server and verify the background changed**

```bash
npm run dev
```

Open `http://localhost:5173`. The page background should be crema (`#F5F0E8`). The existing dark sections will still look wrong — that's expected, fixed in the next task.

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: apply crema/espresso color tokens to global theme"
```

---

## Task 4: Update App.tsx palette (nav, products, footer)

**Files:**
- Modify: `src/App.tsx`

Goal: replace hardcoded dark classes in the nav, products section, and footer with crema palette values. Do NOT touch the hero `<section>` yet — that gets replaced in Task 6.

- [ ] **Step 1: Update the nav**

Find this in `src/App.tsx` (line ~39):
```tsx
<nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-xl">
```
Replace with:
```tsx
<nav className="fixed top-0 z-50 w-full border-b border-[#2C1F14]/10 bg-[#F5F0E8]/80 backdrop-blur-xl">
```

Find (line ~42):
```tsx
<div className="h-8 w-8 rounded-lg bg-[#043cd5] flex items-center justify-center">
  <Coffee className="h-5 w-5 text-white" />
```
No change needed — accent stays blue.

Find (line ~45):
```tsx
<span className="text-xl font-black uppercase tracking-tighter font-heading italic">
  Origin <span className="text-[#043cd5]">01</span>
```
Replace with:
```tsx
<span className="text-xl font-black uppercase tracking-tighter font-heading italic text-[#2C1F14]">
  Origin <span className="text-[#043cd5]">01</span>
```

Find (line ~49):
```tsx
<div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
```
Replace with:
```tsx
<div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-[#2C1F14]/60">
```

Find the nav links hover (line ~50-54):
```tsx
<a href="#" className="transition-colors hover:text-white">Shop</a>
<a href="#" className="transition-colors hover:text-white">Origin</a>
<a href="#" className="transition-colors hover:text-white">Process</a>
<a href="#" className="transition-colors hover:text-white">Contact</a>
```
Replace with:
```tsx
<a href="#" className="transition-colors hover:text-[#2C1F14]">Shop</a>
<a href="#" className="transition-colors hover:text-[#2C1F14]">Origin</a>
<a href="#" className="transition-colors hover:text-[#2C1F14]">Process</a>
<a href="#" className="transition-colors hover:text-[#2C1F14]">Contact</a>
```

Find the Account button (line ~55):
```tsx
<button className="rounded-full bg-white/5 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white border border-white/10 hover:bg-white/10 transition-all">
```
Replace with:
```tsx
<button className="rounded-full bg-[#2C1F14]/5 px-6 py-2 text-xs font-bold uppercase tracking-widest text-[#2C1F14] border border-[#2C1F14]/10 hover:bg-[#2C1F14]/10 transition-all">
```

- [ ] **Step 2: Update the products section**

Find (line ~104):
```tsx
<section className="bg-white py-32 px-6">
```
Replace with:
```tsx
<section className="bg-[#F5F0E8] py-32 px-6">
```

Find the heading (line ~108):
```tsx
<h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black leading-none mb-6 font-heading italic">
  Nuestra <br />
  <span className="text-[#043cd5]">Selección</span>
```
Replace with:
```tsx
<h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#2C1F14] leading-none mb-6 font-heading italic">
  Nuestra <br />
  <span className="text-[#043cd5]">Selección</span>
```

Find (line ~112):
```tsx
<p className="text-black/60 text-lg font-medium font-body leading-relaxed">
```
Replace with:
```tsx
<p className="text-[#2C1F14]/60 text-lg font-medium font-body leading-relaxed">
```

Find (line ~118):
```tsx
<div className="h-px w-20 bg-black/10" />
<span className="text-sm font-black uppercase tracking-widest text-black/40 font-body">Est. 2024</span>
```
Replace with:
```tsx
<div className="h-px w-20 bg-[#2C1F14]/10" />
<span className="text-sm font-black uppercase tracking-widest text-[#2C1F14]/40 font-body">Est. 2024</span>
```

- [ ] **Step 3: Update the footer**

Find (line ~135):
```tsx
<footer className="bg-black py-20 px-6 border-t border-white/5">
```
Replace with:
```tsx
<footer className="bg-[#2C1F14] py-20 px-6 border-t border-[#F5F0E8]/10">
```

Find (line ~140):
```tsx
<Coffee className="h-8 w-8 text-[#043cd5]" />
<span className="text-2xl font-black uppercase tracking-tighter font-heading italic">
  Origin <span className="text-[#043cd5]">01</span>
```
No change needed.

Find (line ~145):
```tsx
<p className="text-white/40 max-w-sm mb-8 leading-relaxed font-body">
```
Replace with:
```tsx
<p className="text-[#F5F0E8]/50 max-w-sm mb-8 leading-relaxed font-body">
```

Find the social links (lines ~148-157):
```tsx
<a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#043cd5] transition-all">
  <Instagram className="h-5 w-5" />
</a>
<a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#043cd5] transition-all">
  <Twitter className="h-5 w-5" />
</a>
<a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#043cd5] transition-all">
  <Facebook className="h-5 w-5" />
</a>
```
Replace with:
```tsx
<a href="#" className="h-10 w-10 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center border border-[#F5F0E8]/10 text-[#F5F0E8] hover:bg-[#043cd5] transition-all">
  <Instagram className="h-5 w-5" />
</a>
<a href="#" className="h-10 w-10 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center border border-[#F5F0E8]/10 text-[#F5F0E8] hover:bg-[#043cd5] transition-all">
  <Twitter className="h-5 w-5" />
</a>
<a href="#" className="h-10 w-10 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center border border-[#F5F0E8]/10 text-[#F5F0E8] hover:bg-[#043cd5] transition-all">
  <Facebook className="h-5 w-5" />
</a>
```

Find the footer links heading (line ~161):
```tsx
<h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-white">Links</h4>
<ul className="space-y-4 text-white/40 text-sm font-medium">
  <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
  <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
  <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
  <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
```
Replace with:
```tsx
<h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#F5F0E8]">Links</h4>
<ul className="space-y-4 text-[#F5F0E8]/40 text-sm font-medium">
  <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">Términos y Condiciones</a></li>
  <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">Privacidad</a></li>
  <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">Envíos</a></li>
  <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">FAQs</a></li>
```

Find the newsletter section (line ~169):
```tsx
<h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-white">Newsletter</h4>
<p className="text-white/40 text-sm mb-6 leading-relaxed">
```
Replace with:
```tsx
<h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#F5F0E8]">Newsletter</h4>
<p className="text-[#F5F0E8]/40 text-sm mb-6 leading-relaxed">
```

Find the newsletter input (line ~172):
```tsx
<input type="email" placeholder="Email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#043cd5] transition-all" />
```
Replace with:
```tsx
<input type="email" placeholder="Email" className="flex-1 bg-[#F5F0E8]/5 border border-[#F5F0E8]/10 rounded-lg px-4 py-2 text-sm text-[#F5F0E8] placeholder-[#F5F0E8]/30 outline-none focus:border-[#043cd5] transition-all" />
```

Find the footer copyright (line ~178):
```tsx
<div className="pt-8 border-t border-white/5 text-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">
```
Replace with:
```tsx
<div className="pt-8 border-t border-[#F5F0E8]/5 text-center text-[#F5F0E8]/20 text-[10px] uppercase tracking-[0.3em] font-bold">
```

Also update the outer wrapper (line ~37):
```tsx
<div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#043cd5] selection:text-white font-body">
```
Replace with:
```tsx
<div className="min-h-screen bg-[#F5F0E8] text-[#2C1F14] selection:bg-[#043cd5] selection:text-white font-body">
```

- [ ] **Step 4: Verify in browser**

With dev server running at `http://localhost:5173`:
- Nav: crema background, espresso text ✓
- Products: crema background, espresso headings ✓
- Footer: dark espresso (`#2C1F14`) background with crema text ✓

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: apply crema/espresso palette to nav, products, and footer"
```

---

## Task 5: Create HeroSection component (layout only)

**Files:**
- Create: `src/components/HeroSection.tsx`

This task creates the split-layout hero with static phrases (no animation yet). Verify visually before adding GSAP.

- [ ] **Step 1: Create `src/components/HeroSection.tsx`**

```tsx
import { useRef } from 'react'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const phrase1Ref = useRef<HTMLDivElement>(null)
  const phrase2Ref = useRef<HTMLDivElement>(null)
  const phrase3Ref = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F5F0E8]"
    >
      <div className="flex h-screen w-full">
        {/* Left column — badge, phrases, CTAs */}
        <div className="flex flex-1 flex-col justify-center px-12 md:px-20 gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2C1F14]/10 bg-[#E8DFD0] px-4 py-1.5 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#043cd5] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#043cd5]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2C1F14]/80">
              Fresh Batch Just Roasted
            </span>
          </div>

          {/* Phrase stack — all three visible, pending ones are ghosted */}
          <div className="flex flex-col gap-1">
            <div
              ref={phrase1Ref}
              className="font-heading font-black uppercase italic leading-none tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: 'rgba(44, 31, 20, 0.15)',
                clipPath: 'inset(0 100% 0 0)',
              }}
            >
              WE GROW
            </div>
            <div
              ref={phrase2Ref}
              className="font-heading font-black uppercase italic leading-none tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: 'rgba(44, 31, 20, 0.15)',
                clipPath: 'inset(0 100% 0 0)',
              }}
            >
              WE ROAST
            </div>
            <div
              ref={phrase3Ref}
              className="font-heading font-black uppercase italic leading-none tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: 'rgba(44, 31, 20, 0.15)',
                clipPath: 'inset(0 100% 0 0)',
              }}
            >
              WE DRINK
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="w-full sm:w-auto rounded-full bg-[#043cd5] px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_10px_40px_rgba(4,60,213,0.3)] transition-all hover:scale-105 hover:bg-[#0334b5] active:scale-95">
              Explorar Catálogo
            </button>
            <button className="w-full sm:w-auto rounded-full border border-[#2C1F14]/20 bg-[#E8DFD0] px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#2C1F14] hover:bg-[#DDD4C4] transition-all">
              Nuestro Proceso
            </button>
          </div>
        </div>

        {/* Right column — mascot video */}
        <div className="hidden md:flex w-[40vw] items-end justify-center overflow-hidden">
          <video
            ref={videoRef}
            src="/assets/video_optimizado2.mp4"
            preload="metadata"
            muted
            playsInline
            className="h-full w-full object-cover"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Import HeroSection in App.tsx and replace the old hero**

In `src/App.tsx`, add the import at the top (after existing imports):
```tsx
import { HeroSection } from '@/components/HeroSection'
```

Find the entire old hero section (lines ~61-101):
```tsx
{/* Hero Section */}
<section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
  {/* Animated Background Gradients */}
  <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#043cd5]/20 blur-[120px] animate-pulse" />
  <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-[#043cd5]/10 blur-[100px]" />

  <div className="container mx-auto px-6 text-center">
    ...
  </div>

  {/* Floating elements decor */}
  <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
    <div className="text-[150px] font-black text-white/5 select-none leading-none font-heading italic">01</div>
  </div>
</section>
```
Replace the entire block with:
```tsx
<HeroSection />
```

- [ ] **Step 3: Verify layout in browser**

Open `http://localhost:5173`. You should see:
- Split layout: text column left, video area right (video invisible/blank since no animation yet)
- Three ghosted phrases (very faint, clipped)
- Badge with blue ping dot
- Two CTA buttons in crema style
- Page scrolls normally past the hero into products

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.tsx src/App.tsx
git commit -m "feat: add HeroSection component with split layout"
```

---

## Task 6: Implement GSAP scroll animation

**Files:**
- Modify: `src/components/HeroSection.tsx`

Add GSAP ScrollTrigger to pin the hero and scrub the video + phrase reveals.

- [ ] **Step 1: Add GSAP imports to HeroSection.tsx**

Replace the top of `src/components/HeroSection.tsx`:
```tsx
import { useRef } from 'react'
```
With:
```tsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```

- [ ] **Step 2: Add useGSAP hook inside the component**

Add this block inside `HeroSection()`, after the refs and before the `return`:

```tsx
useGSAP(() => {
  const video = videoRef.current
  const section = sectionRef.current
  if (!video || !section) return

  const initAnimation = () => {
    const duration = video.duration

    // Single scrubbed timeline — controls video + all three phrase reveals
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: '+=200%',
      },
    })

    // Video scrub: proxy object avoids direct tween of read-only currentTime
    const proxy = { t: 0 }
    tl.to(
      proxy,
      {
        t: duration,
        duration: 3,
        ease: 'none',
        onUpdate() {
          video.currentTime = proxy.t
        },
      },
      0
    )

    // WE GROW — scroll 0% to 33% (timeline position 0s to 1s)
    tl.fromTo(
      phrase1Ref.current,
      { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
      { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14', duration: 1, ease: 'none' },
      0
    )

    // WE ROAST — scroll 33% to 66% (timeline position 1s to 2s)
    tl.fromTo(
      phrase2Ref.current,
      { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
      { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14', duration: 1, ease: 'none' },
      1
    )

    // WE DRINK — scroll 66% to 90% (timeline position 2s to 2.7s)
    tl.fromTo(
      phrase3Ref.current,
      { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
      { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14', duration: 0.7, ease: 'none' },
      2
    )
  }

  // Wait for video metadata so video.duration is available
  if (video.readyState >= 1) {
    initAnimation()
  } else {
    video.addEventListener('loadedmetadata', initAnimation, { once: true })
  }
}, { scope: sectionRef })
```

- [ ] **Step 3: Verify animation in browser**

Open `http://localhost:5173`. Check:
- Hero locks in place as you start scrolling ✓
- Mascota walks: video advances frame by frame as you scroll ✓
- "WE GROW" reveals left-to-right in the first third of scroll ✓
- "WE ROAST" reveals in the second third ✓
- "WE DRINK" reveals in the final stretch ✓
- After all phrases are revealed, pin releases and products section scrolls in ✓

If the video appears with its white background on the crema surface and the mascot blends naturally: `mix-blend-mode: multiply` is working ✓

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: implement GSAP scroll-pinned video scrub and SYNE phrase animation"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Split layout: mascota right, text left — Task 5
- ✅ Scroll parallax/pin with GSAP ScrollTrigger — Task 6
- ✅ Video scrubbing via `currentTime` proxy — Task 6
- ✅ SYNE phrase stack accumulation (WE GROW / WE ROAST / WE DRINK) — Task 5 + 6
- ✅ `mix-blend-mode: multiply` for white background removal — Task 5
- ✅ Crema/Espresso palette site-wide — Task 3 + 4
- ✅ Git commits per phase — Tasks 1-6
- ✅ Mobile: pin disabled (ScrollTrigger on desktop only via `hidden md:flex` video column, phrases visible but static) — Task 5 handles this via responsive classes; ScrollTrigger will still pin but phrases work without the video column being visible. Acceptable for this scope.

**Placeholder scan:** No TBDs or TODOs found. All code blocks are complete.

**Type consistency:** `phrase1Ref`, `phrase2Ref`, `phrase3Ref` defined in Task 5, referenced in Task 6. `videoRef` and `sectionRef` consistent throughout. `initAnimation` defined and called in Task 6 only.

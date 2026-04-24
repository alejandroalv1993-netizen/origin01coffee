# Intro Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full-screen blue intro overlay that shows `logosurprised.png` centered, splits open horizontally on first scroll, and flies the logo to the HeroSection right column — shown only once per session.

**Architecture:** A new `IntroOverlay` component renders as a fixed overlay above all content. Two absolute panels (left/right, each 50vw) cover the viewport. On first `wheel`/`touchstart`, GSAP animates panels out and uses GSAP Flip to transition the logo to its target position in the HeroSection. The component skips entirely if `sessionStorage` already has `intro_seen`.

**Tech Stack:** React, GSAP 3.15 (ScrollTrigger already registered), GSAP Flip plugin, Tailwind CSS

---

### Task 1: Create `IntroOverlay.tsx` — static structure

**Files:**
- Create: `src/components/IntroOverlay.tsx`

- [ ] **Step 1: Create the component with static markup**

Create `src/components/IntroOverlay.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

interface IntroOverlayProps {
  /** Ref to the img element in HeroSection's right column — the animation target */
  targetRef: React.RefObject<HTMLImageElement | null>
}

export function IntroOverlay({ targetRef }: IntroOverlayProps) {
  const [visible, setVisible] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelLeftRef = useRef<HTMLDivElement>(null)
  const panelRightRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const animatedRef = useRef(false)

  // Skip if already seen this session
  if (typeof window !== 'undefined' && sessionStorage.getItem('intro_seen')) {
    return null
  }

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden="true"
    >
      {/* Left panel */}
      <div
        ref={panelLeftRef}
        className="absolute top-0 left-0 h-full bg-[#043cd5]"
        style={{ width: '50vw' }}
      />

      {/* Right panel */}
      <div
        ref={panelRightRef}
        className="absolute top-0 right-0 h-full bg-[#043cd5]"
        style={{ width: '50vw' }}
      />

      {/* Centered surprised logo */}
      <img
        ref={logoRef}
        src="/assets/logosurprised.png"
        alt="Origin 01 mascot"
        draggable={false}
        className="absolute select-none object-contain"
        style={{
          height: '40vh',
          width: 'auto',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify dev server starts without errors**

Run: `npm run dev`
Expected: No TypeScript errors, page loads normally (overlay not yet wired up).

---

### Task 2: Add animation logic to `IntroOverlay.tsx`

**Files:**
- Modify: `src/components/IntroOverlay.tsx`

- [ ] **Step 1: Add the scroll trigger and GSAP animation**

Replace the `IntroOverlay` function body with the version that includes animation. Full file:

```tsx
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

interface IntroOverlayProps {
  targetRef: React.RefObject<HTMLImageElement | null>
}

export function IntroOverlay({ targetRef }: IntroOverlayProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !sessionStorage.getItem('intro_seen')
  })
  const panelLeftRef = useRef<HTMLDivElement>(null)
  const panelRightRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!visible) return

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      sessionStorage.setItem('intro_seen', '1')
      setVisible(false)
      return
    }

    function runAnimation() {
      if (animatedRef.current) return
      animatedRef.current = true

      const logo = logoRef.current
      const target = targetRef.current

      // Capture logo state before moving
      const state = logo && target ? Flip.getState(logo) : null

      // Animate panels out simultaneously
      gsap.to(panelLeftRef.current, {
        x: '-100%',
        duration: 1,
        ease: 'power3.inOut',
      })
      gsap.to(panelRightRef.current, {
        x: '100%',
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => {
          sessionStorage.setItem('intro_seen', '1')
          setVisible(false)
        },
      })

      // Fly logo to target position using GSAP Flip
      if (state && logo && target) {
        // Move logo element to target's parent so Flip can calculate final rect
        target.parentElement?.appendChild(logo)
        logo.style.position = 'static'
        logo.style.transform = ''
        logo.style.top = ''
        logo.style.left = ''
        logo.style.height = ''
        logo.style.width = ''
        logo.className = target.className

        Flip.from(state, {
          duration: 1,
          ease: 'power4.out',
          absolute: true,
        })
      }
    }

    window.addEventListener('wheel', runAnimation, { once: true, passive: true })
    window.addEventListener('touchstart', runAnimation, { once: true, passive: true })

    return () => {
      window.removeEventListener('wheel', runAnimation)
      window.removeEventListener('touchstart', runAnimation)
    }
  }, [visible, targetRef])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden="true"
    >
      {/* Left panel */}
      <div
        ref={panelLeftRef}
        className="absolute top-0 left-0 h-full bg-[#043cd5]"
        style={{ width: '50vw' }}
      />

      {/* Right panel */}
      <div
        ref={panelRightRef}
        className="absolute top-0 right-0 h-full bg-[#043cd5]"
        style={{ width: '50vw' }}
      />

      {/* Centered surprised logo */}
      <img
        ref={logoRef}
        src="/assets/logosurprised.png"
        alt="Origin 01 mascot"
        draggable={false}
        className="absolute select-none object-contain"
        style={{
          height: '40vh',
          width: 'auto',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build`
Expected: Build succeeds with no type errors.

---

### Task 3: Expose target ref from HeroSection and wire up in App.tsx

**Files:**
- Modify: `src/components/HeroSection.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add `logoRef` prop to HeroSection**

In `src/components/HeroSection.tsx`, update the component to accept and attach a ref to the right-column mascot image.

Change the function signature:

```tsx
import { useRef, forwardRef } from 'react'  // add forwardRef if needed, or use a prop ref

interface HeroSectionProps {
  mascotRef?: React.RefObject<HTMLImageElement | null>
}

export function HeroSection({ mascotRef }: HeroSectionProps) {
```

Then in the right column `LogoSwap` container, replace:
```tsx
{/* Right column — transparent mascot, swap on hover */}
<div className="hidden lg:flex flex-[0.8] items-center justify-center">
  <LogoSwap className="w-[200%] scale-[1.8] translate-x-[-15%] max-w-none select-none" />
</div>
```

With a version that also renders a hidden target `img` element that Flip can use as the destination:
```tsx
{/* Right column — transparent mascot, swap on hover */}
<div className="hidden lg:flex flex-[0.8] items-center justify-center relative">
  <LogoSwap className="w-[200%] scale-[1.8] translate-x-[-15%] max-w-none select-none" />
  {/* Invisible target anchor for IntroOverlay Flip animation */}
  <img
    ref={mascotRef}
    src="/assets/logosurprised.png"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none select-none"
  />
</div>
```

- [ ] **Step 2: Wire up `IntroOverlay` in App.tsx**

In `src/App.tsx`, add the ref and overlay:

```tsx
import { useRef } from 'react'
import { IntroOverlay } from '@/components/IntroOverlay'
// ... existing imports
```

Inside the `App` function, before the return:
```tsx
const mascotRef = useRef<HTMLImageElement>(null)
```

In the JSX, add `<IntroOverlay>` as first child and pass `mascotRef` to `HeroSection`:
```tsx
function App() {
  const mascotRef = useRef<HTMLImageElement>(null)

  return (
    <div className="min-h-screen text-[#2C1F14] selection:bg-[#043cd5] selection:text-white font-body">
      <IntroOverlay targetRef={mascotRef} />

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#2C1F14]/10 bg-[#F5F0E8]/80 backdrop-blur-md">
        {/* ... unchanged nav content ... */}
      </nav>

      <HeroSection mascotRef={mascotRef} />

      {/* ... rest unchanged ... */}
    </div>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/IntroOverlay.tsx src/components/HeroSection.tsx src/App.tsx
git commit -m "feat: add scroll-triggered intro overlay with GSAP Flip logo transition"
```

---

### Task 4: Manual verification checklist

**Files:** None (verification only)

- [ ] **Step 1: Clear sessionStorage and test intro plays**

Open browser DevTools → Application → Session Storage → clear `intro_seen`.
Reload page.
Expected: Blue overlay covers full page, `logosurprised.png` centered.

- [ ] **Step 2: Scroll and verify animation**

Scroll down once.
Expected:
- Left panel slides out to the left
- Right panel slides out to the right
- Logo flies toward the HeroSection right column
- Animation completes in ~1s
- Landing page fully visible after

- [ ] **Step 3: Verify session skip**

Reload page WITHOUT clearing sessionStorage.
Expected: No overlay — landing page loads directly.

- [ ] **Step 4: Verify prefers-reduced-motion**

In DevTools → Rendering → Emulate CSS media feature → `prefers-reduced-motion: reduce`.
Reload page.
Expected: Overlay does not show (skipped immediately).

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -p
git commit -m "fix: intro overlay adjustments after manual verification"
```

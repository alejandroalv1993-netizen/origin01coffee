import { useEffect, useRef, useState, type RefObject } from 'react'
import gsap from 'gsap'

interface IntroOverlayProps {
  targetRef: RefObject<HTMLImageElement | null>
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

  // Lock body scroll while overlay is visible
  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [visible])

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

      // Animate panels out
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
          window.scrollTo({ top: 0, behavior: 'instant' })
          setVisible(false)
        },
      })

      // Fly logo toward target using getBoundingClientRect — no DOM reparenting
      if (logo && target) {
        const logoRect = logo.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()

        // Skip fly animation if target has no visible rect (e.g. hidden on mobile)
        if (targetRect.width > 0 && targetRect.height > 0) {
          const dx = targetRect.left + targetRect.width / 2 - (logoRect.left + logoRect.width / 2)
          const dy = targetRect.top + targetRect.height / 2 - (logoRect.top + logoRect.height / 2)
          const scale = Math.min(
            targetRect.width / logoRect.width,
            targetRect.height / logoRect.height
          )

          gsap.to(logo, {
            x: dx,
            y: dy,
            scale,
            duration: 1,
            ease: 'power4.out',
          })
        }
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

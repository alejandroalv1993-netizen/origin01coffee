import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const phrase1Ref = useRef<HTMLDivElement>(null)
  const phrase2Ref = useRef<HTMLDivElement>(null)
  const phrase3Ref = useRef<HTMLDivElement>(null)
  // Guard against double-init from React.StrictMode
  const initializedRef = useRef(false)

  useGSAP(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Reset guard on each effect run (StrictMode remount)
    initializedRef.current = false

    const initAnimation = () => {
      // Prevent double-init from duplicate event listeners (StrictMode)
      if (initializedRef.current) return
      initializedRef.current = true

      const duration = video.duration

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          // Increase scroll distance so video plays slower
          end: '+=500%',
        },
      })

      // Video scrub via proxy (video.currentTime is read-only for direct tweening)
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

      // WE GROW — scroll 0–33% of total (timeline 0s–1s)
      tl.fromTo(
        phrase1Ref.current,
        { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
        { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14', duration: 1, ease: 'none' },
        0
      )

      // WE ROAST — scroll 33–66% (timeline 1s–2s)
      tl.fromTo(
        phrase2Ref.current,
        { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
        { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14', duration: 1, ease: 'none' },
        1
      )

      // WE DRINK — scroll 66–90% (timeline 2s–2.7s)
      tl.fromTo(
        phrase3Ref.current,
        { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
        { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14', duration: 0.7, ease: 'none' },
        2
      )
    }

    let listenerAttached = false
    if (video.readyState >= 1) {
      initAnimation()
    } else {
      listenerAttached = true
      video.addEventListener('loadedmetadata', initAnimation, { once: true })
    }

    // Return cleanup so useGSAP removes the event listener on unmount (StrictMode)
    return () => {
      if (listenerAttached) {
        video.removeEventListener('loadedmetadata', initAnimation)
      }
      initializedRef.current = false
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F0E8]"
    >
      <div className="flex w-full" style={{ height: '100vh' }}>
        {/* Left column — badge, phrases, CTAs */}
        {/* pt-20 accounts for the fixed nav height (h-20 = 80px) */}
        <div className="flex flex-1 flex-col justify-center pt-20 px-12 md:px-20 gap-8">
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

          {/* Phrase stack */}
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
        {/* Explicit bg-[#F5F0E8] required for mix-blend-mode: multiply to composite correctly */}
        <div
          className="hidden md:flex w-[40vw] items-end justify-center overflow-hidden bg-[#F5F0E8]"
        >
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

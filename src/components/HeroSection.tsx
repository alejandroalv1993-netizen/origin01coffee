import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LogoSwap } from '@/components/ui/LogoSwap'

gsap.registerPlugin(ScrollTrigger)

// Helvetica system stack — no Google Fonts needed
const HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const phrase1Ref = useRef<HTMLDivElement>(null)
  const phrase2Ref = useRef<HTMLDivElement>(null)
  const phrase3Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: '+=400%',
      },
    })

    // WE GROW — 0–33%
    tl.fromTo(phrase1Ref.current,
      { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
      { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14', duration: 1, ease: 'none' },
      0
    )

    // WE ROAST — 33–66%
    tl.fromTo(phrase2Ref.current,
      { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
      { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14', duration: 1, ease: 'none' },
      1
    )

    // WE DRINK — 66–100%
    tl.fromTo(phrase3Ref.current,
      { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
      { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14', duration: 1, ease: 'none' },
      2
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-[#F5F0E8]/80">
      {/* pt-20 on wrapper clears the fixed nav (h-20 = 80px) */}
      <div className="flex h-screen w-full pt-20">

        {/* Left column — badge, phrases, CTAs */}
        <div className="flex flex-1 flex-col justify-center px-12 md:px-20 gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2C1F14]/10 bg-[#E8DFD0] px-4 py-1.5 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#043cd5] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#043cd5]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2C1F14]/80">
              Fresh Batch Just Roasted
            </span>
          </div>

          {/* Phrase stack — Helvetica, reveal left-to-right on scroll */}
          <div className="flex flex-col gap-0">
            {[
              { ref: phrase1Ref, text: 'WE GROW' },
              { ref: phrase2Ref, text: 'WE ROAST' },
              { ref: phrase3Ref, text: 'WE DRINK' },
            ].map(({ ref, text }) => (
              <div
                key={text}
                ref={ref}
                style={{
                  fontFamily: HELVETICA,
                  fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)',
                  fontWeight: 900,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                  color: 'rgba(44, 31, 20, 0.15)',
                  clipPath: 'inset(0 100% 0 0)',
                }}
              >
                {text}
              </div>
            ))}
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

        {/* Right column — transparent mascot, swap on hover */}
        <div className="hidden md:flex w-[40vw] items-center justify-center overflow-hidden">
          <LogoSwap className="w-[140%] max-w-none select-none" />
        </div>
      </div>
    </section>
  )
}

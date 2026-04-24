import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LogoSwap } from '@/components/ui/LogoSwap'
import { FlowButton } from '@/components/ui/FlowButton'
import { InteractiveProductCard } from '@/components/ui/card-7'

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  mascotRef?: React.RefObject<HTMLImageElement | null>
}

export function HeroSection({ mascotRef }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const phrase1Ref = useRef<HTMLDivElement>(null)
  const phrase2Ref = useRef<HTMLDivElement>(null)
  const phrase3Ref = useRef<HTMLDivElement>(null)
  const offerCardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      defaults: { duration: 1.2, ease: 'power3.out' }
    })

    // WE GROW
    tl.fromTo(phrase1Ref.current,
      { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
      { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14' }
    )

    // WE ROAST
    tl.fromTo(phrase2Ref.current,
      { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
      { clipPath: 'inset(0 0% 0 0)', color: '#043cd5' },
      "-=0.8" // Slight overlap
    )

    // WE DRINK
    tl.fromTo(phrase3Ref.current,
      { clipPath: 'inset(0 100% 0 0)', color: 'rgba(44, 31, 20, 0.15)' },
      { clipPath: 'inset(0 0% 0 0)', color: '#2C1F14' },
      "-=0.8" // Slight overlap
    )

    // Offer Card Reveal
    tl.fromTo(offerCardRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power4.out' },
      "-=0.4"
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-[#F5F0E8]/80">
      {/* pt-20 on wrapper clears the fixed nav (h-20 = 80px) */}
      <div className="flex flex-col lg:flex-row min-h-screen w-full pt-14 sm:pt-20">

        {/* Left column — badge, phrases, CTAs */}
        <div className="flex flex-[1.2] flex-col justify-start pt-10 sm:pt-20 lg:pt-40 items-start px-6 sm:px-8 md:px-12 lg:px-20 gap-6 pb-12">
          {/* Phrase stack — Notable, reveal left-to-right on scroll */}
          <div className="flex flex-col gap-0 items-start -ml-[0.06em]">
            {[
              { ref: phrase1Ref, text: 'WE GROW' },
              { ref: phrase2Ref, text: 'WE ROAST' },
              { ref: phrase3Ref, text: 'WE DRINK' },
            ].map(({ ref, text }) => (
              <div
                key={text}
                ref={ref}
                style={{
                  fontFamily: 'var(--font-brand)',
                  fontSize: 'clamp(2.2rem, 8vw, 4rem)',
                  fontWeight: 900,
                  fontStyle: 'normal',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '-0.05em',
                  lineHeight: 1.0,
                  color: 'rgba(44, 31, 20, 0.15)',
                  clipPath: 'inset(0 100% 0 0)',
                  textAlign: 'left',
                }}
              >
                {text}
              </div>
            ))}
          </div>

          {/* New Sub-copy */}
          <p className="text-[#2C1F14]/60 text-sm md:text-base font-bold uppercase tracking-[0.25em] font-body pl-0 sm:pl-[4.5em]">
            expertos tostadores de café
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 mt-2">
            <FlowButton text="Explorar Catálogo" variant="primary" className="w-full sm:w-auto" />
            <FlowButton text="Nuestro Proceso" variant="outline" className="w-full sm:w-auto" />
          </div>

          {/* Mobile mascot — visible only below lg */}
          <div className="flex lg:hidden justify-center w-full mt-8 pb-8">
            <LogoSwap className="h-[40vw] w-auto max-h-64" />
          </div>
        </div>

        {/* Middle: Floating Offer Card */}
        <div 
          ref={offerCardRef}
          className="hidden xl:flex flex-col items-center justify-center relative z-20 px-8"
        >
          <div className="relative group">
             {/* Decorative badge */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#043cd5] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full z-30 shadow-[0_10px_20px_rgba(4,60,213,0.3)] whitespace-nowrap">
               Oferta de la semana
             </div>
             
             {/* Product Card — slightly scaled down for hero */}
             <div className="scale-90 transform-gpu transition-transform duration-500 group-hover:scale-95">
                <InteractiveProductCard
                  title="Double Roasted"
                  description="Cuerpo y potencia. Notas a cacao puro y tueste intenso."
                  price="16.80€"
                  imageUrl="/assets/double_v.png"
                  logoUrl="https://api.iconify.design/lucide:zap.svg?color=white"
                />
             </div>
             
             {/* Sparkle effects or subtle background glow could go here */}
             <div className="absolute -inset-4 bg-[#043cd5]/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        {/* Right column — transparent mascot, swap on hover */}
        <div className="hidden lg:flex flex-[0.8] items-center justify-center relative">
          <LogoSwap className="w-[200%] scale-[1.8] translate-x-[-15%] max-w-none select-none" />
          {/* Invisible target anchor for IntroOverlay fly-to animation */}
          <img
            ref={mascotRef}
            src="/assets/logosurprised.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none select-none"
          />
        </div>
      </div>
    </section>
  )
}

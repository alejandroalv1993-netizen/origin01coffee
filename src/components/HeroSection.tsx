import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Canvas-based video renderer that removes white background via pixel manipulation.
// mix-blend-mode: multiply is buggy on <video> in Chrome with hardware acceleration.
function VideoCanvas({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const draw = () => {
      const video = videoRef.current
      if (!video || video.readyState < 2) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth || 960
        canvas.height = video.videoHeight || 540
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Remove white/near-white background: any pixel with high luminance and low saturation
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2]
        // Threshold: pixel is "white background" if all channels > 220
        if (r > 220 && g > 220 && b > 220) {
          data[i + 3] = 0 // set alpha to 0 (transparent)
        }
      }
      ctx.putImageData(imageData, 0, 0)

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [videoRef])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full object-contain"
      style={{ display: 'block' }}
    />
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const phrase1Ref = useRef<HTMLDivElement>(null)
  const phrase2Ref = useRef<HTMLDivElement>(null)
  const phrase3Ref = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  useGSAP(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    initializedRef.current = false

    const initAnimation = () => {
      if (initializedRef.current) return
      initializedRef.current = true

      const duration = video.duration

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=500%',
        },
      })

      const proxy = { t: 0 }
      tl.to(proxy, {
        t: duration,
        duration: 3,
        ease: 'none',
        onUpdate() {
          video.currentTime = proxy.t
        },
      }, 0)

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

      // WE DRINK — 66–90%
      tl.fromTo(phrase3Ref.current,
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

    return () => {
      if (listenerAttached) video.removeEventListener('loadedmetadata', initAnimation)
      initializedRef.current = false
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-[#F5F0E8]">
      {/*
        h-screen on wrapper, pt-20 accounts for the fixed nav (h-20 = 80px).
        Using padding on the outer row so BOTH columns shift down equally.
      */}
      <div className="flex h-screen w-full pt-20">

        {/* Left column */}
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

          {/* Phrase stack */}
          <div className="flex flex-col gap-1">
            <div
              ref={phrase1Ref}
              className="font-heading font-black uppercase italic leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'rgba(44, 31, 20, 0.15)', clipPath: 'inset(0 100% 0 0)' }}
            >
              WE GROW
            </div>
            <div
              ref={phrase2Ref}
              className="font-heading font-black uppercase italic leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'rgba(44, 31, 20, 0.15)', clipPath: 'inset(0 100% 0 0)' }}
            >
              WE ROAST
            </div>
            <div
              ref={phrase3Ref}
              className="font-heading font-black uppercase italic leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'rgba(44, 31, 20, 0.15)', clipPath: 'inset(0 100% 0 0)' }}
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

        {/* Right column — canvas renders video frames with white removed */}
        <div className="hidden md:flex w-[40vw] items-end justify-center bg-[#F5F0E8]">
          {/* Hidden video drives currentTime; VideoCanvas reads frames */}
          <video
            ref={videoRef}
            src="/assets/video_optimizado2.mp4"
            preload="auto"
            muted
            playsInline
            className="hidden"
          />
          <VideoCanvas videoRef={videoRef} />
        </div>
      </div>
    </section>
  )
}

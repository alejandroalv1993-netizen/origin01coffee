// ORIGIN-01 | Scrollytelling Implementation
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Sync GSAP with Lenis
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

// Optimize GSAP ticker
gsap.ticker.lagSmoothing(0);

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('scroll-video');
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Ensure metadata is loaded before starting animations
    video.addEventListener('loadedmetadata', () => {
        initScrollytelling(video);
    });

    // Fallback if metadata is already loaded
    if (video.readyState >= 2) {
        initScrollytelling(video);
    }
});

function initScrollytelling(video) {
    const canvas = document.getElementById('hero-canvas');
    const renderMascot = initChromaKey(video, canvas);
    
    const duration = video.duration;
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scrolly-hero",
            start: "top top",
            end: "bottom bottom",
            scrub: 2, 
            pin: ".sticky-container",
            anticipatePin: 1
        }
    });

    const videoProxy = { currentTime: 0 };
    tl.to(videoProxy, {
        currentTime: duration,
        duration: 1, 
        ease: "none",
        onUpdate: () => {
            if (video.readyState >= 2) {
                video.currentTime = Math.min(videoProxy.currentTime, duration - 0.05);
                renderMascot(); // Render the processed frame to canvas
            }
        }
    }, 0);

    // Text Animations Sequence
    tl.fromTo(".text-1", 
        { opacity: 0, scale: 0.7, filter: "blur(10px)" }, 
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.1 }, 0.15)
      .to(".text-1", 
        { opacity: 0, scale: 1.3, filter: "blur(10px)", duration: 0.1 }, 0.35);

    tl.fromTo(".text-2", 
        { opacity: 0, scale: 0.7, filter: "blur(10px)" }, 
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.1 }, 0.45)
      .to(".text-2", 
        { opacity: 0, scale: 1.3, filter: "blur(10px)", duration: 0.1 }, 0.65);

    tl.fromTo(".text-3", 
        { opacity: 0, scale: 0.7, filter: "blur(10px)" }, 
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.1 }, 0.75)
      .to(".text-3", 
        { opacity: 0, scale: 1.3, filter: "blur(10px)", duration: 0.1 }, 0.95);

    // Smooth scroll for anchor links using Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            lenis.scrollTo(target, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        });
    });
}

/**
 * Chroma Key Engine
 * Removes the off-white textured background from the video and renders it to canvas
 */
function initChromaKey(video, canvas) {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    function resize() {
        const dpr = 1; // Keeping it at 1 for performance, can increase if hardware allows
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Target: Off-white textured background
    // We use a combination of brightness and saturation to isolate the mascot
    return function render() {
        const w = canvas.width;
        const h = canvas.height;
        
        const vRatio = video.videoWidth / video.videoHeight;
        const cRatio = w / h;
        let dx = 0, dy = 0, dWidth = w, dHeight = h;
        
        if (vRatio > cRatio) {
            dWidth = h * vRatio;
            dx = (w - dWidth) / 2;
        } else {
            dHeight = w / vRatio;
            dy = (h - dHeight) / 2;
        }
        
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(video, dx, dy, dWidth, dHeight);
        
        const frame = ctx.getImageData(0, 0, w, h);
        const data = frame.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i+1], b = data[i+2];
            
            // Calculate Brightness
            const brightness = (r + g + b) / 3;
            
            // Calculate Saturation (how "colorful" the pixel is)
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const saturation = max === 0 ? 0 : (max - min) / max;
            
            // LOGIC: 
            // If the pixel is bright (background is off-white) 
            // AND has low saturation (background is neutral/beige, mascot is vivid blue)
            // We set it to transparent.
            // Brightness > 150 (covers most of the textured off-white)
            // Saturation < 0.4 (covers the neutral background but keeps the blue mascot)
            if (brightness > 140 && saturation < 0.45) {
                // Smooth edge transition based on brightness
                data[i+3] = 0;
            }
        }
        ctx.putImageData(frame, 0, 0);
    };
}

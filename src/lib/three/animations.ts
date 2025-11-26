// Lazy load GSAP để giảm initial bundle size
let gsap: any = null
let ScrollTrigger: any = null

async function loadGSAP() {
  if (typeof window === 'undefined' || gsap) return
  
  const gsapModule = await import('gsap')
  const scrollTriggerModule = await import('gsap/ScrollTrigger')
  
  gsap = gsapModule.gsap
  ScrollTrigger = scrollTriggerModule.ScrollTrigger
  
  gsap.registerPlugin(ScrollTrigger)
}

export async function animateOnScroll(element: string | HTMLElement, options?: {
  y?: number
  opacity?: number
  duration?: number
  delay?: number
}) {
  await loadGSAP()
  if (!gsap || !ScrollTrigger) return

  const {
    y = 50,
    opacity = 0,
    duration = 0.8,
    delay = 0,
  } = options || {}

  gsap.fromTo(
    element,
    {
      y,
      opacity,
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  )
}

export async function parallax(element: string | HTMLElement, speed: number = 0.5) {
  await loadGSAP()
  if (!gsap || !ScrollTrigger) return

  gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export async function staggerReveal(selector: string, delay: number = 0.1) {
  await loadGSAP()
  if (!gsap || !ScrollTrigger) return

  gsap.fromTo(
    selector,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  )
}


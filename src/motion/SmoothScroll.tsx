import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from './gsap'
import { useReducedMotion } from './useReducedMotion'

// Lenis no root, movido pelo ticker do GSAP para o ScrollTrigger ficar em sincronia.
// Com prefers-reduced-motion, o scroll volta a ser o nativo.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    if (reduced) return
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => gsap.ticker.remove(update)
  }, [reduced])

  if (reduced) return children

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}

function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update)
  return null
}

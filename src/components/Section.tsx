import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { gsap, useGSAP } from '@/motion/gsap'

interface SectionProps {
  id: string
  titulo: string
  children: ReactNode
  className?: string
}

// Seção com título e revelação no scroll. Elementos com `data-reveal` entram
// em sequência; com reduced-motion, só um fade curto.
export function Section({ id, titulo, children, className }: SectionProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const scrollTrigger = { trigger: ref.current, start: 'top 75%' }
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-reveal]', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger,
        })
      })
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.from('[data-reveal]', { opacity: 0, duration: 0.3, scrollTrigger })
      })
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={cn('mx-auto max-w-5xl px-6 py-24', className)}
    >
      <h2 id={`${id}-titulo`} data-reveal className="mb-8 text-3xl font-semibold">
        {titulo}
      </h2>
      {children}
    </section>
  )
}

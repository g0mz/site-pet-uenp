import { lazy, Suspense, useRef } from 'react'
import { nextEvent } from '@/content/next-event'
import { gsap, useGSAP } from '@/motion/gsap'
import { NextEventBlock } from './NextEventBlock'

const HeroScene = lazy(() => import('@/three/HeroScene'))

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  // Único momento orquestrado da página: o título entra quando ela abre.
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-entra]', { y: 48, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
      })
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate overflow-hidden px-5 pt-14 pb-24 md:pt-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.15fr_1fr]">
        <div>
          <h1 id="inicio-titulo" className="leading-[0.9] font-semibold">
            <span data-entra className="block text-[clamp(3.4rem,11vw,8.5rem)] text-mata">
              Quintas da Ciência
            </span>
            <span data-entra className="mt-3 block font-sans text-xl font-bold md:text-2xl">
              do PET Biologia da UENP, em Bandeirantes
            </span>
          </h1>
          <p data-entra className="mt-8 max-w-xl text-lg md:text-xl">
            Uma feira de ciências em forma de percurso. Escolas e comunidade passam pelos Sítios
            Científicos montados pelo PET Biologia, cada um apadrinhado por um personagem do Sítio do
            Picapau Amarelo.
          </p>
          <div data-entra className="mt-10 max-w-lg">
            <NextEventBlock event={nextEvent} />
          </div>
        </div>
        <div className="relative aspect-square w-full max-w-md justify-self-center md:max-w-none">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

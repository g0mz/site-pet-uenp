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
      className="relative isolate overflow-hidden bg-mata-escura px-5 pt-10 pb-20 text-papel md:flex md:min-h-[calc(100svh-4.5rem)] md:items-center md:py-20"
    >
      {/* A amonite é a peça do hero: grande, vazando pela direita, atrás do texto no desktop. */}
      <div className="relative -mr-5 ml-auto aspect-square w-[78vw] max-w-sm md:absolute md:top-1/2 md:right-[-8vw] md:m-0 md:w-[min(62vw,52rem)] md:max-w-none md:-translate-y-1/2">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      <div className="relative mx-auto w-full max-w-6xl">
        <h1 id="inicio-titulo" className="-mt-16 max-w-3xl leading-[0.88] font-semibold md:mt-0">
          <span data-entra className="block text-[clamp(3.6rem,10vw,8.5rem)]">
            Quintas da Ciência
          </span>
          <span data-entra className="mt-5 block max-w-md font-sans text-xl font-bold text-pena md:text-2xl">
            Feira de ciências do PET Biologia da UENP, em Bandeirantes
          </span>
        </h1>
        <p data-entra className="mt-6 max-w-lg text-lg text-papel/85 md:text-xl">
          Escolas e comunidade fazem um percurso pelos Sítios Científicos, cada um apadrinhado por
          um personagem do Sítio do Picapau Amarelo.
        </p>
        <div data-entra className="mt-10 max-w-md">
          <NextEventBlock event={nextEvent} />
        </div>
      </div>
    </section>
  )
}

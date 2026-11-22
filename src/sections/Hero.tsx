import { lazy, Suspense, useRef } from 'react'
import { nextEvent } from '@/content/next-event'
import { gsap, MOVIMENTO, useGSAP } from '@/motion/gsap'
import { NextEventBlock } from './NextEventBlock'

const HeroScene = lazy(() => import('@/three/HeroScene'))

// Nuvem fofa desenhada com círculos (viewBox 200x90).
function Nuvem({ className }: { className: string }) {
  return (
    <svg data-nuvem viewBox="0 0 200 90" aria-hidden="true" className={`absolute fill-papel ${className}`}>
      <circle cx="55" cy="58" r="30" />
      <circle cx="95" cy="40" r="38" />
      <circle cx="140" cy="55" r="30" />
      <rect x="40" y="55" width="120" height="33" rx="16" />
    </svg>
  )
}

// Brilho de quatro pontas.
function Brilho({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`absolute fill-pena ${className}`}>
      <path d="M12 0 Q13.5 10.5 24 12 Q13.5 13.5 12 24 Q10.5 13.5 0 12 Q10.5 10.5 12 0Z" />
    </svg>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const progresso = useRef(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOVIMENTO, () => {
        // Entrada: o título e o cartão pulam para o lugar quando a página abre.
        gsap.from('[data-entra]', { y: 40, scale: 0.92, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'back.out(1.7)' })

        // Os raios de sol giram sem parar, bem devagar.
        gsap.to('[data-raios]', { rotation: 360, duration: 120, repeat: -1, ease: 'none' })

        // Saída: conforme o palco sobe, os objetos 3D se espalham e as nuvens sobem em velocidades
        // diferentes. O gatilho é o palco para no celular a cena ainda estar montada quando aparece.
        gsap.to('[data-nuvem]', {
          y: (i) => -60 - i * 50,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.timeline({
          scrollTrigger: {
            trigger: '[data-palco]',
            start: 'top 15%',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              progresso.current = self.progress
            },
          },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="inicio-titulo"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#9ad8ff_0%,var(--ceu)_55%,#2f95d6_100%)]"
    >
      {/* Fundo: brilho de sol, raios girando, nuvens e brilhos. Tudo decorativo. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-18rem] size-[34rem] md:right-[-10rem] md:size-[46rem] rounded-full bg-[radial-gradient(circle,rgb(255_207_51/0.75)_0%,rgb(255_207_51/0.25)_35%,transparent_70%)]" />
        <div
          data-raios
          className="absolute -top-[40rem] right-[-34rem] size-[94rem] rounded-full opacity-25 [background:repeating-conic-gradient(from_0deg,#fff_0deg_6deg,transparent_6deg_18deg)] [mask-image:radial-gradient(circle,#000_0%,transparent_60%)]"
        />
        <Nuvem className="top-[8%] left-[-3%] hidden w-72 opacity-90 md:block" />
        <Nuvem className="top-[52%] left-[38%] w-40 opacity-70" />
        <Nuvem className="right-[4%] bottom-[18%] w-64 opacity-80 md:w-80" />
        <Nuvem className="top-[18%] right-[30%] hidden w-28 opacity-60 md:block" />
        <Brilho className="top-[14%] left-[46%] size-6" />
        <Brilho className="top-[70%] left-[6%] size-5" />
        <Brilho className="top-[30%] right-[6%] size-7" />
        <Brilho className="bottom-[26%] left-[52%] hidden size-4 md:block" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center px-5 pt-12 md:min-h-[calc(100svh-4.25rem)] md:grid-cols-[1.25fr_1fr] md:pt-0">
        <div className="relative z-20 md:pb-16">
          <h1
            id="inicio-titulo"
            className="text-[clamp(3.5rem,8.2vw,7.75rem)] leading-[0.92] whitespace-nowrap text-papel [paint-order:stroke_fill] [text-shadow:0_0.08em_0_var(--tinta)] [-webkit-text-stroke:0.07em_var(--tinta)]"
          >
            <span data-entra className="block">Quintas</span>
            <span data-entra className="block">da Ciência</span>
          </h1>
          <p data-entra className="mt-6 max-w-md font-display text-xl font-bold md:text-2xl">
            Feira de ciências do PET Biologia da UENP, em Bandeirantes
          </p>
          <p data-entra className="mt-3 max-w-md text-lg md:text-xl">
            Escolas e comunidade fazem um percurso pelos Sítios Científicos, cada um apadrinhado
            por um personagem do Sítio do Picapau Amarelo.
          </p>
          <div data-entra className="mt-8">
            <NextEventBlock event={nextEvent} />
          </div>
        </div>

        <div data-palco className="relative h-[24rem] md:h-[min(40rem,78svh)]">
          <Suspense fallback={null}>
            <HeroScene progresso={progresso} />
          </Suspense>
        </div>
      </div>
      {/* Gramado que separa o céu do resto da página. */}
      <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="relative z-0 -mt-10 block h-14 w-full md:-mt-16 md:h-20">
        <path d="M0 40 Q360 0 720 36 T1440 28 V80 H0Z" className="fill-grama" />
      </svg>
    </section>
  )
}

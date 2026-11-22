import { lazy, Suspense, useRef } from 'react'
import { galeria } from '@/content/fotos'
import { nextEvent } from '@/content/next-event'
import { gsap, MOVIMENTO, useGSAP } from '@/motion/gsap'
import { NextEventBlock } from './NextEventBlock'

const HeroScene = lazy(() => import('@/three/HeroScene'))

// Duas fotos das edições coladas como figurinhas atrás dos objetos 3D.
const [escavacao, realidadeVirtual] = galeria

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const progresso = useRef(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOVIMENTO, () => {
        // Entrada: o título e o cartão pulam para o lugar quando a página abre.
        gsap.from('[data-entra]', { y: 40, scale: 0.92, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'back.out(1.7)' })

        // Saída: conforme o palco sobe, os objetos 3D se espalham e as figurinhas descolam.
        // O gatilho é o palco, não o hero, para no celular (palco abaixo do texto) a cena
        // ainda estar montada quando aparece.
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
          .to('[data-figurinha="1"]', { y: -160, rotation: -18, ease: 'none' }, 0)
          .to('[data-figurinha="2"]', { y: -260, rotation: 16, ease: 'none' }, 0)
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="inicio" aria-labelledby="inicio-titulo" className="relative isolate overflow-hidden bg-ceu">
      <div className="mx-auto grid max-w-6xl items-center px-5 pt-10 md:min-h-[calc(100svh-4.25rem)] md:grid-cols-[1fr_1.1fr] md:pt-0">
        <div className="relative z-20 md:pb-16">
          <h1 id="inicio-titulo" className="leading-[0.88]">
            <span data-entra className="block text-[clamp(3.4rem,9vw,7.5rem)]">
              Quintas da Ciência
            </span>
            <span data-entra className="mt-5 block max-w-md font-sans text-xl font-bold tracking-normal md:text-2xl">
              Feira de ciências do PET Biologia da UENP, em Bandeirantes
            </span>
          </h1>
          <p data-entra className="mt-5 max-w-md text-lg md:text-xl">
            Escolas e comunidade fazem um percurso pelos Sítios Científicos, cada um apadrinhado
            por um personagem do Sítio do Picapau Amarelo.
          </p>
          <div data-entra className="mt-8">
            <NextEventBlock event={nextEvent} />
          </div>
        </div>

        <div data-palco className="relative h-[22rem] md:h-[min(40rem,78svh)]">
          <img
            data-figurinha="1"
            src={escavacao.src}
            alt={escavacao.alt}
            width={1200}
            height={900}
            className="figurinha absolute top-[16%] left-[8%] w-[46%] -rotate-6 object-cover md:w-[42%]"
          />
          <img
            data-figurinha="2"
            src={realidadeVirtual.src}
            alt={realidadeVirtual.alt}
            width={900}
            height={1200}
            className="figurinha absolute right-[10%] bottom-[12%] aspect-[3/4] w-[34%] rotate-6 object-cover md:w-[30%]"
          />
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

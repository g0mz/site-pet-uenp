import NumberFlow from '@number-flow/react'
import { useEffect, useRef, useState } from 'react'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { editions, local, municipios } from '@/content/editions'
import { galeria } from '@/content/fotos'
import { gsap, MOVIMENTO, useGSAP } from '@/motion/gsap'

// Conta de 0 até o total quando o número aparece na tela.
function Contagem({ valor }: { valor: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setAtual(valor)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [valor])

  return (
    <span ref={ref}>
      <NumberFlow value={atual} locales="pt-BR" />
    </span>
  )
}

// Fotos da colagem: paisagem ocupa duas colunas. Só as quatro primeiras aparecem no celular.
const colagem = [galeria[0], galeria[2], galeria[4], galeria[3], galeria[5], galeria[6]]
const giros = ['-rotate-2', 'rotate-3', '-rotate-3', 'rotate-2', 'rotate-1', '-rotate-2']

export function Editions() {
  const ref = useRef<HTMLElement>(null)

  // Efeito da seção: as fotos chegam espalhadas e tortas e se colam no lugar conforme a página rola.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOVIMENTO, () => {
        gsap.from('[data-colagem] > li', {
          x: () => gsap.utils.random(-320, 320),
          y: () => gsap.utils.random(180, 420),
          rotation: () => gsap.utils.random(-40, 40),
          opacity: 0,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-colagem]', start: 'top 90%', end: 'top 35%', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Section ref={ref} id="edicoes" titulo="Duas edições, mais de 1.400 visitantes">
      <dl className="grid gap-6 sm:grid-cols-2 sm:gap-10">
        {editions.map((ed, i) => (
          <div
            key={ed.numero}
            className={`rounded-2xl border-2 border-tinta p-6 shadow-[0_6px_0_var(--tinta)] ${i ? 'rotate-1 bg-ceu-claro' : '-rotate-1 bg-pena'}`}
          >
            <dt className="text-lg">
              <span className="font-bold">{ed.numero}</span>, {ed.datas}
            </dt>
            <dd className="mt-2">
              <span className="font-display text-6xl font-extrabold md:text-7xl">
                <Contagem valor={ed.participantes} />
              </span>
              <span className="mt-1 block text-lg">participantes</span>
            </dd>
          </div>
        ))}
      </dl>

      <ul data-colagem className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {colagem.map((f, i) => (
          <li key={f.src} className={`${f.paisagem ? 'col-span-2' : ''} ${i > 3 ? 'hidden md:block' : ''}`}>
            <img
              src={f.src}
              alt={f.alt}
              loading="lazy"
              className={`figurinha w-full object-cover ${giros[i]} ${f.paisagem ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-[3/4] md:aspect-auto md:h-full'}`}
            />
          </li>
        ))}
      </ul>

      <div className="mt-14 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <p className="max-w-prose text-lg">
          As duas edições aconteceram no {local}. Vieram escolas estaduais e municipais de{' '}
          {municipios.slice(0, -1).join(', ')} e {municipios.at(-1)}, a APAE e moradores da região.
        </p>
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="lg" className="h-12 justify-self-start rounded-full px-6 text-base">
              Ver todas as fotos
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[92svh]">
            <DrawerHeader>
              <DrawerTitle className="font-display text-3xl font-extrabold">Fotos das edições</DrawerTitle>
              <DrawerDescription>Novembro de 2025 e junho de 2026.</DrawerDescription>
            </DrawerHeader>
            <div className="overflow-y-auto px-4 pb-8" data-lenis-prevent>
              <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4">
                {galeria.map((f) => (
                  <li key={f.src} className={f.paisagem ? 'col-span-2' : ''}>
                    <img
                      src={f.src}
                      alt={f.alt}
                      loading="lazy"
                      className={`w-full rounded-xl object-cover ${f.paisagem ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </Section>
  )
}

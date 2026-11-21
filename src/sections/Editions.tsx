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

export function Editions() {
  return (
    <Section id="edicoes" titulo="Duas edições, mais de 1.400 visitantes">
      <dl className="grid gap-10 sm:grid-cols-2">
        {editions.map((ed) => (
          <div key={ed.numero} className="border-t-4 border-mata pt-5">
            <dt className="text-lg">
              <span className="font-bold">{ed.numero}</span>, {ed.datas}
            </dt>
            <dd className="mt-2">
              <span className="font-display text-6xl font-semibold text-mata md:text-7xl">
                <Contagem valor={ed.participantes} />
              </span>
              <span className="mt-1 block text-lg">participantes</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
        <p className="max-w-prose text-lg">
          As duas edições aconteceram no {local}. Vieram escolas estaduais e municipais de{' '}
          {municipios.slice(0, -1).join(', ')} e {municipios.at(-1)}, a APAE e moradores da região.
        </p>
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="lg" className="h-12 justify-self-start px-6 text-base">
              Ver fotos das edições
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[92svh]">
            <DrawerHeader>
              <DrawerTitle className="font-display text-3xl">Fotos das edições</DrawerTitle>
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
                      className={`w-full rounded-sm object-cover ${f.paisagem ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}
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

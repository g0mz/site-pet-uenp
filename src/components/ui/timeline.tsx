// Baseado no Timeline da Aceternity UI (ui.aceternity.com/components/timeline),
// retematizado: trilha amarela, paradas vermelhas, título serifado. É o destaque único da página.
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export interface TimelineEntry {
  title: string
  content: ReactNode
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const trilhaRef = useRef<HTMLOListElement>(null)
  const [altura, setAltura] = useState(0)
  const reduzido = useReducedMotion()

  // A altura muda quando as fotos carregam; mede de novo a cada mudança.
  useEffect(() => {
    const el = trilhaRef.current
    if (!el) return
    const observer = new ResizeObserver(() => setAltura(el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({ target: trilhaRef, offset: ['start 60%', 'end 60%'] })
  const alturaTrilha = useTransform(scrollYProgress, [0, 1], [0, altura])

  return (
    <div className="relative">
      <ol ref={trilhaRef} className="relative">
        {data.map((item, i) => (
          <li key={item.title} className="flex justify-start pt-12 md:gap-10 md:pt-32 first:pt-4">
            <div className="sticky top-28 z-10 flex flex-col self-start md:w-72 md:shrink-0 md:flex-row md:items-start lg:w-96">
              <div className="absolute left-2 flex h-9 w-9 items-center justify-center rounded-full bg-mata-escura">
                <div className="h-4 w-4 rounded-full border-2 border-pena bg-crista" />
              </div>
              <div className="hidden md:block md:pl-20">
                <span className="font-display text-lg text-pena">Parada {i + 1}</span>
                <h3 className="text-3xl leading-tight font-semibold hyphens-auto text-papel lg:text-4xl">{item.title}</h3>
              </div>
            </div>
            <div className="relative w-full pr-2 pl-16 md:pl-4">
              <div className="mb-4 md:hidden">
                <span className="font-display text-base text-pena">Parada {i + 1}</span>
                <h3 className="text-3xl leading-tight font-semibold text-papel">{item.title}</h3>
              </div>
              {item.content}
            </div>
          </li>
        ))}
      </ol>
      <div
        aria-hidden="true"
        style={{ height: altura }}
        className="absolute top-0 left-[1.625rem] w-1 overflow-hidden rounded-full bg-papel/15"
      >
        <motion.div
          style={{ height: reduzido ? altura : alturaTrilha }}
          className="absolute inset-x-0 top-0 w-1 rounded-full bg-pena"
        />
      </div>
    </div>
  )
}

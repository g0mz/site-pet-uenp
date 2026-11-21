import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  titulo: string
  children: ReactNode
  className?: string
}

// Casca das seções: âncora, título acessível e largura de leitura.
export function Section({ id, titulo, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn('scroll-mt-20 px-5 py-20 md:py-28', className)}>
      <div className="mx-auto max-w-6xl">
        <h2 id={`${id}-titulo`} className="mb-10 max-w-3xl text-4xl leading-[1.05] font-semibold md:text-6xl">
          {titulo}
        </h2>
        {children}
      </div>
    </section>
  )
}

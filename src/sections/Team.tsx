import { useRef } from 'react'
import { Section } from '@/components/Section'
import { apoio, coordenacao, grupos } from '@/content/team'
import { gsap, MOVIMENTO, useGSAP } from '@/motion/gsap'

// Cor e giro de cada selo, na ordem dos grupos.
const selos = ['bg-pena -rotate-2', 'bg-ceu-claro rotate-2', 'bg-papel -rotate-1']

export function Team() {
  const ref = useRef<HTMLElement>(null)

  // Efeito da seção: os selos caem do alto e quicam até parar, um de cada vez.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOVIMENTO, () => {
        gsap.from('[data-selo]', {
          y: -220,
          rotation: () => gsap.utils.random(-25, 25),
          opacity: 0,
          duration: 1.1,
          ease: 'bounce.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-selos]', start: 'top 75%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Section ref={ref} id="equipe" titulo="Quem faz" className="bg-ceu">
      <div data-selos className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div data-selo className="rounded-2xl border-2 border-tinta bg-tinta p-6 text-papel shadow-[0_6px_0_var(--crista)] lg:rotate-1">
          <p className="text-lg">{coordenacao.papel}</p>
          <p className="mt-2 font-display text-2xl leading-tight font-extrabold text-pena">{coordenacao.nome}</p>
        </div>
        {grupos.map((g, i) => (
          <div
            key={g.nome}
            data-selo
            className={`rounded-2xl border-2 border-tinta p-6 shadow-[0_6px_0_var(--tinta)] ${selos[i]}`}
          >
            <h3 className="text-2xl leading-tight">{g.nome}</h3>
            <p className="mt-3 text-lg">{g.texto}</p>
          </div>
        ))}
      </div>
      <p className="mt-14 text-lg">Com apoio do {apoio.join(' e da ')}.</p>
    </Section>
  )
}

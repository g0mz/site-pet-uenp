import { useRef, type CSSProperties } from 'react'
import { Section } from '@/components/Section'
import { fotos } from '@/content/fotos'
import { gsap, MOVIMENTO, useGSAP } from '@/motion/gsap'

// Posição inicial da lupa sobre a foto (também a posição fixa com reduced-motion).
const lupaInicial = { '--lx': '30%', '--ly': '42%' } as CSSProperties

export function About() {
  const ref = useRef<HTMLElement>(null)

  // Efeito da seção: a lupa passeia pela foto conforme a página rola e amplia o que está embaixo.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOVIMENTO, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: '[data-lupa-foto]', start: 'top 85%', end: 'bottom 15%', scrub: true },
            defaults: { ease: 'sine.inOut' },
          })
          .to('[data-lupa-foto]', { '--lx': '55%', '--ly': '62%' })
          .to('[data-lupa-foto]', { '--lx': '76%', '--ly': '38%' })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Section ref={ref} id="sobre" titulo="Ciência fora da sala de aula">
      <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:items-center">
        <div className="max-w-prose space-y-5 text-lg">
          <p>
            O Quintas da Ciência é um espaço de popularização da ciência que aproxima a
            universidade, as escolas e a comunidade com experiências interativas, exposições,
            oficinas e jogos.
          </p>
          <p>
            A ideia veio das Quintas Ciência Viva, de Portugal. Aqui, o percurso é dividido em
            estações chamadas Sítios Científicos, e os personagens de Monteiro Lobato conduzem os
            visitantes de uma estação a outra.
          </p>
          <p>
            Cada sítio trata um tema das Ciências Biológicas, ligado à literatura, às tecnologias
            digitais e à sustentabilidade.
          </p>
        </div>
        <figure className="-rotate-2">
          <div
            data-lupa-foto
            style={lupaInicial}
            className="figurinha relative [--r:4rem] md:[--r:6rem]"
          >
            <img
              src={fotos.equipe.src}
              alt={fotos.equipe.alt}
              width={1200}
              height={900}
              loading="lazy"
              className="block aspect-[4/3] w-full rounded-xl object-cover"
            />
            {/* Cópia ampliada, recortada no círculo da lente. O recorte escala junto, por isso r/1,8. */}
            <img
              src={fotos.equipe.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full scale-[1.8] rounded-xl object-cover [clip-path:circle(calc(var(--r)/1.8)_at_var(--lx)_var(--ly))] [transform-origin:var(--lx)_var(--ly)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-(--ly) left-(--lx) size-[calc(var(--r)*2)] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-tinta"
            >
              <div className="absolute top-[88%] left-[88%] h-5 w-[70%] origin-left rotate-45 rounded-full bg-crista" />
            </div>
          </div>
          <figcaption className="mt-4 text-base text-muted-foreground">
            A equipe na entrada do Auditório Thomaz Nicoletti, no Campus Luiz Meneghel.
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}

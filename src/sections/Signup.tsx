import { useRef } from 'react'
import { Section } from '@/components/Section'
import { nextEvent } from '@/content/next-event'
import { site } from '@/content/site'
import { gsap, MOVIMENTO, useGSAP } from '@/motion/gsap'
import { NextEventBlock } from './NextEventBlock'

// A borda de cima da faixa amarela é uma onda. Os dois desenhos têm os mesmos pontos,
// então o GSAP interpola um no outro.
const ONDA_INICIO = 'M0 56 Q360 8 720 56 T1440 56 V80 H0Z'
const ONDA_FIM = 'M0 56 Q360 104 720 56 T1440 56 V80 H0Z'

export function Signup() {
  const ref = useRef<HTMLElement>(null)
  const { email, instagram } = site.contatos

  // Efeito da seção: a onda vira do avesso conforme a faixa amarela sobe.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOVIMENTO, () => {
        gsap.to('[data-onda]', {
          attr: { d: ONDA_FIM },
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'top 30%', scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Section ref={ref} id="participar" titulo="Como participar" className="relative bg-pena">
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute bottom-[calc(100%-1px)] left-0 block h-12 w-full md:h-20"
      >
        <path data-onda d={ONDA_INICIO} className="fill-pena" />
      </svg>
      <div className="grid gap-12 md:grid-cols-2">
        <div className="max-w-prose space-y-6 text-lg">
          <p>
            O percurso foi pensado para turmas do 6º ao 9º ano, mas é aberto à comunidade. Não
            precisa saber nada de ciência para aproveitar.
          </p>
          {site.comoAgendar && <p>{site.comoAgendar}</p>}
          <NextEventBlock event={nextEvent} />
        </div>
        <div>
          <h3 className="text-2xl">Fale com a equipe</h3>
          {email || instagram ? (
            <ul className="mt-4 space-y-3 text-lg">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="underline decoration-2 underline-offset-4">
                    {email}
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4">
                    Instagram do PET Biologia
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <p className="mt-4 text-lg">Os contatos serão publicados aqui em breve.</p>
          )}
        </div>
      </div>
    </Section>
  )
}

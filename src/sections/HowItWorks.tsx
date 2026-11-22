import { useRef } from 'react'
import { outrosSitios, sitios } from '@/content/sitios'
import { gsap, MOVIMENTO, useGSAP } from '@/motion/gsap'

// Distância entre o topo da tela e o primeiro cartão grudado (abaixo do cabeçalho).
const TOPO_REM = 6
// Cada cartão gruda um pouco mais baixo que o anterior, para a pilha mostrar as bordas.
const DEGRAU_REM = 1.25

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null)

  // Efeito da seção: os sítios são figurinhas que se empilham. Quando a próxima chega,
  // a anterior encolhe e entorta, como se ficasse colada embaixo.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOVIMENTO, () => {
        const itens = gsap.utils.toArray<HTMLElement>('[data-parada]')
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
        itens.slice(0, -1).forEach((item, i) => {
          const topo = (TOPO_REM + DEGRAU_REM * (i + 1)) * rem
          gsap.to(item.querySelector('[data-cartao]'), {
            scale: 0.9,
            rotation: i % 2 ? 4 : -4,
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: { trigger: itens[i + 1], start: 'top bottom', end: `top ${topo}px`, scrub: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="percurso" aria-labelledby="percurso-titulo" className="scroll-mt-20 bg-grama px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 id="percurso-titulo" className="max-w-3xl text-4xl leading-[1.02] md:text-6xl">
          O percurso pelos Sítios Científicos
        </h2>
        <p className="mt-6 max-w-2xl text-lg md:text-xl">
          A visita é uma caminhada. Cada parada é um sítio com um tema, material para tocar e
          gente do PET para conversar. Estes foram os sítios da 2ª edição.
        </p>

        <ol className="mt-14 space-y-10 pb-10">
          {sitios.map((s, i) => (
            <li
              key={s.nome}
              data-parada
              className="sticky"
              style={{ top: `${TOPO_REM + DEGRAU_REM * i}rem` }}
            >
              <article
                data-cartao
                className="figurinha mx-auto grid max-w-4xl gap-5 p-4 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-8 md:p-6"
              >
                <img
                  src={s.foto.src}
                  alt={s.foto.alt}
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-xl object-cover md:aspect-[4/3]"
                />
                <div className="px-1 pb-2">
                  <span className="inline-block rotate-[-3deg] rounded-full bg-pena px-4 py-1 font-display text-lg font-bold">
                    Parada {i + 1}
                  </span>
                  <h3 className="mt-3 text-3xl leading-tight md:text-4xl">{s.nome}</h3>
                  <p className="mt-3 text-lg">{s.texto}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-lg">
          Também já fizeram parte do percurso: {outrosSitios.join(' e ')}.
        </p>
      </div>
    </section>
  )
}

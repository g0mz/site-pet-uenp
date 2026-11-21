import { Timeline } from '@/components/ui/timeline'
import { outrosSitios, sitios } from '@/content/sitios'

// O percurso pelos Sítios Científicos: o destaque único da página.
export function HowItWorks() {
  const paradas = sitios.map((s) => ({
    title: s.nome,
    content: (
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <img
          src={s.foto.src}
          alt={s.foto.alt}
          width={900}
          height={1200}
          loading="lazy"
          className="aspect-[4/5] w-full max-w-sm rounded-md object-cover"
        />
        <p className="max-w-sm text-lg text-papel/90 md:text-xl">{s.texto}</p>
      </div>
    ),
  }))

  return (
    <section id="percurso" aria-labelledby="percurso-titulo" className="scroll-mt-20 bg-mata-escura px-5 py-20 text-papel md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 id="percurso-titulo" className="max-w-3xl text-4xl leading-[1.05] font-semibold md:text-6xl">
          O percurso pelos Sítios Científicos
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-papel/85 md:text-xl">
          A visita é uma caminhada. Cada parada é um sítio com um tema, material para tocar e
          gente do PET para conversar. Estes foram os sítios da 2ª edição.
        </p>
        <div className="mt-12">
          <Timeline data={paradas} />
        </div>
        <p className="mt-16 max-w-2xl text-lg text-papel/85">
          Também já fizeram parte do percurso: {outrosSitios.join(' e ')}.
        </p>
      </div>
    </section>
  )
}

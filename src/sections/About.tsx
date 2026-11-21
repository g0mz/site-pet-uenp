import { Section } from '@/components/Section'
import { fotos } from '@/content/fotos'

export function About() {
  return (
    <Section id="sobre" titulo="Ciência fora da sala de aula" className="bg-folha">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
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
        <figure>
          <img
            src={fotos.equipe.src}
            alt={fotos.equipe.alt}
            width={1200}
            height={900}
            loading="lazy"
            className="w-full rounded-md object-cover"
          />
          <figcaption className="mt-3 text-base text-muted-foreground">
            A equipe na entrada do Auditório Thomaz Nicoletti, no Campus Luiz Meneghel.
          </figcaption>
        </figure>
      </div>
    </Section>
  )
}

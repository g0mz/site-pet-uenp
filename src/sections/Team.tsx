import { Section } from '@/components/Section'
import { apoio, coordenacao, grupos } from '@/content/team'

export function Team() {
  return (
    <Section id="equipe" titulo="Quem faz" className="bg-folha">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-display text-2xl leading-snug font-semibold">{coordenacao.nome}</p>
          <p className="mt-1 text-lg text-muted-foreground">{coordenacao.papel}</p>
        </div>
        <ul className="space-y-8">
          {grupos.map((g) => (
            <li key={g.nome} className="max-w-prose">
              <h3 className="text-2xl font-semibold">{g.nome}</h3>
              <p className="mt-2 text-lg">{g.texto}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-14 text-lg">
        Com apoio do {apoio.join(' e da ')}.
      </p>
    </Section>
  )
}

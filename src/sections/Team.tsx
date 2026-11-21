import { Section } from '@/components/Section'
import { team } from '@/content/team'

export function Team() {
  return (
    <Section id="equipe" titulo="Equipe">
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {team.map((p) => (
          <li key={p.nome} data-reveal className="rounded-xl border p-6">
            {p.foto && (
              <img src={p.foto} alt="" width={160} height={160} loading="lazy" className="mb-4 rounded-full" />
            )}
            <p className="font-semibold">{p.nome}</p>
            <p className="text-sm text-muted-foreground">{p.funcao}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

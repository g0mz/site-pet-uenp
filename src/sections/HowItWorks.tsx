import { Section } from '@/components/Section'
import { site } from '@/content/site'

export function HowItWorks() {
  return (
    <Section id="como-funciona" titulo="Como funciona">
      <ol className="grid gap-6 md:grid-cols-3">
        {site.comoFunciona.map((passo, i) => (
          <li key={passo.titulo} data-reveal className="rounded-xl border p-6">
            <span className="text-sm text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 text-xl font-semibold">{passo.titulo}</h3>
            <p className="mt-2 text-muted-foreground">{passo.texto}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

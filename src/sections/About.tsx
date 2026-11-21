import { Section } from '@/components/Section'
import { site } from '@/content/site'

export function About() {
  return (
    <Section id="sobre" titulo="Sobre o evento">
      <p data-reveal className="max-w-2xl text-lg">{site.sobre}</p>
    </Section>
  )
}

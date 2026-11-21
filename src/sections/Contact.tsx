import { Section } from '@/components/Section'
import { site } from '@/content/site'

export function Contact() {
  const { email, instagram, whatsapp } = site.contatos
  const links = [
    { label: 'E-mail', href: `mailto:${email}` },
    { label: 'Instagram', href: instagram },
    { label: 'WhatsApp', href: whatsapp },
  ]

  return (
    <Section id="contato" titulo="Contato">
      <ul className="flex flex-wrap gap-4">
        {links.map((l) => (
          <li key={l.label} data-reveal>
            <a
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

import { SmoothScroll } from '@/motion/SmoothScroll'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Editions } from '@/sections/Editions'
import { Hero } from '@/sections/Hero'
import { HowItWorks } from '@/sections/HowItWorks'
import { Signup } from '@/sections/Signup'
import { Team } from '@/sections/Team'
import { site } from '@/content/site'

const nav = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#edicoes', label: 'Edições' },
  { href: '#equipe', label: 'Equipe' },
  { href: '#inscricao', label: 'Inscrição' },
  { href: '#contato', label: 'Contato' },
]

export default function App() {
  return (
    <SmoothScroll>
      <nav aria-label="Seções" className="fixed inset-x-0 top-0 z-50 flex justify-center gap-4 p-4 text-sm">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className="hover:underline">
            {n.label}
          </a>
        ))}
      </nav>
      <Hero />
      <main>
        <About />
        <HowItWorks />
        <Editions />
        <Team />
        <Signup />
        <Contact />
      </main>
      <footer className="px-6 py-12 text-center text-sm text-muted-foreground">
        {site.nome} · {site.organizacao}
      </footer>
    </SmoothScroll>
  )
}

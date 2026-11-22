import { SmoothScroll } from '@/motion/SmoothScroll'
import { About } from '@/sections/About'
import { Editions } from '@/sections/Editions'
import { Hero } from '@/sections/Hero'
import { HowItWorks } from '@/sections/HowItWorks'
import { Signup } from '@/sections/Signup'
import { Team } from '@/sections/Team'

const nav = [
  { href: '#sobre', label: 'O que é' },
  { href: '#percurso', label: 'Percurso' },
  { href: '#edicoes', label: 'Edições' },
  { href: '#equipe', label: 'Quem faz' },
]

export default function App() {
  return (
    <SmoothScroll>
      <header className="sticky top-0 z-50 border-b-2 border-tinta bg-papel">
        <nav aria-label="Seções" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#inicio" className="font-display text-xl font-extrabold tracking-tight">
            Quintas da Ciência
          </a>
          <div className="flex items-center gap-6">
            <ul className="hidden gap-6 md:flex">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="underline-offset-4 hover:underline">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#participar" className="rounded-full border-2 border-tinta bg-pena px-5 py-2 font-bold shadow-[0_3px_0_var(--tinta)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none">
              Participar
            </a>
          </div>
        </nav>
      </header>
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <Editions />
        <Team />
        <Signup />
      </main>
      <footer className="bg-tinta px-5 py-10 text-papel">
        <p className="mx-auto max-w-6xl">
          Quintas da Ciência da UENP, um projeto do PET Biologia no Campus Luiz Meneghel, em
          Bandeirantes (PR).
        </p>
      </footer>
    </SmoothScroll>
  )
}

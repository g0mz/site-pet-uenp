import { Section } from '@/components/Section'
import { nextEvent } from '@/content/next-event'
import { site } from '@/content/site'
import { NextEventBlock } from './NextEventBlock'

export function Signup() {
  const { email, instagram } = site.contatos

  return (
    <Section id="participar" titulo="Como participar">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="max-w-prose space-y-5 text-lg">
          <p>
            O percurso foi pensado para turmas do 6º ao 9º ano, mas é aberto à comunidade. Não
            precisa saber nada de ciência para aproveitar.
          </p>
          {site.comoAgendar && <p>{site.comoAgendar}</p>}
          <NextEventBlock event={nextEvent} />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Fale com a equipe</h3>
          {email || instagram ? (
            <ul className="mt-4 space-y-3 text-lg">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="underline decoration-pena decoration-2 underline-offset-4">
                    {email}
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-pena decoration-2 underline-offset-4">
                    Instagram do PET Biologia
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <p className="mt-4 text-lg text-muted-foreground">Os contatos serão publicados aqui em breve.</p>
          )}
        </div>
      </div>
    </Section>
  )
}

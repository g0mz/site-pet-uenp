import { Section } from '@/components/Section'
import { nextEvent } from '@/content/next-event'
import { NextEventBlock } from './NextEventBlock'

export function Signup() {
  return (
    <Section id="inscricao" titulo="Como se inscrever">
      <p data-reveal className="mb-6 max-w-2xl text-lg">
        {/* TODO(conteúdo): explicar o processo de inscrição */}
        A inscrição é feita pelo link oficial, quando as inscrições abrem.
      </p>
      <div data-reveal className="max-w-md">
        <NextEventBlock event={nextEvent} />
      </div>
    </Section>
  )
}

import { Button } from '@/components/ui/button'
import type { NextEvent } from '@/content/next-event'

const frase: Record<NextEvent['status'], string> = {
  'sem-data': 'em breve',
  'em-breve': 'já tem data marcada.',
  'inscricoes-abertas': 'está com inscrições abertas.',
  encerrado: 'está com inscrições encerradas.',
}

// Cartão do próximo evento, em forma de figurinha. Reage ao status de next-event.ts.
export function NextEventBlock({ event }: { event: NextEvent }) {
  const local = [event.data, event.local].filter(Boolean).join(', ')
  const podeInscrever = event.status === 'inscricoes-abertas' && event.linkInscricao

  return (
    <div
      data-testid="proximo-evento"
      className="inline-block -rotate-1 rounded-2xl border-2 border-tinta bg-papel px-6 py-5 shadow-[0_6px_0_var(--tinta)]"
    >
      <p className="font-display text-2xl leading-snug font-bold md:text-3xl">
        {event.status === 'sem-data' ? `${event.edicao} ${frase['sem-data']}` : `A ${event.edicao} ${frase[event.status]}`}
      </p>
      {local && <p className="mt-2 text-lg">{local}</p>}
      {podeInscrever && (
        <Button asChild size="lg" className="mt-5 rounded-full border-2 border-tinta bg-pena text-tinta hover:bg-pena/85">
          <a href={event.linkInscricao} target="_blank" rel="noopener noreferrer">
            Fazer inscrição
          </a>
        </Button>
      )}
    </div>
  )
}

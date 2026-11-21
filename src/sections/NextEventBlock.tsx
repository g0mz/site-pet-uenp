import { Button } from '@/components/ui/button'
import type { NextEvent } from '@/content/next-event'

const frase: Record<NextEvent['status'], string> = {
  'sem-data': 'vem aí. A data sai em breve.',
  'em-breve': 'já tem data marcada.',
  'inscricoes-abertas': 'está com inscrições abertas.',
  encerrado: 'está com inscrições encerradas.',
}

export function NextEventBlock({ event }: { event: NextEvent }) {
  const local = [event.data, event.local].filter(Boolean).join(', ')
  const podeInscrever = event.status === 'inscricoes-abertas' && event.linkInscricao

  return (
    <div data-testid="proximo-evento" className="border-l-4 border-pena py-1 pl-5">
      <p className="font-display text-2xl leading-snug md:text-3xl">
        A {event.edicao} {frase[event.status]}
      </p>
      {local && <p className="mt-2 text-lg">{local}</p>}
      {podeInscrever && (
        <Button asChild size="lg" className="mt-5 bg-pena text-carvao hover:bg-pena/85">
          <a href={event.linkInscricao} target="_blank" rel="noopener noreferrer">
            Fazer inscrição
          </a>
        </Button>
      )}
    </div>
  )
}

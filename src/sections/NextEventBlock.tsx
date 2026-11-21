import { Button } from '@/components/ui/button'
import type { NextEvent } from '@/content/next-event'

const statusLabel: Record<NextEvent['status'], string> = {
  'sem-data': 'Próxima edição em breve',
  'em-breve': 'Próxima edição',
  'inscricoes-abertas': 'Inscrições abertas',
  encerrado: 'Inscrições encerradas',
}

export function NextEventBlock({ event }: { event: NextEvent }) {
  const temDetalhes = event.status !== 'sem-data'
  const podeInscrever = event.status === 'inscricoes-abertas' && event.linkInscricao

  return (
    <div data-testid="proximo-evento" className="rounded-2xl border bg-background/70 p-6 backdrop-blur">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {statusLabel[event.status]}
      </p>
      {temDetalhes && (
        <>
          <p className="mt-2 text-2xl font-semibold">
            {event.nome} {event.edicao}
          </p>
          <p className="mt-1 text-muted-foreground">
            {[event.data, event.local].filter(Boolean).join(' · ')}
          </p>
          <p className="mt-3">{event.descricao}</p>
        </>
      )}
      {podeInscrever && (
        <Button asChild className="mt-4">
          <a href={event.linkInscricao} target="_blank" rel="noopener noreferrer">
            Inscreva-se
          </a>
        </Button>
      )}
    </div>
  )
}

// Bloco de destaque do próximo evento. Para mudar de fase, troque o `status`.
//   sem-data           -> mostra só que a próxima edição vem aí
//   em-breve           -> mostra data e local, sem botão de inscrição
//   inscricoes-abertas -> mostra o botão de inscrição (exige linkInscricao)
//   encerrado          -> avisa que as inscrições terminaram

export type NextEventStatus =
  | 'sem-data'
  | 'em-breve'
  | 'inscricoes-abertas'
  | 'encerrado'

export interface NextEvent {
  status: NextEventStatus
  edicao: string
  data?: string
  local?: string
  linkInscricao?: string
}

export const nextEvent: NextEvent = {
  status: 'sem-data',
  edicao: '3ª edição',
}

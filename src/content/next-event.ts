// Bloco de destaque do próximo evento. Para mudar de fase, troque o `status`.
//   sem-data           -> "Próxima edição em breve"
//   em-breve           -> mostra data/local, sem botão de inscrição
//   inscricoes-abertas -> mostra o botão de inscrição (exige linkInscricao)
//   encerrado          -> avisa que as inscrições terminaram

export type NextEventStatus =
  | 'sem-data'
  | 'em-breve'
  | 'inscricoes-abertas'
  | 'encerrado'

export interface NextEvent {
  status: NextEventStatus
  nome: string
  edicao: string
  data?: string
  local?: string
  linkInscricao?: string
  descricao: string
}

// TODO(conteúdo): dados reais da próxima edição
export const nextEvent: NextEvent = {
  status: 'sem-data',
  nome: 'Nome do Evento',
  edicao: '2027',
  descricao: 'Descrição provisória da próxima edição.',
}

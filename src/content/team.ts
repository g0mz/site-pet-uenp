export interface Member {
  nome: string
  funcao: string
  foto?: string
}

// TODO(conteúdo): equipe real (fotos em public/equipe/)
export const team: Member[] = [
  { nome: 'Pessoa 1', funcao: 'Coordenação' },
  { nome: 'Pessoa 2', funcao: 'Comunicação' },
  { nome: 'Pessoa 3', funcao: 'Programação' },
]

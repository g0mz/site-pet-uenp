export interface Edition {
  ano: string
  titulo: string
  resumo: string
  destaques: string[]
}

// TODO(conteúdo): edições anteriores reais (e fotos, quando houver)
export const editions: Edition[] = [
  {
    ano: '2025',
    titulo: 'Edição 2025',
    resumo: 'Resumo provisório da edição 2025.',
    destaques: ['Destaque provisório 1', 'Destaque provisório 2'],
  },
  {
    ano: '2024',
    titulo: 'Edição 2024',
    resumo: 'Resumo provisório da edição 2024.',
    destaques: ['Destaque provisório 1', 'Destaque provisório 2'],
  },
]

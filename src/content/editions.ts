export interface Edition {
  numero: string
  datas: string
  participantes: number
}

// Fonte: material/Evento Quintas da Ciência da UENP.md
export const editions: Edition[] = [
  { numero: '1ª edição', datas: '12 e 13 de novembro de 2025', participantes: 721 },
  { numero: '2ª edição', datas: '17 e 18 de junho de 2026', participantes: 730 },
]

export const local = 'Auditório Thomaz Nicoletti, Campus Luiz Meneghel, Bandeirantes'

export const municipios = ['Bandeirantes', 'Itambaracá', 'Barra do Jacaré', 'Andirá', 'Cornélio Procópio']

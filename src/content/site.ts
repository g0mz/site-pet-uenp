// Dados gerais do site. Nome e descrição vêm do .env porque o index.html
// (título e tags OG) também usa os mesmos valores.

export const site = {
  nome: import.meta.env.VITE_SITE_NAME,
  descricao: import.meta.env.VITE_SITE_DESCRIPTION,
  organizacao: 'PET/UENP',
  // TODO(conteúdo): contatos reais
  contatos: {
    email: 'pet@exemplo.com',
    instagram: 'https://instagram.com/exemplo',
    whatsapp: 'https://wa.me/5500000000000',
  },
  // TODO(conteúdo): texto de "sobre" e passos de "como funciona"
  sobre:
    'Texto provisório sobre o evento: o que é, para quem é e por que existe.',
  comoFunciona: [
    { titulo: 'Inscrição', texto: 'Texto provisório sobre a inscrição.' },
    { titulo: 'Programação', texto: 'Texto provisório sobre a programação.' },
    { titulo: 'Certificado', texto: 'Texto provisório sobre o certificado.' },
  ],
} as const

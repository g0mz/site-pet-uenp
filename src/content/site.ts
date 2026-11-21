// Dados gerais. Nome e descrição vêm do .env porque o index.html usa os mesmos valores.

export const site = {
  nome: import.meta.env.VITE_SITE_NAME,
  descricao: import.meta.env.VITE_SITE_DESCRIPTION,
  // TODO(conteúdo): e-mail e Instagram oficiais do PET Biologia
  contatos: {
    email: '',
    instagram: '',
  },
  // TODO(conteúdo): como uma escola agenda a visita
  comoAgendar: '',
}

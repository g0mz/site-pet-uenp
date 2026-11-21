// Fotos das edições 2025 e 2026 (fonte: material/ do evento). Arquivos em public/fotos/.

export interface Foto {
  src: string
  alt: string
  paisagem?: boolean
}

const foto = (arquivo: string, alt: string, paisagem = false): Foto => ({
  src: `${import.meta.env.BASE_URL}fotos/${arquivo}.webp`,
  alt,
  paisagem,
})

export const fotos = {
  equipe: foto(
    'equipe-auditorio',
    'Equipe do Quintas da Ciência, com Emília e Visconde, na entrada do Auditório Thomaz Nicoletti',
    true,
  ),
  paleontologia: foto('paleontologia-mesossauro', 'Docente mostra fósseis ao lado de uma tela com o mesossauro encontrado na região de Guapirama-PR'),
  evolucao: foto('evolucao-humana-cranios', 'Estudante do PET explica réplicas de crânios de hominídeos'),
  educacaoAmbiental: foto('educacao-ambiental-emilia', 'Emília apresenta um jogo de tabuleiro a um grupo de estudantes'),
  biodiversidade: foto('biodiversidade-lupas', 'Estudantes do PET com lupas, cartas e um terrário sobre a mesa verde'),
  adaptacao: foto('inseto-folha', 'Alunos observam na tela a foto de um inseto pousado numa folha'),
  astronomia: foto('astronomia-visconde', 'Visconde de Sabugosa apresenta uma maquete do Sol, da Terra e da Lua'),
}

// Galeria das edições, na ordem em que aparecem.
export const galeria: Foto[] = [
  foto('escavacao-areia', 'Crianças escavam fósseis numa caixa de areia', true),
  foto('realidade-virtual-comunidade', 'Duas visitantes da comunidade experimentam óculos de realidade virtual'),
  foto('fosseis-quadro', 'Estudante do PET mostra um quadro de fósseis a um aluno'),
  foto('realidade-virtual', 'Visitante usa óculos de realidade virtual enquanto a equipe acompanha', true),
  foto('mesa-areia-fosseis', 'Alunos em volta de uma mesa de areia com fósseis'),
  foto('arvore-recados', 'Visitante deixa um recado numa árvore de papelão coberta de papéis coloridos'),
  foto('dona-benta-projecao', 'Grupo de alunos diante de uma projeção, com Dona Benta em primeiro plano'),
  foto('inovacao-tecnologia', 'Alunos no Sítio Científico de Inovação e Tecnologia'),
  foto('mesa-lupas', 'Mesa verde com lupas, cartas e terrário'),
  foto('fosseis-visconde', 'Mesa com fósseis e réguas, ao lado do Visconde'),
  foto('mesas-materiais', 'Equipe explica materiais aos alunos'),
  foto('turma-auditorio', 'Turma de alunos uniformizados no auditório'),
  foto('equipe-montagem', 'Equipe do PET monta materiais sentada no chão do auditório'),
]

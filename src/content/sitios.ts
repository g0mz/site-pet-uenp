import { fotos, type Foto } from './fotos'

// Sítios Científicos da 2ª edição (jun/2026), na ordem do material do evento.
export interface Sitio {
  nome: string
  texto: string
  foto: Foto
}

// TODO(conteúdo): confirmar com a equipe o texto de cada sítio e o personagem padrinho.
export const sitios: Sitio[] = [
  {
    nome: 'Biodiversidade',
    texto: 'A variedade de seres vivos, vista de perto com lupas, cartas e terrários.',
    foto: fotos.biodiversidade,
  },
  {
    nome: 'Adaptação e Seleção Natural',
    texto: 'Por que cada ser vivo tem o corpo e o jeito que tem, e como isso muda ao longo das gerações.',
    foto: fotos.adaptacao,
  },
  {
    nome: 'Paleontologia',
    texto: 'Fósseis de verdade, escavação na areia e o mesossauro encontrado aqui perto, na região de Guapirama.',
    foto: fotos.paleontologia,
  },
  {
    nome: 'Educação Ambiental e Sustentabilidade',
    texto: 'Jogos com a Emília sobre como cuidar do lugar onde a gente vive.',
    foto: fotos.educacaoAmbiental,
  },
  {
    nome: 'Evolução Humana',
    texto: 'Réplicas de crânios de hominídeos para comparar e entender de onde viemos.',
    foto: fotos.evolucao,
  },
]

// Sítios que aparecem nas fotos de edições anteriores.
export const outrosSitios = ['Astronomia', 'Inovação e Tecnologia']

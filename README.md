# site-pet-uenp

Site de divulgação do evento organizado pelo PET/UENP. Página única feita com Vite, React, Tailwind, Lenis, GSAP e React Three Fiber.

## Rodar localmente

Precisa de Node 24 e pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:5173/site-pet-uenp/
```

## Editar o conteúdo

Todo o texto fica em `src/content/`. Não precisa mexer nos componentes.

| Arquivo | O que tem |
|---|---|
| `.env` | URL pública, nome e descrição do site (usados também nas prévias de link) |
| `src/content/next-event.ts` | Bloco do próximo evento. Troque o `status` para mudar de fase |
| `src/content/site.ts` | Contatos e como agendar a visita |
| `src/content/sitios.ts` | Paradas do percurso (Sítios Científicos) |
| `src/content/editions.ts` | Edições anteriores, local e municípios |
| `src/content/team.ts` | Coordenação, grupos e apoio |
| `src/content/fotos.ts` | Fotos e textos alternativos (arquivos em `public/fotos/`) |

### Fases do próximo evento

- `sem-data`: mostra "Próxima edição em breve"
- `em-breve`: mostra nome, data e local
- `inscricoes-abertas`: mostra também o botão de inscrição (preencha `linkInscricao`)
- `encerrado`: avisa que as inscrições terminaram

### O que ainda falta preencher

Todo conteúdo provisório está marcado com `TODO(conteúdo)`:

```bash
git grep "TODO(conteúdo)"
```

- Contatos do PET Biologia e como as escolas agendam a visita (`site.ts`)
- Confirmar o texto e o personagem padrinho de cada sítio (`sitios.ts`)
- Imagem de prévia de link `public/og.png` (1200×630) e a tag no `index.html`

## Publicação

Cada push na `main` roda lint, build e o teste de fumaça, e publica no GitHub Pages. Para trocar de domínio, mude `VITE_SITE_URL` no `.env`.

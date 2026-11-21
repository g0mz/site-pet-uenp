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
| `src/content/site.ts` | Contatos, texto "sobre" e passos de "como funciona" |
| `src/content/editions.ts` | Edições anteriores |
| `src/content/team.ts` | Equipe |

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

- Nome e descrição do evento (`.env`)
- Dados da próxima edição (`next-event.ts`)
- Contatos, "sobre" e "como funciona" (`site.ts`)
- Edições anteriores e fotos (`editions.ts`)
- Equipe e fotos (`team.ts`, fotos em `public/equipe/`)
- Texto do processo de inscrição (`src/sections/Signup.tsx`)
- Imagem de prévia de link `public/og.png` (1200×630) e a tag no `index.html`

## Publicação

Cada push na `main` roda lint, build e o teste de fumaça, e publica no GitHub Pages. Para trocar de domínio, mude `VITE_SITE_URL` no `.env`.

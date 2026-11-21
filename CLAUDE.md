# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Objetivo do site

Site de divulgação de um evento (organizado pelo PET/UENP). Conteúdo previsto:

- edições anteriores do evento
- detalhes do evento e como ele funciona
- pessoas (equipe)
- como se inscrever
- contato
- um espaço de destaque para anunciar o próximo evento quando for marcado. Esse bloco muda com frequência, então o conteúdo dele deve ser fácil de editar sem mexer na estrutura da página.

## Fonte do conteúdo

Todo texto e decisão visual se baseia em `material/` (fora do git, porque o repositório é público):
- `material/originais/`: arquivos que o usuário enviou, intocados.
- `material/*.md`: conversões em Markdown, que são a referência de leitura. Fotos extraídas ficam em `material/imagens/`, com índice descritivo no `.md` do evento.

O evento é o **Quintas da Ciência da UENP**, feira de popularização da ciência do PET Biologia (campus Luiz Meneghel, Bandeirantes), com estações chamadas "Sítios Científicos" e inspiradas no Sítio do Picapau Amarelo. Não invente fatos que não estejam no material. Se faltar algo, pergunte.

## Direção de design (decidida pelo usuário)

- Visual com muito movimento: scroll suave com **Lenis**, animações de scroll com **GSAP** (ScrollTrigger) e objetos 3D.
- Preferência por componentes prontos de bibliotecas em vez de escrever tudo do zero.
- O usuário vai usar skills de design (por exemplo `frontend-design` e `ui-ux-pro-max`) para guiar o visual. Consulte-as antes de montar telas.

## Stack escolhido

Vite + React + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui (Aceternity/Magic UI para efeitos), Lenis (`lenis/react`), GSAP com ScrollTrigger (`@gsap/react`, hook `useGSAP`) e three.js via React Three Fiber + drei. Gerenciador: **pnpm**, Node 24 (fixado em `.nvmrc` e `engines`).

Next.js com Turbopack foi considerado e descartado em favor da simplicidade do Vite. Como o site é uma SPA, título, descrição e tags Open Graph (prévia de link no WhatsApp e no Instagram) vão escritos direto no `index.html`, porque os robôs não executam o JavaScript.

## Decisões de arquitetura (sessão de 2026-11-20)

**Páginas e conteúdo**
- Página única com seções em âncoras (hero/próximo evento, sobre, como funciona, edições anteriores, equipe, inscrição, contato). Sem router. Edições anteriores abrem em modal/drawer a partir de cards. Router só entra se uma edição precisar de página própria.
- Conteúdo em arquivos TS tipados em `src/content/` (`next-event.ts`, `editions.ts`, `team.ts`, `site.ts`). Se pessoas sem conhecimento de código passarem a editar, migrar para JSON/Markdown sem mexer nos componentes.
- `next-event.ts` exporta um objeto com `status: "sem-data" | "em-breve" | "inscricoes-abertas" | "encerrado"`, `nome`, `edicao`, `data?`, `local?`, `linkInscricao?` e `descricao`. O bloco reage ao `status` ("sem-data" mostra "Próxima edição em breve"; o botão de inscrição só aparece em "inscricoes-abertas").
- Inscrição: link externo (Google Forms, Even3, Sympla...) guardado no conteúdo. Sem formulário próprio, para não exigir backend nem lidar com LGPD.
- Contato: só links (`mailto`, Instagram, WhatsApp), sem formulário.
- Conteúdo provisório marcado com `// TODO(conteúdo):`. O README lista o que falta preencher.
- Idioma: só pt-BR. Tema único (sem alternância claro/escuro). Sem analytics por enquanto. Se entrar, usar algo sem cookie (GoatCounter ou Cloudflare Web Analytics).

**Estrutura de pastas**
```
src/
  content/      next-event.ts, editions.ts, team.ts, site.ts
  sections/     Hero, About, HowItWorks, Editions, Team, Signup, Contact
  components/   ui/ (shadcn + Aceternity/Magic UI) e compartilhados
  motion/       SmoothScroll.tsx (Lenis + ScrollTrigger), useReducedMotion
  three/        HeroScene.tsx
  App.tsx, main.tsx, index.css
```
Sem pastas genéricas de hooks/utils antes de precisar.

**Movimento e 3D**
- Um único `<ReactLenis root>` no topo, com `autoRaf: false`, o `gsap.ticker` dirigindo o Lenis e `ScrollTrigger.update` a cada scroll. Cada seção anima com `useGSAP` no próprio escopo.
- Com `prefers-reduced-motion`: Lenis desligado, animações GSAP reduzidas a fade simples e cena 3D estática.
- 3D: um único `<Canvas>` no hero, carregado com `React.lazy` e pausado fora da tela. Geometria procedural (drei/three), sem `.glb` até existir um modelo de verdade.
- Componentes Aceternity/Magic UI adicionados sob demanda pelo registry do shadcn, nunca antecipados.
- Fontes auto-hospedadas via `@fontsource-variable/*`, sem Google Fonts. Inter de placeholder até a etapa de design.

**Qualidade e testes**
- ESLint + `tsc` + build no CI, mais um teste de fumaça com Playwright (a página carrega e o bloco do próximo evento aparece). Sem suíte unitária.
- A regra ECC de TDD com 80% de cobertura (`.claude/rules/ecc/common/testing.md`) **não vale neste projeto**.

**Deploy e git**
- GitHub Pages via GitHub Actions a cada push na `main`. URL inicial `g0mz.github.io/site-pet-uenp`. Domínio e `base` do Vite ficam numa única constante/variável de ambiente (usada também nas URLs absolutas do OG). Ativar o Pages (Settings → Pages → Source: GitHub Actions) é com o usuário.
- Commits direto na `main`, um por etapa, com push.

**Escopo e ordem**
1. Fundação: scaffold, dependências, providers de movimento, seções em esqueleto com placeholders, CI, deploy e CLAUDE.md com os comandos.
2. Design: visual guiado pelas skills `frontend-design`/`ui-ux-pro-max`, em etapa separada.

## Estado do projeto

Fundação (etapa 1) e design (etapa 2) prontos. Faltam do material: contatos do PET Biologia, como escolas agendam a visita, o texto final de cada sítio e `public/og.png` (procure `TODO(conteúdo)`).

Ajustes feitos na fundação em relação às decisões:
- Lint com **oxlint** (o padrão atual do template Vite), não ESLint. Mesmo papel no CI.
- Fonte placeholder **Geist** (veio com o preset Nova do shadcn), não Inter.
- Nome e descrição do site ficam no `.env` (`VITE_SITE_NAME`, `VITE_SITE_DESCRIPTION`), ao lado de `VITE_SITE_URL`, porque o `index.html` (via `%VITE_*%`) e `src/content/site.ts` usam os mesmos valores.
- `pnpm dlx shadcn` falha com pnpm 11. Use `npx shadcn@latest add <item>`.

## Comandos

```bash
pnpm dev                 # servidor local em http://localhost:5173/site-pet-uenp/
pnpm build               # tsc -b + vite build (saída em dist/)
pnpm lint                # oxlint
pnpm typecheck           # tsc -b
pnpm test:e2e            # Playwright contra o build (sobe vite preview na porta 4173)
pnpm test:e2e -g "nome"  # roda um teste isolado pelo título
```

O CI (`.github/workflows/ci.yml`) roda lint, build e e2e em todo push e PR. Na `main`, publica no GitHub Pages.

## Arquitetura

- `src/App.tsx`: cabeçalho fixo (marca, links e botão "Participar"), `<SmoothScroll>` em volta de tudo e as seções em ordem: Hero, O que é (`About`), Percurso (`HowItWorks`), Edições, Quem faz (`Team`), Como participar (`Signup`).
- `src/content/`: `site.ts`, `next-event.ts`, `sitios.ts` (paradas do percurso), `editions.ts`, `team.ts` (coordenação e grupos) e `fotos.ts` (fotos em `public/fotos/*.webp`, sempre com `BASE_URL`).
- `src/motion/`: `gsap.ts` registra ScrollTrigger e `useGSAP` uma vez. `SmoothScroll.tsx` liga o Lenis ao ticker do GSAP. `useReducedMotion.ts`. O GSAP anima só a entrada do título do hero (o único momento orquestrado).
- `src/components/Section.tsx`: casca estática de seção (âncora, título, largura). Não anima.
- `src/sections/NextEventBlock.tsx`: bloco que reage ao `status` do próximo evento, usado no Hero e em "Como participar". Tem `data-testid="proximo-evento"`, que o teste de fumaça usa.
- `src/three/HeroScene.tsx`: amonite procedural (espiral logarítmica com costelas). Export default para o `React.lazy`. O chunk do three.js (~240 kB gzip) só carrega com o hero.

## Design implementado (skill `visual`, workflow de UI)

- Paleta "pica-pau-amarelo" em `src/index.css`: mata `#0f6b3e`, mata-escura `#0a4a2b`, pena `#f2c230`, crista `#c8102e`, carvão `#1a1a1a`, papel `#fff`, folha `#e3efe4`. Disponíveis como classes Tailwind (`bg-mata`, `text-pena`...).
- Tipografia: Fraunces (títulos, com eixos SOFT/WONK) e Atkinson Hyperlegible (corpo, 18 px).
- Camadas de componentes:
  - **Fundações**: shadcn (`button`, `drawer`) sobre Radix.
  - **Especialistas**: Vaul (galeria de fotos em `drawer`) e NumberFlow (contagem de participantes). Sonner e cmdk não entraram porque a página não tem aviso nem busca.
  - **Componente de design (destaque único)**: `src/components/ui/timeline.tsx`, Timeline da Aceternity retematizado como a trilha do percurso. Não adicione outro componente de design na página.
- O hero 3D é discreto de propósito, para não competir com a trilha.

## ECC (Everything Claude Code) instalado só neste projeto

Instalado com `ecc-universal@2.2.3`, perfil `minimal`, alvo `claude-project` e `--no-hooks`:

- Tudo fica em `.claude/` (skills, agentes, comandos, rules). O estado da instalação está em `.claude/ecc/install-state.json`.
- **Nenhum hook foi registrado** (o `.claude/settings.json` não tem entrada de hooks). Não habilite hooks sem o usuário pedir.
- É uma instalação manual por projeto. Não instale também o plugin `ecc@ecc`, porque isso duplica skills e comandos.
- Gerenciar a instalação (rodar no diretório do projeto): `npx ecc-universal@2.2.3 doctor --target claude-project`, `... list-installed` e `... uninstall --dry-run`.
- Em `.claude/rules/ecc/` ficam só `common`, `typescript`, `react` e `web`. As demais já foram apagadas.

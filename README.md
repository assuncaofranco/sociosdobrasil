# Sócios do Brasil

Fábrica de vídeos do canal: economia, política e geopolítica do Brasil, explicadas com dados.
Cada episódio sai em duas versões, longa (YouTube, ~10 min) e curta (TikTok, Reels, Shorts, 60s):
o apresentador narra na câmera e, nos trechos mais complexos, uma animação ocupa a tela com a narração por cima.

As animações são código: [Remotion](https://www.remotion.dev), React renderizado em vídeo.

## Estrutura

```
src/marca/        identidade: cores, tipografia, moldura com rodapé de fontes
src/cenas/        cenas reutilizáveis, alimentadas por dados, nos dois formatos
fontes/           cada fonte de dado: órgão, título, link, data de acesso, período
episodios/
  _modelo/        ponto de partida de um episódio novo
  <NNN-slug>/
    pauta.md      tese, pergunta central, contra-argumento, fontes
    longo.md      roteiro do YouTube, em blocos FALA e CENA <id>
    curto.md      roteiro de 60s: uma ideia, roteiro próprio
    dados.json    números do episódio, cada um apontando para fontes/
    cenas.tsx     composições do episódio, montadas com src/cenas
    gravacao/     takes do apresentador (fora do git)
    saida/        vídeos renderizados (fora do git)
```

## Regras

`npm run validar` roda antes de `dev` e de `render`, e falha quando:

1. um dado não aponta para uma fonte cadastrada; fonte marcada `ilustrativo` só gera aviso, e não vai ao ar;
2. a pauta não tem o contra-argumento preenchido;
3. um roteiro cita uma `CENA` que não existe em `cenas.tsx`;
4. uma cor aparece fora de `src/marca/tema.ts`.

## Fluxo de um episódio

1. Copiar `episodios/_modelo/` para `episodios/<NNN-slug>/` e registrar em `episodios/index.ts`.
2. Pauta: tese e o melhor contra-argumento.
3. Dados, com fonte cadastrada em `fontes/fontes.json`.
4. Roteiros longo e curto.
5. Cenas em `cenas.tsx`. Cada cena vira duas composições: `-h` (16:9) e `-v` (9:16).
6. Gravação e montagem.

## Comandos

```bash
npm run dev                                                  # Studio no navegador, preview das cenas
npm run render -- <composição> episodios/<ep>/saida/x.mp4    # MP4 H.264
npm run validar                                              # só as regras
```

Para sobrepor a cena no vídeo gravado, com fundo transparente:
`--codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png`.

## Primeira vez

```bash
npm install
npx remotion browser ensure
mkdir -p ~/.cache/remotion && cp -R node_modules/.remotion/chrome-headless-shell ~/.cache/remotion/
```

O último passo existe porque o macOS impede o Chrome do Remotion de abrir dentro de `~/Desktop`
(ver `remotion.config.ts`). Fora do Desktop ele é dispensável.

Licença do Remotion: gratuita para pessoa física e empresa de até 3 pessoas.

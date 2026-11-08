# Sócios do Brasil

Canal nacionalista e suprapartidário sobre economia, política e geopolítica do Brasil. Público: o
brasileiro em geral, de qualquer ideologia. O objetivo é que o espectador conclua sozinho, pelo
mecanismo e pelos números, que o país ganha sendo dono das próprias empresas estratégicas e recursos.

Estrutura, fluxo e comandos: `README.md`.

## Conteúdo

- **Número sem fonte não entra.** Todo dado vai em `dados.json` apontando para `fontes/fontes.json`.
  Nunca inventar nem arredondar um número para caber na narrativa; na dúvida, perguntar.
- **Toda pauta enfrenta a melhor objeção**, dita com honestidade. Custo real se reconhece antes de
  defender a troca (ex.: preço da Petrobras segurado tem custo; a moldura é a carteira do país).
- **Mostrar o mecanismo, não atribuir intenção.** Nenhum país ou grupo é vilão; o vídeo explica
  como quem vence vence.
- **Sem vínculo partidário.** Não endossar candidato nem partido.

## Código

- Cor e tipografia só em `src/marca/tema.ts`.
- Toda cena funciona em 16:9 e 9:16 (`useFormato()`); conferir os dois antes de entregar,
  renderizando frames com `npx remotion still`.
- No vertical, nada importante na faixa de baixo nem na lateral direita: a interface do TikTok e do Reels cobre.
- Código e textos em português.

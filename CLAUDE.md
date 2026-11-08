# Sócios do Brasil

Canal nacionalista e suprapartidário sobre economia, política e geopolítica do Brasil. Público: o
brasileiro em geral, de qualquer ideologia. O objetivo é que o espectador conclua sozinho, pelo
mecanismo e pelos números, que o país ganha sendo dono das próprias empresas estratégicas e recursos.

Estrutura, fluxo e comandos: `README.md`.

## Linha editorial

- **O nome é a tese.** Cada brasileiro é sócio do país, não empregado de outro. O canal quer que o
  espectador se sinta dono e patrocinador de um país rico.
- **Temas:** reindustrialização, recursos naturais estratégicos (petróleo, terras raras),
  privatização de empresas estratégicas, interferência do Estado, balança comercial, geopolítica.
- **Não é contra o mercado nem contra os EUA.** Mostrar como os EUA vencem (balança, marcas
  próprias, controle de recursos) para o público querer o mesmo para o Brasil: a própria Ford,
  o próprio McDonald's, controle sobre petróleo e terras raras.
- **Falar a língua de cada público.** Inclui a direita liberal e o investidor de bolsa: carteira,
  retorno, ecossistema. O ganho imediato de uma privatização para o acionista é real; o vídeo
  mostra o que o país, e o próprio investidor, perde no resto da carteira.
- **Moldura da carteira.** Interferência do Estado tem custo real e se reconhece (ex.: segurar o
  preço do combustível reduz o ganho da Petrobras). Mas o investidor também é dono das empresas que
  dependem de energia barata: perde-se na NOSSA Petrobras, ganha-se na NOSSA Terrabras, na NOSSA
  AWSbras, em tudo que depende de energia. O ecossistema ganha.

## Formato

O apresentador narra na câmera. Nos trechos mais complexos, a imagem dele dá lugar a uma cena
animada, com a narração por cima. Estilos, em ordem de uso: motion graphic vetorial 2D, infográfico
animado, kinetic typography, whiteboard. Longo ~10 min (YouTube); curto 60s (TikTok, Reels, Shorts)
com roteiro próprio.

## Pendências

- Identidade visual definitiva: a paleta de `src/marca/tema.ts` é provisória.
- Montagem, a testar as duas: (A) o Remotion monta tudo, com transcrição (Whisper) sincronizando as
  cenas aos blocos do roteiro e legenda queimada no curto; (B) as cenas saem como MP4/MOV e o vídeo
  é editado à mão.
- Pedido da marca no INPI, classe 41. A busca exata em 2026-11-08 não achou "Sócios do Brasil".
- Domínio `sociosdobrasil.com.br`, para o e-mail de contato. Nunca expor o e-mail de login do canal.

Canal: YouTube `@SociosDoBrasil`, Instagram e TikTok `sociosdobrasil`.

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

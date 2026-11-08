// Roda antes de `npm run dev` e `npm run render`. Falha se uma regra do canal for quebrada:
//   1. todo dado aponta para uma fonte cadastrada em fontes/fontes.json
//   2. toda pauta tem o contra-argumento preenchido
//   3. todo `CENA <id>` dos roteiros existe em cenas.tsx
//   4. nenhuma cor fora de src/marca/tema.ts
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const raiz = join(import.meta.dirname, '..');
const erros: string[] = [];
const avisos: string[] = [];
const ler = (p: string) => readFileSync(join(raiz, p), 'utf8');
const semComentarios = (s: string) => s.replace(/<!--[\s\S]*?-->/g, '').trim();

type Fonte = { orgao?: string; titulo?: string; url?: string; acesso?: string; periodo?: string; ilustrativo?: boolean };
const fontes: Record<string, Fonte> = JSON.parse(ler('fontes/fontes.json'));

for (const [id, f] of Object.entries(fontes)) {
  const faltando = (['orgao', 'titulo', 'url', 'acesso', 'periodo'] as const).filter((c) => !f[c] && !(c === 'url' && f.ilustrativo));
  if (faltando.length) erros.push(`fontes.json: "${id}" sem ${faltando.join(', ')}`);
}

const episodios = readdirSync(join(raiz, 'episodios')).filter(
  (d) => !d.startsWith('_') && statSync(join(raiz, 'episodios', d)).isDirectory(),
);

for (const ep of episodios) {
  const dir = `episodios/${ep}`;
  const faltando = ['pauta.md', 'longo.md', 'curto.md', 'dados.json', 'cenas.tsx'].filter((f) => !existsSync(join(raiz, dir, f)));
  if (faltando.length) {
    erros.push(`${dir}: faltando ${faltando.join(', ')}`);
    continue;
  }

  const dados: Record<string, { fonte?: string }> = JSON.parse(ler(`${dir}/dados.json`));
  for (const [chave, d] of Object.entries(dados)) {
    if (!d.fonte) erros.push(`${dir}/dados.json: "${chave}" sem fonte`);
    else if (!fontes[d.fonte]) erros.push(`${dir}/dados.json: "${chave}" aponta para a fonte "${d.fonte}", que não existe em fontes.json`);
    else if (fontes[d.fonte].ilustrativo) avisos.push(`${dir}/dados.json: "${chave}" é ilustrativo, não publicar`);
  }

  const contra = ler(`${dir}/pauta.md`).match(/^## Contra-argumento\s*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m);
  if (!contra || !semComentarios(contra[1])) erros.push(`${dir}/pauta.md: contra-argumento vazio`);

  const cenas = new Set([...ler(`${dir}/cenas.tsx`).matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]));
  for (const roteiro of ['longo.md', 'curto.md']) {
    for (const [, id] of ler(`${dir}/${roteiro}`).matchAll(/^## CENA\s+(\S+)/gm)) {
      if (!cenas.has(id)) erros.push(`${dir}/${roteiro}: CENA ${id} não existe em cenas.tsx`);
    }
  }
}

const arquivos = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? arquivos(p) : /\.tsx?$/.test(n) ? [p] : [];
  });

for (const arq of [...arquivos(join(raiz, 'src')), ...arquivos(join(raiz, 'episodios'))]) {
  if (arq.endsWith(join('marca', 'tema.ts'))) continue;
  readFileSync(arq, 'utf8').split('\n').forEach((linha, i) => {
    if (/#[0-9a-fA-F]{3,8}\b|rgba?\(/.test(linha)) erros.push(`${relative(raiz, arq)}:${i + 1}: cor fora de src/marca/tema.ts`);
  });
}

avisos.forEach((a) => console.warn(`aviso: ${a}`));
erros.forEach((e) => console.error(`erro:  ${e}`));
if (erros.length) process.exit(1);
console.log(`ok: ${episodios.length} episódio(s), ${Object.keys(fontes).length} fonte(s)`);

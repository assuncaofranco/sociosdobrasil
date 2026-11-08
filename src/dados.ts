import fontes from '../fontes/fontes.json';

export type Dado = {
  rotulo: string;
  valor: number;
  unidade: string;
  fonte: string; // chave em fontes/fontes.json
};

export type Fonte = {
  orgao: string;
  titulo: string;
  url: string;
  acesso: string;
  periodo: string;
  ilustrativo?: boolean;
};

export const fonteDe = (id: string): Fonte => (fontes as Record<string, Fonte>)[id];

// Espaço inquebrável: "US$" nunca fica numa linha e o número na outra.
export const usd = (v: number) => `US$ ${Math.round(v).toLocaleString('pt-BR')}`;

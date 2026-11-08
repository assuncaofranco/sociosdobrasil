import type { ComponentType } from 'react';

// Cada episódio exporta um destes. Toda cena é registrada nos dois formatos.
export type Episodio = {
  slug: string; // nome da pasta em episodios/
  cenas: { id: string; duracao: number; componente: ComponentType }[];
};

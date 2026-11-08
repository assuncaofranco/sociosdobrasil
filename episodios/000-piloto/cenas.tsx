import { Sequence } from 'remotion';
import type { Episodio } from '../../src/episodio';
import { Quadro } from '../../src/marca/Quadro';
import { FraseCinetica } from '../../src/cenas/FraseCinetica';
import { FluxoComercial, DURACAO_FLUXO } from '../../src/cenas/FluxoComercial';
import { BarrasComparativas } from '../../src/cenas/BarrasComparativas';
import dados from './dados.json';

const { minerio, maquinas } = dados;

const Comercio = () => (
  <Quadro dados={[minerio, maquinas]}>
    <Sequence durationInFrames={90}>
      <FraseCinetica palavras={['Exportamos', 'toneladas.']} />
    </Sequence>
    <Sequence from={90} durationInFrames={DURACAO_FLUXO}>
      <FluxoComercial ida={minerio} volta={maquinas} />
    </Sequence>
    <Sequence from={240} durationInFrames={120}>
      <BarrasComparativas titulo="Valor de uma tonelada" itens={[minerio, maquinas]} />
    </Sequence>
    <Sequence from={360}>
      <FraseCinetica palavras={['Importamos', 'valor.']} destaque />
    </Sequence>
  </Quadro>
);

export const episodio: Episodio = {
  slug: '000-piloto',
  cenas: [{ id: 'comercio', duracao: 420, componente: Comercio }],
};

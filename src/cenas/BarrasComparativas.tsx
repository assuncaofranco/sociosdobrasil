import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { cores } from '../marca/tema';
import { useFormato } from '../marca/formato';
import { usd, type Dado } from '../dados';

const PALETA = [cores.materiaPrima, cores.valorAgregado, cores.brasil, cores.mundo];

// Barras horizontais crescendo em sequência, com o valor contando junto.
export const BarrasComparativas = ({ titulo, itens }: { titulo: string; itens: Dado[] }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const vertical = useFormato() === 'vertical';
  const margem = vertical ? 80 : 160;
  const max = Math.max(...itens.map((d) => d.valor));

  return (
    <AbsoluteFill style={{ justifyContent: 'center', padding: `0 ${margem}px`, gap: 70 }}>
      <div style={{ fontSize: 52, color: cores.apagado, fontWeight: 600 }}>{titulo}</div>
      {itens.map((item, i) => {
        const p = interpolate(frame, [i * 15, i * 15 + 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
        return (
          <div key={item.rotulo}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>
              {item.rotulo} · <b>{usd(item.valor * p)}</b>
            </div>
            <div style={{ height: 70, width: Math.max(6, (item.valor / max) * (width - 2 * margem) * p), background: PALETA[i % PALETA.length], borderRadius: 8 }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

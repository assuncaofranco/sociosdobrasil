import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { cores } from '../marca/tema';
import { useFormato } from '../marca/formato';

// Palavras entrando uma a uma, com mola. No vertical, uma por linha.
export const FraseCinetica = ({ palavras, destaque = false }: { palavras: string[]; destaque?: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vertical = useFormato() === 'vertical';

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', gap: vertical ? 10 : 28, flexDirection: vertical ? 'column' : 'row' }}>
      {palavras.map((p, i) => {
        const s = spring({ frame: frame - i * 6, fps, config: { damping: 12 } });
        return (
          <span
            key={p}
            style={{
              fontSize: vertical ? 130 : 120,
              fontWeight: 800,
              color: destaque ? cores.valorAgregado : cores.texto,
              transform: `translateY(${(1 - s) * 80}px)`,
              opacity: s,
            }}
          >
            {p}
          </span>
        );
      })}
    </AbsoluteFill>
  );
};

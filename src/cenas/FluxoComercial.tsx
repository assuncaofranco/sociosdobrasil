import type { CSSProperties } from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { cores } from '../marca/tema';
import { useFormato } from '../marca/formato';
import { usd, type Dado } from '../dados';

export const DURACAO_FLUXO = 150;

const suave = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) } as const;

const Navio = ({ carga }: { carga: 'bruta' | 'industrial' }) => (
  <svg width={260} height={160} viewBox="0 0 260 160">
    {[0, 1, 2].map((i) =>
      carga === 'bruta' ? (
        <polygon key={i} points={`${40 + i * 60},90 ${70 + i * 60},40 ${100 + i * 60},90`} fill={cores.materiaPrima} />
      ) : (
        <g key={i} transform={`translate(${70 + i * 60} 62)`}>
          <circle r={24} fill={cores.valorAgregado} />
          <circle r={9} fill={cores.fundo} />
        </g>
      ),
    )}
    <path d="M10 90 H250 L220 140 H40 Z" fill={cores.texto} />
  </svg>
);

const Bloco = ({ cor, nome, style }: { cor: string; nome: string; style: CSSProperties }) => (
  <div style={{ position: 'absolute', width: 240, height: 300, borderRadius: 24, background: cor, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 24, fontSize: 44, fontWeight: 700, ...style }}>
    {nome}
  </div>
);

// Um navio leva `ida` da origem ao destino e volta com `volta`.
// Horizontal: da esquerda para a direita. Vertical: de baixo para cima, na coluna da esquerda,
// com o texto na coluna da direita para o navio não passar por cima dele.
export const FluxoComercial = ({ ida, volta, origem = 'Brasil', destino = 'Mundo' }: { ida: Dado; volta: Dado; origem?: string; destino?: string }) => {
  const frame = useCurrentFrame();
  const vertical = useFormato() === 'vertical';
  const voltando = frame >= 75;
  const p = voltando ? 1 - interpolate(frame, [80, 140], [0, 1], suave) : interpolate(frame, [10, 70], [0, 1], suave);
  const dado = voltando ? volta : ida;

  const navio = vertical
    ? { left: 120, top: interpolate(p, [0, 1], [1250, 450]) }
    : { left: interpolate(p, [0, 1], [300, 1360]), top: 520 };
  const virado = !vertical && voltando ? 'scaleX(-1)' : undefined;

  return (
    <AbsoluteFill>
      <Bloco cor={cores.brasil} nome={origem} style={vertical ? { left: 130, top: 1420 } : { left: 80, top: 420 }} />
      <Bloco cor={cores.mundo} nome={destino} style={vertical ? { left: 130, top: 120 } : { left: 1600, top: 420 }} />
      <div style={{ position: 'absolute', ...navio, transform: virado }}>
        <Navio carga={voltando ? 'industrial' : 'bruta'} />
      </div>
      <div style={{ position: 'absolute', ...(vertical ? { top: 820, left: 450, right: 60 } : { top: 720, left: 60, right: 60, textAlign: 'center' }), fontSize: vertical ? 64 : 56, fontWeight: 700, color: voltando ? cores.valorAgregado : cores.materiaPrima }}>
        1 t de {dado.rotulo.toLowerCase()} ≈ {usd(dado.valor)}
      </div>
    </AbsoluteFill>
  );
};

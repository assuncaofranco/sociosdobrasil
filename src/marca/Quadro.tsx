import type { ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { cores, fonte } from './tema';
import { fonteDe, type Dado } from '../dados';
import { useFormato } from './formato';

// Moldura de toda cena: fundo, tipografia e o rodapé com as fontes dos dados exibidos.
export const Quadro = ({ dados, children }: { dados: Dado[]; children: ReactNode }) => {
  const vertical = useFormato() === 'vertical';
  const ids = [...new Set(dados.map((d) => d.fonte))];
  const textos = ids.map((id) => {
    const f = fonteDe(id);
    return f.ilustrativo ? 'Valores ilustrativos' : `${f.orgao}, ${f.titulo} (${f.periodo})`;
  });

  return (
    <AbsoluteFill style={{ background: cores.fundo, fontFamily: fonte, color: cores.texto }}>
      {children}
      {textos.length > 0 && (
        // No vertical, sobe acima da faixa que a interface do TikTok e do Reels cobre.
        <div style={{ position: 'absolute', bottom: vertical ? 420 : 30, right: vertical ? 160 : 40, left: 40, textAlign: 'right', fontSize: 24, color: cores.apagado }}>
          Fonte: {textos.join(' · ')}
        </div>
      )}
    </AbsoluteFill>
  );
};

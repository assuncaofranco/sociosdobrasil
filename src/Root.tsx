import { Composition, Folder } from 'remotion';
import { dimensoes } from './marca/formato';
import { episodios } from '../episodios';

// Cada cena vira duas composições: <cena>-h (YouTube) e <cena>-v (TikTok, Reels, Shorts).
export const Root = () => (
  <>
    {episodios.map((ep) => (
      <Folder key={ep.slug} name={ep.slug}>
        {ep.cenas.flatMap((c) =>
          (['horizontal', 'vertical'] as const).map((f) => (
            <Composition
              key={`${c.id}-${f}`}
              id={`${ep.slug}-${c.id}-${f[0]}`}
              component={c.componente}
              durationInFrames={c.duracao}
              fps={30}
              {...dimensoes[f]}
            />
          )),
        )}
      </Folder>
    ))}
  </>
);

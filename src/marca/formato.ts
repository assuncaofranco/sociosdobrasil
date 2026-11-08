import { useVideoConfig } from 'remotion';

export type Formato = 'horizontal' | 'vertical';

export const dimensoes: Record<Formato, { width: number; height: number }> = {
  horizontal: { width: 1920, height: 1080 }, // YouTube
  vertical: { width: 1080, height: 1920 }, // TikTok, Reels, Shorts
};

export const useFormato = (): Formato => {
  const { width, height } = useVideoConfig();
  return height > width ? 'vertical' : 'horizontal';
};

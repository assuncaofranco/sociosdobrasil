import { Config } from '@remotion/cli/config';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';

// O Chrome que o Remotion baixa em node_modules/ não abre dentro de ~/Desktop: o macOS bloqueia
// o processo de GPU dele ("icudtl.dat not found in bundle"). Uma cópia fora do Desktop funciona.
// Instalar a cópia: ver README, seção "Primeira vez".
const chrome = `${homedir()}/.cache/remotion/chrome-headless-shell/mac-arm64/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
if (existsSync(chrome)) Config.setBrowserExecutable(chrome);

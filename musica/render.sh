#!/usr/bin/env bash
# Partitura em texto → MIDI → WAV.
#   ./render.sh exemplo        lê exemplo.ly, escreve saida/exemplo.midi e saida/exemplo.wav
#
# LilyPond gera o MIDI; FluidSynth toca o MIDI com o soundfont e grava o WAV.
# Soundfont: soundfonts/MuseScore_General.sf3 (General MIDI, não versionado).
set -euo pipefail

cd "$(dirname "$0")"
nome="${1:?uso: ./render.sh <nome-sem-extensao>}"
soundfont="soundfonts/MuseScore_General.sf3"
url="https://ftp.osuosl.org/pub/musescore/soundfont/MuseScore_General/MuseScore_General.sf3"

for cmd in lilypond fluidsynth; do
  command -v "$cmd" >/dev/null || { echo "falta $cmd: brew install lilypond fluid-synth" >&2; exit 1; }
done
if [[ ! -f "$soundfont" ]]; then
  echo "falta o soundfont: mkdir -p soundfonts && curl -fL -o $soundfont $url" >&2
  exit 1
fi

mkdir -p saida
lilypond --silent -o "saida/$nome" "$nome.ly"
fluidsynth -ni -q -r 44100 -g 0.7 -F "saida/$nome.wav" "$soundfont" "saida/$nome.midi"
echo "saida/$nome.wav"

\version "2.26.0"

% Exemplo de 8 compassos: piano, baixo e bateria.
% Só MIDI (sem \layout, não gera PDF). Render: ./render.sh exemplo
%
% Alturas absolutas: c' = dó central (C4), c = C3, c, = C2, c,, = C1.
% Duração: 4 = semínima, 4. = semínima pontuada, 8 = colcheia, ~ = ligadura.
% Acorde: <c' e' g'>. Dinâmica (\mf, \f) vira velocity no MIDI.

global = { \time 4/4 \key c \major \tempo 4 = 92 }

% Cmaj7 | Am7 | Dm7 | G7 | Em7 | Am7 | Dm7 | G7
% Levada 3+3+2 na mão direita.
pianoDireita = {
  \global \clef treble
  <c' e' g' b'>4.\mf <c' e' g' b'>4. <c' e' g' b'>4 |
  <c' e' g' a'>4. <c' e' g' a'>4. <c' e' g' a'>4 |
  <c' d' f' a'>4. <c' d' f' a'>4. <c' d' f' a'>4 |
  <b d' f' g'>4. <b d' f' g'>8 ~ <b d' f' g'>2 |
  <b d' e' g'>4. <b d' e' g'>4. <b d' e' g'>4 |
  <c' e' g' a'>4. <c' e' g' a'>4. <c' e' g' a'>4 |
  <c' d' f' a'>4. <c' d' f' a'>4. <c' d' f' a'>4 |
  <b d' f' g'>4 <b d' f' g'>8 <b d' f' g'>8 ~ <b d' f' g'>2 |
}

pianoEsquerda = {
  \global \clef bass
  c2\mp c2 | a,2 a,2 | d2 d2 | g,2 g,2 |
  e2 e2 | a,2 a,2 | d2 d2 | g,1 |
}

% Fundamental no 1, repete no "e" do 2, quinta no 4; no G7, terça e quinta subindo pro Em7.
baixo = {
  \global \clef bass
  c,4.\mf c,8 ~ c,4 g,4 |
  a,,4. a,,8 ~ a,,4 e,4 |
  d,4. d,8 ~ d,4 a,,4 |
  g,,4. g,,8 ~ g,,4 b,,8 d,8 |
  e,4. e,8 ~ e,4 b,,4 |
  a,,4. a,,8 ~ a,,4 e,4 |
  d,4. d,8 ~ d,4 a,,4 |
  g,,4. g,,8 ~ g,,4 b,,8 d,8 |
}

% bd = bumbo, sn = caixa, hh = chimbal fechado, cymc = crash, tomh/toml = tons.
levada = \drummode { << { hh8 hh hh hh hh hh hh hh } \\ { bd4 sn bd8 bd sn4 } >> }
levadaCrash = \drummode { << { cymc8 hh hh hh hh hh hh hh } \\ { bd4 sn bd8 bd sn4 } >> }
virada = \drummode { << { hh8 hh hh hh r2 } \\ { bd4 sn sn16 sn sn8 tomh8 toml8 } >> }

bateria = {
  \time 4/4
  \levadaCrash \levada \levada \levada
  \levadaCrash \levada \levada \virada
}

\score {
  <<
    \new PianoStaff <<
      \new Staff \with { midiInstrument = "acoustic grand" } \pianoDireita
      \new Staff \with { midiInstrument = "acoustic grand" } \pianoEsquerda
    >>
    \new Staff \with { midiInstrument = "electric bass (finger)" } \baixo
    \new DrumStaff \bateria
  >>
  \midi { }
}

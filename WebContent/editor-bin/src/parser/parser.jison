/* description: Musje 123 language */

%{

const extend = require('../util').extend

const lastItem = arr => arr[arr.length - 1]

const onlyProperty = obj => obj[Object.keys(obj)[0]]

const octave = str => {
  const len = str.length
  return str.charAt(0) === ',' ? -len : len
}

const removeLastEmptyMeasure = score => {
  const parts = score.parts
  if (!parts) return

  parts.forEach(part => {
    const lastMeasure = lastItem(part.measures)
    if (lastMeasure.data.length === 0) part.measures.pop()
  })
}

%}

/* lexical grammar */
%lex
%x time title

S             [ \t]
NL            [\n\r]
ACCIDENTAL    '#'{1,2}|'n'|'b'{1,2}
HALF          ' '*'-'' '*
SMALL_INT     [1-9]\d{0,2}
BEATS         {SMALL_INT}\/

%%
/* Comments */
\/\/[^\n]*              return 'S'
\/\*([\s\S]*?)\*\/      return 'S'
\/\*[\s\S]*             return 'S'

'<<'                    { this.begin('title') }
<title>.*'>>'           { yytext = yytext.substr(0, yyleng - 2).trim()
                          return 'TITLE' }
<title>{S}*{NL}         { this.begin('INITIAL') }
<title>.*               { this.begin('INITIAL')
                          yytext = yytext.trim()
                          return 'COMPOSER' }

{BEATS}                 { this.begin('time')
                          yytext = yytext.substr(0, yyleng - 1)
                          return 'BEATS' }
<time>{SMALL_INT}[^\d]  { this.begin('INITIAL'); return 'BEAT_TYPE' }

{ACCIDENTAL}            return 'ACCIDENTAL'
[1-7]                   return 'STEP'
','+|"'"+               return 'OCTAVE'
'.'+                    return 'DOT'
{HALF}{3}               return 'WHOLE'
{HALF}                  return 'HALF'
' '*'~'                 return 'TIE'

[_]                     return '_'
'='                     return '='
'.'                     return '.'
[0]                     return '0'
'<'                     return '<'
'>'                     return '>'
'('                     return '('
')'                     return ')'
\/                      return '/'
'\\'                    return '\\'
'|]'                    return '|]'
'||'                    return '||'
'[|'                    return '[|'
'|:'                    return '|:'
':|:'                   return ':|:'
':|'                    return ':|'
'|'                     return '|'
'{'                     return '{'
'}'                     return '}'
':'                     return ':'

{NL}                    return 'NL'
{S}                     return 'S'
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

/lex

%start e

%% /* Musje grammar rules */
e
  : maybe_musje EOF
    { return $1; }
  ;

maybe_musje
  : %empty
    { $$ = null; }
  | space maybe_space
    { $$ = null; }
  | space maybe_space musje
    { $$ = $3; removeLastEmptyMeasure($3); }
  | musje
    { $$ = $1; removeLastEmptyMeasure($1); }
  ;

space
  : S
  | NL
  ;

maybe_space
  : %empty
  | maybe_space S
  | maybe_space NL
    { $$ = $1 ? $1 + 1 : 1; }     // Count newlines
  ;

musje
  : score_head              -> { head: $1 }
  | part_list               -> { parts: $1 }
  | score_head part_list    -> { head: $1, parts: $2 }
  ;

score_head
  : title maybe_space
  ;

title
  : 'TITLE'
    { $$ = { title: $1 } }
  | 'TITLE' 'COMPOSER'
    { $$ =  { title: $1, composer: $2 } }
  ;

part_list
  : part                    -> [$1]
  ;

part
  : measure_list            -> { measures: $1 }
  | bar maybe_space measure_list
    { $$ = { measures: $3}; $3[0].data.unshift({ bar: $1 }); }
  ;

measure_list
  : measure
    { $$ = [$1]; }
  | measure_list bar maybe_space measure
    { $$ = $1; lastItem($1).data.push({ bar: $2 }); $1.push($4) }
  | measure_list bar maybe_space
    { $$ = $1; lastItem($1).data.push({ bar: $2 }); $1.push({ data: [] }) }
  ;

measure
  : music_data maybe_space            -> { data: [$1] }
  | measure music_data maybe_space    { $$ = $1; $1.data.push($2) }
  ;

bar
  : '|'             -> 'single'
  | '||'            -> 'double'
  | '|]'            -> 'end'
  | '|:'            -> 'repeat-begin'
  | ':|'            -> 'repeat-end'
  | ':|:'           -> 'repeat-both'
  ;

music_data
  : slurable
  | slurable TIE          { $$ = $1; onlyProperty($1).tie = '~' }
  | '0' maybe_duration    -> { rest: { duration: $2 } }
  | voice                 -> { voice: $1 }
  | time_signature
  ;

slurable
  : pitchful maybe_duration
    { $$ = $1; onlyProperty($1).duration = $2 }
  | '(' pitchful maybe_duration
    {
      $$ = $2;
      extend(onlyProperty($2), {
        duration: $3,
        slur: { begin: 'solid' }
      })
    }
  | pitchful maybe_duration ')'
    {
      $$ = $1
      extend(onlyProperty($1), {
        duration: $2,
        slur: { end: 'solid' }
      })
    }
  | '(' pitchful maybe_duration ')'
    {
      $$ = $2
      extend(onlyProperty($2), {
        duration: $3,
        slur: { begin: 'solid', end: 'solid' }
      })
    }
  ;

pitchful
  : note                  -> { note: $1 }
  | chord                 -> { chord: $1 }
  ;

note
  : pitch                 -> { pitch: $1 }
  ;

pitch
  : STEP                    -> { step: +$1 }
  | STEP OCTAVE             -> { step: +$1, octave: octave($2) }
  | ACCIDENTAL STEP         -> { accidental: $1, step: +$2 }
  | ACCIDENTAL STEP OCTAVE  -> { accidental: $1, step: +$2, octave: octave($3) }
  ;

maybe_duration
  : %empty                -> { type: 4 }
  | type_modifier         -> { type: $1 }
  | DOT                   -> { type: 4, dot: $1.length }
  | type_modifier DOT     -> { type: $1, dot: $2.length }
  ;

type_modifier
  : '_'             -> 8
  | '='             -> 16
  | '=' '_'         -> 32
  | '=' '='         -> 64
  | '=' '=' '_'     -> 128
  | '=' '=' '='     -> 256
  | 'HALF'          -> 2
  | 'WHOLE'         -> 1
  ;

chord
  : '<' pitch_list '>'    -> { pitches: $2 }
  ;

pitch_list
  : pitch                 -> [$1]
  | pitch_list pitch      { $$ = $1; $1.push($2) }
  ;

voice
  : '{' voice_list '}'    -> $2
  ;

voice_list
  : voice_data_list                   -> [$1]
  | voice_data_list ':' voice_data    { $$ = $1; $1.push($2) }
  ;

// TODO
voice_data
  : slurable
  | restslurable_list slurable
    { $$ = $1; $1.push($2) }
  ;

time_signature
  : BEATS BEAT_TYPE       -> { time: { beats: +$1, beatType: +$2 } }
  ;

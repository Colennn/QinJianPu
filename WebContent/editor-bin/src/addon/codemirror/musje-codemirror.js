/* Codemirror mode for musje 123 notation */

var CodeMirror = require('codemirror');

CodeMirror.defineSimpleMode('musje', {
  start: [
    { regex: /<<[\u0020-\uffff]*>>.*/, token: 'head' },
    { regex: /\d+\/\d+/, token: 'time', },
    { regex: /(?:#{1,2}|b{1,2}|n)(?=[1-7])/, token: 'note accidental' },
    { regex: /0/, token: 'note', next: 'duration' },
    { regex: /[1-7]/, token: 'note', next: 'octave' },
    { regex: /\((?=[1-7#bn])/, token: 'slur' },
    { regex: /\|\||:\|:|:\||\|:|\|\]/, token: 'bar bar-heavy' },
    { regex: /\|/, token: 'bar' },
    { regex: /\\(?:[a-zA-Z<>!]+|\d{1,2}=\d{1,3})/, token: 'direction-down' },
    { regex: /\/(?:[a-zA-Z<>!]+|\d{1,2}\.{0,2}=\d{1,3}|\[[\d,]?|\])/, token: 'direction-up' },
    { regex: / +-.*/, token: 'error' },
    { regex: /-.*/, token: 'part-head' },
    { regex: /\w[\w_\- ]*/, token: 'lyric' },
    { regex: /\/\/.*/, token: 'comment' },
    { regex: /\/\*/, token: 'comment', next: 'comment' },
    { regex: /[^ \n]/, token: 'error' }
  ],
  octave: [
    { regex: /'+/, token: 'note octave-up', next: 'duration' },
    { regex: /,+/, token: 'note octave-down', next: 'duration' },
    { regex: /(?=(.))/, next: 'duration' }
  ],
  duration: [
    { regex: / *\- *\- *\- */, token: 'note', next: 'dotCenter' },
    { regex: / *\- */, token: 'note', next: 'dotCenter' },
    { regex: /_/, token: 'note dur-underbar', next: 'dot' },
    { regex: /=+/, token: 'note dur-equal', next: 'afterEqual' },
    { regex: /(?=(.))/, next: 'dot' }
  ],
  afterEqual: [
    { regex: /_/, token: 'note dur-underbar', next: 'dot' },
    { regex: /(?=(.))/, next: 'dot' }
  ],
  dot: [
    { regex: /\.{1,2}/, token: 'note dot', next: 'slurEnd' },
    { regex: /(?=(.))/, next: 'slurEnd' }
  ],
  dotCenter: [
    { regex: /\.{1,2}/, token: 'note dot-center', next: 'slurEnd' },
    { regex: /(?=(.))/, next: 'slurEnd' }
  ],
  slurEnd: [
    { regex: /\)/, token: 'slur', next: 'tie' },
    { regex: /(?=(.))/, next: 'tie' }
  ],
  tie: [
    { regex: /~/, token: 'tie', next: 'start' },
    { regex: /(?=(.))/, next: 'start' }
  ],
  comment: [
    { regex: /.*?\*\//, token: 'comment', next: 'start'},
    { regex: /.*/, token: 'comment'}
  ],
  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ['comment'],
    lineComment: '//'
  }
});

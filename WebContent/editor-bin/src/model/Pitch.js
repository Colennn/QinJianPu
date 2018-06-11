import { makeToJSON, extend } from '../util'

const A4_FREQUENCY = 440
const A4_MIDI_NUMBER = 69
const STEP_TO_MIDI_NUMBER = [undefined, 0, 2, 4, 5, 7, 9, 11]
const ACCIDENTAL_TO_ALTER = { '#' : 1, '##': 2, n: 0, b : -1, bb: -2 }

const chars = (ch, num) => new Array(num + 1).join(ch)
const octaveString = (octave) =>
  octave > 0 ? chars('\'', octave) :
  octave < 0 ? chars(',', -octave) : ''

// /**
//  * Step is a value of `1`, `2`, `3`, `4`, `5`, `6`, or `7`.
//  * @type {number}
//  * @default
//  */
// step = 1

// /**
//  * Octave is an integer value from `-5` to `5` inclusive.
//  * @type {number}
//  * @default
//  */
// octave = 0

// /**
//  * Accidental is either of
//  * - `'#'` - sharp
//  * - `'##'` - double sharp
//  * - `'b'` - flat
//  * - `'bb'` - double flat
//  * - `'n'` - natural
//  * - `''` - (none)
//  * @type {string}
//  */
// accidental = ''

/**
 * @class
 * @param parent {Note|Chord}
 * @param pitch {Object}
 */
class Pitch {
  constructor(parent, {
    step = 1,
    octave = 0,
    accidental = ''
  }) {
    this._parent = parent
    extend(this, { step, octave, accidental })
  }

  /**
   * Reference to the parent parent.
   * @type {Note|Chord}
   * @readonly
   */
  get parent() { return this._parent }

  /**
   * Def id used in the SVG <defs> element.
   * ```
   * defId := 'p' accidental step octave
   * ```
   * @type {string}
   * @readonly
   */
  get defId() {
    return `p${this.accidental.replace(/#/g, 's')}${this.step}${this.octave}`
  }

  /**
   * Alter (from -2 to 2 inclusive).
   *
   * If no accidental in this pitch, it might be affected by a previous note in the same cell (the same part and the same measure).
   * @type {number}
   * @readonly
   */
  get alter() {
    if (this.accidental) return ACCIDENTAL_TO_ALTER[this.accidental]
    const { alterLink } = this
    return alterLink ? alterLink.alter : 0
  }

  /**
   * Pitch linked that will affect the alter in this pitch.
   * @type {Pitch|undefined}
   * @readonly
   */
  get alterLink() {
    let prevData = this.parent.prev

    while(prevData) {
      if (prevData.$type === 'note' &&
          prevData.pitch.step === this.step && prevData.pitch.accidental) {
        return prevData.pitch
      }
      prevData = prevData.prev
    }
  }

  /**
   * The MIDI note number of the pitch
   * @type {number}
   */
  get midiNumber() {
    return (this.octave + 5) * 12 + STEP_TO_MIDI_NUMBER[this.step] + this.alter
  }

  /**
   * Frequency of the pitch
   * @type {number}
   * @readonly
   */
  get frequency() {
    return A4_FREQUENCY * Math.pow(2, (this.midiNumber - A4_MIDI_NUMBER) / 12)
  }

  /**
   * Convert to musje source code string.
   * @return {string} Converted musje source code string.
   */
  toString() {
    return this.accidental + this.step + octaveString(this.octave)
  }

  toJSON = makeToJSON({
    step: 1,
    octave: 0,
    accidental: ''
  })
}

export default Pitch

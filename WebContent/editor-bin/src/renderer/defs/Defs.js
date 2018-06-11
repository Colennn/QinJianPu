import AccidentalDef from './AccidentalDef'
import BarDef from './BarDef'
import DurationDef from './DurationDef'
import PitchDef from './PitchDef'
import TimeDef from './TimeDef'
import Note from '../../model/Note'

/**
 * @class
 * @param {Layout} layout
 */
class Defs {
  constructor(layout) {
    this._layout = layout
  }

  /**
   * Get the svg def of the music data.
   * @param  musicData {MusicDataMixin} music data
   * @return {Def}
   */
  get(musicData) {
    var id = musicData.defId
    return this[id] || (this[id] = makeDef(id, musicData, this))
  }

  getAccidental(accidental) {
    var id = 'a' + accidental.replace(/#/g, 's')
    return this[id] ||
          (this[id] = new AccidentalDef(id, accidental, this._layout))
  }

  _getPitch(id, pitch, underbar) {
    return this[id] ||
          (this[id] = new PitchDef(id, pitch, underbar, this))
  }
}


function makeDef(id, musicData, defs) {
  switch (musicData.$type) {
    case 'bar':
      return new BarDef(id, musicData, defs._layout)
    case 'time':
      return new TimeDef(id, musicData, defs._layout)
    case 'note':
      return makeNoteDef(musicData, defs)
    case 'rest':
      return makeRestDef(musicData, defs)
    case 'duration':
      return new DurationDef(id, musicData, defs._layout)
    default:
      return { width: 0, height: 0 }
  }
}

function makeNoteDef(note, defs) {
  const underbar = note.duration.underbar
  const pitchId = note.pitch.defId + underbar
  const pitchDef = defs._getPitch(pitchId, note.pitch, underbar)
  const durationDef = defs.get(note.duration)
  return {
    pitchDef: pitchDef,
    durationDef: durationDef,
    height: pitchDef.height,
    width: pitchDef.width + durationDef.width *
                            (underbar ? pitchDef.scale.x : 1)
  }
}

function makeRestDef(rest, defs) {
  const restNote = new Note({ pitch: { step: 0 }, duration: rest.duration })
  return makeNoteDef(restNote, defs)
}

export default Defs

/**
 * Tie of the note.
 * @param parent {Note|Chord}
 */
class Tie {
  constructor(parent) {
    this._parent = parent
  }

  value = ''

  get parent() { return this._parent }

  get begin() { return this.value }

  get end() { return this.prevParent }

  /**
   * The previous durable music data in part, if it is a tie begin.
   * @type {Durable|undefined}
   * @readonly
   */
  get prevParent() {
    var prev = this.parent.prevDurableInPart
    return prev && prev.tie && prev.tie.value && prev
  }

  /**
   * The next durable music data in part.
   * @type {Durable|undefined}
   * @readonly
   */
  get nextParent() { return this.value && this.parent.nextDurableInPart }

  /**
   * If previous durable music data in part has error.
   * @type {boolean}
   * @readonly
   */
  get prevHasError() {
    const prev = this.prevParent
    if (!prev || !prev.pitch) return true
    return prev.pitch && prev.pitch.midiNumber !== this.parent.pitch.midiNumber
  }

  /**
   * If next durable music data in part has error.
   * @type {boolean}
   * @readonly
   */
  get nextHasError() {
    var next = this.nextParent
    if (!next || !next.pitch) return true
    return next.pitch.midiNumber !== this.parent.pitch.midiNumber
  }

  toJSON() {
    return this.value
  }
}

export default Tie

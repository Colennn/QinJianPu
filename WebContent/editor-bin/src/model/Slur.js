import { makeToJSON } from '../util'

/**
 * Slur
 * @class
 * @param parent {Note|Chord}
 */
class Slur {
  constructor(parent) {
    this._parent = parent
  }

  begin = ''

  end = ''

  /**
   * Parent music data.
   * @type {Note|Chord}
   * @readonly
   */
  get parent() { return this._parent }

  /**
   * Previous slurred parent.
   * @type {Note|Chord}
   * @readonly
   */
  get prevParent() {
    if (!this.end) return

    let prev = this.parent.prevInPart
    while (prev) {
      if (prev.slur && !prev.slur.isEmpty) return prev
      prev = prev.prevInPart
    }
  }

  /**
   * Next Slurred parent.
   * @type {Note|Chord}
   * @readonly
   */
  get nextParent() {
    if (!this.begin) return

    let next = this.parent.nextInPart
    while (next) {
      if (next.slur && !next.slur.isEmpty) return next
      next = next.nextInPart
    }
  }

  /**
   * @todo Nested tie in slur.
   * @type {boolean}
   * @readonly
   */
  get prevCrossTie() {}

  /**
   * @todo Nested tie in slur.
   * @type {boolean}
   * @readonly
   */
  get nextCrossTie() {}

  /**
   * If the previous slur has error.
   * @type {boolean}
   * @readonly
   */
  get prevHasError() {
    const { prevParent } = this
    return !prevParent || !prevParent.slur.begin
  }

  /**
   * If the next slur has error.
   * @type {boolean}
   * @readonly
   */
  get nextHasError() {
    const { nextParent } = this
    return !nextParent || !nextParent.slur.end
  }

  /**
   * If the slur is empty.
   * @type {boolean}
   * @readonly
   */
  get isEmpty() { return !(this.begin || this.end) }

  /**
   * Convert the slur to JSON object.
   * @method
   * @return {Object} JSON object.
   */
  toJSON = makeToJSON({
    begin: undefined,
    end: undefined
  })
}

export default Slur

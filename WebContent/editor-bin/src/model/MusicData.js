class MusicData {

  /**
   * Reference to the parent cell.
   * @type {Cell}
   */
  get cell() { return this._cell }

  /**
   * The ascendant system of the music data.
   * @type {SystemLayout}
   * @readonly
   */
  get system() { return this.cell.measure.system }

  /**
   * Previous music data.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get prev() { return this.cell.data[this._index - 1] }

  /**
   * Next music data.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get next() { return this.cell.data[this._index + 1] }

  /**
   * Previous music data in part, across measure.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get prevInPart() {
    let { prev, cell } = this
    while (!prev && cell.prev) {
      if (!prev) {
        cell = cell.prev
        prev = cell.lastData
      }
    }
    return prev
  }

  /**
   * Next music data in part, across measure.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get nextInPart() {
    let { next, cell } = this
    while (!next && cell.next) {
      if (!next) {
        cell = cell.next
        next = cell.firstData
      }
    }
    return next
  }

  /**
   * Previous music data which has a duration.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get prevDurable() {
    let { prev } = this
    while (prev && !prev.duration) prev = prev.prev
    return prev
  }

  /**
   * Next music data which has a duration.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get nextDurable() {
    let { next } = this
    while (next && !next.duration) next = next.next
    return next
  }

  /**
   * Previous music data which has a duration in part, across measure.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get prevDurableInPart() {
    let prev = this.prevInPart
    while (prev && !prev.duration) prev = prev.prevInPart
    return prev
  }

  /**
   * Next music data which has a duration in part, across measure.
   * @type {MusicDataMixin|undefined}
   * @readonly
   */
  get nextDurableInPart() {
    let next = this.nextInPart
    while (next && !next.duration) next = next.nextInPart
    return next
  }


  /**
   * The x position of the music data in the cell.
   * @type {number}
   */
  get x() { return this._x }
  set x(x) {
    this._x = x
    if (this.el) this.el.attr('x', x)
  }

  /**
   * The y position of the music data in the cell.
   * @type {number}
   */
  get y() { return this._y }
  set y(y) {
    this._y = y
    if (this.el) this.el.attr('y', y)
  }

  /**
   * The x position of the music data in the system.
   * @type {number}
   */
  get systemX() { return this.x + this.cell.x + this.cell.measure.x }

  /**
   * The width of the music data.
   * @type {number}
   * @readonly
   */
  get width() { return this.def.width }
}

export default MusicData

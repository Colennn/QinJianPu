import MIDI from 'MIDI'

const timeouts = []

const PlayerMixin = {

  /**
   * Start playing the song.
   */
  play() {
    const { measures } = this.parts[0]
    var time = 0 //audioCtx.currentTime

    measures.forEach(cell => {
      cell.data.forEach(data => {
        switch (data.$type) {
          case 'note':
            // playNote(time, dur, freq)
            timeouts.push(midiPlayNote(data, time))
            time += data.duration.second
            break
          case 'rest':
            time += data.duration.second
            break
          default:
        }
      })
    })
  },

  /**
   * Stop playing the song.
   */
  stop() {
    timeouts.forEach(timeout => { clearTimeout(timeout) })
    timeouts.length = 0
  }
}

// if (window.AudioContext) {
//   var audioCtx = new window.AudioContext()
//   var gainNode = audioCtx.createGain()
//   gainNode.connect(audioCtx.destination)
//   gainNode.gain.value = 0.5  // set the volume
// }

// // var oscillator = audioCtx.createOscillator()
// // oscillator.connect(gainNode)
// // oscillator.type = 'square' // sine | square | sawtooth | triangle | custom

// function playNote(time, dur, freq) {
//   if (!audioCtx) { return }

//   var oscillator = audioCtx.createOscillator()
//   oscillator.type = 'sine'
//   oscillator.connect(audioCtx.destination)
//   oscillator.frequency.value = freq
//   oscillator.start(time)
//   oscillator.stop(time + dur - 0.05)
// }

function midiPlayNote(note, time) {
  const { midiNumber } = note.pitch
  const dur = note.duration.second

  function play() {
    if (!note.tie.prevParent || note.tie.prevHasError) {
      MIDI.noteOn(0, midiNumber, 100, 0)
    }
    if (!note.tie.nextParent || note.tie.nextHasError) {
      MIDI.noteOff(0, midiNumber, dur)
    }
    note.el.addClass('mus-playing')
    setTimeout(() => { note.el.removeClass('mus-playing') }, dur * 800 + 100)
    console.log('Play: ' + note, time, dur, midiNumber)
  }

  return setTimeout(play, time * 800)
}

export default PlayerMixin

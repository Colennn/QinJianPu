import { objEach } from '../../util'

const layoutOptions = {
  mode: 'block', // inline | block | paper
  // width: 650,
  // height: 600,
  marginTop: 25,
  marginRight: 30,
  marginBottom: 25,
  marginLeft: 30,

  fontSize: 20,
  fontFamily: 'Helvetica, Arial, Sans Serif',

  titleFontSize: '110%',
  // titleFontFamily
  titleFontWeight: 'bold',
  composerFontSize: '90%',
  // composerFontFamily:
  composerFontWeight: 'bold',
  // composerFontStyle,
  timeFontSize: '95%',
  timeFontWeight: 'bold',

  headerSep: '100%',
  systemSep: '180%',
  musicDataSep: '20%',

  partHeight: '120%',
  partSep: '80%',

  measurePaddingLeft: '50%',
  measurePaddingRight: '50%',

  barlineHeight: '120%',
  thinBarlineWidth: '4%',
  thickBarlineWidth: '16%',
  barlineSep: '18%',
  barlineDotRadius: '7.5%',
  barlineDotSep: '22%',

  accidentalFontSize: '95%',
  accidentalShift: '10%',

  octaveRadius: '6.6%',
  octaveOffset: '0%',
  octaveSep: '23%',

  stepBaselineShift: '12%',  // for step without lower octave and underline

  typeStrokeWidth: '5%',
  typebarOffset: '30%',   // 1 - - -
  typebarLength: '55%',   // off len sep len sep len (dot) ext
  typebarSep: '45%',      // 1 -
  typebarExt: '20%',      // off len (dot) ext
  underbarSep: '17%',

  dotOffset: '60%',       // for type = 2
  dotRadius: '6.6%',      // 1 - . .
  dotSep: '60%',          // off len dotOff . dotSep . ext
  t4DotOffset: '30%',
  t4DotSep: '50%',
  t4DotExt: '25%',
  t4DotBaselineShift: '20%'
}

const { fontSize } = layoutOptions

objEach(layoutOptions, (value, key) => {
  if (typeof value !== 'string') return

  const unit = value.replace(/[\d\.]+/, '')
  value = +value.replace(/[^\d\.]+/, '')

  switch (unit) {
    case '%':
      layoutOptions[key] = fontSize * value / 100
      break
    case '':
      // fall through
    case 'px':
      layoutOptions[key] = value
      break
    case 'others to be implemented':
      break
    default:
  }
})

export default layoutOptions

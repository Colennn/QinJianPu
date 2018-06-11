# Defs

SVG definitions of music data.

## API

Usage
```js
var defs = new musje.Defs(svg, layoutOptions);
// musicData = bar | time | note | rest
var def = defs.get(musicData);
defs.getAccidental(accidental);
```

Result
```
def.el
def.width
def.height
```

## Internal classes

Definition classes only internally used by the Defs class.

```
- BarDef
- TimeDef
- NoteDef
    - PitchDef
        - AccidentalDef
    - DurationDef
```

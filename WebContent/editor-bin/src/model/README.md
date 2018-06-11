# model

```
Score
  - head {ScoreHead}
  - parts {PartwiseParts}
  - measures {TimewiseMeasures}
  - toString() -> {string}
  - toJSON() -> {Object}
  - walkCells(callback)
  - walkMusicData(callback)

ScoreHead
  - title {string}
  - subtitle {string}
  - subsubtitle {string}
  - composer {string}
  - arrange {string}
  - lyricist {string}
  - isEmpty {boolean}
  - toString() -> {string}
  - toJSON() -> {Object}

PartwiseParts ^ Array {Array.<PartwisePart>}
  - score {Score}
  - addParts(parts: {Array})
  - append(part: {Object})
  - removeAll()

PartwisePart
  - measures {Array.<Cell>}

TimewiseMeasures ^ Array {Array.<TimewiseMeasure>}
  - score {Score}
  - fromPartwise()
  - removeAll()
}

TimewiseMeasure
  - parts {Cell}
  - barRight {Bar}
  - barLeft {Bar}
  - el {Snap.Element}

Cell
  - data {Array of MusicData}
  - el {Snap.Element}

MusicDataMixin {Note|Rest|Chord|Voice|Time|Bar}
  - x
  - y
  - systemX
  - width
```

# Layout

## API

Usage

```js
var layout = musje.Layout(svg, layoutOptions);
layout.flow(score);
```

## Top-level layout hierachy.

```
- Svg(layout)
  - Body(layout)
    - Header(layout)
    - Content(layout): systems[]
```

## Flow between top levels

The flow control is managed using ES5 getter/setter properties.

```
Properties       Set horizatally affects      Set vertically affects
--------------------------------------------------------------------------
layout.svg
          .el
          .width                                   body.width
          .height     (read-only)                       |
layout.body               ^                             |
          .el             |                             V
          .width          |                header.width & content.width
          .height     svg.height                 |              |
layout.header       ^                            |              |
          .el       |                            V              |
          .width    |                      renderHeader()       |
                    |                            |              |
          .height   |  content.y  <--------------+              |
layout.content      |      |                                    |
          .el       |      V                                    |
          .y        +- body.height                              V
          .width    |                                   content.reflow() &
                    |                                    renderContent()
          .height   +- body.height  <---------------------------+
          .systems[]
          .flow()
```


## Content layout hieracy

```
- Content: systems[]
  - System(content, lo): measures[]
    - Measure(measure, system, lo)
      - barLeft
      - barRight
      - parts
        - Cell(cell, measure, lo): data[]
          - musicData
```

### Flow within content
```
layout.content
          .el
          .y
          .width
          .height     <---+
          .systems[]  <---+
          .flow()  -------+
                          |
system = systems[i]   <---+
          .el
          .y
          .width
          .height
          .measures[]
          .flow()

------------------------------------------------------------
measure =
measures[i]
          .el
          .x
          .width
          .height

bar =
measure.barLeft| measure.barRight
          .el
          .y
          .width
          .height
cell =
measure.parts[i]
          .el
          .x
          .y
          .width
          .height

musicData =
cell[i]
          .el
          .x
          .y
          .width
          .height
```
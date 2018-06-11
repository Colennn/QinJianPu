/* globals describe, it, expect */
'use strict';

var Cell = require('../Cell');

describe('Cell', function () {
  var mIndex = 1;
  var pIndex = 2;
  var scoreMock = {};

  it('#score {Score} @readonly', function () {
    var cell = new Cell(undefined, mIndex, pIndex, scoreMock);
    expect(cell.score).to.equal(scoreMock);
    expect(function () { cell.score = {}; }).to.throw(TypeError);
  });

  it('#data {MusicData}');

  it('#measures {TimewiseMeasures(Array)} @readonly');

  it('#measure {TimewiseMeasure} @readonly');

  it('#parts {PartwiseParts(Array)} @readonly');

  it('#prev {Cell|undefined @readonly');

  it('#next {Cell|undefined @readonly');

  it('#firstData {MusicData|undefined}');

  it('#lastData {MusicData|undefined}');

  it('#barLeft');

  it('#barRight');

  it('#append(MusicData)');

  it('#toString()');

  it('#toJSON()');
});

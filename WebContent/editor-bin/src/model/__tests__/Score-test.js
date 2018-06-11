/* global describe, it, expect */
'use strict';

var Score = require('../Score');
var ScoreHead = require('../ScoreHead');

describe('Score', function () {
  var score = new Score();

  it('#head {ScoreHead}', function () {
    expect(score.head).to.be.instanceof(ScoreHead);
  });

  it('#parts {PartwiseParts(Array)}', function () {
    expect(score.parts).is.an('array');
  });

  it('#measures {TimewiseMeasures(Array)}', function () {
    expect(score.measures).is.an('array');
  });

  it('#walkCell');

  it('#walkMusicData');

  it('#toString()');

  it('#toJSON()');
});

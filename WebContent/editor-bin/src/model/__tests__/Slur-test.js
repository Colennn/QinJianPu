/* globals describe, it, expect */
'use strict';

var Slur = require('../Slur');

describe('Slur', function () {
  var parentMock = {};

  it('#parent', function () {
    var slur = new Slur(parentMock);
    expect(slur.parent).to.equal(parentMock);
  });

  it('#begin');

  it('#end');

  it('#prevParent');

  it('#nextParent');

  it('#prevCrossTie');

  it('#nextCrossTie');

  it('#isEmpty');

  it('#toJSON()');
});

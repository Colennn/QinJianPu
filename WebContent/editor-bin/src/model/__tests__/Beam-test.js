/* global describe, it, expect */
'use strict';

var Beam = require('../Beam');

describe('Beam', function () {
  var parentMock = {};
  var beam = new Beam('begin', 1, parentMock);

  it('#parent: @readonly', function () {
    expect(beam.parent).to.equal(parentMock);
    expect(function () { beam.parent = {}; }).to.throw(TypeError);
  });

  it('#value: @readonly', function () {
    expect(beam.value).to.equal('begin');
    expect(function () { beam.value = {}; }).to.throw(TypeError);
  });

  it('#level: @readonly', function () {
    expect(beam.level).to.equal(1);
    expect(function () { beam.level = {}; }).to.throw(TypeError);
  });

  it('#endDurable: @readonly');
});

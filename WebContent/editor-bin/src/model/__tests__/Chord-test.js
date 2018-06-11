/* globals describe, it, expect */
'use strict';

var Chord = require('../Chord');
var Duration = require('../Duration');

describe('Chord', function () {

  it('#$type: @constant \'chord\'', function () {
    var chord = new Chord();
    expect(chord.$type).to.equal('chord');
    expect(function () { chord.$type = 'a'; }).to.throw(TypeError);
  });

  it('#pitches');

  it('#duration {Duration}', function () {
    var chord = new Chord();
    expect(chord.duration).to.be.instanceof(Duration);
  });

  // it('#beams {Array}', function () {
  //   var Chord = new Chord();
  //   expect(Chord.beams).to.be.instanceof(Array);
  // });

  it('#toString()');

  it('#toJSON()');
});

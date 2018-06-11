/* globals describe, it, expect */
'use strict';

var Pitch = require('../Pitch');

describe('Pitch', function () {
  var parentMock = {};

  it('#parent: @readonly', function () {
    var pitch = new Pitch(parentMock);
    expect(pitch.parent).to.equal(parentMock);
    expect(function () { pitch.parent = {}; }).to.throw(TypeError);
  });

  it('#step: @default 1', function () {
    var pitch = new Pitch(parentMock);
    expect(pitch.step).to.equal(1);
    pitch.step = 2;
    expect(pitch.step).to.equal(2);
    expect(new Pitch(parentMock, { step: 5 }).step).to.equal(5);
  });

  it('#octave: @default 0', function () {
    var pitch = new Pitch(parentMock);
    expect(pitch.octave).to.equal(0);
    pitch.octave = 2;
    expect(pitch.octave).to.equal(2);
    expect(new Pitch(parentMock, { octave: -3 }).octave).to.equal(-3);
  });

  it('#accidental: @default \'\'', function () {
    var pitch = new Pitch();
    expect(pitch.accidental).to.equal('');
    pitch.accidental = 'b';
    expect(pitch.accidental).to.equal('b');
    expect(new Pitch(parentMock, { accidental: '#' }).accidental).to.equal('#');
  });

  it('#alter: @readonly (may be writable later), @default: 0', function () {
    var pitch = new Pitch(parentMock);
    expect(pitch.alter).to.equal(0);
    pitch.accidental = '#';
    expect(pitch.alter).to.equal(1);
    pitch.accidental = '##';
    expect(pitch.alter).to.equal(2);
    pitch.accidental = 'n';
    expect(pitch.alter).to.equal(0);
    pitch.accidental = 'b';
    expect(pitch.alter).to.equal(-1);
    pitch.accidental = 'bb';
    expect(pitch.alter).to.equal(-2);
    pitch.accidental = '';
    expect(pitch.alter).to.equal(0);
    expect(function () { pitch.alter = 1; }).to.throw(TypeError);
  });

  it('#alterLink: @readonly');

  it('#midiNumber: @readonly (may be writable later)', function () {
    var pitch = new Pitch(parentMock);
    expect(pitch.midiNumber).to.equal(60);  // 1 (C) => 60
    pitch.step = 5;
    expect(pitch.midiNumber).to.equal(67);  // 5 (G) => 60 + 2 + 2 + 1 + 2
    pitch.octave = 1;
    expect(pitch.midiNumber).to.equal(79);  // 5' (G') => 67 + 12
    pitch.accidental = '#';
    expect(pitch.midiNumber).to.equal(80);  // #5' (G#') => 79 + 1
    expect(function () { pitch.midiNumber = 100; }).to.throw(TypeError);
  });

  it('#frequency: @readonly', function () {
    var pitch = new Pitch(parentMock);
    expect(pitch.frequency).to.within(261.62, 261.63);  // 1 (C)
    pitch.step = 6;
    expect(pitch.frequency).to.equal(440);  // 6 (A)
    pitch.step = 2;
    pitch.octave = -1;
    pitch.accidental = 'b';
    expect(pitch.frequency).to.within(138.59, 138.60);  // b2, (Db,)
    pitch.step = 5;
    pitch.octave = 1;
    pitch.accidental = '#';
    expect(pitch.frequency).to.within(830.60, 830.61);  // #5' (G#')
    expect(function () { pitch.frequency = 100; }).to.throw(TypeError);
  });

  it('#toString()');

  it('#toJSON()');
});

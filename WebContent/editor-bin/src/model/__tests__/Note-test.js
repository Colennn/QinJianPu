/* globals describe, it, expect */
'use strict';

var Note = require('../Note');
var Pitch = require('../Pitch');
var Duration = require('../Duration');
var Tie = require('../Tie');
var Slur = require('../Slur');

describe('Note', function () {

  it('#$type: @constant \'note\'', function () {
    var note = new Note();
    expect(note.$type).to.equal('note');
    expect(function () { note.$type = 'a'; }).to.throw(TypeError);
  });

  it('#pitch {Pitch}', function () {
    var note = new Note();
    expect(note.pitch).to.be.instanceof(Pitch);
  });

  it('#duration {Duration}', function () {
    var note = new Note();
    expect(note.duration).to.be.instanceof(Duration);
  });

  it('#beams {Array}', function () {
    var note = new Note();
    expect(note.beams).to.be.instanceof(Array);
  });

  it('#tie {Tie}', function () {
    var note = new Note();
    expect(note.tie).to.be.instanceof(Tie);
    // note.tie = '~';
    // expect(note.tie.value).to.equal('~');
  });

  it('#slur {Slur}', function () {
    var note = new Note();
    expect(note.slur).to.be.instanceof(Slur);
  });

  it('#toString()');

  it('#toJSON()');
});

/* globals describe, it, expect */
'use strict';

var Time = require('../Time');

describe('Time', function () {

  it('#$type: @constant \'time\'', function () {
    var time = new Time();
    expect(time.$type).to.equal('time');
    expect(function () { time.$type = 'a'; }).to.throw(TypeError);
  });

  it('#beats: @default 4', function () {
    var time = new Time();
    expect(time.beats).to.equal(4);
    time.beats = 3;
    expect(time.beats).to.equal(3);
    expect(new Time({ beats: 6 }).beats).to.equal(6);
  });

  it('#beatType: @default 4', function () {
    var time = new Time();
    expect(time.beatType).to.equal(4);
    time.beatType = 8;
    expect(time.beatType).to.equal(8);
    expect(new Time({ beatType: 16 }).beatType).to.equal(16);
  });

  it('#toString()');

  it('#toJSON()');
});

/* globals describe, it, expect */
'use strict';

var Duration = require('../Duration');

describe('Duration', function () {

  it('#$type: @constant \'duration\'', function () {
    var duration = new Duration();
    expect(duration.$type).to.equal('duration');
    expect(function () { duration.$type = 1; }).to.throw(TypeError);
  });

  it('#type', function () {
    var duration = new Duration();
    expect(duration.type).to.equal(4);
    duration.type = 2;
    expect(duration.type).to.equal(2);
    expect(new Duration({ type: 1 }).type).to.equal(1);
  });

  it('#dot', function () {
    var duration = new Duration();
    expect(duration.dot).to.equal(0);
    duration.dot = 2;
    expect(duration.dot).to.equal(2);
    expect(new Duration({ dot: 1 }).dot).to.equal(1);
  });

  it('#quarter: @readonly', function () {
    var duration = new Duration();
    expect(duration.quarter).to.equal(1);
    duration.type = 16;
    expect(duration.quarter).to.equal(1/4);
    duration.dot = 1;
    expect(duration.quarter).to.equal(3/8);
    duration.dot = 2;
    expect(duration.quarter).to.equal(7/16);
    expect(function () { duration.quarter = 2; }).to.throw(TypeError);
  });

  it('#second');

  it('#underbar: @readonly', function () {
    var duration = new Duration();
    expect(duration.underbar).to.equal(0);
    var underbars = [
      1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024
    ].map(function (type) {
      duration.type = type;
      return duration.underbar;
    });
    expect(underbars).to.eql([
      0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8
    ]);
    expect(function () { duration.underbar = 5; }).to.throw(TypeError);
  });

  it('#toString()');

  it('#toJSON()');
});

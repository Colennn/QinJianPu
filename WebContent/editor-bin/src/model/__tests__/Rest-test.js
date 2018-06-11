/* globals describe, it, expect */
'use strict';

var Rest = require('../Rest');
var Duration = require('../Duration');

describe('Rest', function () {

  it('#$type: @constant \'rest\'', function () {
    var rest = new Rest();
    expect(rest.$type).to.equal('rest');
    expect(function () { rest.$type = 'a'; }).to.throw(TypeError);
  });

  it('#duration {Duration}', function () {
    var rest = new Rest();
    expect(rest.duration).to.be.instanceof(Duration);
  });

  it('#beams {Array}', function () {
    var rest = new Rest();
    expect(rest.beams).to.be.instanceof(Array);
  });

  it('#toString()');

  it('#toJSON()');
});

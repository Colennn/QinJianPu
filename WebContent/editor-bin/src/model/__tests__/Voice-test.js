/* globals describe, it, expect */
'use strict';

var Voice = require('../Voice');

describe('Voice', function () {

  it('#$type: @constant \'voice\'', function () {
    var voice = new Voice();
    expect(voice.$type).to.equal('voice');
    expect(function () { voice.$type = 'a'; }).to.throw(TypeError);
  });

  it('#toString()');

  it('#toJSON()');
});

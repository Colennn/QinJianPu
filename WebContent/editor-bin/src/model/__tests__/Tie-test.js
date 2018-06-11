/* globals describe, it, expect */
'use strict';

var Tie = require('../Tie');

describe('Tie', function () {
  var parentMock = {};

  it('#parent', function () {
    var tie = new Tie(parentMock);
    expect(tie.parent).to.equal(parentMock);
  });

  it('#value @default: \'\'', function () {
    var tie = new Tie(parentMock);
    expect(tie.value).to.equal('');
  });

  it('#begin: alias #value', function () {
    var tie = new Tie(parentMock);
    expect(tie.begin).to.equal('');
  });

  it('#end');

  it('#prevParent');

  it('#nextParent');

  it('#prevHasError');

  it('#nextHasError');

  it('#toJSON()');
});

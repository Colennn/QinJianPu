/* globals describe, it, expect */
'use strict';

var ScoreHead = require('../ScoreHead');

describe('ScoreHead', function () {

  it('#title {string} @default\'\'', function () {
    var head = new ScoreHead();
    expect(head.title).to.equal('');
    head.title = 'My Title';
    expect(head.title).to.equal('My Title');
    expect(new ScoreHead({ title: 'My Song' }).title).to.equal('My Song');
  });

  it('#subtitle {string} @default\'\'', function () {
    var head = new ScoreHead();
    expect(head.subtitle).to.equal('');
    head.subtitle = 'My Subtitle';
    expect(head.subtitle).to.equal('My Subtitle');
    expect(new ScoreHead({ subtitle: 'sub' }).subtitle).to.equal('sub');
  });

  it('#subsubtitle {string} @default\'\'', function () {
    var head = new ScoreHead();
    expect(head.subsubtitle).to.equal('');
    head.subsubtitle = 'My Subsubtitle';
    expect(head.subsubtitle).to.equal('My Subsubtitle');
    expect(new ScoreHead({ subsubtitle: 'ss' }).subsubtitle).to.equal('ss');
  });

  it('#toString()');

  it('#toJSON()');
});

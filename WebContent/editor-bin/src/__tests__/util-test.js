/* globals describe, it, expect */
'use strict';

var util = require('../util');

describe('util', function () {

  it('.objEach(callback)', function () {
    var obj = { a: 1, b: 2, c: 3 };
    var result = {};
    util.objEach(obj, function (value, key) {
      result[key] = value + 1;
    });
    expect(result).to.eql({ a: 2, b: 3, c: 4});
  });

  it('.extend(obj, ext) -> obj', function () {
    var obj = { a: 1 };
    var target = util.extend(obj, { b: 2 });
    expect(target).to.equal(obj);
    expect(target).to.eql({ a: 1, b: 2 });

    util.extend(obj, { a: 3 });
    expect(obj).to.eql({ a: 3, b: 2 });

    util.extend(obj, { b: 4, c: 5 });
    expect(obj).to.eql({ a: 3, b: 4, c: 5 });
  });

  it('.near(a, b) -> {boolean}', function () {
    expect(util.near(1/3, 0.3333333)).to.be.true;
    expect(util.near(1, 1.1)).to.not.be.true;
  });

  describe('.defineProperties(obj, props)', function () {

    it('defines primitives', function () {
      var obj = { a: 2 };
      util.defineProperties(obj, { a: 1, b: 'hello', c: true, d: null });
      expect(obj).to.eql({ a: 1, b: 'hello', c: true, d: null });
      obj.a = 5;
      expect(obj.a).to.equal(5);
    });

    it('defines getter and setter', function () {
      var person = {};
      util.defineProperties(person, {
        name: {
          set: function (name) { this._name = name; },
          get: function () { return this._name; }
        },
        // readonly
        age: {
          get: function () { return 20; }
        }
      });
      expect(person.name).to.be.undefined;
      person.name = 'John';
      expect(person.name).to.equal('John');
      expect(person.age).to.equal(20);
      expect(function () { person.age = 21; }).to.throw(TypeError);
    });

    it('defines constant', function () {
      var obj = {};
      util.defineProperties(obj, {
        a: { constant: 5 }
      });
      expect(obj.a).to.equal(5);
      expect(function () { obj.a = 6; }).to.throw(TypeError);
    });
  });

  it('.makeToJSON(values, elName) -> {Function}');
});

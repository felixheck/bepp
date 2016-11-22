const test = require('tape').test;
const _ = require('lodash');
const sinon = require('sinon');
const PDFDocument = require('pdfkit');

const pkg = require('../src/index');
const engine = require('../src/engine');
const validate = require('../src/validate');
const utils = require('../src/utils');

test('bepp.utils.is >> returns true for string', t => {
  t.equal(utils.is('foo'), true);
  t.end();
});

test('bepp.utils.is >> returns true for number', t => {
  t.equal(utils.is(1), true);
  t.end();
});

test('bepp.utils.is >> returns true for 0', t => {
  t.equal(utils.is(0), true);
  t.end();
});

test('bepp.utils.is >> returns true for empty array', t => {
  t.equal(utils.is([]), true);
  t.end();
});

test('bepp.utils.is >> returns false for undefined', t => {
  t.equal(utils.is(undefined), false);
  t.end();
});

test('bepp.utils.is >> returns false for null', t => {
  t.equal(utils.is(null), false);
  t.end();
});

test('bepp.utils.is >> returns false for empty string', t => {
  t.equal(utils.is(''), false);
  t.end();
});

test('bepp.utils.is >> returns false for "none"', t => {
  t.equal(utils.is('none'), false);
  t.end();
});

test('bepp.utils.parseFloats >> parses \'cx\' and \'cy\' to floats', t => {
  const original = { cx: '0.42', cy: '0.42' };
  utils.parseFloats(original);

  t.deepEqual(original, { cx: 0.42, cy: 0.42 });
  t.end();
});

test('bepp.utils.parseFloats >> parses \'r\' to float', t => {
  const original = { r: '0.42' };
  utils.parseFloats(original);

  t.deepEqual(original, { r: 0.42 });
  t.end();
});

test('bepp.utils.parseFloats >> parses center \'rx\' and \'ry\' to floats', t => {
  const original = { rx: '0.42', ry: '0.42' };
  utils.parseFloats(original);

  t.deepEqual(original, { rx: 0.42, ry: 0.42 });
  t.end();
});

test('bepp.utils.parseFloats >> parses not \'stroke\' to float', t => {
  const original = { stroke: '#FOOBAR' };
  const result = Object.assign({}, original);
  utils.parseFloats(original);

  t.deepEqual(original, result);
  t.end();
});

test('bepp.utils.parseFloats >> parses not \'strokeWidth\' to float', t => {
  const original = { strokeWidth: '42' };
  const result = Object.assign({}, original);
  utils.parseFloats(original);

  t.deepEqual(original, result);
  t.end();
});

test('bepp.utils.parseFloats >> parses not \'strokeMiterLimit\' to float', t => {
  const original = { strokeMiterLimit: '42' };
  const result = Object.assign({}, original);
  utils.parseFloats(original);

  t.deepEqual(original, result);
  t.end();
});

test('bepp.utils.parseFloats >> parses not \'fill\' to float', t => {
  const original = { fill: '#FOOBAR' };
  const result = Object.assign({}, original);
  utils.parseFloats(original);

  t.deepEqual(original, result);
  t.end();
});

test('bepp.utils.parseFloats >> parses not \'name\' to float', t => {
  const original = { name: 'foobar' };
  const result = Object.assign({}, original);
  utils.parseFloats(original);

  t.deepEqual(original, result);
  t.end();
});

test('bepp.utils.parseFloats >> parses not \'d\' to float', t => {
  const original = { d: 'F 4 O 2 O' };
  const result = Object.assign({}, original);
  utils.parseFloats(original);

  t.deepEqual(original, result);
  t.end();
});

test('bepp.utils.parseFloats >> parses not \'width\'  and \'height\' to floats', t => {
  const original = { width: '42', height: '42' };
  const result = Object.assign({}, original);
  utils.parseFloats(original);

  t.deepEqual(original, result);
  t.end();
});

test('bepp.utils.parseFloats >> parses not \'x1\' and \'x2\' to floats', t => {
  const original = { x1: '42', x2: '42' };
  const result = Object.assign({}, original);
  utils.parseFloats(original);

  t.deepEqual(original, result);
  t.end();
});

test('bepp.utils.parseFloats >> parses not \'y1\' and \'y2\' to floats', t => {
  const original = { y1: '42', y2: '42' };
  const result = Object.assign({}, original);
  utils.parseFloats(original);

  t.deepEqual(original, result);
  t.end();
});
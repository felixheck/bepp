const test = require('tape').test;
const _ = require('lodash');
const sinon = require('sinon');
const PDFDocument = require('pdfkit');

const pkg = require('../src/index');
const engine = require('../src/engine');
const validate = require('../src/validate');
const utils = require('../src/utils');

test('bepp.index >> exposes function', (t) => {
  t.equal(_.isFunction(pkg), true);
  t.end();
});

test('bepp.index >> calls the validation', (t) => {
  const spy = sinon.spy(validate, 'all');
  pkg(new PDFDocument(), 'test.svg');

  t.equal(spy.called, true);
  t.end();

  spy.restore();
});

test('bepp.index >> starts the read and parse process', (t) => {
  const spy = sinon.spy(utils, 'readAndParse');
  pkg(new PDFDocument(), 'test.svg');

  t.equal(spy.called, true);
  t.end();

  spy.restore();
});


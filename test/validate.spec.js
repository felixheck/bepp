const test = require('tape').test;
const PDFDocument = require('pdfkit');

const validate = require('../src/validate');

const document = new PDFDocument();
const filePath = 'mock.svg';

test('bepp.validate.document >> does not throw in case of plain object', (t) => {
  t.doesNotThrow(() => { validate.document(document); }, /error/i);
  t.end();
});

test('bepp.validate.document >> throws in case of plain object', (t) => {
  t.throws(() => { validate.document({}); }, /error/i);
  t.end();
});

test('bepp.validate.document >> throws in case of null', (t) => {
  t.throws(() => { validate.document(null); }, /error/i);
  t.end();
});

test('bepp.validate.document >> throws in case of undefined', (t) => {
  t.throws(() => { validate.document(undefined); }, /error/i);
  t.end();
});

test('bepp.validate.document >> throws in case of array', (t) => {
  t.throws(() => { validate.document([]); }, /error/i);
  t.end();
});

test('bepp.validate.document >> throws in case of string', (t) => {
  t.throws(() => { validate.document(''); }, /error/i);
  t.end();
});

test('bepp.validate.document >> throws in case of number', (t) => {
  t.throws(() => { validate.document(42); }, /error/i);
  t.end();
});

test('bepp.validate.filePath >> does not throw in case of string trailing with \'.svg\'', (t) => {
  t.doesNotThrow(() => { validate.filePath(filePath); }, /error/i);
  t.end();
});

test('bepp.validate.filePath >> throws in case of string trailing with \'.pdf\'', (t) => {
  t.throws(() => { validate.filePath('foobar.pdf'); }, /error/i);
  t.end();
});

test('bepp.validate.filePath >> throws in case of empty string', (t) => {
  t.throws(() => { validate.filePath(''); }, /error/i);
  t.end();
});

test('bepp.validate.filePath >> throws in case of number', (t) => {
  t.throws(() => { validate.filePath(42); }, /error/i);
  t.end();
});

test('bepp.validate.options >> does not throw in case of plain object', (t) => {
  t.doesNotThrow(() => { validate.options({ foo: 42 }); }, /error/i);
  t.end();
});

test('bepp.validate.options >> does not throw in case of empty plain object', (t) => {
  t.doesNotThrow(() => { validate.options({}); }, /error/i);
  t.end();
});

test('bepp.validate.options >> throws in case of non-plain object', (t) => {
  t.throws(() => { validate.options(document); }, /error/i);
  t.end();
});

test('bepp.validate.options >> throws in case of array', (t) => {
  t.throws(() => { validate.options([]); }, /error/i);
  t.end();
});

test('bepp.validate.options >> throws in case of string', (t) => {
  t.throws(() => { validate.options('options'); }, /error/i);
  t.end();
});

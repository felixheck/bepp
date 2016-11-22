const test = require('tape').test;

test('bepp >> utils > ', t => {
  t.equal('hi', 'hi');
  t.throws(() => {throw Error()}, /error/i);
  t.end();
});
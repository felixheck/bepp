const _ = require('lodash');
const svgson = require('svgson');
const fs = require('fs');

const floats = ['cx', 'cy', 'r', 'ry', 'rx'];
const is = attr => attr && attr !== 'none';

/**
 * @function
 * @public
 *
 * @description
 * Parses predefined properties as floats
 *
 * @param {Object} attrs The object to be checked and parsed
 */
function parseFloats(attrs) {
  _.forEach(floats, (key) => {
    if (is(attrs[key])) {
      attrs[key] = parseFloat(attrs[key]);
    }
  });
}

/**
 * @function
 * @public
 *
 * @description
 * Reads file stream and parses svg file into object
 *
 * @param {string} filepath The absolute path of the file
 * @param {Object} options The svgson options
 * @param {Function} done The done callback handler
 */
function readAndParse(filepath, options, done) {
  fs.readFile(filepath, 'utf-8', (err, file) => {
    if (err) throw err;
    svgson(file, options, done);
  });
}

module.exports = {
  is,
  parseFloats,
  readAndParse,
};

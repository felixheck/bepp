const _ = require('lodash');
const svgson = require('svgson');
const fs = require('fs');

/**
 * @type {Array.<?string>}
 * @private
 *
 * @description
 * List of attribute keys to be parsed to floating point number
 */
const floats = ['cx', 'cy', 'r', 'ry', 'rx'];

/**
 * @function
 * @public
 *
 * @description
 * Checks if attribute is neither null nor undefined nor 'none'
 *
 * @param {*} attr The attribute to be checked
 * @returns {boolean} Whether the conditions matches
 */
function is(attr) {
  return !_.includes([null, undefined, 'none', ''], attr);
}

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
 * @param {string} path The path of the SVG file
 * @param {Object} options The svgson options
 * @param {Function} done The done callback handler
 */
function readAndParse(path, options, done) {
  svgson(fs.readFileSync(path, 'utf-8'), options, done);
}

module.exports = {
  is,
  parseFloats,
  readAndParse,
};

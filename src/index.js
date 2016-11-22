const validate = require('./validate');
const engine = require('./engine');
const utils = require('./utils');

/**
 * @function
 * @public
 *
 * @description
 * Renders the passed SVG onto the passed pdfkit instance
 *
 * @param {PDFDocument} document The PDF document to be extended
 * @param {string} path The path of the SVG file
 * @param {Object} options? The svgson options
 */
function bepp(document, path, options = {}) {
  validate.all(document, path, options);

  utils.readAndParse(path, options, (result) => {
    engine.render(document, result.childs);
  });
}

module.exports = bepp;

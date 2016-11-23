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
 * @param {string} filePath The path of the SVG file
 * @param {Object} options? The svgson options
 */
function bepp(document, filePath, options = {}) {
  validate.all(document, filePath, options);

  utils.readAndParse(filePath, options, (result) => {
    engine.render(document, result.childs);
  });
}

module.exports = bepp;

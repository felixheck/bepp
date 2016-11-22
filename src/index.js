const validate = require('./validate');
const { render } = require('./engine');
const { readAndParse } = require('./utils');

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

  readAndParse(path, options, (result) => {
    render(document, result.childs);
  });
}

module.exports = bepp;

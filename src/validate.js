const PDFDocument = require('pdfkit');
const _ = require('lodash');

/**
 * @function
 * @public
 *
 * @description
 * Validates the document parameter
 *
 * @param {*} document The document to be validated
 *
 * @throws In case of invalid parameter
 */
function validateDocument(document) {
  if (PDFDocument.prototype.isPrototypeOf(document)) {
    throw new SyntaxError('Document parameter has to be a \'pdfkit\' instance.')
  }
}

/**
 * @function
 * @public
 *
 * @description
 * Validates the filepath parameter
 *
 * @param {*} filepath The file's path to be validated
 *
 * @throws In case of invalid parameter
 */
function validateFilepath(filepath) {
  if (!filepath || !_.isString(filepath)) {
    throw new SyntaxError('Filepath parameter has to be a non-empty string.');
  }

  if (!_.endsWith('.svg')) {
    throw new SyntaxError('Filepath should be related to a svg file.');
  }
}

/**
 * @function
 * @public
 *
 * @description
 * Validates the options parameter
 *
 * @param {*} options The options to be validated
 *
 * @throws In case of invalid parameter
 */
function validateOptions(options) {
  if (!_.isPlainObject(options)) {
    throw new SyntaxError('Options parameter has to be an object.');
  }
}

/**
 * @function
 * @public
 *
 * @description
 * Validates several parameters
 *
 * @param {*} document The document to be validated
 * @param {*} filepath The file's path to be validated
 * @param {*} options The options to be validated
 */
function validateAll(document, filepath, options) {
  validateDocument(document);
  validateFilepath(filepath);
  validateOptions(options);
}

module.exports = {
  document: validateDocument,
  filepath: validateFilepath,
  options: validateOptions,
  all: validateAll,
};

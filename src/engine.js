const _ = require('lodash');
const { is, parseFloats } = require('./utils');

const collection = [];

/**
 * @function
 * @public
 *
 * @description
 * Collects all children recursively
 *
 * @param {Array | *} items The children to be collected
 */
function collect(items = []) {
  _.forEach(items, (item) => {
    collection.push(item);
    collect(item.childs);
  });
}

/**
 * @function
 * @public
 *
 * @this {PDFDocument} document
 *
 * @description
 * Sets related fill and stroke properties
 *
 * @param {Object} attrs The included list of attributes
 */
function fillAndOrStroke(attrs) {
  const hasStroke = is(attrs.stroke);
  const hasFill = is(attrs.fill);
  const document = this;

  if (hasStroke && !hasFill) {
    document.stroke(attrs.stroke);
  } else if (!hasStroke && hasFill) {
    document.fill(attrs.fill);
  } else if (hasStroke && hasFill) {
    document.fillAndStroke(attrs.fill, attrs.stroke);
  }
}

/**
 * @function
 * @public
 *
 * @this {PDFDocument} document
 *
 * @description
 * Sets related miterLimit and lineWidth properties
 *
 * @param {Object} attrs The included list of attributes
 */
function setProperties(attrs) {
  const document = this;

  if (is(attrs.strokeMiterlimit)) {
    document.miterLimit(attrs.strokeMiterlimit);
  }

  if (is(attrs.strokeWidth)) {
    document.lineWidth(attrs.strokeWidth);
  }
}

/**
 * @function
 * @public
 *
 * @description
 * Draws collected segments
 *
 * @param {PDFDocument} document The PDF document to be extended
 */
function draw(document) {
  _.forEach(collection, (item) => {
    parseFloats(item.attrs);
    setProperties.call(document, item.attrs);

    switch (item.name) {
      case 'path':
        document.path(item.attrs.d);
        break;
      case 'circle':
        document.circle(item.attrs.cx, item.attrs.cy, item.attrs.r);
        break;
      case 'ellipse':
        item.attrs.ry = item.attrs.ry || item.attrs.rx;
        document.ellipse(item.attrs.cx, item.attrs.cy, item.attrs.rx, item.attrs.ry);
        break;
      case 'line':
        item.attrs.deltaX = item.attrs.x2 - item.attrs.x1;
        item.attrs.deltaY = item.attrs.y2 - item.attrs.y1;
        document.rect(item.attrs.x1, item.attrs.y1, item.attrs.deltaX, item.attrs.deltaY);
        break;
      case 'rect':
        document.rect(item.attrs.x, item.attrs.y, item.attrs.width, item.attrs.height);
        break;
      default:
    }

    fillAndOrStroke.call(document, item.attrs);
  });
}

/**
 * @function
 * @public
 *
 * @description
 * Renders collected segments
 *
 * @param {PDFDocument} document The PDF document to be extended
 * @param {Array.<?Object>} baseNode The base node of the SVG to be rendered
 */
function render(document, baseNode) {
  collect(baseNode);
  draw(document);
}

module.exports = {
  collect,
  fillAndOrStroke,
  setProperties,
  draw,
  render,
};

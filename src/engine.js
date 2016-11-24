const _ = require('lodash');
const { is, parseFloats } = require('./utils');

const collection = [];
const defaults = {
  stroke: 'none',
  strokeWidth: '1',
  strokeMiterLimit: '0',
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
  fill: 'none',
  opacity: 1,
};

/**
 * @function
 * @private
 *
 * @description
 * Sets default values
 *
 * @param {Object} attrs The attributes to be extended
 * @returns {Object} The extended attributes
 */
function setDefaults(attrs) {
  return Object.assign({}, defaults, _.omitBy(attrs, attr => attr === 'none'));
}

/**
 * @function
 * @private
 *
 * @this {PDFDocument} document
 *
 * @description
 * Sets related fill and stroke properties
 *
 * @param {Object} attrs The included list of attributes
 */
function fillAndOrStroke(attrs) {
  const hasNoneStroke = attrs.stroke === 'none';
  const hasStroke = is(attrs.stroke) || hasNoneStroke;
  const hasNoneFill = attrs.fill === 'none';
  const hasFill = is(attrs.fill) || hasNoneFill;
  const document = this;

  document.fillOpacity(hasNoneFill ? 0 : 1);
  document.strokeOpacity(hasNoneStroke ? 0 : 1);

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
 * @private
 *
 * @this {PDFDocument} document
 *
 * @description
 * Sets related properties
 *
 * @param {Object} attrs The included list of attributes
 */
function setProperties(attrs) {
  const document = this;

  document.lineCap(attrs.strokeLinecap);
  document.lineJoin(attrs.strokeLinejoin);

  if (is(attrs.transform)) {
    document.transform(..._.map(attrs.transform.slice(7, -1).split(' '), parseFloat));
  }

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
 * @description
 * Draws collected segments
 *
 * @param {PDFDocument} document The PDF document to be extended
 */
function draw(document) {
  _.forEach(collection, (item) => {
    document.initVector();
    document.restore();
    document.save();
    item.attrs = setDefaults(item.attrs);

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
        document.moveTo(item.attrs.x1, item.attrs.y1).lineTo(item.attrs.x2, item.attrs.y2);
        break;
      case 'rect':
        document.rect(item.attrs.x, item.attrs.y, item.attrs.width, item.attrs.height);
        break;
      case 'polygon':
        item.pointPairs = _.trim(item.attrs.points).split(' ');
        item.points = _.map(item.pointPairs, pointPair => _.trim(pointPair).split(','));
        document.polygon(...item.points);
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
  collection.length = 0;
  collect(baseNode);
  draw(document);
}

module.exports = {
  collect,
  draw,
  render,
};

const _ = require('lodash');

const validate = require('./validate');
const { is, parseFloats, readAndParse } = require('./utils');

function bepp(document, filepath, options = {}) {
  const collection = [];

  validate.all(document, filepath, options);

  /**
   * @function
   * @private
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
   * @private
   *
   * @description
   * Sets related fill and stroke properties
   *
   * @param {Object} attrs The included list of attributes
   */
  function fillAndOrStroke(attrs) {
    const hasStroke = is(attrs.stroke);
    const hasFill = is(attrs.fill);

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
   * @description
   * Sets related miterLimit and lineWidth properties
   *
   * @param {Object} attrs The included list of attributes
   */
  function setProperties(attrs) {
    if (is(attrs.strokeMiterlimit)) {
      document.miterLimit(attrs.strokeMiterlimit);
    }

    if (is(attrs.strokeWidth)) {
      document.lineWidth(attrs.strokeWidth);
    }
  }

  /**
   * @function
   * @private
   *
   * @description
   * Draws collected segments
   */
  function draw() {
    _.forEach(collection, (item) => {
      parseFloats(item.attrs);
      setProperties(item.attrs);

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

      fillAndOrStroke(item.attrs);
    });
  }

  readAndParse(filepath, options, (result) => {
    collect(result.childs);
    draw();
  });
}

module.exports = bepp;

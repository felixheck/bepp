const validate = require('./validate');
const render = require('./render');
const { readAndParse } = require('./utils');

function bepp(document, filepath, options = {}) {
  validate.all(document, filepath, options);

  readAndParse(filepath, options, (result) => {
    render(document, result.childs);
  });
}

module.exports = bepp;

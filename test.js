const PDFDocument = require('pdfkit');
const bepp = require('./src/index');
const path = require('path');
const fs = require('fs');

const doc = new PDFDocument({
  size: 'A4',
});

bepp(doc, path.resolve(__dirname, 'test.svg'));
doc.pipe(fs.createWriteStream('./test.pdf'));
doc.end();


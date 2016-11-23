![bepp](https://raw.githubusercontent.com/felixheck/bepp/master/logo.png)

# bepp
#### Minimalist SVG Parser/Renderer for [PDFKit](https://github.com/devongovett/pdfkit)

[![Travis](https://img.shields.io/travis/felixheck/bepp.svg)](https://travis-ci.org/felixheck/bepp/builds/) [![npm](https://img.shields.io/npm/dt/bepp.svg)](https://www.npmjs.com/package/bepp) [![node](https://img.shields.io/node/v/gh-badges.svg)]()

---

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)
5. [Example](#example)
6. [Testing](#testing)
7. [Contribution](#contribution)
8. [License](#license)

## Introduction

This [PDFKit](https://github.com/devongovett/pdfkit) extensions enables to render single SVG files - based on ellipses', circles, rects, paths and lines - into your document, as it is shown in the [example](#example) below.

The plugin is implemented in ECMAScript 6. The development dependencies are based on `eslint` and `tape` to grant a high quality implementation.

**bepp** is the Swabian term for *glue*.

## Installation
For installation use the [Node Package Manager](https://github.com/npm/npm):
```
$ npm install --save bepp
```

or clone the repository:
```
$ git clone https://github.com/felixheck/bepp
```

## Usage
#### Import
First you have to import the module:
``` js
const bepp = require('bepp');
```

#### Create PDFKit instance
Afterwards create your own **PDFKit** instance with needed options:
``` js
const PDFDocument = require('pdfkit');

const doc = new PDFDocument({
	size: 'A4',
});
```

#### Registration
Finally pass in the **PDFKit** instance and the related file path:
``` js
const path = require('path');

bepp(doc, path.resolve(__dirname, 'test.svg');

...
```

After executing **bepp** the SVG gets rendered into the document. Do not forget to call `doc.end()` at the very end.

## API
#### `beep(document, path[, options])`

- `document {pdfkit}` - The [PDFKit](https://github.com/devongovett/pdfkit) instance to be extended.
- `path {string}` - The SVG file's path.
- `options {Object}` - The module specific options object, passed through to [svgson](https://github.com/elrumordelaluz/svgson).


##Example

``` js
// Import dependencies
const bepp = require('bepp');
const path = require('path');
const PDFDocument = require('pdfkit');

// Create PDFKit instance
const doc = new PDFDocument({
	size: 'A4',
});

// Do some stuff

// Render SVG into the document
bepp(doc, path.resolve(__dirname, 'test.svg');

// Do some stuff

doc.end();

```

## Testing
First you have to install all dependencies:
```
$ npm install
```

To execute all unit tests once, use:
```
$ npm test
```

or to run tests based on file watcher, use:
```
$ npm start
```

To get information about the test coverage, use:
```
$ npm run coverage
```

## Contribution
Fork this repository and push in your ideas.

Do not forget to add corresponding tests to keep up 100% test coverage.

## License
The MIT License

Copyright (c) 2016 Felix Heck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

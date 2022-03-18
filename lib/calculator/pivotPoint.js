'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/pivotPoints.js

The MIT License (MIT)

Copyright (c) 2014-2015 Scott Logic Ltd.

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
*/

exports.default = function () {
  var options = _defaultOptionsForComputation.pivotPoint;

  var source = function source(d) {
    return { open: d.open, high: d.high, low: d.low, close: d.close };
  };

  function calculator(data) {
    var _options = options,
      windowSize = _options.windowSize;

    var high = function high(d) {
        return source(d).high;
      },
      low = function low(d) {
        return source(d).low;
      },
      close = function close(d) {
        return source(d).close;
      };

    var pivotPointAlgorithm = (0, _utils.slidingWindow)()
      .windowSize(windowSize)
      .accumulator(function (values) {
        var h = (0, _d3Array.max)(values, high);
        var l = (0, _d3Array.max)(values, low);
        var c = (0, _d3Array.max)(values, close);
        var P = h + l + c / 3;
        var R1 = P * 2 - l;
        var R2 = P + (h - l);
        var S1 = P * 2 - h;
        var S2 = P - (h - l);
        return {
          P,
          R1,
          R2,
          S1,
          S2,
        };
      });
    return pivotPointAlgorithm(data);
  }
  calculator.undefinedLength = function () {
    var _options2 = options,
      windowSize = _options2.windowSize;

    return windowSize - 1;
  };
  calculator.options = function (x) {
    if (!arguments.length) {
      return options;
    }
    options = _extends({}, _defaultOptionsForComputation.pivotPoint, x);
    return calculator;
  };

  return calculator;
};

var _d3Array = require('d3-array');

var _ema = require('./ema');

var _ema2 = _interopRequireDefault(_ema);

var _utils = require('../utils');

var _defaultOptionsForComputation = require('./defaultOptionsForComputation');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
//# sourceMappingURL=pivotPoint.js.map

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
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/exponentialMovingAverage.js

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
  var options = _defaultOptionsForComputation.EMA;

  function calculator(data) {
    var _options = options,
      windowSize = _options.windowSize,
      realTime = _options.realTime,
      candlePos = _options.candlePos,
      custom = _options.custom,
      sourcePath = _options.sourcePath;



    var source = sourcePath
    if (isNaN(sourcePath) && ["close", "high", "low", "open", "volume"].includes(sourcePath)) {
      source = (0, _utils.path)(sourcePath)
    }
    var alpha = 2 / (windowSize + 1);
    var previous = void 0;
    var initialAccumulator = 0;
    // var skip = realTime ? 0 : candlePos;
    var skip = 0;

    const getValue = (d, i, logic) => {
      let { close, high, low, open, volume } = d

      switch (typeof source) {
        case 'function':
          return eval(logic)
        case 'string':
          return eval(custom)
        default:
          return source
      }
    }

    return data.map(function (d, i) {
      let returnVal = undefined;
      var v = getValue(d, i, "source(d, i)")
      // if (!realTime && i > data.length - (candlePos + 1)) {
      //   return previous;
      // }
      if ((0, _utils.isNotDefined)(previous) && (0, _utils.isNotDefined)(v)) {
        skip++;
      } else if (i < windowSize + skip - 1) {
        v = getValue(d, i, "source(realTime ? d : data[i - candlePos], i)");
        initialAccumulator += v;
      } else if (i === windowSize + skip - 1) {
        v = getValue(d, i, "source(realTime ? d : data[i - candlePos], i)");
        initialAccumulator += v;
        var initialValue = initialAccumulator / windowSize;
        previous = initialValue;
        returnVal = initialValue;
      } else {
        v = getValue(d, i, "source(realTime ? d : data[i - candlePos], i)");
        var nextValue = v * alpha + (1 - alpha) * previous;
        previous = nextValue;
        returnVal = nextValue;
      }
      return returnVal;
    });
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
    options = _extends({}, _defaultOptionsForComputation.EMA, x);
    return calculator;
  };

  return calculator;
};

var _utils = require('../utils');

var _defaultOptionsForComputation = require('./defaultOptionsForComputation');
//# sourceMappingURL=ema.js.map

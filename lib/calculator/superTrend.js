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
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/superTrends.js

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
  var options = _defaultOptionsForComputation.SuperTrend;

  var source = function source(d) {
    return { open: d.open, high: d.high, low: d.low, close: d.close };
  };

  var high = function high(d) {
      return source(d).high;
    },
    low = function low(d) {
      return source(d).low;
    },
    close = function close(d) {
      return source(d).close;
    };

  function atr(rawData, timePeriod) {
    // first, we need a data set of only the highs and lows
    // var highs = (0, _d3Array.sum)(values, high);
    // var lows = (0, _d3Array.sum)(values, low);
    // var closes = (0, _d3Array.sum)(values, close);
    // let highs = extractData(rawData, 'high');
    // let lows = extractData(rawData, 'low');
    // let closes = extractData(rawData, 'close');
    // Get the True Range
    // True Range Formula = MAX of (high-low; High-PreviousClose; //PreviousCLose-Low)
    // Create an array of all True Range Values
    let trueRange = [];
    for (let i = 1; i - 1 < rawData.length - 1; i++) {
      let tr1 = rawData[i].high - rawData[i].low;
      let tr2 = Math.abs(rawData[i].high - rawData[i - 1].close);
      let tr3 = Math.abs(rawData[i - 1].close - rawData[i].low);
      trueRange.push(Math.max(tr1, tr2, tr3));
    }
    // use the array of True Range Values to get the Simple Moving //Average of the true range, ie., ATR
    if (timePeriod >= trueRange.length) {
      // if the timePeriod is //greater then the entire dataset, just return the average of the //whole set
      return (
        trueRange.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        ) / trueRange.length
      );
    } else {
      let nData = trueRange.slice(timePeriod * -1);
      return (
        nData.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        ) / timePeriod
      );
    }
  }

  function calculator(data) {
    var _options = options,
      multiplier = _options.multiplier,
      windowSize = _options.windowSize;

    var superTrendAlgorithm = (0, _utils.slidingWindow)()
      .windowSize(windowSize)
      .accumulator(function (values) {
        var h = (0, _d3Array.sum)(values, high);
        var l = (0, _d3Array.sum)(values, low);
        var a = atr(values, windowSize);
        var re = {
          up: (h + l) / 2 + multiplier * a,
          down: (h + l) / 2 - multiplier * a,
        };
        return re;
      });
    return superTrendAlgorithm(data);
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
    options = _extends({}, _defaultOptionsForComputation.SuperTrend, x);
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
//# sourceMappingURL=superTrend.js.map

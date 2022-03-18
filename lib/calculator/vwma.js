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

var source = function source(d) {
  return {
    open: d.open,
    high: d.high,
    low: d.low,
    close: d.close,
    volume: d.volume,
  };
};

exports.default = function () {
  var options = _defaultOptionsForComputation.VWMA;

  function calculator(data) {
    var _options = options,
      windowSize = _options.windowSize,
      sourcePath = _options.sourcePath;

    var weight = (windowSize * (windowSize + 1)) / 2;

    var high = function high(d) {
        return source(d).high;
      },
      low = function low(d) {
        return source(d).low;
      },
      close = function close(d) {
        return source(d).close;
      },
      volume = function volume(d) {
        return source(d).volume;
      };

    var vwaverage = (0, _utils.slidingWindow)()
      .windowSize(windowSize)
      .accumulator(function (values) {
        var total = 0;
        var totalV = 0;
        var total = (0, _d3Array.sum)(values, function (v, i) {
          return v.volume * v[sourcePath];
        });
        var totalV = (0, _d3Array.sum)(values, function (v, i) {
          return totalV + v.volume;
        });
        if (!totalV) {
          return 0;
        }
        return total / totalV;
      });

    return vwaverage(data);
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
    options = _extends({}, _defaultOptionsForComputation.VWMA, x);
    return calculator;
  };

  return calculator;
};

var _d3Array = require('d3-array');

var _utils = require('../utils');

var _defaultOptionsForComputation = require('./defaultOptionsForComputation');
//# sourceMappingURL=wma.js.map

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
  var options = _defaultOptionsForComputation.VWAP;

  function calculator(data) {
    var windowSize = options.windowSize;

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

    var vwapCalc = (0, _utils.slidingWindow)()
      .windowSize(windowSize)
      .accumulator(function (values) {
        var v = volume((0, _utils.last)(values));
        var c = close((0, _utils.last)(values));
        var h = (0, _d3Array.max)(values, high);
        var l = (0, _d3Array.min)(values, low);
        var p = (h + l + c) / 3;
        var vp = p * v;
        return vp / v;
      });

    return vwapCalc(data);
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
    options = _extends({}, _defaultOptionsForComputation.VWAP, x);
    return calculator;
  };

  return calculator;
};

var _d3Array = require('d3-array');

var _utils = require('../utils');

var _defaultOptionsForComputation = require('./defaultOptionsForComputation');

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require('../../GenericChartComponent');

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require('../../GenericComponent');

var _utils2 = require('../utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass,
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

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

var EachExtendedHours = (function (_Component) {
  _inherits(EachExtendedHours, _Component);

  function EachExtendedHours(props) {
    _classCallCheck(this, EachExtendedHours);

    var _this = _possibleConstructorReturn(
      this,
      (
        EachExtendedHours.__proto__ || Object.getPrototypeOf(EachExtendedHours)
      ).call(this, props),
    );

    _this.renderSVG = _this.renderSVG.bind(_this);
    _this.drawOnCanvas = _this.drawOnCanvas.bind(_this);

    _this.saveNodeType = _utils2.saveNodeType.bind(_this);
    _this.nodes = {};

    _this.state = {
      hover: false,
    };
    return _this;
  }

  _createClass(EachExtendedHours, [
    {
      key: 'drawOnCanvas',
      value: function drawOnCanvas(ctx, moreProps) {
        var _props = this.props,
          stroke = _props.stroke,
          strokeWidth = _props.strokeWidth,
          fill = _props.fill;
        var _props2 = this.props,
          fillOpacity = _props2.fillOpacity,
          strokeOpacity = _props2.strokeOpacity;
        var r = this.props.r;

        var _helper3 = helper(this.props, moreProps),
          _helper4 = _slicedToArray(_helper3, 2),
          x = _helper4[0],
          y = _helper4[1];

        ctx.lineWidth = strokeWidth;
        ctx.fillStyle = (0, _utils.hexToRGBA)(fill, fillOpacity);
        ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
      },
    },
    {
      key: 'renderSVG',
      value: function renderSVG(moreProps) {
        var plotData = moreProps.plotData;
        var xScale = moreProps.xScale,
          yScale = moreProps.chartConfig.yScale,
          xAccessor = moreProps.xAccessor,
          fullData = moreProps.fullData;

        var leftColor = this.props.leftColor;
        var leftOpacity = this.props.leftOpacity;
        var rightColor = this.props.rightColor;
        var rightOpacity = this.props.rightOpacity;

        let premarketList = [];
        let afterHoursList = [];
        let hourPrevDate = 0;
        plotData.map((plot, index) => {
          const hour = new Date(plot.date).getHours();
          const minutes = new Date(plot.date).getMinutes();
          if (
            (hour >= 20 && hour < 23) ||
            (hour >= 11 && hour < 13) ||
            (hour === 13 && minutes < 1) ||
            (hour === 23 && minutes < 1)
          ) {
            let nDate = new Date(plot.date);
            if (hour >= 20 && hour <= 23) {
              if (index < plotData.length - 1) {
                premarketList.push({
                  ...plot,
                  newDate: `${nDate.getDate()}/${
                    nDate.getMonth() + 1
                  }/${nDate.getFullYear()}`,
                });
              }
            } else {
              if (index < plotData.length - 1) {
                afterHoursList.push({
                  ...plot,
                  newDate: `${nDate.getDate()}/${
                    nDate.getMonth() + 1
                  }/${nDate.getFullYear()}`,
                });
              }
            }
            hourPrevDate = new Date(plot.date).getDate();
          }
        });
        let preRect = null;
        let preGroupByDate = {};
        premarketList.map((premarket) => {
          if (!preGroupByDate[premarket.newDate]) {
            preGroupByDate[premarket.newDate] = [];
          }
          preGroupByDate[premarket.newDate].push(premarket);
        });
        let afterGroupByDate = {};
        afterHoursList.map((premarket) => {
          if (!afterGroupByDate[premarket.newDate]) {
            afterGroupByDate[premarket.newDate] = [];
          }
          afterGroupByDate[premarket.newDate].push(premarket);
        });
        let element = document.getElementsByClassName('candle-width-height');
        let elementWidth = 10;
        if (element.length) {
          elementWidth = document
            .getElementsByClassName('candle-width-height')[0]
            .getAttribute('width');
        }
        let can1 = xScale(xAccessor(plotData[0])) + elementWidth / 2;
        let can2 = xScale(xAccessor(plotData[1])) - elementWidth / 2;
        let diff = can2 - can1;
        let preSvg = Object.keys(preGroupByDate).map((key) => {
          let candle1 =
            xScale(xAccessor(preGroupByDate[key][0])) - elementWidth / 2;
          let candleLast =
            xScale(
              xAccessor(preGroupByDate[key][preGroupByDate[key].length - 1]),
            ) +
            elementWidth / 2;
          return _react2.default.createElement(
            'g',
            {
              opacity: 9999999,
              x: candle1,
              y: 0,
            },
            _react2.default.createElement(
              'rect',
              _extends(
                {
                  fill: leftColor,
                  fillOpacity: leftOpacity,
                  className: 'EachExtendedHours',
                },
                {
                  x: candle1,
                  y: 0,
                  width: candleLast - candle1 + diff / 2,
                  height: moreProps.height,
                  fill: leftColor,
                  fillOpacity: leftOpacity,
                },
              ),
            ),
          );
        });
        let postSvg = Object.keys(afterGroupByDate).map((key) => {
          let postCandle1 =
            xScale(xAccessor(afterGroupByDate[key][0])) - elementWidth / 2;
          let postCandleLast =
            xScale(
              xAccessor(
                afterGroupByDate[key][afterGroupByDate[key].length - 1],
              ),
            ) +
            elementWidth / 2;
          return _react2.default.createElement(
            'g',
            {
              opacity: 9999999,
              x: postCandle1,
              y: 0,
            },
            _react2.default.createElement(
              'rect',
              _extends(
                {
                  fill: rightColor,
                  fillOpacity: rightOpacity,
                  className: 'EachExtendedHours',
                },
                {
                  x: postCandle1 - diff / 2,
                  y: 0,
                  width: postCandleLast - postCandle1 + diff / 2,
                  height: moreProps.height,
                  fill: rightColor,
                  fillOpacity: rightOpacity,
                },
              ),
            ),
          );
        });

        return _react2.default.createElement('g', {}, preSvg, postSvg);
      },
    },
    {
      key: 'render',
      value: function render() {
        var interactiveCursorClass = this.props.interactiveCursorClass;
        var selected = this.props.selected;
        return _react2.default.createElement(_GenericChartComponent2.default, {
          ref: this.saveNode,
          interactiveCursorClass: interactiveCursorClass,
          selected: selected,
          isHover: () => {},

          onDragStart: () => {},
          onDrag: () => {},
          onClick: () => {},
          onDragComplete: () => {},

          svgDraw: this.renderSVG,

          canvasDraw: this.drawOnCanvas,
          canvasToDraw: _GenericComponent.getMouseCanvas,

          drawOn: ['pan', 'drag', 'click'],
        });
      },
    },
  ]);

  return EachExtendedHours;
})(_react.Component);

function helper(props, moreProps) {
  var xyProvider = props.xyProvider,
    cx = props.cx,
    cy = props.cy;

  if ((0, _utils.isDefined)(xyProvider)) {
    return xyProvider(moreProps);
  }

  var xScale = moreProps.xScale,
    yScale = moreProps.chartConfig.yScale;

  var x = xScale(cx);
  var y = yScale(cy);
  return [x, y];
}

EachExtendedHours.propTypes = {
  leftColor: _propTypes2.default.string,
  leftOpacity: _propTypes2.default.number,
  rightColor: _propTypes2.default.string,
  rightOpacity: _propTypes2.default.number,
};

EachExtendedHours.defaultProps = {
  leftColor: '#ff0000',
  leftOpacity: 1,
  rightColor: '#0000ff',
  rightOpacity: 1,
};

exports.default = EachExtendedHours;
//# sourceMappingURL=EachExtendedHours.js.map

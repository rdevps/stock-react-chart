'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance',
      );
    }
  };
})();

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require('../../GenericChartComponent');

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require('../../GenericComponent');

var _utils = require('../../utils');

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

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

var InfoLineText = (function (_Component) {
  _inherits(InfoLineText, _Component);

  function InfoLineText(props) {
    _classCallCheck(this, InfoLineText);

    var _this = _possibleConstructorReturn(
      this,
      (InfoLineText.__proto__ || Object.getPrototypeOf(InfoLineText)).call(
        this,
        props,
      ),
    );

    _this.saveNode = _this.saveNode.bind(_this);
    _this.renderSVG = _this.renderSVG.bind(_this);
    _this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
    _this.isHover = _this.isHover.bind(_this);
    return _this;
  }

  _createClass(InfoLineText, [
    {
      key: 'saveNode',
      value: function saveNode(node) {
        this.node = node;
      },
    },
    {
      key: 'isHover',
      value: function isHover(moreProps) {
        var mouseXY = moreProps.mouseXY;
        // const { r } = this.props;

        var r = this.props.r + 7;

        var _helper = helper(this.props, moreProps),
          _helper2 = _slicedToArray(_helper, 2),
          x = _helper2[0],
          y = _helper2[1];

        var _mouseXY = _slicedToArray(mouseXY, 2),
          mx = _mouseXY[0],
          my = _mouseXY[1];

        var hover = x - r < mx && mx < x + r && y - r < my && my < y + r;

        return hover;
      },
    },
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
        var _props3 = this.props,
          x1Value = _props3.x1Value,
          x2Value = _props3.x2Value,
          y1Value = _props3.y1Value,
          y2Value = _props3.y2Value,
          textColor = _props3.textColor,
          rectFill = _props3.rectFill,
          fontSize = _props3.fontSize,
          strokeWidth = _props3.strokeWidth,
          fill = _props3.fill,
          fillOpacity = _props3.fillOpacity,
          selectedItems = _props3.selectedItems,
          strokeOpacity = _props3.strokeOpacity;
        var r = this.props.r;
        var _helper5 = helper(this.props, moreProps),
          _helper6 = _slicedToArray(_helper5, 2),
          x = _helper6[0],
          y = _helper6[1];

        var plotData = moreProps.plotData;
        var xScale = moreProps.xScale,
          yScale = moreProps.chartConfig.yScale;

        var h = plotData[0].high;
        for (let i = 0; i < plotData.length; i++) {
          if (plotData[i].high > h) {
            h = plotData[i].high;
          }
        }

        var width = 230;
        var height = 90;

        h = h - 250;
        var rectX = x;
        var rectY = y - height;
        if (y2Value >= h || y1Value < y2Value) {
          rectY = y + 20;
        }
        if (y1Value > y2Value || x1Value > x2Value) {
          rectY = y - height;
        }

        if (x1Value > x2Value && y1Value > y2Value) {
          rectY = y + 20;
        }

        var angleData = angle(
          xScale(x1Value),
          yScale(y1Value),
          xScale(x2Value),
          yScale(y2Value),
        );

        var a = x1Value - x2Value;
        var b = y1Value - y2Value;
        var distance = Math.sqrt(a * a + b * b);
        var distance1 = Math.hypot(x1Value - y1Value, x2Value - y2Value);
        const date1 = new Date(
          (selectedItems.length && selectedItems[0].date) || new Date(),
        );
        const date2 = new Date(
          (selectedItems.length &&
            selectedItems[selectedItems.length - 1].date) ||
            new Date(),
        );
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement(
            'rect',
            _extends(
              {
                fill: fill,
                fillOpacity: fillOpacity,
              },
              {
                x: rectX,
                rx: 5,
                ry: 5,
                y: rectY - 10,
                width,
                height,
                fill: rectFill,
                fillOpacity: 0.8,
              },
            ),
          ),
          _react2.default.createElement(
            'g',
            {
              fill: 'transparent',
              transform: `translate(${rectX + 10},${rectY + 7})`,
            },
            _react2.default.createElement('path', {
              fill: textColor,
              transform: `rotate(90 8 3)`,
              d: 'M16.5 0.9V0H15.5V0.9H15V3.4C15 3.2 14.9 3.1 14.8 2.9L12.4 0.5L11.5 1.4L12.8 2.7H4.4L5.7 1.4L4.7 0.6L2.4 3C2.2 3.1 2.2 3.2 2.2 3.4V0.9H1.6V0H0.599998V0.9H0.0999985V5.9H0.599998V6.8H1.6V5.9H2.1V3.4C2.1 3.6 2.2 3.7 2.3 3.8L4.7 6.2L5.6 5.3L4.4 4.1H12.8L11.5 5.4L12.4 6.3L14.8 3.9C14.9 3.8 15 3.6 15 3.4V5.9H15.5V6.8H16.5V5.9H17V0.9H16.5V0.9Z',
            }),
            _react2.default.createElement(
              'text',
              {
                fontSize: 12,
                textAnchor: 'start',
                alignmentBaseline: 'central',
                fill: textColor,
                letterSpacing: '1.5',
                x: 20,
                y: 3,
              },
              // '7.18 (5.00%), 718',
              `${(y2Value - y1Value).toFixed(2)} (${(
                ((y2Value - y1Value) / y1Value) *
                100
              ).toFixed(2)}%),  ${(
                (y2Value - y1Value).toFixed(2) * 100
              ).toFixed(2)}`,
            ),
          ),

          _react2.default.createElement(
            'g',
            {
              fill: 'transparent',
              transform: `translate(${rectX + 10},${rectY + 32})`,
            },
            _react2.default.createElement('path', {
              fill: textColor,
              d: 'M16.5 0.9V0H15.5V0.9H15V3.4C15 3.2 14.9 3.1 14.8 2.9L12.4 0.5L11.5 1.4L12.8 2.7H4.4L5.7 1.4L4.7 0.6L2.4 3C2.2 3.1 2.2 3.2 2.2 3.4V0.9H1.6V0H0.599998V0.9H0.0999985V5.9H0.599998V6.8H1.6V5.9H2.1V3.4C2.1 3.6 2.2 3.7 2.3 3.8L4.7 6.2L5.6 5.3L4.4 4.1H12.8L11.5 5.4L12.4 6.3L14.8 3.9C14.9 3.8 15 3.6 15 3.4V5.9H15.5V6.8H16.5V5.9H17V0.9H16.5V0.9Z',
            }),
            _react2.default.createElement(
              'text',
              {
                fontSize: 12,
                textAnchor: 'start',
                alignmentBaseline: 'central',
                fill: textColor,
                letterSpacing: '1.5',
                x: 20,
                y: 3,
              },
              `${
                selectedItems.length
              } bars (${diffDays}),  distance: ${distance.toFixed(0)} px`,
            ),
          ),
          _react2.default.createElement(
            'g',
            {
              fill: 'transparent',
              transform: `translate(${rectX + 12},${rectY + 51})`,
            },
            _react2.default.createElement('path', {
              stroke: textColor,
              strokeWidth: '1.5',
              d: 'M13.8243 14H1.19199L7.37705 0.673828',
            }),
            _react2.default.createElement('path', {
              stroke: textColor,
              strokeWidth: '1.5',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              d: 'M7.01306 13.8339H1.70606L1.46006 13.6149C1.64606 13.1149 1.86006 12.5809 2.09506 12.0149L2.56506 10.9209C3.08706 9.74094 3.59406 8.67294 3.96006 7.89394L4.07706 7.65694C4.07812 7.65633 4.07933 7.65601 4.08056 7.65601C4.08179 7.65601 4.083 7.65633 4.08406 7.65694C4.05097 7.7942 3.99665 7.92545 3.92306 8.04594C3.75406 8.39394 3.52306 8.87094 3.59906 9.00594C3.60505 9.01674 3.61372 9.02581 3.62422 9.03229C3.63473 9.03877 3.64673 9.04244 3.65906 9.04294C4.59094 9.13178 5.45303 9.57536 6.06706 10.2819C6.73318 11.0237 7.1024 11.985 7.10406 12.9819C7.10403 13.267 7.07353 13.5513 7.01306 13.8299V13.8339Z',
            }),
            _react2.default.createElement(
              'g',
              {
                fill: 'transparent',
                transform: `translate(20,8)`,
              },
              _react2.default.createElement(
                'text',
                {
                  fontSize: 12,
                  textAnchor: 'start',
                  alignmentBaseline: 'central',
                  fill: textColor,
                  letterSpacing: '1.5',
                },
                `${(angleData > 0 && ' ') || ''}${angleData.toFixed(0)}`,
              ),
              _react2.default.createElement('path', {
                stroke: textColor,
                strokeWidth: '1.5',
                transform: `translate(${
                  (Math.abs(angleData).toFixed(0).length > 2 && 27) || 20
                },-7)`,
                d: 'M4.37581 7.25C6.17073 7.25 7.62581 5.79493 7.62581 4C7.62581 2.20507 6.17073 0.75 4.37581 0.75C2.58088 0.75 1.12581 2.20507 1.12581 4C1.12581 5.79493 2.58088 7.25 4.37581 7.25Z',
              }),
            ),
          ),
        );
      },
    },
    {
      key: 'render',
      value: function render() {
        var interactiveCursorClass = this.props.interactiveCursorClass;
        var show = this.props.show;
        var _props5 = this.props,
          onDragStart = _props5.onDragStart,
          onDrag = _props5.onDrag,
          onDragComplete = _props5.onDragComplete;

        return _react2.default.createElement(_GenericChartComponent2.default, {
          ref: this.saveNode,
          interactiveCursorClass: interactiveCursorClass,
          selected: true,
          isHover: this.isHover,

          onDragStart: onDragStart,
          onDrag: onDrag,
          onDragComplete: onDragComplete,

          svgDraw: this.renderSVG,

          canvasDraw: this.drawOnCanvas,
          canvasToDraw: _GenericComponent.getMouseCanvas,

          drawOn: ['pan', 'mousemove', 'drag'],
        });
      },
    },
  ]);

  return InfoLineText;
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
InfoLineText.propTypes = {
  xyProvider: _propTypes2.default.func,

  onDragStart: _propTypes2.default.func.isRequired,
  onDrag: _propTypes2.default.func.isRequired,
  onDragComplete: _propTypes2.default.func.isRequired,
  strokeWidth: _propTypes2.default.number.isRequired,
  stroke: _propTypes2.default.string.isRequired,
  fill: _propTypes2.default.string.isRequired,
  r: _propTypes2.default.number.isRequired,

  cx: _propTypes2.default.number,
  cy: _propTypes2.default.number,

  className: _propTypes2.default.string.isRequired,
  show: _propTypes2.default.bool.isRequired,
  strokeOpacity: _propTypes2.default.number.isRequired,
  fillOpacity: _propTypes2.default.number.isRequired,
  interactiveCursorClass: _propTypes2.default.string,
};

InfoLineText.defaultProps = {
  className: 'react-stockcharts-interactive-line-edge',
  onDragStart: _utils.noop,
  onDrag: _utils.noop,
  onDragComplete: _utils.noop,
  onMove: _utils.noop,
  show: false,
  fillOpacity: 1,
  strokeOpacity: 1,
};

exports.default = InfoLineText;
//# sourceMappingURL=InfoLineText.js.map

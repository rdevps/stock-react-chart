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

exports.getSlope = getSlope;
exports.getYIntercept = getYIntercept;
exports.generateLine = generateLine;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require('../../GenericChartComponent');

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require('../../GenericComponent');

var _utils = require('../../utils');

var _ChartDataUtil = require('../../utils/ChartDataUtil');

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

var ToolsExtraData = (function (_Component) {
  _inherits(ToolsExtraData, _Component);

  function ToolsExtraData(props) {
    _classCallCheck(this, ToolsExtraData);

    var _this = _possibleConstructorReturn(
      this,
      (ToolsExtraData.__proto__ || Object.getPrototypeOf(ToolsExtraData)).call(
        this,
        props,
      ),
    );

    _this.renderSVG = _this.renderSVG.bind(_this);
    _this.getSVGRect = _this.getSVGRect.bind(_this);
    _this.getSVGText = _this.getSVGText.bind(_this);
    _this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
    return _this;
  }

  _createClass(ToolsExtraData, [
    {
      key: 'drawOnCanvas',
      value: function drawOnCanvas(ctx, moreProps) {
        var stroke = '#fff',
          strokeWidth = 1,
          strokeOpacity = 0.5,
          strokeDasharray = 'Solid';

        var _helper = helper(this.props, moreProps),
          x1 = _helper.x1,
          y1 = _helper.y1,
          x2 = _helper.x2,
          y2 = _helper.y2;

        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);
        ctx.setLineDash(
          (0, _utils.getStrokeDasharray)(strokeDasharray).split(','),
        );

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      },
    },
    {
      key: 'getSVGRect',
      value: function getSVGRect(x, y, fill, width, height, opacity = 1) {
        return _react2.default.createElement('rect', {
          x,
          y,
          fill,
          width,
          height,
          opacity,
        });
      },
    },
    {
      key: 'getSVGText',
      value: function getSVGText(x, y, fill, textAnchor, value) {
        return _react2.default.createElement(
          'text',
          {
            x,
            y,
            fill,
            fontSize: '12',
            fontWeight: '400',
            fontFamily: '',
            textAnchor,
          },
          value,
        );
      },
    },
    {
      key: 'renderSVG',
      value: function renderSVG(moreProps) {
        var _props4 = this.props,
          xyProvider1 = _props4.xyProvider1,
          xyProvider2 = _props4.xyProvider2,
          timeSpan = _props4.timeSpan,
          y1Value = _props4.y1Value,
          y2Value = _props4.y2Value,
          startItem = _props4.startItem,
          lastItem = _props4.lastItem,
          midItem = _props4.midItem,
          isParallel = _props4.isParallel,
          inPosition = _props4.inPosition,
          targetColor = _props4.targetColor,
          stopColor = _props4.stopColor,
          upCircle = _props4.upCircle,
          downCircle = _props4.downCircle,
          dx = _props4.dx || 0,
          dy = _props4.dy || 0,
          dy = _props4.dy,
          isBoth = _props4.isBoth,
          isHorizontal = _props4.isHorizontal,
          isVertical = _props4.isVertical;

        var _helper2 = helper(this.props, moreProps);
        var x1 = _helper2.x1,
          y1 = _helper2.y1,
          x2 = _helper2.x2,
          y2 = _helper2.y2;

        if (isBoth) {
          var xScale = moreProps.xScale,
            yScale = moreProps.chartConfig.yScale,
            xAccessor = moreProps.xAccessor,
            plotData = moreProps.plotData;
          if ((0, _utils.isNotDefined)(startItem)) {
            startItem = (0, _ChartDataUtil.getCurrentItem)(
              xScale,
              xAccessor,
              [x1, y1],
              plotData,
            );
          }
          if ((0, _utils.isNotDefined)(lastItem)) {
            lastItem = (0, _ChartDataUtil.getCurrentItem)(
              xScale,
              xAccessor,
              [x2, y2],
              plotData,
            );
          }
        }

        if ((0, _utils.isDefined)(xyProvider1)) {
          _helper2 = xyProvider1(moreProps);
          x1 = _helper2[0];
          y1 = _helper2[1];
        }
        if ((0, _utils.isDefined)(xyProvider2)) {
          _helper2 = xyProvider2(moreProps);
          x2 = _helper2[0];
          y2 = _helper2[1];
        }

        var xScale = moreProps.xScale,
          yScale = moreProps.chartConfig.yScale;

        var rectHeight = y2 - y1;
        var rectBottomWidth = x2 - x1;
        var textRectX = moreProps.width;
        var textX = moreProps.width + 5;
        var rectX = moreProps.width;
        var rectBottomY = moreProps.height;
        var rectBottomX = x1 + 75;
        var rectY = y1 - 7;
        if (rectHeight < 0) {
          rectHeight = rectHeight * -1;
          rectY = y2 - 7;
        }
        if (rectBottomWidth < 0) {
          rectBottomWidth = rectBottomWidth * -1;
          rectBottomX = x2 + 75;
        }

        if (!startItem) {
          return null;
        }
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];

        const formateDate = (date) => {
          var d = new Date(date),
            hour = d.getHours(),
            minutes = d.getMinutes(),
            day = d.getDate(),
            returnVal = `${[
              day < 10 ? `0${day}` : day,
              monthNames[d.getMonth()],
              `'${d.getFullYear().toString().substring(2, 4)}`,
            ].join(' ')}#${[
              hour < 10 ? `0${hour}` : hour,
              minutes < 10 ? `0${minutes}` : minutes,
            ].join(':')}`;

          if (['minute', 'hour'].includes(timeSpan)) {
            returnVal = returnVal.replace('#', '  ');
          } else {
            returnVal = returnVal.split('#')[0];
          }

          return returnVal;
        };

        var bottomX1Val = formateDate(startItem?.date);

        var btmWidth = 100;
        if (!['minute', 'hour'].includes(timeSpan)) {
          btmWidth = 70;
        }

        const bottomArea = (valueX2) => {
          return _react2.default.createElement(
            'g',
            {
              className: 'react-stockcharts-enable-interaction',
            },
            this.getSVGRect(
              rectBottomX - 75,
              rectBottomY,
              '#C9D8FF',
              rectBottomWidth,
              28,
              0.4,
            ),
            this.getSVGRect(
              x1 - btmWidth / 2,
              rectBottomY,
              '#2962FF',
              btmWidth,
              25,
            ),
            this.getSVGText(
              x1,
              rectBottomY + 19,
              '#fff',
              'middle',
              bottomX1Val,
            ),
            this.getSVGRect(
              x2 - btmWidth / 2,
              rectBottomY,
              '#2962FF',
              btmWidth,
              25,
            ),
            this.getSVGText(
              x2,
              rectBottomY + 19,
              '#fff',
              'middle',
              formateDate(valueX2),
            ),
          );
        };

        if (inPosition) {
          var bottomX2Value = formateDate(lastItem?.date);
          var y1Pos3 = _helper2.yY1;
          var y2Pos3 = _helper2.yY2;
          var cxX1 = _helper2.cxX1;
          var cyY1 = _helper2.cyY1;

          var rectHwightY = cyY1;

          rectHeight = y1 - cyY1;
          if (rectHeight < 0) {
            rectHwightY = y1;
            rectHeight = rectHeight * -1;
          }

          // rightRectStart
          return _react2.default.createElement(
            'g',
            {},
            _react2.default.createElement(
              'g',
              { className: 'react-stockcharts-enable-interaction' },
              this.getSVGRect(
                rectX,
                rectHwightY,
                '#C9D8FF',
                60,
                rectHeight,
                0.4,
              ),
              this.getSVGRect(textRectX, y1Pos3 - 15, targetColor, 50, 20),
              this.getSVGText(
                textX,
                y1Pos3,
                '#fff',
                'start',
                parseFloat(upCircle).toFixed(2),
              ),
              this.getSVGRect(textRectX, y2Pos3 - 15, stopColor, 50, 20),
              this.getSVGText(
                textX,
                y2Pos3,
                '#fff',
                'start',
                parseFloat(downCircle).toFixed(2),
              ),
              this.getSVGRect(textRectX, y1 - 15, '#787B86', 50, 20),
              this.getSVGText(
                textX,
                y1,
                '#fff',
                'start',
                parseFloat(y1Value).toFixed(2),
              ),
            ),
            bottomArea(bottomX2Value),
          );
        }

        if (isParallel) {
          var bottomX2Value = formateDate(lastItem?.date);

          var y1Pos3 = _helper2.yY1;
          var y2Pos3 = _helper2.yY2;

          if (dy) {
            var start = y1;
            var end = y2Pos3;
            if (y1 > y2 && y1Pos3 > y1) {
              start = y2;
              end = y1Pos3;
            } else if (y1Pos3 < y1 && y1 > y2) {
              start = y2Pos3;
              end = y1;
            } else if (y1Pos3 < y1 && y1 < y2) {
              start = y1Pos3;
              end = y2;
            }

            rectY = start;
            rectHeight = end - start;
          }

          return _react2.default.createElement(
            'g',
            {},
            _react2.default.createElement(
              'g',
              { className: 'react-stockcharts-enable-interaction' },
              this.getSVGRect(rectX, rectY, '#C9D8FF', 60, rectHeight, 0.4),
              this.getSVGRect(textRectX, y1 - 15, '#2962FF', 60, 20),
              this.getSVGText(
                textX,
                y1,
                '#fff',
                'start',
                parseFloat(y1Value).toFixed(2),
              ),
              this.getSVGRect(textRectX, y2 - 15, '#2962FF', 60, 20),
              this.getSVGText(
                textX,
                y2,
                '#fff',
                'start',
                parseFloat(y2Value).toFixed(2),
              ),
              (dy &&
                _react2.default.createElement(
                  'g',
                  { className: 'react-stockcharts-enable-interaction' },
                  this.getSVGRect(textRectX, y1Pos3 - 15, '#2962FF', 60, 20),
                  this.getSVGText(
                    textX,
                    y1Pos3,
                    '#fff',
                    'start',
                    parseFloat(yScale.invert(y1Pos3)).toFixed(2),
                  ),
                  this.getSVGRect(textRectX, y2Pos3 - 15, '#2962FF', 60, 20),
                  this.getSVGText(
                    textX,
                    y2Pos3,
                    '#fff',
                    'start',
                    parseFloat(yScale.invert(y2Pos3)).toFixed(2),
                  ),
                )) ||
                null,
            ),
            bottomArea(bottomX2Value),
          );
        }

        if (isVertical) {
          return _react2.default.createElement(
            'g',
            {},
            _react2.default.createElement(
              'g',
              { className: 'react-stockcharts-enable-interaction' },
              this.getSVGRect(
                x1 - btmWidth / 2,
                rectBottomY,
                '#2962FF',
                btmWidth,
                25,
              ),
              this.getSVGText(
                x1,
                rectBottomY + 19,
                '#fff',
                'middle',
                bottomX1Val,
              ),
            ),
          );
        } else if (isHorizontal) {
          return _react2.default.createElement(
            'g',
            {},
            _react2.default.createElement(
              'g',
              { className: 'react-stockcharts-enable-interaction' },
              this.getSVGRect(textRectX, y1 - 12, '#2962FF', 60, 20),
              this.getSVGText(
                textX,
                y1 + 2,
                '#fff',
                'start',
                parseFloat(y1Value).toFixed(2),
              ),
            ),
          );
        } else if (isBoth && lastItem) {
          var bottomX2Val = formateDate(lastItem?.date);
          var bottomMidX2Val = '';

          if ((0, _utils.isDefined)(midItem)) {
            bottomMidX2Val = formateDate(midItem?.date);
            if (yScale(dy) > y2) {
              rectHeight = yScale(dy) - y1;
            }
            if (xScale(dx) > x2) {
              rectBottomWidth = xScale(dx) - x1;
            }
            if (yScale(dy) < rectY) {
              rectY = yScale(dy);
              rectHeight = y2 - yScale(dy);
            }
            if (xScale(dx) < x1) {
              rectBottomX = xScale(dx) + 75;
              rectBottomWidth = x2 - xScale(dx);
            }
            if (x2 < x1) {
              rectBottomWidth = x1 - x2;
              rectBottomX = x2 + 75;
            }
          }

          return _react2.default.createElement(
            'g',
            {},
            _react2.default.createElement(
              'g',
              { className: 'react-stockcharts-enable-interaction' },
              this.getSVGRect(rectX, rectY, '#C9D8FF', 60, rectHeight, 0.4),
              this.getSVGRect(textRectX, y1 - 15, '#2962FF', 60, 20),
              this.getSVGText(
                textX,
                y1,
                '#fff',
                'start',
                parseFloat(y1Value).toFixed(2),
              ),
              this.getSVGRect(textRectX, y2 - 15, '#2962FF', 60, 20),
              this.getSVGText(
                textX,
                y2,
                '#fff',
                'start',
                parseFloat(y2Value).toFixed(2),
              ),
            ),
            (midItem &&
              _react2.default.createElement(
                'g',
                { className: 'react-stockcharts-enable-interaction' },
                this.getSVGRect(textRectX, yScale(dy) - 15, '#2962FF', 60, 20),
                this.getSVGText(
                  textX,
                  yScale(dy),
                  '#fff',
                  'start',
                  parseFloat(dy).toFixed(2),
                ),
              )) ||
              null,
            bottomArea(bottomX2Val),
            (midItem &&
              _react2.default.createElement(
                'g',
                { className: 'react-stockcharts-enable-interaction' },
                this.getSVGRect(
                  xScale(dx) - btmWidth / 2,
                  rectBottomY,
                  '#2962FF',
                  btmWidth,
                  25,
                ),
                this.getSVGText(
                  xScale(dx),
                  rectBottomY + 19,
                  '#fff',
                  'middle',
                  bottomMidX2Val,
                ),
              )) ||
              null,
          );
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props5 = this.props,
          selected = _props5.selected;

        return _react2.default.createElement(_GenericChartComponent2.default, {
          isHover: () => {},
          edgeClip: true,
          clip: false,
          svgDraw: this.renderSVG,
          canvasToDraw: _GenericComponent.getMouseCanvas,
          canvasDraw: this.renderSVG,

          interactiveCursorClass: '',
          selected: selected,

          onDragStart: () => {},
          onDrag: () => {},
          onDragComplete: () => {},
          onHover: () => {},
          onSelect: () => {},
          onUnHover: () => {},
          onClick: () => {},

          drawOn: ['pan'],
        });
      },
    },
  ]);

  return ToolsExtraData;
})(_react.Component);

function helper(props, moreProps) {
  var x1Value = props.x1Value,
    x2Value = props.x2Value,
    y1Value = props.y1Value,
    y2Value = props.y2Value,
    upCircle = props.upCircle,
    downCircle = props.downCircle,
    rectY1 = props.rectY1,
    dy = props.dy;
  var xScale = moreProps.xScale,
    yScale = moreProps.chartConfig.yScale;

  var modLine = generateLine({
    type: 'LINE',
    start: [x1Value, y1Value],
    end: [x2Value, y2Value],
    xScale: xScale,
    yScale: yScale,
  });

  var x1 = xScale(modLine.x1);
  var y1 = yScale(modLine.y1);
  var x2 = xScale(modLine.x2);
  var y2 = yScale(modLine.y2);

  if (dy) {
    var modLine2 = generateLine({
      type: 'LINE',
      start: [x1Value, y1Value + dy],
      end: [x2Value, y2Value + dy],
      xScale: xScale,
      yScale: yScale,
    });
    var xX1 = xScale(modLine2.x1);
    var yY1 = yScale(modLine2.y1);
    var xX2 = xScale(modLine2.x2);
    var yY2 = yScale(modLine2.y2);
    return {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      xX1: xX1,
      yY1: yY1,
      xX2: xX2,
      yY2: yY2,
    };
  }
  if (upCircle && downCircle) {
    var modLine3 = generateLine({
      type: 'LINE',
      start: [x1Value, upCircle],
      end: [x1Value, downCircle],
      xScale: xScale,
      yScale: yScale,
    });
    var modLine4 = generateLine({
      type: 'LINE',
      start: [x1Value, rectY1],
      end: [x1Value, downCircle],
      xScale: xScale,
      yScale: yScale,
    });
    var cxX1 = xScale(modLine4.x1);
    var cyY1 = yScale(modLine4.y1);
    var xX1 = xScale(modLine3.x1);
    var yY1 = yScale(modLine3.y1);
    var xX2 = xScale(modLine3.x2);
    var yY2 = yScale(modLine3.y2);
    return {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      xX1: xX1,
      yY1: yY1,
      xX2: xX2,
      yY2: yY2,
      cxX1: cxX1,
      cyY1: cyY1,
    };
  }

  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
  };
}

function getSlope(start, end) {
  var m /* slope */ =
    end[0] === start[0] ? undefined : (end[1] - start[1]) / (end[0] - start[0]);
  return m;
}
function getYIntercept(m, end) {
  var b /* y intercept */ = -1 * m * end[0] + end[1];
  return b;
}

function generateLine(_ref4) {
  var type = _ref4.type,
    start = _ref4.start,
    end = _ref4.end,
    xScale = _ref4.xScale,
    yScale = _ref4.yScale;

  var m /* slope */ = getSlope(start, end);
  var b /* y intercept */ = getYIntercept(m, start);

  return getLineCoordinates({
    type: type,
    start: start,
    end: end,
    xScale: xScale,
    yScale: yScale,
    m: m,
    b: b,
  });
}

function getLineCoordinates(_ref9) {
  var start = _ref9.start,
    end = _ref9.end;

  var _start = _slicedToArray(start, 2),
    x1 = _start[0],
    y1 = _start[1];

  var _end = _slicedToArray(end, 2),
    x2 = _end[0],
    y2 = _end[1];

  if (end[0] === start[0]) {
    return {
      x1: x1,
      y1: start[1],
      x2: x1,
      y2: end[1],
    };
  }

  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
  };
}

ToolsExtraData.propTypes = {
  x1Value: _propTypes2.default.any.isRequired,
  x2Value: _propTypes2.default.any.isRequired,
  y1Value: _propTypes2.default.any,
  y2Value: _propTypes2.default.any,
  selected: _propTypes2.default.bool.isRequired,
  noHover: _propTypes2.default.bool,
  isHorizontal: _propTypes2.default.bool.isRequired,
  isVertical: _propTypes2.default.bool.isRequired,
  isBoth: _propTypes2.default.bool.isRequired,
};

ToolsExtraData.defaultProps = {
  selected: false,
  isHorizontal: false,
  isVertical: false,
  isBoth: false,
};

exports.default = ToolsExtraData;
//# sourceMappingURL=ToolsExtraData.js.map

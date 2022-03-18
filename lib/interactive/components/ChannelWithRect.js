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

var _d3Path = require('d3-path');

var _GenericChartComponent = require('../../GenericChartComponent');

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require('../../GenericComponent');

var _StraightLine = require('./StraightLine');

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

var ChannelWithRect = (function (_Component) {
  _inherits(ChannelWithRect, _Component);

  function ChannelWithRect(props) {
    _classCallCheck(this, ChannelWithRect);

    var _this = _possibleConstructorReturn(
      this,
      (
        ChannelWithRect.__proto__ || Object.getPrototypeOf(ChannelWithRect)
      ).call(this, props),
    );

    _this.renderSVG = _this.renderSVG.bind(_this);
    _this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
    _this.isHover = _this.isHover.bind(_this);
    return _this;
  }

  _createClass(ChannelWithRect, [
    {
      key: 'isHover',
      value: function isHover(moreProps) {
        var _props = this.props,
          tolerance = _props.tolerance,
          onHover = _props.onHover;

        if ((0, _utils.isDefined)(onHover)) {
          var _helper = helper(this.props, moreProps),
            lines = _helper.lines,
            line1 = _helper.line1,
            line2 = _helper.line2,
            line3 = _helper.line3,
            line4 = _helper.line4;

          if (
            (0, _utils.isDefined)(line1) &&
            (0, _utils.isDefined)(line2) &&
            (0, _utils.isDefined)(line3) &&
            (0, _utils.isDefined)(line4)
          ) {
            var mouseXY = moreProps.mouseXY,
              xScale = moreProps.xScale,
              yScale = moreProps.chartConfig.yScale;

            var line1Hovering = (0, _StraightLine.isHovering)({
              x1Value: lines.line1.x1,
              y1Value: lines.line1.y1,
              x2Value: lines.line1.x2,
              y2Value: lines.line1.y2,
              type: 'LINE',
              mouseXY: mouseXY,
              tolerance: tolerance,
              xScale: xScale,
              yScale: yScale,
            });
            var line2Hovering = (0, _StraightLine.isHovering)({
              x1Value: lines.line2.x1,
              y1Value: lines.line2.y1,
              x2Value: lines.line2.x2,
              y2Value: lines.line2.y2,
              type: 'LINE',
              mouseXY: mouseXY,
              tolerance: tolerance,
              xScale: xScale,
              yScale: yScale,
            });
            var line3Hovering = (0, _StraightLine.isHovering)({
              x1Value: lines.line3.x1,
              y1Value: lines.line3.y1,
              x2Value: lines.line3.x2,
              y2Value: lines.line3.y2,
              type: 'LINE',
              mouseXY: mouseXY,
              tolerance: tolerance,
              xScale: xScale,
              yScale: yScale,
            });
            var line4Hovering = (0, _StraightLine.isHovering)({
              x1Value: lines.line4.x1,
              y1Value: lines.line4.y1,
              x2Value: lines.line4.x2,
              y2Value: lines.line4.y2,
              type: 'LINE',
              mouseXY: mouseXY,
              tolerance: tolerance,
              xScale: xScale,
              yScale: yScale,
            });

            return (
              line1Hovering || line2Hovering || line3Hovering || line4Hovering
            );
          }
        }
        return false;
      },
    },
    {
      key: 'drawOnCanvas',
      value: function drawOnCanvas(ctx, moreProps) {
        var _props2 = this.props,
          stroke = _props2.stroke,
          strokeWidth = _props2.strokeWidth,
          fillOpacity = _props2.fillOpacity,
          strokeOpacity = _props2.strokeOpacity,
          fill = _props2.fill;

        var _helper2 = helper(this.props, moreProps),
          line1 = _helper2.line1,
          line2 = _helper2.line2,
          line3 = _helper2.line3,
          line4 = _helper2.line4;

        if ((0, _utils.isDefined)(line1)) {
          var x1 = line1.x1,
            y1 = line1.y1,
            x2 = line1.x2,
            y2 = line1.y2;

          ctx.lineWidth = strokeWidth;
          ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          if ((0, _utils.isDefined)(line2)) {
            var line2Y1 = line2.y1,
              line2Y2 = line2.y2;

            ctx.beginPath();
            ctx.moveTo(x1, line2Y1);
            ctx.lineTo(x2, line2Y2);
            ctx.stroke();

            ctx.fillStyle = (0, _utils.hexToRGBA)(fill, fillOpacity);
            ctx.beginPath();
            ctx.moveTo(x1, y1);

            ctx.lineTo(x2, y2);
            ctx.lineTo(x2, line2Y2);
            ctx.lineTo(x1, line2Y1);

            ctx.closePath();
            ctx.fill();
            if ((0, _utils.isDefined)(line3)) {
              var line3Y1 = line3.y1,
                line3Y2 = line3.y2;
              ctx.beginPath();
              ctx.moveTo(line1.x1, line3Y1);
              ctx.lineTo(line1.x1, line3Y2);
              ctx.stroke();
              ctx.closePath();
              if ((0, _utils.isDefined)(line4)) {
                var line4Y1 = line4.y1,
                  line4Y2 = line4.y2;
                ctx.beginPath();
                ctx.moveTo(line1.x2, line4Y1);
                ctx.lineTo(line1.x2, line4Y2);
                ctx.stroke();
                ctx.closePath();
              }
            }
          }
        }
      },
    },
    {
      key: 'renderSVG',
      value: function renderSVG(moreProps) {
        var _props3 = this.props,
          stroke = _props3.stroke,
          strokeWidth = _props3.strokeWidth,
          fillOpacity = _props3.fillOpacity,
          fill = _props3.fill,
          strokeOpacity = _props3.strokeOpacity;

        var _helper3 = helper(this.props, moreProps),
          line1 = _helper3.line1,
          line2 = _helper3.line2;

        if ((0, _utils.isDefined)(line1)) {
          var x1 = line1.x1,
            y1 = line1.y1,
            x2 = line1.x2,
            y2 = line1.y2;

          let width = x2 - x1;
          let height = 10;
          if ((0, _utils.isDefined)(line2)) {
            let a = y1 - line2.y1;
            height = a;
            if (a < 0) {
              height = -1 * a;
            }
          }
          if (x2 - x1 < 0) {
            width = width * -1;
            (x1 = x2), (y1 = y2);
          }

          var area = (0, _utils.isDefined)(line2)
            ? _react2.default.createElement('path', {
                fill: fill,
                fillOpacity: fillOpacity,
                d: getPath(line1, line2),
              })
            : null;

          return _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement('rect', {
              strokeWidth: strokeWidth,
              stroke: stroke,
              strokeOpacity: strokeOpacity,
              x: x1,
              y: y1,
              width: width,
              height: height,
              fill: 'transparent',
            }),
            null,
            area,
          );
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props4 = this.props,
          selected = true,
          interactiveCursorClass = _props4.interactiveCursorClass;
        var _props5 = this.props,
          onDragStart = _props5.onDragStart,
          onDrag = _props5.onDrag,
          onDragComplete = _props5.onDragComplete,
          onHover = _props5.onHover,
          onUnHover = _props5.onUnHover;

        return _react2.default.createElement(_GenericChartComponent2.default, {
          isHover: () => {},

          svgDraw: this.renderSVG,
          canvasToDraw: _GenericComponent.getMouseCanvas,
          canvasDraw: this.drawOnCanvas,

          interactiveCursorClass: interactiveCursorClass,
          selected: selected,

          onDragStart: onDragStart,
          onDrag: onDrag,
          onDragComplete: onDragComplete,
          onHover: onHover,
          onUnHover: onUnHover,

          drawOn: ['mousemove', 'mouseleave', 'pan', 'drag'],
        });
      },
    },
  ]);

  return ChannelWithRect;
})(_react.Component);

function getPath(line1, line2) {
  var ctx = (0, _d3Path.path)();
  ctx.moveTo(line1.x1, line1.y1);
  ctx.lineTo(line1.x2, line1.y2);
  ctx.lineTo(line1.x2, line2.y2);
  ctx.lineTo(line1.x1, line2.y1);

  ctx.closePath();
  return ctx.toString();
}

function getLines(props, moreProps) {
  var startXY = props.startXY,
    endXY = props.endXY,
    dy = props.dy,
    type = props.type;
  var xScale = moreProps.xScale;

  if ((0, _utils.isNotDefined)(startXY) || (0, _utils.isNotDefined)(endXY)) {
    return {};
  }
  var line1 = (0, _StraightLine.generateLine)({
    type: type,
    start: startXY,
    end: [endXY[0], startXY[1]],
    xScale: xScale,
  });
  var line2 = (0, _utils.isDefined)(dy)
    ? _extends({}, line1, {
        y1: line1.y1 + dy,
        y2: line1.y2 + dy,
      })
    : undefined;

  var line3 = (0, _StraightLine.generateLine)({
    type: type,
    start: startXY,
    end: [line2.x1, line2.y1],
    xScale: xScale,
  });
  var line4 = (0, _StraightLine.generateLine)({
    type: type,
    start: [line1.x2, line1.y2],
    end: [line2.x2, line2.y2],
    xScale: xScale,
  });
  return {
    line1: line1,
    line2: line2,
    line3: line3,
    line4: line4,
  };
}

function helper(props, moreProps) {
  var lines = getLines(props, moreProps);
  var xScale = moreProps.xScale,
    yScale = moreProps.chartConfig.yScale;

  var x1 = xScale(lines.line1.x1);
  var y1 = yScale(lines.line1.y1);
  var x2 = xScale(lines.line1.x2);
  var y2 = yScale(lines.line1.y2);

  var line2 = (0, _utils.isDefined)(lines.line2)
    ? {
        x1: x1,
        y1: yScale(lines.line2.y1),
        x2: x2,
        y2: yScale(lines.line2.y2),
      }
    : undefined;

  var line3 = (0, _utils.isDefined)(lines.line3)
    ? {
        x1: x1,
        y1: yScale(lines.line3.y1),
        x2: x2,
        y2: yScale(lines.line3.y2),
      }
    : undefined;
  var line4 = (0, _utils.isDefined)(lines.line4)
    ? {
        x1: x1,
        y1: yScale(lines.line4.y1),
        x2: x2,
        y2: yScale(lines.line4.y2),
      }
    : undefined;

  return {
    lines: lines,
    line1: {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
    },
    line2: line2,
    line3: line3,
    line4: line4,
  };
}

ChannelWithRect.propTypes = {
  interactiveCursorClass: _propTypes2.default.string,
  stroke: _propTypes2.default.string.isRequired,
  strokeWidth: _propTypes2.default.number.isRequired,
  fill: _propTypes2.default.string.isRequired,
  fillOpacity: _propTypes2.default.number.isRequired,
  strokeOpacity: _propTypes2.default.number.isRequired,

  type: _propTypes2.default.oneOf(
    [
      'XLINE', // extends from -Infinity to +Infinity
      'RAY', // extends to +/-Infinity in one direction
      'LINE',
    ], // extends between the set bounds
  ).isRequired,

  onDragStart: _propTypes2.default.func.isRequired,
  onDrag: _propTypes2.default.func.isRequired,
  onDragComplete: _propTypes2.default.func.isRequired,
  onHover: _propTypes2.default.func,
  onUnHover: _propTypes2.default.func,

  defaultClassName: _propTypes2.default.string,

  tolerance: _propTypes2.default.number.isRequired,
  selected: _propTypes2.default.bool.isRequired,
};

ChannelWithRect.defaultProps = {
  onDragStart: _utils.noop,
  onDrag: _utils.noop,
  onDragComplete: _utils.noop,
  type: 'LINE',

  strokeWidth: 1,
  tolerance: 4,
  selected: false,
};

exports.default = ChannelWithRect;
//# sourceMappingURL=ChannelWithRect.js.map

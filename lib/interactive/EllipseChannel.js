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

var _utils = require('../utils');

var _utils2 = require('./utils');

var _EachEllipseChannel = require('./wrapper/EachEllipseChannel');

var _EachEllipseChannel2 = _interopRequireDefault(_EachEllipseChannel);

var _StraightLine = require('./components/StraightLine');

var _StraightLine2 = _interopRequireDefault(_StraightLine);

var _MouseLocationIndicator = require('./components/MouseLocationIndicator');

var _MouseLocationIndicator2 = _interopRequireDefault(_MouseLocationIndicator);

var _HoverTextNearMouse = require('./components/HoverTextNearMouse');

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

var _ToolsExtraData = require('./components/ToolsExtraData');

var _ToolsExtraData2 = _interopRequireDefault(_ToolsExtraData);

var _ChartDataUtil = require('../utils/ChartDataUtil');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
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
  // if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta * -1;
}

var EllipseChannel = (function (_Component) {
  _inherits(EllipseChannel, _Component);

  function EllipseChannel(props) {
    _classCallCheck(this, EllipseChannel);

    var _this = _possibleConstructorReturn(
      this,
      (EllipseChannel.__proto__ || Object.getPrototypeOf(EllipseChannel)).call(
        this,
        props,
      ),
    );

    _this.handleStart = _this.handleStart.bind(_this);
    _this.handleEnd = _this.handleEnd.bind(_this);
    _this.handleDrawLine = _this.handleDrawLine.bind(_this);
    _this.handleDragLine = _this.handleDragLine.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.onDoubleClickWhenHover = _this.onDoubleClickWhenHover.bind(_this);
    _this.drawEllipse = _this.drawEllipse.bind(_this);
    _this.handleDragLineComplete = _this.handleDragLineComplete.bind(_this);

    _this.terminate = _utils2.terminate.bind(_this);
    _this.saveNodeType = _utils2.saveNodeType.bind(_this);

    _this.getSelectionState = (0, _utils2.isHoverForInteractiveType)(
      'trends',
    ).bind(_this);
    _this.state = {};
    _this.nodes = [];
    return _this;
  }

  _createClass(EllipseChannel, [
    {
      key: 'handleDragLine',
      value: function handleDragLine(index, newXYValue) {
        this.setState({
          override: _extends(
            {
              index: index,
            },
            newXYValue.override,
          ),
          overrideRy: _extends(
            {
              index: index,
            },
            newXYValue.overrideRy,
          ),
        });
      },
    },
    {
      key: 'handleClick',
      value: function handleClick(index) {
        var _this4 = this;
        var trends = this.props.trends;
        var overrideRy = this.state.overrideRy;
        var newTrends = trends.map(function (each, idx) {
          return idx === index
            ? _extends({}, each, {
              selected: true,
              ry: each.ry || overrideRy.ry,
              ux: each.ux || overrideRy.ux,
              uy: each.uy || overrideRy.uy,
              dx: each.dx || overrideRy.dx,
              dy: each.dy || overrideRy.dy,
            })
            : _extends({}, each, {
              selected: false,
            });
        });

        this.mouseClicked = false;
        this.setState(
          {
            overrideRy: null,
            current: null,
          },
          function () {
            _this4.props.onComplete(newTrends, newTrends[index]);
          },
        );
      },
    },
    {
      key: 'onDoubleClickWhenHover',
      value: function onDoubleClickWhenHover(index) {
        var _this4 = this;
        var trends = this.props.trends;
        var overrideRy = this.state.overrideRy;
        var newTrends = trends.map(function (each, idx) {
          return idx === index
            ? _extends({}, each, {
              selected: true,
              isEdit: true,
              ry: each.ry || overrideRy.ry,
              ux: each.ux || overrideRy.ux,
              uy: each.uy || overrideRy.uy,
              dx: each.dx || overrideRy.dx,
              dy: each.dy || overrideRy.dy,
            })
            : _extends({}, each, {
              selected: false,
              isEdit: false,
            });
        });

        this.mouseClicked = false;
        this.setState(
          {
            overrideRy: null,
            current: null,
          },
          function () {
            _this4.props.onComplete(newTrends, newTrends[index]);
          },
        );
      },
    },
    {
      key: 'drawEllipse',
      value: function drawEllipse(xyValue, e, moreProps) {
        var _this9 = this;
        var mouseXY = moreProps.mouseXY,
          xScale = moreProps.xScale,
          xAccessor = moreProps.xAccessor,
          fullData = moreProps.fullData,
          yScale = moreProps.chartConfig.yScale;

        var trends = _this9.props.trends;
        var index = trends.findIndex(({ selected }) => selected);
        if (index >= 0 && _this9.mouseClicked) {
          // this.mouseClicked = false;
          const { end, start } = trends[index];
          var ry = mouseXY[1] - yScale(end[1]);

          if (ry < 0) {
            ry = ry * -1;
          }

          var pointACenter = {
            x: (start[0] + end[0]) / 2,
            y: (start[1] + end[1]) / 2,
          };

          var x1 = xScale(start[0]);
          var y1 = yScale(start[1]);
          var x2 = xScale(end[0]);
          var y2 = yScale(end[1]);
          let angleData = angle(x1, y1, x2, y2);
          angleData = angleData * -1;

          var a = 90 + angleData;
          var a1 = 90 + angleData;
          var p1 = {};
          var p2 = {};
          p2.x = Math.cos((a1 * Math.PI) / 180) * -ry + xScale(pointACenter.x);
          p2.y = Math.sin((a1 * Math.PI) / 180) * -ry + yScale(pointACenter.y);

          p1.x = Math.cos((a * Math.PI) / 180) * ry + xScale(pointACenter.x);
          p1.y = Math.sin((a * Math.PI) / 180) * ry + yScale(pointACenter.y);

          var midItem = (0, _ChartDataUtil.getCurrentItem)(
            xScale,
            xAccessor,
            [p1.x, p1.y],
            fullData,
          );

          _this9.setState({
            overrideRy: _extends({
              index: index,
              ry: ry,
              ux: xScale.invert(p1.x),
              uy: yScale.invert(p1.y),
              dx: xScale.invert(p2.x),
              dy: yScale.invert(p2.y),
              angleData: angleData,
              midItem: midItem,
            }),
          });
        }
      },
    },
    {
      key: 'handleDragLineComplete',
      value: function handleDragLineComplete() {
        var _this2 = this;

        var override = this.state.override;
        var overrideRy = this.state.overrideRy;

        var trends = this.props.trends;
        if ((0, _utils.isDefined)(override)) {
          var newTrends = trends.map(function (each, idx) {
            return idx === override.index
              ? _extends({}, each, {
                start: [override.x1Value, override.y1Value],
                end: [override.x2Value, override.y2Value],
                startItem: override.startItem,
                lastItem: override.lastItem,
                selected: true,
                midItem: overrideRy?.midItem || each.midItem,
                ry: overrideRy?.ry || each.ry,
                ux: overrideRy?.ux || each.ux,
                uy: overrideRy?.uy || each.uy,
                dx: overrideRy?.dx || each.dx,
                dy: overrideRy?.dy || each.dy,
              })
              : _extends({}, each, {
                selected: false,
              });
          });

          this.setState(
            {
              override: null,
            },
            function () {
              _this2.props.onComplete(newTrends, newTrends[override.index]);
            },
          );
        }
      },
    },
    {
      key: 'handleDrawLine',
      value: function handleDrawLine(xyValue, e, moreProps) {
        var current = this.state.current;
        var lastItem = moreProps.currentItem;
        if (
          (0, _utils.isDefined)(current) &&
          (0, _utils.isDefined)(current.start)
        ) {
          this.mouseMoved = true;
          this.setState({
            current: {
              start: current.start,
              end: xyValue,
            },
            lastItem: lastItem,
          });
        }
      },
    },
    {
      key: 'handleStart',
      value: function handleStart(xyValue, moreProps, e) {
        var _this3 = this;
        var current = this.state.current;
        var startItem = moreProps.currentItem;
        if (
          (0, _utils.isNotDefined)(current) ||
          (0, _utils.isNotDefined)(current.start)
        ) {
          this.mouseMoved = false;
          this.setState(
            {
              current: {
                start: xyValue,
                end: null,
              },
              startItem,
            },
            function () {
              _this3.props.onStart(moreProps, e);
            },
          );
        }
      },
    },
    {
      key: 'handleEnd',
      value: function handleEnd(xyValue, moreProps) {
        var _this4 = this;
        var current = this.state.current;
        var startItem = this.state.startItem;
        var lastItem = this.state.lastItem;
        var overrideRy = this.state.overrideRy;
        var _props = this.props,
          trends = _props.trends,
          sortOrder = _props.sortOrder,
          appearance = _props.appearance,
          type = _props.type;

        var xScale = moreProps.xScale,
          xAccessor = moreProps.xAccessor,
          fullData = moreProps.fullData,
          yScale = moreProps.chartConfig.yScale;
        if (
          (0, _utils.isDefined)(current) &&
          (0, _utils.isDefined)(current.start)
        ) {
          if (overrideRy?.ry) {
            this.mouseClicked = false;
          } else {
            this.mouseClicked = true;
          }
          var start = current.start;
          var end = overrideRy?.end || current?.end || xyValue;
          var ry = overrideRy?.ry || yScale(end[1]) - yScale(xyValue[1]);
          if (start[0] === end[0]) {
            end[0] = end[0] + xScale.invert(xScale(20));
          }

          var pointACenter = {
            x: (start[0] + end[0]) / 2,
            y: (start[1] + end[1]) / 2,
          };

          var x1 = xScale(start[0]);
          var y1 = yScale(start[1]);
          var x2 = xScale(end[0]);
          var y2 = yScale(end[1]);
          let angleData = angle(x1, y1, x2, y2);
          angleData = angleData * -1;

          var a = 90 + angleData;
          var a1 = 90 + angleData;
          var p1 = {};
          var p2 = {};
          p2.x = Math.cos((a1 * Math.PI) / 180) * -ry + xScale(pointACenter.x);
          p2.y = Math.sin((a1 * Math.PI) / 180) * -ry + yScale(pointACenter.y);

          p1.x = Math.cos((a * Math.PI) / 180) * ry + xScale(pointACenter.x);
          p1.y = Math.sin((a * Math.PI) / 180) * ry + yScale(pointACenter.y);

          if (ry < 0) {
            ry = ry * -1;
          }

          var midItem = (0, _ChartDataUtil.getCurrentItem)(
            xScale,
            xAccessor,
            [p1.x, p1.y],
            fullData,
          );

          var newTrends = [].concat(
            _toConsumableArray(
              trends.map(function (d) {
                return _extends({}, d, { selected: false });
              }),
            ),
            [
              {
                ...(overrideRy || {}),
                end: end,
                start: current.start,
                selected: true,
                appearance: appearance,
                type: type,
                startItem,
                lastItem,
                midItem,
              },
            ],
          );
          this.setState(
            {
              current: null,
              trends: newTrends,
            },
            function () {
              _this4.props.onComplete(
                newTrends,
                {
                  start: current.start,
                  end: end,
                  ry: ry,
                  ux: xScale.invert(p1.x),
                  uy: yScale.invert(p1.y),
                  dx: xScale.invert(p2.x),
                  dy: yScale.invert(p2.y),
                  selected: true,
                  appearance: appearance,
                  type: type,
                  sortOrder,
                  startItem,
                  lastItem,
                  midItem,
                },
                this.mouseClicked,
              );
            },
          );
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this5 = this;

        var appearance = this.props.appearance;
        var _props2 = this.props,
          timeSpan = _props2.timeSpan,
          enabled = _props2.enabled,
          snap = _props2.snap,
          shouldDisableSnap = _props2.shouldDisableSnap,
          snapTo = _props2.snapTo,
          type = _props2.type;
        var _props3 = this.props,
          currentPositionRadius = _props3.currentPositionRadius,
          currentPositionStroke = _props3.currentPositionStroke;
        var _props4 = this.props,
          currentPositionstrokeOpacity = _props4.currentPositionstrokeOpacity,
          currentPositionStrokeWidth = _props4.currentPositionStrokeWidth;
        var _props5 = this.props,
          hoverText = _props5.hoverText,
          isLocked = _props5.isLocked,
          trends = _props5.trends;
        var _state = this.state,
          current = _state.current,
          overrideRy = _state.overrideRy,
          startItem = _state.startItem,
          lastItem = _state.lastItem,
          midItem = _state.midItem,
          override = _state.override;

        var tempLine =
          (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.end)
            ? _react2.default.createElement(
              'g',
              null,
              _react2.default.createElement(_ToolsExtraData2.default, {
                ref: this.saveNodeType('extraData'),
                x1Value: current.start[0],
                y1Value: current.start[1],
                x2Value: current.end[0],
                y2Value: current.end[1],
                selected: true,
                noHover: true,
                isBoth: true,
                isHorizontal: false,
                isVertical: false,
                startItem,
                lastItem,
                midItem,
                timeSpan,
                dx: (current.start[0] + current.end[0]) / 2,
                dy: (current.start[1] + current.end[1]) / 2,
              }),
              _react2.default.createElement(_StraightLine2.default, {
                type: type,
                noHover: true,
                x1Value: current.start[0],
                y1Value: current.start[1],
                x2Value: current.end[0],
                y2Value: current.end[1],
                stroke: appearance.stroke,
                strokeWidth: appearance.strokeWidth,
                strokeOpacity: appearance.strokeOpacity,
              }),
            )
            : null;

        if (!enabled) {
          tempLine = null;
        }

        return _react2.default.createElement(
          'g',
          null,
          trends.map(function (each, idx) {
            var eachAppearance = (0, _utils.isDefined)(each.appearance)
              ? _extends({}, appearance, each.appearance)
              : appearance;

            var hoverTextWithDefault = _extends(
              {},
              EllipseChannel.defaultProps.hoverText,
              hoverText,
            );
            return _react2.default.createElement(_EachEllipseChannel2.default, {
              key: idx,
              ref: _this5.saveNodeType(idx),
              index: idx,
              type: each.type,
              selected: each.selected,
              isLocked: each.isLocked || isLocked,
              fill: eachAppearance.fill,
              fillOpacity: eachAppearance.fillOpacity,
              timeSpan: timeSpan,
              startItem: (0, _utils2.getValueFromOverride)(
                override,
                idx,
                'startItem',
                each.startItem,
              ),
              midItem: (0, _utils2.getValueFromOverride)(
                overrideRy,
                idx,
                'midItem',
                each.midItem,
              ),
              lastItem: (0, _utils2.getValueFromOverride)(
                override,
                idx,
                'lastItem',
                each.lastItem,
              ),
              dx: (0, _utils2.getValueFromOverride)(
                overrideRy,
                idx,
                'dx',
                each.dx,
              ),
              dy: (0, _utils2.getValueFromOverride)(
                overrideRy,
                idx,
                'dy',
                each.dy,
              ),
              ux: (0, _utils2.getValueFromOverride)(
                overrideRy,
                idx,
                'ux',
                each.ux,
              ),
              uy: (0, _utils2.getValueFromOverride)(
                overrideRy,
                idx,
                'uy',
                each.uy,
              ),
              ry: (0, _utils2.getValueFromOverride)(
                overrideRy,
                idx,
                'ry',
                each.ry,
              ),
              x1Value: (0, _utils2.getValueFromOverride)(
                override,
                idx,
                'x1Value',
                each.start[0],
              ),
              y1Value: (0, _utils2.getValueFromOverride)(
                override,
                idx,
                'y1Value',
                each.start[1],
              ),
              x2Value: (0, _utils2.getValueFromOverride)(
                override,
                idx,
                'x2Value',
                each.end[0],
              ),
              y2Value: (0, _utils2.getValueFromOverride)(
                override,
                idx,
                'y2Value',
                each.end[1],
              ),
              stroke: eachAppearance.stroke,
              strokeWidth: eachAppearance.strokeWidth,
              strokeOpacity: eachAppearance.strokeOpacity,
              strokeDasharray: eachAppearance.strokeDasharray,
              edgeStroke: eachAppearance.edgeStroke,
              edgeFill: eachAppearance.edgeFill,
              edgeStrokeWidth: eachAppearance.edgeStrokeWidth,
              r: eachAppearance.r,
              hoverText: hoverTextWithDefault,
              onDrag: _this5.handleDragLine,
              onDragComplete: _this5.handleDragLineComplete,
              mouseClicked: _this5.mouseClicked,
              onClick: _this5.handleClick,
              onDoubleClickWhenHover: _this5.onDoubleClickWhenHover,
              edgeInteractiveCursor: 'react-stockcharts-move-cursor',
              lineInteractiveCursor: 'react-stockcharts-move-cursor',
            });
          }),
          tempLine,
          _react2.default.createElement(_MouseLocationIndicator2.default, {
            enabled: enabled,
            snap: snap,
            shouldDisableSnap: shouldDisableSnap,
            snapTo: snapTo,
            r: currentPositionRadius,
            stroke: currentPositionStroke,
            strokeOpacity: currentPositionstrokeOpacity,
            strokeWidth: currentPositionStrokeWidth,
            onMouseDown: this.mouseClicked ? () => { } : this.handleStart,
            onClick: this.mouseClicked ? () => { } : this.handleEnd,
            onMouseMove: this.mouseClicked
              ? this.drawEllipse
              : this.handleDrawLine,
          }),
        );
      },
    },
  ]);

  return EllipseChannel;
})(_react.Component);

EllipseChannel.propTypes = {
  snap: _propTypes2.default.bool,
  enabled: _propTypes2.default.bool.isRequired,
  snapTo: _propTypes2.default.func,
  shouldDisableSnap: _propTypes2.default.func.isRequired,

  onStart: _propTypes2.default.func.isRequired,
  onComplete: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func,

  currentPositionStroke: _propTypes2.default.string,
  currentPositionStrokeWidth: _propTypes2.default.number,
  currentPositionstrokeOpacity: _propTypes2.default.number,
  currentPositionRadius: _propTypes2.default.number,
  type: _propTypes2.default.oneOf(['LINE']),
  hoverText: _propTypes2.default.object.isRequired,

  trends: _propTypes2.default.array.isRequired,

  appearance: _propTypes2.default.shape({
    fill: _propTypes2.default.string,
    stroke: _propTypes2.default.string.isRequired,
    strokeOpacity: _propTypes2.default.number.isRequired,
    strokeWidth: _propTypes2.default.number.isRequired,
    strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
    edgeStrokeWidth: _propTypes2.default.number.isRequired,
    edgeFill: _propTypes2.default.string.isRequired,
    edgeStroke: _propTypes2.default.string.isRequired,
  }).isRequired,
};

EllipseChannel.defaultProps = {
  type: 'LINE',

  onStart: _utils.noop,
  onComplete: _utils.noop,
  onSelect: _utils.noop,

  currentPositionStroke: '#000000',
  currentPositionstrokeOpacity: 1,
  currentPositionStrokeWidth: 3,
  currentPositionRadius: 0,

  shouldDisableSnap: function shouldDisableSnap(e) {
    return e.button === 2 || e.shiftKey;
  },
  hoverText: _extends({}, _HoverTextNearMouse2.default.defaultProps, {
    enable: true,
    bgHeight: 'auto',
    bgWidth: 'auto',
    text: 'Click to select object',
    selectedText: '',
  }),
  trends: [],

  appearance: {
    stroke: '#000000',
    fillOpacity: 0.5,
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeDasharray: 'Solid',
    edgeStrokeWidth: 1,
    edgeFill: '#FFFFFF',
    edgeStroke: '#000000',
    r: 6,
  },
};

exports.default = EllipseChannel;
//# sourceMappingURL=EllipseChannel.js.map

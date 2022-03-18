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

exports.getNewXY = getNewXY;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Array = require('d3-array');

var _utils = require('../../utils');

var _utils2 = require('../utils');

var _ChartDataUtil = require('../../utils/ChartDataUtil');

var _StraightLine = require('../components/StraightLine');

var _StraightLine2 = _interopRequireDefault(_StraightLine);

var _StraightLineWithArrow = require('../components/StraightLineWithArrow');

var _StraightLineWithArrow2 = _interopRequireDefault(_StraightLineWithArrow);

var _ChannelWithArea = require('../components/ChannelWithArea');

var _ChannelWithArea2 = _interopRequireDefault(_ChannelWithArea);

var _PositionTextWithRect = require('../components/PositionTextWithRect');

var _PositionTextWithRect2 = _interopRequireDefault(_PositionTextWithRect);

var _HoverTextNearMouse = require('../components/HoverTextNearMouse');

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
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

var EachRulerChannel = (function (_Component) {
  _inherits(EachRulerChannel, _Component);

  function EachRulerChannel(props) {
    _classCallCheck(this, EachRulerChannel);

    var _this = _possibleConstructorReturn(
      this,
      (
        EachRulerChannel.__proto__ || Object.getPrototypeOf(EachRulerChannel)
      ).call(this, props),
    );

    _this.handleEdge1Drag = _this.handleEdge1Drag.bind(_this);
    _this.handleEdge2Drag = _this.handleEdge2Drag.bind(_this);
    _this.handleLineDragStart = _this.handleLineDragStart.bind(_this);
    _this.handleLineDrag = _this.handleLineDrag.bind(_this);

    _this.handleEdge1DragStart = _this.handleEdge1DragStart.bind(_this);
    _this.handleEdge2DragStart = _this.handleEdge2DragStart.bind(_this);

    _this.handleDragComplete = _this.handleDragComplete.bind(_this);

    _this.handleHover = _this.handleHover.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);

    _this.isHover = _utils2.isHover.bind(_this);
    _this.saveNodeType = _utils2.saveNodeType.bind(_this);
    _this.nodes = {};

    _this.state = {
      hover: false,
    };
    return _this;
  }

  _createClass(EachRulerChannel, [
    {
      key: 'handleLineDragStart',
      value: function handleLineDragStart() {
        var _props = this.props,
          x1Value = _props.x1Value,
          y1Value = _props.y1Value,
          x2Value = _props.x2Value,
          y2Value = _props.y2Value;

        this.dragStart = {
          x1Value: x1Value,
          y1Value: y1Value,
          x2Value: x1Value,
          y2Value: y2Value,
        };
      },
    },
    {
      key: 'handleLineDrag',
      value: function handleLineDrag(moreProps) {
        var xScale = moreProps,
          plotData = moreProps.plotData,
          xAccessor = moreProps.xAccessor,
          mouseXY = moreProps.mouseXY;
        var currentItem = (0, _ChartDataUtil.getCurrentItem)(
          xScale,
          xAccessor,
          mouseXY,
          plotData,
        );
        var _props2 = this.props,
          index = _props2.index,
          onDrag = _props2.onDrag;
        var _dragStart = this.dragStart,
          x1Value = _dragStart.x1Value,
          y1Value = _dragStart.y1Value,
          x2Value = _dragStart.x2Value,
          y2Value = _dragStart.y2Value;
        var xScale = moreProps.xScale,
          yScale = moreProps.chartConfig.yScale,
          xAccessor = moreProps.xAccessor,
          fullData = moreProps.fullData;
        var startPos = moreProps.startPos,
          mouseXY = moreProps.mouseXY;

        var x1 = xScale(x1Value);
        var y1 = yScale(y1Value);
        var x2 = xScale(x2Value);
        var y2 = yScale(y2Value);

        var dx = startPos[0] - mouseXY[0];
        var dy = startPos[1] - mouseXY[1];

        var newX1Value = (0, _ChartDataUtil.getXValue)(
          xScale,
          xAccessor,
          [x1 - dx, y1 - dy],
          fullData,
        );
        var newY1Value = yScale.invert(y1 - dy);
        var newX2Value = (0, _ChartDataUtil.getXValue)(
          xScale,
          xAccessor,
          [x2 - dx, y2 - dy],
          fullData,
        );
        var newY2Value = yScale.invert(y2 - dy);

        onDrag(
          index,
          {
            x1Value: newX1Value,
            y1Value: newY1Value,
            x2Value: newX1Value,
            y2Value: newY2Value,
          },
          _props2,
        );
      },
    },
    {
      key: 'handleEdge1DragStart',
      value: function handleEdge1DragStart() {
        this.setState({
          anchor: 'edge2',
        });
      },
    },
    {
      key: 'handleEdge2DragStart',
      value: function handleEdge2DragStart() {
        this.setState({
          anchor: 'edge1',
        });
      },
    },
    {
      key: 'handleDragComplete',
      value: function handleDragComplete() {
        var _props3;

        this.setState({
          anchor: undefined,
        });
        (_props3 = this.props).onDragComplete.apply(_props3, arguments);
      },
    },
    {
      key: 'handleEdge1Drag',
      value: function handleEdge1Drag(moreProps) {
        var _props4 = this.props,
          index = _props4.index,
          onDrag = _props4.onDrag;
        var _props5 = this.props,
          x2Value = _props5.x2Value,
          y2Value = _props5.y2Value;

        var _getNewXY = getNewXY(moreProps),
          _getNewXY2 = _slicedToArray(_getNewXY, 2),
          x1Value = _getNewXY2[0],
          y1Value = _getNewXY2[1];

        onDrag(
          index,
          {
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x1Value,
            y2Value: y2Value,
          },
          _props4,
        );
      },
    },
    {
      key: 'handleEdge2Drag',
      value: function handleEdge2Drag(moreProps) {
        var _props6 = this.props,
          index = _props6.index,
          onDrag = _props6.onDrag;
        var _props7 = this.props,
          x1Value = _props7.x1Value,
          y1Value = _props7.y1Value;

        var _getNewXY3 = getNewXY(moreProps),
          _getNewXY4 = _slicedToArray(_getNewXY3, 2),
          x2Value = _getNewXY4[0],
          y2Value = _getNewXY4[1];

        onDrag(
          index,
          {
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x1Value,
            y2Value: y2Value,
          },
          _props6,
        );
      },
    },
    {
      key: 'handleHover',
      value: function handleHover(moreProps) {
        if (this.state.hover !== moreProps.hovering) {
          this.setState({
            hover: moreProps.hovering,
          });
        }
      },
    },
    {
      key: 'handleClick',
      value: function handleClick(moreProps) {
        if (this.state.hover !== moreProps.hovering) {
          this.setState({
            selected: moreProps.hovering,
          });
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props8 = this.props,
          x1Value = _props8.x1Value,
          y1Value = _props8.y1Value,
          x2Value = _props8.x2Value,
          y2Value = _props8.y2Value,
          type = _props8.type,
          stroke = _props8.stroke,
          strokeWidth = _props8.strokeWidth,
          strokeOpacity = _props8.strokeOpacity,
          strokeDasharray = _props8.strokeDasharray,
          r = _props8.r,
          edgeStrokeWidth = _props8.edgeStrokeWidth,
          edgeFill = _props8.edgeFill,
          edgeStroke = _props8.edgeStroke,
          edgeInteractiveCursor = _props8.edgeInteractiveCursor,
          lineInteractiveCursor = _props8.lineInteractiveCursor,
          hoverText = _props8.hoverText,
          selected = _props8.selected,
          onSelect = _props8.onSelect,
          selectedItems = _props8.selectedItems,
          plotData = _props8.plotData,
          onDragComplete = _props8.onDragComplete;

        var hoverTextEnabled = hoverText.enable,
          hoverTextSelected = hoverText.selectedText,
          hoverTextUnselected = hoverText.text,
          restHoverTextProps = _objectWithoutProperties(hoverText, [
            'enable',
            'selectedText',
            'text',
          ]);

        var _state = this.state,
          hover = _state.hover,
          anchor = _state.anchor;

        var xDist = x2Value - x1Value;
        var yDist = y2Value - y1Value;
        var dist = Math.sqrt(xDist * xDist + yDist * yDist);
        var fractionOfTotal = 10 / dist;

        var p = {
          x: x2Value + xDist * fractionOfTotal,
          y: y1Value + yDist * fractionOfTotal,
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

        // var volume = function volume(d) {
        //   return source(d).volume;
        // };

        // var vol =
        //   (0, _d3Array.sum)(selectedItems, volume) / selectedItems.length;

        const date1 = new Date(selectedItems[0].date);
        const date2 = new Date(selectedItems[selectedItems.length - 1].date);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement(
              x2Value !== x1Value
                ? _StraightLineWithArrow2.default
                : _StraightLine2.default,
              {
                ref: this.saveNodeType('line'),
                selected: selected || hover,
                onHover: this.handleHover,
                onUnHover: this.handleHover,
                x1Value: (x1Value + x1Value) / 2,
                y1Value: (y1Value + y2Value) / 2,
                x2Value: x2Value,
                y2Value: (y1Value + y2Value) / 2,
                type: type,
                stroke: stroke,
                strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
                strokeOpacity: strokeOpacity,
                strokeDasharray: strokeDasharray,
                interactiveCursorClass: lineInteractiveCursor,
                onDragStart: onSelect,
                onDrag: this.handleLineDrag,
                onDragComplete: onSelect,
              },
            ),
            _react2.default.createElement(
              x2Value !== x1Value
                ? _StraightLineWithArrow2.default
                : _StraightLine2.default,
              {
                ref: this.saveNodeType('line'),
                selected: selected || hover,
                onHover: this.handleHover,
                onUnHover: this.handleHover,
                x1Value: (x1Value + x2Value) / 2,
                y1Value: y1Value,
                x2Value: (x1Value + x2Value) / 2,
                y2Value: y2Value,
                type: type,
                stroke: stroke,
                strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
                strokeOpacity: strokeOpacity,
                strokeDasharray: strokeDasharray,
                interactiveCursorClass: lineInteractiveCursor,
                onDragStart: onSelect,
                onDrag: onSelect,
                onDragComplete: onSelect,
              },
            ),
            _react2.default.createElement(
              _ChannelWithArea2.default,
              _extends(
                {
                  ref: this.saveNodeType('channel'),
                  selected: selected || hover,
                },
                {},
                {
                  startXY: [x1Value, y1Value],
                  endXY: [x2Value, y1Value],
                  dy: yDist,
                  stroke: 'pink',
                  strokeWidth: 0,
                  strokeOpacity: strokeOpacity,
                  fill: yDist < 0 ? '#FF0000' : '#0000ff',
                  fillOpacity: 0.5,
                  interactiveCursorClass: 'react-stockcharts-move-cursor',
                  onDragStart: this.handleLine1Edge1Drag,
                  onDrag: this.handleLineDrag,
                  onDragComplete: onDragComplete,
                },
              ),
            ),
          ),
          _react2.default.createElement(_PositionTextWithRect2.default, {
            ref: this.saveNodeType('edge2'),
            show: selected || hover,
            cx: (x1Value + x2Value) / 2,
            cy: (x1Value + y2Value) / 2,
            r: r,
            fill: '#ff0000',
            fillOpacity: 1,
            textColor: '#fff',
            text: `${(y2Value - y1Value).toFixed(2)} (${(
              ((y2Value - y1Value) / y1Value) *
              100
            ).toFixed(2)}%), ${((y2Value - y1Value).toFixed(2) * 100).toFixed(
              0,
            )}, ${selectedItems.length} bars, ${diffDays}d, Vol ${
              selectedItems[selectedItems.length - 1].volume / plotData.length
            }`,
            fontSize: 12,
            width: 320,
            position: 'bottom',
            stroke: anchor === 'edge2' ? stroke : edgeStroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: () => {},
            onDrag: () => {},
            onDragComplete: () => {},
            infoBar: {},
          }),
          _react2.default.createElement(
            _HoverTextNearMouse2.default,
            _extends(
              {
                show: hoverTextEnabled && hover,
              },
              restHoverTextProps,
              {
                text: selected ? hoverTextSelected : hoverTextUnselected,
              },
            ),
          ),
        );
      },
    },
  ]);

  return EachRulerChannel;
})(_react.Component);

function getNewXY(moreProps) {
  var xScale = moreProps.xScale,
    yScale = moreProps.chartConfig.yScale,
    xAccessor = moreProps.xAccessor,
    plotData = moreProps.plotData,
    mouseXY = moreProps.mouseXY;

  var mouseY = mouseXY[1];

  var x = (0, _ChartDataUtil.getXValue)(xScale, xAccessor, mouseXY, plotData);

  var _yScale$domain$slice$ = yScale.domain().slice().sort(_d3Array.ascending),
    _yScale$domain$slice$2 = _slicedToArray(_yScale$domain$slice$, 2),
    small = _yScale$domain$slice$2[0],
    big = _yScale$domain$slice$2[1];

  var y = yScale.invert(mouseY);
  var newY = Math.min(Math.max(y, small), big);

  return [x, newY];
}

EachRulerChannel.propTypes = {
  x1Value: _propTypes2.default.any.isRequired,
  x2Value: _propTypes2.default.any.isRequired,
  y1Value: _propTypes2.default.any.isRequired,
  y2Value: _propTypes2.default.any.isRequired,

  index: _propTypes2.default.number,

  type: _propTypes2.default.oneOf(
    ['LINE'], // extends between the set bounds
  ).isRequired,

  onDrag: _propTypes2.default.func.isRequired,
  onEdge1Drag: _propTypes2.default.func.isRequired,
  onEdge2Drag: _propTypes2.default.func.isRequired,
  onDragComplete: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  onUnSelect: _propTypes2.default.func.isRequired,

  r: _propTypes2.default.number.isRequired,
  strokeOpacity: _propTypes2.default.number.isRequired,
  defaultClassName: _propTypes2.default.string,

  selected: _propTypes2.default.bool,

  stroke: _propTypes2.default.string.isRequired,
  strokeWidth: _propTypes2.default.number.isRequired,
  strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),

  edgeStrokeWidth: _propTypes2.default.number.isRequired,
  edgeStroke: _propTypes2.default.string.isRequired,
  edgeInteractiveCursor: _propTypes2.default.string.isRequired,
  lineInteractiveCursor: _propTypes2.default.string.isRequired,
  edgeFill: _propTypes2.default.string.isRequired,
  hoverText: _propTypes2.default.object.isRequired,
};

EachRulerChannel.defaultProps = {
  onDrag: _utils.noop,
  onEdge1Drag: _utils.noop,
  onEdge2Drag: _utils.noop,
  onDragComplete: _utils.noop,
  onSelect: _utils.noop,
  onUnSelect: _utils.noop,

  selected: false,

  edgeStroke: '#000000',
  edgeFill: '#FFFFFF',
  edgeStrokeWidth: 2,
  r: 5,
  strokeWidth: 1,
  strokeOpacity: 1,
  strokeDasharray: 'Solid',
  hoverText: {
    enable: false,
  },
};

exports.default = EachRulerChannel;
//# sourceMappingURL=EachRulerChannel.js.map
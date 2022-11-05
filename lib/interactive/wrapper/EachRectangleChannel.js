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

var _ClickableCircle = require('../components/ClickableCircle');

var _ClickableCircle2 = _interopRequireDefault(_ClickableCircle);

var _ToolsExtraData = require('../components/ToolsExtraData');

var _ToolsExtraData2 = _interopRequireDefault(_ToolsExtraData);

var _ChannelWithArea = require('../components/ChannelWithArea');

var _ChannelWithArea2 = _interopRequireDefault(_ChannelWithArea);

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

var EachRectangleChannel = (function (_Component) {
  _inherits(EachRectangleChannel, _Component);

  function EachRectangleChannel(props) {
    _classCallCheck(this, EachRectangleChannel);

    var _this = _possibleConstructorReturn(
      this,
      (
        EachRectangleChannel.__proto__ ||
        Object.getPrototypeOf(EachRectangleChannel)
      ).call(this, props),
    );

    _this.handleClick = _this.handleClick.bind(_this);
    _this.onDoubleClickWhenHover = _this.onDoubleClickWhenHover.bind(_this);
    _this.handleLineDragStart = _this.handleLineDragStart.bind(_this);
    _this.handleLineDrag = _this.handleLineDrag.bind(_this);

    _this.handleEdge1Drag = _this.handleEdge1Drag.bind(_this);
    _this.handleEdge1DragStart = _this.handleEdge1DragStart.bind(_this);

    _this.handleEdge2Drag = _this.handleEdge2Drag.bind(_this);
    _this.handleEdge2DragStart = _this.handleEdge2DragStart.bind(_this);

    _this.handleEdge3Drag = _this.handleEdge3Drag.bind(_this);
    _this.handleEdge3DragStart = _this.handleEdge3DragStart.bind(_this);

    _this.handleEdge4Drag = _this.handleEdge4Drag.bind(_this);
    _this.handleEdge4DragStart = _this.handleEdge4DragStart.bind(_this);

    _this.handleDragComplete = _this.handleDragComplete.bind(_this);

    _this.handleHover = _this.handleHover.bind(_this);

    _this.isHover = _utils2.isHover.bind(_this);
    _this.saveNodeType = _utils2.saveNodeType.bind(_this);
    _this.nodes = {};

    _this.state = {
      hover: false,
    };
    return _this;
  }

  _createClass(EachRectangleChannel, [
    {
      key: 'handleLineDragStart',
      value: function handleLineDragStart() {
        var _props = this.props,
          x1Value = _props.x1Value,
          y1Value = _props.y1Value,
          x2Value = _props.x2Value,
          y2Value = _props.y2Value,
          line1 = _props.line1,
          line2 = _props.line2,
          line3 = _props.line3,
          line4 = _props.line4;

        this.dragStart = {
          x1Value: x1Value,
          y1Value: y1Value,
          x2Value: x2Value,
          y2Value: y2Value,
          line1,
          line2,
          line3,
          line4,
        };
      },
    },
    {
      key: 'handleLineDrag',
      value: function handleLineDrag(moreProps) {
        var _props2 = this.props,
          index = _props2.index,
          line1 = _props2.line1,
          line2 = _props2.line2,
          line3 = _props2.line3,
          line4 = _props2.line4,
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
        var startItem = (0, _ChartDataUtil.getCurrentItem)(
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
        var lastItem = (0, _ChartDataUtil.getCurrentItem)(
          xScale,
          xAccessor,
          [x2 - dx, y2 - dy],
          fullData,
        );
        var newY2Value = yScale.invert(y2 - dy);

        var newLine1 = {
          x1Value: newX1Value,
          y1Value: newY1Value,
          x2Value: newX2Value,
          y2Value: newY1Value,
        };
        var newLine4 = {
          x1Value: newX2Value,
          y1Value: newY1Value,
          x2Value: newX2Value,
          y2Value: newY2Value,
        };
        var newLine3 = {
          x1Value: newX1Value,
          y1Value: newY1Value,
          x2Value: newX1Value,
          y2Value: newY2Value,
        };
        var newLine2 = {
          x1Value: newX1Value,
          y1Value: newY2Value,
          x2Value: newX2Value,
          y2Value: newY2Value,
        };
        if (this.state.hover)
          onDrag(index, {
            x1Value: newX1Value,
            y1Value: newY1Value,
            x2Value: newX2Value,
            y2Value: newY2Value,
            line1: newLine1,
            line2: newLine2,
            line3: newLine3,
            line4: newLine4,
            startItem: startItem,
            lastItem: lastItem,
          });
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
      key: 'handleEdge3DragStart',
      value: function handleEdge3DragStart() {
        this.setState({
          anchor: 'edge3',
        });
      },
    },
    {
      key: 'handleEdge4DragStart',
      value: function handleEdge4DragStart() {
        this.setState({
          anchor: 'edge4',
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
          line1 = _props4.line1,
          line2 = _props4.line2,
          line3 = _props4.line3,
          line4 = _props4.line4,
          lastItem = _props4.lastItem,
          onDrag = _props4.onDrag;
        var _props5 = this.props,
          x2Value = _props5.x2Value,
          y2Value = _props5.y2Value;

        var _getNewXY = getNewXY(moreProps),
          startItem = moreProps.currentItem,
          _getNewXY2 = _slicedToArray(_getNewXY, 2),
          x1Value = _getNewXY2[0],
          y1Value = _getNewXY2[1];

        onDrag(index, {
          x1Value: x1Value,
          y1Value: y1Value,
          x2Value: x2Value,
          y2Value: y2Value,
          line1: { ...line1, x1Value, y1Value, y2Value: y1Value },
          line2: { ...line2, x1Value },
          line3: { ...line3, x1Value, y1Value, x2Value: x1Value },
          line4: { ...line4, y1Value },
          startItem: startItem,
          lastItem: lastItem,
        });
      },
    },
    {
      key: 'handleEdge2Drag',
      value: function handleEdge2Drag(moreProps) {
        var _props6 = this.props,
          index = _props6.index,
          startItem = _props6.startItem,
          onDrag = _props6.onDrag;
        var _props7 = this.props,
          line1 = _props7.line1,
          line2 = _props7.line2,
          line3 = _props7.line3,
          line4 = _props7.line4,
          oldX1Value = _props7.x1Value,
          oldY1Value = _props7.y1Value,
          oldX2Value = _props7.x2Value,
          oldY2Value = _props7.y2Value;

        var _getNewXY3 = getNewXY(moreProps),
          lastItem = moreProps.currentItem,
          _getNewXY4 = _slicedToArray(_getNewXY3, 2),
          x2Value = _getNewXY4[0],
          y2Value = _getNewXY4[1];

        onDrag(index, {
          x1Value: oldX1Value,
          y1Value: y2Value,
          x2Value: x2Value,
          y2Value: line2.y2Value,
          line1: { ...line1, x2Value, y2Value, y1Value: y2Value },
          line2: { ...line2, x2Value },
          line3: { ...line3, y1Value: y2Value },
          line4: { ...line4, x1Value: x2Value, y1Value: y2Value, x2Value },
          startItem: startItem,
          lastItem: lastItem,
        });
      },
    },
    {
      key: 'handleEdge3Drag',
      value: function handleEdge3Drag(moreProps) {
        var _props6 = this.props,
          index = _props6.index,
          line1 = _props6.line1,
          line2 = _props6.line2,
          line3 = _props6.line3,
          line4 = _props6.line4,
          lastItem = _props6.lastItem,
          onDrag = _props6.onDrag;
        var _props7 = this.props,
          oldX1Value = _props7.x1Value,
          oldY1Value = _props7.y1Value,
          oldX2Value = _props7.x2Value,
          oldY2Value = _props7.y2Value;

        var _getNewXY3 = getNewXY(moreProps),
          startItem = moreProps.currentItem,
          _getNewXY4 = _slicedToArray(_getNewXY3, 2),
          x2Value = _getNewXY4[0],
          y2Value = _getNewXY4[1];

        onDrag(index, {
          x1Value: x2Value,
          y1Value: oldY1Value,
          x2Value: line2.x2Value,
          y2Value: y2Value,
          line1: { ...line1, x1Value: x2Value },
          line2: { ...line2, x1Value: x2Value, y1Value: y2Value, y2Value },
          line3: { ...line3, x2Value, y2Value, x1Value: x2Value },
          line4: { ...line4, y2Value },
          startItem: startItem,
          lastItem: lastItem,
        });
      },
    },
    {
      key: 'handleEdge4Drag',
      value: function handleEdge4Drag(moreProps) {
        var _props6 = this.props,
          index = _props6.index,
          line1 = _props6.line1,
          line2 = _props6.line2,
          line3 = _props6.line3,
          line4 = _props6.line4,
          startItem = _props6.lastItem,
          onDrag = _props6.onDrag;
        var _props7 = this.props,
          oldX1Value = _props7.x1Value,
          oldY1Value = _props7.y1Value,
          oldX2Value = _props7.x2Value,
          oldY2Value = _props7.y2Value;

        var _getNewXY3 = getNewXY(moreProps),
          lastItem = moreProps.currentItem,
          _getNewXY4 = _slicedToArray(_getNewXY3, 2),
          x2Value = _getNewXY4[0],
          y2Value = _getNewXY4[1];

        onDrag(index, {
          x1Value: oldX1Value,
          y1Value: oldY1Value,
          x2Value: x2Value,
          y2Value: y2Value,
          line1: { ...line1, x2Value },
          line2: { ...line2, x2Value, y2Value, y1Value: y2Value },
          line3: { ...line3, y2Value },
          line4: { ...line4, x1Value: x2Value, x2Value, y2Value },
          startItem: startItem,
          lastItem: lastItem,
        });
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
        var onClick = this.props.onClick,
          index = this.props.index;
        if (this.state.hover) {
          onClick(index, moreProps);
        }
      },
    },
    {
      key: 'onDoubleClickWhenHover',
      value: function onDoubleClickWhenHover(moreProps) {
        var onDoubleClickWhenHover = this.props.onDoubleClickWhenHover,
          index = this.props.index;
        if (this.state.hover) {
          onDoubleClickWhenHover(index, moreProps);
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props8 = this.props,
          noHover = _props8.noHover,
          x1Value = _props8.x1Value,
          y1Value = _props8.y1Value,
          x2Value = _props8.x2Value,
          y2Value = _props8.y2Value,
          startItem = _props8.startItem,
          lastItem = _props8.lastItem,
          line1 = _props8.line1,
          line2 = _props8.line2,
          line3 = _props8.line3,
          line4 = _props8.line4,
          type = _props8.type,
          fill = _props8.fill,
          fillOpacity = _props8.fillOpacity || .5,
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
          timeSpan = _props8.timeSpan,
          selected = _props8.selected,
          isLocked = _props8.isLocked,
          onDragComplete = _props8.onDragComplete;

        var _state = this.state,
          hover = _state.hover,
          anchor = _state.anchor;

        return _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement(_StraightLine2.default, {
            ref: this.saveNodeType('line'),
            selected: selected || hover,
            onHover: () => { },
            onUnHover: () => { },
            x1Value: line1.x1Value,
            y1Value: line1.y1Value,
            x2Value: line1.x2Value,
            y2Value: line1.y2Value,
            type: type,
            stroke: stroke,
            strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
            strokeOpacity: strokeOpacity,
            strokeDasharray: strokeDasharray,
            interactiveCursorClass: lineInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleLineDragStart,
            onDrag: isLocked ? () => { } : this.handleLineDrag,
            onDragComplete: isLocked ? () => { } : onDragComplete,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onClick: this.handleClick,
          }),
          _react2.default.createElement(_StraightLine2.default, {
            ref: this.saveNodeType('line'),
            selected: selected || hover,
            onHover: () => { },
            onUnHover: () => { },
            x1Value: line3.x1Value,
            y1Value: line3.y1Value,
            x2Value: line3.x2Value,
            y2Value: line3.y2Value,
            type: type,
            stroke: stroke,
            strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
            strokeOpacity: strokeOpacity,
            strokeDasharray: strokeDasharray,
            interactiveCursorClass: lineInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleLineDragStart,
            onDrag: isLocked ? () => { } : this.handleLineDrag,
            onDragComplete: isLocked ? () => { } : onDragComplete,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onClick: this.handleClick,
          }),
          _react2.default.createElement(_StraightLine2.default, {
            ref: this.saveNodeType('line'),
            selected: selected || hover,
            onHover: () => { },
            onUnHover: () => { },
            x1Value: line2.x1Value,
            y1Value: line2.y1Value,
            x2Value: line2.x2Value,
            y2Value: line2.y2Value,
            type: type,
            stroke: stroke,
            strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
            strokeOpacity: strokeOpacity,
            strokeDasharray: strokeDasharray,
            interactiveCursorClass: lineInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleLineDragStart,
            onDrag: isLocked ? () => { } : this.handleLineDrag,
            onDragComplete: isLocked ? () => { } : onDragComplete,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onClick: this.handleClick,
          }),
          _react2.default.createElement(_StraightLine2.default, {
            ref: this.saveNodeType('line'),
            selected: selected || hover,
            onHover: () => { },
            onUnHover: () => { },
            x1Value: line4.x1Value,
            y1Value: line4.y1Value,
            x2Value: line4.x2Value,
            y2Value: line4.y2Value,
            type: type,
            stroke: stroke,
            strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
            strokeOpacity: strokeOpacity,
            strokeDasharray: strokeDasharray,
            interactiveCursorClass: lineInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleLineDragStart,
            onDrag: isLocked ? () => { } : this.handleLineDrag,
            onDragComplete: isLocked ? () => { } : onDragComplete,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onClick: this.handleClick,
          }),
          _react2.default.createElement(
            _ChannelWithArea2.default,
            _extends(
              {
                ref: this.saveNodeType('channel'),
                selected: selected || hover,
              },
              {},
              {
                startXY: [line1.x1Value, line1.y1Value],
                endXY: [line1.x2Value, line1.y2Value],
                dy: line2.y1Value - line1.y1Value,
                stroke: '',
                strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
                strokeOpacity: strokeOpacity,
                fill: fill,
                fillOpacity: fillOpacity,
                opacity: 9,
                interactiveCursorClass: 'react-stockcharts-move-cursor',
                onHover: this.handleHover,
                onUnHover: this.handleHover,
                onDragStart: isLocked ? () => { } : this.handleLineDragStart,
                onDrag: isLocked ? () => { } : this.handleLineDrag,
                onDragComplete: isLocked ? () => { } : onDragComplete,
                onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
                onClick: this.handleClick,
              },
            ),
          ),
          _react2.default.createElement(_ClickableCircle2.default, {
            ref: this.saveNodeType('edge1'),
            show: selected || hover,
            cx: line1.x1Value,
            cy: line1.y1Value,
            r: r,
            fill: edgeFill,
            stroke: anchor === 'edge1' ? stroke : edgeStroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleEdge1DragStart,
            onDrag: isLocked ? () => { } : this.handleEdge1Drag,
            onDragComplete: isLocked ? () => { } : this.handleDragComplete,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onClick: this.handleClick,
          }),
          _react2.default.createElement(_ClickableCircle2.default, {
            ref: this.saveNodeType('edge2'),
            show: selected || hover,
            cx: line1.x2Value,
            cy: line1.y2Value,
            r: r,
            fill: edgeFill,
            stroke: anchor === 'edge2' ? stroke : edgeStroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleEdge2DragStart,
            onDrag: isLocked ? () => { } : this.handleEdge2Drag,
            onDragComplete: isLocked ? () => { } : this.handleDragComplete,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onClick: this.handleClick,
          }),
          _react2.default.createElement(_ClickableCircle2.default, {
            ref: this.saveNodeType('edge3'),
            show: selected || hover,
            cx: line2.x1Value,
            cy: line2.y1Value,
            r: r,
            fill: edgeFill,
            stroke: anchor === 'edge3' ? stroke : edgeStroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleEdge3DragStart,
            onDrag: isLocked ? () => { } : this.handleEdge3Drag,
            onDragComplete: isLocked ? () => { } : this.handleDragComplete,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onClick: this.handleClick,
          }),
          _react2.default.createElement(_ClickableCircle2.default, {
            ref: this.saveNodeType('edge4'),
            show: selected || hover,
            cx: line2.x2Value,
            cy: line2.y2Value,
            r: r,
            fill: edgeFill,
            stroke: anchor === 'edge4' ? stroke : edgeStroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleEdge4DragStart,
            onDrag: isLocked ? () => { } : this.handleEdge4Drag,
            onDragComplete: isLocked ? () => { } : this.handleDragComplete,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onClick: this.handleClick,
          }),
          (selected || noHover || this.state.hover) &&
          _react2.default.createElement(_ToolsExtraData2.default, {
            ref: this.saveNodeType('extraData'),
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x2Value,
            y2Value: y2Value,
            lastItem: lastItem,
            startItem: startItem,
            selected: selected,
            noHover: noHover,
            isBoth: true,
            isHorizontal: false,
            isVertical: false,
            timeSpan: timeSpan,
          }),
          // _react2.default.createElement(
          //   _HoverTextNearMouse2.default,
          //   _extends(
          //     {
          //       show: hover,
          //     },
          //     restHoverTextProps,
          //     {
          //       text: selected ? hoverTextSelected : hoverTextUnselected,
          //     },
          //   ),
          // ),
        );
      },
    },
  ]);

  return EachRectangleChannel;
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

EachRectangleChannel.propTypes = {
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
  isLocked: _propTypes2.default.bool,

  stroke: _propTypes2.default.string.isRequired,
  strokeWidth: _propTypes2.default.number.isRequired,
  strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),

  edgeStrokeWidth: _propTypes2.default.number.isRequired,
  fillOpacity: _propTypes2.default.number.isRequired,
  edgeStroke: _propTypes2.default.string.isRequired,
  edgeInteractiveCursor: _propTypes2.default.string.isRequired,
  lineInteractiveCursor: _propTypes2.default.string.isRequired,
  edgeFill: _propTypes2.default.string.isRequired,
  hoverText: _propTypes2.default.object.isRequired,
};

EachRectangleChannel.defaultProps = {
  onDrag: _utils.noop,
  onEdge1Drag: _utils.noop,
  onEdge2Drag: _utils.noop,
  onDragComplete: _utils.noop,
  onSelect: _utils.noop,
  onUnSelect: _utils.noop,

  selected: false,
  isLocked: false,

  edgeStroke: '#000000',
  edgeFill: '#FFFFFF',
  edgeStrokeWidth: 2,
  r: 5,
  strokeWidth: 1,
  fillOpacity: .5,
  strokeOpacity: 1,
  strokeDasharray: 'Solid',
  hoverText: {
    enable: false,
  },
};

exports.default = EachRectangleChannel;
//# sourceMappingURL=EachRectangleChannel.js.map

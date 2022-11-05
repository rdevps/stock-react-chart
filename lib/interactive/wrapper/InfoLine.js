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

var _ToolsExtraData = require('../components/ToolsExtraData');

var _ToolsExtraData2 = _interopRequireDefault(_ToolsExtraData);

var _ClickableCircle = require('../components/ClickableCircle');

var _ClickableCircle2 = _interopRequireDefault(_ClickableCircle);

var _InfoLineText = require('../components/InfoLineText');

var _InfoLineText2 = _interopRequireDefault(_InfoLineText);

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

var InfoLine = (function (_Component) {
  _inherits(InfoLine, _Component);

  function InfoLine(props) {
    _classCallCheck(this, InfoLine);

    var _this = _possibleConstructorReturn(
      this,
      (InfoLine.__proto__ || Object.getPrototypeOf(InfoLine)).call(this, props),
    );

    _this.handleClick = _this.handleClick.bind(_this);
    _this.onDoubleClickWhenHover = _this.onDoubleClickWhenHover.bind(_this);
    _this.handleEdge1Drag = _this.handleEdge1Drag.bind(_this);
    _this.handleEdge2Drag = _this.handleEdge2Drag.bind(_this);
    _this.handleLineDragStart = _this.handleLineDragStart.bind(_this);
    _this.handleLineDrag = _this.handleLineDrag.bind(_this);

    _this.handleEdge1DragStart = _this.handleEdge1DragStart.bind(_this);
    _this.handleEdge2DragStart = _this.handleEdge2DragStart.bind(_this);

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

  _createClass(InfoLine, [
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
          x2Value: x2Value,
          y2Value: y2Value,
        };
      },
    },
    {
      key: 'handleLineDrag',
      value: function handleLineDrag(moreProps) {
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
        if (this.state.hover)
          onDrag(
            index,
            {
              x1Value: newX1Value,
              y1Value: newY1Value,
              x2Value: newX2Value,
              y2Value: newY2Value,
              startItem,
              lastItem,
            },
            moreProps,
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

        onDrag(
          index,
          {
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x2Value,
            y2Value: y2Value,
            startItem: startItem,
            lastItem: lastItem,
          },
          moreProps,
        );
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
          x1Value = _props7.x1Value,
          y1Value = _props7.y1Value;

        var _getNewXY3 = getNewXY(moreProps),
          lastItem = moreProps.currentItem,
          _getNewXY4 = _slicedToArray(_getNewXY3, 2),
          x2Value = _getNewXY4[0],
          y2Value = _getNewXY4[1];

        onDrag(
          index,
          {
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x2Value,
            y2Value: y2Value,
            startItem: startItem,
            lastItem: lastItem,
          },
          moreProps,
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
        var _props6 = this.props,
          index = _props6.index,
          onClick = _props6.onClick;
        if (moreProps.hovering && onClick) {
          onClick(index, moreProps);
        }
      },
    },
    {
      key: 'onDoubleClickWhenHover',
      value: function onDoubleClickWhenHover(moreProps) {
        var _props6 = this.props,
          index = _props6.index,
          onDoubleClickWhenHover = _props6.onDoubleClickWhenHover;
        if (moreProps.hovering && onDoubleClickWhenHover) {
          onDoubleClickWhenHover(index, moreProps);
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
          noHover = _props8.noHover,
          startItem = _props8.startItem,
          lastItem = _props8.lastItem,
          type = _props8.type,
          fill = _props8.fill,
          fillOpacity = _props8.fillOpacity,
          textColor = _props8.textColor,
          rectFill = _props8.rectFill,
          fontSize = _props8.fontSize,
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
          selectedItems = _props8.selectedItems,
          onDragComplete = _props8.onDragComplete;

        var _state = this.state,
          hover = _state.hover,
          anchor = _state.anchor;

        return _react2.default.createElement(
          'g',
          null,
          (selected || noHover) &&
          _react2.default.createElement(_ToolsExtraData2.default, {
            ref: this.saveNodeType('extraData'),
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x2Value,
            y2Value: y2Value,
            startItem: startItem,
            lastItem: lastItem,
            selected: selected,
            noHover: noHover,
            isBoth: true,
            isHorizontal: false,
            isVertical: false,
            timeSpan: timeSpan,
          }),
          _react2.default.createElement(_StraightLine2.default, {
            ref: this.saveNodeType('line'),
            selected: selected || hover,
            onHover: this.handleHover,
            onUnHover: this.handleHover,
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x2Value,
            y2Value: y2Value,
            type: type,
            stroke: stroke,
            strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
            strokeOpacity: strokeOpacity,
            strokeDasharray: strokeDasharray,
            interactiveCursorClass: lineInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleLineDragStart,
            onClick: this.handleClick,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onDrag: isLocked ? () => { } : this.handleLineDrag,
            onDragComplete: isLocked ? () => { } : onDragComplete,
          }),
          _react2.default.createElement(_ClickableCircle2.default, {
            ref: this.saveNodeType('edge1'),
            show: selected || hover,
            cx: x1Value,
            cy: y1Value,
            r: r,
            fill: edgeFill,
            stroke: stroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleEdge1DragStart,
            onDrag: isLocked ? () => { } : this.handleEdge1Drag,
            onDragComplete: isLocked ? () => { } : this.handleDragComplete,
            onClick: this.handleClick,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
          }),
          _react2.default.createElement(_ClickableCircle2.default, {
            ref: this.saveNodeType('edge2'),
            show: selected || hover,
            cx: x2Value,
            cy: y2Value,
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x2Value,
            y2Value: y2Value,
            r: r,
            fill: edgeFill,
            stroke: stroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleEdge2DragStart,
            onDrag: isLocked ? () => { } : this.handleEdge2Drag,
            onDragComplete: isLocked ? () => { } : this.handleDragComplete,
            onClick: this.handleClick,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
          }),
          _react2.default.createElement(_InfoLineText2.default, {
            ref: this.saveNodeType('edge2'),
            show: selected || hover,
            cx: (x1Value + x2Value) / 2,
            cy: (y1Value + y2Value) / 2,
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x2Value,
            y2Value: y2Value,
            r: r,
            fill: fill,
            fillOpacity: fillOpacity,
            textColor: textColor,
            rectFill: rectFill,
            fontSize: fontSize,
            stroke: anchor === 'edge2' ? stroke : edgeStroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleEdge2DragStart,
            onDrag: isLocked ? () => { } : this.handleEdge2Drag,
            onDragComplete: isLocked ? () => { } : this.handleDragComplete,
            onClick: this.handleClick,
            infoBar: {},
            selectedItems: selectedItems,
          }),
        );
      },
    },
  ]);

  return InfoLine;
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

InfoLine.propTypes = {
  x1Value: _propTypes2.default.any.isRequired,
  x2Value: _propTypes2.default.any.isRequired,
  y1Value: _propTypes2.default.any.isRequired,
  y2Value: _propTypes2.default.any.isRequired,

  index: _propTypes2.default.number,

  type: _propTypes2.default.oneOf(
    ['INFOLINE'], // extends between the set bounds
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
  edgeStroke: _propTypes2.default.string.isRequired,
  edgeInteractiveCursor: _propTypes2.default.string.isRequired,
  lineInteractiveCursor: _propTypes2.default.string.isRequired,
  edgeFill: _propTypes2.default.string.isRequired,
  hoverText: _propTypes2.default.object.isRequired,
};

InfoLine.defaultProps = {
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
  strokeOpacity: 1,
  strokeDasharray: 'Solid',
  hoverText: {
    enable: false,
  },
};

exports.default = InfoLine;
//# sourceMappingURL=InfoLine.js.map

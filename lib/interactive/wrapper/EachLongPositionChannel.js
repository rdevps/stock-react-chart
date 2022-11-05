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

var _ChannelWithArea = require('../components/ChannelWithArea');

var _ChannelWithArea2 = _interopRequireDefault(_ChannelWithArea);

var _PositionText = require('../components/PositionText');

var _PositionText2 = _interopRequireDefault(_PositionText);

var _ToolsExtraData = require('../components/ToolsExtraData');

var _ToolsExtraData2 = _interopRequireDefault(_ToolsExtraData);

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

var EachLongPositionChannel = (function (_Component) {
  _inherits(EachLongPositionChannel, _Component);

  function EachLongPositionChannel(props) {
    _classCallCheck(this, EachLongPositionChannel);

    var _this = _possibleConstructorReturn(
      this,
      (
        EachLongPositionChannel.__proto__ ||
        Object.getPrototypeOf(EachLongPositionChannel)
      ).call(this, props),
    );

    _this.handleClick = _this.handleClick.bind(_this);
    _this.onDoubleClickWhenHover = _this.onDoubleClickWhenHover.bind(_this);
    _this.handleDownCDragStart = _this.handleDownCDragStart.bind(_this);
    _this.handleDownCDrag = _this.handleDownCDrag.bind(_this);
    _this.handleUpCDragStart = _this.handleUpCDragStart.bind(_this);
    _this.handleUpCDrag = _this.handleUpCDrag.bind(_this);
    _this.handleEdge1Drag = _this.handleEdge1Drag.bind(_this);
    _this.handleEdge2Drag = _this.handleEdge2Drag.bind(_this);
    _this.handleLineDragStart = _this.handleLineDragStart.bind(_this);
    _this.handleLineDrag = _this.handleLineDrag.bind(_this);

    _this.handleEdge1DragStart = _this.handleEdge1DragStart.bind(_this);
    _this.handleEdge2DragStart = _this.handleEdge2DragStart.bind(_this);

    _this.handleDragComplete = _this.handleDragComplete.bind(_this);
    _this.handleDrag = _this.handleDrag.bind(_this);

    _this.handleHover = _this.handleHover.bind(_this);

    _this.isHover = _utils2.isHover.bind(_this);
    _this.saveNodeType = _utils2.saveNodeType.bind(_this);
    _this.nodes = {};

    _this.state = {
      hover: false,
    };
    return _this;
  }

  _createClass(EachLongPositionChannel, [
    {
      key: 'handleLineDragStart',
      value: function handleLineDragStart() {
        var _props = this.props,
          x1Value = _props.x1Value,
          y1Value = _props.y1Value,
          x2Value = _props.x2Value,
          rightRectStart = _props.rightRectStart,
          upCircle = _props.upCircle,
          downCircle = _props.downCircle;

        this.dragStart = {
          x1Value: x1Value,
          y1Value: y1Value,
          x2Value: x2Value,
          y2Value: y1Value,
          upCx1: upCircle[0],
          upCy1: upCircle[1],
          downCx1: downCircle[0],
          downCy1: downCircle[1],
          rectX1: rightRectStart[0],
          rectY1: rightRectStart[1],
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
          y2Value = _dragStart.y2Value,
          rectX1 = _dragStart.rectX1,
          rectY1 = _dragStart.rectY1,
          upCy1 = _dragStart.upCy1,
          downCy1 = _dragStart.downCy1;
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

        if (this.state.hover)
          if (newY1Value < upCy1 && newY1Value > downCy1)
            onDrag(
              index,
              {
                x1Value: newX1Value,
                y1Value: newY1Value,
                x2Value: newX2Value,
                y2Value: newY1Value,
                upCx1: newX1Value,
                upCy1: upCy1,
                downCx1: newX1Value,
                downCy1: downCy1,
                startItem: startItem,
                lastItem: lastItem,
                rectX1: rectX1,
                rectY1: rectY1,
              },
              moreProps,
            );
      },
    },
    {
      key: 'handleDrag',
      value: function handleDrag(moreProps) {
        var _props2 = this.props,
          index = _props2.index,
          onDrag = _props2.onDrag;
        var _dragStart = this.dragStart,
          x1Value = _dragStart.x1Value,
          y1Value = _dragStart.y1Value,
          x2Value = _dragStart.x2Value,
          y2Value = _dragStart.y2Value,
          rectY1 = _dragStart.rectY1,
          upCy1 = _dragStart.upCy1,
          downCy1 = _dragStart.downCy1;
        var xScale = moreProps.xScale,
          yScale = moreProps.chartConfig.yScale,
          xAccessor = moreProps.xAccessor,
          fullData = moreProps.fullData;
        var startPos = moreProps.startPos,
          mouseXY = moreProps.mouseXY;

        var disToUpCy1 = upCy1 - y1Value;
        var disToDownCy1 = downCy1 - y1Value;
        var disToNewP = rectY1 - y1Value;

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
              upCx1: newX1Value,
              upCy1: newY1Value + disToUpCy1,
              downCx1: newX1Value,
              downCy1: newY1Value + disToDownCy1,
              startItem: startItem,
              lastItem: lastItem,
              rectX1: newX1Value,
              rectY1: newY1Value + disToNewP,
            },
            moreProps,
            'line',
          );
      },
    },
    {
      key: 'handleDownCDragStart',
      value: function handleDownCDragStart() {
        this.setState({
          anchor: 'downC',
        });
      },
    },
    {
      key: 'handleDownCDrag',
      value: function handleDownCDrag(moreProps) {
        var _props4 = this.props,
          index = _props4.index,
          startItem = _props4.startItem,
          lastItem = _props4.lastItem,
          onDrag = _props4.onDrag;
        var _props5 = this.props,
          rightRectStart = _props5.rightRectStart,
          upCircle = _props5.upCircle,
          x1Value = _props5.x1Value,
          y1Value = _props5.y1Value,
          x2Value = _props5.x2Value,
          y2Value = _props5.y2Value;

        var _getNewXY = getNewXY(moreProps),
          _getNewXY2 = _slicedToArray(_getNewXY, 2),
          downCy1 = _getNewXY2[1];

        if (downCy1 < y1Value)
          onDrag(
            index,
            {
              x1Value: x1Value,
              y1Value: y1Value,
              x2Value: x2Value,
              y2Value: y2Value,
              upCx1: upCircle[0],
              upCy1: upCircle[1],
              downCx1: x1Value,
              downCy1: downCy1,
              startItem: startItem,
              lastItem: lastItem,
              rectX1: rightRectStart[0],
              rectY1: rightRectStart[1],
            },
            moreProps,
          );
      },
    },
    {
      key: 'handleUpCDragStart',
      value: function handleUpCDragStart() {
        this.setState({
          anchor: 'upC',
        });
      },
    },
    {
      key: 'handleUpCDrag',
      value: function handleUpCDrag(moreProps) {
        var _props4 = this.props,
          index = _props4.index,
          startItem = _props4.startItem,
          lastItem = _props4.lastItem,
          onDrag = _props4.onDrag;
        var _props5 = this.props,
          rightRectStart = _props5.rightRectStart,
          downCircle = _props5.downCircle,
          x1Value = _props5.x1Value,
          y1Value = _props5.y1Value,
          x2Value = _props5.x2Value,
          y2Value = _props5.y2Value;

        var _getNewXY = getNewXY(moreProps),
          _getNewXY2 = _slicedToArray(_getNewXY, 2),
          upCy1 = _getNewXY2[1];

        if (upCy1 > y1Value)
          onDrag(
            index,
            {
              x1Value: x1Value,
              y1Value: y1Value,
              x2Value: x2Value,
              y2Value: y2Value,
              upCx1: x1Value,
              upCy1: upCy1,
              downCx1: downCircle[0],
              downCy1: downCircle[1],
              startItem: startItem,
              lastItem: lastItem,
              rectX1: rightRectStart[0],
              rectY1: rightRectStart[1],
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
          rightRectStart = _props5.rightRectStart,
          upCircle = _props5.upCircle,
          downCircle = _props5.downCircle;

        var _getNewXY = getNewXY(moreProps),
          startItem = moreProps.currentItem,
          _getNewXY2 = _slicedToArray(_getNewXY, 2),
          x1Value = _getNewXY2[0],
          y1Value = _getNewXY2[1];

        if (y1Value < upCircle[1] && y1Value > downCircle[1])
          onDrag(
            index,
            {
              x1Value: x1Value,
              y1Value: y1Value,
              x2Value: x2Value,
              y2Value: y1Value,
              upCx1: x1Value,
              upCy1: upCircle[1],
              downCx1: x1Value,
              downCy1: downCircle[1],
              startItem: startItem,
              lastItem: lastItem,
              rectX1: x1Value,
              rectY1: rightRectStart[1],
            },
            moreProps,
            'Edge1',
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
          rightRectStart = _props7.rightRectStart,
          upCircle = _props6.upCircle,
          downCircle = _props6.downCircle;

        var _getNewXY3 = getNewXY(moreProps),
          lastItem = moreProps.currentItem,
          _getNewXY4 = _slicedToArray(_getNewXY3, 2),
          x2Value = _getNewXY4[0],
          y2Value = _getNewXY4[1];

        onDrag(
          index,
          {
            x1Value: x1Value,
            y1Value: y2Value,
            x2Value: x2Value,
            y2Value: y2Value,
            upCx1: x1Value,
            upCy1: upCircle[1],
            downCx1: x1Value,
            downCy1: downCircle[1],
            startItem: startItem,
            lastItem: lastItem,
            rectX1: x1Value,
            rectY1: rightRectStart[1],
          },
          moreProps,
          'Edge2',
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
          xAccessor = _props8.xAccessor,
          isLocked = _props8.isLocked,
          startItem = _props8.startItem,
          lastItem = _props8.lastItem,
          x1Value = _props8.x1Value,
          y1Value = _props8.y1Value,
          x2Value = _props8.x2Value,
          y2Value = _props8.y2Value,
          upCircle = _props8.upCircle,
          downCircle = _props8.downCircle,
          rightRectStart = _props8.rightRectStart,
          type = _props8.type,
          stroke = _props8.stroke,
          strokeWidth = _props8.strokeWidth,
          strokeOpacity = _props8.strokeOpacity,
          strokeDasharray = _props8.strokeDasharray,
          r = _props8.r,
          edgeStrokeWidth = _props8.edgeStrokeWidth,
          edgeFill = _props8.edgeFill,
          edgeStroke = _props8.edgeStroke,
          stopColor = _props8.stopColor,
          fillOpacity = _props8.fillOpacity,
          timeSpan = _props8.timeSpan,
          targetColor = _props8.targetColor,
          textColor = _props8.textColor,
          lineColor = _props8.lineColor,
          textFont = _props8.textFont,
          edgeInteractiveCursor = _props8.edgeInteractiveCursor,
          lineInteractiveCursor = _props8.lineInteractiveCursor,
          selected = _props8.selected,
          selectedItems = _props8.selectedItems,
          accountSize = _props8.accountSize,
          lossAmount = _props8.lossAmount,
          profitAmount = _props8.profitAmount,
          stopVal = _props8.stopVal,
          targetVal = _props8.targetVal,
          extraAreaColor = _props8.extraAreaColor,
          firstCloseHighCandlePoints = _props8.firstCloseHighCandlePoints,
          firstOpenLowCandlePoints = _props8.firstOpenLowCandlePoints,
          qty = _props8.qty;

        var _state = this.state,
          hover = _state.hover,
          anchor = _state.anchor;

        var riskRewardColor = targetColor;
        var lossAmountPercentage = ((lossAmount / y2Value) * 100).toFixed(4);
        var profitAmountPercentage = ((profitAmount / y2Value) * 100).toFixed(
          2,
        );
        var totalLoss = (lossAmount * qty).toFixed(4);
        var totalProfit = (profitAmount * qty).toFixed(4);
        var lossBalance = (totalLoss - totalLoss * 0.3 - accountSize).toFixed(
          2,
        );
        var profitBalance = (
          totalProfit -
          totalProfit * 0.3 +
          accountSize
        ).toFixed(4);

        var ratio = (profitAmountPercentage / lossAmountPercentage).toFixed(4);

        if (lossAmountPercentage > profitAmountPercentage) {
          ratio = (lossAmountPercentage / profitAmountPercentage).toFixed(4);
          riskRewardColor = stopColor;
        }

        // debugger;
        var plCandle = null;
        var isLoss = false;

        for (let i = 0; i <= selectedItems.length - 1; i++) {
          if (
            selectedItems[i].high.toFixed(4) <= parseFloat(targetVal).toFixed(4)
          ) {
            plCandle = selectedItems[i];
            break;
          }
          if (
            selectedItems[i].low.toFixed(4) >= parseFloat(stopVal).toFixed(4)
          ) {
            plCandle = selectedItems[i];
            isLoss = true;
            break;
          }
        }

        var pl = (
          (parseFloat(targetVal) - parseFloat(y2Value)) *
          parseInt(qty)
        ).toFixed(4);

        // y2Value - targetVal * qty

        if (isLoss) {
          pl = ((parseFloat(stopVal) - y2Value) * qty).toFixed(4);
        }
        if (!plCandle) {
          pl = (
            (parseFloat(selectedItems[selectedItems.length - 1]?.close || 0) -
              y2Value) *
            qty
          ).toFixed(4);
        }

        var bottomText = `Stop: ${stopVal} (${lossAmountPercentage}%) ${totalLoss}, Amount: ${lossBalance}`;

        var middleText1 = `Trade: ${y2Value.toFixed(4)}, ${!plCandle ? 'Open' : 'Closed'
          } P&L: ${pl},`;

        var middleText2 = `Qty: ${qty}, Risk/Reward Ratio ${ratio}`;

        var upperText = `Target: ${targetVal} (${profitAmountPercentage}%) ${totalProfit}, Amount ${profitBalance}`;

        var upperDy = upCircle[1] - y1Value;
        if (upperDy > 0) {
          upperDy = upperDy * -1;
        }

        var downDy = downCircle[1] - y2Value;
        if (downDy > 0) {
          downDy = downDy * -1;
        }

        return _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement(
              'g',
              null,
              firstCloseHighCandlePoints &&
                firstOpenLowCandlePoints &&
                x1Value &&
                x2Value
                ? _react2.default.createElement(_StraightLine2.default, {
                  ref: this.saveNodeType('line'),
                  selected: selected || hover,
                  onHover: () => { },
                  onUnHover: () => { },
                  x1Value: firstCloseHighCandlePoints[0],
                  y1Value: firstCloseHighCandlePoints[1],
                  x2Value: firstOpenLowCandlePoints[0],
                  y2Value: firstOpenLowCandlePoints[1],
                  strokeDasharray: 'Dash',
                  type: type,
                  stroke: lineColor,
                  strokeWidth:
                    hover || selected ? strokeWidth + 1 : strokeWidth,
                  strokeOpacity: strokeOpacity,
                  strokeDasharray: strokeDasharray,
                  interactiveCursorClass: lineInteractiveCursor,
                  onDragStart: () => { },
                  onDrag: () => { },
                  onDragComplete: () => { },
                  onClick: () => { },
                })
                : null,
              _react2.default.createElement(_StraightLine2.default, {
                ref: this.saveNodeType('line'),
                selected: selected || hover,
                onHover: () => { },
                onUnHover: () => { },
                x1Value: x1Value,
                y1Value: y1Value,
                x2Value: x2Value,
                y2Value: y2Value,
                type: type,
                stroke: lineColor,
                strokeWidth: hover || selected ? strokeWidth + 1 : strokeWidth,
                strokeOpacity: strokeOpacity,
                strokeDasharray: strokeDasharray,
                interactiveCursorClass: lineInteractiveCursor,
                onDragStart: isLocked ? () => { } : this.handleLineDragStart,
                onDrag: isLocked ? () => { } : this.handleLineDrag,
                onDragComplete: isLocked ? () => { } : this.handleDragComplete,
                onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
                onClick: this.handleClick,
              }),
              firstCloseHighCandlePoints &&
                firstOpenLowCandlePoints &&
                x1Value &&
                x2Value
                ? _react2.default.createElement(
                  _ChannelWithArea2.default,
                  _extends(
                    {
                      ref: this.saveNodeType('channel'),
                      selected: selected || hover,
                    },
                    {},
                    {
                      startXY: [
                        firstCloseHighCandlePoints[0],
                        firstCloseHighCandlePoints[1],
                      ],
                      endXY: [
                        firstOpenLowCandlePoints[0],
                        firstCloseHighCandlePoints[1],
                      ],
                      dy:
                        firstOpenLowCandlePoints[1] -
                        firstCloseHighCandlePoints[1],
                      stroke: '',
                      strokeWidth: strokeWidth,
                      strokeOpacity: strokeOpacity,
                      fill: extraAreaColor,
                      fillOpacity: fillOpacity,
                      interactiveCursorClass: 'react-stockcharts-move-cursor',
                      onHover: this.handleHover,
                      onUnHover: this.handleHover,
                      onDragStart: () => { },
                      onDrag: () => { },
                      onDragComplete: () => { },
                      onClick: () => { },
                      onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
                    },
                  ),
                )
                : null,
            ),
            _react2.default.createElement(
              'g',
              null,
              selected || hover
                ? _react2.default.createElement(_PositionText2.default, {
                  ref: this.saveNodeType('edge2'),
                  show: selected || hover,
                  cx: (upCircle[0] + x2Value) / 2,
                  cy: (upCircle[1] + upCircle[1]) / 2,
                  x1Value: upCircle[0],
                  y1Value: upCircle[1],
                  x2Value: x2Value,
                  y2Value: upCircle[1],
                  r: r,
                  fill: targetColor,
                  fillOpacity: fillOpacity + .2,
                  textColor: textColor,
                  text: upperText,
                  fontSize: textFont,
                  width: upperText.length + 260,
                  position: 'top',
                  stroke: anchor === 'edge2' ? stroke : edgeStroke,
                  strokeWidth: edgeStrokeWidth,
                  strokeOpacity: 1,
                  interactiveCursorClass: edgeInteractiveCursor,
                  onDragStart: () => { },
                  onDrag: () => { },
                  onDragComplete: () => { },
                  infoBar: {},
                  onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
                  onClick: this.handleClick,
                })
                : null,

              _react2.default.createElement(
                _ChannelWithArea2.default,
                _extends(
                  {
                    ref: this.saveNodeType('channel'),
                    selected: selected || hover,
                  },
                  {},
                  {
                    startXY: [upCircle[0], upCircle[1]],
                    endXY: [x2Value, upCircle[1]],
                    dy: upperDy,
                    stroke: '',
                    strokeWidth:
                      hover || selected ? strokeWidth + 1 : strokeWidth,
                    strokeOpacity: strokeOpacity,
                    fill: targetColor,
                    fillOpacity: fillOpacity,
                    opacity: 9,
                    interactiveCursorClass: 'react-stockcharts-move-cursor',
                    onHover: this.handleHover,
                    onUnHover: this.handleHover,
                    onDragStart: isLocked ? () => { } : this.handleLineDragStart,
                    onDrag: isLocked ? () => { } : this.handleDrag,
                    onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
                    onDragComplete: isLocked
                      ? () => { }
                      : this.handleDragComplete,
                    onClick: this.handleClick,
                  },
                ),
              ),
            ),
            _react2.default.createElement(
              'g',
              null,
              selected || hover
                ? _react2.default.createElement(_PositionText2.default, {
                  ref: this.saveNodeType('edge2'),
                  show: selected || hover,
                  cx: (downCircle[0] + x2Value) / 2,
                  cy: (downCircle[1] + downCircle[1]) / 2,
                  x1Value: downCircle[0],
                  y1Value: downCircle[1],
                  x2Value: x2Value,
                  y2Value: downCircle[1],
                  r: r,
                  fill: stopColor,
                  fillOpacity: fillOpacity + .2,
                  textColor: textColor,
                  text: bottomText,
                  fontSize: textFont,
                  width: bottomText.length + 250,
                  position: 'bottom',
                  stroke: anchor === 'edge2' ? stroke : edgeStroke,
                  strokeWidth: edgeStrokeWidth,
                  strokeOpacity: 1,
                  interactiveCursorClass: edgeInteractiveCursor,
                  onDragStart: () => { },
                  onDrag: () => { },
                  onDragComplete: () => { },
                  infoBar: {},
                  onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
                  onClick: this.handleClick,
                })
                : null,
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
                    endXY: [x2Value, y2Value],
                    dy: downDy,
                    stroke: '',
                    strokeWidth:
                      hover || selected ? strokeWidth + 1 : strokeWidth,
                    strokeOpacity: strokeOpacity,
                    fill: stopColor,
                    fillOpacity: fillOpacity,
                    interactiveCursorClass: 'react-stockcharts-move-cursor',
                    onHover: this.handleHover,
                    onUnHover: this.handleHover,
                    onDragStart: isLocked ? () => { } : this.handleLineDragStart,
                    onDrag: isLocked ? () => { } : this.handleDrag,
                    onDragComplete: isLocked
                      ? () => { }
                      : this.handleDragComplete,
                    onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
                    onClick: this.handleClick,
                  },
                ),
              ),
            ),
          ),
          selected || hover
            ? _react2.default.createElement(_PositionText2.default, {
              ref: this.saveNodeType('edge2'),
              show: selected || hover,
              cx: (x1Value + x2Value) / 2,
              cy: (y1Value + y2Value) / 2,
              x1Value: x1Value,
              y1Value: y1Value,
              x2Value: x2Value,
              y2Value: y2Value,
              r: r,
              fill: riskRewardColor,
              fillOpacity: fillOpacity + .2,
              textColor: textColor,
              text: middleText1,
              text2: middleText2,
              fontSize: textFont,
              doubleLine: true,
              width: 220,
              position: 'middle',
              stroke: anchor === 'edge2' ? stroke : edgeStroke,
              strokeWidth: edgeStrokeWidth,
              strokeOpacity: 1,
              interactiveCursorClass: edgeInteractiveCursor,
              onDragStart: isLocked ? () => { } : this.handleLineDragStart,
              onDrag: isLocked ? () => { } : this.handleLineDrag,
              onDragComplete: isLocked ? () => { } : this.handleDragComplete,
              infoBar: {},
              onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
              onClick: this.handleClick,
            })
            : null,
          _react2.default.createElement(_ClickableCircle2.default, {
            ref: this.saveNodeType('edge1'),
            show: selected || hover,
            cx: x1Value,
            cy: y1Value,
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
            cx: x2Value,
            cy: y2Value,
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
            ref: this.saveNodeType('upC'),
            show: selected || hover,
            cx: upCircle[0],
            cy: upCircle[1],
            r: r,
            fill: edgeFill,
            stroke: anchor === 'upC' ? stroke : edgeStroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleUpCDragStart,
            onDrag: isLocked ? () => { } : this.handleUpCDrag,
            onDragComplete: isLocked ? () => { } : this.handleDragComplete,
            onClick: this.handleClick,
          }),
          _react2.default.createElement(_ClickableCircle2.default, {
            ref: this.saveNodeType('downC'),
            show: selected || hover,
            cx: downCircle[0],
            cy: downCircle[1],
            r: r,
            fill: edgeFill,
            stroke: anchor === 'downC' ? stroke : edgeStroke,
            strokeWidth: edgeStrokeWidth,
            strokeOpacity: 1,
            interactiveCursorClass: edgeInteractiveCursor,
            onDragStart: isLocked ? () => { } : this.handleDownCDragStart,
            onDrag: isLocked ? () => { } : this.handleDownCDrag,
            onDragComplete: isLocked ? () => { } : this.handleDragComplete,
            onDoubleClickWhenHover: isLocked ? () => { } : this.onDoubleClickWhenHover,
            onClick: this.handleClick,
          }),
          selected &&
          _react2.default.createElement(_ToolsExtraData2.default, {
            ref: this.saveNodeType('extraData'),
            x1Value: x1Value,
            y1Value: y1Value,
            x2Value: x2Value,
            y2Value: y2Value,
            upCircle: upCircle[1],
            downCircle: downCircle[1],
            rectY1: rightRectStart[1],
            selected: true,
            startItem: startItem,
            lastItem: lastItem,
            noHover: false,
            isBoth: false,
            isHorizontal: false,
            isVertical: false,
            inPosition: true,
            stopColor: stopColor,
            targetColor: targetColor,
            timeSpan: timeSpan,
          }),
        );
      },
    },
  ]);

  return EachLongPositionChannel;
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

EachLongPositionChannel.propTypes = {
  x1Value: _propTypes2.default.any.isRequired,
  x2Value: _propTypes2.default.any.isRequired,
  y1Value: _propTypes2.default.any.isRequired,
  y2Value: _propTypes2.default.any.isRequired,

  index: _propTypes2.default.number,

  type: _propTypes2.default.oneOf(
    [
      'XLINE', // extends from -Infinity to +Infinity
      'RAY', // extends to +/-Infinity in one direction
      'LINE',
    ], // extends between the set bounds
  ).isRequired,

  onDrag: _propTypes2.default.func.isRequired,
  onEdge1Drag: _propTypes2.default.func.isRequired,
  onEdge2Drag: _propTypes2.default.func.isRequired,
  onDragComplete: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  onUnSelect: _propTypes2.default.func.isRequired,

  r: _propTypes2.default.number.isRequired,
  strokeOpacity: _propTypes2.default.number.isRequired,
  fillOpacity: _propTypes2.default.number.isRequired,
  accountSize: _propTypes2.default.number.isRequired,
  qty: _propTypes2.default.number.isRequired,
  defaultClassName: _propTypes2.default.string,

  selected: _propTypes2.default.bool,
  isLocked: _propTypes2.default.bool,

  stroke: _propTypes2.default.string,
  strokeWidth: _propTypes2.default.number.isRequired,
  strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),

  edgeStrokeWidth: _propTypes2.default.number.isRequired,
  edgeStroke: _propTypes2.default.string.isRequired,
  edgeInteractiveCursor: _propTypes2.default.string.isRequired,
  lineInteractiveCursor: _propTypes2.default.string.isRequired,
  edgeFill: _propTypes2.default.string.isRequired,
  hoverText: _propTypes2.default.object.isRequired,
};

EachLongPositionChannel.defaultProps = {
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
  fillOpacity: .5,
  strokeDasharray: 'Solid',
  hoverText: {
    enable: false,
  },
};

exports.default = EachLongPositionChannel;
//# sourceMappingURL=EachLongPositionChannel.js.map

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

var _EachShortPositionChannel = require('./wrapper/EachShortPositionChannel');

var _EachShortPositionChannel2 = _interopRequireDefault(
  _EachShortPositionChannel,
);

var _StraightLine = require('./components/StraightLine');

var _StraightLine2 = _interopRequireDefault(_StraightLine);

var _ChartDataUtil = require('../utils/ChartDataUtil');

var _MouseLocationIndicator = require('./components/MouseLocationIndicator');

var _MouseLocationIndicator2 = _interopRequireDefault(_MouseLocationIndicator);

var _HoverTextNearMouse = require('./components/HoverTextNearMouse');

var _HoverTextNearMouse2 = _interopRequireDefault(_HoverTextNearMouse);

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

var ShortPositionChannel = (function (_Component) {
  _inherits(ShortPositionChannel, _Component);

  function ShortPositionChannel(props) {
    _classCallCheck(this, ShortPositionChannel);

    var _this = _possibleConstructorReturn(
      this,
      (
        ShortPositionChannel.__proto__ ||
        Object.getPrototypeOf(ShortPositionChannel)
      ).call(this, props),
    );

    _this.handleClick = _this.handleClick.bind(_this);
    _this.onDoubleClickWhenHover = _this.onDoubleClickWhenHover.bind(_this);
    _this.handleStart = _this.handleStart.bind(_this);
    _this.handleEnd = _this.handleEnd.bind(_this);
    _this.handleDrawLine = _this.handleDrawLine.bind(_this);
    _this.handleDragLine = _this.handleDragLine.bind(_this);
    _this.handleEdgeDrag = _this.handleEdgeDrag.bind(_this);
    _this.handleDragLineComplete = _this.handleDragLineComplete.bind(_this);

    _this.terminate = _utils2.terminate.bind(_this);
    _this.saveNodeType = _utils2.saveNodeType.bind(_this);

    _this.getSelectionState = (0, _utils2.isHoverForInteractiveType)(
      'trends',
    ).bind(_this);
    _this.state = { selectedItems: [] };
    _this.nodes = [];
    return _this;
  }

  _createClass(ShortPositionChannel, [
    {
      key: 'handleDragLine',
      value: function handleDragLine(
        index,
        newXYValue,
        moreProps = null,
        Edge = null,
      ) {
        var selectedItems = this.state.selectedItems;
        let firstCloseHighCandle = null;
        let firstOpenLowCandle = null;
        var appearance = this.props.appearance;
        var extraAreaColor = appearance.stopColor;
        var firstCloseHighCandlePoints = null;
        var firstOpenLowCandlePoints = null;

        var lossAmount = (newXYValue.y1Value - newXYValue.downCy1).toFixed(4);
        if (lossAmount < 0) {
          lossAmount = lossAmount * -1;
        }
        var profitAmount = (newXYValue.y1Value - newXYValue.upCy1).toFixed(4);
        if (profitAmount < 0) {
          profitAmount = profitAmount * -1;
        }

        var stopVal = parseFloat(newXYValue.downCy1).toFixed(4);
        var targetVal = parseFloat(newXYValue.upCy1).toFixed(4);

        if (moreProps || Edge) {
          var fullData = moreProps.fullData;
          var xAccessor = moreProps.xAccessor;

          var startItem = newXYValue.startItem;
          var endItem = newXYValue.lastItem;

          if (startItem && endItem) {
            var tempItems = [];
            const startIndex = fullData.findIndex(
              ({ idx }) => idx.index === startItem.idx.index,
            );
            const endIndex = fullData.findIndex(
              ({ idx }) => idx.index === endItem.idx.index,
            );
            let sIndex = endIndex > startIndex ? startIndex : endIndex;
            let eIndex = endIndex > startIndex ? endIndex : startIndex;
            for (let i = sIndex; i <= eIndex; i++) {
              const currentItem = fullData.find(({ idx }) => idx.index === i);
              tempItems.push(currentItem);
            }
            if (tempItems.length) {
              selectedItems = [...tempItems];
            }
          }

          for (let i = 0; i <= selectedItems.length - 1; i++) {
            if (
              parseFloat(newXYValue.y1Value) > selectedItems[i].open &&
              parseFloat(newXYValue.y1Value) < selectedItems[i].high
            ) {
              firstCloseHighCandle = selectedItems[i];
            }
            if (
              parseFloat(stopVal) < selectedItems[i].close &&
              parseFloat(stopVal) > selectedItems[i].low
            ) {
              firstOpenLowCandle = selectedItems[i];
            }
            if (firstCloseHighCandle && firstOpenLowCandle) {
              break;
            }
          }

          firstCloseHighCandlePoints = xAccessor(firstCloseHighCandle)
            ? [xAccessor(firstCloseHighCandle), newXYValue.y1Value]
            : null;
          firstOpenLowCandlePoints = xAccessor(firstOpenLowCandle)
            ? [
              xAccessor(firstOpenLowCandle),
              parseFloat(firstOpenLowCandle.low),
            ]
            : null;

          if (!firstCloseHighCandle || !firstOpenLowCandle) {
            firstCloseHighCandle = null;
            firstOpenLowCandle = null;
            for (let i = 0; i <= selectedItems.length - 1; i++) {
              if (
                parseFloat(newXYValue.y1Value) > selectedItems[i].low &&
                parseFloat(newXYValue.y1Value) < selectedItems[i].high
              ) {
                firstCloseHighCandle = selectedItems[i];
              }
              if (
                parseFloat(targetVal) < selectedItems[i].high &&
                parseFloat(targetVal) > selectedItems[i].close
              ) {
                firstOpenLowCandle = selectedItems[i];
              }
              if (firstCloseHighCandle && firstOpenLowCandle) {
                break;
              }
            }
            if (firstOpenLowCandle === null) {
              firstOpenLowCandle = selectedItems[selectedItems.length - 1];
            }

            firstCloseHighCandlePoints = xAccessor(firstCloseHighCandle)
              ? [xAccessor(firstCloseHighCandle), newXYValue.y1Value]
              : null;
            firstOpenLowCandlePoints = xAccessor(firstOpenLowCandle)
              ? [
                xAccessor(firstOpenLowCandle),
                parseFloat(firstOpenLowCandle.high),
              ]
              : null;

            if (
              firstOpenLowCandlePoints &&
              (firstOpenLowCandlePoints[1] > targetVal ||
                firstOpenLowCandlePoints[1] < stopVal)
            ) {
              firstOpenLowCandlePoints = null;
            }

            if (
              firstOpenLowCandlePoints &&
              firstOpenLowCandlePoints[1] > newXYValue.y1Value
            ) {
              extraAreaColor = appearance.targetColor;
            } else {
              extraAreaColor = appearance.stopColor;
            }
          }
        }

        this.setState({
          override: _extends(
            {
              index: index,
            },
            {
              ...newXYValue,
              extraAreaColor: extraAreaColor,
              stopVal: stopVal,
              targetVal: targetVal,
              lossAmount: lossAmount,
              profitAmount: profitAmount,
              firstCloseHighCandlePoints: firstCloseHighCandlePoints,
              firstOpenLowCandlePoints: firstOpenLowCandlePoints,
            },
          ),
          selectedItems,
        });
      },
    },
    {
      key: 'handleDragLineComplete',
      value: function handleDragLineComplete() {
        var _this2 = this;

        var override = this.state.override;

        if ((0, _utils.isDefined)(override)) {
          var trends = this.props.trends;

          var newTrends = trends.map(function (each, idx) {
            return idx === override.index
              ? _extends({}, each, {
                start: [override.x1Value, override.y1Value],
                end: [override.x2Value, override.y2Value],
                upCircle: [override.upCx1, override.upCy1],
                downCircle: [override.downCx1, override.downCy1],
                rightRectStart: [override.rectX1, override.rectY1],
                startItem: override.startItem,
                lastItem: override.lastItem,
                extraAreaColor: override.extraAreaColor,
                stopVal: override.stopVal,
                targetVal: override.targetVal,
                lossAmount: override.lossAmount,
                profitAmount: override.profitAmount,
                firstCloseHighCandlePoints:
                  override.firstCloseHighCandlePoints,
                firstOpenLowCandlePoints: override.firstOpenLowCandlePoints,
                selected: true,
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
      key: 'handleClick',
      value: function handleClick(index) {
        var _this2 = this;

        var trends = this.props.trends;

        var newTrends = trends.map(function (each, idx) {
          return idx === index
            ? _extends({}, each, {
              selected: true,
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
            _this2.props.onComplete(newTrends, newTrends[index]);
          },
        );
      },
    },
    {
      key: 'onDoubleClickWhenHover',
      value: function onDoubleClickWhenHover(index) {
        var _this2 = this;

        var trends = this.props.trends;

        var newTrends = trends.map(function (each, idx) {
          return idx === index
            ? _extends({}, each, {
              selected: true,
              isEdit: true,
            })
            : _extends({}, each, {
              selected: false,
              isEdit: false,
            });
        });

        this.setState(
          {
            override: null,
          },
          function () {
            _this2.props.onComplete(newTrends, newTrends[index]);
          },
        );
      },
    },
    {
      key: 'handleDrawLine',
      value: function handleDrawLine(xyValue, e, moreProps) {
        var current = this.state.current;

        var xScale = moreProps.xScale,
          plotData = moreProps.plotData,
          xAccessor = moreProps.xAccessor,
          mouseXY = moreProps.mouseXY;

        var currentItem = (0, _ChartDataUtil.getCurrentItem)(
          xScale,
          xAccessor,
          mouseXY,
          plotData,
        );
        var selectedItems = this.state.selectedItems;
        if (
          (0, _utils.isDefined)(current) &&
          (0, _utils.isDefined)(current.start)
        ) {
          this.mouseMoved = true;
          this.setState({
            current: {
              start: current.start,
              end: [xyValue[0], current.start[1]],
            },
            selectedItems: _utils.getCurrentItems(selectedItems, currentItem),
          });
        }
      },
    },
    {
      key: 'handleEdgeDrag',
      value: function handleEdgeDrag(moreProps, start, end) {
        var current = this.state.current;
        var xScale = moreProps.xScale,
          plotData = moreProps.plotData,
          xAccessor = moreProps.xAccessor;

        var startItem = (0, _ChartDataUtil.getCurrentItem)(
          xScale,
          xAccessor,
          start,
          plotData,
        );
        var endItem = (0, _ChartDataUtil.getCurrentItem)(
          xScale,
          xAccessor,
          end,
          plotData,
        );

        var selectedItems = this.state.selectedItems;

        if (startItem && endItem) {
          var tempItems = [];
          const startIndex = plotData.findIndex(
            ({ idx }) => idx.index === startItem.idx.index,
          );
          const endIndex = plotData.findIndex(
            ({ idx }) => idx.index === endItem.idx.index,
          );
          for (let i = startIndex; i <= endIndex; i++) {
            tempItems.push(plotData[i]);
          }
          if (tempItems.length) {
            selectedItems = tempItems;
          }
        }

        if (
          (0, _utils.isDefined)(current) &&
          (0, _utils.isDefined)(current.start)
        ) {
          this.mouseMoved = true;
          this.setState({
            selectedItems: selectedItems,
          });
        }
      },
    },
    {
      key: 'handleStart',
      value: function handleStart(xyValue, moreProps, e) {
        var _this3 = this;
        var current = this.state.current;

        if (
          (0, _utils.isNotDefined)(current) ||
          (0, _utils.isNotDefined)(current.start)
        ) {
          this.mouseMoved = true;

          var xScale = moreProps.xScale,
            plotData = moreProps.plotData,
            yScale = moreProps.chartConfig.yScale,
            xAccessor = moreProps.xAccessor;

          var endX = xScale.invert(xScale(xyValue[0]) + 300);
          var endY = xyValue[1];

          var selectedItems = [];
          var startItem = moreProps.currentItem;
          var lastItem = (0, _ChartDataUtil.getCurrentItem)(
            xScale,
            xAccessor,
            [xScale(endX), yScale(endY)],
            plotData,
          );

          if (startItem && lastItem) {
            var tempItems = [];
            const startIndex = plotData.findIndex(
              ({ idx }) => idx.index === startItem.idx.index,
            );
            const endIndex = plotData.findIndex(
              ({ idx }) => idx.index === lastItem.idx.index,
            );
            for (let i = startIndex; i <= endIndex; i++) {
              tempItems.push(plotData[i]);
            }
            if (tempItems.length) {
              selectedItems = tempItems;
            }
          }

          this.setState(
            {
              current: {
                start: xyValue,
                end: [endX, endY],
                selectedItems: selectedItems,
              },
              startItem: startItem,
              lastItem: lastItem,
            },
            function () {
              _this3.handleEnd([endX, endY], moreProps, e);
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

        var yScale = moreProps.chartConfig.yScale;
        var xAccessor = moreProps.xAccessor;

        var current = this.state.current;
        var startItem = this.state.startItem;
        var lastItem = this.state.lastItem;
        var selectedItems = this.state.selectedItems;
        var _props = this.props,
          trends = _props.trends,
          sortOrder = _props.sortOrder,
          appearance = _props.appearance,
          type = _props.type;

        var upCircleY1 = yScale.invert(yScale(current.start[1]) - 80);
        var downCircleY1 = yScale.invert(yScale(current.start[1]) + 80);

        let firstCloseHighCandle = null;
        let firstOpenLowCandle = null;

        if (
          this.mouseMoved &&
          (0, _utils.isDefined)(current) &&
          (0, _utils.isDefined)(current.start)
        ) {
          var lossAmount = (current.start[1] - downCircleY1).toFixed(4);
          if (lossAmount < 0) {
            lossAmount = lossAmount * -1;
          }
          var profitAmount = (current.start[1] - upCircleY1).toFixed(4);
          if (profitAmount < 0) {
            profitAmount = profitAmount * -1;
          }

          var stopVal = parseFloat(upCircleY1).toFixed(4);
          var targetVal = parseFloat(downCircleY1).toFixed(4);

          for (let i = 0; i <= selectedItems.length - 1; i++) {
            if (
              parseFloat(current.start[1]) > selectedItems[i].open &&
              parseFloat(current.start[1]) < selectedItems[i].high
            ) {
              firstCloseHighCandle = selectedItems[i];
            }
            if (
              parseFloat(stopVal) < selectedItems[i].close &&
              parseFloat(stopVal) > selectedItems[i].low
            ) {
              firstOpenLowCandle = selectedItems[i];
            }
            if (firstCloseHighCandle && firstOpenLowCandle) {
              break;
            }
          }

          var appearance = this.props.appearance;

          var extraAreaColor = appearance.stopColor;
          var firstCloseHighCandlePoints = xAccessor(firstCloseHighCandle)
            ? [xAccessor(firstCloseHighCandle), current.start[1]]
            : null;
          var firstOpenLowCandlePoints = xAccessor(firstOpenLowCandle)
            ? [xAccessor(firstOpenLowCandle), parseFloat(stopVal)]
            : null;

          if (!firstCloseHighCandle || !firstOpenLowCandle) {
            firstCloseHighCandle = null;
            firstOpenLowCandle = null;
            for (let i = 0; i <= selectedItems.length - 1; i++) {
              if (
                parseFloat(current.start[1]) > selectedItems[i].low &&
                parseFloat(current.start[1]) < selectedItems[i].high
              ) {
                firstCloseHighCandle = selectedItems[i];
              }
              if (
                parseFloat(targetVal) < selectedItems[i].high &&
                parseFloat(targetVal) > selectedItems[i].close
              ) {
                firstOpenLowCandle = selectedItems[i];
              }
              if (firstCloseHighCandle && firstOpenLowCandle) {
                break;
              }
            }
            if (firstOpenLowCandle === null) {
              firstOpenLowCandle = selectedItems[selectedItems.length - 1];
            }
            firstCloseHighCandlePoints = xAccessor(firstCloseHighCandle)
              ? [xAccessor(firstCloseHighCandle), current.start[1]]
              : null;
            firstOpenLowCandlePoints = xAccessor(firstOpenLowCandle)
              ? [xAccessor(firstOpenLowCandle), parseFloat(targetVal)]
              : null;

            if (
              firstOpenLowCandlePoints &&
              (firstOpenLowCandlePoints[1] > targetVal ||
                firstOpenLowCandlePoints[1] < stopVal)
            ) {
              firstOpenLowCandlePoints = null;
            }

            if (
              firstOpenLowCandlePoints &&
              firstOpenLowCandlePoints[1] > current.start[1]
            ) {
              extraAreaColor = appearance.targetColor;
            } else {
              extraAreaColor = appearance.stopColor;
            }
          }

          var newTrends = [].concat(
            _toConsumableArray(
              trends.map(function (d) {
                return _extends({}, d, { selected: false });
              }),
            ),
            [
              {
                start: current.start,
                end: [xyValue[0], current.start[1]],
                upCircle: [current.start[0], upCircleY1],
                downCircle: [current.start[0], downCircleY1],
                selectedItems: selectedItems,
                selected: true,
                appearance: appearance,
                type: type,
                newlyCreated: true,
                xAccessor: moreProps.xAccessor,
                xScale: moreProps.xScale,
                startItem: startItem,
                lastItem: lastItem,
                rightRectStart: current.start,
                lossAmount: lossAmount,
                profitAmount: profitAmount,
                stopVal: stopVal,
                targetVal: targetVal,
                extraAreaColor: extraAreaColor,
                firstCloseHighCandlePoints: firstCloseHighCandlePoints,
                firstOpenLowCandlePoints: firstOpenLowCandlePoints,
              },
            ],
          );
          this.setState(
            {
              current: null,
              trends: newTrends,
            },
            function () {
              _this4.props.onComplete(newTrends, {
                start: current.start,
                end: [xyValue[0], current.start[1]],
                upCircle: [current.start[0], upCircleY1],
                downCircle: [current.start[0], downCircleY1],
                selectedItems: selectedItems,
                selected: true,
                appearance: appearance,
                type: type,
                newlyCreated: true,
                sortOrder,
                xAccessor: moreProps.xAccessor,
                xScale: moreProps.xScale,
                startItem: startItem,
                lastItem: lastItem,
                rightRectStart: current.start,
                lossAmount: lossAmount,
                profitAmount: profitAmount,
                stopVal: stopVal,
                targetVal: targetVal,
                extraAreaColor: extraAreaColor,
                firstCloseHighCandlePoints: firstCloseHighCandlePoints,
                firstOpenLowCandlePoints: firstOpenLowCandlePoints,
              });
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
          accountSize = _props2.accountSize,
          qty = _props2.qty,
          isLocked = _props2.isLocked,
          type = _props2.type;
        var _props3 = this.props,
          currentPositionRadius = _props3.currentPositionRadius,
          currentPositionStroke = _props3.currentPositionStroke;
        var _props4 = this.props,
          currentPositionstrokeOpacity = _props4.currentPositionstrokeOpacity,
          currentPositionStrokeWidth = _props4.currentPositionStrokeWidth;
        var _props5 = this.props,
          hoverText = isLocked ? {} : _props5.hoverText,
          trends = _props5.trends;
        var _state = this.state,
          current = _state.current,
          selectedItems = _state.selectedItems,
          override = _state.override;

        var tempLine =
          (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.end)
            ? _react2.default.createElement(_StraightLine2.default, {
              type: type,
              noHover: true,
              x1Value: current.start[0],
              y1Value: current.start[1],
              x2Value: current.end[0],
              y2Value: current.start[1],
              upCircle: current.upCircle,
              downCircle: current.downCircle,
              stroke: '#0000ff',
              strokeWidth: 1,
              strokeOpacity: appearance.strokeOpacity,
              stopColor: appearance.stopColor,
              targetColor: appearance.targetColor,
              textColor: appearance.textColor,
              lineColor: appearance.lineColor,
              textFont: appearance.textFont,
              fillOpacity: appearance.fillOpacity,
              timeSpan: timeSpan,
            })
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
              ShortPositionChannel.defaultProps.hoverText,
              hoverText,
            );

            return _react2.default.createElement(
              _EachShortPositionChannel2.default,
              {
                key: idx,
                ref: _this5.saveNodeType(idx),
                index: idx,
                type: each.type,
                isLocked: each.isLocked || isLocked,
                selected: each.selected,
                xAccessor: each.xAccessor,
                xScale: each.xScale,
                timeSpan: timeSpan,
                upCircle: [
                  (0, _utils2.getValueFromOverride)(
                    override,
                    idx,
                    'upCx1',
                    each.upCircle[0],
                  ),
                  (0, _utils2.getValueFromOverride)(
                    override,
                    idx,
                    'upCy1',
                    each.upCircle[1],
                  ),
                ],
                downCircle: [
                  (0, _utils2.getValueFromOverride)(
                    override,
                    idx,
                    'downCx1',
                    each.downCircle[0],
                  ),
                  (0, _utils2.getValueFromOverride)(
                    override,
                    idx,
                    'downCy1',
                    each.downCircle[1],
                  ),
                ],
                rightRectStart: [
                  (0, _utils2.getValueFromOverride)(
                    override,
                    idx,
                    'rectX1',
                    each.rightRectStart[0],
                  ),
                  (0, _utils2.getValueFromOverride)(
                    override,
                    idx,
                    'rectY1',
                    each.rightRectStart[1],
                  ),
                ],
                extraAreaColor: (0, _utils2.getValueFromOverride)(
                  override,
                  idx,
                  'extraAreaColor',
                  each.extraAreaColor,
                ),
                stopVal: (0, _utils2.getValueFromOverride)(
                  override,
                  idx,
                  'stopVal',
                  each.stopVal,
                ),
                targetVal: (0, _utils2.getValueFromOverride)(
                  override,
                  idx,
                  'targetVal',
                  each.targetVal,
                ),
                lossAmount: (0, _utils2.getValueFromOverride)(
                  override,
                  idx,
                  'lossAmount',
                  each.lossAmount,
                ),
                profitAmount: (0, _utils2.getValueFromOverride)(
                  override,
                  idx,
                  'profitAmount',
                  each.profitAmount,
                ),
                firstCloseHighCandlePoints: (0, _utils2.getValueFromOverride)(
                  override,
                  idx,
                  'firstCloseHighCandlePoints',
                  each.firstCloseHighCandlePoints,
                ),
                firstOpenLowCandlePoints: (0, _utils2.getValueFromOverride)(
                  override,
                  idx,
                  'firstOpenLowCandlePoints',
                  each.firstOpenLowCandlePoints,
                ),
                startItem: (0, _utils2.getValueFromOverride)(
                  override,
                  idx,
                  'startItem',
                  each.startItem,
                ),
                lastItem: (0, _utils2.getValueFromOverride)(
                  override,
                  idx,
                  'lastItem',
                  each.lastItem,
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
                stopColor: eachAppearance.stopColor,
                targetColor: eachAppearance.targetColor,
                textColor: eachAppearance.textColor,
                lineColor: eachAppearance.lineColor,
                textFont: eachAppearance.textFont,
                fillOpacity: eachAppearance.fillOpacity,
                r: eachAppearance.r,
                hoverText: hoverTextWithDefault,
                onDrag: _this5.handleDragLine,
                onClick: _this5.handleClick,
                onDoubleClickWhenHover: _this5.onDoubleClickWhenHover,
                onDragComplete: _this5.handleDragLineComplete,
                edgeInteractiveCursor: 'react-stockcharts-move-cursor',
                lineInteractiveCursor: 'react-stockcharts-move-cursor',
                selectedItems: selectedItems,
                handleEdgeDrag: _this5.handleEdgeDrag,
                accountSize: each.accountSize || accountSize,
                qty: each.qty || qty,
              },
            );
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
            onMouseDown: this.handleStart,
            onClick: this.handleEnd,
            onMouseMove: this.handleDrawLine,
          }),
        );
      },
    },
  ]);

  return ShortPositionChannel;
})(_react.Component);

ShortPositionChannel.propTypes = {
  snap: _propTypes2.default.bool.isRequired,
  enabled: _propTypes2.default.bool,
  snapTo: _propTypes2.default.func,
  shouldDisableSnap: _propTypes2.default.func.isRequired,

  onStart: _propTypes2.default.func.isRequired,
  onComplete: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func,

  currentPositionStroke: _propTypes2.default.string,
  currentPositionStrokeWidth: _propTypes2.default.number,
  currentPositionstrokeOpacity: _propTypes2.default.number,
  currentPositionRadius: _propTypes2.default.number,
  accountSize: _propTypes2.default.number,
  qty: _propTypes2.default.number,
  type: _propTypes2.default.oneOf(
    [
      'XLINE', // extends from -Infinity to +Infinity
      'RAY', // extends to +/-Infinity in one direction
      'LINE',
    ], // extends between the set bounds
  ),
  hoverText: _propTypes2.default.object.isRequired,

  trends: _propTypes2.default.array.isRequired,
  timeSpan: _propTypes2.default.string,
  appearance: _propTypes2.default.shape({
    stroke: _propTypes2.default.string,
    strokeOpacity: _propTypes2.default.number.isRequired,
    strokeWidth: _propTypes2.default.number.isRequired,
    strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
    edgeStrokeWidth: _propTypes2.default.number.isRequired,
    edgeFill: _propTypes2.default.string.isRequired,
    edgeStroke: _propTypes2.default.string.isRequired,
    lineColor: _propTypes2.default.string.isRequired,
    linesWidth: _propTypes2.default.string.isRequired,
    stopColor: _propTypes2.default.string.isRequired,
    targetColor: _propTypes2.default.string.isRequired,
    textColor: _propTypes2.default.string.isRequired,
    textFont: _propTypes2.default.number.isRequired,
    fillOpacity: _propTypes2.default.number.isRequired,
  }).isRequired,
};

ShortPositionChannel.defaultProps = {
  timeSpan: 'minute',
  type: 'XLINE',
  accountSize: 1000,
  qty: 10,
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
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeDasharray: 'Solid',
    edgeStrokeWidth: 1,
    edgeFill: '#FFFFFF',
    edgeStroke: '#000000',
    r: 6,
    lineColor: '#2962FF',
    linesWidth: '1px',
    stopColor: '#EF5350',
    targetColor: '#079981',
    textColor: '#eee',
    textFont: 12,
    fillOpacity: .5,
  },
};

exports.default = ShortPositionChannel;
//# sourceMappingURL=ShortPositionChannel.js.map

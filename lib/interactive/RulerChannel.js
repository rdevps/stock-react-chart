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

var _EachRulerChannel = require('./wrapper/EachRulerChannel');

var _EachRulerChannel2 = _interopRequireDefault(_EachRulerChannel);

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

var RulerChannel = (function (_Component) {
  _inherits(RulerChannel, _Component);

  function RulerChannel(props) {
    _classCallCheck(this, RulerChannel);

    var _this = _possibleConstructorReturn(
      this,
      (RulerChannel.__proto__ || Object.getPrototypeOf(RulerChannel)).call(
        this,
        props,
      ),
    );

    _this.handleStart = _this.handleStart.bind(_this);
    _this.handleEnd = _this.handleEnd.bind(_this);
    _this.handleDrawLine = _this.handleDrawLine.bind(_this);
    _this.handleDragLine = _this.handleDragLine.bind(_this);
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

  _createClass(RulerChannel, [
    {
      key: 'handleDragLine',
      value: function handleDragLine(index, newXYValue, props) {
        if (props.selectedInteraction) {
          this.setState({
            override: _extends(
              {
                index: index,
              },
              newXYValue,
            ),
          });
        }
      },
    },
    {
      key: 'handleDragLineComplete',
      value: function handleDragLineComplete(moreProps) {
        var _this2 = this;

        var override = this.state.override;

        if ((0, _utils.isDefined)(override)) {
          var trends = this.props.trends;

          var newTrends = trends.map(function (each, idx) {
            return idx === override.index
              ? _extends({}, each, {
                  start: [override.x1Value, override.y1Value],
                  end: [override.x2Value, override.y2Value],
                  selected: true,
                  plotData: moreProps.plotData,
                  selectedItems: this.state.selectedItems,
                  startItem: override.startItem,
                  lastItem: override.lastItem,
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
              _this2.props.onComplete(newTrends, moreProps);
            },
          );
        }
      },
    },
    {
      key: 'handleDrawLine',
      value: function handleDrawLine(xyValue, e, moreProps) {
        var current = this.state.current;

        var selectedItems = this.state.selectedItems;
        var startItem = this.state.startItem;
        var lastItem = moreProps.currentItem;
        if (
          (0, _utils.isDefined)(current) &&
          (0, _utils.isDefined)(current.start)
        ) {
          this.mouseMoved = true;

          var fullData = moreProps.fullData,
            plotData = moreProps.plotData;

          var startItem = startItem;
          var endItem = lastItem;

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
              tempItems.push(fullData[i]);
            }
            if (tempItems.length) {
              selectedItems = tempItems;
            }
          }

          this.setState({
            current: {
              start: current.start,
              end: xyValue,
            },
            selectedItems,
            plotData,
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
              startItem: moreProps.currentItem,
              lastItem: moreProps.currentItem,
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
      value: function handleEnd(xyValue, moreProps, e) {
        var _this4 = this;

        var current = this.state.current;
        var startItem = this.state.startItem;
        var _props = this.props,
          trends = _props.trends,
          appearance = _props.appearance,
          type = _props.type;

        if (
          this.mouseMoved &&
          (0, _utils.isDefined)(current) &&
          (0, _utils.isDefined)(current.start)
        ) {
          var newTrends = [].concat(
            _toConsumableArray(
              trends.map(function (d) {
                return _extends({}, d, { selected: false });
              }),
            ),
            [
              {
                start: current.start,
                end: xyValue,
                selected: true,
                appearance: appearance,
                type: type,
                plotData: moreProps.plotData,
                selectedItems: current.selectedItems,
                startItem: startItem,
                lastItem: moreProps.currentItem,
              },
            ],
          );
          this.setState(
            {
              current: null,
              trends: newTrends,
            },
            function () {
              _this4.props.onComplete(newTrends, moreProps, e);
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
          enabled = _props2.enabled,
          snap = _props2.snap,
          shouldDisableSnap = _props2.shouldDisableSnap,
          snapTo = _props2.snapTo,
          type = _props2.type,
          isLocked = _props2.isLocked,
          onSelect = _props2.onSelect;
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
          plotData = _state.plotData,
          startItem = _state.startItem,
          lastItem = _state.lastItem,
          override = _state.override;

        var tempLine =
          (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.end)
            ? _react2.default.createElement(_EachRulerChannel2.default, {
                type: type,
                noHover: true,
                x1Value: current.start[0],
                y1Value: current.start[1],
                x2Value: current.end[0],
                y2Value: current.end[1],
                startItem: startItem,
                lastItem: lastItem,
                stroke: appearance.stroke,
                textFill: '#fff',
                strokeWidth: appearance.strokeWidth,
                strokeOpacity: appearance.strokeOpacity,
                onDrag: _this5.handleDragLine,
                selectedItems: selectedItems,
                plotData: plotData,
              })
            : null;

        return _react2.default.createElement(
          'g',
          null,
          trends.map(function (each, idx) {
            var eachAppearance = (0, _utils.isDefined)(each.appearance)
              ? _extends({}, appearance, each.appearance)
              : appearance;

            var hoverTextWithDefault =
              (_props2.selectedInteraction &&
                _extends({}, RulerChannel.defaultProps.hoverText, hoverText)) ||
              {};

            return _react2.default.createElement(_EachRulerChannel2.default, {
              key: idx,
              ref: _this5.saveNodeType(idx),
              index: idx,
              type: each.type,
              isLocked: each.isLocked || isLocked,
              selected: each.selected,
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
              stroke: eachAppearance.stroke || appearance.stroke,
              textFill: '#fff',
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
              edgeInteractiveCursor: 'react-stockcharts-pointer-cursor',
              lineInteractiveCursor: 'react-stockcharts-pointer-cursor',
              onSelect,
              selectedInteraction: _props2.selectedInteraction,
              selectedItems: selectedItems,
              plotData: plotData,
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
            onMouseDown: this.handleStart,
            onClick: this.handleEnd,
            onMouseMove: this.handleDrawLine,
          }),
        );
      },
    },
  ]);

  return RulerChannel;
})(_react.Component);

RulerChannel.propTypes = {
  snap: _propTypes2.default.bool.isRequired,
  isLocked: _propTypes2.default.bool.isRequired,
  // enabled: _propTypes2.default.bool.isRequired,
  snapTo: _propTypes2.default.func,
  shouldDisableSnap: _propTypes2.default.func.isRequired,

  onStart: _propTypes2.default.func.isRequired,
  onComplete: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func,

  currentPositionStroke: _propTypes2.default.string,
  currentPositionStrokeWidth: _propTypes2.default.number,
  currentPositionstrokeOpacity: _propTypes2.default.number,
  currentPositionRadius: _propTypes2.default.number,
  type: _propTypes2.default.oneOf(
    ['LINE'], // extends between the set bounds
  ),
  hoverText: _propTypes2.default.object.isRequired,

  trends: _propTypes2.default.array.isRequired,

  appearance: _propTypes2.default.shape({
    stroke: _propTypes2.default.string,
    textFill: _propTypes2.default.string,
    strokeOpacity: _propTypes2.default.number.isRequired,
    strokeWidth: _propTypes2.default.number.isRequired,
    strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
    edgeStrokeWidth: _propTypes2.default.number.isRequired,
    edgeFill: _propTypes2.default.string.isRequired,
    edgeStroke: _propTypes2.default.string.isRequired,
  }).isRequired,
};

RulerChannel.defaultProps = {
  type: 'XLINE',

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
  selected: true,
  isLocked: true,
  appearance: {
    stroke: '#000000',
    textFill: '#000000',
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeDasharray: 'Solid',
    edgeStrokeWidth: 1,
    edgeFill: '#FFFFFF',
    edgeStroke: '#000000',
    r: 6,
  },
};

exports.default = RulerChannel;
//# sourceMappingURL=RulerChannel.js.map

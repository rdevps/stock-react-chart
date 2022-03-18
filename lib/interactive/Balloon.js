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

var _EachBalloon = require('./wrapper/EachBalloon');

var _EachBalloon2 = _interopRequireDefault(_EachBalloon);

var _StraightLine = require('./components/StraightLine');

var _StraightLine2 = _interopRequireDefault(_StraightLine);

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

var Balloon = (function (_Component) {
  _inherits(Balloon, _Component);

  function Balloon(props) {
    _classCallCheck(this, Balloon);

    var _this = _possibleConstructorReturn(
      this,
      (Balloon.__proto__ || Object.getPrototypeOf(Balloon)).call(this, props),
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

    _this.state = {};
    _this.nodes = [];
    return _this;
  }

  _createClass(Balloon, [
    {
      key: 'handleDragLine',
      value: function handleDragLine(index, newXYValue) {
        this.setState({
          override: _extends(
            {
              index: index,
            },
            newXYValue,
          ),
        });
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
      value: function handleDrawLine(xyValue) {
        var current = this.state.current;

        if (
          (0, _utils.isDefined)(current) &&
          (0, _utils.isDefined)(current.start)
        ) {
          this.mouseMoved = true;
          this.setState({
            current: {
              start: current.start,
              end: ['HXLINE', 'RAY'].includes(this.props.type)
                ? [xyValue[0], current.start[1]]
                : xyValue,
            },
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
        var text = this.props.text;
        var infoAppearance = this.props.infoAppearance;
        var _props2 = this.props,
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
          trends = _props5.trends;
        var _state = this.state,
          current = _state.current,
          override = _state.override;

        var tempLine =
          (0, _utils.isDefined)(current) && (0, _utils.isDefined)(current.end)
            ? _react2.default.createElement(_EachBalloon2.default, {
                type: type,
                noHover: true,
                x1Value: current.start[0],
                y1Value: current.start[1],
                x2Value: current.end[0],
                y2Value: current.end[1],
                stroke: infoAppearance.stroke,
                strokeWidth: appearance.strokeWidth,
                strokeOpacity: appearance.strokeOpacity,
                strokeDasharray: appearance.strokeDasharray,
                edgeStroke: appearance.edgeStroke,
                edgeFill: appearance.edgeFill,
                edgeStrokeWidth: appearance.edgeStrokeWidth,
                text: text,
                fill: infoAppearance.fill,
                fillOpacity: infoAppearance.fillOpacity,
                textColor: infoAppearance.textColor,
                fontSize: infoAppearance.fontSize,
              })
            : null;

        if (type === 'REPLAY') {
          trends = [];
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
              Balloon.defaultProps.hoverText,
              hoverText,
            );

            return _react2.default.createElement(_EachBalloon2.default, {
              key: idx,
              ref: _this5.saveNodeType(idx),
              index: idx,
              type: each.type,
              selected: each.selected,
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
              stroke: infoAppearance.stroke,
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
              edgeInteractiveCursor: 'react-stockcharts-move-cursor',
              lineInteractiveCursor: 'react-stockcharts-move-cursor',
              text: text,
              fill: infoAppearance.fill,
              fillOpacity: infoAppearance.fillOpacity,
              textColor: infoAppearance.textColor,
              fontSize: infoAppearance.fontSize,
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
            fill: infoAppearance.fill,
            fillOpacity: infoAppearance.fillOpacity,
            fontSize: infoAppearance.fontSize,
          }),
        );
      },
    },
  ]);

  return Balloon;
})(_react.Component);

Balloon.propTypes = {
  snap: _propTypes2.default.bool.isRequired,
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
    [
      'XLINE', // extends from -Infinity to +Infinity
      'RAY', // extends to +/-Infinity in one direction
      'LINE',
      'VXLINE',
      'HXLINE',
      'ARROW',
      'Balloon',
      'REPLAY',
    ], // extends between the set bounds
  ),
  hoverText: _propTypes2.default.object.isRequired,

  trends: _propTypes2.default.array.isRequired,
  text: _propTypes2.default.string.isRequired,
  appearance: _propTypes2.default.shape({
    stroke: _propTypes2.default.string.isRequired,
    strokeOpacity: _propTypes2.default.number.isRequired,
    strokeWidth: _propTypes2.default.number.isRequired,
    strokeDasharray: _propTypes2.default.oneOf(_utils.strokeDashTypes),
    edgeStrokeWidth: _propTypes2.default.number.isRequired,
    edgeFill: _propTypes2.default.string.isRequired,
    edgeStroke: _propTypes2.default.string.isRequired,
  }).isRequired,

  infoAppearance: _propTypes2.default.shape({
    fillOpacity: _propTypes2.default.number.isRequired,
    fill: _propTypes2.default.string.isRequired,
    stroke: _propTypes2.default.string.isRequired,
    textColor: _propTypes2.default.string.isRequired,
    fontSize: _propTypes2.default.number.isRequired,
  }).isRequired,
};

Balloon.defaultProps = {
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
  text: 'Text',
  appearance: {
    stroke: '#000000',
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeDasharray: 'Solid',
    edgeStrokeWidth: 1,
    edgeFill: '#FFFFFF',
    edgeStroke: '#000000',
    r: 6,
  },
  infoAppearance: {
    fillOpacity: 1,
    fill: 'green',
    stroke: '#000000',
    textColor: '#fff',
    fontSize: 12,
  },
};

exports.default = Balloon;
//# sourceMappingURL=Balloon.js.map

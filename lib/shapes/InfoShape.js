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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require('../GenericChartComponent');

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require('../GenericComponent');

var _utils2 = require('../interactive/utils');

var utils = require('./shapes.util');

const urlRegex = /(https?:\/\/[^\s]+)/g;

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

var InfoShape = (function (_Component) {
  _inherits(InfoShape, _Component);

  function InfoShape(props) {
    _classCallCheck(this, InfoShape);

    var _this = _possibleConstructorReturn(
      this,
      (InfoShape.__proto__ || Object.getPrototypeOf(InfoShape)).call(
        this,
        props,
      ),
    );

    _this.renderSVG = _this.renderSVG.bind(_this);
    // _this.drawOnCanvas = _this.drawOnCanvas.bind(_this);

    _this.saveNodeType = _utils2.saveNodeType.bind(_this);
    _this.isHover = _this.isHover.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.nodes = {};

    _this.state = {
      hover: false,
    };
    return _this;
  }

  _createClass(InfoShape, [
    {
      key: 'renderSVG',
      value: function renderSVG(moreProps) {
        var plotData = moreProps.plotData;
        var xScale = moreProps.xScale,
          xAccessor = moreProps.xAccessor;

        var scriptData = this.props.scriptData;
        var chartOptions = this.props.chartOptions;
        var radius = this.props.radius;
        var type = this.props.type;
        var scriptOptionsData = this.props.scriptOptionsData;

        var cx = 0;
        var cy = 0;

        // let selectedCandle = null;
        // let createdDate = new Date(scriptData.data.created);
        // let nextDate = new Date(scriptData.data.created);
        // if (type === 'options') {
        //   createdDate = new Date(
        //     `${scriptData.data.date} ${scriptData.data.time}`,
        //   );
        //   nextDate = new Date(
        //     `${scriptData.data.date} ${scriptData.data.time}`,
        //   );
        // }
        // switch (chartOptions.timeSpan) {
        //   case 'hour':
        //     nextDate = new Date(scriptData.data.created).setHours(
        //       nextDate.getHours() + chartOptions.multiplier,
        //     );
        //     break;
        //   case 'day':
        //     nextDate = new Date(scriptData.data.created).setDate(
        //       nextDate.getDate() + chartOptions.multiplier,
        //     );
        //     break;
        //   case 'month':
        //     nextDate = new Date(scriptData.data.created).setMonth(
        //       nextDate.getMonth() + chartOptions.multiplier,
        //     );
        //     break;
        //   case 'week':
        //     nextDate = new Date(scriptData.data.created).setDate(
        //       nextDate.getDate() + 7,
        //     );
        //     break;
        //   default:
        //     break;
        // }

        // for (var i = plotData.length - 1; i >= 0; i--) {
        //   let candleDate = new Date(plotData[i].date);
        //   if (
        //     candleDate.getMonth() >= createdDate.getMonth() &&
        //     candleDate.getMonth() <= nextDate.getMonth()
        //   ) {
        //     if (
        //       candleDate.getDate() >= createdDate.getDate() &&
        //       candleDate.getDate() <= nextDate.getDate()
        //     ) {
        //       if (
        //         candleDate.getHours() >= createdDate.getHours() &&
        //         candleDate.getHours() <= nextDate.getHours()
        //       ) {
        //         if (
        //           candleDate.getMinutes() >= createdDate.getMinutes() &&
        //           candleDate.getMinutes() <= nextDate.getMinutes()
        //         ) {
        //           selectedCandle = plotData[i];
        //           break;
        //         }
        //       }
        //       if (!selectedCandle) {
        //         selectedCandle = plotData[i];
        //         break;
        //       }
        //     }
        //   }
        // }

        // if (selectedCandle === null) {
        //   return null;
        // }

        // cx = xScale(xAccessor(selectedCandle));
        // cy = radius + 5;

        var width = 50;
        var height = 25;
        cy = 0;
        if (type === 'options') {
          width = 80;
          cx = moreProps.width - 90;
        } else {
          if (scriptOptionsData) {
            cx = moreProps.width - 150;
          } else {
            cx = moreProps.width - 60;
          }
        }

        // cy =
        //   yScale(selectedCandle.high) -
        //   yScale(yScale.invert(height * 2 - height / 2));

        var tx = cx + width / 2;
        var ty = cy + height / 2;

        if (this.state.cx !== cx || this.state.cy !== cy) {
          this.setState({ cx, cy });
        }

        return _react2.default.createElement(
          'g',
          { cx, cy },
          _react2.default.createElement(
            'rect',
            _extends(
              {},
              {
                x: cx,
                y: cy,
                width,
                height,
                stroke: scriptData.stroke,
                fill: scriptData.fill,
                fillOpacity: scriptData.fillOpacity,
                strokeWidth: scriptData.strokeWidth,
              },
            ),
          ),
          _react2.default.createElement(
            'text',
            {
              fontSize: scriptData.fontSize,
              textAnchor: 'middle',
              alignmentBaseline: 'central',
              fill: scriptData.textColor,
              letterSpacing: '1.5',
              x: tx,
              y: ty,
            },
            type,
          ),
        );
      },
    },
    {
      key: 'isHover',
      value: function isHover(moreProps) {
        var mouseXY = moreProps.mouseXY;
        var type = this.props.type;
        var width = 50;
        var height = 25;

        if (type === 'options') {
          width = 80;
        }

        var r = width;
        var x = this.state.cx,
          y = this.state.cy;

        var isInside = false;
        var _mouseXY = _slicedToArray(mouseXY, 2),
          mx = _mouseXY[0],
          my = _mouseXY[1];

        isInside = x < mx && mx < x + r && y < my && my < y + r;
        return isInside;
      },
    },
    {
      key: 'onClick',
      value: function onClick(moreProps) {
        var _props = this.props;
        var scriptData = _props.scriptData;
        if (moreProps.hovering) {
          _props.setSelectedNews({ ...scriptData.data, ...scriptData });
          setTimeout(() => {
            _props.setIsOpen(true);
          }, 100);
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var selected = this.props.selected;
        var text = this.props.text;
        return _react2.default.createElement(_GenericChartComponent2.default, {
          ref: this.saveNode,
          selected: selected,
          interactiveCursorClass: 'react-stockcharts-pointer-cursor',
          onClick: this.onClick,
          isHover: this.isHover,
          onDragStart: () => { },
          onDrag: () => { },
          onDragComplete: () => { },

          svgDraw: this.renderSVG,

          canvasDraw: () => { },
          canvasToDraw: _GenericComponent.getMouseCanvas,

          drawOn: ['mousemove', 'pan', 'drag', 'click'],
        });
      },
    },
  ]);

  return InfoShape;
})(_react.Component);

function helper(props, moreProps) {
  var cx = props.cx,
    cy = props.cy;

  var xScale = moreProps.xScale,
    yScale = moreProps.chartConfig.yScale;

  var x = cx;
  var y = cy;
  return [x, y];
}

InfoShape.propTypes = {
  text: _propTypes2.default.any,
  textColor: _propTypes2.default.string,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  value: _propTypes2.default.number,
  fontSize: _propTypes2.default.number,
  borderRadious: _propTypes2.default.number,
  fillOpacity: _propTypes2.default.number,
  radius: _propTypes2.default.number,
  metrics: _propTypes2.default.string,
  position: _propTypes2.default.string,
  location: _propTypes2.default.string,
};

InfoShape.defaultProps = {
  fillOpacity: 1,
  fill: null,
  textColor: '#0000ff',
  width: 100,
  height: 50,
  radius: 20,
  text: '',
  fontSize: 12,
  borderRadious: 12,
  value: 169,
  metrics: 'high',
  position: 'bottom',
  location: 'topRight',
};

exports.default = InfoShape;
//# sourceMappingURL=InfoShape.js.map

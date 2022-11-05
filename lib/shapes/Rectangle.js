'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

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

var Rectangle = (function (_Component) {
  _inherits(Rectangle, _Component);

  function Rectangle(props) {
    _classCallCheck(this, Rectangle);

    var _this = _possibleConstructorReturn(
      this,
      (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(
        this,
        props,
      ),
    );

    _this.renderSVG = _this.renderSVG.bind(_this);
    _this.drawOnCanvas = _this.drawOnCanvas.bind(_this);

    _this.saveNodeType = _utils2.saveNodeType.bind(_this);
    _this.nodes = {};

    _this.state = {
      hover: false,
    };
    return _this;
  }

  _createClass(Rectangle, [
    {
      key: 'drawOnCanvas',
      value: function drawOnCanvas(ctx, moreProps) {
        var _props = this.props,
          stroke = _props.stroke,
          strokeWidth = _props.strokeWidth,
          fill = _props.fill;
        var _props2 = this.props,
          fillOpacity = _props2.fillOpacity,
          strokeOpacity = _props2.strokeOpacity;
        var r = this.props.r;

        var _helper3 = helper(this.props, moreProps),
          _helper4 = _slicedToArray(_helper3, 2),
          x = _helper4[0],
          y = _helper4[1];

        ctx.lineWidth = strokeWidth;
        ctx.fillStyle = (0, _utils.hexToRGBA)(fill, fillOpacity);
        ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
      },
    },
    {
      key: 'renderSVG',
      value: function renderSVG(moreProps) {
        var plotData = moreProps.plotData;
        var xScale = moreProps.xScale,
          yScale = moreProps.chartConfig.yScale,
          xAccessor = moreProps.xAccessor,
          fullData = moreProps.fullData;

        var stroke = this.props.stroke;
        var strokeWidth = this.props.strokeWidth;
        var fill = this.props.fill;
        var metrics = this.props.metrics;
        var position = this.props.position;
        var location = this.props.location;
        var value = this.props.value;
        var fillOpacity = fill.length ? this.props.fillOpacity : 0.1;
        var textColor = this.props.textColor;
        var text = this.props.text;
        var rx = this.props.rx;
        var ry = this.props.ry;
        var width = this.props.width;
        var height = this.props.height;
        var fontSize = this.props.fontSize;
        var shapesList = this.props.shapesList;
        var index = this.props.index;
        var setShapesList = this.props.setShapesList;

        var cx = 0;
        var cy = 0;

        if (position === 'fixed') {
          let pos = utils.getPosision(
            index,
            shapesList,
            moreProps,
            location,
            width,
            height,
          );
          cx = pos.cx;
          cy = pos.cy;
        } else {
          let selectedCandle = null;
          for (var i = fullData.length - 1; i >= 0; i--) {
            if (parseFloat(fullData[i][metrics]) == parseFloat(value)) {
              selectedCandle = fullData[i];
              break;
            }
          }

          if (!selectedCandle) {
            for (var i = fullData.length - 1; i >= 0; i--) {
              if (parseFloat(fullData[i][metrics]) >= parseFloat(value)) {
                selectedCandle = fullData[i];
                break;
              }
            }
          }

          if (selectedCandle === null) {
            return null;
          }

          cx = xScale(xAccessor(selectedCandle));
          cy =
            yScale(selectedCandle.high) -
            yScale(yScale.invert(height * 2 - height / 2));
          if (position === 'bottom') {
            cy = yScale(selectedCandle.low) + yScale(yScale.invert(height / 2));
          }
        }

        if (shapesList[index].cx !== cx || shapesList[index].cy !== cy) {
          shapesList[index].cx = cx;
          shapesList[index].cy = cy;
          setShapesList([...shapesList]);
        }
        cx = cx - 20;
        var tx = cx + width / 2;
        var ty = cy + height / 2;

        return _react2.default.createElement(
          'g',
          {},
          _react2.default.createElement(
            'rect',
            _extends(
              {},
              {
                x: cx,
                y: cy,
                rx,
                ry,
                width,
                height,
                stroke,
                strokeWidth,
                fill,
                fillOpacity,
              },
            ),
          ),
          _react2.default.createElement(
            'text',
            {
              fontSize,
              textAnchor: 'middle',
              alignmentBaseline: 'central',
              fill: textColor,
              letterSpacing: '1.5',
              x: tx,
              y: ty,
            },
            text,
          ),
        );
      },
    },
    {
      key: 'render',
      value: function render() {
        var interactiveCursorClass = this.props.interactiveCursorClass;
        var selected = this.props.selected;
        return _react2.default.createElement(_GenericChartComponent2.default, {
          ref: this.saveNode,
          interactiveCursorClass: interactiveCursorClass,
          selected: selected,
          isHover: () => { },

          onDragStart: () => { },
          onDrag: () => { },
          onClick: () => { },
          onDragComplete: () => { },

          svgDraw: this.renderSVG,

          canvasDraw: this.drawOnCanvas,
          canvasToDraw: _GenericComponent.getMouseCanvas,

          drawOn: ['pan', 'drag', 'click'],
        });
      },
    },
  ]);

  return Rectangle;
})(_react.Component);

Rectangle.propTypes = {
  text: _propTypes2.default.any,
  textColor: _propTypes2.default.string,
  stroke: _propTypes2.default.string,
  rx: _propTypes2.default.number,
  ry: _propTypes2.default.number,
  strokeWidth: _propTypes2.default.number,
  fillOpacity: _propTypes2.default.number,
  size: _propTypes2.default.number,
  value: _propTypes2.default.number,
  fontSize: _propTypes2.default.number,
  fill: _propTypes2.default.string,
  metrics: _propTypes2.default.string,
  position: _propTypes2.default.string,
  location: _propTypes2.default.string,
};

Rectangle.defaultProps = {
  fill: '',
  stroke: '#0000ff',
  textColor: '#0000ff',
  text: '',
  strokeWidth: 1,
  fillOpacity: 0.7,
  rx: 0,
  ry: 0,
  width: 60,
  height: 30,
  value: 169,
  fontSize: 12,
  metrics: 'high',
  position: 'bottom',
  location: 'topRight',
};

exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map

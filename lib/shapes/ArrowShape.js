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

var ArrowShape = (function (_Component) {
  _inherits(ArrowShape, _Component);

  function ArrowShape(props) {
    _classCallCheck(this, ArrowShape);

    var _this = _possibleConstructorReturn(
      this,
      (ArrowShape.__proto__ || Object.getPrototypeOf(ArrowShape)).call(
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

  _createClass(ArrowShape, [
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
        var fullData = moreProps.fullData;
        var xScale = moreProps.xScale,
          yScale = moreProps.chartConfig.yScale,
          xAccessor = moreProps.xAccessor;

        var stroke = this.props.stroke;
        var fill = this.props.fill;
        var metrics = this.props.metrics;
        var position = this.props.position;
        var location = this.props.location;
        var value = this.props.value;
        var fillOpacity = fill.length ? this.props.fillOpacity : 0.1;
        var size = this.props.size;
        var shapesList = this.props.shapesList;
        var index = this.props.index;
        var arrowType = this.props.arrowType;
        var setShapesList = this.props.setShapesList;
        var rotate = this.props.rotate;
        var strokeWidth = this.props.strokeWidth;

        var cx = 0;
        var cy = 0;

        if (position === 'fixed') {
          let pos = utils.getPosision(
            index,
            shapesList,
            moreProps,
            location,
            size,
            size,
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
          cy = yScale(selectedCandle.high);
          if (position === 'bottom') {
            cy = yScale(selectedCandle.low);
          }
        }

        size = size + 24;

        var per7 = size * 0.6;
        var per7D = per7 / 2;
        var arrowWidth = size - size * 0.6;
        var tailWidth = arrowWidth / 2;

        if (shapesList[index].cx !== cx || shapesList[index].cy !== cy) {
          shapesList[index].cx = cx;
          shapesList[index].cy = cy;
          setShapesList([...shapesList]);
        }

        var p1 = `${cx + tailWidth / 2},${cy + size}`,
          p2 = `${cx + tailWidth / 2},${cy + arrowWidth / 2}`,
          p3 = `${cx + per7D},${cy + arrowWidth / 2}`,
          p4 = `${cx},${cy}`,
          p5 = `${cx - per7D},${cy + arrowWidth / 2}`,
          p6 = `${cx - tailWidth / 2},${cy + arrowWidth / 2}`,
          p7 = `${cx - tailWidth / 2},${cy + size}`;

        var points = `${p1} ${p2} ${p3} ${p4} ${p5} ${p6} ${p7}`;

        var x1 = cx,
          y1 = cy - size,
          x2 = cx,
          y2 = cy;

        if (arrowType === 'up') {
          x1 = cx;
          y1 = cy;
          x2 = cx;
          y2 = cy - size;
        }

        return _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement(
            'defs',
            null,
            _react2.default.createElement(
              'marker',
              {
                id: 'shappeArrowhead',
                markerWidth: '24',
                markerHeight: '24',
                refX: 12,
                refY: 12,
                orient: 'auto',
                fill: stroke,
              },
              _react2.default.createElement('path', {
                d: 'M7 5.37a1 1 0 0 0-1.61 1.26L9.71 12l-4.48 5.36a1 1 0 0 0 .13 1.41A1 1 0 0 0 6 19a1 1 0 0 0 .77-.36l5-6a1 1 0 0 0 0-1.27z',
                fill: stroke,
                stroke: stroke
              }),
            ),
          ),
          _react2.default.createElement('line', {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            stroke,
            strokeWidth: strokeWidth,
            strokeOpacity: 1,
            markerEnd: 'url(#shappeArrowhead)',
            transform: `rotate(${rotate || 0} ${x2} ${y2})`,
          }),
        );

        // return _react2.default.createElement(
        //   'g',
        //   {},
        //   _react2.default.createElement('polygon', {
        //     points,
        //     stroke: stroke,
        //     fill: fill,
        //     fillOpacity,
        //     transform: `rotate(${arrowType === 'up' ? 0 : 180} ${cx} ${cy})`,
        //   }),
        // );
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

  return ArrowShape;
})(_react.Component);

ArrowShape.propTypes = {
  text: _propTypes2.default.string,
  textColor: _propTypes2.default.string,
  stroke: _propTypes2.default.string,
  rx: _propTypes2.default.number,
  ry: _propTypes2.default.number,
  strokeWidth: _propTypes2.default.number,
  fillOpacity: _propTypes2.default.number,
  size: _propTypes2.default.number,
  fontSize: _propTypes2.default.number,
  fill: _propTypes2.default.string,
  metrics: _propTypes2.default.string,
  position: _propTypes2.default.string,
  location: _propTypes2.default.string,
};

ArrowShape.defaultProps = {
  fill: '',
  stroke: '#0000ff',
  textColor: '#0000ff',
  text: '',
  strokeWidth: 1,
  fillOpacity: 0.7,
  rx: 0,
  ry: 0,
  size: 60,
  fontSize: 12,
  metrics: 'high',
  position: 'bottom',
  location: 'topRight',
};

exports.default = ArrowShape;
//# sourceMappingURL=ArrowShape.js.map

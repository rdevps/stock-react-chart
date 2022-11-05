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

var Label = (function (_Component) {
  _inherits(Label, _Component);

  function Label(props) {
    _classCallCheck(this, Label);

    var _this = _possibleConstructorReturn(
      this,
      (Label.__proto__ || Object.getPrototypeOf(Label)).call(this, props),
    );

    _this.renderSVG = _this.renderSVG.bind(_this);
    _this.drawOnCanvas = _this.drawOnCanvas.bind(_this);

    _this.saveNodeType = _utils2.saveNodeType.bind(_this);
    _this.isHover = _this.isHover.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.nodes = {};

    _this.state = {
      hover: false,
    };
    return _this;
  }

  _createClass(Label, [
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

        var width = this.props.width;
        var height = this.props.height;
        var metrics = this.props.metrics;
        var position = this.props.position;
        var value = this.props.value;
        var textColor = this.props.textColor;
        var text = this.props.text;
        var fontSize = this.props.fontSize;
        var location = this.props.location;
        var shapesList = this.props.shapesList;
        var fill = this.props.fill;
        var fillOpacity = this.props.fillOpacity;
        var borderRadious = this.props.borderRadious;
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
            30,
            1,
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
        if (shapesList[index].cx !== cx || shapesList[index].cy !== cy) {
          shapesList[index].cx = cx;
          shapesList[index].cy = cy;
          setShapesList([...shapesList]);
        }
        if (document.getElementById('firstSVG')) {
          document.getElementById('firstSVG').addEventListener(
            'click',
            function (event) {
              alert(1);
            },
            false,
          );
        }

        let linkSvg = null;
        const urlify = (string) => {
          if (urlRegex.test(text)) {
            string.replace(urlRegex, (url) => {
              linkSvg = _react2.default.createElement(
                'a',
                {
                  href: url,
                  id: 'firstSVG',
                  cursor: 'pointer',
                },
                _react2.default.createElement(
                  'foreignObject',
                  {
                    textAnchor: 'middle',
                    alignmentBaseline: 'central',
                    letterSpacing: '1.5',
                    fontSize,
                    width,
                    height,
                    x: cx,
                    y: cy,
                    color: textColor,
                    id: `foreignObjectClass_${index}`
                  },
                  `${string}`,
                ),
              );
            });
          } else {
            linkSvg = _react2.default.createElement(
              'foreignObject',
              {
                textAnchor: 'middle',
                alignmentBaseline: 'central',
                letterSpacing: '1.5',
                fontSize,
                width,
                height,
                x: cx,
                y: cy,
                color: textColor,
                cursor: 'pointer',
                id: `foreignObjectClass_${index}`
              },
              string,
            );
          }
        };
        urlify(text);

        // console.log('foreignObjectClass_', document.getElementById(`foreignObjectClass_${index}`))
        // if (document.getElementById(`foreignObjectClass_${index}`)) {
        //   var bbox = document.getElementById(`foreignObjectClass_${index}`)
        //   width = bbox.width;
        //   height = bbox.height;
        // }

        return _react2.default.createElement(
          'g',
          { cursor: 'pointer', className: 'script-svg-shapes' },
          fill &&
          _react2.default.createElement('rect', {
            width,
            height,
            x: parseInt(cx),
            y: parseInt(cy),
            fill,
            fillOpacity,
            rx: borderRadious,
            ry: borderRadious,
          }),
          linkSvg,
        );
      },
    },
    {
      key: 'isHover',
      value: function isHover(moreProps) {
        var _props = this.props,
          width = _props.width,
          height = _props.height,
          cy = _props.cy,
          cx = _props.cx;
        var mouseXY = moreProps.mouseXY;

        let line1 = {
          x1: cx,
          y1: cy,
          x2: cx + width,
          y2: cy,
        };
        let line2 = {
          x1: cx,
          y1: cy + height,
          x2: line1.x2,
          y2: cy + height,
        };
        var isInside = false;
        if (
          line1.x1 < mouseXY[0] &&
          line2.x2 > mouseXY[0] &&
          line2.y2 > mouseXY[1] &&
          line1.y1 < mouseXY[1]
        ) {
          isInside = true;
        }
        return isInside;
      },
    },
    {
      key: 'onClick',
      value: function onClick(moreProps) {
        var _props = this.props;
        var text = _props.text;
        if (moreProps.hovering && urlRegex.test(text)) {
          text.replace(urlRegex, (url) => {
            _props.openMessageUrl(url);
          });
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

          canvasDraw: this.drawOnCanvas,
          canvasToDraw: _GenericComponent.getMouseCanvas,

          drawOn: ['mousemove', 'pan', 'drag', 'click'],
        });
      },
    },
  ]);

  return Label;
})(_react.Component);

Label.propTypes = {
  text: _propTypes2.default.any,
  textColor: _propTypes2.default.any,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  value: _propTypes2.default.number,
  fontSize: _propTypes2.default.number,
  borderRadious: _propTypes2.default.number,
  fillOpacity: _propTypes2.default.number,
  metrics: _propTypes2.default.string,
  position: _propTypes2.default.string,
  location: _propTypes2.default.string,
};

Label.defaultProps = {
  fillOpacity: 1,
  fill: null,
  textColor: '#0000ff',
  width: 100,
  height: 50,
  text: '',
  fontSize: 12,
  borderRadious: 12,
  value: 169,
  metrics: 'high',
  position: 'bottom',
  location: 'topRight',
};

exports.default = Label;
//# sourceMappingURL=Label.js.map

"use strict";

Object.defineProperty(exports, "__esModule", {
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
        if (!_n && _i["return"]) _i["return"]();
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
        "Invalid attempt to destructure non-iterable instance"
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
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _utils = require("../../utils");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
      typeof superClass
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

var ClickableCallOut = (function (_Component) {
  _inherits(ClickableCallOut, _Component);

  function ClickableCallOut(props) {
    _classCallCheck(this, ClickableCallOut);

    var _this = _possibleConstructorReturn(
      this,
      (
        ClickableCallOut.__proto__ || Object.getPrototypeOf(ClickableCallOut)
      ).call(this, props)
    );

    _this.saveNode = _this.saveNode.bind(_this);
    _this.renderSVG = _this.renderSVG.bind(_this);
    _this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
    _this.isHover = _this.isHover.bind(_this);
    return _this;
  }

  _createClass(ClickableCallOut, [
    {
      key: "saveNode",
      value: function saveNode(node) {
        this.node = node;
      },
    },
    {
      key: "isHover",
      value: function isHover(moreProps) {
        var mouseXY = moreProps.mouseXY;
        // const { r } = this.props;

        var r = this.props.r + 7;

        var _helper = helper(this.props, moreProps),
          _helper2 = _slicedToArray(_helper, 2),
          x = _helper2[0],
          y = _helper2[1];

        var _mouseXY = _slicedToArray(mouseXY, 2),
          mx = _mouseXY[0],
          my = _mouseXY[1];

        var hover = x - r < mx && mx < x + r && y - r < my && my < y + r;

        return hover;
      },
    },
    {
      key: "drawOnCanvas",
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
      key: "renderSVG",
      value: function renderSVG(moreProps) {
        var _props3 = this.props,
          x1Value = _props3.x1Value,
          y1Value = _props3.y1Value,
          x2Value = _props3.x2Value,
          y2Value = _props3.y2Value,
          stroke = _props3.stroke,
          strokeWidth = _props3.strokeWidth,
          fill = _props3.fill;
        var _props4 = this.props,
          fillOpacity = _props4.fillOpacity,
          strokeOpacity = _props4.strokeOpacity;
        var r = this.props.r;

        var _helper5 = helper(this.props, moreProps),
          _helper6 = _slicedToArray(_helper5, 2),
          x = _helper6[0],
          y = _helper6[1],
          x1 = _helper6[2],
          y1 = _helper6[3],
          x2 = _helper6[4],
          y2 = _helper6[5];

        var x3 = x2 - x1;
        var y3 = y2 - y1;
        var x2New = x3 < 100 && x3 > -100 ? x2 - 10 : x2;
        var y2New = y2 + 10;
        var x3New = x3 < 100 && x3 > -100 ? x2 + 10 : x2;
        var y3New = y2 - 10;

        return _react2.default.createElement("polygon", {
          points: `${x1},${y1} ${x2New},${y2New} ${x3New},${y3New}`,
          strokeOpacity: strokeOpacity,
          fill: fill,
          fillOpacity: fillOpacity,
        });
      },
    },
    {
      key: "render",
      value: function render() {
        var interactiveCursorClass = this.props.interactiveCursorClass;
        var show = this.props.show;
        var _props5 = this.props,
          onDragStart = _props5.onDragStart,
          onDrag = _props5.onDrag,
          onDoubleClickWhenHover = _props5.onDoubleClickWhenHover,
          onDragComplete = _props5.onDragComplete;

        return _react2.default.createElement(_GenericChartComponent2.default, {
          ref: this.saveNode,
          interactiveCursorClass: interactiveCursorClass,
          selected: true,
          isHover: this.isHover,

          onDragStart: onDragStart,
          onDrag: onDrag,
          onDoubleClickWhenHover: onDoubleClickWhenHover,
          onDragComplete: onDragComplete,

          svgDraw: this.renderSVG,

          canvasDraw: this.drawOnCanvas,
          canvasToDraw: _GenericComponent.getMouseCanvas,

          drawOn: ["pan", "mousemove", "drag"],
        });
      },
    },
  ]);

  return ClickableCallOut;
})(_react.Component);

function helper(props, moreProps) {
  var xyProvider = props.xyProvider,
    cx = props.cx,
    cy = props.cy,
    x1Value = props.x1Value,
    y1Value = props.y1Value,
    x2Value = props.x2Value,
    y2Value = props.y2Value;

  if ((0, _utils.isDefined)(xyProvider)) {
    return xyProvider(moreProps);
  }

  var xScale = moreProps.xScale,
    yScale = moreProps.chartConfig.yScale;

  var x = xScale(cx);
  var y = yScale(cy);
  var x1Value = xScale(x1Value);
  var y1Value = yScale(y1Value);
  var x2Value = xScale(x2Value);
  var y2Value = yScale(y2Value);
  return [x, y, x1Value, y1Value, x2Value, y2Value];
}
ClickableCallOut.propTypes = {
  xyProvider: _propTypes2.default.func,

  onDragStart: _propTypes2.default.func.isRequired,
  onDrag: _propTypes2.default.func.isRequired,
  onDragComplete: _propTypes2.default.func.isRequired,
  strokeWidth: _propTypes2.default.number.isRequired,
  stroke: _propTypes2.default.string,
  fill: _propTypes2.default.string.isRequired,
  r: _propTypes2.default.number.isRequired,

  cx: _propTypes2.default.number,
  cy: _propTypes2.default.number,

  className: _propTypes2.default.string.isRequired,
  show: _propTypes2.default.bool.isRequired,
  strokeOpacity: _propTypes2.default.number.isRequired,
  fillOpacity: _propTypes2.default.number.isRequired,
  interactiveCursorClass: _propTypes2.default.string,
};

ClickableCallOut.defaultProps = {
  className: "react-stockcharts-interactive-line-edge",
  onDragStart: _utils.noop,
  onDrag: _utils.noop,
  onDragComplete: _utils.noop,
  onMove: _utils.noop,
  show: false,
  fillOpacity: 1,
  strokeOpacity: 1,
};

exports.default = ClickableCallOut;
//# sourceMappingURL=ClickableCallOut.js.map

define(["exports", "fable-core", "./Svg", "./Diagram"], function (exports, _fableCore, _Svg, _Diagram) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RenderState = exports.Position = exports.TextMargin = exports.LifeHeaderHeight = exports.LifeHeaderWidth = exports.LifelineStep = exports.ActivationWidth = exports.StepSize = undefined;
  exports.arrow = arrow;
  exports.renderSvg = renderSvg;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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
  }();

  var StepSize = exports.StepSize = 12;
  var ActivationWidth = exports.ActivationWidth = 12;
  var LifelineStep = exports.LifelineStep = 120;
  var LifeHeaderWidth = exports.LifeHeaderWidth = 85;
  var LifeHeaderHeight = exports.LifeHeaderHeight = 30;
  var TextMargin = exports.TextMargin = 4;

  var Position = exports.Position = function () {
    function Position(x, y) {
      _classCallCheck(this, Position);

      this.X = x;
      this.Y = y;
    }

    _createClass(Position, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsRecords(this, other);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return _fableCore.Util.compareRecords(this, other);
      }
    }]);

    return Position;
  }();

  _fableCore.Util.setInterfaces(Position.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Render.Position");

  var RenderState = exports.RenderState = function () {
    function RenderState(list, lifeLineX, lifeLineCount, map) {
      _classCallCheck(this, RenderState);

      this.List = list;
      this.LifeLineX = lifeLineX;
      this.LifeLineCount = lifeLineCount;
      this.Map = map;
    }

    _createClass(RenderState, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsRecords(this, other);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return _fableCore.Util.compareRecords(this, other);
      }
    }]);

    return RenderState;
  }();

  _fableCore.Util.setInterfaces(RenderState.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Render.RenderState");

  function renderLifeLine(lifeLine, state) {
    var x = 85 / 2 + state.LifeLineX + 1;
    var line = new _Svg.Element("Line", [x - 85 / 2, 30, x + 85 / 2, 30, "header"]);
    var state_1 = new RenderState(_fableCore.List.ofArray([line], state.List), state.LifeLineX, state.LifeLineCount, state.Map);
    var text = new _Svg.Element("Text", [x, 30 / 2 + (state_1.LifeLineCount % 2 === 0 ? 5 : -5), lifeLine.Text, "header"]);
    var state_2 = new RenderState(_fableCore.List.ofArray([text], state_1.List), state_1.LifeLineX, state_1.LifeLineCount, state_1.Map);
    var y1 = 30;
    var y2 = 30 + lifeLine.Size * 12;
    var line_1 = new _Svg.Element("Line", [x, y1, x, y2, "lifeline"]);
    var LifeLineX = state_2.LifeLineX + 120 + (lifeLine.Depth - 1) * (12 * 0.5);
    var LifeLineCount = state_2.LifeLineCount + 1;
    return new RenderState(_fableCore.List.ofArray([line_1], state_2.List), LifeLineX, LifeLineCount, _fableCore.Map.add(new _Diagram.VisualElement("LifeLine", [lifeLine]), new Position(x, y1), state_2.Map));
  }

  function renderActivation(activation, state) {
    var matchValue = activation.From.Object;

    if (matchValue.Case === "Activation") {
      var pos = _fableCore.Map.find(activation.From.Object, state.Map);

      var x = pos.X + 12 / 2;
      var y = pos.Y + activation.From.Position * 12;
      var width = 12;
      var height = pos.Y + activation.To.Position * 12 - y;

      var _Map = _fableCore.Map.add(new _Diagram.VisualElement("Activation", [activation]), new Position(x, y), state.Map);

      return new RenderState(_fableCore.List.ofArray([new _Svg.Element("Rect", [x, y, width, height, activation.Name, "activity"])], state.List), state.LifeLineX, state.LifeLineCount, _Map);
    } else {
      if (matchValue.Case === "Message") {
        return state;
      } else {
        var _pos = _fableCore.Map.find(activation.From.Object, state.Map);

        var _x = _pos.X - 12 / 2;

        var _y = _pos.Y + activation.From.Position * 12;

        var _width = 12;

        var _height = _pos.Y + activation.To.Position * 12 - _y;

        var _Map2 = _fableCore.Map.add(new _Diagram.VisualElement("Activation", [activation]), new Position(_x, _y), state.Map);

        return new RenderState(_fableCore.List.ofArray([new _Svg.Element("Rect", [_x, _y, _width, _height, activation.Name, "activity"])], state.List), state.LifeLineX, state.LifeLineCount, _Map2);
      }
    }
  }

  function arrow(x1, y1, x2, y2, cls) {
    var line1 = new _Svg.Element("Line", [x1, y1, x2, y2, cls]);

    if (x1 < x2) {
      var line2 = new _Svg.Element("Line", [x2, y2, x2 - 5, y2 - 2, cls]);
      var line3 = new _Svg.Element("Line", [x2, y2, x2 - 5, y2 + 2, cls]);
      return _fableCore.List.ofArray([line1, line2, line3]);
    } else {
      var _line = new _Svg.Element("Line", [x2, y2, x2 + 5, y2 - 2, cls]);

      var _line2 = new _Svg.Element("Line", [x2, y2, x2 + 5, y2 + 2, cls]);

      return _fableCore.List.ofArray([line1, _line, _line2]);
    }
  }

  function activationNestingLevel(el, level) {
    return el.Case === "Activation" ? activationNestingLevel(el.Fields[0].From.Object, level + 1) : level;
  }

  function renderMessage(message, state) {
    var from = _fableCore.Map.find(message.From.Object, state.Map);

    var tom = _fableCore.Map.find(message.To.Object, state.Map);

    var fromy = from.Y + message.From.Position * 12;
    var toy = tom.Y + message.To.Position * 12;

    if (fromy === toy) {
      if (from.X < tom.X) {
        var arrow_1 = arrow(from.X + 12, fromy, tom.X, toy, "message");
        var text = new _Svg.Element("Text", [from.X + 12 * 1.5, fromy - 4, message.Text, "message"]);
        return new RenderState(_fableCore.List.append(_fableCore.List.ofArray([text], arrow_1), state.List), state.LifeLineX, state.LifeLineCount, state.Map);
      } else {
        var _arrow_ = arrow(from.X, fromy, tom.X + 12, toy, "message");

        var nesting = activationNestingLevel(message.From.Object, 0);

        var _text = new _Svg.Element("Text", [from.X - 12 * nesting * 0.5, fromy - 4, message.Text, "message_right"]);

        return new RenderState(_fableCore.List.append(_fableCore.List.ofArray([_text], _arrow_), state.List), state.LifeLineX, state.LifeLineCount, state.Map);
      }
    } else {
      if (from.X < tom.X) {
        var fromx = from.X + 12;
        var tox = tom.X + 12;
        var line1 = new _Svg.Element("Line", [fromx, fromy, fromx + 12 * 2, fromy, "message"]);
        var line2 = new _Svg.Element("Line", [fromx + 12 * 2, fromy, fromx + 12 * 2, toy, "message"]);

        var _arrow_2 = arrow(fromx + 12 * 2, toy, tox, toy, "message");

        var _text2 = new _Svg.Element("Text", [fromx + 12 / 2, toy - 4, message.Text, "message"]);

        return new RenderState(_fableCore.List.append(_fableCore.List.ofArray([line1, line2, _text2], _arrow_2), state.List), state.LifeLineX, state.LifeLineCount, state.Map);
      } else {
        var _line3 = new _Svg.Element("Line", [from.X, fromy, tom.X, toy, "message"]);

        return new RenderState(_fableCore.List.ofArray([_line3], state.List), state.LifeLineX, state.LifeLineCount, state.Map);
      }
    }
  }

  function renderElement(el, state) {
    return el.Case === "Message" ? renderMessage(el.Fields[0], state) : el.Case === "Activation" ? renderActivation(el.Fields[0], state) : renderLifeLine(el.Fields[0], state);
  }

  function render(input, state) {
    return input.tail == null ? state : render(input.tail, renderElement(input.head, state));
  }

  function renderSvg(input) {
    var state = render(input, function () {
      var LifeLineX = 0;
      var LifeLineCount = 0;

      var _Map = _fableCore.Map.create(null, new _fableCore.GenericComparer(function (x, y) {
        return x.CompareTo(y);
      }));

      return new RenderState(new _fableCore.List(), LifeLineX, LifeLineCount, _Map);
    }());

    var styles = _fableCore.List.ofArray(["rect { fill:#eeeeee; fill-opacity:1; stroke-width:1; stroke:gray }", "rect:hover { fill:#dddddd; }", "line { stroke: black; }", "text { font-family: consolas; font-size: 7.5pt; }", "text.message_right { text-anchor: end; }", "text.header { text-anchor: middle; }", "line.lifeline { stroke: lightgray; }", "line.message { stroke: green; }"]);

    return [state.List, styles];
  }
});
define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Element = undefined;
  exports.getSize = getSize;
  exports.svgToText = svgToText;

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

  var _Element = function () {
    function _Element(caseName, fields) {
      _classCallCheck(this, _Element);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(_Element, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsUnions(this, other);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return _fableCore.Util.compareUnions(this, other);
      }
    }]);

    return _Element;
  }();

  exports.Element = _Element;

  _fableCore.Util.setInterfaces(_Element.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Svg.Element");

  function make(el) {
    return el.Case === "Line" ? _fableCore.String.fsFormat("<line x1='%f' y1='%f' x2='%f' y2='%f' class='%s' />")(function (x) {
      return x;
    })(el.Fields[0])(el.Fields[1])(el.Fields[2])(el.Fields[3])(el.Fields[4]) : el.Case === "Text" ? _fableCore.String.fsFormat("<text x='%f' y='%f' class='%s'>%s</text>")(function (x) {
      return x;
    })(el.Fields[0])(el.Fields[1])(el.Fields[3])(el.Fields[2]) : _fableCore.String.fsFormat("<rect x='%f' y='%f' width='%f' height='%f' class='%s'><title>%s</title></rect>")(function (x) {
      return x;
    })(el.Fields[0])(el.Fields[1])(el.Fields[2])(el.Fields[3])(el.Fields[5])(el.Fields[4]);
  }

  function svgToList(input, output) {
    return input.tail == null ? output : svgToList(input.tail, _fableCore.List.ofArray([make(input.head)], output));
  }

  function getSize(input, maxx, maxy) {
    return input.tail == null ? [maxx, maxy] : function () {
      var patternInput = input.head.Case === "Line" ? [input.head.Fields[2], input.head.Fields[3]] : input.head.Case === "Text" ? [input.head.Fields[0], input.head.Fields[1]] : [input.head.Fields[0] + input.head.Fields[2], input.head.Fields[1] + input.head.Fields[3]];
      var maxx_1 = patternInput[0] > maxx ? patternInput[0] : maxx;
      var maxy_1 = patternInput[1] > maxy ? patternInput[1] : maxy;
      return getSize(input.tail, maxx_1, maxy_1);
    }();
  }

  function svgToText(input, styles) {
    var output = svgToList(input, new _fableCore.List());
    var patternInput = getSize(input, 0, 0);
    return _fableCore.String.fsFormat("<svg xmlns='http://www.w3.org/2000/svg' width='%f' height='%f'><style>%s</style>%s</svg>")(function (x) {
      return x;
    })(patternInput[0] + 100)(patternInput[1] + 10)(_fableCore.String.join(" ", styles))(_fableCore.String.join("\n", output));
  }
});
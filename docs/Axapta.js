define(["exports", "fable-core", "./Utils"], function (exports, _fableCore, _Utils) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AxCallstackItem = exports.Slash = undefined;
  exports.parseAxCallstack = parseAxCallstack;

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

  var Slash = exports.Slash = "\\";

  var AxCallstackItem = exports.AxCallstackItem = function () {
    function AxCallstackItem(objectName, methodName, line) {
      _classCallCheck(this, AxCallstackItem);

      this.ObjectName = objectName;
      this.MethodName = methodName;
      this.Line = line;
    }

    _createClass(AxCallstackItem, [{
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

    return AxCallstackItem;
  }();

  _fableCore.Util.setInterfaces(AxCallstackItem.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Axapta.AxCallstackItem");

  function createItem(path, linestr) {
    var line = Number.parseInt(linestr);
    var n1 = path.lastIndexOf("\\");
    var n2 = path.lastIndexOf("\\", n1 - 1);
    var tmp1 = path.substr(n2 + 1, n1 - n2 - 1);
    var objectName = tmp1 === "Methods" ? function () {
      var n3 = path.lastIndexOf("\\", n2 - 1);
      return path.substr(n3 + 1, n2 - n3 - 1);
    }() : tmp1;
    var methodName = path.substr(n1 + 1, path.length - n1 - 1);
    return new AxCallstackItem(objectName, methodName, line);
  }

  function parse(items) {
    var regex = function regex(s) {
      var activePatternResult96 = (0, _Utils.$Regex$_$)("^\\[[sc]\\]\\s+(.*?)\\s+(\\d+)$", s);

      if (activePatternResult96 != null) {
        var a = activePatternResult96;
        return createItem(a[1], a[2]);
      }
    };

    return function (list) {
      return _fableCore.List.choose(regex, list);
    }(items);
  }

  function parseAxCallstack(text) {
    var comments = function comments(a) {
      return a.indexOf("--") === 0;
    };

    return function (list) {
      return _fableCore.List.map(function (items) {
        return parse(items);
      }, list);
    }(_fableCore.Seq.toList((0, _Utils.splitBy)(function (arg00) {
      return _fableCore.String.isNullOrEmpty(arg00);
    }, _fableCore.List.ofArray((0, _Utils.splitStr)("\n", text).filter(function ($var2) {
      return function (value) {
        return !value;
      }(comments($var2));
    })))));
  }
});
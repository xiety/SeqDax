define(["exports", "fable-core", "./Axapta"], function (exports, _fableCore, _Axapta) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CallstackItem = exports.RootObjectName = undefined;
  exports.convertAxCallstack = convertAxCallstack;

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

  var RootObjectName = exports.RootObjectName = "User";

  var CallstackItem = exports.CallstackItem = function () {
    function CallstackItem(objectName, methodName, line, children) {
      _classCallCheck(this, CallstackItem);

      this.ObjectName = objectName;
      this.MethodName = methodName;
      this.Line = line;
      this.Children = children;
    }

    _createClass(CallstackItem, [{
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

    return CallstackItem;
  }();

  _fableCore.Util.setInterfaces(CallstackItem.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Debug.CallstackItem");

  function reverse(root, ax) {
    var mapLine = function mapLine(a) {
      return _fableCore.List.map(function (a_1) {
        var inputRecord = a_1[1];
        var Line = a_1[0].Line;
        return new _Axapta.AxCallstackItem(inputRecord.ObjectName, inputRecord.MethodName, Line);
      }, _fableCore.Seq.toList(_fableCore.Seq.pairwise(_fableCore.List.ofArray([root, root], _fableCore.List.reverse(a)))));
    };

    return _fableCore.List.map(mapLine, ax);
  }

  function nextLayer(curstack, ax) {
    var curlen = curstack.length;
    return _fableCore.Seq.toList(_fableCore.Seq.sortWith(function (x, y) {
      return _fableCore.Util.compare(function (a) {
        return _fableCore.Seq.last(a).Line;
      }(x), function (a) {
        return _fableCore.Seq.last(a).Line;
      }(y));
    }, _fableCore.Seq.toList(_fableCore.Seq.distinct(_fableCore.List.map(function () {
      var count = curlen + 1;
      return function (list) {
        return _fableCore.Seq.toList(_fableCore.Seq.take(count, list));
      };
    }(), _fableCore.List.filter(function (a) {
      return a.length > curlen ? _fableCore.Seq.forAll2(function (x, y) {
        return x.Equals(y);
      }, _fableCore.Seq.toList(_fableCore.Seq.take(curlen, a)), curstack) : false;
    }, ax))))));
  }

  function convert(curstack, curitem, level, ax) {
    var children = _fableCore.List.map(function (a) {
      return convert(a, _fableCore.Seq.last(a), level + 1, ax);
    }, function (ax_1) {
      return nextLayer(curstack, ax_1);
    }(ax));

    return new CallstackItem(curitem.ObjectName, curitem.MethodName, curitem.Line, children);
  }

  function convertAxCallstack(ax) {
    var root = new _Axapta.AxCallstackItem("User", "Do", 0);
    return function () {
      var curstack = _fableCore.List.ofArray([root]);

      var level = 0;
      return function (ax_1) {
        return convert(curstack, root, level, ax_1);
      };
    }()(function (ax_1) {
      return reverse(root, ax_1);
    }(ax));
  }
});
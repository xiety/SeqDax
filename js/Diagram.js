define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SelfCallSize = exports.VisualElement = exports.VisualMessage = exports.VisualActivation = exports.VisualConnection = exports.VisualLifeLine = undefined;
  exports.lifeLineForActivation = lifeLineForActivation;
  exports.lifeLineForConnection = lifeLineForConnection;
  exports.drawDiagram = drawDiagram;

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

  var VisualLifeLine = exports.VisualLifeLine = function () {
    function VisualLifeLine(text, size, depth) {
      _classCallCheck(this, VisualLifeLine);

      this.Text = text;
      this.Size = size;
      this.Depth = depth;
    }

    _createClass(VisualLifeLine, [{
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

    return VisualLifeLine;
  }();

  _fableCore.Util.setInterfaces(VisualLifeLine.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Diagram.VisualLifeLine");

  var VisualConnection = exports.VisualConnection = function () {
    function VisualConnection(object, position) {
      _classCallCheck(this, VisualConnection);

      this.Object = object;
      this.Position = position;
    }

    _createClass(VisualConnection, [{
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

    return VisualConnection;
  }();

  _fableCore.Util.setInterfaces(VisualConnection.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Diagram.VisualConnection");

  var VisualActivation = exports.VisualActivation = function () {
    function VisualActivation(from, to, name) {
      _classCallCheck(this, VisualActivation);

      this.From = from;
      this.To = to;
      this.Name = name;
    }

    _createClass(VisualActivation, [{
      key: "Equals",
      value: function Equals(other) {
        return _fableCore.Util.equalsRecords(this, other);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return _fableCore.Util.compareRecords(this, other);
      }
    }, {
      key: "Size",
      get: function get() {
        return Math.abs(this.To.Position - this.From.Position);
      }
    }]);

    return VisualActivation;
  }();

  _fableCore.Util.setInterfaces(VisualActivation.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Diagram.VisualActivation");

  var VisualMessage = exports.VisualMessage = function () {
    function VisualMessage(text, line, depth, from, to) {
      _classCallCheck(this, VisualMessage);

      this.Text = text;
      this.Line = line;
      this.Depth = depth;
      this.From = from;
      this.To = to;
    }

    _createClass(VisualMessage, [{
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

    return VisualMessage;
  }();

  _fableCore.Util.setInterfaces(VisualMessage.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Diagram.VisualMessage");

  var VisualElement = exports.VisualElement = function () {
    function VisualElement(caseName, fields) {
      _classCallCheck(this, VisualElement);

      this.Case = caseName;
      this.Fields = fields;
    }

    _createClass(VisualElement, [{
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

    return VisualElement;
  }();

  _fableCore.Util.setInterfaces(VisualElement.prototype, ["FSharpUnion", "System.IEquatable", "System.IComparable"], "Diagram.VisualElement");

  var VisualCallstackItem = function () {
    function VisualCallstackItem(activation, callstackItem, height) {
      _classCallCheck(this, VisualCallstackItem);

      this.Activation = activation;
      this.CallstackItem = callstackItem;
      this.Height = height;
    }

    _createClass(VisualCallstackItem, [{
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

    return VisualCallstackItem;
  }();

  _fableCore.Util.setInterfaces(VisualCallstackItem.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Diagram.VisualCallstackItem");

  var Options = function () {
    function Options(height, stack, item, from, isSelfCall) {
      _classCallCheck(this, Options);

      this.Height = height;
      this.Stack = stack;
      this.Item = item;
      this.From = from;
      this.IsSelfCall = isSelfCall;
    }

    _createClass(Options, [{
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

    return Options;
  }();

  _fableCore.Util.setInterfaces(Options.prototype, ["FSharpRecord", "System.IEquatable", "System.IComparable"], "Diagram.Options");

  var SelfCallSize = exports.SelfCallSize = 1;

  function lifeLineForActivation(activation) {
    var matchValue = activation.From.Object;

    if (matchValue.Case === "Activation") {
      return lifeLineForActivation(matchValue.Fields[0]);
    } else {
      if (matchValue.Case === "Message") {
        throw "error";
      } else {
        return matchValue.Fields[0];
      }
    }
  }

  function lifeLineForConnection(con) {
    return con.Object.Case === "Activation" ? lifeLineForActivation(con.Object.Fields[0]) : con.Object.Case === "Message" ? function () {
      throw "error";
    }() : con.Object.Fields[0];
  }

  function createActivation(fromObject, fromPosition, toObject, toPosition, name) {
    return new VisualActivation(new VisualConnection(fromObject, fromPosition), new VisualConnection(toObject, toPosition), name);
  }

  function getDepth(item, itemName) {
    var children = _fableCore.List.map(function (a) {
      return getDepth(a, itemName);
    }, item.Children);

    var max = children.tail == null ? 0 : _fableCore.Seq.reduce(function (x, y) {
      return Math.max(x, y);
    }, children);

    if (item.ObjectName === itemName) {
      return max + 1;
    } else {
      return max;
    }
  }

  function createLifeLine(item, size, stack) {
    var size_1 = !(stack.tail == null) ? function () {
      var act = stack.head.Activation;
      return act.To.Position - act.From.Position;
    }() : size;
    var depth = getDepth(item, item.ObjectName);
    return new VisualLifeLine(item.ObjectName, size_1, depth);
  }

  function makeActivation(list, activationSize, options) {
    return options.IsSelfCall ? options.From == null ? function () {
      throw "No 'from' for self call";
    }() : function () {
      var a = createActivation(options.From.Object, options.From.Position + 1, options.From.Object, options.From.Position + 1 + activationSize, options.Item.MethodName);
      return [a, _fableCore.List.ofArray([new VisualElement("Activation", [a])], list)];
    }() : function () {
      var pastVisualStack = _fableCore.Seq.tryFindBack(function (a) {
        return a.CallstackItem.ObjectName === options.Item.ObjectName;
      }, options.Stack);

      if (pastVisualStack == null) {
        var lifeLineOpt = _fableCore.Seq.tryFind(function (_arg1) {
          var $target1 = function $target1() {
            return false;
          };

          if (_arg1.Case === "LifeLine") {
            if (_arg1.Fields[0].Text === options.Item.ObjectName) {
              var l = _arg1.Fields[0];
              return true;
            } else {
              return $target1();
            }
          } else {
            return $target1();
          }
        }, list);

        var patternInput = lifeLineOpt != null ? [lifeLineOpt, list] : function () {
          var newlifeline = new VisualElement("LifeLine", [createLifeLine(options.Item, activationSize, options.Stack)]);
          return [newlifeline, _fableCore.List.ofArray([newlifeline], list)];
        }();
        var a = createActivation(patternInput[0], options.Height, patternInput[0], options.Height + activationSize, options.Item.MethodName);
        return [a, _fableCore.List.ofArray([new VisualElement("Activation", [a])], patternInput[1])];
      } else {
        var pastPointFrom = options.Height - pastVisualStack.Height;

        var _a = createActivation(new VisualElement("Activation", [pastVisualStack.Activation]), pastPointFrom, new VisualElement("Activation", [pastVisualStack.Activation]), pastPointFrom + activationSize, options.Item.MethodName);

        return [_a, _fableCore.List.ofArray([new VisualElement("Activation", [_a])], list)];
      }
    }();
  }

  function activationWithMessage(drawCalc, list, options) {
    var activationSize = drawCalc(0)(list)(function () {
      var IsSelfCall = false;
      return new Options(options.Height, options.Stack, options.Item, options.From, IsSelfCall);
    }()) - options.Height;
    var patternInput = makeActivation(list, activationSize, options);

    if (options.From != null) {
      var message = new VisualElement("Message", [function () {
        var To = new VisualConnection(new VisualElement("Activation", [patternInput[0]]), 0);
        return new VisualMessage(options.Item.MethodName, options.Item.Line, options.Stack.length, options.From, To);
      }()]);
      return [patternInput[0], _fableCore.List.ofArray([message], patternInput[1])];
    } else {
      return [patternInput[0], patternInput[1]];
    }
  }

  function recurseCalc(drawCalc, depth, list, options, reclist) {
    return reclist.tail != null ? function () {
      var isSelfCall = reclist.head.ObjectName === options.Item.ObjectName;
      var newheight = drawCalc(depth + 1)(list)(new Options(options.Height, options.Stack, reclist.head, options.From, isSelfCall)) + 1;
      return recurseCalc(drawCalc, depth, list, new Options(newheight, options.Stack, options.Item, options.From, options.IsSelfCall), reclist.tail);
    }() : options.Height;
  }

  function drawCalc(depth, list, options) {
    var currentHeight = options.IsSelfCall ? options.Height + 1 : options.Height;
    return recurseCalc(function (depth_1) {
      return function (list_1) {
        return function (options_1) {
          return drawCalc(depth_1, list_1, options_1);
        };
      };
    }, depth, list, new Options(currentHeight + 1, options.Stack, options.Item, options.From, options.IsSelfCall), options.Item.Children);
  }

  function recurse(draw, list, position, activation, options, reclist) {
    return reclist.tail != null ? function () {
      var isSelfCall = reclist.head.ObjectName === options.Item.ObjectName;
      var point = new VisualConnection(new VisualElement("Activation", [activation]), position);
      var patternInput = draw(list)(function () {
        var From = point;
        return new Options(options.Height, options.Stack, reclist.head, From, isSelfCall);
      }());
      return recurse(draw, patternInput[1], position + patternInput[0] - options.Height + 1, activation, new Options(patternInput[0] + 1, options.Stack, options.Item, options.From, options.IsSelfCall), reclist.tail);
    }() : [options.Height, list];
  }

  function draw(list, options) {
    var patternInput = activationWithMessage(function (depth) {
      return function (list_1) {
        return function (options_1) {
          return drawCalc(depth, list_1, options_1);
        };
      };
    }, list, options);
    var height = options.IsSelfCall ? options.Height + 1 : options.Height;

    var stack = _fableCore.List.append(options.Stack, _fableCore.List.ofArray([new VisualCallstackItem(patternInput[0], options.Item, height)]));

    return recurse(function (list_1) {
      return function (options_1) {
        return draw(list_1, options_1);
      };
    }, patternInput[1], 1, patternInput[0], new Options(height + 1, stack, options.Item, null, false), options.Item.Children);
  }

  function drawDiagram(callstack) {
    var patternInput = draw(new _fableCore.List(), new Options(1, new _fableCore.List(), callstack, null, false));
    return _fableCore.List.reverse(patternInput[1]);
  }
});
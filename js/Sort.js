define(["exports", "./Diagram", "fable-core"], function (exports, _Diagram, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.calculate = calculate;
  exports.sortDiagram = sortDiagram;

  function calculate(diagram, lifeLine) {
    var calculate_ = function calculate_(list) {
      return function (size) {
        return function (num) {
          return list.tail == null ? [size, num] : list.head.Case === "Activation" ? function () {
            var size_1 = ((0, _Diagram.lifeLineForConnection)(list.head.Fields[0].From).Text === lifeLine.Text ? size < list.head.Fields[0].Size : false) ? list.head.Fields[0].Size : size;
            return calculate_(list.tail)(size_1)(num);
          }() : list.head.Case === "LifeLine" ? calculate_(list.tail)(size)(num) : function () {
            var outbound = (0, _Diagram.lifeLineForConnection)(list.head.Fields[0].From).Text === lifeLine.Text ? 1 : 0;
            var inbound = (0, _Diagram.lifeLineForConnection)(list.head.Fields[0].To).Text === lifeLine.Text ? 1 : 0;
            return calculate_(list.tail)(size)(num + outbound + inbound);
          }();
        };
      };
    };

    return calculate_(diagram)(0)(0);
  }

  function sortDiagram(diagram) {
    var rootObjectName = _fableCore.List.choose(function (_arg1) {
      return _arg1.Case === "LifeLine" ? _arg1.Fields[0].Text : null;
    }, diagram).head;

    var infos = _fableCore.List.choose(function (_arg2) {
      return _arg2.Case === "LifeLine" ? [_arg2.Fields[0], calculate(diagram, _arg2.Fields[0])] : null;
    }, diagram);

    var sorted = _fableCore.List.map(function ($var3) {
      return new _Diagram.VisualElement("LifeLine", [$var3[0]]);
    }, _fableCore.Seq.toList(_fableCore.Seq.sortWith(function (x, y) {
      return -_fableCore.Util.compare(function (a) {
        return [a[0].Text === rootObjectName, a[1][0], a[1][1]];
      }(x), function (a) {
        return [a[0].Text === rootObjectName, a[1][0], a[1][1]];
      }(y));
    }, infos)));

    var other = _fableCore.List.choose(function (_arg3) {
      return _arg3.Case === "LifeLine" ? null : _arg3;
    }, diagram);

    return _fableCore.List.append(sorted, other);
  }
});
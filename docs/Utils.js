define(["exports", "fable-core"], function (exports, _fableCore) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.$Regex$_$ = $Regex$_$;
  exports.dump = dump;
  exports.log = log;
  exports.splitStr = splitStr;
  exports.splitBy = splitBy;

  function $Regex$_$(pattern, input) {
    var r = _fableCore.RegExp.create(pattern);

    var m = _fableCore.RegExp.match(r, input);

    if (m != null) {
      return m;
    }
  }

  function dump(t, a) {
    t(function (x) {
      console.log(x);
    });

    _fableCore.String.fsFormat("%A")(function (x) {
      console.log(x);
    })(a);

    return a;
  }

  function log(t, a) {
    t(function (x) {
      console.log(x);
    });
    return a;
  }

  function splitStr(sep, str) {
    return _fableCore.String.split(str, [sep], null, 0);
  }

  function splitBy(f, list) {
    var markBy = function markBy(list_) {
      return function (gr) {
        return _fableCore.Seq.delay(function (unitVar) {
          return list_.tail == null ? function () {
            return _fableCore.Seq.empty();
          }() : f(list_.head) ? _fableCore.Seq.append(_fableCore.Seq.singleton([list_.head, 0]), _fableCore.Seq.delay(function (unitVar_1) {
            return markBy(list_.tail)(gr + 1);
          })) : _fableCore.Seq.append(_fableCore.Seq.singleton([list_.head, gr]), _fableCore.Seq.delay(function (unitVar_1) {
            return markBy(list_.tail)(gr);
          }));
        });
      };
    };

    return _fableCore.List.map(function ($var1) {
      return _fableCore.List.map(function (tuple) {
        return tuple[0];
      }, $var1[1]);
    }, _fableCore.Seq.toList(_fableCore.Seq.sortWith(function (x, y) {
      return _fableCore.Util.compare(function (tuple) {
        return tuple[0];
      }(x), function (tuple) {
        return tuple[0];
      }(y));
    }, _fableCore.Seq.toList(_fableCore.Seq.groupBy(function (tuple) {
      return tuple[1];
    }, _fableCore.Seq.toList(markBy(list)(1)))))).tail);
  }
});
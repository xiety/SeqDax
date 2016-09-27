define(["exports", "./Svg", "fable-core", "./Utils", "./Render", "./Sort", "./Diagram", "./Debug", "./Axapta"], function (exports, _Svg, _fableCore, _Utils, _Render, _Sort, _Diagram, _Debug, _Axapta) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.convert = convert;

  function convert(input) {
    return function (tupledArg) {
      return (0, _Svg.svgToText)(tupledArg[0], tupledArg[1]);
    }(function () {
      var t = _fableCore.String.fsFormat("svgToText");

      return function (tupledArg) {
        return (0, _Utils.log)(t, [tupledArg[0], tupledArg[1]]);
      };
    }()((0, _Render.renderSvg)((0, _Utils.log)(_fableCore.String.fsFormat("renderSvg"), (0, _Sort.sortDiagram)((0, _Utils.log)(_fableCore.String.fsFormat("sortDiagram"), (0, _Diagram.drawDiagram)((0, _Utils.log)(_fableCore.String.fsFormat("drawDiagram"), (0, _Debug.convertAxCallstack)((0, _Utils.log)(_fableCore.String.fsFormat("convertAxCallstack"), (0, _Axapta.parseAxCallstack)((0, _Utils.log)(_fableCore.String.fsFormat("parseAxCallstack"), input))))))))))));
  }
});
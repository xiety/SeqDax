open Axapta
open Debug
open Diagram
open Render
open Sort
open Svg

let convert input =
    input |> log "parseAxCallstack"
          |> parseAxCallstack
          |> log "convertAxCallstack"
          |> convertAxCallstack
          |> log "drawDiagram"
          |> drawDiagram
          |> log "sortDiagram"
          |> sortDiagram
          |> log "renderSvg"
          |> renderSvg
          |> log "svgToText"
          |> svgToText

#if !FABLE
[<EntryPoint>]
let main _ = 
    let input = System.IO.File.ReadAllText("..\..\sample.txt")
    let input = input.Replace("\r\n", "\n")

    let output = convert input

    printfn "%A" output

    System.IO.File.WriteAllText("..\..\sample.svg", output)

    0 // return an integer exit code
#endif

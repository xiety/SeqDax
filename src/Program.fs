open Axapta
open Debug
open Diagram
open Render
open Sort
open Svg

let public convert input =
    input
    |> log "parseAxCallstack"
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
    let input = System.IO.File.ReadAllText("..\..\..\docs\sample.txt")
    let input = input.Replace("\r\n", "\n")

    let output = convert input

    printfn "%A" output

    System.IO.File.WriteAllText("..\..\..\docs\sample.svg", output)

    0 // return an integer exit code
#endif

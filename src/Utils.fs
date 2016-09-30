[<AutoOpen>]
module Utils

open System.Text.RegularExpressions

let (|Regex|_|) pattern input =
    let r = new Regex(pattern)
    let m = r.Match input
    if m.Success then Some m
    else None

let dump t a =
    printfn t
    printfn "%A" a
    a

let log t a =
    printfn t
    a

let splitStr (sep: string) (str: string) =
    str.Split([|sep|], System.StringSplitOptions.None)

let splitBy f list =
    let rec markBy list' gr =
        seq {
            match list' with
            | h::t -> if f h then yield (h, 0)
                                  yield! markBy t (gr + 1)
                             else yield (h, gr)
                                  yield! markBy t gr
            | [] -> ignore() }

    markBy list 1
    |> List.ofSeq
    |> List.groupBy snd
    |> List.sortBy fst
    |> List.tail
    |> List.map (snd >> List.map fst)

module Axapta

open System

type AxCallstackItem = { ObjectName: string; MethodName: string; Line: int }

let createItem (path: string) (linestr: string) =
    let line = int(linestr)

    let n1 = path.LastIndexOf(@"\")
    let n2 = path.LastIndexOf(@"\", n1 - 1)

    let tmp1 = path.Substring(n2 + 1, n1 - n2 - 1)

    let objectName = match tmp1 with
                     | "Methods" -> let n3 = path.LastIndexOf(@"\", n2 - 1)
                                    path.Substring (n3 + 1, n2 - n3 - 1)
                     | _ -> tmp1

    let methodName = path.Substring (n1 + 1, path.Length - n1 - 1)

    { ObjectName = objectName; MethodName = methodName; Line = line }

let parse items =
    let regex s = 
        match s with
        | Regex @"^\[[sc]\]\s+(.*?)\s+(\d+)$" a -> Some(createItem (a.Groups.Item(1).Value) (a.Groups.Item(2).Value))
        | _ -> None

    items |> List.choose regex

let parseAxCallstack (text: string) =
    let comments (a: string) = a.StartsWith("--")

    text.Split([|"\n"|], System.StringSplitOptions.None)
    |> Array.filter (not << comments)
    |> List.ofArray
    |> splitBy String.IsNullOrEmpty
    |> List.ofSeq
    |> List.map parse

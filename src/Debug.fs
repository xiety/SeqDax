﻿module Debug

open Axapta

[<Literal>]
let RootObjectName = "User"

type CallstackItem = { ObjectName: string; MethodName: string; Line: int; Children: CallstackItem list }

let private reverse (root: AxCallstackItem) (ax: AxCallstackItem list list) =
    let mapLine a =
        //first root will be eliminated by pairwise
        root::root::(List.rev a)
        |> List.pairwise
#if FABLE
        |> List.skip 1 //TODO: remove when pairwise fixed ISSUE#437
#endif
        |> List.map (fun a -> { (snd a) with Line = (fst a).Line } )

    ax |> List.map mapLine

let private nextLayer curstack (ax: AxCallstackItem list list) = 
    let curlen = List.length curstack

    ax
    //List.forall2 raises error on different list lengths, so use Seq instead
    |> List.filter (fun a -> List.length a > curlen && List.forall2 (=) (List.take curlen a) curstack)
    |> List.map (List.take (curlen + 1))
    |> List.distinct
    |> List.sortBy (fun a -> (List.last a).Line)

let rec private convert (curstack: AxCallstackItem list) (curitem: AxCallstackItem) level (ax: AxCallstackItem list list) =
    let children = ax
                   |> nextLayer curstack
                   |> List.map (fun a -> convert a (List.last a) (level + 1) ax)

    { CallstackItem.ObjectName = curitem.ObjectName; MethodName = curitem.MethodName; Line = curitem.Line; Children = children }

let convertAxCallstack ax =
    let root = { AxCallstackItem.ObjectName = RootObjectName; MethodName = "Do"; Line = 0 }
    ax
    |> reverse root
    |> convert [root] root 0
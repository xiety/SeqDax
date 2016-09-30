module Debug

open Axapta

[<Literal>]
let RootObjectName = "User"

type CallstackItem = { ObjectName: string; MethodName: string; Line: int; Children: CallstackItem list }

let private reverse (root: AxCallstackItem) ax =
    let mapLine a =
        //first root will be eliminated by pairwise
        root::root::(List.rev a)
        |> List.pairwise
        |> List.map (fun a -> { (snd a) with Line = (fst a).Line } )

    List.map mapLine ax

let private nextLayer curstack (ax: AxCallstackItem list list) =
    let curlen = List.length curstack

    ax
    //List.forall2 raises error on different list lengths, so use Seq instead
    |> List.filter (fun a -> List.length a > curlen && List.forall2 (=) (List.take curlen a) curstack)
    |> List.map (List.take (curlen + 1))
    |> List.distinct
    |> List.sortBy (fun a -> (List.last a).Line)

let rec private convert curstack curitem level ax =
    let children = ax
                   |> nextLayer curstack
                   |> List.map (fun a -> convert a (List.last a) (level + 1) ax)

    { ObjectName = curitem.ObjectName; MethodName = curitem.MethodName; Line = curitem.Line; Children = children }

let convertAxCallstack ax =
    let root = { AxCallstackItem.ObjectName = RootObjectName; MethodName = "Do"; Line = 0 }
    ax
    |> reverse root
    |> convert [root] root 0

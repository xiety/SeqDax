module Sort

open Diagram

let private calculate diagram (lifeLine: VisualLifeLine) =
    let rec calculate' list size num =
        match list with
        | h::t -> match h with
                  | Message m    -> let outbound = if (lifeLineForConnection m.From).Text = lifeLine.Text then 1 else 0
                                    let inbound = if (lifeLineForConnection m.To).Text = lifeLine.Text then 1 else 0
                                    calculate' t size (num + outbound + inbound)
                  | Activation a -> let size = if (lifeLineForConnection a.From).Text = lifeLine.Text && size < a.Size then a.Size else size
                                    calculate' t size num
                  | LifeLine _   -> calculate' t size num
        | []   -> (size, num)

    calculate' diagram 0 0

let sortDiagram diagram =
    let rootObjectName = diagram |> List.choose (function | LifeLine lifeLine -> Some lifeLine.Text | _ -> None) |> List.head
    let infos = diagram |> List.choose (function | LifeLine lifeLine -> Some((lifeLine, calculate diagram lifeLine)) | _ -> None)

    let sorted = infos |> List.sortByDescending (fun a -> ((fst a).Text = rootObjectName, fst (snd a), snd (snd a))) |> List.map (fst >> LifeLine)
    let other = diagram |> List.choose (function | LifeLine _ -> None | a -> Some a)
    sorted @ other

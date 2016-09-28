module Diagram

open Debug

type VisualLifeLine = { Text: string; Size: int; Depth: int }
and VisualConnection = { Object: VisualElement; Position: int }
and VisualActivation = { From: VisualConnection; To: VisualConnection; Name: string } member x.Size = abs (x.To.Position - x.From.Position)
and VisualMessage = { Text: string; Line: int; Depth: int; From: VisualConnection; To: VisualConnection }
and VisualElement = | LifeLine of VisualLifeLine | Activation of VisualActivation | Message of VisualMessage

type private VisualCallstackItem = { Activation: VisualActivation; CallstackItem: CallstackItem; Height: int }

type private Options = { Height: int; Stack: VisualCallstackItem list; Item: CallstackItem; From: VisualConnection option; IsSelfCall: bool }

[<Literal>]
let private SelfCallSize = 1

let rec public lifeLineForActivation (activation: VisualActivation) =
    match activation.From.Object with
    | LifeLine lifeLine     -> lifeLine
    | Activation activation -> lifeLineForActivation activation
    | Message _             -> failwith "error"

let public lifeLineForConnection con =
    match con.Object with
    | LifeLine lifeLine     -> lifeLine
    | Activation activation -> lifeLineForActivation activation
    | Message _             -> failwith "error"

let private createActivation fromObject fromPosition toObject toPosition name =
    { Name = name
      From = { Object = fromObject; Position = fromPosition }
      To = { Object = toObject; Position = toPosition } }

let rec private getDepth item itemName =
    let children = item.Children |> List.map (fun a -> getDepth a itemName)
    let max = if List.isEmpty children then 0 else List.max children
    
    if item.ObjectName = itemName then max + 1
    else max

let private createLifeLine item size stack =
    let size = if not (List.isEmpty stack) then let act = (List.head stack).Activation
                                                act.To.Position - act.From.Position
                                           else size

    let depth = getDepth item item.ObjectName

    { Text = item.ObjectName; Depth = depth; Size = size }

let private makeActivation list activationSize options =
    if options.IsSelfCall then
        match options.From with
        | Some from' -> let a = createActivation from'.Object (from'.Position + SelfCallSize) from'.Object (from'.Position + SelfCallSize + activationSize) options.Item.MethodName
                        (a, Activation a::list)
        | None       -> failwith "No 'from' for self call"
    else
        let pastVisualStack = options.Stack |> List.tryFindBack (fun a -> a.CallstackItem.ObjectName = options.Item.ObjectName)
        match pastVisualStack with
        | Some p -> let pastPointFrom = options.Height - p.Height;
                    let a = createActivation (Activation p.Activation) pastPointFrom (Activation p.Activation) (pastPointFrom + activationSize) options.Item.MethodName
                    (a, Activation a::list)
        | None ->   let lifeLineOpt = list |> List.tryFind (function | LifeLine l when l.Text = options.Item.ObjectName -> true | _ -> false)
                    let (lifeLine, list) = match lifeLineOpt with
                                           | Some l -> (l, list)
                                           | _ -> let newlifeline = LifeLine (createLifeLine options.Item activationSize options.Stack)
                                                  (newlifeline, newlifeline :: list)

                    let a = createActivation lifeLine options.Height lifeLine (options.Height + activationSize) options.Item.MethodName
                    (a, Activation a::list)

let private activationWithMessage drawCalc list options =
    let activationSize = (drawCalc 0 list {options with IsSelfCall = false}) - options.Height
    let (activation, list) = makeActivation list activationSize options

    match options.From with
    | Some from' -> let message = Message { From = from'
                                            To = { Object = Activation activation; Position = 0 }
                                            Text = options.Item.MethodName
                                            Line = options.Item.Line
                                            Depth = List.length options.Stack }
                    (activation, message :: list)
    | _          -> (activation, list)    

let rec private recurseCalc drawCalc depth list options reclist =
    match reclist with
    | h::t -> let isSelfCall = (h.ObjectName = options.Item.ObjectName)
              let newheight = (drawCalc (depth + 1) list { options with Item = h; IsSelfCall = isSelfCall}) + 1;
              recurseCalc drawCalc depth list { options with Height = newheight } t 
    | _    -> options.Height

let rec private drawCalc depth list options =
    let currentHeight = if options.IsSelfCall then options.Height + SelfCallSize else options.Height
    recurseCalc drawCalc depth list { options with Height = currentHeight + 1 } options.Item.Children

let rec private recurse draw list position activation options reclist =
    match reclist with
    | h::t -> let isSelfCall = (h.ObjectName = options.Item.ObjectName)
              let point = { Object = Activation activation; Position = position };
              let (newheight, list) = draw list { options with Item = h; From = Some point; IsSelfCall = isSelfCall };
              recurse draw list (position + newheight - options.Height + 1) activation { options with Height = (newheight + 1) } t
    | _    -> (options.Height, list)

let rec private draw list options =
    let (activation, list) = activationWithMessage drawCalc list options
    let height = if options.IsSelfCall then options.Height + SelfCallSize else options.Height
    let stack = options.Stack @ [{ Activation = activation; CallstackItem = options.Item; Height = height }]
    recurse draw list 1 activation { Height = (height + 1); Stack = stack; Item = options.Item; From = None; IsSelfCall = false } options.Item.Children

let drawDiagram callstack =
    let (_, list) = draw [] { Options.Height = 1; Stack = []; Item = callstack; From = None; IsSelfCall = false }
    List.rev list

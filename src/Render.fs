module Render

open Diagram

[<Literal>]
let private StepSize = 12.0f
[<Literal>]
let private ActivationWidth = 12.0f
[<Literal>]
let private LifelineStep = 120.0f
[<Literal>]
let private LifeHeaderWidth = 85.0f
[<Literal>]
let private LifeHeaderHeight = 30.0f
[<Literal>]
let private TextMargin = 4.0f

type private Position = { X: float32; Y: float32 }

type private RenderState = { List: Svg.Element list; LifeLineX: float32; LifeLineCount: int; Map: Map<VisualElement, Position> }

let private renderLifeLine (lifeLine: VisualLifeLine) state =
    let x = LifeHeaderWidth / 2.0f + state.LifeLineX + 1.0f
    let line = Svg.Line(x - LifeHeaderWidth / 2.0f, LifeHeaderHeight, x + LifeHeaderWidth / 2.0f, LifeHeaderHeight, "header")
    let state = { state with List = line :: state.List }

    let text = Svg.Text(x, LifeHeaderHeight / 2.0f + (if (state.LifeLineCount % 2) = 0 then 5.0f else -5.0f), lifeLine.Text, "header")

    let state = { state with List = text :: state.List }

    let y1 = LifeHeaderHeight
    let y2 = LifeHeaderHeight + float32(lifeLine.Size) * StepSize

    let line = Svg.Line(x, y1, x, y2, "lifeline")

    { state with LifeLineX = state.LifeLineX + LifelineStep + (float32(lifeLine.Depth) - 1.0f) * (StepSize * 0.5f)
                 LifeLineCount = state.LifeLineCount + 1
                 List = line :: state.List
                 Map = state.Map.Add(LifeLine lifeLine, { Position.X = x; Position.Y = y1 }) }

let private renderActivation (activation: VisualActivation) state =
    match activation.From.Object with
    | LifeLine _ ->             let pos = state.Map |> Map.find activation.From.Object
                                let x = pos.X - ActivationWidth / 2.0f
                                let y = pos.Y + float32(activation.From.Position) * StepSize
                                let width = ActivationWidth
                                let height = (pos.Y + float32(activation.To.Position) * StepSize) - y;
                                { state with Map = state.Map.Add(Activation activation, { Position.X = x; Position.Y = y})
                                             List = Svg.Rect(x, y, width, height, activation.Name, "activity") :: state.List }

    | Activation _ ->           let pos = state.Map |> Map.find activation.From.Object

                                let x = pos.X + ActivationWidth / 2.0f
                                let y = pos.Y + float32(activation.From.Position) * StepSize

                                let width = ActivationWidth
                                let height = (pos.Y + float32(activation.To.Position) * StepSize) - y;

                                { state with Map = state.Map.Add(Activation activation, { Position.X = x; Position.Y = y})
                                             List = Svg.Rect(x, y, width, height, activation.Name, "activity") :: state.List }
    | Message _ -> state

let private arrow x1 y1 x2 y2 cls =
    let line1 = Svg.Line(x1, y1, x2, y2, cls)

    if x1 < x2 then
        let line2 = Svg.Line(x2, y2, x2 - 5.0f, y2 - 2.0f, cls)
        let line3 = Svg.Line(x2, y2, x2 - 5.0f, y2 + 2.0f, cls)
        [line1; line2; line3]
    else
        let line2 = Svg.Line(x2, y2, x2 + 5.0f, y2 - 2.0f, cls)
        let line3 = Svg.Line(x2, y2, x2 + 5.0f, y2 + 2.0f, cls)
        [line1; line2; line3]

let rec private activationNestingLevel el level =
    match el with
    | Activation a -> activationNestingLevel a.From.Object (level + 1)
    | _            -> level

let private renderMessage message state =
    let from = state.Map |> Map.find message.From.Object
    let tom = state.Map |> Map.find message.To.Object

    let fromy = from.Y + float32(message.From.Position) * StepSize;
    let toy = tom.Y + float32(message.To.Position) * StepSize;

    if fromy = toy then
        if from.X < tom.X then
            let arrow = arrow (from.X + ActivationWidth) fromy tom.X toy "message"
            let text = Svg.Text(from.X + ActivationWidth * 1.5f, fromy - TextMargin, message.Text, "message")
            { state with List = text :: arrow @ state.List }
        else
            let arrow = arrow from.X fromy (tom.X + ActivationWidth) toy "message"
            let nesting = activationNestingLevel message.From.Object 0
            let text = Svg.Text(from.X - ActivationWidth * float32(nesting) * 0.5f, fromy - TextMargin, message.Text, "message_right")
            { state with List = text :: arrow @ state.List }
    else
        if from.X < tom.X then
            let fromx = from.X + ActivationWidth
            let tox = tom.X + ActivationWidth;

            let line1 = Svg.Line(fromx, fromy, fromx + ActivationWidth * 2.0f, fromy, "message")
            let line2 = Svg.Line(fromx + ActivationWidth * 2.0f, fromy, fromx + ActivationWidth * 2.0f, toy, "message")
            let arrow = arrow (fromx + ActivationWidth * 2.0f) toy tox toy "message"

            let text = Svg.Text(fromx + (ActivationWidth / 2.0f), toy - TextMargin, message.Text, "message")
            { state with List = line1 :: line2 :: text :: arrow @ state.List }
        else
            let line1 = Svg.Line(from.X, fromy, tom.X, toy, "message")
            { state with List = line1 :: state.List }

let private renderElement el state =
    match el with
    | LifeLine a -> renderLifeLine a state
    | Message a -> renderMessage a state
    | Activation a -> renderActivation a state

let rec private render input state =
    match input with
    | h::t -> render t (renderElement h state)
    | [] -> state

let renderSvg input =
    let state = render input { LifeLineX = 0.0f; LifeLineCount = 0; Map = Map.empty; List = [] }

    let styles = ["rect { fill:#eeeeee; fill-opacity:1; stroke-width:1; stroke:gray }"
                  "rect:hover { fill:#dddddd; }"
                  "line { stroke: black; }"
                  "text { font-family: consolas; font-size: 7.5pt; }"
                  "text.message_right { text-anchor: end; }"
                  "text.header { text-anchor: middle; }"
                  "line.lifeline { stroke: lightgray; }"
                  "line.message { stroke: green; }"]

    (state.List, styles)

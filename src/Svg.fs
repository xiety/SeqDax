module Svg

type Element = | Rect of X : float32 * Y : float32 * Width : float32 * Height : float32 * Title: string * Class: string
               | Line of X1 : float32 * Y1 : float32 * X2 : float32 * Y2 : float32 * Class: string
               | Text of X : float32 * Y : float32 * Text: string * Class: string

let private make el =
    match el with
    | Rect (x, y, width, height, title, cls) -> sprintf "<rect x='%f' y='%f' width='%f' height='%f' class='%s'><title>%s</title></rect>" x y width height cls title
    | Line(x1, y1, x2, y2, cls) -> sprintf "<line x1='%f' y1='%f' x2='%f' y2='%f' class='%s' />" x1 y1 x2 y2 cls
    | Text(x, y, text, cls) -> sprintf "<text x='%f' y='%f' class='%s'>%s</text>" x y cls text

let rec private svgToList input output =
    match input with
    | h::t -> svgToList t (make h :: output)
    | [] -> output

let rec private getSize input maxx maxy =
    match input with
    | h::t -> let (dx,dy) = match h with
                            | Rect(x, y, width, height, _, _) -> (x + width, y + height)
                            | Line(_, _, x2, y2, _) -> (x2, y2)
                            | Text(x, y, _, _) -> (x, y)
              let maxx = if dx > maxx then dx else maxx
              let maxy = if dy > maxy then dy else maxy
              getSize t maxx maxy
    | [] -> (maxx, maxy)

let svgToText (input, styles) =
    let output = svgToList input []

    let (width, height) = getSize input 0.0f 0.0f

    sprintf "<svg xmlns='http://www.w3.org/2000/svg' width='%f' height='%f'><style>%s</style>%s</svg>"
                (width + 100.0f) (height + 10.0f) (styles |> String.concat " ") (output |> String.concat "\n")

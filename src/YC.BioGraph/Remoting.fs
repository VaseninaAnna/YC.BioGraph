namespace YC.BioGraph

open WebSharper

module Server =
    type FileType =
        | Graph
        | Grammar

    type Nuc = | A | C | G | U

    type Edge = Edge of s:int * t:int * n:Nuc * f:bool

    type t =
        | Bad
        | Normal of int
        | Good of int

    type QEdge = QEdge of s:int * tA:t * tC:t * TG:t * TU:t

    type Graph = {
        countOfVertex: int;
        edges: Edge[];
        qedges: QEdge[];
    }

    type Result =
        | Error of message: string
        | Success of optGraph: option<Graph> * seqs: string[]

    [<Rpc>]
    let DoSomething input =
        let R (s: string) = System.String(Array.rev(s.ToCharArray()))
        async {
            return R input
        }
        
    [<Rpc>]
    let LoadDefaultFileNames (fileType: FileType) =
        match fileType with
        | Grammar ->
            [
                "lite"
            ]
        | Graph ->
            [
                "lite"
            ]

    [<Rpc>]
    let LoadDefaultFile (fileType: FileType) name =
        match fileType with
        | Grammar ->
            match name with
            | "lite" -> @"[<Start>]
    s: a b | b c | d
    a: A
    b: C
    c: G
    d: U"
            |  _  -> ""
        | Graph ->
            match name with
            | "lite" -> "digraph { 0 -> 1 [label = U]; 1 -> 2 [label = C]}"
            |  _  -> ""

    [<Rpc>]
    let Parse (grammar: string) (graph: string) (range: int * int) (isOutputGraph: bool) =
        try
            if grammar = "" || graph = "" || range = (0, 0) then Error "!!?"
            else
                match Parser.parse grammar graph with
                | Yard.Generators.GLL.ParserCommon.ParseResult.Error msg -> Error msg
                | Yard.Generators.GLL.ParserCommon.ParseResult.Success tree -> Error (string tree)
        with
        | e -> Error e.Message
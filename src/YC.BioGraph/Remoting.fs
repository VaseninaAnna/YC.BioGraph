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
                "A"
                "B"
            ]
        | Graph ->
            [
                "A"
                "B"
            ]

    [<Rpc>]
    let LoadDefaultFile (fileType: FileType) name =
        match fileType with
        | Grammar ->
            match name with
            | "A" -> "A grammar value"
            | "B" -> "B grammar value"
            |  _  -> ""
        | Graph ->
            match name with
            | "A" -> "A graph value"
            | "B" -> "B graph value"
            |  _  -> ""

    [<Rpc>]
    let Parse (grammar: string) (graph: string) (range: int * int) (isOutputGraph: bool) =
        if grammar = "" then Error "!!?"
        else Error grammar
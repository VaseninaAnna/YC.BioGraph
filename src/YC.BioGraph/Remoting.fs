namespace YC.BioGraph

open WebSharper

module Server =
    type FileType =
        | Graph
        | Grammar

    type Result =
        | Error of string
        | Success of option<Graph> * string[]
        
    [<Rpc>]
    let LoadDefaultFileNames (fileType: FileType) =
        match fileType with
        | Grammar ->
            [
                "lite"
                "cycle"
                "brackets"
            ]
        | Graph ->
            [
                "lite"
                "cycle"
                "brackets"
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
            | "cycle" -> @"[<Start>]
s: a | d s
a: A
d: U"
            | "brackets" -> @"[<Start>]
s: a s d | s s | b | c
a: A
b: C
c: G
d: U"
            |  _  -> ""
        | Graph ->
            match name with
            | "lite" -> @"digraph {
    0 -> 1 [label = U]
    1 -> 2 [label = C]
}"
            | "cycle" -> @"digraph {
    0 -> 1 [label = U]
    1 -> 0 [label = U]
    1 -> 2 [label = A]
}"
            | "brackets" -> @"digraph {
    0 -> 1 [label = A]
    0 -> 2 [label = C]
    0 -> 3 [label = G]
    0 -> 4 [label = U]
    1 -> 0 [label = A]
    1 -> 2 [label = C]
    1 -> 3 [label = G]
    1 -> 4 [label = U]
    2 -> 1 [label = A]
    2 -> 0 [label = C]
    2 -> 3 [label = G]
    2 -> 4 [label = U]
    3 -> 1 [label = A]
    3 -> 2 [label = C]
    3 -> 0 [label = G]
    3 -> 4 [label = U]
    4 -> 1 [label = A]
    4 -> 2 [label = C]
    4 -> 3 [label = G]
    4 -> 0 [label = U]
}"
            |  _  -> ""

    [<Rpc>]
    let Parse (grammar'text: string) (graph'text: string) (range: int * int) (isOutputGraph: bool) =
        try
            if grammar'text = "" && graph'text = "" then Error "Empty input"
            elif graph'text = "" then Error "Empty graph input"
            elif grammar'text = "" then Error "Empty grammar input"
            else
                let grammar, graph = Parser.grmParse grammar'text, Parser.graphParse graph'text
                match Parser.parse grammar graph with
                | Yard.Generators.GLL.ParserCommon.ParseResult.Error msg -> Error msg
                | Yard.Generators.GLL.ParserCommon.ParseResult.Success tree ->
                    let r = max 0 (fst range), max 0 (snd range)
                    let extGraph = Parser.tree2extGraph tree
                    let mapInput = Parser.inputGraph2Map graph
                    let graphOpt = if isOutputGraph then Some (Parser.markGraph (graph.VertexCount - 1) mapInput (Parser.extGraph2edges extGraph)) else None
                    let graphSeqs = Parser.seqFilter << (if r = (0, 0) then Parser.lazyTree2seqs else Parser.lazyTree2guardedSeqs r) << Parser.iLazyTree2lazyTree mapInput << Parser.extGraph2iLazyTree <| extGraph
                    Success (graphOpt, graphSeqs)
        with
        | e -> Error e.Message
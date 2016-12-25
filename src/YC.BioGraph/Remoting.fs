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
s: A s U | C"
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
    0 -> 0 [label = U]
    1 -> 1 [label = U]
    2 -> 2 [label = U]
    0 -> 1 [label = A]
    1 -> 2 [label = A]
    2 -> 0 [label = A]
    0 -> 2 [label = C]
    1 -> 0 [label = C]
    2 -> 1 [label = C]
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
                    if fst range >= 0 && snd range >= fst range then
                        let extGraph = Parser.tree2extGraph tree
                        let mapInput = Parser.inputGraph2Map graph
                        let graphOpt = if isOutputGraph then Some (Parser.markGraph (graph.VertexCount - 1) mapInput (Parser.extGraph2edges extGraph)) else None
                        let graphSeqs = Parser.seqFilter << (Parser.lazyTree2guardedSeqs range) << Parser.iLazyTree2lazyTree mapInput << Parser.extGraph2iLazyTree <| extGraph
                        Success (graphOpt, graphSeqs)
                    elif range = (-1, -1) then
                        let extGraph = Parser.tree2extGraph tree
                        let mapInput = Parser.inputGraph2Map graph
                        let graphOpt = if isOutputGraph then Some (Parser.markGraph (graph.VertexCount - 1) mapInput (Parser.extGraph2edges extGraph)) else None
                        let graphSeqs = Parser.seqFilter << Parser.lazyTree2seqs << Parser.iLazyTree2lazyTree mapInput << Parser.extGraph2iLazyTree <| extGraph
                        Success (graphOpt, graphSeqs)
                    else Error "Unexcepted input range.\nRange must be (-1, -1) for output of all length seqs\nRange.from must be more or equal then 0 and Range.to must be more or equal than Range.from"
        with
        | e -> Error e.Message
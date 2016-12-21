namespace YC.BioGraph

open WebSharper

module Server =
    type FileType =
        | Graph
        | Grammar

    type Result =
        | Error of message: string
        | Success of optGraph: option<Graph> * seqs: string[]
        
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
            | "lite" -> @"digraph {
    0 -> 1 [label = U]
    1 -> 2 [label = C]
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
                    let et = Parser.tree2extTree tree
                    let edgesSeqs = Parser.extTree2edgesSeqs et
                    let seqs = Parser.edgesSeqs2stringSeqs edgesSeqs graph range
                    if isOutputGraph then
                        Success (Some <| Parser.markGraph graph (Parser.extTree2edges et), seqs)
                    else
                        Success (None, seqs)
        with
        | e -> Error e.Message
// Дополнительные сведения о F# см. на http://fsharp.org
// Дополнительную справку см. в проекте "Учебник по F#".

module YC.BioGraph.Parser

open AbstractAnalysis.Common
open Yard.Frontends.YardFrontend.Main
open Yard.Generators.GLL.AbstractParser
open AbstractAnalysis.Common
open Yard.Generators.GLL
open Yard.Generators.Common.FinalGrammar
open Yard.Generators.Common.InitialConvert
open Yard.Generators.Common.ASTGLL
open Yard.Generators.GLL.ParserCommon
open System.Collections.Generic
open Yard.Generators.GLL
open Yard.Generators.Common

type Token =
    | A
    | C
    | G
    | U
    | EOF

let graphParse graph'text =
    let gd = DotParser.parse graph'text
    let n = gd.Nodes.Count
    let g = new ParserInputGraph<Token>([|0..n|], [|n|])
    for i in 0..n do
        ignore <| g.AddVertex i

    for i in 0..n - 1 do
        ignore <| g.AddEdge(new ParserEdge<Token>(i, n, EOF))
    
    for edge in gd.Edges do
        let (x, y) = edge.Key
        let (a, b) = ref 0, ref 0
        if System.Int32.TryParse(x, a) && System.Int32.TryParse(y, b) then
            match edge.Value.Head.["label"] with
            | "A" -> ignore <| g.AddEdge(new ParserEdge<Token>(!a, !b, A))
            | "C" -> ignore <| g.AddEdge(new ParserEdge<Token>(!a, !b, C))
            | "G" -> ignore <| g.AddEdge(new ParserEdge<Token>(!a, !b, G))
            | "U" -> ignore <| g.AddEdge(new ParserEdge<Token>(!a, !b, U))
            | _ -> ()
    g
    (*
    let genGraphNWithEof n edges =
        let g = new ParserInputGraph<Token>([|0..n|], [|n|])

        for i in 0..n do
            ignore <| g.AddVertex i
    
        for i in 0..n - 1 do
            ignore <| g.AddEdge(new ParserEdge<Token>(i, n, EOF))
    
        for s, t, tok in edges do
            ignore <| g.AddEdge(new ParserEdge<Token>(s, t, tok))
    
        g

    let graph: ParserInputGraph<Token> =
        genGraphNWithEof 3 [0, 1, U; 1, 2, C]
    *)
    
let mutable indToString = fun i -> ""
let mutable tokenToNumber = fun t -> 0
let tokenData (t:Token): obj = null

let grmParse parser_text = 
    let text = parser_text
    (*let text = @"
    [<Start>]
    s: a b | b c | d
    a: A
    b: C
    c: G
    d: U"*)
    let grm = ParseText text "file.yrd"
    let icg = initialConvert grm
    let fg = FinalGrammar(icg.grammar.[0].rules, true)

    tokenToNumber <- function
        | A -> fg.indexator.termToIndex "A"
        | C -> fg.indexator.termToIndex "C"
        | G -> fg.indexator.termToIndex "G"
        | U -> fg.indexator.termToIndex "U"
        | EOF -> fg.indexator.eofIndex

    let genLiteral (s:string) (i:int): Token option = None
    
    let isLiteral (t:Token): bool = false
    let isTerminal (t:Token): bool = true
    let getLiteralNames = []

    let td = (Table fg).result
    let table = new System.Collections.Generic.Dictionary<int, int[]>()
    for k in td.Keys do
        table.Add(k, td.[k].ToArray())

    let rulesArr = Array.zeroCreate fg.rules.rulesCount
    for i = 0 to fg.rules.rulesCount-1 do
        rulesArr.[i] <- fg.rules.rightSide i

    let totalRulesLength = rulesArr |> Array.sumBy (fun x -> x.Length)
    let rules = Array.zeroCreate totalRulesLength
    let rulesStart = Array.zeroCreate <| fg.rules.rulesCount + 1
    let mutable cur = 0
    for i = 0 to fg.rules.rulesCount-1 do
        rulesStart.[i] <- cur
        for j = 0 to rulesArr.[i].Length-1 do
            rules.[cur] <- rulesArr.[i].[j]
            cur <- cur + 1
    rulesStart.[fg.rules.rulesCount] <- cur

    let acceptEmptyInput = true
    let numIsTerminal (i:int): bool = fg.indexator.termsStart <= i && i <= fg.indexator.termsEnd
    let numIsNonTerminal (i:int): bool = fg.indexator.isNonTerm i
    let numIsLiteral (i:int): bool = fg.indexator.literalsStart <= i && i <= fg.indexator.literalsEnd

    let numToString (n:int):string =
        if numIsTerminal n then
            fg.indexator.indexToTerm n
        elif numIsNonTerminal n then
            fg.indexator.indexToNonTerm n
        elif numIsLiteral n then
            fg.indexator.indexToLiteral n
        else string n
    
    indToString <- numToString

    let inline packRulePosition rule position = (int rule <<< 16) ||| int position

    let slots = new List<_>()
    slots.Add(packRulePosition -1 -1, 0)
    for i = 0 to fg.rules.rulesCount - 1 do
        let currentRightSide = fg.rules.rightSide i
        for j = 0 to currentRightSide.Length - 1 do
            if fg.indexator.isNonTerm currentRightSide.[j] then
                let key = packRulePosition i (j + 1)
                slots.Add(key, slots.Count)

    let parserSource = new ParserSourceGLL<Token>(Token.EOF, tokenToNumber, genLiteral, numToString, tokenData, isLiteral, isTerminal, getLiteralNames, table, rules, rulesStart, fg.rules.leftSideArr, fg.startRule, fg.indexator.literalsEnd, fg.indexator.literalsStart, fg.indexator.termsEnd, fg.indexator.termsStart, fg.indexator.termCount, fg.indexator.nonTermCount, fg.indexator.literalsCount, fg.indexator.eofIndex, fg.rules.rulesCount, fg.indexator.fullCount, acceptEmptyInput, numIsTerminal, numIsNonTerminal, numIsLiteral, fg.canInferEpsilon, slots |> dict)
    parserSource
    //let gfg = GrammarFlowGraph()

    //type HGrammar<'TInt> =
    //    HGrammar of 'TInt * list<'TInt * list<'TInt>>

let ast2graph (tree: Yard.Generators.Common.ASTGLL.Tree<Token>) =
    tree.AstToDot indToString tokenToNumber tokenData "x.dot"
    System.IO.File.ReadAllText "x.dot"

let parse grammar'text graph'text = buildAbstractAst<Token> (grmParse grammar'text) (graphParse graph'text)

type Action =
    | EmptyA
    | TermA of string
    | UntermA of string
    | OrA of string
    | AndA

type ActionTree =
    | Empty
    | Term of string
    | Unterm of string * list<ActionTree>
    | Or of string * list<ActionTree>
    | And of list<ActionTree>

let dot2tree (tree'text: string) = (*
    let gd = DotParser.parse tree'text
    let n = gd.Nodes.Count
    let appAction (attrs: list<GraphData.Attributes>) =
        let mutable label = ""
        let mutable shape = ""
        for attrss in attrs do
            for attr in attrss do
                if attr.Key = "label"
                then label <- attr.Value
                elif attr.Key = "shape"
                then shape <- attr.Value
        match shape with
        | "" -> EmptyA
        | "point" -> AndA
        | "box" -> if label.[0] = 't' then TermA label else OrA label
        | "oval" -> UntermA label
    let g = Array2D.init n n (fun s t -> if not <| gd.Edges.ContainsKey(string s, string t) then EmptyA else appAction gd.Edges.[string s, string t])
    
    let rec genTree i =
        [for j in 0..n-1 ->
            match g.[i, j] with
            | EmptyA -> Empty
            | TermA t -> Term t
            | UntermA u -> Unterm (u, genTree j)
            | OrA t -> Or (t, genTree j)
            | AndA -> And (genTree j)]
            *)
    tree'text//genTree 0

type INodeCommonVisitor<'a>(visitObj: INodeCommonVisitor<'a> -> obj -> 'a, visitINode: INodeCommonVisitor<'a> -> INode -> 'a, visitNonTerminalNode: INodeCommonVisitor<'a> -> NonTerminalNode -> 'a, visitTerminalNode: INodeCommonVisitor<'a> -> TerminalNode -> 'a, visitPackedNode: INodeCommonVisitor<'a> -> PackedNode -> 'a, visitIntermidiateNode: INodeCommonVisitor<'a> -> IntermidiateNode -> 'a) =
    member this.VisitObj: obj -> 'a = visitObj this
    member this.VisitINode: INode -> 'a = visitINode this
    member this.VisitNonTerminalNode: NonTerminalNode -> 'a = visitNonTerminalNode this
    member this.VisitTerminalNode: TerminalNode -> 'a = visitTerminalNode this
    member this.VisitPackedNode: PackedNode -> 'a = visitPackedNode this
    member this.VisitIntermidiateNode: IntermidiateNode -> 'a = visitIntermidiateNode this

type INodeVisitor<'a>(visitNonTerminalNode: INodeCommonVisitor<'a> -> NonTerminalNode -> 'a, visitTerminalNode: INodeCommonVisitor<'a> -> TerminalNode -> 'a, visitPackedNode: INodeCommonVisitor<'a> -> PackedNode -> 'a, visitIntermidiateNode: INodeCommonVisitor<'a> -> IntermidiateNode -> 'a) =
    inherit INodeCommonVisitor<'a>(
        (fun (this: INodeCommonVisitor<'a>) -> function
        | :? INode as node -> this.VisitINode node
        | x -> failwithf "Expected INode typed object but discovered %A typed object" (x.GetType())),
        (fun (this: INodeCommonVisitor<'a>) -> function
        | :? NonTerminalNode as node -> this.VisitNonTerminalNode node
        | :? TerminalNode as node -> this.VisitTerminalNode node
        | :? PackedNode as node -> this.VisitPackedNode node
        | :? IntermidiateNode as node -> this.VisitIntermidiateNode node
        | x -> failwithf "Expected NonTerminalNode or TerminalNode or PackedNode or IntermidiateNode typed object but discovered %A typed object" (x.GetType())),
        visitNonTerminalNode, visitTerminalNode, visitPackedNode, visitIntermidiateNode)

type ExtensionTree =
    | Extension of int * int
    | LNode of (int * int) * list<ExtensionTree>
    | PNode of (int * int) * (ExtensionTree * ExtensionTree)

let unpackExtension(ext: int64<extension>) =
    let ``2^32`` = 256L * 256L * 256L * 256L
    (int <| ext / ``2^32``, int <| ext % (``2^32`` * 1L<extension>))

let f (tree: Yard.Generators.Common.ASTGLL.Tree<Token>) =
    INodeVisitor(
        (fun this node ->
            LNode ((unpackExtension node.Extension), (this.VisitPackedNode node.First) :: (node.Others.ToArray() |> List.ofArray |> List.map this.VisitPackedNode))
        ), 
        (fun _ node ->
            Extension (unpackExtension node.Extension)
        ), 
        (fun this node ->
            PNode ((unpackExtension ((node :> INode).getExtension())), (this.VisitINode node.Left, this.VisitINode node.Right))
        ), 
        (fun this node ->
            LNode ((unpackExtension node.Extension), (this.VisitPackedNode node.First) :: (node.Others.ToArray() |> List.ofArray |> List.map this.VisitPackedNode))
        )
    ).VisitObj (tree.Root)
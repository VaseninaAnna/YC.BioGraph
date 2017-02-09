namespace YC.BioGraph

open WebSharper
open WebSharper.Sitelets

type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About
    | [<EndPoint "/graph"; Wildcard>] Graph of countOfVertex:int * edges: array<int * int * string * int>

module Templating =
    open WebSharper.Html.Server
    
    type Page =
        {
            Title : string
            Body : list<Element>
            AboutHRef : string
        }

    type GraphPage =
        {
            Title : string
            Body : list<Element>
        }
        
    let MainTemplate =
        Content.Template<Page>("~/Main.html")
            .With("title", fun x -> x.Title)
            .With("body", fun x -> x.Body)
            .With("about-href", fun x -> x.AboutHRef)

    let GraphTemplate =
        Content.Template<GraphPage>("~/Graph.html")
            .With("title", fun x -> x.Title)
            .With("body", fun x -> x.Body)
            
    let Main title aboutHRef body =
        Content.WithTemplate MainTemplate
            {
                Title = title
                Body = body
                AboutHRef = aboutHRef
            }

    let Graph title body =
        Content.WithTemplate GraphTemplate
            {
                Title = title
                Body = body
            }

module Site =
    open WebSharper.Html.Server
    
    let HomePage =
        Templating.Main "Home" "/about" [
            Div [ClientSide <@ Client.Main() @>]
        ]

    let GraphPage g i =
        Templating.Graph "Graph" [
            Div [Attr.Id "canvas"; Attr.Height "height"; Attr.Width "width"]
        ]

    let AboutPage =
        Content.RedirectPermanentToUrl "https://github.com/Bio-graph-group/YC.BioGraph/wiki"

    [<Website>]
    let Main =
        Application.MultiPage (fun _ endpoint ->
            match endpoint with 
            | EndPoint.Home -> HomePage
            | EndPoint.Graph (i, g) -> GraphPage g i
            | EndPoint.About -> AboutPage
        )

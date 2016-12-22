namespace YC.BioGraph

open WebSharper
open WebSharper.Sitelets

type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About
    | [<EndPoint "/graph">] Graph

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

    let Graph title ctx body =
        Content.WithTemplate GraphTemplate
            {
                Title = title
                Body = body
            }

module Site =
    open WebSharper.Html.Server
    
    let HomePage ctx =
        Templating.Main "Home" "/about" [
            Div [ClientSide <@ Client.Main() @>]
        ]

    let GraphPage ctx =
        Templating.Graph "Graph" ctx [
            Div [ClientSide <@ Client.Graph() @>]
        ]

    let AboutPage ctx =
        Content.RedirectPermanentToUrl "https://github.com/Bio-graph-group/YC.BioGraph/wiki"

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Home -> HomePage ctx
            | EndPoint.Graph -> GraphPage ctx
            | EndPoint.About -> AboutPage ctx
        )
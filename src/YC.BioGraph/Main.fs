namespace YC.BioGraph

open WebSharper
open WebSharper.Sitelets

type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About

module Templating =
    open WebSharper.Html.Server

    type Page =
        {
            Title : string
            Body : list<Element>
            AboutHRef : string
        }

    let MainTemplate =
        Content.Template<Page>("~/Main.html")
            .With("title", fun x -> x.Title)
            .With("body", fun x -> x.Body)
            .With("about-href", fun x -> x.AboutHRef)

    let Main ctx endpoint title aboutHRef body : Async<Content<EndPoint>> =
        Content.WithTemplate MainTemplate
            {
                Title = title
                Body = body
                AboutHRef = aboutHRef
            }

module Site =
    open WebSharper.Html.Server

    let HomePage ctx =
        Templating.Main ctx EndPoint.Home "Home" "/about" [
            Div [ClientSide <@ Client.Main() @>]
        ]

    let AboutPage ctx =
        Content.RedirectPermanentToUrl "https://github.com/Bio-graph-group/YC.BioGraph/wiki"

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Home -> HomePage ctx
            | EndPoint.About -> AboutPage ctx
        )
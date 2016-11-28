namespace BioGraph


open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client

module wsfc = WebSharper.Formlets.Controls
module wsfe = WebSharper.Formlets.Enhance
module wsfd = WebSharper.Formlets.Data
module wsff = WebSharper.Formlets.Formlet
module wsfl = WebSharper.Formlets.Layout



[<JavaScript>]
module Client =

    let FileControl  =
        wsff.BuildFormlet <| fun () ->
            let stateChanged = new Event<IntelliFactory.Formlets.Base.Result<string>>()
            let input =
                Input [Attr.Type "file"]
                |>! OnChange (fun e -> stateChanged.Trigger(IntelliFactory.Formlets.Base.Result.Success e.Value))
            let reset() =
                input.Value <- ""
                stateChanged.Trigger(IntelliFactory.Formlets.Base.Result.Success "")
            input, reset, stateChanged.Publish
        |> wsff.InitWith ""//the most important part of the code, don't ever delete it!

    let frm =
        let fileForm =
            wsff.Do { 
              let! formlet =
                FileControl 
              return formlet
            }

        let RangeForm =
            wsff.Do {                
                let! min = wsfc.Input "1" |> wsfe.WithTextLabel "from   " |>  wsfd.Validator.IsInt "Enter numericr value" 
                let! max  = wsfc.Input "5" |> wsfe.WithTextLabel "to   " |>  wsfd.Validator.IsInt "Enter numericr value" 
                return (int min, int max)
            }
            |> wsff.Horizontal 
            |> wsfe.WithTextLabel "String range"
            |> wsfe.WithLabelAbove  
          
        let input lbl =
            wsfc.TextArea ""                    
            |> wsfe.WithTextLabel lbl
            |> wsfe.WithLabelAbove
            |> wsff.MapElement (fun e ->
                JQuery.JQuery.Of(e.Dom.QuerySelector("textarea"))
                    .Css("height", "200px")
                    .Css("width", "500px")
                    .Ignore
                e)

        let InputForm  =
            wsff.Do {
                 
                let! grammar = input "Grammar"
                let! file1 = fileForm
                let! graph = input "Graph"
                let! file2 = fileForm 
                let! range = RangeForm
                let! checkbox = wsfc.Checkbox false |> wsfe.WithTextLabel "DRAW GRAPH" |> wsfe.WithLabelLeft
                return (grammar,file1, graph, file2, range, checkbox)
            }
            |> wsff.Vertical
            |> wsfe.WithCustomFormContainer({wsfe.FormContainerConfiguration.Default with CssClass=Some"totop"}) 

        let OutputForm =
            wsff.Do {
                let! picture = 
                    wsfc.ReadOnlyTextArea""                    
                    |> wsfe.WithTextLabel "Graph visualisation"
                    |> wsfe.WithLabelAbove 
                    |> wsff.MapElement (fun e ->
                         JQuery.JQuery.Of(e.Dom.QuerySelector("textarea"))
                            .Css("height", "200px")
                            .Css("width", "500px")
                            .Ignore
                         e)

                let! output = 
                    wsfc.ReadOnlyTextArea ""                    
                    |> wsfe.WithTextLabel "Output"
                    |> wsfe.WithLabelAbove 
                    |> wsfe.WithCustomFormContainer ({ wsfe.FormContainerConfiguration.Default with CssClass=Some"totop"})
                    |> wsff.MapElement (fun e ->
                         JQuery.JQuery.Of(e.Dom.QuerySelector("textarea"))
                            .Css("height", "200px")
                            .Css("width", "500px")
                            .Ignore
                         e)
                return (picture, output)
            }
            |> wsff.Vertical 
            |> wsfe.WithCustomFormContainer({wsfe.FormContainerConfiguration.Default with CssClass=Some"totop"})
        
        wsff.Do {
            let! x = InputForm
            let! y = OutputForm
            return (x,y)
        }
        |> wsff.Horizontal
        |> wsfe.WithCustomSubmitButton ({ wsfe.FormButtonConfiguration.Default with 
                                                                                   Label = Some "GO" 
                                                                                   Style=Some"background-color: #FF1493;font-size: 40px"})

    let Main () =
        let MainForm =
            frm.Run(fun _ -> ())
        
        Div [      
           MainForm
        ] 


 
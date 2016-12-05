namespace YC.BioGraph


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

    let setFormSize (height: string) (width: string) (formletType: string) (formlet: Formlets.Data.Formlet<'c>) =
        formlet |> wsff.MapElement (fun e ->
            JQuery.JQuery.Of(e.Dom.QuerySelector(formletType))
                .Css("height", height) 
                .Css("width", width)
                .Ignore
            e)

    let ChooseDefaultControl = //opens the list of default grammars/graphs
        wsff.Do {
            let! button = 
                wsff.OfElement (fun () ->
                    Input [Attr.Type "button"; Attr.Value "Choose default"; Attr.Style "color: #000000"]
            )
            let! list = 
                wsff.OfElement (fun () ->
                    Select []
            )
            return (button, list)
            }  
            |> wsff.Horizontal
            |> wsfe.WithFormContainer                 
   
    let FileControl = 
        wsff.OfElement (fun () ->
            Input [Attr.Type "file"; Attr.Lang "en"] //set english lang
        )
    
    let InputControl lbl =
        wsff.Do {
            let! textInput =
                wsfc.TextArea ""                    
                |> wsfe.WithTextLabel lbl
                |> wsfe.WithLabelAbove
                |> setFormSize "100px" "500px" "textarea"
            let! fileInput = FileControl
            let! chooseButton = ChooseDefaultControl
            return (textInput, fileInput, chooseButton)             
        }
        |> wsff.Vertical
        |> wsfe.WithFormContainer

    let RangeControl =
        wsff.Do {                
            let! min = 
                wsfc.Input "1" 
                |> wsfe.WithTextLabel "from" 
                |> wsfd.Validator.IsInt "Enter numericr value"
                |> setFormSize "30px" "210px" "input"
            let! max  = 
                wsfc.Input "5" 
                |> wsfe.WithTextLabel "to" 
                |> wsfd.Validator.IsInt "Enter numericr value" 
                |> setFormSize "30px" "210px" "input"      
            return (int min, int max)
        }
        |> wsff.Horizontal 
        |> wsfe.WithTextLabel "String range"
        |> wsfe.WithLabelAbove 
        |> wsfe.WithFormContainer 

    let OutputControl = 
        wsff.Do {
            let! output =
                wsfc.ReadOnlyTextArea""   
                |> wsfe.WithTextLabel "Output"
                |> wsfe.WithLabelAbove                  
                |> setFormSize "220px" "600px" "textarea"
            let! wrapCheckbox = wsfc.Checkbox false |> wsfe.WithTextLabel "wrap" |> wsfe.WithLabelLeft
            return (wrapCheckbox, output)
        }
        |> wsfe.WithFormContainer
    
    let ShowImageControl = //add border
       wsff.OfElement (fun () ->
            Img[Attr.Style "height: 220px; width: 330px"; Attr.Src "graph(kindof).jpg"; Attr.Border "4px"]
        )
       |> wsfe.WithTextLabel "Graph visualisation"
       |> wsfe.WithLabelAbove 
       |> wsfe.WithFormContainer     

    let frm =        
     
        let InputForm  =
            wsff.Do {                
                let! grammar = InputControl "Grammar"
                let! graph = InputControl "Graph"
                let! range = RangeControl
                let! checkbox = wsfc.Checkbox false |> wsfe.WithTextLabel "DRAW GRAPH" |> wsfe.WithLabelLeft |> wsfe.WithFormContainer
                return (grammar, graph, range, checkbox)
            }
            |> wsff.Vertical

        let OutputForm =
            wsff.Do {
                let! picture = ShowImageControl
                let! output = OutputControl 
                return (picture, output)
            }
            |> wsff.Vertical 
        
        wsff.Do {
            let! x = InputForm
            let! y = OutputForm
            return (x, y)
        }
        |> wsff.Horizontal
        |> wsfe.WithCustomSubmitButton ({ wsfe.FormButtonConfiguration.Default with 
                                                                                   Label = Some "GO" 
                                                                                   Style=Some "background-color: #FF1493; font-size: 30px; height: 40px; width: 80px; border-width: 3px; border-color: #000000"})

    let Main () =
        let MainForm =
            frm.Run(fun _ -> ())
        
        Div [      
           MainForm
        ] 


 
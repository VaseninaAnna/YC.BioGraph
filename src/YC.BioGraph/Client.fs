namespace YC.BioGraph

open WebSharper.Formlets

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

    let screenWidth = JQuery.JQuery.Of("html").Width()
    let screenHeight = JQuery.JQuery.Of("html").Height()

    let getFormSize (height: int) (width: int) = //gets height and width of the form in px relative to the screen size
        ((height * screenHeight / 648).ToString() + "px", (width * screenWidth / 1366).ToString() + "px")

    let setFormSize ((height: string), (width: string)) (formletType: string) (formlet: Formlets.Data.Formlet<'c>) =
        formlet |> wsff.MapElement (fun e ->
            JQuery.JQuery.Of(e.Dom.QuerySelector(formletType))
                .Css("height", height) 
                .Css("width", width)
                .Ignore
            e)

    let ChooseDefaultControl (defaultData: List<string * string>) = 
        wsff.Do {
            let! dataSelect = 
                wsfc.Select 0 defaultData
                |> wsfe.WithTextLabel "Choose default"
                |> setFormSize (getFormSize 30 210) "select" 
                |> wsfe.WithFormContainer     
            return dataSelect
       }

    let FileControl = 
        wsff.OfElement (fun () ->
            Input [Attr.Type "file"] 
        )
        |> wsff.Map (fun () -> "")
    
    let InputControl lbl defaultData =
        wsff.Do {
            let! defaultValue = (wsff.Do {
                    let! fileInput = FileControl
                    return! ChooseDefaultControl (("", fileInput) :: defaultData)
                })
            let! textInput =
                    wsfc.TextArea defaultValue              
                    |> wsfe.WithTextLabel lbl
                    |> wsfe.WithLabelAbove
                    |> setFormSize (getFormSize 85 500) "textarea"
            
            return (textInput)//, fileInput, defaultSelect)
        }
        |> wsff.FlipBody
        |> wsff.Vertical
        |> wsfe.WithFormContainer

    let RangeControl =
        (wsff.Yield (fun min max -> (int min, int max))
        <*> wsff.Do {                
            let! min = 
                wsfc.Input ""
                |> wsfe.WithTextLabel "from" 
                |> setFormSize (getFormSize 30 210) "input"
            return min
        }
        <*> wsff.Do {                
            let! max  = 
                wsfc.Input "" 
                |> wsfe.WithTextLabel "to" 
                |> setFormSize (getFormSize 30 210) "input"      
            return max
        })
        |> wsff.Horizontal 
        |> wsfe.WithTextLabel "String range"
        |> wsfe.WithLabelAbove 
        |> wsfe.WithFormContainer 

    let OutputControl (grm: string, graph: string, rng: int * int, isC: bool) =
        wsff.Do
            {
                let text =
                    match Server.Parse grm graph rng isC with
                    | Server.Result.Error txt -> txt
                    | _ -> "oK"

                let! output =
                    wsfc.ReadOnlyTextArea text
                    |> wsfe.WithTextLabel "Output"
                    |> wsfe.WithLabelAbove
                    |> setFormSize (getFormSize 85 500) "textarea"
            
                let! wrapCheckbox = wsfc.Checkbox false |> wsfe.WithTextLabel "wrap" |> wsfe.WithLabelLeft
                
                return output
            }
            |> wsfe.WithFormContainer
        
    
    let ShowImageControl = 
       wsff.OfElement (fun () ->
            let hw = "height: " + fst(getFormSize 315 315) + "; width: " + fst(getFormSize 315 315)
            Img[Attr.Style hw; Attr.Src "graph(kindof).jpg"]
        )
       |> wsfe.WithTextLabel "Graph visualisation"
       |> wsfe.WithLabelAbove 
       |> wsfe.WithFormContainer     

    let frm =   
        let InputForm  =
            (*
            wsff.Do {                
                let! grammar = InputControl "Grammar" (Server.LoadDefaultFileNames Server.FileType.Grammar |> List.map (fun grmName -> grmName, Server.LoadDefaultFile Server.FileType.Grammar grmName))
                let! graph = InputControl "Graph" (Server.LoadDefaultFileNames Server.FileType.Graph |> List.map (fun grmName -> grmName, Server.LoadDefaultFile Server.FileType.Graph grmName))
                let! range = RangeControl
                let! checkbox = wsfc.Checkbox false |> wsfe.WithTextLabel "DRAW GRAPH" |> wsfe.WithLabelLeft |> wsfe.WithFormContainer
                return (grammar, graph, range, checkbox)
            }*)
            (wsff.Yield (fun (grm: string) (graph: string) (rng: int * int) (isC: bool) -> (grm, graph, rng, isC))
            <*> (InputControl "Grammar" (Server.LoadDefaultFileNames Server.FileType.Grammar |> List.map (fun grmName -> grmName, Server.LoadDefaultFile Server.FileType.Grammar grmName)))
            <*> (InputControl "Graph" (Server.LoadDefaultFileNames Server.FileType.Graph |> List.map (fun grmName -> grmName, Server.LoadDefaultFile Server.FileType.Graph grmName)))
            <*> RangeControl
            <*> (wsfc.Checkbox false |> wsfe.WithTextLabel "DRAW GRAPH" |> wsfe.WithLabelLeft |> wsfe.WithFormContainer))
            |> wsff.Vertical

        let OutputForm x =
            wsff.Do {
                let! picture = ShowImageControl
                let! output = OutputControl x
                return (picture, output)
            }
            |> wsff.Vertical 
        
        let style = "background-color: #FF1493; border-width: 3px; border-color: #000000; height: " + fst(getFormSize 40 80) + "; width: " + snd(getFormSize 40 80) + "; font-size:" +  fst(getFormSize 30 80); 

        wsff.Do {
            let! x = InputForm
            let! y = OutputForm x
            return (x, y)
        }
        |> wsff.Horizontal
        |> wsfe.WithCustomSubmitButton ({ wsfe.FormButtonConfiguration.Default with 
                                                                                   Label = Some "GO" 
                                                                                   Style = Some style})
                                                                               
    let Main () =
        let MainForm =
            frm.Run(fun (a, ((), b)) -> ())
        
        Div [      
           MainForm
        ] 


 



















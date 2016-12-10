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
            return (dataSelect)
            }  

    let FileControl = 
        wsff.OfElement (fun () ->
            Input [Attr.Type "file"] 
        )
    
    let InputControl lbl defaultData =
        wsff.Do {
            let! textInput =
                wsfc.TextArea ""              
                |> wsfe.WithTextLabel lbl
                |> wsfe.WithLabelAbove
                |> setFormSize (getFormSize 85 500) "textarea"
            let! fileInput = FileControl
            let! defaultSelect = ChooseDefaultControl defaultData
            return (textInput, fileInput, defaultSelect)             
        }
        |> wsff.Vertical
        |> wsfe.WithFormContainer

    let RangeControl =
        wsff.Do {                
            let! min = 
                wsfc.Input ""
                |> wsfe.WithTextLabel "from" 
                |> setFormSize (getFormSize 30 210) "input"
            let! max  = 
                wsfc.Input "" 
                |> wsfe.WithTextLabel "to" 
                |> setFormSize (getFormSize 30 210) "input"      
            return (int min, int max)
        }
        |> wsff.Horizontal 
        |> wsfe.WithTextLabel "String range"
        |> wsfe.WithLabelAbove 
        |> wsfe.WithFormContainer 

    let OutputControl = 
        wsff.Do {
            let! output =
                wsfc.ReadOnlyTextArea "" 
                |> wsfe.WithTextLabel "Output"
                |> wsfe.WithLabelAbove                  
                |> setFormSize (getFormSize 85 500) "textarea"
            let! wrapCheckbox = wsfc.Checkbox false |> wsfe.WithTextLabel "wrap" |> wsfe.WithLabelLeft
            return (wrapCheckbox, output)
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
            wsff.Do {                
                let! grammar = InputControl "Grammar" (Server.LoadDefaultFileNames Server.FileType.Grammar |> List.map (fun grmName -> grmName, ""))
                let! graph = InputControl "Graph" (Server.LoadDefaultFileNames Server.FileType.Graph |> List.map (fun grmName -> grmName, ""))
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
        
        let style = "background-color: #FF1493; border-width: 3px; border-color: #000000; height: " + fst(getFormSize 40 80) + "; width: " + snd(getFormSize 40 80) + "; font-size:" +  fst(getFormSize 30 80); 
        wsff.Do {
            let! x = InputForm
            let! y = OutputForm
            return (x, y)
        }
        |> wsff.Horizontal
        |> wsfe.WithCustomSubmitButton ({ wsfe.FormButtonConfiguration.Default with 
                                                                                   Label = Some "GO" 
                                                                                   Style = Some style})
                                                                               
    let Main () =
        let MainForm =
            frm.Run(fun _ -> ())
        
        Div [      
           MainForm
        ] 


 



















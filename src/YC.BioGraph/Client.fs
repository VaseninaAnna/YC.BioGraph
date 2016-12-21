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

    let getFormSize (height: int) (width: int) = 
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
            return dataSelect }

    let FileControl = 
        let readFile (elFrom: Element) (stateChanged: Event<_>) =
            let file = (WebSharper.JavaScript.FileList.OfElement elFrom.Dom).Item 0
            let reader = new WebSharper.JavaScript.TextFileReader()            
            reader.ReadAsText file
            reader.AddEventListener("load", (fun () -> stateChanged.Trigger(Result.Success reader.Result)), true)
            
        Formlet.BuildFormlet <| fun() ->
            let stateChanged = new Event<Result<string>>()
            let input =
                Input [Attr.Type "file"; Attr.Accept "text/*"]
                |>! OnChange (fun e -> readFile e stateChanged)                        
            let reset () =
                input.Value <- ""
                stateChanged.Trigger(Result.Success "")
            input, reset, stateChanged.Publish
        |> Formlet.InitWith ""

    let InputControl lbl defaultData =
        wsff.Do {
            let! defaultValue = (wsff.Do {
                                     let! fileInput = FileControl
                                     return! ChooseDefaultControl (("", fileInput) :: defaultData) } )
            let! textInput =
                    wsfc.TextArea defaultValue              
                    |> wsfe.WithTextLabel lbl
                    |> wsfe.WithLabelAbove
                    |> setFormSize (getFormSize 85 500) "textarea"          
            return (textInput) }
        |> wsff.FlipBody
        |> wsff.Vertical
        |> wsfe.WithFormContainer

    let RangeControl =
        wsff.Yield (fun min max -> (int min, int max))
        <*> wsff.Do {
                let! min = 
                    wsfc.Input ""
                    |> wsfe.WithTextLabel "from" 
                    |> setFormSize (getFormSize 30 210) "input"
                return min }
        <*> wsff.Do {                
                let! max = 
                    wsfc.Input ""
                    |> wsfe.WithTextLabel "to" 
                    |> setFormSize (getFormSize 30 210) "input"      
                return max }
        |> wsff.Horizontal 
        |> wsfe.WithTextLabel "String range"
        |> wsfe.WithLabelAbove 
        |> wsfe.WithFormContainer 

    let OutputControl outputText  =
        wsff.Do {
            let! wrapCheckbox = wsfc.Checkbox false |> wsfe.WithTextLabel "wrap" |> wsfe.WithLabelLeft 
            let wrapValue =
                match wrapCheckbox with
                | false -> "off"
                | true -> "soft"             
            let! output =
                wsff.OfElement (fun () -> TextArea [Attr.ReadOnly "readonly"; Attr.Wrap wrapValue; Text outputText] )
                |> wsfe.WithTextLabel "Output"
                |> wsfe.WithLabelAbove
                |> setFormSize (getFormSize 85 500) "textarea"               
            return output }
        |> wsfe.WithFormContainer
        |> wsff.FlipBody
        
    let ShowImageControl grOption drawGr = 
       let src = 
           match (grOption, drawGr) with
           | (None, true) -> "defaultImg.svg"
           | (None, false) -> "defaultImg.svg"
           | (Some(graphOption), true) -> "graphImg.svg" //to do
           | (Some(graphOption), false) -> "defaultImg.svg"
       wsff.OfElement (fun () ->
            let hw = "height: " + fst(getFormSize 355 355) + "; width: " + fst(getFormSize 355 355)
            Img [Attr.Style hw; Attr.Src src] )
       |> wsfe.WithTextLabel "Graph visualisation"
       |> wsfe.WithLabelAbove 
       |> wsfe.WithFormContainer          

    let frm =   
        let InputForm  =
            let style = "background-color: #FF1493; border-width: 3px; border-color: #000000; height: " + fst(getFormSize 40 80) + "; width: " + snd(getFormSize 40 80) + "; font-size:" + fst(getFormSize 30 80); 

            (wsff.Yield (fun (grm: string) (graph: string) (rng: int * int) (drawGr: bool) -> (grm, graph, rng, drawGr))
            <*> (InputControl "Grammar" (Server.LoadDefaultFileNames Server.FileType.Grammar |> List.map (fun grmName -> grmName, Server.LoadDefaultFile Server.FileType.Grammar grmName)))
            <*> (InputControl "Graph" (Server.LoadDefaultFileNames Server.FileType.Graph |> List.map (fun grmName -> grmName, Server.LoadDefaultFile Server.FileType.Graph grmName)))
            <*> RangeControl
            <*> (wsfc.Checkbox false |> wsfe.WithTextLabel "DRAW GRAPH" |> wsfe.WithLabelLeft |> wsfe.WithFormContainer))
            |> wsfe.WithCustomSubmitButton ({ wsfe.FormButtonConfiguration.Default with 
                                                                                       Label = Some "GO" 
                                                                                       Style = Some style })
            |> wsff.Vertical
 
        let OutputForm (grm: string, graph: string, rng: int * int, drawGr: bool) =
            wsff.Do {
                let (grOption, seqs) =
                    match Server.Parse grm graph rng drawGr with
                    | Server.Result.Error txt -> (None, txt)
                    | Server.Result.Success (grOption, seqs) -> 
                                                                  match grOption with
                                                                  | None -> (None, System.String.Join("\n",seqs))
                                                                  | Some(graphOption) -> (Some(graphOption), System.String.Join("\n",seqs))

                let! picture = ShowImageControl grOption drawGr
                let! output = OutputControl seqs              
                return (output) }
            |> wsff.Vertical 
                                                               
        wsff.Do {
            let! x = InputForm  
            let! y =  OutputForm x
            return (x, y) }
          |> wsff.Horizontal
                                                                     
    let Main () =
        let MainForm =
            frm.Run(fun _ -> ())
        
        Div [      
           MainForm
        ] 
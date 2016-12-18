namespace YC.BioGraph

type Global() =
    inherit System.Web.HttpApplication()

    member g.Application_Start(sender: obj, args: System.EventArgs) =
        ()
    
//do WebSharper.Warp.RunAndWaitForInput(Site.Main)
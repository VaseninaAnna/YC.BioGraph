namespace System
open System.Reflection

[<assembly: AssemblyTitleAttribute("YC.BioGraph")>]
[<assembly: AssemblyProductAttribute("YC.BioGraph")>]
[<assembly: AssemblyDescriptionAttribute("Bio graph parsing web demo")>]
[<assembly: AssemblyVersionAttribute("1.0")>]
[<assembly: AssemblyFileVersionAttribute("1.0")>]
do ()

module internal AssemblyVersionInformation =
    let [<Literal>] Version = "1.0"
    let [<Literal>] InformationalVersion = "1.0"

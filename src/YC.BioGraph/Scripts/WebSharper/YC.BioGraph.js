(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Formlets,Formlet,Controls,Enhance,YC,BioGraph,Client,Control,FSharpEvent,List,Html,Client1,Attr,Tags,FileReader,IntelliFactory,Formlets1,Base,Result,EventsPervasives,T,Data,Remoting,AjaxRemotingProvider,FormButtonConfiguration,Strings,String,jQuery;
 Runtime.Define(Global,{
  YC:{
   BioGraph:{
    Client:{
     ChooseDefaultControl:function(defaultData)
     {
      var _builder_;
      _builder_=Formlet.Do();
      return _builder_.Delay(function()
      {
       var formlet,x,tupledArg,height,width,x1;
       formlet=Controls.Select(0,defaultData);
       x=Enhance.WithTextLabel("Choose default",formlet);
       tupledArg=Client.getFormSize(30,210);
       height=tupledArg[0];
       width=tupledArg[1];
       x1=Client.setFormSize(height,width,"select",x);
       return _builder_.Bind(Enhance.WithFormContainer(x1),function(_arg1)
       {
        return _builder_.Return(_arg1);
       });
      });
     },
     FileControl:Runtime.Field(function()
     {
      var f,formlet;
      f=function()
      {
       var stateChanged,x,x1,arg00,input,reset;
       stateChanged=FSharpEvent.New();
       x=List.ofArray([Attr.Attr().NewAttr("type","file"),Attr.Attr().NewAttr("accept","text/*")]);
       x1=Tags.Tags().NewTag("input",x);
       arg00=function(el)
       {
        return function()
        {
         var file,reader;
         file=el.Dom.files.item(0);
         reader=new FileReader();
         reader.readAsText(file);
         return reader.addEventListener("load",function()
         {
          return stateChanged.event.Trigger(Runtime.New(Result,{
           $:0,
           $0:reader.result
          }));
         },true);
        };
       };
       EventsPervasives.Events().OnChange(arg00,x1);
       input=x1;
       reset=function()
       {
        input.set_Value("");
        return stateChanged.event.Trigger(Runtime.New(Result,{
         $:0,
         $0:""
        }));
       };
       return[input,reset,stateChanged.event];
      };
      formlet=Formlet.BuildFormlet(f);
      return Formlet.InitWith("",formlet);
     }),
     InputControl:function(lbl,defaultData)
     {
      var _builder_,formlet,formlet3,formlet4;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       var _builder_1;
       _builder_1=Formlet.Do();
       return _builder_.Bind(_builder_1.Delay(function()
       {
        return _builder_1.Bind(Client.FileControl(),function(_arg1)
        {
         return _builder_1.ReturnFrom(Client.ChooseDefaultControl(Runtime.New(T,{
          $:1,
          $0:["",_arg1],
          $1:defaultData
         })));
        });
       }),function(_arg2)
       {
        var formlet1,formlet2,x,tupledArg,height,width;
        formlet1=Controls.TextArea(_arg2);
        formlet2=Enhance.WithTextLabel(lbl,formlet1);
        x=Enhance.WithLabelAbove(formlet2);
        tupledArg=Client.getFormSize(85,500);
        height=tupledArg[0];
        width=tupledArg[1];
        return _builder_.Bind(Client.setFormSize(height,width,"textarea",x),function(_arg3)
        {
         return _builder_.Return(_arg3);
        });
       });
      });
      formlet3=Formlet.FlipBody(formlet);
      formlet4=Formlet.Vertical(formlet3);
      return Enhance.WithFormContainer(formlet4);
     },
     Main:function()
     {
      var arg10;
      arg10=List.ofArray([Client.frm().Run(function()
      {
       return null;
      })]);
      return Tags.Tags().NewTag("div",arg10);
     },
     OutputControl:function(outputText)
     {
      var _builder_,formlet,formlet5;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       var formlet1,formlet2;
       formlet1=Controls.Checkbox(false);
       formlet2=Enhance.WithTextLabel("wrap",formlet1);
       return _builder_.Bind(Enhance.WithLabelLeft(formlet2),function(_arg1)
       {
        var wrapValue,formlet3,formlet4,x,tupledArg,height,width;
        wrapValue=_arg1?"soft":"off";
        formlet3=Formlet.OfElement(function()
        {
         var arg10;
         arg10=List.ofArray([Attr.Attr().NewAttr("readonly","readonly"),Attr.Attr().NewAttr("wrap",wrapValue),Tags.Tags().text(outputText)]);
         return Tags.Tags().NewTag("textarea",arg10);
        });
        formlet4=Enhance.WithTextLabel("Output",formlet3);
        x=Enhance.WithLabelAbove(formlet4);
        tupledArg=Client.getFormSize(85,500);
        height=tupledArg[0];
        width=tupledArg[1];
        return _builder_.Bind(Client.setFormSize(height,width,"textarea",x),function(_arg2)
        {
         return _builder_.Return(_arg2);
        });
       });
      });
      formlet5=Enhance.WithFormContainer(formlet);
      return Formlet.FlipBody(formlet5);
     },
     RangeControl:Runtime.Field(function()
     {
      var formlet,_builder_,_builder_1,formlet2,formlet3,formlet4;
      _builder_=Formlet.Do();
      _builder_1=Formlet.Do();
      formlet=Data.$(Data.$(Formlet.Return(function(min)
      {
       return function(max)
       {
        return[min<<0,max<<0];
       };
      }),_builder_.Delay(function()
      {
       var formlet1,x,tupledArg,height,width;
       formlet1=Controls.Input("");
       x=Enhance.WithTextLabel("from",formlet1);
       tupledArg=Client.getFormSize(30,210);
       height=tupledArg[0];
       width=tupledArg[1];
       return _builder_.Bind(Client.setFormSize(height,width,"input",x),function(_arg1)
       {
        return _builder_.Return(_arg1);
       });
      })),_builder_1.Delay(function()
      {
       var formlet1,x,tupledArg,height,width;
       formlet1=Controls.Input("");
       x=Enhance.WithTextLabel("to",formlet1);
       tupledArg=Client.getFormSize(30,210);
       height=tupledArg[0];
       width=tupledArg[1];
       return _builder_1.Bind(Client.setFormSize(height,width,"input",x),function(_arg2)
       {
        return _builder_1.Return(_arg2);
       });
      }));
      formlet2=Formlet.Horizontal(formlet);
      formlet3=Enhance.WithTextLabel("String range",formlet2);
      formlet4=Enhance.WithLabelAbove(formlet3);
      return Enhance.WithFormContainer(formlet4);
     }),
     ShowImageControl:function(grOption,drawGr)
     {
      var matchValue,src,_,_1,formlet,formlet1,formlet2;
      matchValue=[grOption,drawGr];
      if(matchValue[0].$==1)
       {
        if(matchValue[1])
         {
          matchValue[0].$0;
          _1="graphImg.svg";
         }
        else
         {
          matchValue[0].$0;
          _1="defaultImg.svg";
         }
        _=_1;
       }
      else
       {
        _=matchValue[1]?"defaultImg.svg":"defaultImg.svg";
       }
      src=_;
      formlet=Formlet.OfElement(function()
      {
       var hw,arg10;
       hw="height: "+(Client.getFormSize(355,355))[0]+"; width: "+(Client.getFormSize(355,355))[0];
       arg10=List.ofArray([Attr.Attr().NewAttr("style",hw),Attr.Attr().NewAttr("src",src)]);
       return Tags.Tags().NewTag("img",arg10);
      });
      formlet1=Enhance.WithTextLabel("Graph visualisation",formlet);
      formlet2=Enhance.WithLabelAbove(formlet1);
      return Enhance.WithFormContainer(formlet2);
     },
     frm:Runtime.Field(function()
     {
      var style,x,mapping,list,mapping1,list1,formlet,formlet1,formlet2,inputRecord,buttonConf,x1,InputForm,OutputForm,_builder_1,formlet4;
      style="background-color: #FF1493; border-width: 3px; border-color: #000000; height: "+(Client.getFormSize(40,80))[0]+"; width: "+(Client.getFormSize(40,80))[1]+"; font-size:"+(Client.getFormSize(30,80))[0];
      mapping=function(grmName)
      {
       return[grmName,AjaxRemotingProvider.Sync("YC.BioGraph:1",[{
        $:1
       },grmName])];
      };
      list=AjaxRemotingProvider.Sync("YC.BioGraph:0",[{
       $:1
      }]);
      mapping1=function(grmName)
      {
       return[grmName,AjaxRemotingProvider.Sync("YC.BioGraph:1",[{
        $:0
       },grmName])];
      };
      list1=AjaxRemotingProvider.Sync("YC.BioGraph:0",[{
       $:0
      }]);
      formlet=Controls.Checkbox(false);
      formlet1=Enhance.WithTextLabel("DRAW GRAPH",formlet);
      formlet2=Enhance.WithLabelLeft(formlet1);
      x=Data.$(Data.$(Data.$(Data.$(Formlet.Return(function(grm)
      {
       return function(graph)
       {
        return function(rng)
        {
         return function(drawGr)
         {
          return[grm,graph,rng,drawGr];
         };
        };
       };
      }),Client.InputControl("Grammar",List.map(mapping,list))),Client.InputControl("Graph",List.map(mapping1,list1))),Client.RangeControl()),Enhance.WithFormContainer(formlet2));
      inputRecord=FormButtonConfiguration.get_Default();
      buttonConf=Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"GO"
       },
       Style:{
        $:1,
        $0:style
       },
       Class:inputRecord.Class
      });
      x1=Enhance.WithCustomSubmitButton(buttonConf,x);
      InputForm=Formlet.Vertical(x1);
      OutputForm=function(tupledArg)
      {
       var grm,graph,rng,drawGr,_builder_,formlet3;
       grm=tupledArg[0];
       graph=tupledArg[1];
       rng=tupledArg[2];
       drawGr=tupledArg[3];
       _builder_=Formlet.Do();
       formlet3=_builder_.Delay(function()
       {
        var _arg20_,_arg21_,matchValue,patternInput,_,seqs,grOption,_1,graphOption,txt,seqs1,grOption1;
        _arg20_=rng[0];
        _arg21_=rng[1];
        matchValue=AjaxRemotingProvider.Sync("YC.BioGraph:2",[grm,graph,_arg20_,_arg21_,drawGr]);
        if(matchValue.$==1)
         {
          seqs=matchValue.$1;
          grOption=matchValue.$0;
          if(grOption.$==1)
           {
            graphOption=grOption.$0;
            _1=[{
             $:1,
             $0:graphOption
            },Strings.Join("/n",seqs)];
           }
          else
           {
            _1=[{
             $:0
            },Strings.Join("/n",seqs)];
           }
          _=_1;
         }
        else
         {
          txt=matchValue.$0;
          _=[{
           $:0
          },txt];
         }
        patternInput=_;
        seqs1=patternInput[1];
        grOption1=patternInput[0];
        return _builder_.Bind(Client.ShowImageControl(grOption1,drawGr),function()
        {
         return _builder_.Bind(Client.OutputControl(seqs1),function(_arg2)
         {
          return _builder_.Return(_arg2);
         });
        });
       });
       return Formlet.Vertical(formlet3);
      };
      _builder_1=Formlet.Do();
      formlet4=_builder_1.Delay(function()
      {
       return _builder_1.Bind(InputForm,function(_arg3)
       {
        return _builder_1.Bind(OutputForm(_arg3),function(_arg4)
        {
         return _builder_1.Return([_arg3,_arg4]);
        });
       });
      });
      return Formlet.Horizontal(formlet4);
     }),
     getFormSize:function(height,width)
     {
      var copyOfStruct,copyOfStruct1;
      copyOfStruct=height*Client.screenHeight()/648>>0;
      copyOfStruct1=width*Client.screenWidth()/1366>>0;
      return[String(copyOfStruct)+"px",String(copyOfStruct1)+"px"];
     },
     screenHeight:Runtime.Field(function()
     {
      return jQuery("html").height();
     }),
     screenWidth:Runtime.Field(function()
     {
      return jQuery("html").width();
     }),
     setFormSize:function(height,width,formletType,formlet)
     {
      var f;
      f=function(e)
      {
       jQuery(e.Dom.querySelector(formletType)).css("height",height).css("width",width);
       return e;
      };
      return Formlet.MapElement(f,formlet);
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Formlets=Runtime.Safe(Global.WebSharper.Formlets);
  Formlet=Runtime.Safe(Formlets.Formlet);
  Controls=Runtime.Safe(Formlets.Controls);
  Enhance=Runtime.Safe(Formlets.Enhance);
  YC=Runtime.Safe(Global.YC);
  BioGraph=Runtime.Safe(YC.BioGraph);
  Client=Runtime.Safe(BioGraph.Client);
  Control=Runtime.Safe(Global.WebSharper.Control);
  FSharpEvent=Runtime.Safe(Control.FSharpEvent);
  List=Runtime.Safe(Global.WebSharper.List);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client1=Runtime.Safe(Html.Client);
  Attr=Runtime.Safe(Client1.Attr);
  Tags=Runtime.Safe(Client1.Tags);
  FileReader=Runtime.Safe(Global.FileReader);
  IntelliFactory=Runtime.Safe(Global.IntelliFactory);
  Formlets1=Runtime.Safe(IntelliFactory.Formlets);
  Base=Runtime.Safe(Formlets1.Base);
  Result=Runtime.Safe(Base.Result);
  EventsPervasives=Runtime.Safe(Client1.EventsPervasives);
  T=Runtime.Safe(List.T);
  Data=Runtime.Safe(Formlets.Data);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
  Strings=Runtime.Safe(Global.WebSharper.Strings);
  String=Runtime.Safe(Global.String);
  return jQuery=Runtime.Safe(Global.jQuery);
 });
 Runtime.OnLoad(function()
 {
  Client.screenWidth();
  Client.screenHeight();
  Client.frm();
  Client.RangeControl();
  Client.FileControl();
  return;
 });
}());

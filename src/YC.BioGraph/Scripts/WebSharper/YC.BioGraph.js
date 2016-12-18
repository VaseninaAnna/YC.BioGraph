(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Formlets,Formlet,Controls,Enhance,YC,BioGraph,Client,List,Html,Client1,Attr,Tags,T,Remoting,AjaxRemotingProvider,Data,FormButtonConfiguration,String,jQuery;
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
       return"";
      };
      formlet=Formlet.OfElement(function()
      {
       var arg10;
       arg10=List.ofArray([Attr.Attr().NewAttr("type","file")]);
       return Tags.Tags().NewTag("input",arg10);
      });
      return Formlet.Map(f,formlet);
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
     OutputControl:function(grm,graph,rng,isC)
     {
      var _builder_,formlet;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       var _arg20_,_arg21_,matchValue,text,_,txt,formlet1,formlet2,x,tupledArg,height,width;
       _arg20_=rng[0];
       _arg21_=rng[1];
       matchValue=AjaxRemotingProvider.Sync("YC.BioGraph:3",[grm,graph,_arg20_,_arg21_,isC]);
       if(matchValue.$==0)
        {
         txt=matchValue.$0;
         _=txt;
        }
       else
        {
         _="oK";
        }
       text=_;
       formlet1=Controls.ReadOnlyTextArea(text);
       formlet2=Enhance.WithTextLabel("Output",formlet1);
       x=Enhance.WithLabelAbove(formlet2);
       tupledArg=Client.getFormSize(85,500);
       height=tupledArg[0];
       width=tupledArg[1];
       return _builder_.Bind(Client.setFormSize(height,width,"textarea",x),function(_arg1)
       {
        var formlet3,formlet4;
        formlet3=Controls.Checkbox(false);
        formlet4=Enhance.WithTextLabel("wrap",formlet3);
        return _builder_.Bind(Enhance.WithLabelLeft(formlet4),function()
        {
         return _builder_.Return(_arg1);
        });
       });
      });
      return Enhance.WithFormContainer(formlet);
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
       formlet1=Controls.ReadOnlyInput("0");
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
       formlet1=Controls.ReadOnlyInput("0");
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
     ShowImageControl:Runtime.Field(function()
     {
      var formlet,formlet1,formlet2;
      formlet=Formlet.OfElement(function()
      {
       var hw,arg10;
       hw="height: "+(Client.getFormSize(315,315))[0]+"; width: "+(Client.getFormSize(315,315))[0];
       arg10=List.ofArray([Attr.Attr().NewAttr("style",hw),Attr.Attr().NewAttr("src","graph(kindof).jpg")]);
       return Tags.Tags().NewTag("img",arg10);
      });
      formlet1=Enhance.WithTextLabel("Graph visualisation",formlet);
      formlet2=Enhance.WithLabelAbove(formlet1);
      return Enhance.WithFormContainer(formlet2);
     }),
     frm:Runtime.Field(function()
     {
      var formlet,mapping,list,mapping1,list1,formlet1,formlet2,formlet3,InputForm,OutputForm,style,_builder_1,formlet5,x1,inputRecord,buttonConf;
      mapping=function(grmName)
      {
       return[grmName,AjaxRemotingProvider.Sync("YC.BioGraph:2",[{
        $:1
       },grmName])];
      };
      list=AjaxRemotingProvider.Sync("YC.BioGraph:1",[{
       $:1
      }]);
      mapping1=function(grmName)
      {
       return[grmName,AjaxRemotingProvider.Sync("YC.BioGraph:2",[{
        $:0
       },grmName])];
      };
      list1=AjaxRemotingProvider.Sync("YC.BioGraph:1",[{
       $:0
      }]);
      formlet1=Controls.Checkbox(false);
      formlet2=Enhance.WithTextLabel("DRAW GRAPH",formlet1);
      formlet3=Enhance.WithLabelLeft(formlet2);
      formlet=Data.$(Data.$(Data.$(Data.$(Formlet.Return(function(grm)
      {
       return function(graph)
       {
        return function(rng)
        {
         return function(isC)
         {
          return[grm,graph,rng,isC];
         };
        };
       };
      }),Client.InputControl("Grammar",List.map(mapping,list))),Client.InputControl("Graph",List.map(mapping1,list1))),Client.RangeControl()),Enhance.WithFormContainer(formlet3));
      InputForm=Formlet.Vertical(formlet);
      OutputForm=function(x)
      {
       var _builder_,formlet4;
       _builder_=Formlet.Do();
       formlet4=_builder_.Delay(function()
       {
        return _builder_.Bind(Client.ShowImageControl(),function(_arg1)
        {
         var grm,graph,rng,isC;
         grm=x[0];
         graph=x[1];
         rng=x[2];
         isC=x[3];
         return _builder_.Bind(Client.OutputControl(grm,graph,rng,isC),function(_arg2)
         {
          return _builder_.Return([_arg1,_arg2]);
         });
        });
       });
       return Formlet.Vertical(formlet4);
      };
      style="background-color: #FF1493; border-width: 3px; border-color: #000000; height: "+(Client.getFormSize(40,80))[0]+"; width: "+(Client.getFormSize(40,80))[1]+"; font-size:"+(Client.getFormSize(30,80))[0];
      _builder_1=Formlet.Do();
      formlet5=_builder_1.Delay(function()
      {
       return _builder_1.Bind(InputForm,function(_arg3)
       {
        return _builder_1.Bind(OutputForm(_arg3),function(_arg4)
        {
         return _builder_1.Return([_arg3,_arg4]);
        });
       });
      });
      x1=Formlet.Horizontal(formlet5);
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
      return Enhance.WithCustomSubmitButton(buttonConf,x1);
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
  List=Runtime.Safe(Global.WebSharper.List);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client1=Runtime.Safe(Html.Client);
  Attr=Runtime.Safe(Client1.Attr);
  Tags=Runtime.Safe(Client1.Tags);
  T=Runtime.Safe(List.T);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  Data=Runtime.Safe(Formlets.Data);
  FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
  String=Runtime.Safe(Global.String);
  return jQuery=Runtime.Safe(Global.jQuery);
 });
 Runtime.OnLoad(function()
 {
  Client.screenWidth();
  Client.screenHeight();
  Client.frm();
  Client.ShowImageControl();
  Client.RangeControl();
  Client.FileControl();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Formlets,Formlet,Controls,Enhance,YC,BioGraph,Client,List,Html,Client1,Attr,Tags,Remoting,AjaxRemotingProvider,FormButtonConfiguration,String,jQuery;
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
      return Formlet.OfElement(function()
      {
       var arg10;
       arg10=List.ofArray([Attr.Attr().NewAttr("type","file")]);
       return Tags.Tags().NewTag("input",arg10);
      });
     }),
     InputControl:function(lbl,defaultData)
     {
      var _builder_,formlet,formlet3;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       var formlet1,formlet2,x,tupledArg,height,width;
       formlet1=Controls.TextArea("");
       formlet2=Enhance.WithTextLabel(lbl,formlet1);
       x=Enhance.WithLabelAbove(formlet2);
       tupledArg=Client.getFormSize(85,500);
       height=tupledArg[0];
       width=tupledArg[1];
       return _builder_.Bind(Client.setFormSize(height,width,"textarea",x),function(_arg1)
       {
        return _builder_.Bind(Client.FileControl(),function(_arg2)
        {
         return _builder_.Bind(Client.ChooseDefaultControl(defaultData),function(_arg3)
         {
          return _builder_.Return([_arg1,_arg2,_arg3]);
         });
        });
       });
      });
      formlet3=Formlet.Vertical(formlet);
      return Enhance.WithFormContainer(formlet3);
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
     OutputControl:Runtime.Field(function()
     {
      var _builder_,formlet;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       var formlet1,formlet2,x,tupledArg,height,width;
       formlet1=Controls.ReadOnlyTextArea("");
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
        return _builder_.Bind(Enhance.WithLabelLeft(formlet4),function(_arg2)
        {
         return _builder_.Return([_arg2,_arg1]);
        });
       });
      });
      return Enhance.WithFormContainer(formlet);
     }),
     RangeControl:Runtime.Field(function()
     {
      var _builder_,formlet,formlet3,formlet4,formlet5;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       var formlet1,x,tupledArg,height,width;
       formlet1=Controls.Input("");
       x=Enhance.WithTextLabel("from",formlet1);
       tupledArg=Client.getFormSize(30,210);
       height=tupledArg[0];
       width=tupledArg[1];
       return _builder_.Bind(Client.setFormSize(height,width,"input",x),function(_arg1)
       {
        var formlet2,x1,tupledArg1,height1,width1;
        formlet2=Controls.Input("");
        x1=Enhance.WithTextLabel("to",formlet2);
        tupledArg1=Client.getFormSize(30,210);
        height1=tupledArg1[0];
        width1=tupledArg1[1];
        return _builder_.Bind(Client.setFormSize(height1,width1,"input",x1),function(_arg2)
        {
         return _builder_.Return([_arg1<<0,_arg2<<0]);
        });
       });
      });
      formlet3=Formlet.Horizontal(formlet);
      formlet4=Enhance.WithTextLabel("String range",formlet3);
      formlet5=Enhance.WithLabelAbove(formlet4);
      return Enhance.WithFormContainer(formlet5);
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
      var _builder_,formlet,InputForm,_builder_1,formlet4,OutputForm,style,_builder_2,formlet5,x,inputRecord,buttonConf;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       var mapping,list;
       mapping=function(grmName)
       {
        return[grmName,""];
       };
       list=AjaxRemotingProvider.Sync("YC.BioGraph:1",[{
        $:1
       }]);
       return _builder_.Bind(Client.InputControl("Grammar",List.map(mapping,list)),function(_arg1)
       {
        var mapping1,list1;
        mapping1=function(grmName)
        {
         return[grmName,""];
        };
        list1=AjaxRemotingProvider.Sync("YC.BioGraph:1",[{
         $:0
        }]);
        return _builder_.Bind(Client.InputControl("Graph",List.map(mapping1,list1)),function(_arg2)
        {
         return _builder_.Bind(Client.RangeControl(),function(_arg3)
         {
          var formlet1,formlet2,formlet3;
          formlet1=Controls.Checkbox(false);
          formlet2=Enhance.WithTextLabel("DRAW GRAPH",formlet1);
          formlet3=Enhance.WithLabelLeft(formlet2);
          return _builder_.Bind(Enhance.WithFormContainer(formlet3),function(_arg4)
          {
           return _builder_.Return([_arg1,_arg2,_arg3,_arg4]);
          });
         });
        });
       });
      });
      InputForm=Formlet.Vertical(formlet);
      _builder_1=Formlet.Do();
      formlet4=_builder_1.Delay(function()
      {
       return _builder_1.Bind(Client.ShowImageControl(),function(_arg5)
       {
        return _builder_1.Bind(Client.OutputControl(),function(_arg6)
        {
         return _builder_1.Return([_arg5,_arg6]);
        });
       });
      });
      OutputForm=Formlet.Vertical(formlet4);
      style="background-color: #FF1493; border-width: 3px; border-color: #000000; height: "+(Client.getFormSize(40,80))[0]+"; width: "+(Client.getFormSize(40,80))[1]+"; font-size:"+(Client.getFormSize(30,80))[0];
      _builder_2=Formlet.Do();
      formlet5=_builder_2.Delay(function()
      {
       return _builder_2.Bind(InputForm,function(_arg7)
       {
        return _builder_2.Bind(OutputForm,function(_arg8)
        {
         return _builder_2.Return([_arg7,_arg8]);
        });
       });
      });
      x=Formlet.Horizontal(formlet5);
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
      return Enhance.WithCustomSubmitButton(buttonConf,x);
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
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
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
  Client.OutputControl();
  Client.FileControl();
  return;
 });
}());

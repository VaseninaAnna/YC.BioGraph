(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Formlets,Formlet,List,Html,Client,Attr,Tags,T,Enhance,Controls,YC,BioGraph,Client1,Data,FormButtonConfiguration,jQuery;
 Runtime.Define(Global,{
  YC:{
   BioGraph:{
    Client:{
     ChooseDefaultControl:Runtime.Field(function()
     {
      var _builder_,formlet,formlet1;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       return _builder_.Bind(Formlet.OfElement(function()
       {
        var arg10;
        arg10=List.ofArray([Attr.Attr().NewAttr("type","button"),Attr.Attr().NewAttr("value","Choose default"),Attr.Attr().NewAttr("style","color: #000000")]);
        return Tags.Tags().NewTag("input",arg10);
       }),function(_arg1)
       {
        return _builder_.Bind(Formlet.OfElement(function()
        {
         var arg10;
         arg10=Runtime.New(T,{
          $:0
         });
         return Tags.Tags().NewTag("select",arg10);
        }),function(_arg2)
        {
         return _builder_.Return([_arg1,_arg2]);
        });
       });
      });
      formlet1=Formlet.Horizontal(formlet);
      return Enhance.WithFormContainer(formlet1);
     }),
     FileControl:Runtime.Field(function()
     {
      return Formlet.OfElement(function()
      {
       var arg10;
       arg10=List.ofArray([Attr.Attr().NewAttr("type","file"),Attr.Attr().NewAttr("lang","en")]);
       return Tags.Tags().NewTag("input",arg10);
      });
     }),
     InputControl:function(lbl)
     {
      var _builder_,formlet,formlet4;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       var formlet1,formlet2,formlet3;
       formlet1=Controls.TextArea("");
       formlet2=Enhance.WithTextLabel(lbl,formlet1);
       formlet3=Enhance.WithLabelAbove(formlet2);
       return _builder_.Bind(Client1.setFormSize("100px","500px","textarea",formlet3),function(_arg1)
       {
        return _builder_.Bind(Client1.FileControl(),function(_arg2)
        {
         return _builder_.Bind(Client1.ChooseDefaultControl(),function(_arg3)
         {
          return _builder_.Return([_arg1,_arg2,_arg3]);
         });
        });
       });
      });
      formlet4=Formlet.Vertical(formlet);
      return Enhance.WithFormContainer(formlet4);
     },
     Main:function()
     {
      var arg10;
      arg10=List.ofArray([Client1.frm().Run(function()
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
       var formlet1,formlet2,formlet3;
       formlet1=Controls.ReadOnlyTextArea("");
       formlet2=Enhance.WithTextLabel("Output",formlet1);
       formlet3=Enhance.WithLabelAbove(formlet2);
       return _builder_.Bind(Client1.setFormSize("220px","600px","textarea",formlet3),function(_arg1)
       {
        var formlet4,formlet5;
        formlet4=Controls.Checkbox(false);
        formlet5=Enhance.WithTextLabel("wrap",formlet4);
        return _builder_.Bind(Enhance.WithLabelLeft(formlet5),function(_arg2)
        {
         return _builder_.Return([_arg2,_arg1]);
        });
       });
      });
      return Enhance.WithFormContainer(formlet);
     }),
     RangeControl:Runtime.Field(function()
     {
      var _builder_,formlet,formlet5,formlet6,formlet7;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       var formlet1,x,formlet2;
       formlet1=Controls.Input("1");
       x=Enhance.WithTextLabel("from",formlet1);
       formlet2=(Data.Validator().IsInt("Enter numericr value"))(x);
       return _builder_.Bind(Client1.setFormSize("30px","210px","input",formlet2),function(_arg1)
       {
        var formlet3,x1,formlet4;
        formlet3=Controls.Input("5");
        x1=Enhance.WithTextLabel("to",formlet3);
        formlet4=(Data.Validator().IsInt("Enter numericr value"))(x1);
        return _builder_.Bind(Client1.setFormSize("30px","210px","input",formlet4),function(_arg2)
        {
         return _builder_.Return([_arg1<<0,_arg2<<0]);
        });
       });
      });
      formlet5=Formlet.Horizontal(formlet);
      formlet6=Enhance.WithTextLabel("String range",formlet5);
      formlet7=Enhance.WithLabelAbove(formlet6);
      return Enhance.WithFormContainer(formlet7);
     }),
     ShowImageControl:Runtime.Field(function()
     {
      var formlet,formlet1,formlet2;
      formlet=Formlet.OfElement(function()
      {
       var arg10;
       arg10=List.ofArray([Attr.Attr().NewAttr("style","height: 220px; width: 330px"),Attr.Attr().NewAttr("src","graph(kindof).jpg"),Attr.Attr().NewAttr("border","4px")]);
       return Tags.Tags().NewTag("img",arg10);
      });
      formlet1=Enhance.WithTextLabel("Graph visualisation",formlet);
      formlet2=Enhance.WithLabelAbove(formlet1);
      return Enhance.WithFormContainer(formlet2);
     }),
     frm:Runtime.Field(function()
     {
      var _builder_,formlet,InputForm,_builder_1,formlet4,OutputForm,_builder_2,formlet5,x,inputRecord,buttonConf;
      _builder_=Formlet.Do();
      formlet=_builder_.Delay(function()
      {
       return _builder_.Bind(Client1.InputControl("Grammar"),function(_arg1)
       {
        return _builder_.Bind(Client1.InputControl("Graph"),function(_arg2)
        {
         return _builder_.Bind(Client1.RangeControl(),function(_arg3)
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
       return _builder_1.Bind(Client1.ShowImageControl(),function(_arg5)
       {
        return _builder_1.Bind(Client1.OutputControl(),function(_arg6)
        {
         return _builder_1.Return([_arg5,_arg6]);
        });
       });
      });
      OutputForm=Formlet.Vertical(formlet4);
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
        $0:"background-color: #FF1493; font-size: 30px; height: 40px; width: 80px; border-width: 3px; border-color: #000000"
       },
       Class:inputRecord.Class
      });
      return Enhance.WithCustomSubmitButton(buttonConf,x);
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
  List=Runtime.Safe(Global.WebSharper.List);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  T=Runtime.Safe(List.T);
  Enhance=Runtime.Safe(Formlets.Enhance);
  Controls=Runtime.Safe(Formlets.Controls);
  YC=Runtime.Safe(Global.YC);
  BioGraph=Runtime.Safe(YC.BioGraph);
  Client1=Runtime.Safe(BioGraph.Client);
  Data=Runtime.Safe(Formlets.Data);
  FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
  return jQuery=Runtime.Safe(Global.jQuery);
 });
 Runtime.OnLoad(function()
 {
  Client1.frm();
  Client1.ShowImageControl();
  Client1.RangeControl();
  Client1.OutputControl();
  Client1.FileControl();
  Client1.ChooseDefaultControl();
  return;
 });
}());

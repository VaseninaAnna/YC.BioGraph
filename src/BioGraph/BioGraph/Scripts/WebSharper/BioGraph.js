(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Formlets,Formlet,List,Html,Client,Tags,Attr,jQuery,Controls,Enhance,BioGraph,Client1,Data,FormButtonConfiguration;
 Runtime.Define(Global,{
  BioGraph:{
   Client:{
    ButtonControl:Runtime.Field(function()
    {
     return Formlet.OfElement(function()
     {
      var arg10;
      arg10=List.ofArray([Tags.Tags().text("Choose default")]);
      return Tags.Tags().NewTag("button",arg10);
     });
    }),
    FileControl:Runtime.Field(function()
    {
     return Formlet.OfElement(function()
     {
      var arg10;
      arg10=List.ofArray([Attr.Attr().NewAttr("type","file")]);
      return Tags.Tags().NewTag("input",arg10);
     });
    }),
    InputControl:function(lbl)
    {
     var _builder_,formlet,formlet4;
     _builder_=Formlet.Do();
     formlet=_builder_.Delay(function()
     {
      var f,formlet1,formlet2,formlet3;
      f=function(e)
      {
       jQuery(e.Dom.querySelector("textarea")).css("height","200px").css("width","500px");
       return e;
      };
      formlet1=Controls.TextArea("");
      formlet2=Enhance.WithTextLabel(lbl,formlet1);
      formlet3=Enhance.WithLabelAbove(formlet2);
      return _builder_.Bind(Formlet.MapElement(f,formlet3),function(_arg1)
      {
       return _builder_.Bind(Client1.FileControl(),function(_arg2)
       {
        return _builder_.Bind(Client1.ButtonControl(),function(_arg3)
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
    OutputControl:function(lbl)
    {
     var _builder_,formlet;
     _builder_=Formlet.Do();
     formlet=_builder_.Delay(function()
     {
      var f,formlet1,formlet2,formlet3;
      f=function(e)
      {
       jQuery(e.Dom.querySelector("textarea")).css("height","300px").css("width","500px");
       return e;
      };
      formlet1=Controls.ReadOnlyTextArea("");
      formlet2=Enhance.WithTextLabel(lbl,formlet1);
      formlet3=Enhance.WithLabelAbove(formlet2);
      return _builder_.Bind(Formlet.MapElement(f,formlet3),function(_arg1)
      {
       return _builder_.Return(_arg1);
      });
     });
     return Enhance.WithFormContainer(formlet);
    },
    RangeControl:Runtime.Field(function()
    {
     var _builder_,formlet,formlet3,formlet4,formlet5;
     _builder_=Formlet.Do();
     formlet=_builder_.Delay(function()
     {
      var formlet1,x;
      formlet1=Controls.Input("1");
      x=Enhance.WithTextLabel("from",formlet1);
      return _builder_.Bind((Data.Validator().IsInt("Enter numericr value"))(x),function(_arg1)
      {
       var formlet2,x1;
       formlet2=Controls.Input("5");
       x1=Enhance.WithTextLabel("to",formlet2);
       return _builder_.Bind((Data.Validator().IsInt("Enter numericr value"))(x1),function(_arg2)
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
    frm:Runtime.Field(function()
    {
     var _builder_,formlet,InputForm,_builder_1,formlet3,OutputForm,_builder_2,formlet4,x,inputRecord,buttonConf;
     _builder_=Formlet.Do();
     formlet=_builder_.Delay(function()
     {
      return _builder_.Bind(Client1.InputControl("Grammar"),function(_arg1)
      {
       return _builder_.Bind(Client1.InputControl("Graph"),function(_arg2)
       {
        return _builder_.Bind(Client1.RangeControl(),function(_arg3)
        {
         var formlet1,formlet2;
         formlet1=Controls.Checkbox(false);
         formlet2=Enhance.WithTextLabel("DRAW GRAPH",formlet1);
         return _builder_.Bind(Enhance.WithLabelLeft(formlet2),function(_arg4)
         {
          return _builder_.Return([_arg1,_arg2,_arg3,_arg4]);
         });
        });
       });
      });
     });
     InputForm=Formlet.Vertical(formlet);
     _builder_1=Formlet.Do();
     formlet3=_builder_1.Delay(function()
     {
      return _builder_1.Bind(Client1.OutputControl("Graph visualisation","image"),function(_arg5)
      {
       return _builder_1.Bind(Client1.OutputControl("Output","text"),function(_arg6)
       {
        return _builder_1.Return([_arg5,_arg6]);
       });
      });
     });
     OutputForm=Formlet.Vertical(formlet3);
     _builder_2=Formlet.Do();
     formlet4=_builder_2.Delay(function()
     {
      return _builder_2.Bind(InputForm,function(_arg7)
      {
       return _builder_2.Bind(OutputForm,function(_arg8)
       {
        return _builder_2.Return([_arg7,_arg8]);
       });
      });
     });
     x=Formlet.Horizontal(formlet4);
     inputRecord=FormButtonConfiguration.get_Default();
     buttonConf=Runtime.New(FormButtonConfiguration,{
      Label:{
       $:1,
       $0:"GO"
      },
      Style:{
       $:1,
       $0:"background-color: #FF1493;font-size: 40px"
      },
      Class:inputRecord.Class
     });
     return Enhance.WithCustomSubmitButton(buttonConf,x);
    })
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
  Tags=Runtime.Safe(Client.Tags);
  Attr=Runtime.Safe(Client.Attr);
  jQuery=Runtime.Safe(Global.jQuery);
  Controls=Runtime.Safe(Formlets.Controls);
  Enhance=Runtime.Safe(Formlets.Enhance);
  BioGraph=Runtime.Safe(Global.BioGraph);
  Client1=Runtime.Safe(BioGraph.Client);
  Data=Runtime.Safe(Formlets.Data);
  return FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
 });
 Runtime.OnLoad(function()
 {
  Client1.frm();
  Client1.RangeControl();
  Client1.FileControl();
  Client1.ButtonControl();
  return;
 });
}());

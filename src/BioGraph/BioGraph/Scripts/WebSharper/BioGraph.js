(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Control,FSharpEvent,List,Html,Client,Attr,Tags,IntelliFactory,Formlets,Base,Result,EventsPervasives,Formlets1,Formlet,BioGraph,Client1,Controls,Enhance,Data,jQuery,FormContainerConfiguration,FormButtonConfiguration;
 Runtime.Define(Global,{
  BioGraph:{
   Client:{
    FileControl:Runtime.Field(function()
    {
     var f,formlet;
     f=function()
     {
      var stateChanged,x,x1,arg00,input,reset;
      stateChanged=FSharpEvent.New();
      x=List.ofArray([Attr.Attr().NewAttr("type","file")]);
      x1=Tags.Tags().NewTag("input",x);
      arg00=function(el)
      {
       return function()
       {
        return stateChanged.event.Trigger(Runtime.New(Result,{
         $:0,
         $0:el.get_Value()
        }));
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
    Main:function()
    {
     var arg10;
     arg10=List.ofArray([Client1.frm().Run(function()
     {
      return null;
     })]);
     return Tags.Tags().NewTag("div",arg10);
    },
    frm:Runtime.Field(function()
    {
     var _builder_,fileForm,_builder_1,formlet,formlet3,formlet4,RangeForm,input,_builder_2,formlet6,x2,inputRecord,CssClass,fc,InputForm,_builder_3,formlet7,x3,inputRecord2,CssClass2,fc2,OutputForm,_builder_4,formleta,x4,inputRecord3,buttonConf;
     _builder_=Formlet.Do();
     fileForm=_builder_.Delay(function()
     {
      return _builder_.Bind(Client1.FileControl(),function(_arg1)
      {
       return _builder_.Return(_arg1);
      });
     });
     _builder_1=Formlet.Do();
     formlet=_builder_1.Delay(function()
     {
      var formlet1,x;
      formlet1=Controls.Input("1");
      x=Enhance.WithTextLabel("from   ",formlet1);
      return _builder_1.Bind((Data.Validator().IsInt("Enter numericr value"))(x),function(_arg2)
      {
       var formlet2,x1;
       formlet2=Controls.Input("5");
       x1=Enhance.WithTextLabel("to   ",formlet2);
       return _builder_1.Bind((Data.Validator().IsInt("Enter numericr value"))(x1),function(_arg3)
       {
        return _builder_1.Return([_arg2<<0,_arg3<<0]);
       });
      });
     });
     formlet3=Formlet.Horizontal(formlet);
     formlet4=Enhance.WithTextLabel("String range",formlet3);
     RangeForm=Enhance.WithLabelAbove(formlet4);
     input=function(lbl)
     {
      var f,formlet1,formlet2,formlet5;
      f=function(e)
      {
       jQuery(e.Dom.querySelector("textarea")).css("height","200px").css("width","500px");
       return e;
      };
      formlet1=Controls.TextArea("");
      formlet2=Enhance.WithTextLabel(lbl,formlet1);
      formlet5=Enhance.WithLabelAbove(formlet2);
      return Formlet.MapElement(f,formlet5);
     };
     _builder_2=Formlet.Do();
     formlet6=_builder_2.Delay(function()
     {
      return _builder_2.Bind(input("Grammar"),function(_arg4)
      {
       return _builder_2.Bind(fileForm,function(_arg5)
       {
        return _builder_2.Bind(input("Graph"),function(_arg6)
        {
         return _builder_2.Bind(fileForm,function(_arg7)
         {
          return _builder_2.Bind(RangeForm,function(_arg8)
          {
           var formlet1,formlet2;
           formlet1=Controls.Checkbox(false);
           formlet2=Enhance.WithTextLabel("DRAW GRAPH",formlet1);
           return _builder_2.Bind(Enhance.WithLabelLeft(formlet2),function(_arg9)
           {
            return _builder_2.Return([_arg4,_arg5,_arg6,_arg7,_arg8,_arg9]);
           });
          });
         });
        });
       });
      });
     });
     x2=Formlet.Vertical(formlet6);
     inputRecord=FormContainerConfiguration.get_Default();
     CssClass={
      $:1,
      $0:"totop"
     };
     fc=Runtime.New(FormContainerConfiguration,{
      Header:inputRecord.Header,
      Padding:inputRecord.Padding,
      Description:inputRecord.Description,
      BackgroundColor:inputRecord.BackgroundColor,
      BorderColor:inputRecord.BorderColor,
      CssClass:CssClass,
      Style:inputRecord.Style
     });
     InputForm=Enhance.WithCustomFormContainer(fc,x2);
     _builder_3=Formlet.Do();
     formlet7=_builder_3.Delay(function()
     {
      var f,formlet1,formlet2,formlet5;
      f=function(e)
      {
       jQuery(e.Dom.querySelector("textarea")).css("height","200px").css("width","500px");
       return e;
      };
      formlet1=Controls.ReadOnlyTextArea("");
      formlet2=Enhance.WithTextLabel("Graph visualisation",formlet1);
      formlet5=Enhance.WithLabelAbove(formlet2);
      return _builder_3.Bind(Formlet.MapElement(f,formlet5),function(_arg10)
      {
       var formlet8,formlet9,x,inputRecord1,CssClass1,fc1,x1,f1;
       formlet8=Controls.ReadOnlyTextArea("");
       formlet9=Enhance.WithTextLabel("Output",formlet8);
       x=Enhance.WithLabelAbove(formlet9);
       inputRecord1=FormContainerConfiguration.get_Default();
       CssClass1={
        $:1,
        $0:"totop"
       };
       fc1=Runtime.New(FormContainerConfiguration,{
        Header:inputRecord1.Header,
        Padding:inputRecord1.Padding,
        Description:inputRecord1.Description,
        BackgroundColor:inputRecord1.BackgroundColor,
        BorderColor:inputRecord1.BorderColor,
        CssClass:CssClass1,
        Style:inputRecord1.Style
       });
       x1=Enhance.WithCustomFormContainer(fc1,x);
       f1=function(e)
       {
        jQuery(e.Dom.querySelector("textarea")).css("height","200px").css("width","500px");
        return e;
       };
       return _builder_3.Bind(Formlet.MapElement(f1,x1),function(_arg11)
       {
        return _builder_3.Return([_arg10,_arg11]);
       });
      });
     });
     x3=Formlet.Vertical(formlet7);
     inputRecord2=FormContainerConfiguration.get_Default();
     CssClass2={
      $:1,
      $0:"totop"
     };
     fc2=Runtime.New(FormContainerConfiguration,{
      Header:inputRecord2.Header,
      Padding:inputRecord2.Padding,
      Description:inputRecord2.Description,
      BackgroundColor:inputRecord2.BackgroundColor,
      BorderColor:inputRecord2.BorderColor,
      CssClass:CssClass2,
      Style:inputRecord2.Style
     });
     OutputForm=Enhance.WithCustomFormContainer(fc2,x3);
     _builder_4=Formlet.Do();
     formleta=_builder_4.Delay(function()
     {
      return _builder_4.Bind(InputForm,function(_arg12)
      {
       return _builder_4.Bind(OutputForm,function(_arg13)
       {
        return _builder_4.Return([_arg12,_arg13]);
       });
      });
     });
     x4=Formlet.Horizontal(formleta);
     inputRecord3=FormButtonConfiguration.get_Default();
     buttonConf=Runtime.New(FormButtonConfiguration,{
      Label:{
       $:1,
       $0:"GO"
      },
      Style:{
       $:1,
       $0:"background-color: #FF1493;font-size: 40px"
      },
      Class:inputRecord3.Class
     });
     return Enhance.WithCustomSubmitButton(buttonConf,x4);
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  Control=Runtime.Safe(Global.WebSharper.Control);
  FSharpEvent=Runtime.Safe(Control.FSharpEvent);
  List=Runtime.Safe(Global.WebSharper.List);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  IntelliFactory=Runtime.Safe(Global.IntelliFactory);
  Formlets=Runtime.Safe(IntelliFactory.Formlets);
  Base=Runtime.Safe(Formlets.Base);
  Result=Runtime.Safe(Base.Result);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  Formlets1=Runtime.Safe(Global.WebSharper.Formlets);
  Formlet=Runtime.Safe(Formlets1.Formlet);
  BioGraph=Runtime.Safe(Global.BioGraph);
  Client1=Runtime.Safe(BioGraph.Client);
  Controls=Runtime.Safe(Formlets1.Controls);
  Enhance=Runtime.Safe(Formlets1.Enhance);
  Data=Runtime.Safe(Formlets1.Data);
  jQuery=Runtime.Safe(Global.jQuery);
  FormContainerConfiguration=Runtime.Safe(Enhance.FormContainerConfiguration);
  return FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
 });
 Runtime.OnLoad(function()
 {
  Client1.frm();
  Client1.FileControl();
  return;
 });
}());

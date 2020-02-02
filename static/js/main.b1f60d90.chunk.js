(this.webpackJsonpworkoutapp=this.webpackJsonpworkoutapp||[]).push([[0],{38:function(e,t,a){e.exports=a.p+"static/media/logo.9374f98a.jpg"},41:function(e,t,a){e.exports=a(71)},46:function(e,t,a){},48:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(19),r=a.n(l),c=(a(46),a(47),a(7)),i=a(8),s=a(10),u=a(9),h=a(11),m=a(13),p=a(15),d=(a(48),a(18)),b=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"NavBar"},o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(d.b,{to:"/"},"Workouts")),o.a.createElement("li",null,o.a.createElement(d.b,{to:"/create"},"Create Exercise"))))}}]),t}(n.Component),v=a(38),E=a.n(v),f=a(20),k=a.n(f),y=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={bodyPart:"Chest"},a.handleBodyPartChange=a.handleBodyPartChange.bind(Object(m.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"handleBodyPartChange",value:function(e){this.setState({bodyPart:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a="http://localhost:8080/workouts/type/"+this.state.bodyPart;k.a.get(a).then((function(e){var a=e.data;t.props.history.push("/Workoutplan",{workout:a})}))}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(b,null),o.a.createElement("div",{className:"card  w-75"},o.a.createElement("h2",null," Workout Routine "),o.a.createElement("img",{src:E.a,alt:"Logo",width:"100",height:"100",className:"Image"}),o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("label",{htmlFor:"bodyPart"}," Body part to workout today: "),o.a.createElement("br",null),o.a.createElement("div",{className:"col-3"},o.a.createElement("select",{className:"form-control",value:this.state.bodyPart,onChange:this.handleBodyPartChange},o.a.createElement("option",{value:"Chest"},"Chest"),o.a.createElement("option",{value:"Arms"},"Arms"),o.a.createElement("option",{value:"Legs"},"Legs"),o.a.createElement("option",{value:"Back"},"Back"),o.a.createElement("option",{value:"Abs"},"Abs"),o.a.createElement("option",{value:"Cardio"},"Cardio")),o.a.createElement("br",null)),o.a.createElement("p",null,o.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Generate Workout")))))}}]),t}(n.Component),g=Object(p.e)(y),C=a(74),w=a(75),j=a(76),O=function(e){function t(e){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).call(this,e))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(C.a,null,o.a.createElement(w.a,{className:"card  w-75"},o.a.createElement(w.a.Header,null,o.a.createElement(C.a.Toggle,{as:j.a,variant:"link",eventKey:"0"},o.a.createElement("h4",null," ",this.props.title," "))),o.a.createElement(C.a.Collapse,{eventKey:"0"},o.a.createElement(w.a.Body,null,this.props.text,o.a.createElement("br",null),o.a.createElement("video",{width:"350",controls:!0},o.a.createElement("source",{src:"http://localhost:8080/api/v1/workout-video/workoutVideo/download?workoutId=".concat(this.props.id),type:"video/mp4"}),"Your browser does not support HTML5 video."))))))}}]),t}(n.Component),N=function(e){function t(e){var a;Object(c.a)(this,t);for(var n=(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).props.history.location.state.workout,o=[],l=[],r=[],i=[],h=[],m=0;m<n.length;m++)o.push(n[m].id),l.push(n[m].workoutName),r.push(n[m].workoutDescription),i.push(n[m].workoutType),h.push(n[m].workoutUrl);return a.state={workoutId:o,workoutName:l,workoutDescription:r,workoutType:i,workoutUrl:h},console.log(a.state),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement(b,null),this.state.workoutName.map((function(t,a){return o.a.createElement(O,{title:e.state.workoutName[a],text:e.state.workoutDescription[a],id:e.state.workoutId[a],key:a})})))}}]),t}(n.Component),T=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={files:null,title:"",type:"",description:""},a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a.handleChangeFile=a.handleChangeFile.bind(Object(m.a)(a)),a.handleChangeTitle=a.handleChangeTitle.bind(Object(m.a)(a)),a.handleChangeType=a.handleChangeType.bind(Object(m.a)(a)),a.handleChangeDescription=a.handleChangeDescription.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault(),console.log("File submitted and data submitted");var t={workoutName:this.state.title,workoutDescription:this.state.description,workoutType:this.state.type,workoutUrl:this.state.files.name};k()({method:"post",url:"http://localhost:8080/workout",data:t,headers:{"Content-Type":"application/json"}}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}));var a=new FormData;a.append("file",this.state.files),k()({method:"post",url:"http://localhost:8080/api/v1/workout-video/workoutVideo/upload",data:a,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}},{key:"handleChangeFile",value:function(e){var t=e.target.files;console.log(t),this.setState({files:t[0]})}},{key:"handleChangeTitle",value:function(e){this.setState({title:e.target.value})}},{key:"handleChangeType",value:function(e){this.setState({type:e.target.value})}},{key:"handleChangeDescription",value:function(e){this.setState({description:e.target.value})}},{key:"render",value:function(){return o.a.createElement("div",{className:"Create"},o.a.createElement(b,null),o.a.createElement("div",{className:"card w-75"},o.a.createElement("h2",null," Create an exercise "),o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("br",null),o.a.createElement("div",{className:"col-5"},o.a.createElement("input",{type:"text",className:"form-control",placeholder:"Title",onChange:this.handleChangeTitle})),o.a.createElement("br",null),o.a.createElement("div",{className:"col-12"},o.a.createElement("input",{type:"text",className:"form-control",placeholder:"Description",onChange:this.handleChangeDescription})),o.a.createElement("br",null),o.a.createElement("div",{className:"col-5"},o.a.createElement("select",{className:"form-control",value:this.state.type,onChange:this.handleChangeType},o.a.createElement("option",{disabled:!0,value:""},"Bodypart to choose..."),o.a.createElement("option",{value:"Chest"},"Chest"),o.a.createElement("option",{value:"Arms"},"Arms"),o.a.createElement("option",{value:"Legs"},"Legs"),o.a.createElement("option",{value:"Back"},"Back"),o.a.createElement("option",{value:"Abs"},"Abs"),o.a.createElement("option",{value:"Cardio"},"Cardio"))),o.a.createElement("br",null),o.a.createElement("div",{className:"col-12"},o.a.createElement("small",{id:"fileDescription",className:"form-text text-muted"},"Choose a video that is less than 100 mb"),o.a.createElement("input",{type:"file",onChange:this.handleChangeFile,className:"form-control-file"})),o.a.createElement("p",null,o.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Create")))))}}]),t}(o.a.Component),S=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(d.a,null,o.a.createElement(p.a,{exact:!0,path:"/",component:g}),o.a.createElement(p.a,{path:"/Create",component:T}),o.a.createElement(p.a,{path:"/Workoutplan",component:N}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[41,1,2]]]);
//# sourceMappingURL=main.b1f60d90.chunk.js.map
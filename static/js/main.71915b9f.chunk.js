(this.webpackJsonpyoruba=this.webpackJsonpyoruba||[]).push([[0],[,,,,,,function(e){e.exports=JSON.parse('{"a":[{"title":"Greeting","limit":{"lesson":18,"lessons":["Greetings in Yoruba langauge","Good Morning","Hope you wake up well","Hope you wake up well","Thank God","Good afternoon","How are you","Good evening(sunset)","Good evening","Good bye","Good night","Greeting someone at home","Your welcome","Did I meet you well","I meat you well","Well done","Thank you","You are well seated","Hello"]}},{"title":"Introducing yourself","limit":{"lesson":31,"lessons":["Introducing oneself in Yoruba langauge","What is your name","My name is Remi Olaniyan","Nice to meet you","Where are you from","I am from Oyo state","Where do you live","I live in London","What do you do for a living","I am a teacher","I am a student","I am working in a company","How old are you","I am 33 years old","Which food do you like best","I like pounded yam and okro soup","Where are you going","I am going home","I am going to the market","I am going to my workplace","I am going to the mosque","Where are you","I am at home","I am in the office","I am in the market","What are you doing","I am resting","I am eating","I am sleeping","I am praying","I am reading"]}},{"title":"Step 2","limit":{"lesson":10,"lessons":["Action in Yoruba language","Sit down","Stand up","Get out","I am going out","Give me water","Give me a chair","I want to go and sleep","I want to eat","Give me a plate and spoon","I want to lay my bed","I am going up the stairs","I am going down stairs","Solving a misunderstanding in Yoruba language","Forgive me please","I won\'t do that again","It won\'t repeat itself","I am sorry","Sorry for a wrong or mistake","No problem","please","Can you repeat please","Can you speak slowly","Do you understand what I said","I don\'t understand","I don\'t know","Can you write it down"]}}]}')},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,c){},function(e,t,c){},,function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},,,,function(e,t,c){},,,function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){},function(e,t,c){"use strict";c.r(t);var a=c(1),n=c.n(a),r=c(18),o=c.n(r),s=(c(36),c(3)),i=(c(37),c(6)),l=c(2),u=function(e){var t=e.lecture,c=(e.type,e.exercise),n=Object(a.useState)(1),r=Object(s.a)(n,2),o=r[0],i=r[1];return Object(l.jsx)("div",{className:"type",children:Object(l.jsxs)("div",{className:"sound-control",children:[Object(l.jsx)("audio",{className:"audio-setting",src:"./files/lecture".concat(t,"/").concat(c,".m4a"),controls:!0}),Object(l.jsxs)("div",{className:"range",children:[Object(l.jsx)("input",{type:"range",id:"volume",value:o,onChange:function(e){return i(e.target.value)},min:.1,max:1,step:.1}),Object(l.jsxs)("label",{htmlFor:"volume",children:["Speed ",(1*o).toFixed(1)]})]})]})})},d=(c(39),function(e){var t=e.active,c=e.auto,a=e.setAuto,n=e.random,r=e.setRandom;return Object(l.jsxs)("div",{className:"menu",children:[Object(l.jsx)("button",{className:"btn",style:t(n,!0),onClick:function(){return r(!n)},children:"Random"}),Object(l.jsx)("div",{className:"btn",onClick:function(){return a("Auto"===c?"Manual":"Auto")},children:c})]})}),j=(c(40),function(e){var t=e.lecture,c=e.exercise,n=e.setExercise,r=e.limit,o=e.type,i=e.auto,u=e.random,d=Object(a.useState)(),j=Object(s.a)(d,2),b=j[0],m=j[1];Object(a.useEffect)((function(){if("Auto"===i){null===b||void 0===b||b.pause(),console.log({exercise:c,lecture:t});var e=new Audio("files/lecture".concat(t,"/").concat(c,".m4a"));e.play(),m(e)}}),[c,t,o]);var g=function(e,t){return u?Math.ceil(Math.random()*r):e+t};return Object(l.jsxs)("div",{className:"slider",children:[Object(l.jsx)("button",{className:"switch",disabled:!u&&c<2,onClick:function(){return n((function(e){return g(e,-1)}))}}),Object(l.jsx)("div",{className:"slider__img",style:{backgroundImage:"url(./img/lecture".concat(t,"/").concat(c,".jpg)")}}),Object(l.jsx)("button",{className:"switch switch--next",disabled:!u&&c>r-1,onClick:function(){return n((function(e){return g(e,1)}))}})]})}),b=function(e){var t=e.lecture,c=e.exercise,n=e.setExercise,r=e.type,o=Object(a.useState)("Auto"),b=Object(s.a)(o,2),m=b[0],g=b[1],O=Object(a.useState)(!1),f=Object(s.a)(O,2),h=f[0],x=f[1],v=i.a[t-1].limit.lessons.length,p=Object(a.useState)(v),y=Object(s.a)(p,2),N=y[0],S=y[1];Object(a.useEffect)((function(){n(1),S(i.a[t].limit[r])}),[t,r]);return Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"title",children:i.a[t].title}),Object(l.jsx)(u,{lecture:t,type:r,exercise:c}),Object(l.jsx)(j,{lecture:t,exercise:c,setExercise:n,limit:N,type:r,auto:m,random:h}),Object(l.jsx)(d,{active:function(e,t){if(e===t)return{fontWeight:700,boxShadow:"0 .125rem 0 0 #00000026",transform:"translateY(1px)",borderWidth:"2px"}},auto:m,setAuto:g,rando:h,setRandom:x}),Object(l.jsxs)("p",{className:"progress",children:[c,"/",N]})]})},m=c(14),g=c(5),O=c(30),f=c(31),h=c(21),x=(c(41),["className","Component","percentage"]),v=function(e){var t=e.className,c=e.Component,a=e.percentage,n=void 0===a?0:a,r=Object(f.a)(e,x),o="rgb(180, 107, 83)",s="rgb(102, 72, 62)",i={top:{backgroundImage:"linear-gradient(to right, ".concat(o," 0%, ").concat(s," 0%)")},right:{backgroundImage:"linear-gradient(to bottom, ".concat(o," 0%, ").concat(s," 0%)")},bottom:{backgroundImage:"linear-gradient(to left, ".concat(o," 0%, ").concat(s," 0%)")},left:{backgroundImage:"linear-gradient(to top, ".concat(o," 0%, ").concat(s," 0%)")}};return n<12.5?i.top.backgroundImage="linear-gradient(to right, ".concat(s," 50%, ").concat(o," 50%, ").concat(o," ").concat(50+4*n,"%, ").concat(s," ").concat(50+4*n,"%)"):n<37.5?(i.top.backgroundImage="linear-gradient(to right, ".concat(s," 50%, ").concat(o," 50%)"),i.right.backgroundImage="linear-gradient(to bottom, ".concat(o," ").concat(4*(n-12.5),"%, ").concat(s," ").concat(4*(n-12.5),"%)")):n<62.5?(i.top.backgroundImage="linear-gradient(to right, ".concat(s," 50%, ").concat(o," 50%)"),i.right.backgroundImage="linear-gradient(to bottom, ".concat(o," 100%, ").concat(s," 100%)"),i.bottom.backgroundImage="linear-gradient(to left, ".concat(o," ").concat(4*(n-37.5),"%, ").concat(s," ").concat(4*(n-37.5),"%)")):n<87.5?(i.top.backgroundImage="linear-gradient(to right, ".concat(s," 50%, ").concat(o," 50%)"),i.right.backgroundImage="linear-gradient(to bottom, ".concat(o," 100%, ").concat(s," 100%)"),i.bottom.backgroundImage="linear-gradient(to left, ".concat(o," 100%, ").concat(s," 100%)"),i.left.backgroundImage="linear-gradient(to top, ".concat(o," ").concat(4*(n-62.5),"%, ").concat(s," ").concat(4*(n-62.5),"%)")):(i.top.backgroundImage="linear-gradient(to right, ".concat(o," ").concat(4*(n-87.5),"%, ").concat(s," ").concat(4*(n-87.5),"%, ").concat(s," 50%, ").concat(o," 50%)"),i.right.backgroundImage="linear-gradient(to bottom, ".concat(o," 100%, ").concat(s," 100%)"),i.bottom.backgroundImage="linear-gradient(to left, ".concat(o," 100%, ").concat(s," 100%)"),i.left.backgroundImage="linear-gradient(to top, ".concat(o," 100%, ").concat(s," 100%)")),Object(l.jsxs)("div",{className:"progress-container ".concat(t),children:[Object(l.jsx)("div",{className:"progress__top",style:i.top}),Object(l.jsxs)("div",{className:"progress__body",children:[Object(l.jsx)("div",{className:"progress__side",style:i.left}),n>=75&&Object(l.jsx)("div",{className:"progress__pass",children:Object(l.jsx)(h.b,{className:"progress__pass-img"})}),Object(l.jsx)(c,Object(O.a)({},r)),Object(l.jsx)("div",{className:"progress__side",style:i.right})]}),Object(l.jsx)("div",{className:"progress__bottom",style:i.bottom})]})},p=(c(42),function(e){var t=e.setLecture,c=e.lecture,a=e.history;return Object(l.jsxs)("div",{className:"lesson",children:[Object(l.jsx)("div",{className:"title",children:"Select Level"}),Object(l.jsxs)("div",{className:"lesson__length",children:["Lessons ",i.a.length]}),Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault(),c>0&&a.push("/task")},className:"lesson__select",children:[Object(l.jsx)("input",{type:"number",className:"lesson__input",min:"1",max:i.a.length,value:c,onChange:function(e){return t(e.target.value)}}),Object(l.jsx)("button",{className:"lesson__btn",children:"Select"})]})]})}),y=c(12),N=c(26),S=c(27),I=c(28),k=c(11),w=(c(46),Object(k.b)((function(e){return{progress:e}}))((function(e){var t=e.lecture,c=e.progress,a={lesson:N.a,exercise:y.b,easyGame:S.a,hardGame:y.a,memoryGame:I.a};return Object(l.jsxs)("div",{className:"task",children:[Object(l.jsx)("div",{className:"title",children:"Select Task"}),Object(l.jsx)("div",{className:"task__select",children:Object.entries(a).map((function(e,a){var n,r=Object(s.a)(e,2),o=r[0],i=r[1];return Object(l.jsx)(v,{Component:function(){return Object(l.jsxs)(m.b,{className:"task__container",to:o,children:[Object(l.jsx)(i,{className:"task__img"}),Object(l.jsx)("div",{className:"task__title",children:o})]})},percentage:null===(n=c[t])||void 0===n?void 0:n[o]},a)}))})]})}))),_=function(e){return{type:"SETPROGRESS",payload:e}},G=c(13),C={generateCards:function(e){for(var t=e.cardLimit,c=e.max,a=e.setState,n=new Set,r=0;r<t;){var o=Math.ceil(Math.random()*c);n.has(o)||(r++,n.add(o))}return a(Object(G.a)(n)),Object(G.a)(n)},playCards:function(e){for(var t=this,c=e.cardLimit,a=e.setSoundState,n=e.gameSpeed,r=e.cards,o=e.lecture,s=e.autoPlay,i=e.setCleanUp,l=function(e){t.delay(n*e,(function(){s&&new Audio("files/lecture".concat(o,"/").concat(r[e],".m4a")).play(),a(e)}),i)},u=0;u<c;u++)l(u);this.delay(n*c,(function(){return a(c)}))},endGame:function(e){var t=e.result,c=e.exercise,a=e.lecture;(0,e.setProgress)({result:t,exercise:c,lecture:a}),alert("result: "+t+"%")},answerQuestion:function(e){var t=e.state,c=e.lecture,a=e.cardLimit,n=Math.floor(Math.random()*a);return new Audio("files/lecture".concat(c,"/").concat(t[n],".m4a")).play(),t[n]},correct:function(){new Audio("files/yes.m4a").play()},incorrect:function(){new Audio("files/no.m4a").play()},delay:function(e,t,c){var a=setTimeout((function(){t(),c&&c((function(e){var t=e.indexOf(a);return t>-1&&e.splice(t,1),e}))}),e);c&&c((function(e){return[].concat(Object(G.a)(e),[a])}))},isTouchDevice:function(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}},A=(c(49),Object(k.b)(void 0,(function(e){return{setProgress:function(t){return e(_(t))}}}))((function(e){var t=e.lecture,c=e.setProgress,n=Object(a.useState)([]),r=Object(s.a)(n,2),o=r[0],u=r[1],d=Object(a.useState)(),j=Object(s.a)(d,2),b=j[0],m=j[1],g=Object(a.useState)(),O=Object(s.a)(g,2),f=O[0],h=O[1],x=Object(a.useState)(0),v=Object(s.a)(x,2),p=v[0],N=v[1],S=Object(a.useState)(0),I=Object(s.a)(S,2),k=I[0],w=I[1],_=Object(a.useState)(!1),G=Object(s.a)(_,2),A=G[0],E=G[1],L=Object(a.useState)(!1),P=Object(s.a)(L,2),M=P[0],T=P[1],W=Object(a.useState)([]),R=Object(s.a)(W,2),Y=R[0],F=R[1],J=Object(a.useRef)();J.current=Y;var D=i.a[t-1].limit.lessons.length,H=C.isTouchDevice();function Q(){p<10?function(){u([]),T(!1);var e=C.generateCards({cardLimit:4,max:D,setState:u});H?E(!0):C.playCards({cards:e,cardLimit:4,gameSpeed:3500,setSoundState:m,lecture:t,setCleanUp:F,autoPlay:!0})}():C.endGame({setProgress:c,result:1e3/(10+k),exercise:"easyGame",lecture:t})}return Object(a.useEffect)((function(){return Q(),function(){J.current.forEach((function(e){return clearTimeout(e)}))}}),[]),Object(a.useEffect)((function(){(4===b||M)&&(h(C.answerQuestion({state:o,lecture:t,cardLimit:4})),u((function(e){return e.sort((function(){return Math.random()>.5?1:-1}))})),E(!0))}),[b,M]),Object(l.jsxs)("div",{className:"easy-game",children:[Object(l.jsx)("div",{className:"title",children:"Easy Game"}),!M&&H&&Object(l.jsx)("div",{className:"touch-btn",onClick:function(){return T(!0)},children:"Play"}),Object(l.jsx)("div",{className:"select",children:o.map((function(e,c){return Object(l.jsxs)("div",{className:"container",style:{filter:"brightness(".concat(c===b?2:1,")")},onClick:function(){return c=e,void(A&&(new Audio("files/lecture".concat(t,"/").concat(c,".m4a")).play(),H&&!M||(E(!1),C.delay(3500,(function(){c===f?(C.correct(),C.delay(2e3,(function(){N((function(e){return e+1})),Q()}),F)):(C.incorrect(),C.delay(2e3,(function(){new Audio("files/lecture".concat(t,"/").concat(f,".m4a")).play(),w((function(e){return e+1})),E(!0)}),F))}),F))));var c},children:[Object(l.jsx)("div",{className:"img",style:{backgroundImage:"url(./img/lecture".concat(t,"/").concat(e,".jpg)")}}),Object(l.jsx)("h5",{children:i.a[t-1].limit.lessons[e-1]})]},c)}))}),Object(l.jsxs)("div",{className:"easy-game__footer",children:[Object(l.jsx)("div",{className:"score score__play",onClick:function(){return A&&new Audio("files/lecture".concat(t,"/").concat(f,".m4a")).play()},children:Object(l.jsx)(y.c,{})}),Object(l.jsx)("div",{className:"score score__correct",children:p}),Object(l.jsx)("div",{className:"score score__incorrect",children:k})]})]})}))),E=(c(50),Object(k.b)(void 0,(function(e){return{setProgress:function(t){return e(_(t))}}}))((function(e){var t=e.lecture,c=e.setProgress,n=Object(a.useState)([]),r=Object(s.a)(n,2),o=r[0],u=r[1],d=Object(a.useState)(),j=Object(s.a)(d,2),b=j[0],m=j[1],g=Object(a.useState)(0),O=Object(s.a)(g,2),f=O[0],h=O[1],x=Object(a.useState)(0),v=Object(s.a)(x,2),p=v[0],N=v[1],S=Object(a.useState)(0),I=Object(s.a)(S,2),k=I[0],w=I[1],_=Object(a.useState)(!1),A=Object(s.a)(_,2),E=A[0],L=A[1],P=i.a[t-1].limit.lessons.length;function M(e){m(C.answerQuestion({state:e,lecture:t,cardLimit:e.length})),L(!0)}return Object(a.useEffect)((function(){f<5?function(){u([]);var e=f+5;C.generateCards({cardLimit:e,max:P,setState:u})}():C.endGame({result:100*(p-k)/p,exercise:"hardGame",lecture:t,setProgress:c})}),[f]),Object(a.useEffect)((function(){o.length===f+5&&setTimeout((function(){M(o)}),2500)}),[o]),Object(l.jsxs)("div",{className:"hard-game",children:[Object(l.jsx)("div",{className:"title",children:"Hard Game"}),Object(l.jsx)("div",{className:"select",children:o.map((function(e,c){return Object(l.jsxs)("div",{className:"container",onClick:function(){return c=e,void(E&&(L(!1),new Audio("files/lecture".concat(t,"/").concat(c,".m4a")).play(),C.delay(2e3,(function(){c===b?(C.correct(),N((function(e){return e+1})),C.delay(1500,(function(){var e=Object(G.a)(o);e.splice(e.indexOf(c),1),u(e),1===e.length?h((function(e){return e+1})):M(e)}))):(C.incorrect(),w((function(e){return e+1})),C.delay(1500,(function(){new Audio("files/lecture".concat(t,"/").concat(b,".m4a")).play(),L(!0)})))}))));var c},children:[Object(l.jsx)("div",{className:"img",style:{backgroundImage:"url(./img/lecture".concat(t,"/").concat(e,".jpg)")}}),Object(l.jsx)("h5",{children:i.a[t-1].limit.lessons[e-1]})]},c)}))}),Object(l.jsxs)("div",{className:"hard-game__footer",children:[Object(l.jsx)("div",{className:"score score__play",onClick:function(){return E&&new Audio("files/lecture".concat(t,"/").concat(b,".m4a")).play()},children:Object(l.jsx)(y.c,{})}),Object(l.jsx)("div",{className:"score score__correct",children:p}),Object(l.jsx)("div",{className:"score score__incorrect",children:k})]})]})}))),L=(c(51),Object(k.b)(void 0,(function(e){return{setProgress:function(t){return e(_(t))}}}))((function(e){var t=e.lecture,c=e.setProgress,n=Object(a.useState)([]),r=Object(s.a)(n,2),o=r[0],u=r[1],d=Object(a.useState)([]),j=Object(s.a)(d,2),b=j[0],m=j[1],g=Object(a.useState)(),O=Object(s.a)(g,2),f=O[0],h=O[1],x=Object(a.useState)(),v=Object(s.a)(x,2),p=v[0],N=v[1],S=Object(a.useState)(0),I=Object(s.a)(S,2),k=I[0],w=I[1],_=Object(a.useState)(0),A=Object(s.a)(_,2),E=A[0],L=A[1],P=Object(a.useState)(0),M=Object(s.a)(P,2),T=M[0],W=M[1],R=Object(a.useState)(!1),Y=Object(s.a)(R,2),F=Y[0],J=Y[1],D=Object(a.useState)(0),H=Object(s.a)(D,2),Q=H[0],B=H[1],U=Object(a.useState)(100),q=Object(s.a)(U,2),z=q[0],K=q[1],V=Object(a.useState)(0),X=Object(s.a)(V,2),Z=X[0],$=X[1],ee=Object(a.useState)(!1),te=Object(s.a)(ee,2),ce=te[0],ae=te[1],ne=i.a[t-1].limit.lessons.length,re=Object(a.useRef)(k);re.current=k;Object(a.useEffect)((function(){k<10?function(){u([]),K(100),B(0);var e=k+2;C.generateCards({cardLimit:e,max:ne,setState:u})}():C.endGame({result:200*E/110,exercise:"memoryGame",lecture:t,setProgress:c})}),[k]),Object(a.useEffect)((function(){o.length===k+2&&(k>4&&oe(o),B((function(e){return e+1})))}),[o]),Object(a.useEffect)((function(){if(Q&&(clearInterval(Z),!ce)){var e=z,t=setInterval((function(){e<=0?(clearInterval(t),k<5?(m(o),oe(o)):w((function(e){return e+1}))):(e-=5,K((function(e){return e-5})))}),(Q+6e3+k*(k<5?1e3:3e3))/20);$(t)}}),[Q,ce]),Object(a.useEffect)((function(){if(p){if(J(!1),k>4&&ae(!0),k<5){var e=Object(G.a)(b),c=e.indexOf(p);e[c]=-e[c],m(e)}new Audio("files/lecture".concat(t,"/").concat(p,".m4a")).play(),setTimeout((function(){p===f?(C.correct(),C.delay(2e3,(function(){if(k===re.current){L((function(e){return e+1}));var e=Object(G.a)(o);e.splice(e.indexOf(p),1),u(e),k<5&&m(e),1===e.length?(k<5&&m([]),w((function(e){return e+1}))):oe(e)}}))):(C.incorrect(),W((function(e){return e+1})),k<5&&m(o),C.delay(1500,(function(){new Audio("files/lecture".concat(t,"/").concat(f,".m4a")).play(),J(!0)}))),k>4&&ae(!1)}),[2500])}}),[p]);var oe=function(e){var c=Math.floor(Math.random()*e.length);h(e[c]),new Audio("files/lecture".concat(t,"/").concat(e[c],".m4a")).play(),J(!0)};return Object(l.jsxs)("div",{className:"memory-game",children:[Object(l.jsx)("div",{className:"title",children:"Memory Game"}),Object(l.jsx)("div",{className:"select",children:o.map((function(e,c){return Object(l.jsxs)("div",{className:"container",onClick:function(){return F&&N(e)},style:b[c]?{backgroundColor:"#bbb7aa35"}:{},children:[Object(l.jsx)("div",{className:"img",style:b[c]>=0?{}:{backgroundImage:"url(./img/lecture".concat(t,"/").concat(e,".jpg)")}}),!(b[c]>=0)&&Object(l.jsx)("h5",{children:i.a[t-1].limit.lessons[e-1]})]},c)}))}),Object(l.jsxs)("div",{className:"memory-game__footer",style:{backgroundImage:"linear-gradient(to right, #b7ab85 ".concat(z,"%, #b7ab8560 ").concat(z,"%)")},children:[Object(l.jsx)("div",{className:"score score__play",onClick:function(){return F&&new Audio("files/lecture".concat(t,"/").concat(f,".m4a")).play()},children:Object(l.jsx)(y.c,{})}),Object(l.jsx)("div",{className:"score score__correct",children:E}),Object(l.jsx)("div",{className:"score score__incorrect",children:T})]})]})}))),P=(c(52),function(e){var t=e.lecture,c=e.setLecture,n=e.location,r=Object(a.useState)(1),o=Object(s.a)(r,2),i=o[0],u=o[1];return Object(l.jsx)("div",{className:"exercise__container",children:Object(l.jsxs)("div",{className:"exercise",children:[Object(l.jsx)(m.b,{to:"/".concat("/task"!==n.pathname?"task":""),className:"return",children:"/"!==n.pathname&&Object(l.jsx)(h.a,{})}),Object(l.jsxs)(g.c,{children:[Object(l.jsx)(g.a,{path:"/lesson",children:Object(l.jsx)(b,{lecture:t,exercise:i,setExercise:u,type:"lesson"})}),Object(l.jsx)(g.a,{path:"/exercise",children:Object(l.jsx)(b,{lecture:t,exercise:i,setExercise:u,type:"exercise"})}),Object(l.jsx)(g.a,{path:"/task",children:Object(l.jsx)(w,{lecture:t})}),Object(l.jsx)(g.a,{path:"/easyGame",children:Object(l.jsx)(A,{lecture:t})}),Object(l.jsx)(g.a,{path:"/hardGame",children:Object(l.jsx)(E,{lecture:t})}),Object(l.jsx)(g.a,{path:"/memoryGame",children:Object(l.jsx)(L,{lecture:t})}),Object(l.jsx)(g.a,{path:"/",render:function(e){var a=e.history;return Object(l.jsx)(p,{history:a,setLecture:c,lecture:t})}})]})]})})}),M=c.p+"static/media/logo.271d96d0.png",T=(c(53),function(e){e.setLecture;var t=Object(a.useState)(!1),c=Object(s.a)(t,2),n=(c[0],c[1]);return Object(l.jsx)("div",{className:"header",onMouseLeave:function(){return n(!1)},children:Object(l.jsx)("div",{className:"logo-container",children:Object(l.jsx)("img",{className:"logo",src:M})})})}),W=c(29),R=window.localStorage.getItem("Yoruba")||"{}",Y="[object Object]"!==R?JSON.parse(R):{},F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SETPROGRESS":var c=JSON.parse(JSON.stringify(e)),a=t.payload,n=a.lecture,r=a.exercise,o=a.result;return c[n]||(c[n]={}),c[n][r]>o||(c[n][r]=o),c;default:return e}};c(54);var J=function(){var e=Object(a.useState)(1),t=Object(s.a)(e,2),c=t[0],n=t[1],r=Object(W.a)(F);return r.subscribe((function(){console.log("store",r.getState()),window.localStorage.setItem("Yoruba",JSON.stringify(r.getState()))})),Object(l.jsx)(k.a,{store:r,children:Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)(T,{setLecture:n}),Object(l.jsx)(m.a,{basename:"/yoruba",children:Object(l.jsx)(g.a,{render:function(e){var t=e.location;return Object(l.jsx)(P,{location:t,lecture:c,setLecture:n})}})})]})})},D=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,57)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,r=t.getLCP,o=t.getTTFB;c(e),a(e),n(e),r(e),o(e)}))};o.a.render(Object(l.jsx)(n.a.StrictMode,{children:Object(l.jsx)(J,{})}),document.getElementById("root")),D()}],[[55,1,2]]]);
//# sourceMappingURL=main.71915b9f.chunk.js.map
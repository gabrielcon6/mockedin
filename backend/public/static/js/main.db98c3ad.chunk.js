(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],Array(19).concat([function(e,t,a){},,,,,function(e,t,a){e.exports=a(53)},,,,,function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),c=a.n(l),i=(a(29),a(1)),s=a(11),o=a(4),u=a(2),m=a.n(u),d=(a(31),function(e){return r.a.createElement("div",{className:"avatar ".concat(e.className),style:e.style},r.a.createElement("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}}))}),p=(a(32),function(e){return r.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}),E=(a(33),function(e){return r.a.createElement("li",{className:"user-item"},r.a.createElement(p,{className:"user-item__content"},r.a.createElement(o.b,{to:"/".concat(e.id,"/places")},r.a.createElement("div",{className:"user-item__image"},r.a.createElement(d,{image:e.image,alt:e.name})),r.a.createElement("div",{className:"user-item__info"},r.a.createElement("h2",null,e.name),r.a.createElement("h3",null,e.placeCount," ",1===e.placeCount?"Place":"Places")))))}),f=(a(39),function(e){return 0===e.items.length?r.a.createElement("div",{className:"center"},r.a.createElement(p,null,r.a.createElement("h2",null,"No users found."))):r.a.createElement("ul",{className:"users-list"},e.items.map((function(e){return r.a.createElement(E,{key:e.id,id:e.id,image:e.image,name:e.name,placeCount:e.places.length})})))}),v=a(54),b=(a(40),function(e){return c.a.createPortal(r.a.createElement("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-hook"))}),h=(a(41),function(e){var t=r.a.createElement("div",{className:"modal ".concat(e.className),style:e.style},r.a.createElement("header",{className:"modal__header ".concat(e.headerClass)},r.a.createElement("h2",null,e.header)),r.a.createElement("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()}},r.a.createElement("div",{className:"modal__content ".concat(e.contentClass)},e.children),r.a.createElement("footer",{className:"modal__footer ".concat(e.footerClass)},e.footer)));return c.a.createPortal(t,document.getElementById("modal-hook"))}),g=function(e){return r.a.createElement(r.a.Fragment,null,e.show&&r.a.createElement(b,{onClick:e.onCancel}),r.a.createElement(v.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal"},r.a.createElement(h,e)))},O=(a(42),function(e){return e.href?r.a.createElement("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href},e.children):e.to?r.a.createElement(o.b,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger")},e.children):r.a.createElement("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled},e.children)}),y=function(e){return r.a.createElement(g,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:r.a.createElement(O,{onClick:e.onClear},"Okay")},r.a.createElement("p",null,e.error))},C=(a(43),function(e){return r.a.createElement("div",{className:"".concat(e.asOverlay&&"loading-spinner__overlay")},r.a.createElement("div",{className:"lds-dual-ring"}))}),N=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),a=t[0],r=t[1],l=Object(n.useState)(),c=Object(i.a)(l,2),s=c[0],o=c[1],u=Object(n.useRef)([]),d=Object(n.useCallback)((function(e){var t,a,n,l,c,i,s=arguments;return m.a.async((function(d){for(;;)switch(d.prev=d.next){case 0:return t=s.length>1&&void 0!==s[1]?s[1]:"GET",a=s.length>2&&void 0!==s[2]?s[2]:null,n=s.length>3&&void 0!==s[3]?s[3]:{},r(!0),l=new AbortController,u.current.push(l),d.prev=6,d.next=9,m.a.awrap(fetch(e,{method:t,body:a,headers:n,signal:l.signal}));case 9:return c=d.sent,d.next=12,m.a.awrap(c.json());case 12:if(i=d.sent,u.current=u.current.filter((function(e){return e!==l})),c.ok){d.next=16;break}throw new Error(i.message);case 16:return r(!1),d.abrupt("return",i);case 20:throw d.prev=20,d.t0=d.catch(6),o(d.t0.message),r(!1),d.t0;case 25:case"end":return d.stop()}}),null,null,[[6,20]])}),[]);return Object(n.useEffect)((function(){return function(){u.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:a,error:s,sendRequest:d,clearError:function(){o(null)}}},j=function(){var e=N(),t=e.isLoading,a=e.error,l=e.sendRequest,c=e.clearError,s=Object(n.useState)(),o=Object(i.a)(s,2),u=o[0],d=o[1];return Object(n.useEffect)((function(){!function(){var e;m.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.awrap(l("/api/users"));case 3:e=t.sent,d(e.users),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),null,null,[[0,7]])}()}),[l]),r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{error:a,onClear:c}),t&&r.a.createElement("div",{className:"center"},r.a.createElement(C,null)),!t&&u&&r.a.createElement(f,{items:u}))},w=a(10),x=function(e){return{type:"MINLENGTH",val:e}},I=function(e,t){var a=!0,n=!0,r=!1,l=void 0;try{for(var c,i=t[Symbol.iterator]();!(n=(c=i.next()).done);n=!0){var s=c.value;"REQUIRE"===s.type&&(a=a&&e.trim().length>0),"MINLENGTH"===s.type&&(a=a&&e.trim().length>=s.val),"MAXLENGTH"===s.type&&(a=a&&e.trim().length<=s.val),"MIN"===s.type&&(a=a&&+e>=s.val),"MAX"===s.type&&(a=a&&+e<=s.val),"EMAIL"===s.type&&(a=a&&/^\S+@\S+\.\S+$/.test(e))}}catch(o){r=!0,l=o}finally{try{n||null==i.return||i.return()}finally{if(r)throw l}}return a},k=(a(44),function(e,t){switch(t.type){case"CHANGE":return Object(w.a)({},e,{value:t.val,isValid:I(t.val,t.validators)});case"TOUCH":return Object(w.a)({},e,{isTouched:!0});default:return e}}),T=function(e){var t=Object(n.useReducer)(k,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),a=Object(i.a)(t,2),l=a[0],c=a[1],s=e.id,o=e.onInput,u=l.value,m=l.isValid;Object(n.useEffect)((function(){o(s,u,m)}),[s,u,m,o]);var d=function(t){c({type:"CHANGE",val:t.target.value,validators:e.validators})},p=function(){c({type:"TOUCH"})},E="input"===e.element?r.a.createElement("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:d,onBlur:p,value:l.value}):r.a.createElement("textarea",{id:e.id,rows:e.rows||3,onChange:d,onBlur:p,value:l.value});return r.a.createElement("div",{className:"form-control ".concat(!l.isValid&&l.isTouched&&"form-control--invalid")},r.a.createElement("label",{htmlFor:e.id},e.label),E,!l.isValid&&l.isTouched&&r.a.createElement("p",null,e.errorText))},_=a(13),S=function(e,t){switch(t.type){case"INPUT_CHANGE":var a=!0;for(var n in e.inputs)e.inputs[n]&&(a=n===t.inputId?a&&t.isValid:a&&e.inputs[n].isValid);return Object(w.a)({},e,{inputs:Object(w.a)({},e.inputs,Object(_.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:a});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},V=function(e,t){var a=Object(n.useReducer)(S,{inputs:e,isValid:t}),r=Object(i.a)(a,2),l=r[0],c=r[1];return[l,Object(n.useCallback)((function(e,t,a){c({type:"INPUT_CHANGE",value:t,isValid:a,inputId:e})}),[]),Object(n.useCallback)((function(e,t){c({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]},P=Object(n.createContext)({isLoggedIn:!1,userId:null,login:function(){},logout:function(){}}),L=(a(19),function(){var e=Object(n.useContext)(P),t=N(),a=t.isLoading,l=t.error,c=t.sendRequest,o=t.clearError,u=V({title:{value:"",isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1}},!1),d=Object(i.a)(u,2),p=d[0],E=d[1],f=Object(s.g)();return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{error:l,onClear:o}),r.a.createElement("form",{className:"place-form",onSubmit:function(t){return m.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t.preventDefault(),a.prev=1,a.next=4,m.a.awrap(c("/api/places","POST",JSON.stringify({title:p.inputs.title.value,description:p.inputs.description.value,address:p.inputs.address.value,creator:e.userId}),{"Content-Type":"application/json"}));case 4:f.push("/"),a.next=9;break;case 7:a.prev=7,a.t0=a.catch(1);case 9:case"end":return a.stop()}}),null,null,[[1,7]])}},a&&r.a.createElement(C,{asOverlay:!0}),r.a.createElement(T,{id:"title",element:"input",type:"text",label:"Title",validators:[{type:"REQUIRE"}],errorText:"Please enter a valid title.",onInput:E}),r.a.createElement(T,{id:"description",element:"textarea",label:"Description",validators:[x(5)],errorText:"Please enter a valid description (at least 5 characters).",onInput:E}),r.a.createElement(T,{id:"address",element:"input",label:"Address",validators:[{type:"REQUIRE"}],errorText:"Please enter a valid address.",onInput:E}),r.a.createElement(O,{type:"submit",disabled:!p.isValid},"ADD PLACE")))}),A=(a(45),function(e){var t=Object(n.useRef)(),a=e.center,l=e.zoom;return Object(n.useEffect)((function(){var e=new window.google.maps.Map(t.current,{center:a,zoom:l});new window.google.maps.Marker({position:a,map:e})}),[a,l]),r.a.createElement("div",{ref:t,className:"map ".concat(e.className),style:e.style})}),R=(a(46),function(e){var t=N(),a=t.isLoading,l=t.error,c=t.sendRequest,s=t.clearError,o=Object(n.useContext)(P),u=Object(n.useState)(!1),d=Object(i.a)(u,2),E=d[0],f=d[1],v=Object(n.useState)(!1),b=Object(i.a)(v,2),h=b[0],j=b[1],w=function(){return f(!1)},x=function(){j(!1)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{error:l,onClear:s}),r.a.createElement(g,{show:E,onCancel:w,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:r.a.createElement(O,{onClick:w},"CLOSE")},r.a.createElement("div",{className:"map-container"},r.a.createElement(A,{center:e.coordinates,zoom:16}))),r.a.createElement(g,{show:h,onCancel:x,header:"Are you sure?",footerClass:"place-item__modal-actions",footer:r.a.createElement(r.a.Fragment,null,r.a.createElement(O,{inverse:!0,onClick:x},"CANCEL"),r.a.createElement(O,{danger:!0,onClick:function(){return m.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return j(!1),t.prev=1,t.next=4,m.a.awrap(c("/api/places/".concat(e.id),"DELETE"));case 4:e.onDelete(e.id),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:case"end":return t.stop()}}),null,null,[[1,7]])}},"DELETE"))},r.a.createElement("p",null,"Do you want to proceed and delete this place? Please note that it can't be undone thereafter.")),r.a.createElement("li",{className:"place-item"},r.a.createElement(p,{className:"place-item__content"},a&&r.a.createElement(C,{asOverlay:!0}),r.a.createElement("div",{className:"place-item__image"},r.a.createElement("img",{src:e.image,alt:e.title})),r.a.createElement("div",{className:"place-item__info"},r.a.createElement("h2",null,e.title),r.a.createElement("h3",null,e.address),r.a.createElement("p",null,e.description)),r.a.createElement("div",{className:"place-item__actions"},r.a.createElement(O,{inverse:!0,onClick:function(){return f(!0)}},"VIEW ON MAP"),o.userId===e.creatorId&&r.a.createElement(O,{to:"/places/".concat(e.id)},"EDIT"),o.userId===e.creatorId&&r.a.createElement(O,{danger:!0,onClick:function(){j(!0)}},"DELETE")))))}),D=(a(47),function(e){return 0===e.items.length?r.a.createElement("div",{className:"place-list center"},r.a.createElement(p,null,r.a.createElement("h2",null,"No places found. Maybe create one?"),r.a.createElement(O,{to:"/places/new"},"Share Place"))):r.a.createElement("ul",{className:"place-list"},e.items.map((function(t){return r.a.createElement(R,{key:t.id,id:t.id,image:t.image,title:t.title,description:t.description,address:t.address,creatorId:t.creator,coordinates:t.location,onDelete:e.onDeletePlace})})))}),U=function(){var e=Object(n.useState)(),t=Object(i.a)(e,2),a=t[0],l=t[1],c=N(),o=c.isLoading,u=c.error,d=c.sendRequest,p=c.clearError,E=Object(s.h)().userId;Object(n.useEffect)((function(){!function(){var e;m.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.awrap(d("/api/places/user/".concat(E)));case 3:e=t.sent,l(e.places),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),null,null,[[0,7]])}()}),[d,E]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{error:u,onClear:p}),o&&r.a.createElement("div",{className:"center"},r.a.createElement(C,null)),!o&&a&&r.a.createElement(D,{items:a,onDeletePlace:function(e){l((function(t){return t.filter((function(t){return t.id!==e}))}))}}))},G=function(){var e=Object(n.useContext)(P),t=N(),a=t.isLoading,l=t.error,c=t.sendRequest,o=t.clearError,u=Object(n.useState)(),d=Object(i.a)(u,2),E=d[0],f=d[1],v=Object(s.h)().placeId,b=Object(s.g)(),h=V({title:{value:"",isValid:!1},description:{value:"",isValid:!1}},!1),g=Object(i.a)(h,3),j=g[0],w=g[1],I=g[2];Object(n.useEffect)((function(){!function(){var e;m.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.awrap(c("/api/places/".concat(v)));case 3:e=t.sent,f(e.place),I({title:{value:e.place.title,isValid:!0},description:{value:e.place.description,isValid:!0}},!0),t.next=10;break;case 8:t.prev=8,t.t0=t.catch(0);case 10:case"end":return t.stop()}}),null,null,[[0,8]])}()}),[c,v,I]);return a?r.a.createElement("div",{className:"center"},r.a.createElement(C,null)):E||l?r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{error:l,onClear:o}),!a&&E&&r.a.createElement("form",{className:"place-form",onSubmit:function(t){return m.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t.preventDefault(),a.prev=1,a.next=4,m.a.awrap(c("/api/places/".concat(v),"PATCH",JSON.stringify({title:j.inputs.title.value,description:j.inputs.description.value}),{"Content-Type":"application/json"}));case 4:b.push("/"+e.userId+"/places"),a.next=9;break;case 7:a.prev=7,a.t0=a.catch(1);case 9:case"end":return a.stop()}}),null,null,[[1,7]])}},r.a.createElement(T,{id:"title",element:"input",type:"text",label:"Title",validators:[{type:"REQUIRE"}],errorText:"Please enter a valid title.",onInput:w,initialValue:E.title,initialValid:!0}),r.a.createElement(T,{id:"description",element:"textarea",label:"Description",validators:[x(5)],errorText:"Please enter a valid description (min. 5 characters).",onInput:w,initialValue:E.description,initialValid:!0}),r.a.createElement(O,{type:"submit",disabled:!j.isValid},"UPDATE PLACE"))):r.a.createElement("div",{className:"center"},r.a.createElement(p,null,r.a.createElement("h2",null,"Could not find place!")))},M=(a(48),function(){var e=Object(n.useContext)(P),t=Object(n.useState)(!0),a=Object(i.a)(t,2),l=a[0],c=a[1],s=N(),o=s.isLoading,u=s.error,d=s.sendRequest,E=s.clearError,f=V({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),v=Object(i.a)(f,3),b=v[0],h=v[1],g=v[2];return r.a.createElement(r.a.Fragment,null,r.a.createElement(y,{error:u,onClear:E}),r.a.createElement(p,{className:"authentication"},o&&r.a.createElement(C,{asOverlay:!0}),r.a.createElement("h2",null,"Login Required"),r.a.createElement("hr",null),r.a.createElement("form",{onSubmit:function(t){var a,n;return m.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(t.preventDefault(),!l){r.next=13;break}return r.prev=2,r.next=5,m.a.awrap(d("/api/users/login","POST",JSON.stringify({email:b.inputs.email.value,password:b.inputs.password.value}),{"Content-Type":"application/json"}));case 5:a=r.sent,e.login(a.user.id),r.next=11;break;case 9:r.prev=9,r.t0=r.catch(2);case 11:r.next=22;break;case 13:return r.prev=13,r.next=16,m.a.awrap(d("/api/users/signup","POST",JSON.stringify({name:b.inputs.name.value,email:b.inputs.email.value,password:b.inputs.password.value}),{"Content-Type":"application/json"}));case 16:n=r.sent,e.login(n.user.id),r.next=22;break;case 20:r.prev=20,r.t1=r.catch(13);case 22:case"end":return r.stop()}}),null,null,[[2,9],[13,20]])}},!l&&r.a.createElement(T,{element:"input",id:"name",type:"text",label:"Your Name",validators:[{type:"REQUIRE"}],errorText:"Please enter a name.",onInput:h}),r.a.createElement(T,{element:"input",id:"email",type:"email",label:"E-Mail",validators:[{type:"EMAIL"}],errorText:"Please enter a valid email address.",onInput:h}),r.a.createElement(T,{element:"input",id:"password",type:"password",label:"Password",validators:[x(6)],errorText:"Please enter a valid password, at least 6 characters.",onInput:h}),r.a.createElement(O,{type:"submit",disabled:!b.isValid},l?"LOGIN":"SIGNUP")),r.a.createElement(O,{inverse:!0,onClick:function(){l?g(Object(w.a)({},b.inputs,{name:{value:"",isValid:!1}}),!1):g(Object(w.a)({},b.inputs,{name:void 0}),b.inputs.email.isValid&&b.inputs.password.isValid),c((function(e){return!e}))}},"SWITCH TO ",l?"SIGNUP":"LOGIN")))}),H=(a(49),function(e){return r.a.createElement("header",{className:"main-header"},e.children)}),F=(a(50),function(e){var t=Object(n.useContext)(P);return r.a.createElement("ul",{className:"nav-links"},r.a.createElement("li",null,r.a.createElement(o.c,{to:"/",exact:!0},"ALL USERS")),t.isLoggedIn&&r.a.createElement("li",null,r.a.createElement(o.c,{to:"/".concat(t.userId,"/places")},"MY PLACES")),t.isLoggedIn&&r.a.createElement("li",null,r.a.createElement(o.c,{to:"/places/new"},"ADD PLACE")),!t.isLoggedIn&&r.a.createElement("li",null,r.a.createElement(o.c,{to:"/auth"},"AUTHENTICATE")),t.isLoggedIn&&r.a.createElement("li",null,r.a.createElement("button",{onClick:t.logout},"LOGOUT")))}),q=(a(51),function(e){var t=r.a.createElement(v.a,{in:e.show,timeout:200,classNames:"slide-in-left",mountOnEnter:!0,unmountOnExit:!0},r.a.createElement("aside",{className:"side-drawer",onClick:e.onClick},e.children));return c.a.createPortal(t,document.getElementById("drawer-hook"))}),z=(a(52),function(e){var t=Object(n.useState)(!1),a=Object(i.a)(t,2),l=a[0],c=a[1],s=function(){c(!1)};return r.a.createElement(r.a.Fragment,null,l&&r.a.createElement(b,{onClick:s}),r.a.createElement(q,{show:l,onClick:s},r.a.createElement("nav",{className:"main-navigation__drawer-nav"},r.a.createElement(F,null))),r.a.createElement(H,null,r.a.createElement("button",{className:"main-navigation__menu-btn",onClick:function(){c(!0)}},r.a.createElement("span",null),r.a.createElement("span",null),r.a.createElement("span",null)),r.a.createElement("h1",{className:"main-navigation__title"},r.a.createElement(o.b,{to:"/"},"YourPlaces")),r.a.createElement("nav",{className:"main-navigation__header-nav"},r.a.createElement(F,null))))}),B=function(){var e,t=Object(n.useState)(!1),a=Object(i.a)(t,2),l=a[0],c=a[1],u=Object(n.useState)(!1),m=Object(i.a)(u,2),d=m[0],p=m[1],E=Object(n.useCallback)((function(e){c(!0),p(e)}),[]),f=Object(n.useCallback)((function(){c(!1),p(null)}),[]);return e=l?r.a.createElement(s.d,null,r.a.createElement(s.b,{path:"/",exact:!0},r.a.createElement(j,null)),r.a.createElement(s.b,{path:"/:userId/places",exact:!0},r.a.createElement(U,null)),r.a.createElement(s.b,{path:"/places/new",exact:!0},r.a.createElement(L,null)),r.a.createElement(s.b,{path:"/places/:placeId"},r.a.createElement(G,null)),r.a.createElement(s.a,{to:"/"})):r.a.createElement(s.d,null,r.a.createElement(s.b,{path:"/",exact:!0},r.a.createElement(j,null)),r.a.createElement(s.b,{path:"/:userId/places",exact:!0},r.a.createElement(U,null)),r.a.createElement(s.b,{path:"/auth"},r.a.createElement(M,null)),r.a.createElement(s.a,{to:"/auth"})),r.a.createElement(P.Provider,{value:{isLoggedIn:l,userId:d,login:E,logout:f}},r.a.createElement(o.a,null,r.a.createElement(z,null),r.a.createElement("main",null,e)))};c.a.render(r.a.createElement(B,null),document.getElementById("root"))}]),[[24,1,2]]]);
//# sourceMappingURL=main.db98c3ad.chunk.js.map
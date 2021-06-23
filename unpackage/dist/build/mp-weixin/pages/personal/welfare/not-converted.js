(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/personal/welfare/not-converted"],{"1af31":function(t,n,e){},"20c2":function(t,n,e){"use strict";e.r(n);var a=e("d47d"),o=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=o.a},"757b":function(t,n,e){"use strict";var a=e("1af31"),o=e.n(a);o.a},9764:function(t,n,e){"use strict";e.r(n);var a=e("ea0a"),o=e("20c2");for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);e("757b");var u,c=e("f0c5"),i=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=i.exports},d47d:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e("3fd9"),o={props:{config:{type:Object}},methods:{toUse:function(){var t=this;(0,a.togifts)({gid:this.config.id}).then((function(n){if(1==n.code)return t.$router.navigateTo({url:"/pages/webview/webview?link="+encodeURIComponent(n.data.url)});wx.showModal({title:"温馨提示",content:n.msg,showCancel:!1})}))}}};n.default=o},ea0a:function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement;t._self._c},r=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/personal/welfare/not-converted-create-component',
    {
        'pages/personal/welfare/not-converted-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9764"))
        })
    },
    [['pages/personal/welfare/not-converted-create-component']]
]);

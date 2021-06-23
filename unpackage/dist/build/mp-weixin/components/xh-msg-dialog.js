(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/xh-msg-dialog"],{"2ca2":function(t,n,a){"use strict";a.r(n);var e=a("a2e8"),s=a.n(e);for(var i in e)"default"!==i&&function(t){a.d(n,t,(function(){return e[t]}))}(i);n["default"]=s.a},"9f2b":function(t,n,a){"use strict";a.r(n);var e=a("ac7b"),s=a("2ca2");for(var i in s)"default"!==i&&function(t){a.d(n,t,(function(){return s[t]}))}(i);a("c223");var c,u=a("f0c5"),o=Object(u["a"])(s["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);n["default"]=o.exports},a2e8:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e="",s={props:{buttonText:{type:String,default:"确认"}},data:function(){return{msg:"",msgSmall:"",isShow:!1}},methods:{close:function(){this.isShow=!1,this.$emit("closeNotice")},show:function(t,n){this.msg=t.msg.replace("（异常）",""),t.data&&t.data.tips?this.msgSmall=t.data.tips.replace("（异常）",""):this.msgSmall="",e=n,"无效二维码"==this.msg&&(this.msgSmall="请扫红牛“一元轻松享”拉环二维码"),this.isShow=!0},callBack:function(){e?e&&(this.$emit(e),this.close()):this.close()}}};n.default=s},aa96:function(t,n,a){},ac7b:function(t,n,a){"use strict";var e;a.d(n,"b",(function(){return s})),a.d(n,"c",(function(){return i})),a.d(n,"a",(function(){return e}));var s=function(){var t=this,n=t.$createElement;t._self._c},i=[]},c223:function(t,n,a){"use strict";var e=a("aa96"),s=a.n(e);s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/xh-msg-dialog-create-component',
    {
        'components/xh-msg-dialog-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9f2b"))
        })
    },
    [['components/xh-msg-dialog-create-component']]
]);

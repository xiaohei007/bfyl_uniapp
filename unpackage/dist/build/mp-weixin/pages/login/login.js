(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"0d49":function(e,t,n){"use strict";n.r(t);var o=n("64ed"),i=n("1bc0");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("cf5a");var c,s=n("f0c5"),a=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=a.exports},1e3:function(e,t,n){"use strict";(function(e){n("cadd");o(n("66fd"));var t=o(n("0d49"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"1bc0":function(e,t,n){"use strict";n.r(t);var o=n("dd78"),i=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},"64ed":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var i=function(){var e=this,t=e.$createElement;e._self._c},r=[]},cf5a:function(e,t,n){"use strict";var o=n("d20f"),i=n.n(o);i.a},d20f:function(e,t,n){},dd78:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62"),i=n("09bf"),r=n("1d11"),c=n("de48");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l,f=(0,i.PLAQUEADVERTISING)(),d={data:function(){return{isDisabled:!1,isAgreement:!1,baseUrl:r.baseUrl,isgetUserProfile:Boolean(wx.getUserProfile)}},onLoad:function(e){e.isAgreement&&(this.isAgreement=!0),f.init("adunit-7d704bfc0a67a060")},onReady:function(){f.play()},onShow:function(){l=null},computed:a({},(0,o.mapGetters)(["token"])),methods:a(a({},(0,o.mapActions)({wxlogin:"login/wxlogin",updateUser:"login/updateUser",getUserInfo:"login/getUserInfo",updateUserNew:"login/updateUserNew"})),{},{linkService:function(){e.switchTab({url:"/pages/tabBar/service/service"})},homeClick:function(){this.token||this.wxlogin().then((function(e){})),e.reLaunch({url:"/pages/tabBar/home/index"})},agreement:function(e){this.isAgreement=e},agreementLook:function(t){t=this.baseUrl+t,e.navigateTo({url:"/pages/webview/webview?link=".concat(t,"#ISLOGIN")})},cancelLogin:function(){this.token||this.wxlogin().then((function(e){})),e.reLaunch({url:"/pages/tabBar/home/index"})},newLogin:function(){var t=this;return this.isAgreement?(this.isDisabled=!0,l?this.newWXLogin(l):void wx.getUserProfile({lang:"zh_CN",desc:"登录",success:function(n){if(l=n.userInfo,!l||"object"===typeof l&&Object.keys(l).length<7)return l=void 0,t.isDisabled=!1,void e.showModal({title:"用户信息获取失败",content:"请点击登录按钮，重新尝试",showCancel:!1});t.newWXLogin(l)},fail:function(n){t.isDisabled=!1,e.showModal({title:"微信绑定授权",content:"请允许获取个人信息后重新进入绑定页面",showCancel:!1})}})):this.$refs.xhNotify.show({type:"warning",message:"请阅读并同意登录协议",duration:2e3})},newWXLogin:function(t){var n=this;this.wxlogin().then((function(o){n.updateUserNew(t).then((function(t){n.getUserInfo(),n.$refs.xhNotify.show({type:"success",message:"登录成功",duration:1500,onClose:function(){if(c.redirect)return n.$router.redirectTo({url:c.redirect}),(0,c.clearRedirect)();e.switchTab({url:"/pages/tabBar/personal/index"})}})})).catch((function(t){switch(n.isDisabled=!1,t.code){case-2:e.showModal({title:"定位授权",content:"微信未授权定位或网络信号差(微信内设置无效时，可能需要前往“系统设置”允许微信定位权限)",showCancel:!1,success:function(t){n.isDisabled=!1,t.confirm&&wx.getSetting({complete:function(t){if(t.authSetting&&!t.authSetting["scope.userLocation"])return e.openSetting({success:function(t){if(!t.authSetting["scope.userLocation"])return e.showToast({title:"您未允许获取定位权限",icon:"none",duration:1500})}});e.navigateTo({url:"/pages/noLocation/noLocation"})}})}});break;case 2:e.showModal({title:"温馨提示",content:t.msg});break}}))})).catch((function(t){n.isDisabled=!1,-1===t.code&&e.showModal({title:"温馨提示",content:t.msg})}))},login:function(){var t=this;if(!this.isAgreement)return this.$refs.xhNotify.show({type:"warning",message:"请阅读并同意登录协议",duration:2e3});this.isDisabled=!0,this.wxlogin().then((function(n){t.updateUser().then((function(n){t.getUserInfo(),t.$refs.xhNotify.show({type:"success",message:"登录成功",duration:1500,onClose:function(){if(c.redirect)return t.$router.redirectTo({url:c.redirect}),(0,c.clearRedirect)();e.switchTab({url:"/pages/tabBar/personal/index"})}})})).catch((function(n){switch(t.isDisabled=!1,n.code){case-2:e.showModal({title:"定位授权",content:"微信未授权定位或网络信号差(微信内设置无效时，可能需要前往“系统设置”允许微信定位权限)",showCancel:!1,success:function(n){n.confirm&&wx.getSetting({complete:function(n){if(n.authSetting&&!n.authSetting["scope.userLocation"])return e.openSetting({success:function(n){if(!n.authSetting["scope.userLocation"])return e.showToast({title:"您未允许获取定位权限",icon:"none",duration:1500});t.login()}});e.navigateTo({url:"/pages/noLocation/noLocation"})}})}});break;case 0:e.showModal({title:"微信绑定授权",content:"请允许获取个人信息后重新进入绑定页面",showCancel:!1,success:function(n){n.confirm&&e.openSetting({success:function(n){if(!n.authSetting["scope.userInfo"])return e.showToast({title:"您未允许获取个人信息",icon:"none",duration:1500});t.login()}})}});break;case 2:e.showModal({title:"温馨提示",content:n.msg});break}}))})).catch((function(n){t.isDisabled=!1,-1===n.code&&e.showModal({title:"温馨提示",content:n.msg})}))}})};t.default=d}).call(this,n("543d")["default"])}},[["1000","common/runtime","common/vendor"]]]);
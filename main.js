import Vue from 'vue'
import App from './App'
import store from './store'
import {router} from './utils/routerIntercept.js'  
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import easyLoadimage from "@/components/easy-loadimage.vue"
import xhBannerAds from "@/components/xh-banner-ads.vue"
import xhCheck from "@/components/xh-check.vue"
import xhNotify from "@/components/xh-notify.vue"
import userGuide from '@/components/userGuide.vue'
import xhNavbar from '@/components/xhNavbar/xh-navbar.vue'


Vue.component('mescroll-uni', MescrollUni)	
Vue.component('easy-loadimage', easyLoadimage)	
Vue.component('xh-banner-ads', xhBannerAds)	
Vue.component('xh-check', xhCheck)	
Vue.component('xh-notify', xhNotify)
Vue.component('userGuide', userGuide)
Vue.component('xhNavbar', xhNavbar)
Vue.component('mescroll-body', MescrollBody)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store  
Vue.prototype.$router = router  

const app = new Vue({
    ...App
})
app.$mount()

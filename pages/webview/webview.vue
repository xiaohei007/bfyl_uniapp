<template>
	<web-view v-if="link" :webview-styles="webviewStyles" :src="link"></web-view>
</template>

<script>
	let _link = '' 
	export default {
		onLoad(option) {
			 _link = option.link
			 this.link = decodeURIComponent(option.link)
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      // console.log(res.target)
		    }
		    return {
		      title: '彬纷享礼小程序，红牛一元轻松享',
		      path: '/pages/webview/webview?link='+_link,
			  imageUrl:"https://file.y1b.cn/public/img/bfxn/202105/bfxl_wechatShare_new.png"
		    }
		},
		data() {
			return {
				link:'',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		}
	}
</script>

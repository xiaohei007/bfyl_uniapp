 <template>
	<view class="home">
		 <!-- 头部导航 -->
		<home-tabs :currTabs="currTabs" @tabsChange="tabsChange" />
		<!-- 轮播 -->
		<swiper class="home-page-list" :current="currTabs" @change="swiperChange">
			  <!-- 新闻 -->
			<swiper-item>
				<news-list v-if="showbrand"/>
		    </swiper-item>
			  <!-- 品牌 -->
			<swiper-item>
				<currency-list v-if="showactivity"  :config="adData.A5.value"/>
			</swiper-item>
			  <!-- 热门活动 -->
			<swiper-item>
				<currency-list :isAd="true"  :config="adData.A10.value"/>
			</swiper-item>
		</swiper>
		<!-- 自定義廣告 -->
		<user-guide ref="userGuide" ids="home" :isNoJump="true"/>
	</view>
</template> 
<script>
	import homeTabs from './homeTabs'
	import currencyList from './currencyList'
	import newsList from './newsList'
	import {mapGetters} from 'vuex'
	// import {
	// 	PLAQUEADVERTISING
	// } from '@/utils/index.js' //插屏广告
	// let _PLAQUEADVERTISING = null//插屏广告管理
	
	export default {
		data() {
			return {
				currTabs: 2,
				showbrand:false,
				showactivity:false
			}
		},
		computed:{
			...mapGetters(['adData'])
		},
		components: {
			homeTabs,
			currencyList,
			newsList
		},
		onLoad() {
			//插屏广告管理
			// _PLAQUEADVERTISING = PLAQUEADVERTISING({
			// 	errback:()=>{
			// 		this.$refs.userGuide.show()
			// 	}
			// })
			// _PLAQUEADVERTISING.init('adunit-1af16654ee3f3330')
		},
		onShow() {
			// this.$refs.userGuide.close(true)
			// _PLAQUEADVERTISING.play()
		},
		methods: {
			//兑换卷类型切换
			tabsChange(index) {
				this.currTabs = index
				this.showSwiperItem(index)
			},
			swiperChange(data){//滑动
				this.currTabs = data.detail.current //切换tab
				this.showSwiperItem(data.detail.current)
			},
			showSwiperItem(index){
				if(index == 0)this.showbrand = true
				if(index == 1)this.showactivity = true
			}
		},
		onShareAppMessage(res) {
		   //  if (res.from === 'button') {// 来自页面内分享按钮
		   //    // console.log(res.target)
		   //  }
		   //  return {
		   //    title: ' ',
		   //    path: ' ',
			  // imageUrl:" "
		   //  }
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eaeaea;
	}

	.home-page-list {
		width: 100%;
		position: fixed;
		top: 80rpx;
		bottom: 0;
		height: auto;
	}
</style>



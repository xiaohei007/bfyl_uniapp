<template>
	<view class="xh-tabs">
		<view class="xh-tabs-item" @click="tabsChange(0)">
			<view class="label-text" :class="{'xh-tab-active':currTabs == 0}">
				新闻
			</view>
		</view>
		<view class="xh-tabs-item" @click="tabsChange(1)">
			<view class="label-text" :class="{'xh-tab-active':currTabs == 1}">
				品牌
			</view>
		</view>
		<view class="xh-tabs-item" @click="tabsChange(2)">
			<view class="label-text" :class="{'xh-tab-active':currTabs == 2}">
				热门活动
			</view>
		</view>
		<!-- cursor -->
		<view class="cursor" :style="{left:(currTabs*33.3 + 9.15)+'%'}"></view>
	</view>
</template>

<script>
	export default {
		props: ['currTabs'],
		methods:{
			tabsChange(index){
				this.$emit('tabsChange',index)
			}
		}
	}
</script>

<style lang="scss">
	/*顶部导航样式*/
	.xh-tabs {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		z-index: 1;
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

		.xh-tabs-item {
			flex: 1;
			color: #999999;
			font-size: 32rpx;
			font-weight: bold;
			@include  flex-vh-center;
		}
		.label-text{
			position: relative;
		}

		.cursor {
			position: absolute;
			height: 8rpx;
			width: 15%;
			left: 5%;
			bottom: 0;
			background-color: #E02020;
			transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
		}
		
		.xh-tab-active{
			color: #ee0a24;
			font-size: 32rpx;
		}
		
	}

</style>

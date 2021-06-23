<template>
	<!-- 插屏失败弹窗 -->
	<view class="official-account" :style="{'z-index': isShow?1:-1}">
		<!-- 关闭按钮 -->
		<image class="official-account-close" @click="close" src="../../../static/images/toast_close.png" mode="widthFix" />
		<!-- 主要内容 -->
		<view class="official-account-body">
			<image class="official-account-img" src="../../../static/images/xh-dialog-header.png" mode="widthFix"></image>
			<official-account></official-account>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false
			}
		},
		methods: {
			show() {
				this.isShow = true
			},
			close() {
				this.isShow = false
			}
		}
	}
</script>

<style lang="scss">
	.official-account {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.official-account::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .6);
	}

	.official-account-body {
		position: relative;
		z-index: 1;
		width: 90%;
		background-color: #FFFFFF;
		border-radius: 10px;
		overflow: hidden;
	}

	.official-account-img {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.official-account-close {
		position: relative;
		z-index: 1;
		width: 60rpx;
		margin-bottom: 20rpx;
		margin-right: 5%;
		align-self: flex-end;
	}
</style>

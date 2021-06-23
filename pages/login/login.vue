
<template>
	<view class="login">
		<!-- 欢迎登陆 -->
         <image class="login-icon" src="../../static/images/login_icon.png"></image>
		 <!-- 登录提示 -->
		 <view class="login-tips-title">
		 	未登录
		 </view>
		 <view class="login-tips-text">
		 	请点击下方按钮跳转微信授权登录
		 </view>
		<!-- 登录按钮 -->
		<view class="login-btn">
			<van-button v-if="!isAgreement" round type="primary" block color="linear-gradient(to right, #E71919, #A31015)"
			 @click="login" size="large">微信授权登录</van-button>
			 <van-button v-else :loading="isDisabled" loading-text="登录中..." round type="primary" block color="linear-gradient(to right, #E71919, #A31015)" :disabled="isDisabled"
			  @click="newLogin" size="large">微信授权登录</van-button>
		</view>
		<view class="cancel-login-btn">
			<van-button  round type="default" block 
			 @click="cancelLogin" size="large">取消</van-button>
		</view>
		<!-- 协议 -->
		<view class="agreement">
			<xh-check @change="agreement" labelClass="agreement-read" labelColor="#000000" primaryColor="#E71919" :checked="isAgreement"
			 label="我已阅读并同意" />
			<text class="agreement-name" @click="agreementLook('/index/index/bfxl.html')">《隐私协议》</text>
			<text class="agreement-name" @click="agreementLook('/index/index/bfxlfl.html')">《平台服务协议》</text>
		</view>
		<!-- login error -->
		<view class="login-warn">
			<icon type="info" size="18" color="#e8a010"/>
			<text class="login-warn-tips">登录遇到问题请</text>
			<text class="link-service" @click="linkService">联系客服</text>
		</view>
		<!-- 消息提示 -->
		<xh-notify ref="xhNotify"/>
	</view>
</template>

<script>
	import {
		mapActions,
		mapGetters
	} from 'vuex'
	import {
		PLAQUEADVERTISING
	} from '@/utils/index.js'
	import {baseUrl} from '@/utils/http.js'
	import {redirect,clearRedirect} from '@/utils/routerIntercept.js'
	//插屏广告管理
	let _PLAQUEADVERTISING = PLAQUEADVERTISING()
	//用户信息
	let _userData; 
	export default {
		data() {
			return {
				isDisabled: false,
				isAgreement: false,
				baseUrl:baseUrl
			}
		},
		onLoad(option) {
			//是否同意了协议
			if (option.isAgreement) {
				this.isAgreement = true
			}
			//初始化广告
			_PLAQUEADVERTISING.init('adunit-7d704bfc0a67a060')
		},
		onReady() {
			//播放广告
			_PLAQUEADVERTISING.play()
		},
		onShow() {
			_userData = null
		},
		computed:{
			...mapGetters(['token'])
		},
		methods: {
			...mapActions({
				wxlogin: 'login/wxlogin',
				updateUser: 'login/updateUser',
				getUserInfo: 'login/getUserInfo',
				updateUserNew: 'login/updateUserNew'
			}),
			//跳转客服
			linkService(){
				uni.switchTab({
					url:'/pages/tabBar/service/service'
				})
			},
			//返回键监听
			homeClick(){
				if(!this.token){
					this.wxlogin().then(function(res){})
				}
				uni.reLaunch({
					url:'/pages/tabBar/home/index'
				})
		    },
			//协议勾选
			agreement(flag) {
				this.isAgreement = flag
			},
			//查看协议
			agreementLook(link) {
				link = this.baseUrl + link
				uni.navigateTo({
					url: `/pages/webview/webview?link=${link}#ISLOGIN`
				})
			},
			//取消登录
			cancelLogin(){
				if(!this.token){
					this.wxlogin().then(function(res){})
				}
				uni.reLaunch({
					url:'/pages/tabBar/home/index'
				})
			},
			newLogin(){
				//未勾选协议
				if (!this.isAgreement) {
					return this.$refs.xhNotify.show({
						type: "warning",
						message: "请阅读并同意登录协议",
						duration: 2000
					})
				}
				//防止多次点击
				this.isDisabled = true
				//是否已获取用户信息 防止多次调用获取用户信息弹窗
				if(_userData){
				  return this.newWXLogin(_userData)
				}
				//获取用户加密信息
				wx.getUserProfile({
					lang:"zh_CN",
					desc: '登录', //不写不弹提示框
					success: (user) => {
						_userData = user.userInfo
						if(!_userData||(typeof _userData === "object"&&Object.keys(_userData).length<7)){
							_userData = undefined
							this.isDisabled = false
							//仅提示用户 
							uni.showModal({
								title: '用户信息获取失败',
								content: '请点击登录按钮，重新尝试',
								showCancel: false
							})
							return
						}
						this.newWXLogin(_userData)
					},
					fail: (err) => {
						this.isDisabled = false
						//仅提示用户 
						uni.showModal({
							title: '微信绑定授权',
							content: '请允许获取个人信息后重新进入绑定页面',
							showCancel: false
						})
					}
				})
				
				
			},
			/*新微信登录*/
			newWXLogin(userInfo){
				
				this.wxlogin().then(res => {
					//发起登录
					this.updateUserNew(userInfo).then((res) => {
						//异步获取用户信息
						this.getUserInfo()
						//提示成功	
						this.$refs.xhNotify.show({
							type: "success",
							message: "登录成功",
							duration: 1500,
							onClose: () => {
								if (redirect) {
									//登录成功
									this.$router.redirectTo({
										url: redirect
									})
									return clearRedirect() //清空
								}
								//登录成功
								uni.switchTab({
									url: '/pages/tabBar/activity/index'
								})
							}
						})
					}).catch((err) => {
						this.isDisabled = false
						switch (err.code) {
							case -2: //用户未同意授权地理位置
								uni.showModal({
									title: '定位授权',
									content: '微信未授权定位或网络信号差(微信内设置无效时，可能需要前往“系统设置”允许微信定位权限)',
									showCancel: false,
									success: (res) => {
										this.isDisabled = false
										if (res.confirm) {
											wx.getSetting({
											  complete:(res) => {
											    if(res.authSetting&&!res.authSetting['scope.userLocation']){
												   return uni.openSetting({
														success: (res) => {
															if (!res.authSetting["scope.userLocation"]) {
																return uni.showToast({
																	title: '您未允许获取定位权限',
																	icon: 'none',
																	duration: 1500
																})
															}
														}
													})
												}
												/*前往提示页*/
												uni.navigateTo({
													url:'/pages/noLocation/noLocation'
												})
											   }
											})
										}
									}
								})
								break
							case 2://其它未知错误
								uni.showModal({
									title:'温馨提示',
									content:err.msg
								})
							    break	
						}
					})
				}).catch((err) => {
					// uni.hideLoading()
					this.isDisabled = false
					if(err.code === -1){
						uni.showModal({
							title:'温馨提示',
							content:err.msg
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {

        .login-icon{
			width: 260rpx;
			height: 240rpx;
			display: block;
			margin: 120rpx auto 50rpx;
		}
		
		.login-tips-title{
			font-size: 36rpx;
			color: #D33A29;
			text-align: center;
		}
		.login-tips-text{
			font-size: 28rpx;
			color: #666666;
			text-align: center;
			margin-bottom: 72rpx;
		}
		.login-btn,.cancel-login-btn {
			margin: 0 60rpx;
		}
		
		.cancel-login-btn {
			margin-top: 15rpx;
		}
		
		.van-button--default{
			color: #999;
		}

		.agreement {
			margin-top: 20rpx;
			display: flex;
			font-size: 25rpx;
			justify-content: center;
			align-items: center;
		}

		.agreement-read {
			margin-left: 10rpx;
		}

		.agreement-name {
			color: #A61115;
			padding: 10rpx 0;
		}
		
		.login-warn{
			margin-top: 130rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			&>.login-warn-tips{
				color: #99abb4;
				margin-left: 10rpx;
			}
			&>.link-service{
				color: #5ea8f2;
				text-decoration: underline;
				margin-left: 5rpx;
				padding: 10rpx 0;
			}
		}
	}
</style>


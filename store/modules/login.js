import {
	setToken,
	getToken,
	getUserInfo,
	setWxUserInfo,
	getWxUserInfo,
	getLocation,
	removeWxUserInfo,
	removeGetUserInfo,
	removeToken,
	setUid
} from '@/utils/auth.js'
import {
	xhCheckSession
} from '@/utils/index.js'

import log from '@/utils/log.js'

import {
	wxLogin,
	updateUser,
	getUser,
	getUserMobile,
	userprofile
} from '@/api/login.js'

import {getUserLocation} from '@/utils/getUserLocation.js'




const state = {
	userInfo: getUserInfo(), //用户信息
	wxUserInfo:getWxUserInfo(),
	token: getToken() || "", //token
	userLocation: getLocation(),
	uid:''
}

const mutations = {
	logout(state) { //退出登录
		state.token = ''
		state.userInfo = null
		removeWxUserInfo()
		removeGetUserInfo()
		removeToken()
	},
	setToken(state, token) { //token
		state.token = token
		setToken(token)
	},
	setWxUserInfo(state,wxUserInfo){
		state.wxUserInfo = wxUserInfo
		setWxUserInfo(wxUserInfo || {})
	},
	setUserInfo(state, userInfo) { //用户信息
		state.userInfo = userInfo
	},
	setUserLocation(state, data) { //用户定位信息
		state.userLocation = data
	},
	setUid(state, data){
		state.uid = data
	}
}

const actions = {
	/*用户登录*/
	wxlogin({
		commit
	},isNoSession = false) {
		return new Promise((resolve, reject) => {

			xhCheckSession(isNoSession).then(() => {

				resolve()

			}).catch(() => {

				//微信登录
				uni.login({
					provider: 'weixin',
					success: function(res) {
						//code用于获取openid
						let code = res.code
						//传给后端
						wxLogin({
							code: code
						}).then(res => {
							if (res.code == 1) {
								commit('setToken', res.data.token)
								commit('setUid', res.data.uid)
								return resolve()
							}
							uni.showModal({
								title:'温馨提示',
								content:res.msg
							})
							reject({
								code: 0,
								msg: res.msg
							})
						}).catch((err) => {
							reject({
								code: -1,
								msg: JSON.stringify(err)
							})
						})
					},
					fail: function(err) {
						reject({
								code: -1,
								msg: JSON.stringify(err)
							})
					}
				})
			})

		})
	},
	//获取用户信息
	getUserInfo({
		commit
	},isMobile = false) {
		getUser().then(res => {
			if (res.code == 1) {
				if(isMobile&&!/^1\d{10}$/.test(res.data.mobile)){
				   return
				}
				commit('setUserInfo', res.data)
			}
		})
	},
	//新用户更新
	updateUserNew({
		commit
	},userInfo){
		return new Promise((resolve, reject) => {
		
			//存储微信api返回的用户信息
			setWxUserInfo(userInfo)
			//获取用户定位信息
			getUserLocation(true).then(data => {
				//保存用户定位信息
				if(!data.isold)commit('setUserLocation', data.data)
				//传给后端
				userprofile(userInfo).then(res => {
					if (res.code == 1) {
						// console.log('授权登录成功')
						return resolve()
					}
					//异常情况
					uni.showModal({
						title: '温馨提示',
						content: res.msg,
						complete() {
							reject({
								code: 2,
								msg: res.msg
							})
						}
					})
					
				}).catch((err) => {
					reject({
						code: 2,
						msg: '登录异常，请重新尝试'
					})
				})
					
			}).catch((err) => {
				reject({
					code: -2,
					msg: '用户未同意授权地理位置'
				})
			})
			
		})
	},
	//更新用户信息
	updateUser({
		commit
	}) {
		
		return new Promise((resolve, reject) => {
			
			//获取用户加密信息
			uni.getUserInfo({
				provider: 'weixin',
				withCredentials: true,
				lang: 'zh_CN',
				success: function(infoRes) {
					//存储微信api返回的用户信息
					setWxUserInfo(infoRes.userInfo)
					//获取用户定位信息
					getUserLocation(true).then(data => {
						//保存用户定位信息
						if(!data.isold)commit('setUserLocation', data.data)
						//传给后端
						updateUser({
							encryptedData: infoRes.encryptedData,
							iv: infoRes.iv,
							...data.data
						}).then(res => {
							if (res.code == 1) {
								// console.log('授权登录成功')
								return resolve()
							}
							//异常情况
							uni.showModal({
								title: '温馨提示',
								content: res.msg,
								complete() {
									reject({
										code: 2,
										msg: res.msg
									})
								}
							})
							
						}).catch((err) => {
							reject({
								code: 2,
								msg: '登录异常，请重新尝试'
							})
						})

					}).catch((err) => {
						reject({
							code: -2,
							msg: '用户未同意授权地理位置'
						})
					})
				},
				fail: function(err) {
					reject({
						code: 0,
						msg: '用户未同意授权获取用户信息'
					})
				}
			})

		})
	},
	//更新用户手机
	updateUserMobile({
		commit,
		state
	}, e) {

		uni.showLoading({
			mask: true,
			title: '请稍后···'
		})

		return new Promise((resolve, reject) => {
			//配置参数
			let {
				iv,
				encryptedData,
				errMsg
			} = e.detail
			
			//有值代表获取成功
			if (iv&&encryptedData) {
				//延时调用
					getUserMobile({
						iv,
						encryptedData
					}).then(res => {

						uni.hideLoading()

						if (res.code == 1) {
							
							resolve()
							
						} else {
							uni.showModal({
								title: '温馨提示',
								content: res.msg,
								showCancel: false
							})
						}
					}).catch(function() {
						reject()
						uni.hideLoading()
					})
				return
			}
			uni.hideLoading()
			//未同意授权情况
			uni.showModal({
				title: '温馨提示',
				content:'亲,兑换需要授权手机号!',
				showCancel: false
			})
			reject()
			log.setFilterMsg('getUserMobile')
			log.info("getUserMobile error==>" + JSON.stringify(e.detail))
		})

	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

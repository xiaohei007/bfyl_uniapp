import {
	setStorage,
	getStorage
} from '@/utils/auth.js'
import {wgs84togcj02} from './coordtransform.js'
import {VALID_CACHE} from './index.js'
import log from '@/utils/log.js'
// import {
// 	_startLoading,_closeLoading
// } from '@/utils/http.js'
let _overtime = null

const locationError = 	 {
			 'getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF':'没有打开定位开关或WiFi进行定位',
			 'getLocation:fail:ERROR_NETWORK':'网络异常',
			 'getLocation:fail:auth denied':'用户在小程序中未授权',
			 'getLocation:fail auth deny':'用户在小程序中未授权',
			 'getLocation:fail authorize no response':'用户在小程序中未授权',
			 'getLocation:fail:ERROR_SERVER_NOT_LOCATION':'微信服务器位置错误',
			 'getLocation:fail system permission denied':'系统设置里面禁止了微信获取地理位置',
			 'getLocation:fail:auth canceled':'用户取消授权',
			 'getLocation:fail error':'未知异常',
			 'getLocation:fail:timeout':'定位超时'
	 }

//错误信息转义
function getErrorMsg(err){
	
     return locationError[err]
	
}

//判断是否是微信禁止了定位
function  isWXPermission(err){
	
     return {isWXPermission:err === 'getLocation:fail system permission denied',errText:getErrorMsg(err)||err}
	
}

//获取用户定位信息
export function getUserLocation(isFailBack = false) {
	//开启loading
	// _startLoading()

	return new Promise((resolve, reject) => {
		let cache = getStorage('getUserLocation')
		    cache = cache&&JSON.parse(cache)
		//判断是否有缓存，并且在缓存有效期
		if (cache && VALID_CACHE(cache.prescription||120, cache.lastModified)) {
			//关闭loading
			// _closeLoading()
			return resolve({
				data: cache.data,
				isold: true
			})
		}
		//超时处理 超30秒没回调就宣布超时
		_overtime = setTimeout(function() {
			
			reject({isWXPermission:false,errText:"获取超时了~"})
			
		}, 30*1000);
		

		//不在缓存有效期,直接重新获取		
		uni.getLocation({
			type: 'wgs84',
			success: (res) => {
				clearTimeout(_overtime)
                //坐标转化
				let parmas = wgs84togcj02(res.longitude,res.latitude)
				
				//成功返回结果
				resolve({
					data: parmas
				})

			setStorage('getUserLocation', JSON.stringify({
					lastModified: Date.now(),
					data: parmas
				}))
                
				// _closeLoading()
			},
			fail: function(err) {
				clearTimeout(_overtime)
				//关闭loading
				// _closeLoading()
				//只打印异常情况
				log.setFilterMsg('getLocation')
				log.error('getLocation：' + JSON.stringify(err))
				
				// _locationType = 'wgs84'
				if (isFailBack) {//异常自行处理
					return reject(isWXPermission(err.errMsg))
				}
				wx.showModal({
					title: '定位授权',
					content: '微信未授权定位或网络信号差(微信内设置无效时，可能需要前往“系统设置”允许微信定位权限)',
					success: (res) => {
						if (res.confirm) {
							wx.getSetting({
							  complete (res) {
							    if(res.authSetting&&!res.authSetting['scope.userLocation']){
								   return wx.openSetting({
										success: (res) => {
											if (!res.authSetting["scope.userLocation"]) {
												return wx.showToast({
													title: '您未允许获取定位权限',
													icon: 'none',
													duration: 1500
												})
											}
										}
									})
								}
								wx.showToast({
									title: getErrorMsg(err.errMsg)||err.errMsg,
									icon: 'none',
									duration: 4000
								})
							   }
							})
						}
					}
				})
				// //异常处理
				// reject()
			}
		})

	})
}





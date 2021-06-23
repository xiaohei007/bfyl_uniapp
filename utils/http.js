import store from '@/store'
import {
	VALID_CACHE
} from '@/utils/index'
import log from '@/utils/log.js'
import {
	nextRouterPath
} from '@/utils/routerIntercept.js'
import {
	setStorage,
	getStorage
} from '@/utils/auth.js'
import {getHttpErrMsg,isHttpErrMsg} from '@/utils/httpErrMsg.js'

/**
 * 使用配置
	return http.post({
		url:'/api/ad/get', //请求url
		data:{app:1},//请求参数
		isCache:Boolean,//是否开启缓存
		type:'cache',//接口类型 cache 属于缓存类型
		cacheMaxAge:Number,//缓存有效时间  单位秒
		isNoLoading:Boolean //true不开启loading  false开启loading 默认开启
	})
 */

export const baseUrl = "https://new-test.y1b.cn" //测试
export const fileBaseUrl = "https://test-file.y1b.cn" //测试
export const socket = "wss://new-test.y1b.cn/wss/" //测试
// export const baseUrl = "https://txc.y1b.cn" //正式
// export const fileBaseUrl = "https://file.y1b.cn" //正式
// export const socket = "wss://socket.y1b.cn/txc/"//正式

//默认请求头
const defaultHeader = {
	contentType: 'application/x-www-form-urlencoded'
	// 'Content-Type': 'application/json'
}

//统计loading次数
let _loadingNum = 0

//cache 缓存默认时间 单位秒
const _cacheTime = 1800

//请求封装
function XHService(data) {

	this.header = data.config.header || defaultHeader
	this.timeout = data.config.timeout || 30000
	this.dataType = data.config.dataType || 'json'
	this.responseType = data.config.responseType || 'text'
	this.interceptor = {
		request: data.req, //请求前拦截
		response: data.res //响应结果拦截
	}

}
/*get请求*/
XHService.prototype.get = function(config) {

	config.method = 'get'

	return this._request(config)
}
/*post请求*/
XHService.prototype.post = function(config) {

	config.method = 'post'

	return this._request(config)
}
/*请求前拦截*/
function _req(config) {
	//动态设置请求域名 
	config.url = baseUrl + config.url
	//是否需要加载loading
	if (!config.isNoLoading) _startLoading()

	return config
}
/*响应前拦截*/
function _res(response, config) { //响应拦截

	//隐藏loading
	if (!config.isNoLoading) _closeLoading()
	//请求成功响应
	if (response.statusCode == 200) {

		let result = response.data

		if (!result) return -3

		//身份验证失败 跳转到登录页
		if (result.code == -1 || result.code == 5) {
			//清除登录信息
			store.commit('login/logout')
			//如果当前页面为登录页
			if (nextRouterPath == '/pages/login/login') {
				
				return -4//防止跳转当前页
			}
			//用户提示
			uni.showToast({
				title: result.msg,
				icon: 'none',
				duration: 1500,
				complete: function() {
					setTimeout(function() {
						//前往登录
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000)
				}
			})

			return -2
		}
		//请求成功
		return result
	}
	//只打印异常情况
	if(!isHttpErrMsg(response.errMsg)){
		log.setFilterMsg('网络请求异常')
		log.warn('请求接口：' + config.url)
		log.warn('请求参数：' + JSON.stringify(config))
		log.error('响应结果：' + JSON.stringify(response))
	}
	return -3 //请求异常情况
}
//请求函数
XHService.prototype._request = function(config) {

	//动态加入token
	let token = store.getters.token
	if (token) {
		config.header = {
			"authorization": token
		}
	}

	return new Promise((resolve, reject) => {
		//请求拦截处理请求数据
		if (this.interceptor.request) {
			config = this.interceptor.request(config)
		}
		//是否开启了缓存
		if (config.isCache) {
			//从本地获取缓存
			let cache = getStorage(config.url)
			cache = cache && JSON.parse(cache)

			//有缓存并且在缓存有效期
			if (cache && VALID_CACHE(config.cacheMaxAge || _cacheTime, cache.lastModified)) {
				//关闭loading
				if (!config.isNoLoading) _closeLoading()
				// console.log('缓存有效，走缓存囖',config)
				//直接返回缓存值
				return resolve({
					code: 1,
					data: cache.data
				})
			}
		}

		//发起请求
		uni.request({
			url: config.url,
			method: config.method,
			data: config.data,
			header: config.header || this.header,
			dataType: config.dataType || this.dataType,
			responseType: config.responseType || this.responseType,
			timeout: config.timeout || this.timeout,
			complete: (response) => {

				let res = response
				
				//响应前拦截
				if (this.interceptor.response) {
					res = this.interceptor.response(res, config)
				}
				//已在登录页接口调用异常
				if(res == -4) return reject(response)
				//登录失效情况则不处理
				if (res == -2) return
				//异常情况
				if (res == -3) {
					//处理请求异常消息
					let statusCode = response.statusCode,
						errMsg = getHttpErrMsg(response.errMsg)
					//异常状态码
				    if(statusCode!==null&&statusCode!==undefined)errMsg += ' statusCode=' + statusCode	
					//提示给用户   
					wx.showModal({
						title: '请求异常',
						content: errMsg,
						showCancel: false
					})
					return reject(response)
				}
				//是缓存接口类型 --> 添加缓存
				if (config.type === 'cache'&&res) _setCacheData(res, config.url)
				//正确情况
				resolve(res)
			}
		})
	})

}
//添加缓存
function _setCacheData(res, url) {
	//请求正确，返回值不为空
	if (res.code == 1 && res.data) {
		//添加缓存
		setStorage(url, JSON.stringify({
			lastModified: Date.now(),
			data: res.data
		}))
	}
}

//开启loading
export function _startLoading() { 
	_loadingNum++
	uni.showLoading({
		title: '请稍后···',
		mask: true
	})
}
//关闭loading
export function _closeLoading() {
	if (_loadingNum >= 1) {
		//延时调用
		setTimeout(() => {
			_loadingNum--
			if (_loadingNum == 0) uni.hideLoading() //隐藏
		}, 100)
	}
}
/*创建请求实例*/
export const HTTP = new XHService({
	config: {}, //全局配置 
	req: _req, //请求前拦截
	res: _res //响应拦截
})

import {HTTP} from '@/utils/http.js';

//微信登录
export function wxLogin(data) {
	return HTTP.post({
		url: '/api/post/wxlogin',
		data
	})
}
//更新用户信息
export function updateUser(data) {
	return HTTP.post({
		url: '/api/user/update',
		data
	})
}
//获取用户信息 
export function getUser(data) {
	return HTTP.post({
		url: '/api/user/getuser',
		data,
		type:'cache',
		cacheMaxAge:10,
		isCache:true
	})
}
//小程序授权绑定手机 
export function getUserMobile(data) {
	return HTTP.post({
		url: '/api/user/mnmobile',
		data,
		isNoLoading: true
	})
}
//新版授权登录
export function userprofile(data) {
	return HTTP.post({
		url: '/api/user/userprofile',
		data
	})
}
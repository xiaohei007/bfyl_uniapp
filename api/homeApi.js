import {HTTP} from '@/utils/http.js'

//获取广告地址
export function adGet() {
	return HTTP.post({
		url: '/api/ad/get',
		isNoLoading: true
	})
}

//获取广告地址
export function getArticle() {
	return HTTP.post({
		url: '/api/tools/article',
		isNoLoading: true
	})
}
//获取广告地址
export function givelike() {
	return HTTP.post({
		url: '/api/tools/givelike',
		isNoLoading: true
	})
}
import {HTTP} from '@/utils/http.js'

//获取广告地址
export function adGet() {
	return HTTP.post({
		url: '/api/ad/get',
		isNoLoading: true
	})
}

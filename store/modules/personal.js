import {
	adGet
} from '@/api/homeApi.js'

const state = {
	adData: null //广告数据
}

const mutations = {
	setAdData(state, data) { //广告数据
		state.adData = data
	}
}

const actions = {
	//获取广告数据
	getAdData({
		commit
	}) {
			adGet().then(res => {
				let data = res.data
				if (res.code == 1 && data) {
					commit('setAdData', data)
					return
				}
				uni.showModal({
					title:'温馨提示',
					content:res.msg
				})
			})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}


const state = {
	isConnected: true //当前网络状态
}

const mutations = {
	setConnected(state, isConnected) { //网络状态
		state.isConnected = isConnected
	}
}

const actions = {
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}

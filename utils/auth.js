
let baseUrl = "https://txc.y1b.cn"
// let baseUrl = "https://new-test.y1b.cn"
/*token*/
export function setToken(data) {
	setStorage('token', data)
}

export function getToken() {
	return getStorage('token')
}

export function removeToken() {
	uni.removeStorageSync('token')
}

/*微信扫拉环进入时的二维码值*/
export function setWxScanQrCode(data){ 

	setStorage('wxScanQrCode',data)
	 
}
export function getWxScanQrCode(){
	return getStorage('wxScanQrCode')
}
export function removeWxScanQrCode(){
	try{
		uni.removeStorageSync('wxScanQrCode') 
	}catch(e){
		//异常情况
	}
}

/*用户信息*/
// export function setUserInfo(data) {//由接口缓存取代
// 	setStorage('userInfo', JSON.stringify(data))
// }

export function getUserInfo() {
	let userInfo = getStorage(baseUrl+'/api2/cuser/getuser')
	if (userInfo) {
		return JSON.parse(userInfo).data
	}
	return undefined
}

export function removeGetUserInfo() {
	uni.removeStorageSync(baseUrl+'/api2/cuser/getuser')
}

/*微信用户信息*/
export function setWxUserInfo(data) { 
	setStorage('wxUserInfo', JSON.stringify(data)) 
}

export function getWxUserInfo() {
	let userInfo = getStorage('wxUserInfo')
	if (userInfo) {
		return JSON.parse(userInfo)
	}
	return undefined
}

export function removeWxUserInfo() {
	uni.removeStorageSync('wxUserInfo')
}

/*获取经纬度*/
export function getLocation() {
	let cache = getStorage('getUserLocation')
	    cache = cache&&JSON.parse(cache) 
	return cache && cache.data
}


export function setStorage(key,data){
	
	try{
	  uni.setStorageSync(key,data)	
	}catch(e){
		//TODO handle the exception
	}
}

export function getStorage(key){
	let cache = null
	try{
	 cache = uni.getStorageSync(key)	
	}catch(e){
		//TODO handle the exception
	}
	return cache
}


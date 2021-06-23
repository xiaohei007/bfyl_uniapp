import log from '@/utils/log.js'
import store from '@/store'

//转化url地址
export function parseQuery(url = '') {
	let o = {}
	let queryString = url.split('?')[1]
	if (queryString) {
		queryString
			.split('&')
			.forEach(item => {
				let [key, val] = item.split('=')
				val = val ? decodeURI(val) : true
				//转码无值赋值true
				if (o.hasOwnProperty(key)) {
					//已有属性转为数组
					o[key] = [].concat(o[key], val)
				} else {
					o[key] = val
				}
			})
	}
	return o
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
	let timeout, args, context, timestamp, result

	const later = function() {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp

		// 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function(...args) {
		context = this
		timestamp = +new Date()
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}

		return result
	}
}


//缓存时间是否在有效期
export function VALID_CACHE(cacheMaxAge, lastModified) {

	return lastModified + cacheMaxAge * 1000 >= Date.now()

}


//插屏广告
export function PLAQUEADVERTISING(option = {}) {
	return {
		interstitialAd: null,
		adUnitId:'',
		init: function(adUnitId) {
			this.adUnitId = adUnitId
			// 在页面onLoad回调事件中创建插屏广告实例
			if (wx.createInterstitialAd) {
				this.interstitialAd = wx.createInterstitialAd({
					adUnitId: adUnitId
				})
				this.interstitialAd.onLoad(() => {})
				this.interstitialAd.onError((err) => {
					// if (this.interstitialAd) {
					// 	this.interstitialAd.destroy() //销毁实列
					// }
					// this.interstitialAd = wx.createInterstitialAd({
					// 	adUnitId: adUnitId
					// })
				})
				this.interstitialAd.onClose(() => {
					if (option.onClose) option.onClose()
				})
			}
		},
		destroy:function(){
			if (this.interstitialAd) this.interstitialAd.destroy() //销毁实列
		},
		play: function() {
			// 在适合的场景显示插屏广告
			if (this.interstitialAd) {
				this.interstitialAd.show().catch((err) => {
					if (option.errback) option.errback()
				})
			}
		}

	}
}

//音频播放
export function xhAudio(config) { //url,onPlay,onError,onEnded

	let innerAudioContext = uni.createInnerAudioContext()
	innerAudioContext.src = config.url
	//音频开始播放
	innerAudioContext.onPlay(() => {
		if (config.onPlay) config.onPlay()
	})
	//音频播放异常
	innerAudioContext.onError(() => {
		if (config.onError) config.onError()
	})
	//音频播放自然结束
	innerAudioContext.onEnded(() => {
		if (config.onEnded) config.onEnded()
	})

	return {
		innerAudioContext,
		setSrc(url){
			this.innerAudioContext.src = url
		},
		play(url) { //播放
			//有新值，赋值播放
			if (url) this.innerAudioContext.src = config.url
			//直接播放
			this.innerAudioContext.play()
		},
		pause() { //暂停
			this.innerAudioContext.pause()
		},
		stop() { //停止
			this.innerAudioContext.stop()
		},
		seek(seek) { //设置进度
			this.innerAudioContext.seek = seek
		},
		destroy() {
			this.innerAudioContext.destroy()
		}
	}
}

//判断用户Session 是否过期
export function xhCheckSession(isNoSession) {

	return new Promise((resolve, reject) => {

		if (isNoSession) return reject()
		
		if(!store.getters.token) return reject()

		uni.checkSession({
			success: res => {
				resolve()
			},
			fail: res => {
				reject()
				//只打印异常情况
				// log.setFilterMsg('checkSession')
				// log.error('响应结果：' + JSON.stringify(res))
			}
		})

	})

}
/*时间转化*/
export function parseTime(time, cFormat) {  
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}


import {parseTime} from '@/utils/index.js'
/*2021 节假日期*/
const _festivals = [
	'2021-01-01',
	'2021-01-02',
	'2021-01-03',
	'2021-02-11',
	'2021-02-12',
	'2021-02-13',
	'2021-02-14',
	'2021-02-15',
	'2021-02-16',
	'2021-02-17',
	'2021-04-03',
	'2021-04-04',
	'2021-04-05',
	'2021-05-01',
	'2021-05-02',
	'2021-05-03',
	'2021-05-04',
	'2021-05-05',
	'2021-06-12',
	'2021-06-13',
	'2021-06-14',
	'2021-09-19',
	'2021-09-20',
	'2021-09-21',
	'2021-10-01',
	'2021-10-02',
	'2021-10-03',
	'2021-10-04',
	'2021-10-05',
	'2021-10-06',
	'2021-10-07'
]

export function isServiceTime(){
	
	let date = new Date()
	//是否属于节假日
	if(_festivals.indexOf(parseTime(date,'{y}-{m}-{d}'))>-1){
		return '很抱歉，目前是水果客服下班时间，请您留言问题。'
	}
	//当前小时
	let currTime = date.getTime()
	//当前日期
	let week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
	//服务时间
	let serviceTime = '8:30-17:30'
	let minDate = date.setHours(8,30,0,0)
	let maxDate = date.setHours(17,30,0,0)
	//判断是否在周末
	if(week === '日' || week === '六'){//和法定节假日保持一致
	   // serviceTime = '10: 00-19: 00'
	   return '很抱歉，目前是水果客服下班时间，请您留言问题。'
	   // if(hours<10||hours>=19){
	   // 	return `很抱歉，目前是水果客服下班时间，请您留言问题。服务时间：${serviceTime}`
	   // }
	 //非周末判断
	}else if(currTime<minDate||currTime>=maxDate){
		return `很抱歉，目前是水果客服下班时间，请您留言问题。服务时间：${serviceTime}`
	}
	//不弹窗
	return ''
}
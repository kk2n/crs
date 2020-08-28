import moment from 'moment'
// 函数节流
// let count=0;
// function fn1(){
//     count++;
//     console.log(count)
// }
// //100ms内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔200ms至少执行一次
// document.onmousemove=ecDo.delayFn(fn1,100,200)
export function delayFn(fn, delay, mustDelay) {
  let timer = null
  let tStart = null
  return function() {
    let that = this
    let args = arguments
    let t_cur = Number(new Date())

    //先清理上一次的调用触发（上一次调用触发事件不执行）
    clearTimeout(timer)
    //如果不存触发时间，那么当前的时间就是触发时间
    if (!tStart) {
      tStart = t_cur
    }
    //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
    if (t_cur - tStart >= mustDelay) {
      fn.apply(that, args)
      tStart = t_cur
    } else {
      //否则延迟执行
      timer = setTimeout(() => {
        fn.apply(that, args)
      }, delay)
    }
  }
}

//获取文件的后缀
export function getFileExtensionName(pathFileName) {
  let reg = /(\\+)/g
  let pString = pathFileName.replace(reg, '#')
  let arr = pString.split('#')
  let lastString = arr[arr.length - 1]
  let houZuo = lastString.split('.')

  return houZuo[houZuo.length - 1]
}

export function wxValidator(rule, value, callback) {
  if (/[\u4e00-\u9fa5]/.test(value)) {
    return callback('微信格式有误')
  }
  callback()
}
export function qqValidator(rule, value, callback) {
  if (/[\u4e00-\u9fa5]/.test(value)) {
    return callback('QQ格式有误')
  }
  callback()
}

export const mobilePattern = /^1[3456789]\d{9}$/

//保留数字后两位，常用于金额
export let float2 = function(floatvar) {
  let f_x = parseFloat(floatvar)

  if (isNaN(f_x)) return '0.00'
  f_x = Math.round(f_x * 100) / 100
  let s_x = f_x.toString()
  let pos_decimal = s_x.indexOf('.')

  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0'
  }
  return s_x
}

export const fmoment = (date, ft = 'YYYY-MM-DD') => (date ? moment(date).format(ft) : undefined)

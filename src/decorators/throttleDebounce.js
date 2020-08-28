import { throttle as thr, debounce as deb } from 'underscore'

/**
 * 函数防抖，一段时间后才能调用某函数
 * @return {*}
 * @param waite
 * @param param 为true  触发后先调用一次，然后waite的时间之内，不会再次调用，过了waite后，才能再次触发调用,
 *              为false 等waite后调用一次，在等waite，才能再次触发调用
 */
export let debounce = (waite, param = true) =>
  function myFn(target, name, descriptor) {
    let fn = deb(descriptor.value, waite, param)
    descriptor.value = function(...args) {
      return fn.apply(this, args)
    }
    return descriptor
  }

/**
 * 【函数节流】,触发执行，等waite,再次执行，也是就，触发多次后，等待waite后再执行
 * @return {*}
 * @param waite
 * @param param ,可选参数，禁用最后一次执行的话，传递{trailing: false}
 *               禁用第一次首先执行的话，传递{leading: false}
 */
export let throttle = (waite, param = {}) =>
  function myFn(target, name, descriptor) {
    let fn = thr(descriptor.value, waite, param)
    descriptor.value = function(...args) {
      return fn.apply(this, args)
    }
    return descriptor
  }

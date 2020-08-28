import { intersection, isArray, isFunction, isObject, isString, isUndefined, keys, mapObject, values } from 'underscore'
import { connect } from 'ymcore/createModel'

/**
 * action创建功能的公共封装
 * @param model object  每个模块的model对象,
 * 例：
 {
   name:"App"   // string  模块的名称,它应按模块命名，用在store树上的键，并且会使用，类似：App_getData作为actionType
   initState:{} // object 进入reduce的默认值
   // object 页面执行的动作,里面必须有reduce, reduce为箭头函数，对应redux-reduce里的语句，
   【其他】promise为选填,他为对象，例{ url: '/', method: 'get' }
   【其他】action为选填,函数，，携带信息(参数)进入reduce,例(payload,meta)=>{},参数：payload,meta
   getAges: {
    promise:{ url: '/', method: 'get' },
    reduce: (state, res) => {
      return {
        ...state,
        id: 1
      }
    }
  }
 }
 * @param modelState //箭头函数，参数为所有的state,从reduce里取部分state给模块，
 * @param otherAction //箭头函数，参数为当前model的所有action, 从reduce里取部分action给模块，如需要其他模块action请自行引入,注意action名称重复
 * @return 返回一个对象，{name, connect: *, reduce: []}
 例：{
   name,// string model的name，用于：store树的键
   connect: *, //redux的connect方法，用于，模块用装饰器的方法导入【部分的state】和【部分的action】
   reduce: [reduce,initState] //1.为当前模块需要reduce的数据，2.当前模块的初始值，用于导入全局的store
 }
 */
export function createModel(model = {}, modelState, otherAction) {
  //验证参数
  if (!isObject(model)) throw new Error(`"model"的类型不正确！仅支持object`)
  //业务代码
  let { name, initState, upState, ...actions } = model,
    reduce = {}
  //处理upState
  let upStateToActionArr = {}
  mapObject(upState, (a, aa) => {
    console.log('aa', aa)
    upStateToActionArr[aa + 'Up'] = aa
  })
  console.log('upStateToActionArr', upStateToActionArr)
  let act = mapObject({ ...upStateToActionArr, ...actions }, (a, aa) => {
    if (isString(a) && ['post', 'get', 'POST', 'GET'].includes(a.split(' ')[0])) {
      //将a处理成对象
      a = {
        autoReduce: true,
        promise: {
          url: a
        }
      }
    }
    //autoReduce为真时，处理初始值
    if (a.autoReduce) {
      //初始值
      initState = {
        ...initState,
        [`${aa}Res`]: {
          ...initState[`${aa}Res`],
          msg: '',
          status: false,
          data: null
        }
      }
    }
    //************
    //处理reduce
    //************
    reduce[`${name}_${aa}`] = (state, res) => {
      //如果是字符，直接返回，改变数据
      if (isString(a)) {
        if (['post', 'get', 'POST', 'GET'].includes(a.split(' ')[0])) {
          return {
            ...state,
            ...a.reduce,
            [`${aa}Res`]: {
              ...state[`${aa}Res`],
              msg: res.payload.message || res.payload.msg,
              status: res.payload.status,
              data: res.payload.data
            }
          }
        } else {
          //**Up的方法
          return {
            ...state,
            [a]: res.meta
          }
        }
      }
      //验证reduce
      if (!isFunction(a.reduce) && !isUndefined(a.reduce) && !isObject(a.reduce))
        throw new Error(`${name}模块里${a}的reduce类型不正确！仅支持function,object,undefined`)
      //当autoReduce存在时
      if (a.autoReduce) {
        //reduce为函数时，执行该函数
        if ((!isFunction(a.reduce) && isObject(a.reduce)) || isUndefined(a.reduce)) {
          //reduce为对象时，与原state合并,并自动处理reduce
          return {
            ...state,
            ...a.reduce,
            [`${aa}Res`]: {
              ...state[`${aa}Res`],
              msg: res.payload.message || res.payload.msg,
              status: res.payload.status,
              data: res.payload.data
            }
          }
        } else {
          return a.reduce(state, res)
        }
      } else if (isFunction(a.reduce)) {
        //没有autoReduce时，并且reduce是函数
        return a.reduce(state, res)
      } else if (isObject(a.reduce)) {
        //reduce是对象
        return {
          ...state,
          ...a.reduce
        }
      } else {
        //如果reduce和autoReduce都为undefined,抛出错误
        throw new Error(
          `${name}模块里${a}的reduce错误！它支持的类型为function,object，但是现在reduce：${a.reduce}，autoReduce：${a.autoReduce}`
        )
      }
    }
    //返回action
    return meta => {
      //如果有action，直接执行action，//调用方法，可以是serve层调用接口
      if (!isFunction(a.action) && !isUndefined(a.action))
        throw new Error(`${name}模块里${aa}的类型不正确！仅支持function`)
      if (!isFunction(a.promise) && !isUndefined(a.promise) && !isObject(a.promise) && !isString(a.promise))
        throw new Error(`${name}模块里${aa}的promise类型不正确！仅支持function,object,undefined,string`)
      if (a.action) {
        return async dispatch => {
          dispatch({
            type: `${name}_${aa}`,
            payload: await a.action(meta),
            meta
          })
        }
      } else {
        //如果没有action
        // 只有promise存在，不返回状态
        if (isFunction(a.promise)) {
          let { ...promise } = a.promise(meta)
          let { ...param } = meta
          return {
            types: [`${name}_${aa}`],
            promise: { ...promise, param, meta },
            meta
          }
        } else if (isString(a.promise)) {
          //promise是个字符串时，无法设置config配置
          let allUrl = a.promise.split(' ')
          if (['get', 'post', 'GET', 'POST'].includes(allUrl[0])) {
            let promise = {
              url: allUrl[1],
              method: allUrl[0]
            }
            return {
              types: [`${name}_${aa}`],
              promise: { ...promise, param: meta },
              meta
            }
          }
        } else if (isObject(a.promise)) {
          //promise是个对象时
          let allUrl = a.promise.url.split(' ')
          if (['get', 'post', 'GET', 'POST'].includes(allUrl[0])) {
            let promise = {
              url: allUrl[1],
              method: allUrl[0]
            }
            return {
              types: [`${name}_${aa}`],
              promise: { ...promise, param: meta },
              meta
            }
          }
          return {
            types: [`${name}_${aa}`],
            promise: {
              ...a.promise,
              param: meta,
              meta,
              config: a.promise.config
            },
            meta
          }
        }
        //既没有promise,有没有action，返回原始的action
        return {
          type: [`${name}_${aa}`],
          meta
        }
      }
    }
  })
  //处理modelState
  if (!isFunction(modelState) && !isUndefined(modelState) && !isString(modelState) && !isObject(modelState))
    throw new Error(`modelState的类型不正确！仅支持function,undefined,String,Object`)
  if (!modelState) {
    modelState = state => ({ ...state })
  }
  if (typeof modelState === 'string') {
    let key = modelState
    modelState = state => ({ [key]: state[key] })
  }
  if (typeof modelState === 'object') {
    let { key, ...obj } = modelState
    modelState = state => ({
      [key]: { ...obj, ...(state[name] || state[key]) }
    })
  }
  // 如果有第三个参数，代表设置新的mapAction
  if (!isFunction(otherAction) && !isUndefined(otherAction))
    throw new Error(`"otherAction"的类型不正确！仅支持function,undefined`)
  if (otherAction) {
    return {
      name,
      actions: act,
      connect: connect(
        modelState,
        otherAction(act)
      ),
      reduce: { [name]: [reduce, { ...initState, ...upState }] }
    }
  }
  // 如果没有第三个参数，则返回所有的Action
  return {
    name,
    actions: act,
    connect: connect(
      modelState,
      act
    ),
    reduce: { [name]: [reduce, { ...initState, ...upState }] }
  }
}
/**
 merge合并reduce,用于合并二级页面或三级页面的reduce值
 * @param parent 对象，合并的第一值
 * @param child 数组，要合并的其他reduce(reduce是对象)
 */
// export function mergeReduce(parent = {}, child = []) {
//   let temp = values(parent)[0]
//   const tParent0 = keys(temp[0])
//   const tParent1 = keys(temp[1])
//   child.forEach(a => {
//     //判断是否存在重复的键
//     const vVal0 = values(a)[0][0]
//     const vVal1 = values(a)[0][1]
//     const ActionJJ = intersection(tParent0, keys(vVal0))
//     if (ActionJJ.length > 0) throw new Error('存在相同的Action' + ActionJJ.join(','))
//     const initStateJJ = intersection(tParent1, keys(vVal1))
//     if (initStateJJ.length > 0) throw new Error('存在相同的initState：' + initStateJJ.join(','))
//     //数据合并
//     temp[0] = { ...temp[0], ...vVal0 }
//     temp[1] = { ...temp[1], ...vVal1 }
//   })
//   return { [keys(parent)[0]]: temp }
// }
// 完整的例子
/*
 import createAction from '../../utils/createAction'
 import { actions as aa } from '../demo2/demo.model'
 export const model = {
 name: 'Demo',
 initValue: {
 id2: ''
 },
 getAges: {
 reduce: (state, res) => {
 return {
 ...state,
 id: 2
 }
 }
 },
 getAges2: {
 reduce: (state, res) => {
 return {
 ...state,
 id2: 2
 }
 }
 }
 }
 //其他模块action
 let { getAges: aa2 } = aa
 //取部分数据给页面[应用的页面]
 export let { name, connect, reduce, actions } = createAction(
 model,
 state => ({
 demo: state.Demo
 }),
 action => ({
 ...action,
 aa2: aa2
 })
 )
 //合并子模块
 reduce = mergeReduce(reduce, [account])
 */
//合并 merge合并reduce,用于合并二级页面或三级页面的reduce值
export function mergeReduce(parent, childred) {
  if (!isObject(parent)) {
    throw new Error(`mergeReduce方法第一个参数不是object`)
  }
  if (!isArray(childred)) {
    throw new Error(`mergeReduce方法第二个参数不是数组`)
  }
  const temp = values(parent)[0]
  childred.forEach(a => {
    //判断是否存在重复的键
    const ActionJJ = intersection(keys(temp[0]), keys(values(a)[0][0]))
    if (ActionJJ.length > 0) throw new Error(`${keys(parent)[0]}存在相同的Action：${ActionJJ.join(',')}`)
    const initStateJJ = intersection(keys(temp[1]), keys(values(a)[0][1]))
    if (initStateJJ.length > 0) throw new Error(`${keys(parent)[0]}存在相同的initState：${initStateJJ.join(',')}`)
    //数据合并
    temp[0] = { ...temp[0], ...values(a)[0][0] }
    temp[1] = { ...temp[1], ...values(a)[0][1] }
  })
  return { [keys(parent)[0]]: temp }
}

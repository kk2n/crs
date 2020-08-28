import { toArr } from 'ymcmp/array'
export function permissionObj(arr, obj = {}) {
  toArr(arr).map(a => (obj[a?.realmMark] = a?.realmMark && a.result))
  return obj
}

//权限字段
export let permissionDict = {
  realmMarkList: [
    //订单取消
    'MIS_ORDER_MANAGE_ORDER_CANCEL',
    // 订单停复课
    'MIS_ORDER_BUTTON_PAUSE',
    // 订单拆分操作
    'MIS_ORDER_BUTTON_SPLIT_ORDER',
    // 订单换老师操作
    'MIS_ORDER_BUTTON_EXCHANGE_TEACHER',
    //订单排课操作
    'MIS_ORDER_BUTTON_LESSON_ARRANGE',
    //门店是否可选
    'DRW_SHOP_LIST_SHOW',
    //赠送合同
    'DRW_CONTRACT_MANAGE_PRESENT_CONTRACT',
    //销假操作
    'DRW_LESSON_LIST_CANCEL_LEAVE'
  ]
}

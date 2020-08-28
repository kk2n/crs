import { createModel } from 'ymcore/createModel'

export const model = {
  name: 'OrderManage',
  initState: {
    order_listResult: {},
    order_purchaseChannel: []
  },
  // 查询订单列表
  queryOrderList: {
    promise: { url: `/biz/sales/order/xbk/order/list`, method: 'get' },
    reduce: (state, { payload, meta }) => {
      return {
        ...state,
        order_listResult: {
          ...payload.data,
          orderType: meta.orderType === undefined ? 'all' : meta.orderType,
          listResult: payload.status === 2000,
          params: meta
        }
      }
    }
  },
  //请求时段和日期
  getUser: {
    promise: { url: '/userInfoMultiple/liststudent', method: 'get' },
    autoReduce: true
  },
  //订单入库
  getQudaoList: {
    promise: { url: `/biz/sales/order/xbk/channel/list` },
    reduce: (state, { payload }) => {
      return {
        ...state,
        order_purchaseChannel: payload.data
      }
    }
  }
}

const selectData = {
  orderStatuses: [
    { code: '', name: '全部' },
    { code: 0, name: '已取消' },
    { code: 1, name: '待支付' },
    { code: 2, name: '已支付' },
    { code: 3, name: '已退款' },
    { code: 4, name: '已失效' },
    { code: 5, name: '已完成' },
    { code: 6, name: '退款失败' },
    { code: 7, name: '订单退款中' },
    { code: 8, name: '支付失败' }
  ]
}

export let { name, connect, reduce, actions } = createModel(model, state => ({
  demo: state.Demo,
  selectData,
  purchaseChannel: state.OrderManage.order_purchaseChannel,
  order_listResult: state.OrderManage.order_listResult,
  getUserRes: state.OrderManage.getUser
}))

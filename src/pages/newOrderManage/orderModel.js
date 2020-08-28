import { createModel } from 'ymcore/createModel'

export const model = {
  name: 'NewOrderList',
  initState: {
    orderId: '',
    nameOrMobile: '',
    orderStatus: '',
    startTime: '',
    endTime: '',
    shoppingChannel: '',
    periodForm: '',
    orderProperty: '',
    pageNum: '',
    pageSize: ''
  },
  orderIdUp: 'orderId',
  nameOrMobileUp: 'nameOrMobile',
  orderStatusUp: 'orderStatus',
  startTimeUp: 'startTime',
  endTimeUp: 'endTime',
  shoppingChannelUp: 'shoppingChannel',
  periodFormUp: 'periodForm',
  orderPropertyUp: 'orderProperty',
  pageNumUp: 'pageNum',
  pageSizeUp: 'pageSize',

  getGeadeList: 'get /biz/coursepack/order/grade/list',

  //清空
  filterClear: {
    reduce: state => ({
      ...state,
      //模糊搜索值
      orderId: '',
      nameOrMobile: '',
      orderStatus: '',
      startTime: '',
      endTime: '',
      shoppingChannel: '',
      periodForm: '',
      orderProperty: '',
      pageNum: '',
      pageSize: ''
    })
  }
}

export let { reduce, connect } = createModel(model)

import { createModel } from 'ymcore/createModel'
const orderModel = {
  name: 'Classperiod',
  upState: {
    isLoading: false,
    pageNum: 1,
    pageSize: 10
  },
  //获取用户信息列表
  getClassPeriodList: 'post  /yimi/mid/gradePeriod/list',
  pageNumUp: 'pageNum',
  pageSizeUp: 'pageSize',
  //清空
  filterClear: {
    reduce: state => ({
      ...state
    })
  }
}
export const { connect, reduce } = createModel(orderModel)

import { createModel } from 'ymcore/createModel'
const orderModel = {
  name: 'OrderList',
  upState: {
    selTeacher: undefined,
    selSubject: undefined,
    selCR: undefined,
    tingkeModal: false,
    studentName: '',
    teacherId: '',
    teacherInfo: false,
    isLoading: false,
    pageNum: 1,
    pageSize: 10,
    //模糊搜索值
    //客户编号查询
    searchUserId: undefined,
    //电话查询
    searchNumber: '',
    //订单状态查询
    selOrderStatus: undefined,
    // 订单编号查询
    searchOrderId: '',
    //订单类型
    selOrderType: -1,
    //订单属性
    selProperty: undefined,
    //合同编号
    searchContractId: '',
    //详情弹窗
    infoModalShow: false,
    //已选的订单编号
    orderId: undefined,
    //换老师弹窗
    hTeacherModalShow: false,
    //订单拆分
    cfModalShow: false,
    //排课
    pkModalShow: false
  },
  //获取用户信息列表
  getOrderList: 'post /biz/sales/order/getOrderListByConditions',
  //清空
  filterClear: {
    reduce: state => ({
      ...state,
      //模糊搜索值
      searchUserId: '',
      searchNumber: '',
      selOrderStatus: undefined,
      searchOrderId: '',
      selOrderType: -1,
      selProperty: undefined,
      searchContractId: '',
      selSubject: undefined,
      selCR: undefined
    })
  }
}
export const { connect, reduce } = createModel(orderModel)

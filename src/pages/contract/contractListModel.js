import { createModel } from 'ymcore/createModel'
const contractModel = {
  name: 'ContractList',
  upState: {
    grade: undefined,
    selCR: undefined,
    mendianList: undefined,
    zengSongModalShow: false,
    hasCR: false,
    //修改合同
    showEditModal: false,
    studentName: undefined,
    //支付时间
    zfsj: [],
    tfsj: [],
    contractProp: undefined,
    isFenPeiCR: false,
    isLoading: false,
    //详情弹窗
    infoModalShow: false,
    showDelectModal: false,
    pageNum: 1,
    pageSize: 10,
    //客户编号查询
    searchUserId: '',
    //电话查询
    searchNumber: '',
    //合同编号
    searchContractId: '',
    //合同状态
    selContractStatus: undefined,
    //合同类型
    selContractType: undefined,
    //分期形式
    selPaymentType: undefined,
    //已选合同id
    contractId: undefined,
    //已选合同编号
    contractNo: undefined,
    //已选客户编号
    clientFid: '',
    fenPeiClientFid: '',
    //已选客户姓名
    clientName: '',
    //撤销合同
    showBackoutModal: false,
    //撤销原因
    repealMemo: '',
    //删除合同
    showDelectModel: false,
    //分配老师
    showTeacherModal: false,
    selTeacher: undefined
  },
  //清空
  filterClear: {
    reduce: state => ({
      ...state,
      selCR: undefined,
      //模糊搜索值
      searchUserId: '',
      searchNumber: '',
      searchContractId: '',
      searchOrderId: '',
      selContractStatus: undefined,
      selContractType: undefined,
      selPaymentType: undefined,
      //已选的订单编号
      orderId: undefined,
      studentName: undefined,
      zfsj: [],
      tfsj: [],
      mendianList: undefined,
      grade: undefined
    })
  },
  //获取用户信息列表
  getContractList: 'get /biz/sales/contract/list',
  //获取分配CR的权限
  getCRPermission: 'get /biz/auth/operation/permission',
  pageNumUp: {
    reduce: (state, { meta }) => ({
      ...state,
      pageNum: meta
    })
  },
  pageSizeUp: {
    reduce: (state, { meta }) => ({
      ...state,
      pageSize: meta,
      pageNum: 1
    })
  }
}
export const { connect, reduce } = createModel(contractModel)

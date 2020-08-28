import { createModel } from 'ymcore/createModel'

const saleManageModel = {
  name: 'SaleManage',
  initState: {
    selOrgId: '',
    selYDOrgId: '',
    selUserId: '',
    yidingModalShow: false,
    sxsj: undefined
  },
  sxsjUp: 'sxsj',
  selYDOrgIdUp: 'selYDOrgId',
  yidingModalShowUp: 'yidingModalShow',
  selOrgIdUp: 'selOrgId',
  selUserIdUp: 'selUserId',
  isShowModalUp: 'isShowModal',
  getOrgList: 'get /biz/sales/juren/org/list',
  getUserList: 'get /biz/sales/juren/user/list'
}

export const { connect, reduce } = createModel(saleManageModel)

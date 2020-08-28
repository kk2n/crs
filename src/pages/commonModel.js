import { createModel } from 'ymcore/createModel'
import { permissionObj } from '../utils/permissionDict'
//公共的model
const model = {
  name: 'Common',
  upState: {
    userInfo: {
      listMenu: []
    },
    permission: {},
    collapsed: false
  },
  //获取用户信息
  staff: 'get /biz/auth/detail/staff',
  menu: 'get /biz/auth/menu',
  getPermission: {
    promise: 'post /biz/auth/operation/batch/permission',
    reduce: (state, { payload }) => ({
      ...state,
      permission: permissionObj(payload?.data)
    })
  }
}
export let { connect, reduce, actions } = createModel(model)

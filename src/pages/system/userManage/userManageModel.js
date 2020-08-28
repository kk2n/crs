import { createModel } from 'ymcore/createModel'

const demoModel = {
  //命名空间
  name: 'userManage',
  //初始化数据
  initState: {},
  kk2nUp: 'kk2n',
  getList: 'get /biz/list'
}
export const { connect, reduce } = createModel(demoModel)

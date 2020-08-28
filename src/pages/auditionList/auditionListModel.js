import { createModel } from 'ymcore/createModel'

const auditionListModel = {
  name: 'AuditionList',
  //初始化数据
  initState: {
    clientId: null, //客户id
    clientName: '', //客户名称
    systSource: '' //系统来源
  },
  clientIdUp: 'clientId',
  clientNameUp: 'clientName',
  systSourceUp: 'systSource',
  getList: 'post /biz/sales/stk/lesson/list'
}

export const { connect, reduce } = createModel(auditionListModel, state => {
  return {
    listenList: state.AuditionList.getListRes.data,
    clientId: state.AuditionList.clientId, //客户id
    clientName: state.AuditionList.clientName, //客户名称
    systSource: state.AuditionList.systSource //系统来源
  }
})
// export const { connect, reduce } = createModel(stListModalModel)

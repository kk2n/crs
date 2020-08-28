import { createModel } from 'ymcore/createModel'
import moment from 'moment'

let date = x => x && moment(x).format('YYYY-MM-DD')
const demoModel = {
  name: 'MGMManage',
  upState: {
    load: false,
    isEdit: false,
    inviteBn: false,
    invitedBn: false,
    pzImgModal: false,
    zsModal: false,
    selInviteId: '',
    inviteKS: '',
    invitedKS: '',
    inviteKM: undefined,
    invitedKM: undefined,
    filter: {
      fieldLike: undefined,
      invitedStatusId: undefined,
      inviteStatusId: undefined,
      channelId: undefined,
      inviteTime: []
    },
    params: {
      pageNum: 1,
      pageSize: 10,
      sort: 'desc'
    },
    selPingZheng: [],
    selImg: '',
    addModal: false,
    info: {}
  },
  //排序
  sorterUp: {
    reduce(state) {
      return {
        ...state,
        params: {
          ...state.params,
          sort: state.params.sort === 'desc' ? 'asc' : 'desc'
        }
      }
    }
  },
  //刷新
  refresh: {
    reduce(state) {
      return {
        ...state,
        params: {
          ...state.params,
          refresh: new Date()
        }
      }
    }
  },
  //搜索项变化
  filterUp: {
    reduce(state, { meta }) {
      return {
        ...state,
        filter: {
          ...state.filter,
          [meta.key]: meta.value
        }
      }
    }
  },
  //搜索
  onSearch: {
    reduce(state) {
      return {
        ...state,
        params: {
          ...state.params,
          ...state.sorter,
          fieldLike: state.filter.fieldLike,
          invitedStatusId: state.filter.invitedStatusId?.key,
          inviteStatusId: state.filter.inviteStatusId?.key,
          channelId: state.filter.channelId?.key,
          inviteStartTime: date(state.filter.inviteTime[0]),
          inviteEndTime: date(state.filter.inviteTime[1])
        }
      }
    }
  },
  //清空
  clear: {
    reduce(state) {
      return {
        ...state,
        filter: {
          fieldLike: undefined,
          invitedStatusId: undefined,
          inviteStatusId: undefined,
          channelId: undefined,
          inviteTime: []
        },
        params: {
          pageNum: 1,
          pageSize: 10,
          sort: 'desc',
          refresh: new Date()
        }
      }
    }
  }
}
export const { connect, reduce } = createModel(demoModel, 'MGMManage')

import { createModel } from 'ymcore/createModel'

const demoModel = {
  name: 'MyLeads',
  initState: {
    //选择的门店
    selShop: null,
    //来源
    clientFrom: null,
    //门店列表
    shopList: [],
    //模糊搜索值
    searchVal: '',
    //选择年级
    selGrade: undefined,
    //选择科目
    selSubject: undefined,
    //选择tab序列
    tabIndex: 1,
    //选择tab序列
    takeEndUp: [],
    followDate: [],
    //列表过滤条件
    getListParam: {
      1: {
        pageNum: 1,
        pageSize: 10,
        orderField: 'takeDate',
        orderType: 'DESC'
      },
      2: {
        pageNum: 1,
        pageSize: 10,
        orderField: 'takeDate',
        orderType: 'DESC'
      },
      3: {
        pageNum: 1,
        pageSize: 10,
        orderField: 'takeDate',
        orderType: 'DESC'
      }
    }
  },
  tabIndexUp: 'tabIndex',
  takeDateUp: 'takeDate',
  followDateUp: 'followDate',
  clientFromUp: 'clientFrom',
  //获取门店列表，下拉框
  getShopList: {
    promise: {
      url: `get /biz/open/copartner/shop/management/findShopList`
    },
    reduce: (state, { payload }) => ({
      ...state,
      shopList: payload.data,
      selShop: payload.data[0].shopId
    })
  },
  selShopUp: 'selShop',
  getList: 'get /biz/list',
  selGradeUp: 'selGrade',
  selSubjectUp: 'selSubject',
  searchValUp: 'searchVal',
  //清空
  filterCleal: {
    reduce: state => ({
      ...state,
      searchVal: '',
      selGrade: undefined,
      selSubject: undefined,
      clientFrom: null,
      takeEndUp: [],
      followDate: []
    })
  },
  pageNumUp: {
    reduce: (state, { meta }) => ({
      ...state,
      getListParam: {
        ...state.getListParam,
        [meta.type]: {
          ...state.getListParam[meta.type],
          pageNum: meta.pageNum
        }
      }
    })
  },
  pageSizeUp: {
    reduce: (state, { meta }) => ({
      ...state,
      getListParam: {
        ...state.getListParam,
        [meta.type]: {
          ...state.getListParam[meta.type],
          pageSize: meta.pageSize
        }
      }
    })
  },
  //请求列表
  getleadsList: 'get /biz/open/copartner/page/leads/my'
}
export const { connect, reduce } = createModel(demoModel)

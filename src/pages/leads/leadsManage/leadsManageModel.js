import { createModel } from 'ymcore/createModel'

const demoModel = {
  name: 'MyLeads',
  initState: {
    //选择的门店
    selShop: null,
    //门店列表
    shopList: [],
    //模糊搜索值
    searchVal: '',
    //选择年级
    selGrade: undefined,
    //选择科目
    selSubject: undefined,
    //选择来源
    selSource: undefined,
    // 选择店员
    selShopUser: undefined,
    //leads列表
    leadsList: []
  },
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
  // 获取leads信息
  getLeadsList: {
    promise: {
      url: `get /biz/open/copartner/dict/loadsList`,
      params: {
        shopId: 1,
        pageSize: 5,
        pageNum: 1
      }
    },
    reduce: (state, { payload }) => ({
      ...state,
      leadsList: payload.data.list,
      pageSize: payload.data.pageSize,
      pageNum: payload.data.pageNum
    })
  },
  selShopUp: 'selShop',
  getList: 'get /biz/list',
  selGradeUp: 'selGrade',
  selSubjectUp: 'selSubject',
  searchValUp: 'searchVal',
  selSourceUp: 'selSource',
  selShopUserUp: 'selShopUser',
  //清空
  filterCleal: {
    reduce: state => ({
      ...state,
      searchVal: '',
      selGrade: undefined,
      selSubject: undefined,
      selSource: undefined,
      selShopUser: undefined
    })
  }
}
export const { connect, reduce } = createModel(demoModel)

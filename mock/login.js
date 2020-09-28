module.exports = {
  'post /biz/auth/operation/batch/permission': {
    data: [
      { realmMark: 'MIS_ORDER_MANAGE_ORDER_CANCEL', result: true, type: null, roleList: [1000] },
      { realmMark: 'MIS_ORDER_BUTTON_PAUSE', result: true, type: null, roleList: [1000] },
      { realmMark: 'MIS_ORDER_BUTTON_SPLIT_ORDER', result: true, type: null, roleList: [1000] },
      { realmMark: 'MIS_ORDER_BUTTON_EXCHANGE_TEACHER', result: true, type: null, roleList: [1000] },
      { realmMark: 'MIS_ORDER_BUTTON_LESSON_ARRANGE', result: true, type: null, roleList: [1000] },
      { realmMark: 'DRW_LESSON_LIST_CANCEL_LEAVE', result: true, type: null, roleList: [1000] }
    ]
  },
  // 'get /biz/auth/operation/batch/permission': {
  //   data: [
  //     { realmMark: 'MIS_ORDER_MANAGE_ORDER_CANCEL', result: true, type: null, roleList: [1000] },
  //     { realmMark: 'MIS_ORDER_BUTTON_PAUSE', result: true, type: null, roleList: [1000] },
  //     { realmMark: 'MIS_ORDER_BUTTON_SPLIT_ORDER', result: true, type: null, roleList: [1000] },
  //     { realmMark: 'MIS_ORDER_BUTTON_EXCHANGE_TEACHER', result: true, type: null, roleList: [1000] },
  //     { realmMark: 'MIS_ORDER_BUTTON_LESSON_ARRANGE', result: true, type: null, roleList: [1000] }
  //   ]
  // },
  'post /biz/open/copartner/login': { data: 'yimi_1_test1_0rGgCN_1531193922471' },
  'get /biz/open/copartner/signOut': {
    data: null
  },
  'GET /biz/auth/detail/staff': {
    data: {
      staffId: 104,
      staffRealName: '@cname',
      staffName: 'system1',
      // staffHeadUrl: 'http://stage-yimifudao.com/hdaldj.jpg',
      seatNo: '348098432844288',
      enterpriseCode: 'yimi'
    }
  },
  'GET /biz/auth/menu': {
    data: [
      {
        id: 211630,
        name: 'CRS',
        icon: null,
        url: '/crm/',
        sys: 'CRS',
        menuList: [
          {
            id: 211627,
            name: '佣金管理',
            icon: null,
            url: '/crm/commissionManage',
            sys: 'CRS',
            childMenuList: []
          }
        ]
      },
      {
        id: '@id',
        name: '报表自助查询系统',
        icon: null,
        url: '/report/',
        sys: 'CRS',
        menuList: [
          {
            id: '@id',
            name: '门店总表',
            icon: null,
            url: '/report/storeReport',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: '@id',
            name: '销售KPI报表',
            icon: null,
            url: '/report/ccKPIReport',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: '@id',
            name: '客服KPI报表',
            icon: null,
            url: '/report/crKPIReport',
            sys: 'CRS',
            childMenuList: []
          }
        ]
      }
    ]
  },
  'GET /shengfen': {
    success: true,
    result: 'success',
    data: [{ id: 1, name: '上海' }]
  }
}

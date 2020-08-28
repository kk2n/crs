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
  'get /biz/open/copartner/getUserInfo': {
    data: {
      shopId: 1,
      roleType: 1,
      roleRightList: [
        {
          roleType: 1,
          roleName: 'DARWIM_OPEN_ADD_USER'
        }
      ],
      menuList: [
        {
          id: 211982,
          name: 'CRM',
          icon: 'team',
          url: '/crm/',
          sys: 'DRW',
          menuList: [
            {
              id: 211626,
              name: '我的leads',
              icon: null,
              url: '/crm/myLeads',
              sys: 'DRW',
              childMenuList: []
            },
            {
              id: 211627,
              name: 'leads管理',
              icon: null,
              url: '/crm/leadsManage',
              sys: 'DRW',
              childMenuList: []
            },
            {
              id: 211627,
              name: '合同明细',
              icon: null,
              url: '/crm/hetong',
              sys: 'DRW',
              childMenuList: []
            },
            {
              id: 211627,
              name: '订单明细（一对一）',
              icon: null,
              url: '/crm/orderList',
              sys: 'DRW',
              childMenuList: []
            },
            {
              id: 211627,
              name: '订单明细（小组课）',
              icon: null,
              url: '/crm/orderListXBK',
              sys: 'DRW',
              childMenuList: []
            },
            {
              id: 211628,
              name: '试听课明细（一对一）',
              icon: null,
              url: '/crm/shiTing',
              sys: 'CRS',
              childMenuList: []
            },
            {
              id: 211628,
              name: '试听课明细（小组课）',
              icon: null,
              url: '/crm/shiTingXBK',
              sys: 'CRS',
              childMenuList: []
            },
            {
              id: 211628,
              name: '课程明细',
              icon: null,
              url: '/crm/orderLessonDetails',
              sys: 'DRW',
              childMenuList: []
            },
            {
              id: 211628,
              name: '销售人员管理',
              icon: null,
              url: '/saleManage',
              sys: 'MIS',
              childMenuList: []
            }
          ]
        },
        {
          id: 211630,
          name: 'CRS',
          icon: null,
          url: '/crs',
          sys: 'CRS',
          menuList: [
            {
              id: 211630,
              name: '我的学员',
              icon: null,
              url: '/crm/myStudents',
              sys: 'CRM',
              childMenuList: []
            },
            {
              id: 211630,
              name: '学员管理',
              icon: null,
              url: '/crm/studentsManage',
              sys: 'CRM',
              childMenuList: []
            },
            {
              id: 211627,
              name: '合同明细',
              icon: null,
              url: '/crm/hetong',
              sys: 'CRS',
              childMenuList: []
            },
            {
              id: 211627,
              name: '订单明细（一对一）',
              icon: null,
              url: '/crm/orderList',
              sys: 'CRS',
              childMenuList: []
            },
            {
              id: 211628,
              name: '试听课明细（一对一）',
              icon: null,
              url: '/crm/shiTing',
              sys: 'CRS',
              childMenuList: []
            },
            {
              id: 211628,
              name: '课程明细',
              icon: null,
              url: '/crm/orderLessonDetails',
              sys: 'CRS',
              childMenuList: []
            }
          ]
        },
        {
          name: '试听列表',
          show: true,
          icon: 'file',
          url: '/crm/auditionList'
        }
        // {
        //   name: '试听管理',
        //   show: true,
        //   icon: 'file',
        //   url: '/auditManage',
        // }
      ],
      userId: '@id',
      realName: '@cname',
      userAccount: 'ymfd',
      userPhone: '18787879923',
      positionId: 1,
      positionName: '技术总裁',
      deptId: 1,
      deptName: '技术产品中心'
    }
  },
  //菜单
  'get /mms/report/catalog': {
    data: [
      {
        id: 1,
        name: '潜在客户',
        show: true,
        icon: 'solution',
        url: '/'
      },
      {
        id: 2,
        name: '合作商',
        show: true,
        icon: 'solution',
        url: '/partner'
      },
      {
        id: 3,
        name: '门店管理',
        show: true,
        icon: 'solution',
        url: '/storeManage'
      }
    ]
  },
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
        id: 211982,
        name: 'CRM',
        icon: 'team',
        url: '/crm/',
        sys: 'DRW',
        menuList: [
          {
            id: 211626,
            name: '我的leads',
            icon: null,
            url: '/crm/myLeads',
            sys: 'DRW',
            childMenuList: []
          },
          {
            id: 211627,
            name: 'leads管理',
            icon: null,
            url: '/crm/leadsManage',
            sys: 'DRW',
            childMenuList: []
          },
          {
            id: 211627,
            name: '合同明细',
            icon: null,
            url: '/crm/hetong',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: 211627,
            name: '订单明细（一对一）',
            icon: null,
            url: '/crm/orderList',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: 211627,
            name: '订单明细（小组课）',
            icon: null,
            url: '/crm/orderManage',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: 211628,
            name: '试听课明细（一对一）',
            icon: null,
            url: '/crm/shiTing',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: 211628,
            name: '试听课明细（小组课）',
            icon: null,
            url: '/crm/shiTingXBK',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: 211628,
            name: '课程明细',
            icon: null,
            url: '/crm/orderLessonDetails',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: 211628,
            name: '销售人员管理',
            icon: null,
            url: '/saleManage',
            sys: 'CRS',
            childMenuList: []
          }
        ]
      },
      {
        id: 211630,
        name: 'CRS',
        icon: null,
        url: '/crs/',
        sys: 'CRS',
        menuList: [
          {
            id: 211630,
            name: '我的学员',
            icon: null,
            url: '/crm/myStudents',
            sys: 'DRW',
            childMenuList: []
          },
          {
            id: 211630,
            name: '学员管理',
            icon: null,
            url: '/crm/studentsManage',
            sys: 'DRW',
            childMenuList: []
          },
          {
            id: 211627,
            name: '合同明细',
            icon: null,
            url: '/crm/hetong',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: 211627,
            name: '订单明细（一对一）',
            icon: null,
            url: '/crm/orderList',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: 211628,
            name: '试听课明细（一对一）',
            icon: null,
            url: '/crm/shiTing',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: 211628,
            name: '课程明细',
            icon: null,
            url: '/crm/orderLessonDetails',
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
            name: '门店运营总表',
            icon: null,
            url:
              '/report/storeReport?to=http://report-sugar.yimifudao.com/report/r_ada15-2z5l5z2f-2yyer2/1fcdd2469314c3e6aea0c07e04b453a0',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: '@id',
            name: '销售个人报表',
            icon: null,
            url:
              '/report/saleReport?to=http://report-sugar.yimifudao.com/report/r_ada15-7yjt0bbo-2bd35k/cba79de21d6aeb537a7b543c5554861a',
            sys: 'CRS',
            childMenuList: []
          },
          {
            id: '@id',
            name: '客服个人报表',
            icon: null,
            url:
              '/report/serviceReport?to=http://report-sugar.yimifudao.com/report/r_ada15-4foajbaf-m51ry2/6df71ea62038b49690c8c186e97d7950',
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

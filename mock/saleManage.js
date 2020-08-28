module.exports = {
  'get /biz/sales/juren/user/list': {
    data: [
      {
        realName: '王大牛',
        userName: 'daniu.wan',
        userId: 123,
        orgId: 123,
        status: 0
      }
    ]
  },
  'get /biz/sales/juren/org/list': {
    data: [
      {
        value: '1',
        label: '溢米辅导',
        children: [
          {
            value: '2',
            label: '销售中心',
            children: [
              {
                value: '376',
                label: '上海销售中心',
                children: null
              }
            ]
          }
        ]
      }
    ]
  },
  // 根据userId查询用户详情
  'get /biz/sales/juren/getUserInfoById': {
    code: '000000',
    msg: 'SUCCESS',
    data: {
      userId: 1,
      userName: 'superlu007',
      password: 'lulu123456',
      realName: '阿拉蕾',
      mobile: '15656565656',
      email: 'superlu007@qq.com',
      enterpriseCode: 'JUREN',
      orgId: 2,
      roleId: 3,
      salesLevel: 'I',
      gradeList: [1, 2],
      subjectList: [1, 2]
    }
  },
  //年级列表
  'get /biz/sales/juren/grade/list': {
    data: [
      {
        value: 1,
        label: '一年级',
        children: null
      },
      {
        value: 2,
        label: '二年级',
        children: null
      },
      {
        value: 3,
        label: '三年级',
        children: null
      },
      {
        value: 4,
        label: '四年级',
        children: null
      }
    ]
  },
  //学科列表
  'get /biz/sales/juren/subject/list': {
    data: [
      {
        value: 1,
        label: '语文',
        children: null
      },
      {
        value: 2,
        label: '数学',
        children: null
      },
      {
        value: 3,
        label: '英语',
        children: null
      },
      {
        value: 4,
        label: '政治',
        children: null
      },
      {
        value: 5,
        label: '地理',
        children: null
      }
    ]
  },
  //角色列表
  'get /biz/sales/juren/role/list': {
    'data|3': [
      {
        value: '@id',
        'label|1': ['经理', '客服', '销售', '老师'],
        children: null
      }
    ]
  },
  // 职级列表
  'get /biz/sales/juren/level/list': {
    'data|3': [
      {
        value: '@id',
        label: '@name',
        children: null
      }
    ]
  },
  'post /biz/sales/juren/addOrUpdateUser': {
    code: '000000',
    msg: 'SUCCESS',
    data: null
  },
  //用户启用\禁用
  'post /biz/sales/juren/changeUserStatus': {
    code: '000000',
    msg: 'SUCCESS',
    data: null
  },
  //移动
  'post /biz/sales/juren/move/user': {
    data: null
  }
  // //移动
  // 'post /biz/sales/order/availableScheduleHours': {
  //   data: null
  // }
}

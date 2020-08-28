module.exports = {
  // 试听课列表
  'post /biz/sales/stk/lesson/list': {
    code: '000000',
    msg: 'SUCCESS',
    data: {
      pageNum: 1,
      total: 100,
      pageSize: 10,
      'list|10': [
        {
          id: '@id',
          lessonId: '@id',
          lessonTopic: '@ctitle(5, 25)',
          'gradeName|1': ['六年级', '七年级', '八年级', '九年级'],
          subjectName: '数学',
          teacherName: '王二牛老师',
          teacherId: 900000388,
          'startTimeSchedule|1': ['2019-9-5 17:00~17:45', '2019-9-5 18:00~18:45', '2019-9-6 11:30~12:00'],
          realStartTime: 12313131313213,
          'lessonStatus|1-5': 1,
          'lessonReport|1': [0, 1],
          lessonReportUrl: '@url',
          leadsName: '@name',
          createdBy: '@cname',
          CooperBy: '@first',
          'tryProperty|1-3': 1,
          'selfDefineTopic|1': [0, 1]
        }
      ]
    }
  },
  //试听课列表-组织账号列表查询
  'get /biz/sales/stk/lesson/account': {
    code: '000000',
    msg: 'SUCCESS',
    'data|5': [
      {
        userId: '@id',
        userRealName: '@cname'
      }
    ]
  },
  //试听课列表-老师模糊查询
  'get /biz/sales/stk/lesson/teacher': {
    code: '000000',
    msg: 'SUCCESS',
    'data|5': [
      {
        userId: '@id',
        userRealName: '@cname'
      }
    ]
  },
  //试听课列表-协作人查询
  'get /biz/sales/stk/lesson/cooperateConsultant': {
    code: '000000',
    msg: 'SUCCESS',
    'data|5': [
      {
        userId: '@id',
        userRealName: '@cname'
      }
    ]
  },
  //科目
  'get /biz/sales/stk/plan/subject/list': {
    'data|5': [
      {
        'value|1-100': 1,
        'label|1': ['语文', '数学', '英语', '政治', '历史', '地理', '物理'],
        children: null
      }
    ]
  },
  //年级
  'get /biz/sales/stk/plan/grade/list': {
    'data|5': [
      {
        'value|1-100': 1,
        'label|1': ['一年级', '二年级', '三年级', '四年级', '五年级', '五年级', '六年级'],
        children: null
      }
    ]
  }
}

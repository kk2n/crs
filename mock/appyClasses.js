module.exports = {
  'get /biz/coursepack/classgroup/attend/list': {
    data: {
      pageNum: 1,
      total: 11,
      pageSize: 10,
      'list|11': [
        {
          id: '@id',
          studentName: '@cname',
          classCode: '@num',
          courseName: '六年级语文能力提升班',
          categoryName: '一期',
          startTime: '@date',
          endTime: '@date',
          preFirstTime: '@date',
          firstTime: '@date',
          usedClassHours: /\d{1}/,
          totalClassHours: /\d{2}/,
          teacherName: '@cname',
          'bookStatus|1': [1, 2, 3],
          logisticsCompanyName: '菜鸟',
          trackingNumber: /\d{11}/,
          studentId: /\d{3}/
        }
      ]
    }
  },

  //报班状态
  'get /biz/coursepack/class/group/attend/status/list': {
    data: [
      {
        id: '1',
        name: '已报班'
      }
    ]
  },

  //教材状态
  'get /biz/coursepack/book/status/list': {
    data: [
      {
        id: 1,
        name: '待确认'
      }
    ]
  },

  //老师列表
  'get /biz/coursepack/xzk/teacher/list': {
    data: [
      {
        id: 1,
        name: '张晓'
      }
    ]
  },

  //收货地址
  'get /biz/coursepack/receiver/address/info': {
    data: {
      id: 1,
      districtId: 11,
      detailAddress: '宜山路700号',
      receiverName: '赵曲',
      phone: '19928988819',
      logisticsCompanyName: '韵达',
      trackingNumber: '37849364568722',
      bookStatus: 2
    }
  },

  //省市区
  'get /biz/coursepack/xzk/dict/provinceInfo/list': {
    data: [
      {
        id: 'long，主键id',
        name: 'String省',
        parentId: 'long，父级id',
        basicDataDto: [
          {
            id: 'long，主键id',
            name: 'String市',
            parentId: 'long，父级id',
            basicDataDto: [
              {
                id: 'long，主键id',
                name: 'String，县',
                parentId: 'long，父级id',
                basicDataDto: []
              }
            ]
          }
        ]
      }
    ]
  },

  // 退班
  'POST /biz/coursepack/class/group/exit': {
    code: '000000',
    msg: 'SUCCESS',
    data: true
  }
}

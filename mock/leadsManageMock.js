module.exports = {
  'get /biz/open/copartner/shop/management/findShopList': {
    data: [
      {
        shopId: 1,
        shopName: '门店1'
      },
      {
        shopId: 2,
        shopName: '门店2'
      }
    ]
  },
  // 年级
  'get /biz/open/copartner/dict/grade': {
    data: [
      {
        gradeId: 130,
        gradeName: '三年级',
        gradeType: 1
      },
      {
        gradeId: 131,
        gradeName: '四年级',
        gradeType: 1
      }
    ]
  },
  // 科目
  'get /biz/open/copartner/dict/subject': {
    data: [
      {
        subjectId: 1,
        subjectName: '语文'
      },
      {
        subjectId: 2,
        subjectName: '语文2'
      }
    ]
  },
  // 来源
  'get /biz/open/copartner/dict/source/leads': {
    data: [
      {
        statusId: 1,
        statusDesc: '后台新增'
      },
      {
        statusId: 2,
        statusDesc: '手动导入'
      }
    ]
  },
  // 店员
  'get /biz/open/copartner/dict/shopUser': {
    data: [
      {
        shopUserId: 1,
        shopUserName: '张三'
      },
      {
        shopUserId: 2,
        shopUserName: '李四'
      }
    ]
  },
  // 查询loads列表
  'get /biz/open/copartner/dict/loadsList': {
    data: {
      pageNum: 1,
      total: 6,
      pageSize: 5,
      list: [
        {
          leadsId: 1,
          leadsName: '张飞',
          phoneNo: '13562569852',
          interestSubject: '英语',
          currentGrade: '三年级',
          takeDate: '2018-12-22 14:32:11',
          newFollowDate: '2018-12-22 16:32:11',
          followStatusFid: 51,
          followStatus: '无人接听',
          clientFrom: '后台新增',
          shopUserId: 1,
          shopUserName: '张三',
          clientStatus: 1
        },
        {
          leadsId: 2,
          leadsName: '关羽',
          phoneNo: '13505694814',
          interestSubject: '语文',
          currentGrade: '四年级',
          takeDate: '2018-10-11 16:30:11',
          newFollowDate: '2018-12-22 16:32:11',
          followStatusFid: 51,
          followStatus: '无人接听',
          clientFrom: '手动导入',
          shopUserId: 2,
          shopUserName: '李四',
          clientStatus: 2
        },
        {
          leadsId: 3,
          leadsName: '刘备',
          phoneNo: '14762569852',
          interestSubject: '数学',
          currentGrade: '一年级',
          takeDate: '2018-05-22 16:32:11',
          newFollowDate: '2018-05-22 16:32:11',
          followStatusFid: 51,
          followStatus: '无人接听',
          clientFrom: '后台新增',
          shopUserId: 2,
          shopUserName: '李四',
          clientStatus: 3
        },
        {
          leadsId: 4,
          leadsName: '赵云',
          phoneNo: '13862539852',
          interestSubject: '语文',
          currentGrade: '三年级',
          takeDate: '2018-06-22 16:32:11',
          newFollowDate: '2018-06-22 16:32:11',
          followStatusFid: 51,
          followStatus: '无人接听',
          clientFrom: '手动导入',
          shopUserId: 2,
          shopUserName: '李四',
          clientStatus: 2
        },
        {
          leadsId: 5,
          leadsName: '马超',
          phoneNo: '13562569852',
          interestSubject: '英语',
          currentGrade: '三年级',
          takeDate: '2018-07-22 16:32:11',
          newFollowDate: '2018-07-22 16:32:11',
          followStatusFid: 51,
          followStatus: '无人接听',
          clientFrom: '手动导入',
          shopUserId: 1,
          shopUserName: '张三',
          clientStatus: 1
        },
        {
          leadsId: 6,
          leadsName: '黄忠',
          phoneNo: '13562569852',
          interestSubject: '英语',
          currentGrade: '三年级',
          takeDate: '2018-08-22 16:32:11',
          newFollowDate: '2018-08-22 16:32:11',
          followStatusFid: 51,
          followStatus: '无人接听',
          clientFrom: '后台新增',
          shopUserId: 1,
          shopUserName: '张三',
          clientStatus: 3
        }
      ]
    }
  }
}

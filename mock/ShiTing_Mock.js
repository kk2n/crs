module.exports = {
  'get /biz/sales/contract/getShopList': {
    data: [
      {
        shopId: 1105184,
        shopName: '四年级',
        staffList: [1123, 333]
      }
    ]
  },
  'get /biz/sales/open/stk/apply/info': {
    code: '000000',
    msg: 'SUCCESS',
    data: {
      applyId: '234798371498372',
      lessonTopic: '定语从句',
      gradeName: '三年级',
      subjectName: '语文',
      lessonTime: '2015-12-29 9:00-9:40',
      status: 2,
      userName: '江苏南京一店CC',
      phoneNo: '156784774893',
      applyType: 2
    }
  },
  'post /biz/sales/open/stk/apply/result': { data: true },
  'post /biz/sales/stk/plan/lesson/apply/list': {
    data: {
      pageNum: 1,
      pageSize: 3,
      total: 11,
      list: [
        {
          applyId: '1374983002190',
          lessonTopic: '研-初中语文现代文阅读词语赏析精品讲义',
          tryProperty: 0,
          tryPropertyName: '新',
          subjectName: '英语',
          gradeName: '三年级',
          lessonTopicType: 1,
          lessonTopicTypeName: '自定义',
          lessonTime: '2020-05-02 15:00-15:40',
          teacherName: '王东英',
          teacherId: 900000388,
          clientId: 1105493,
          status: 1,
          clientName: '李磊'
        }
      ]
    }
  }
}

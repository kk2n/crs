module.exports = {
  ///*删除课程明细数据*/
  'post /biz/sales/updateLesson': {
    data: null
  },
  /*列表
  {
    page: 1,
    pageSize: 10,
    courseName: ,
    payMethod: ,
    callStatus: ,
    logisticsConfigStatus: ,
    divideClassStatus: ,
    userRealName: ,
    orderStatuses: 5
  }
  */
  'get /biz/sales/order/xbk/order/list': {
    data: {
      firstResult: 0,
      list: [
        {
          belongUserName: '-',
          callStatus: 0,
          channelId: '229646937777770498',
          channelName: '种子用户',
          courseCount: 1,
          courseName: 'PC_小组课_开发',
          createById: 224100604601962500,
          createByName: 'super_admin',
          createByTime: 1568970001000,
          divideClassStatus: 1,
          id: '359391737724035143',
          logisticsStatus: 0,
          mobile: '18891111002',
          orderCreateByName: '18891111002',
          orderCreateByTime: 1568970001000,
          orderStatus: 5,
          orderType: 0,
          payMethod: 0,
          paymentTime: '',
          price: 0,
          receiverAddressDto: null,
          userRealName: '18891111002'
        }
      ],
      maxResults: 10,
      orderBy: '',
      page: 1,
      pageSize: 10,
      total: 1970
    }
  },
  /*渠道*/
  'get /biz/sales/order/xbk/channel/list': {
    data: [
      {
        id: "1",
        name: "公众号1"
      }
    ]
  }
}

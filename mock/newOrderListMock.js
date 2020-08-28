module.exports = {
  'post /biz/coursepack/order/list': {
    data: {
      pageNum: 1,
      total: 11,
      pageSize: 10,
      'list|11': [
        {
          'orderId|+1': 1000,
          totalPrice: 2000,
          clientName: '@cname',
          clientMobile: 60,
          gradeName: '一年级',
          lessonHour: 30,
          orderStatusName: '已分期',
          periodFormName: '京东',
          shoppingChannelName: 'h5',
          belongName: '张三',
          createTime: '2019-11-04 10:59:34'
        }
      ]
    }
  },
  'get /biz/coursepack/order/grade/list': {
    data: [
      {
        id: '1',
        gradeName: '一年级'
      },
      {
        id: '2',
        gradeName: '二年级'
      },
      {
        id: '3',
        gradeName: '三年级'
      },
      {
        id: '4',
        gradeName: '四年级'
      },
      {
        id: '5',
        gradeName: '五年级'
      },
      {
        id: '6',
        gradeName: '六年级'
      }
    ]
  },
  'get /biz/coursepack/order/status/list': {
    code: '000000',
    msg: 'SUCCESS',
    data: [
      {
        id: 'WaitPay',
        name: '待支付'
      },
      {
        id: 'Pay',
        name: '已支付'
      }
    ]
  },
  'get /biz/coursepack/shopping/channel/list': {
    code: '000000',
    msg: 'SUCCESS',
    data: [
      {
        id: 'ZY',
        name: '直营中心'
      },
      {
        id: 'H5',
        name: 'H5'
      }
    ]
  },
  'get /biz/coursepack/period/form/list': {
    code: '000000',
    msg: 'SUCCESS',
    data: [
      {
        id: 'Not',
        name: '不分期'
      },
      {
        id: 'JDBT',
        name: '京东白条'
      }
    ]
  },
  'get /biz/coursepack/order/property/list': {
    code: '000000',
    msg: 'SUCCESS',
    data: [
      {
        id: 'New',
        name: '新签'
      },
      {
        id: 'Renewal',
        name: '续费'
      }
    ]
  },
  'get /biz/coursepack/order/detail': {
    data: {
      orderId: '374159984419696689',
      totalPrice: 2530,
      clientName: '立华',
      clientMobile: '13523558888',
      gradeName: '六年级',
      lessonHour: 30,
      orderStatus: 'WaitPay',
      orderStatusName: '待支付',
      periodFormName: '不分期',
      shoppingChannelName: 'H5',
      belongName: '王胡',
      createTime: '2019-10-30 14:42:58',
      payTime: '2019-10-30 14:42:58',
      payPrice: 2530,
      orderPrice: 4000,
      discountAmount: 1470,
      refundTime: '2019-10-30 14:42:58',
      refundPrice: 2400
    }
  }
}

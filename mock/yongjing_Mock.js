module.exports = {
  'post /biz/sales/commission/list': {
    code: '000000',
    msg: 'SUCCESS',
    data: {
      pageNum: 1,
      total: 122,
      pageSize: 10,
      'list|10': [
        {
          id: 1234564545,
          storeId: 169,
          storeName: '测试门店',
          agentId: 12313,
          agentName: '罗晓星测试啊wss',
          'status|1': [0, 1, 2],
          statusDesc: '已确认',
          date: '2020/08',
          totalCommissionPrice: 1300
        }
      ]
    }
  },
  'get /biz/sales/commission/detail': {
    code: '000000',
    msg: 'SUCCESS',
    data: {
      id: 1234564545,
      storeId: 169,
      storeName: '测试门店',
      storeNo: 'CESSS',
      agentId: 12313,
      agentName: '罗晓星测试啊',
      openDate: '2020-08-01',
      statusDesc: '已确认',
      'status|1': [0, 1, 2],
      signPrice: 1000.0,
      renewalPrice: 1000.0,
      refundPrice: 1000.0,
      paidPrice: 1000.0,
      commissionConfigRate: 20.0,
      commissionAdjustRate: 40.0,
      salesCommissionPrice: 1000.0,
      beforeRefundPrice: 200.0,
      deductCommissionPrice: 30.0,
      mgmTotalPrice: 1000.0,
      mgmConfigRate: 20,
      mgmAdjustRate: 30,
      deductMgmPrice: 1000.0,
      currentSubsidyPlan: 1,
      totalSubsidyPlan: 6,
      subsidyConfigRate: 20,
      subsidyAdjustRate: 30,
      subsidyPrice: 1000.0,
      extarRewardPrice: 1000.0,
      auditDeductPrice: 1.0,
      otherPrice: 6.0,
      remark: '测试测试',
      otherTotalPrice: 6.0,
      totalCommissionPrice: 366.0
    }
  },
  'get /biz/sales/commission/list/artificial/month': {
    data: [
      {
        id: '2020-07-27^2020-08-30',
        name: '2020年8月(2020.07.27-2020.08.30)'
      }
    ]
  },
  'post /biz/sales/commission/confirm': {}
}

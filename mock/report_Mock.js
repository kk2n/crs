module.exports = {
  'get /biz/sales/report/callReportList': {
    data: {
      pageNum: 1,
      total: 100,
      pageSize: 10,
      list: [
        {
          staffName: '李志刚',
          staffId: 900003544,
          callTimes: 191,
          connectTimes: 544,
          callDuration: 123
        }
      ]
    }
  },
  'post /biz/sales/report/exportCallReportList': {
    data: null
  }
}

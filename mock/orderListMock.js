module.exports = {
  'post /biz/sales/order/restoreLesson': { data: '' },
  'post /biz/sales/order/stopLesson': { data: '' },
  'get /order/list/teacher': {
    data: [
      {
        teacherId: 104,
        teacherName: '13651617391'
      }
    ]
  },
  'get /biz/open/copartner/dict/orderStatus': {
    data: [
      {
        orderStatusCode: 1,
        orderStatus: '执行中'
      },
      {
        orderStatusCode: 2,
        orderStatus: '已完成'
      },
      {
        orderStatusCode: 3,
        orderStatus: '未开课退科'
      },
      {
        orderStatusCode: 4,
        orderStatus: '已开课退科'
      },
      {
        orderStatusCode: 5,
        orderStatus: '停课'
      },
      {
        orderStatusCode: 6,
        orderStatus: '已作废'
      }
    ]
  },
  'get /biz/open/copartner/dict/orderType': {
    data: [
      {
        orderTypeCode: 11,
        orderType: '线上'
      },
      {
        orderTypeCode: 22,
        orderType: '线下'
      }
    ]
  },
  'get /biz/open/copartner/dict/property': {
    data: [
      {
        propertyId: 1,
        property: '新签'
      },
      {
        propertyId: 2,
        property: '续科'
      },
      {
        propertyId: 3,
        property: '扩科'
      },
      {
        propertyId: 4,
        property: '赠送'
      }
    ]
  },

  'post /biz/sales/order/getOrderListByConditions': {
    data: {
      pageNum: 2,
      total: 11,
      pageSize: 10,
      'list|11': [
        {
          contractId: '@id',
          parentRealName: '@cname',
          realLessonCount: 100,
          remainHours: 60,
          statusDesc: '待排课',
          'statusId|1': [1, 2],
          createTime: '2019-05-24 18:00:29'
        }
      ]
    }
  },
  //订单状态
  'get /biz/sales/dict/getOrderStatusList': {
    data: [
      {
        statusDesc: '待排课',
        statusId: 1
      }
    ]
  },
  //订单属性
  'get /biz/sales/dict/getOrderPropList': {
    data: [
      {
        statusDesc: '待排课',
        statusId: 1
      }
    ]
  },
  //订单详情联系人
  'get /biz/sales/order/orderLinkman': {
    data: {
      contractId: 77709,
      contractNo: '611503',
      chargeInfo: { chargeMobile: '575264', chargeRealName: '王俊杰cr' },
      chargeManagerInfo: { chargeManagerMobile: '1947998', chargeManagerRealName: 'CCCR1' },
      teacherInfo: { teacherBackupMobile: '', teacherMobile: '13800138000', teacherRealName: 'duxiao' },
      teacherManageInfo: {
        teacherManagerBackupMobile: '1765186',
        teacherManagerMobile: '9068184',
        teacherManagerRealName: '王瑞'
      }
    }
  },
  //订单详情--课程列表
  'get /biz/sales/lesson/getLessonListByContractId': {
    data: [
      {
        courseHours: 3,
        statusDesc: '完成',
        lessonId: 2619910,
        startTime: '2019-09-25 13:20',
        endTime: '2019-09-25 15:40'
      }
    ]
  },
  'get /biz/open/copartner/dict/ddlList': {
    data: [{ id: 1, time: '2019-12-22 12:12', status: 1, ks: 2, ren: 'ss', bz: 'sdsd' }]
  },
  'get /biz/open/copartner/dict/lxr': {
    data: {
      fzr: 'likuan',
      fzrTel: '13232323232',
      zg: 'kk2n',
      zgTel: '12313123123',
      xkTeacher: 'ss',
      xkTeacherTel: '13232323232',
      jx: '13232323232',
      jxTeacher: '13232323232'
    }
  },
  //换老师的三个接口
  'get /biz/open/copartner/huan/teacher': {
    data: [
      {
        id: 1,
        value: 'dd'
      }
    ]
  },

  //换老师获取详情
  'get /get/order/xiangqing': {
    data: {
      dd: 'likuan',
      km: '13232323232',
      ks: 'kk2n',
      ls: '12313123123'
    }
  },
  //拆分获取详情
  'get /biz/sales/order/getOrderInfoByOrderId': {
    data: {
      contractId: 77709,
      studentId: 1,
      realName: '白恒',
      gradeId: 1,
      subjectId: 1,
      subjectName: '语文',
      remainHours: 10,
      teacherId: 1,
      teacherName: '白云',
      statusDesc: '执行中'
    }
  },
  'get /biz/sales/dict/subject': {
    data: [
      {
        subjectId: 1,
        subjectName: '语文'
      },
      {
        subjectId: 2,
        subjectName: '1语文'
      },
      {
        subjectId: 3,
        subjectName: '2语文'
      }
    ]
  },
  'get /biz/sales/user/getSplitOrderTeacher': {
    data: [
      {
        maxStudent: 18,
        gradeIds: '130',
        userRealName: '8月12',
        userId: 900004026
      }
    ]
  },
  'post /biz/sales/order/splitOrder': {
    data: null
  },
  //排课获取详情
  'get /get/order/paike': {
    data: {
      kss: '1',
      start: '13232323232',
      end: 'kk2n',
      xy: '12313123123',
      ls: '张奥数',
      ks: [
        { id: 1, shiduan: '05:33-05:50' },
        { id: 2, shiduan: '05:44-05:50' },
        { id: 3, shiduan: '05:55-05:50' },
        { id: 4, shiduan: '05:22-05:50' },
        { id: 5, shiduan: '05:11-05:50' }
      ]
    }
  },
  //换老师 老师列表
  'get /biz/sales/user/getAllocationTeacher': {
    data: [
      {
        maxStudent: 35,
        userId: 900003978,
        userRealName: '白云'
      }
    ]
  },
  //换老师提交
  'post /biz/sales/order/changeOrderTeacher': {
    data: true
  },
  //排课提交
  'post /biz/sales/order/orderSchedule': {
    data: true
  },
  //排课时段
  /*
  teacherId
truenumber
教师Id

lessonDate
truestring
授课日期yyyy-MM-dd

clientId
truenumber
下单客户Id
  * */
  'post /biz/sales/order/listEnhancedSchedules': {
    data: [
      {
        scheduleId: 1,
        scheduleTime: '05:20-06:00',
        startTime: '05:20',
        endTime: '06:00',
        isAvailable: 0
      },
      {
        scheduleId: 2,
        scheduleTime: '05:20-06:00',
        startTime: '05:20',
        endTime: '06:00',
        isAvailable: 1
      },
      {
        scheduleId: 3,
        scheduleTime: '07:20-06:00',
        startTime: '05:20',
        endTime: '06:00',
        isAvailable: 1
      },
      {
        scheduleId: 4,
        scheduleTime: '08:20-06:00',
        startTime: '05:20',
        endTime: '06:00',
        isAvailable: 1
      }
    ]
  },
  'get /biz/sales/order/getOrderScheduleInfo': {
    data: {
      remainingLessonCount: 15,
      contractValidBegin: '2019-10-10',
      contractValidEnd: '2020-12-29',
      tomorrowDate: '2019-09-11',
      tomorrowWeek: '星期三',
      studentName: '白云',
      teacherId: 1,
      clientId: 1,
      teacherName: '白马'
    }
  },
  'post /biz/sales/order/checkOrderSchedule': {
    data: null
  },
  'post /biz/sales/order/availableScheduleHours': {
    data: {
      hours: 1,
      only: 0,
      reason: 2
    }
  },
  'post /biz/sales/order/preOrderSchedule': {
    data: [
      {
        lessonDate: '2019-09-11',
        scheduleId: 0,
        startScheduleTime: '21:10',
        endScheduleTime: '21:50',
        hours: 1,
        cycle: 0,
        orderId: null,
        teacherId: null,
        clientId: null,
        scheduleIds: [19],
        userName: null,
        userId: null,
        totalHours: 0,
        goldenSchedule: 0,
        dateValid: 0,
        containNoWorkTime: false
      }
    ]
  }
}

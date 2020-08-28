module.exports = {
  'post /biz/sales/design/list': {
    code: '000000',
    msg: 'SUCCESS',
    data: {
      pageNum: 1,
      total: 354,
      pageSize: 10,
      list: [
        {
          refClientId: 2592597,
          refStudentId: 135920,
          refClientName: 'xuteng',
          refPhoneNo: '18360178551',
          refBusinessType: 2,
          lessonId: 2633995,
          lessonType: 10,
          studentId: 143156,
          contractId: 79711,
          clientId: 288917,
          startTime: '2020-05-14 11:10:00',
          endTime: '2020-05-14 13:10:00',
          gradeName: '五年级',
          subjectName: '语文',
          teacherId: 900000286,
          teacherName: '郭意宽(内部)',
          lessonStatus: 0,
          hasTryReport: false,
          hasLessonReport: false,
          hasHomework: false,
          hasFiveReport: false,
          homeworkId: null,
          fiveReportId: null
        },
        {
          refClientId: 2592596,
          refStudentId: 135920,
          refClientName: 'xuteng',
          refPhoneNo: '18360178551',
          refBusinessType: 2,
          lessonId: 2633994,
          lessonType: 10,
          studentId: 143156,
          contractId: 79711,
          clientId: 288917,
          startTime: '2020-05-14 10:20:00',
          endTime: '2020-05-14 11:00:00',
          gradeName: '五年级',
          subjectName: '语文',
          teacherId: 900000286,
          teacherName: '郭意宽(内部)',
          lessonStatus: 0,
          hasTryReport: false,
          hasLessonReport: false,
          hasHomework: false,
          hasFiveReport: false,
          homeworkId: null,
          fiveReportId: null
        },
        {
          refClientId: 2592595,
          refStudentId: 135920,
          refClientName: 'xuteng',
          refPhoneNo: '18360178551',
          refBusinessType: 2,
          lessonId: 2633993,
          lessonType: 10,
          studentId: 143156,
          contractId: 79711,
          clientId: 288917,
          startTime: '2020-05-13 16:40:00',
          endTime: '2020-05-13 18:30:00',
          gradeName: '五年级',
          subjectName: '语文',
          teacherId: 900000286,
          teacherName: '郭意宽(内部)',
          lessonStatus: 0,
          hasTryReport: false,
          hasLessonReport: false,
          hasHomework: false,
          hasFiveReport: false,
          homeworkId: null,
          fiveReportId: null
        },
        {
          refClientId: 2592594,
          refStudentId: 135920,
          refClientName: 'xuteng',
          refPhoneNo: '18360178551',
          refBusinessType: 2,
          lessonId: 2633992,
          lessonType: 10,
          studentId: 143156,
          contractId: 79711,
          clientId: 288917,
          startTime: '2020-05-13 15:50:00',
          endTime: '2020-05-13 16:30:00',
          gradeName: '五年级',
          subjectName: '语文',
          teacherId: 900000286,
          teacherName: '郭意宽(内部)',
          lessonStatus: 0,
          hasTryReport: false,
          hasLessonReport: false,
          hasHomework: false,
          hasFiveReport: false,
          homeworkId: null,
          fiveReportId: null
        },
        {
          refClientId: 2592593,
          refStudentId: 135920,
          refClientName: 'xuteng',
          refPhoneNo: '18360178551',
          refBusinessType: 2,
          lessonId: 2633956,
          lessonType: 10,
          studentId: 143156,
          contractId: 79711,
          clientId: 288917,
          startTime: '2020-05-13 13:20:00',
          endTime: '2020-05-13 15:40:00',
          gradeName: '五年级',
          subjectName: '语文',
          teacherId: 900000286,
          teacherName: '郭意宽(内部)',
          lessonStatus: 0,
          hasTryReport: false,
          hasLessonReport: false,
          hasHomework: false,
          hasFiveReport: false,
          homeworkId: null,
          fiveReportId: null
        }
      ]
    }
  },
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
  //查询
  /*
  入参
  orderField
falsestring
排序字段 加入时间:takeDate 最近沟通时间:newFollowDate
currentGradeIds
falsearray[number]
当前年级(多选)
pageSize
truenumber
每页大小 取值范围: 1-500
pageNum
truenumber
页码数 取值范围: 大于等于1
likeField
falsestring
模糊查询字段(包括leads姓名、编号、手机号)
followStartDate
falsestring
沟通开始时间(yyyy-MM-dd)
clientFrom
falsestring
来源 E: 手动导入 B: 后台新建
orderType
falsestring
降序/升序 降序:DESC 升序:ASC
interestSubjects
falsearray[number]
感兴趣科目(多选)
takeEndDate
falsestring
加入结束时间(yyyy-MM-dd)
followEndDate
falsestring
沟通结束时间(yyyy-MM-dd)
clientStatus
falsenumber1
leads状态 新签(默认):1 联系中:2 死海:3
shopId
truenumber
门店Id(默认店员/店长的关联门店)
takeStartDate
falsestring
加入开始时间(yyyy-MM-dd)
  * */
  'get /biz/open/copartner/page/leads/my': {
    data: {
      pageNum: 1,
      total: 33,
      pageSize: 10,
      'list|41': [
        {
          'leadsId|+1': 1,
          leadsName: '@name',
          phoneNo: '13562569852',
          interestSubject: '英语',
          currentGrade: '三年级',
          takeDate: '2018-12-22 16:32:11',
          newFollowDate: '2018-12-22 16:32:11',
          followStatusFid: 51,
          followStatus: '无人接听',
          clientFrom: '手动导入',
          clientStatus: 1
        }
      ]
    }
  },
  'post /biz/open/copartner/leads/abandonAndResurgence': {
    data: null
  }
}

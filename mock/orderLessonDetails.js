module.exports = {
  //
  /*课程明细
  {
    studentIdOrName: '',
    lessonId: 1,
    contractId: 1,
    gradeId: 1,
    subjectId: 1,
    lessonStatus: 0,
    teacherName: '',
    startTime: 1997,
    pageNum: 1,
    pageSize: 10
  }
  */
  'post /biz/sales/lesson/cancelLeave': {},
  'post /biz/sales/lessonList': {
    data: {
      pageNum: 1,
      total: 20,
      pageSize: 10,
      list: [
        {
          lessonId: 1,
          studentName: 'xxx',
          contractId: 1,
          studentId: 1,
          clientId: 1,
          chargeName: 'xxx',
          startTime: '2019-09-10 12:00:00',
          endTime: '2019-09-10 12:00:00',
          eduSystem: '六年制',
          gradeName: '二年级',
          subjectName: '英语',
          teacherName: 'james',
          teacherId: 1,
          lessonStatus: 0,
          courseHours: 12,
          num: 20
        },
        {
          lessonId: 2,
          studentName: 'xxx',
          contractId: 1,
          studentId: 1,
          clientId: 1,
          chargeName: 'xxx',
          startTime: '2019-09-10 12:00:00',
          endTime: '2019-09-10 12:00:00',
          eduSystem: '六年制',
          gradeName: '二年级',
          subjectName: '英语',
          teacherName: 'james',
          teacherId: 1,
          lessonStatus: 1,
          courseHours: 12,
          num: 20
        }
      ]
    }
  },
  ///*全部年级*/
  'get /biz/sales/gradeList': {
    data: [
      {
        gradeId: 0,
        gradeName: '111',
        gradeType: 1
      }
    ]
  },
  ///*全部科目*/
  'get /biz/sales/subjectList': {
    data: [
      {
        isPublic: 0,
        subjectId: 1,
        subjectName: '111'
      }
    ]
  },
  //老师列表
  /*
  {
    subjectId: 0
  }
*/
  'get /biz/sales/teacherList': {
    data: [
      {
        teacherId: 0,
        teacherName: '111'
      }
    ]
  } /*老师列表*/,
  'get /biz/sales/shiduan': {
    data: [
      {
        id: 0,
        v: '111'
      }
    ]
  },
  ///*删除课程明细数据*/
  'get /biz/sales/deleteLesson': {
    data: ''
  },

  //获取课程时间段列表
  'get /biz/sales/getScheduleTimeList': {
    data: [
      {
        scheduleId: 1,
        text: '6:00'
      }
    ]
  },
  ///*删除课程明细数据*/
  'post /biz/sales/updateLesson': {
    data: null
  },
  ///*获取调课结束时间*/
  'get /biz/sales/endTimeToLesson': {
    data: {
      endTimeDate: '2019-10-10',
      endTimeHour: '10:20'
    }
  }
}

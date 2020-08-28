module.exports = {
  'get /biz/coursepack/student/gradesubject/list': {
    data: [
      {
        id: 210,
        name: '八年级',
        childer: [
          {
            id: 10,
            name: '语文'
          },
          {
            id: 11,
            name: '数学'
          }
        ]
      }
    ]
  },

  'post /biz/coursepack/student/course/list': {
    data: [
      {
        id: '12312897392187',
        name: '八年级英语提升'
      }
    ]
  },

  'get /biz/coursepack/course/category/list': {
    data: [
      {
        id: '378861162512539673',
        name: '8888',
        courseId: '378861162512539666',
        startDate: '2019-11-13',
        endDate: '2019-11-13'
      }
    ]
  },

  'get /biz/coursepack/course/category/sku/list': {
    data: [
      {
        id: '378861162512539674',
        name: '',
        startTime: '18:37',
        endTime: '23:59'
      }
    ]
  },

  'get /biz/coursepack/course/category/execution/list': {
    data: [
      {
        id: '362260008034919019',
        date: '2019-11-09',
        orderNo: 0
      },
      {
        id: '362260008034919020',
        date: '2019-11-16',
        orderNo: 1
      },
      {
        id: '362260008034919021',
        date: '2019-11-23',
        orderNo: 2
      }
    ]
  },

  'get /biz/coursepack/class/group/teacher/valid/list': {
    data: [
      {
        id: 1,
        name: '张晓'
      },
      {
        id: 2,
        name: '张晓2'
      },
      {
        id: 3,
        name: '张晓3'
      },
      {
        id: 4,
        name: '张晓4'
      }
    ]
  },

  'get /biz/coursepack/class/group/onState/list': {
    data: [
      {
        id: '1',
        name: '前台上架'
      }
    ]
  },

  'get /biz/coursepack/class/group/status/list': {
    data: [
      {
        id: '1',
        name: '未开课'
      }
    ]
  },

  // 获取列表
  'post /biz/coursepack/class/group/list': {
    data: {
      pageNum: 1,
      total: 11,
      pageSize: 10,
      'list|100': [
        {
          id: '@id',
          code: '111111',
          courseId: /\d{3}/,
          courseName: '@subject',
          categoryId: '2222',
          categoryName: '一年级',
          lessonHour: 30,
          startTime: '@date',
          endTime: '@date',
          firstTime: '@date',
          belonpreFirstTimegName: '@date',
          numbers: /\d{2}/,
          divideNumbers: /\d{2}/,
          totalClassHours: /\d{2}/,
          usedClassHours: /\d{1}/,
          preFirstTime: '@date',
          teacherName: '@cname',
          'status|1': [1, 2, 3],
          'statusDesc|1': ['未开课', '已开课', '已结业'],
          'onState|1': [1, 2, 3, 4],
          'onStateDesc|1': ['不上架', '后台上架', '前台上架', '下架']
        }
      ]
    }
  },

  //
  'get /biz/coursepack/class/group/divide/already': {
    'data|10': [
      {
        id: '@id',
        userName: '@cname',
        skuId: '378861162512539674',
        name: '@name',
        phone: /\d{11}/,
        classDate: '@date',
        startTime: '@time',
        endTime: '@time'
      }
    ]
  },

  // 创建班级
  'POST /biz/coursepack/class/group/save': {
    code: '000000',
    msg: 'SUCCESS',
    data: true
  },

  //获取老师列表
  'get /biz/coursepack/class/group/teacher/list': {
    data: {
      pageNum: 1,
      total: 11,
      pageSize: 10,
      'list|20': [
        {
          id: '@id',
          teacherName: '@cname',
          'professionDtos|5': [
            {
              phaseId: '@guid',
              phaseName: '@date',
              gradeName: '@name',
              subjectName: '语文'
            }
          ]
        }
      ]
    }
  },

  //获取班级学生列表
  'get /biz/coursepack/class/group/member/list': {
    'data|20': [
      {
        id: '@id',
        studentName: '@cname',
        attendTime: '@date',
        preFirstTime: '@date',
        firstTime: '@date',
        divideNumbers: /\d{2}/,
        totalClassHours: /\d{2}/,
        usedClassHours: /\d{1}/,
        'bookStatus|1': [1, 2, 3],
        logisticsStr: '韵达 37849364568722'
      }
    ]
  },

  // 调老师
  'post /biz/coursepack/class/group/status': {
    code: '000000',
    msg: 'SUCCESS',
    data: true
  },

  // 调学生
  'post /biz/coursepack/class/group/divide': {
    code: '000000',
    msg: 'SUCCESS',
    data: true
  },

  // 上架设置
  'post /biz/coursepack/class/group/onState': {
    code: '000000',
    msg: 'SUCCESS',
    data: true
  }
}

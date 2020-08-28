module.exports = {
  'POST /biz/sales/upload/token': {
    data: {
      accessKeyId: '3691bfa288d34ab181e095bad9a0f077',
      secretAccessKey: 'a31d23b588304ab8990ed3752ece8183',
      sessionToken:
        'MjUzZjQzNTY4OTE0NDRkNjg3N2E4YzJhZTc4YmU5ZDh8AAAAAK8BAABdGDMc7aJuILna+EYMAXUlzqSjgn9NtO/bJpWYan85CPeBKzpkwFbBmJohAniHFgau0R9+R4CFK+CpfFiPQ4yyBSUOLQHykv5056BWoRrhOFO4S2kqwfEJi1Z2rxgalAGPxwkbvXSFxKDDMYSu9DkcKxszsMHX3niypQSmyHwqkJpz+2xLaqrTKZPZVMy/x4W0VrABGN8rbd6fUrfyKLTGG84vBOI6Iq1ShCigovAFsSXS1yAQ2DATRiquf8iikhOhXHXoqR+/HRXY3MRLR7mtm1ES5xj/3Fjb3UMecAnccF08QT4q2OW1LDM7SBwjIOrH3DgP7atEukZE/Qoen5Of1sPw0GbYR8JQVyMeNhEUtg==',
      expiration: null,
      key: '20190113-1404277353149d046-b855-4d07-86a1-778dadc9b197',
      bucketkey: 'yimi-dev',
      endPoint: 'http://gz.bcebos.com'
    }
  },
  'post /biz/sales/upload/success/file': {
    code: '000000',
    msg: 'SUCCESS',
    data: '/asset/img/logo.png'
  },
  'get /orderservice/coursepack/type/list': {
    data: [
      { id: 1, name: '数据1' },
      { id: 2, name: '数据1' },
      { id: 5, name: '规则5' }
    ]
  },
  'get /orderservice/coursepack/grade/list': {
    data: [
      { id: 1, name: '一年级' },
      { id: 2, name: '二年级' }
    ]
  },
  /*
   接口名称: 获取课时包信息接口
   * 入参：coursePackageId string 价格包ID
   * */
  'get /orderservice/coursepack/detail/get': {
    data: {
      id: 23478329147,
      name: 'zxvczv',
      type: 5,
      typeName: '常规(新签)',
      imageUrl: '//sit02-login.yimifudao.com.cn/asset/img/logo.png',
      rule: {
        signingDay: 180,
        lessonHour: 50,
        totalLessonHour: 150
      },
      priceList: [
        {
          gradeId: 110,
          gradeName: '一年级',
          unitPrice: 165,
          details: [
            {
              lessonHour: 60,
              totalPrice: 9900,
              maxDiscountAmount: 1200
            },
            {
              lessonHour: 90,
              totalPrice: 14850,
              maxDiscountAmount: 2200
            }
          ]
        },
        {
          gradeId: 120,
          gradeName: '二年级',
          unitPrice: 165,
          details: [
            {
              lessonHour: 60,
              totalPrice: 9900,
              maxDiscountAmount: 1200
            },
            {
              lessonHour: 90,
              totalPrice: 14850,
              maxDiscountAmount: 2200
            }
          ]
        }
      ]
    }
  },
  'post /orderservice/coursepack/save': {
    data: null
  },
  /*
   * 删除
   * /orderservice/coursepack/delete
   * 入参：coursePackageId truenumber 课时包ID
   * */
  'post /orderservice/coursepack/delete': {
    data: null
  },
  /*
   * 启动
   * /orderservice/coursepack/delete
   * 入参：coursePackageId truenumber 课时包ID
   * */
  'post /orderservice/coursepack/enable': {
    data: null
  },
  /*
   * 课时包列表
   * 请求参数

   type
   falsenumber
   类型类型(1=常规（新签）、2=常规（续费）、3=暑假、4=寒假、5=超常规（续费）)

   name
   falsestring
   名称

   pageNum
   truestring
   页码

   pageSize
   truestring
   页大小
   * */
  'get /orderservice/coursepack/list': {
    data: {
      pageNum: 1,
      pageSize: 10,
      total: 120,
      list: [
        {
          id: 234729847198,
          name: '暑假课程价格表',
          status: 0,
          createBy: '罗晓星',
          createTime: '2010-01-01',
          typeName: 'ss'
        },
        {
          id: 234729847199,
          name: '暑假课程价格表',
          status: 2,
          createBy: '罗晓星',
          createTime: '2010-01-01',
          typeName: '1'
        }
      ]
    }
  }
}

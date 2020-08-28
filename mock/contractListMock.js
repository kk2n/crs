module.exports = {
  'get /biz/sales/detail/connection': {
    data: {
      freeLessonNetwork: '试听课网络情况',
      lessonDevice: '上课设备',
      studyKeeper: '学习管理人',
      subjectSituation: '学科情况',
      guidanceExperence: '辅导经历',
      arrangeTime: '可排时间',
      studentCharacter: '学员性格',
      guidanceTarget: '补习目标',
      parentExpectation: '家长期望',
      others: '其他交代'
    }
  },
  'get /biz/sales/contract/id/refund/info': {
    data: {
      contractId: 66290,
      unconditionalRefund: 1,
      refundlessoncount: 0,
      refundprice: 4000.0,
      refundtime: '2020-08-11',
      refundtype: '银行转账',
      cardno: '65582228556888',
      cardname: '张三',
      cardbank: '招商银行',
      cardprovince: '上海市',
      cardcity: '上海市',
      memo: '备注备注'
    }
  },
  'get /biz/sales/contract/goods/type/list': {
    data: [
      {
        id: '27349234872319',
        name: '引流课',
        code: 'FLOW'
      }
    ]
  },
  'post /biz/sales/contract/goods/list': {
    data: [
      {
        id: '8723201219871289',
        name: 'VIP高级1对1课程1.4'
      },
      {
        id: '8234897337103849',
        name: 'SVIP高级1对1课程1.4'
      }
    ]
  },
  'post /biz/sales/contract/goods/grade/list': {
    data: [
      {
        id: '8723201219871289',
        name: 'VIP高级1对1课程1.4'
      },
      {
        id: '8234897337103849',
        name: 'SVIP高级1对1课程1.4'
      }
    ]
  },
  'post /biz/sales/contract/goods/price': {
    data: {
      couponType: 1,
      giveLessonHour: 15,
      discount: 0,
      unitPrice: 150,
      totalPrice: 13500,
      discountPrice: 0,
      paymentPrice: 13500,
      isMeetGive: 1
    }
  },
  'post /orderservice/goods/price': {
    data: {
      couponType: 1,
      giveLessonHour: 15,
      discount: 0,
      unitPrice: 150,
      totalPrice: 13500,
      discountPrice: 0,
      paymentPrice: 13500
    }
  },
  'get /orderservice/goodsType/enable/filter/list': {
    code: '000000',
    msg: 'SUCCESS',
    data: [
      { id: 1, name: '11', code: '0001' },
      { id: 7, name: '1v2', code: '0000' }
    ]
  },
  'get /orderservice/goods/enable/list': {
    data: [
      {
        id: '8723201219871289',
        name: 'VIP高级1对1课程1.4'
      },
      {
        id: '8234897337103849',
        name: 'SVIP高级1对1课程1.4'
      }
    ]
  },
  'get /orderservice/goods/grade/list': {
    data: [
      {
        id: '220',
        name: '八年级'
      }
    ]
  },
  'get /biz/sales/contract/getStudent': {
    data: {
      studentName: '罗晓星1',
      clientId: 1105184,
      gradeName: '四年级',
      gradeId: 140
    }
  },
  'post /biz/sales/contract/updateContract': {
    data: ''
  },
  'get /biz/sales/leads/list/id/name': {
    data: [{ id: 1, name: 'ddd' }]
  },
  'get /biz/sales/contract/updateOrRepealContractLimit': {
    data: true
  },
  'get /biz/open/copartner/dict/contractStatus': {
    data: [
      {
        contractStatusCode: 1,
        contractStatus: '待分配'
      },
      {
        contractStatusCode: 2,
        contractStatus: '执行中'
      },
      {
        contractStatusCode: 3,
        contractStatus: '已完成'
      },
      {
        contractStatusCode: 4,
        contractStatus: '已超时'
      },
      {
        contractStatusCode: 5,
        contractStatus: '已撤销'
      },
      {
        contractStatusCode: 6,
        contractStatus: '退费完成'
      },
      {
        contractStatusCode: 7,
        contractStatus: '预定金退回'
      },
      {
        contractStatusCode: 8,
        contractStatus: '未完成支付'
      }
    ]
  },
  'get /biz/open/copartner/dict/contractType': {
    data: [
      {
        contractTypeId: 1,
        contractType: '暑假'
      },
      {
        contractTypeId: 2,
        contractType: '寒假'
      }
    ]
  },
  'get /biz/open/copartner/dict/paymentType': {
    data: [
      {
        paymentId: 1,
        payment: '不分期'
      },
      {
        paymentId: 2,
        payment: '百度有钱花'
      },
      {
        paymentId: 3,
        payment: '京东白条'
      },
      {
        paymentId: 4,
        payment: '海米管家'
      },
      {
        paymentId: 5,
        payment: '库分期'
      },
      {
        paymentId: 6,
        payment: '惠学习'
      },
      {
        paymentId: 7,
        payment: '分蛋'
      },
      {
        paymentId: 8,
        payment: '海尔消费金融'
      }
    ]
  },
  'get /biz/open/copartner/dict/contractList': {
    data: {
      pageNum: 2,
      total: 11,
      pageSize: 10,
      'list|11': [
        {
          orderId: '@id',
          contractId: '@id',
          userId: '@id',
          userName: '@cname',
          classNum: 100,
          residueNum: 60,
          teacherName: '小明1',
          teachProperty: '新签',
          status: '待排课',
          'statusId|1': [1, 2, 3, 4],
          creater: '小明2',
          createTime: '2019-05-24 18:00:29',
          contractMoney: 100000,
          money: 99999
        }
      ]
    }
  },
  //撤销合同提交
  'post /biz/open/copartner/backout/post': {
    data: true
  },
  //删除合同确定
  'post /biz/open/copartner/delect/post': {
    data: true
  },
  //学生获取详情
  'get /get/contract/studentInfo': {
    data: {
      subject: '数学',
      classHours: 60
    }
  },
  //
  /*获取老师列表*/
  'get /biz/open/copartner/dict/teacherList': {
    data: [
      { teacherId: 1, teacher: '张三' },
      { teacherId: 2, teacher: '李四' }
    ]
  },
  //分配老师
  'post /biz/open/copartner/teacher/post': {
    data: true
  },
  // s
  //获取合同类型

  'get /biz/sales/dict/getContractTypeList': {
    data: [
      {
        statusDesc: '常规',
        statusId: 1
      },
      {
        statusDesc: '暑假',
        statusId: 2
      },
      {
        statusDesc: '寒假',
        statusId: 3
      },
      {
        statusDesc: '1V2',
        statusId: 7
      }
    ]
  },
  'get /biz/sales/dict/getContractPropList': {
    data: [
      {
        statusDesc: '常规',
        statusId: 1
      },
      {
        statusDesc: '暑假',
        statusId: 2
      },
      {
        statusDesc: '寒假',
        statusId: 3
      }
    ]
  },
  //获取年级
  'get /biz/sales/dict/grade': {
    data: [
      {
        gradeName: '一年级',
        gradeFid: 1
      },
      {
        gradeName: '二年级',
        gradeFid: 2
      },
      {
        gradeName: '三年级',
        gradeFid: 3
      }
    ]
  },
  //合同详情
  'get /biz/sales/contract/getContractInfoById': {
    data: {
      invoiceInfo: {
        contractNo: 964901,
        contractFid: 8872,
        invoiceType: '普通发票',
        invoiceId: 195,
        invoiceDate: '2019-05-31',
        invoiceAmount: 8460,
        invoiceNo: '24541895',
        invoiceMemo: ''
      },
      contractInfo: {
        cooperateConsultant: null,
        agreementType: 0,
        freeLessonCount: 0,
        payTime: null,
        contractType: 1,
        groupId: null,
        contractMemo: '',
        baseDiscountPrice: 0,
        belongToFid: 900001077,
        maxDiscountPrice: 3040,
        validBeginDate: '2019-08-21',
        adminPrice: null,
        isPeriod: 0,
        eventShortFlag: null,
        unitPrice: 165,
        agreement: 'payment_normal_20180701.html',
        contractStatusDesc: '未支付',
        paidPrice: 0,
        studentFid: 306127,
        isPaid: 0,
        unitPriceDiscount: 1,
        clientFid: 1011412,
        extraLessonCount: 0,
        belongTo: '林颖',
        contractPropDesc: '续费',
        extraDiscountPrice: 0,
        totalPrice: 14850,
        actualPrice: 14850,
        contractNo: '458521',
        consultantId: 900003438,
        discountPrice: 0,
        createdOn: '2019-08-21 18:54:02',
        totalLessonCount: 90,
        cooperateConsultantFid: 0,
        otherPrice: null,
        contractValidDays: 0,
        giftPrice: null,
        agreementImg: 'payment_normal_20180701.jpg',
        giftAmount: 0,
        gradeName: '三年级',
        isSplit: 0,
        contractStatus: 1,
        paySource: 'YIMI',
        createdByFid: 104,
        manualDiscountPrice: 0,
        validPeriod: 0,
        hasGift: 0,
        freeLessonDiscountPrice: 0,
        lessonCount: 90,
        contractItems: ',COUPON,DISCOUNTCODE,SPLIT,',
        createdBy: '系统',
        requestBeginDate: '2019-08-21',
        contractId: 65048,
        couponPrice: 0,
        contractTypeDesc: '常规',
        validEndDate: '2021-08-21',
        contractProp: 2,
        contractFlag: 'N',
        gradeFid: 130,
        eventFlag: null,
        telephone: '1212'
      },
      contractOrderCancel: [
        {
          contractId: 122,
          memo: '备注'
        }
      ],
      remainingDiscount: '3040.00',
      contractGiftInfo: [
        {
          giftId: 194,
          giftInfo: '电容笔',
          giftFid: 1,
          giftContent: '',
          viewPrice: 1,
          realPrice: 1,
          rcvName: '周佳凡',
          rcvTel: '13612361236',
          rcvProvince: '广东省',
          rcvCity: '佛山市',
          rcvDistrict: '南海区',
          rcvAddress: '南海区万科金域蓝湾',
          giftStatus: 3,
          giftMemo: '',
          logisticsNo: '778850903205',
          logisticsCo: '中通快递',
          giftStatusDesc: '已发货'
        }
      ],
      clientInfo: {
        gradeName: '三年级',
        realName: '刘颖',
        clientId: 1011412,
        telephone: '13234234234',
        address: '上海市'
      },
      contractPayInfo: {
        payTime: '2015-11-21 05:33',
        transactionID: '14607109072771748A668',
        payNo: '4005702001201604154870717573',
        paySource: 'YIMI',
        payType: '微信'
      },
      couponInfos: [
        {
          couponId: 123,
          amount: 12,
          couponGroupName: '新学员红包',
          validBeginDate: '2018-10-30',
          validEndDate: '2018-11-30'
        }
      ],
      contractPreOrders: [
        {
          lessonCount: 90,
          contractFid: 65048,
          orderId: 67576,
          subjectFId: 1,
          createdOn: 1566385000000
        }
      ],
      mBalance: {
        flowId: 123,
        flowAmount: 2250,
        flowAmountRemaining: 2250,
        flowRef: 'R',
        remaining: 2250
      },
      remainingMiCoin: {
        iosMBalance: 0,
        id: 306127,
        mBalance: 0
      }
    }
  },
  'get /biz/sales/contract/getOrderList': {
    data: [
      {
        orderBrief: '77710-语文-王俊杰tr',
        teacherName: '王俊杰tr',
        realLessonCount: 30,
        remainHours: 15,
        contractId: 77710,
        orderStatus: '执行中',
        subjectShortName: '语',
        originLessonCount: 30,
        subjectId: 1,
        subjectName: '语文'
      }
    ]
  },
  'get /biz/sales/contract/detail/get': {
    data: {
      invoiceInfo: {
        contractNo: 964901,
        contractFid: 8872,
        invoiceType: '普通发票',
        invoiceId: 195,
        invoiceDate: '2019-05-31',
        invoiceAmount: 8460,
        invoiceNo: '24541895',
        invoiceMemo: ''
      },
      contractInfo: {
        goodsCode: '0000',
        goodsTypeId: 7,
        goodsTypeName: '1v2',
        goodsId: '12',
        goodsName: '12',
        refClientId: 123,
        refClientName: '李宽',
        cooperateConsultant: null,
        agreementType: 0,
        freeLessonCount: 0,
        payTime: null,
        contractType: 7,
        groupId: null,
        contractMemo: '',
        baseDiscountPrice: 0,
        belongToFid: 900001077,
        maxDiscountPrice: 3040,
        validBeginDate: '2019-08-21',
        adminPrice: null,
        isPeriod: 0,
        eventShortFlag: null,
        unitPrice: 165,
        agreement: 'payment_normal_20180701.html',
        contractStatusDesc: '未支付',
        paidPrice: 0,
        studentFid: 306127,
        isPaid: 0,
        unitPriceDiscount: 1,
        clientFid: 1011412,
        extraLessonCount: 0,
        belongTo: '林颖',
        contractPropDesc: '续费',
        extraDiscountPrice: 0,
        totalPrice: 14850,
        actualPrice: 14850,
        contractNo: '458521',
        consultantId: 900003438,
        discountPrice: 0,
        createdOn: '2019-08-21 18:54:02',
        totalLessonCount: 90,
        cooperateConsultantFid: 0,
        otherPrice: null,
        contractValidDays: 0,
        giftPrice: null,
        agreementImg: 'payment_normal_20180701.jpg',
        giftAmount: 0,
        gradeName: '三年级',
        isSplit: 0,
        contractStatus: 1,
        paySource: 'YIMI',
        createdByFid: 104,
        manualDiscountPrice: 0,
        validPeriod: 0,
        hasGift: 0,
        freeLessonDiscountPrice: 0,
        lessonCount: 90,
        contractItems: ',COUPON,DISCOUNTCODE,SPLIT,',
        createdBy: '系统',
        requestBeginDate: '2019-08-21',
        contractId: 65048,
        couponPrice: 0,
        contractTypeDesc: '1v2',
        validEndDate: '2021-08-21',
        contractProp: 2,
        contractFlag: 'N',
        gradeFid: 130,
        eventFlag: null
      },
      contractOrderCancel: [
        {
          contractId: 122,
          memo: '备注'
        }
      ],
      remainingDiscount: '3040.00',
      contractGiftInfo: [
        {
          giftId: 194,
          giftInfo: '电容笔',
          giftFid: 1,
          giftContent: '',
          viewPrice: 1,
          realPrice: 1,
          rcvName: '周佳凡',
          rcvTel: '13612361236',
          rcvProvince: '广东省',
          rcvCity: '佛山市',
          rcvDistrict: '南海区',
          rcvAddress: '南海区万科金域蓝湾',
          giftStatus: 3,
          giftMemo: '',
          logisticsNo: '778850903205',
          logisticsCo: '中通快递',
          giftStatusDesc: '已发货'
        }
      ],
      clientInfo: {
        gradeName: '三年级',
        realName: '刘颖',
        clientId: 1011412
      },
      contractPayInfo: {
        payTime: '2015-11-21 05:33',
        transactionID: '14607109072771748A668',
        payNo: '4005702001201604154870717573',
        paySource: 'YIMI',
        payType: '微信'
      },
      couponInfos: [
        {
          couponId: 123,
          amount: 12,
          couponGroupName: '新学员红包',
          validBeginDate: '2018-10-30',
          validEndDate: '2018-11-30'
        }
      ],
      contractPreOrders: [
        {
          lessonCount: 90,
          contractFid: 65048,
          orderId: 67576,
          subjectFId: 1,
          createdOn: 1566385000000
        }
      ],
      mBalance: {
        flowId: 123,
        flowAmount: 2250,
        flowAmountRemaining: 2250,
        flowRef: 'R',
        remaining: 2250
      },
      remainingMiCoin: {
        iosMBalance: 0,
        id: 306127,
        mBalance: 0
      },
      jjgInfo: {
        totalMoney: 123,
        jjgPaidPrice: 123,
        jjgDetailList: [
          {
            goodsName: '书包',
            goodsCount: 1
          }
        ]
      },
      periodStsInfo: {
        orderStatus: 1,
        orderStatusDesc: '新订单',
        partnerLoanId: '8947129384701411',
        orderPartner: 'FD'
      }
    }
  },
  'get /biz/sales/contract/order/list': {
    data: [
      {
        orderBrief: '77710-语文-王俊杰tr',
        teacherName: '王俊杰tr',
        realLessonCount: 30,
        remainHours: 15,
        contractId: 77710,
        orderStatus: '执行中',
        subjectShortName: '语',
        originLessonCount: 30,
        subjectId: 1,
        subjectName: '语文'
      }
    ]
  },
  //撤销合同
  'post /biz/sales/contract/repealContract': {
    data: null
  },
  'post /biz/sales/contract/delContract': {
    data: null
  },
  //
  'get /biz/sales/contract/isNewOrOld': {
    data: 1
  },
  'get /biz/sales/dict/getActivityList': {
    data: [
      {
        name: '特殊排课规则协议',
        activeId: 1
      },
      {
        name: '三次课无条件退',
        activeId: 4
      }
    ]
  },
  'get /biz/sales/dict/area': {
    data: [
      {
        provinceId: 1,
        provinceName: '北京市',
        cities: [
          {
            cityId: 2,
            cityName: '北京市',
            districts: [
              {
                districtId: 3,
                districtName: '朝阳区'
              }
            ]
          }
        ]
      }
    ]
  },
  'get /biz/sales/contract/getLessonPrice': {
    data: {
      actualPrice: 18315,
      contractItems: ',COUPON,DISCOUNTCODE,SPLIT,',
      contractValidDays: 0,
      firstPeriodAmount: '20.00',
      maxDiscountExtraPrice: 1485,
      maxDiscountPrice: 3040,
      maxDiscountRegularPriice: 1555,
      maxPeriod: '9',
      maxPeriodDiscountPrice: 1555,
      originPrice: 135,
      totalPrice: 18315,
      unitPrice: 165,
      unitPriceDiscount: 1
    }
  },
  'get /biz/sales/contract/getContractEndDate': {
    data: '2020-09-10^2020-09-11'
  },
  'post /biz/sales/contract/orderAllocationTeacherByConFid': {
    data: null
  },
  'get /biz/sales/contract/list': {
    data: {
      pageNum: 112,
      total: 1,
      pageSize: 1,
      list: [
        {
          hasCr: 1,
          contractNo: 1,
          contractId: 212,
          clientFid: 2,
          belongToFid: 23232,
          belongTo: 'MGM',
          chargeFid: 3232,
          chargeName: '测试e',
          paidPrice: 534,
          actualPrice: 543,
          createdOn: '2018-12-22 16:32:09',
          contractStatus: 2,
          contractStatusDesc: '未支付',
          clientName: 'zsfsasdfasasdfadfasdf阿桑地方阿桑地方爱仕达dasdasdfaff'
        }
      ]
    }
  },
  'get /biz/sales/contract/getPreOrderListByContractId': {
    data: {
      studentId: 348413,
      contractFid: 65616,
      isExistsCr: 0,
      chargeFid: 900004673,
      gradeFId: 110,
      preOrders: [
        {
          orderBrief: null,
          teacherName: null,
          realLessonCount: 60,
          originLessonCount: null,
          orderId: 68670,
          remainHours: '60',
          contractId: null,
          orderStatus: null,
          subjectShortName: '数',
          subjectId: 2,
          subjectName: '数学'
        }
      ]
    }
  },
  'get /biz/sales/contract/getAllocationTeacher': {
    code: '000000',
    msg: 'SUCCESS',
    data: [
      { userRealName: 'trqa15', userId: '900001559', maxStudent: '100' },
      { userRealName: '邓焕', userId: '900003858', maxStudent: '24' },
      { userRealName: '宫卫彬', userId: '900004039', maxStudent: '18' },
      { userRealName: '谷雨桐', userId: '900003875', maxStudent: '24' },
      { userRealName: '何畅', userId: '900003870', maxStudent: '24' },
      { userRealName: '江丹丹', userId: '900003228', maxStudent: '24' },
      { userRealName: '寇竞羽', userId: '900002337', maxStudent: '24' },
      { userRealName: '李倩3', userId: '900002940', maxStudent: '24' },
      { userRealName: '沈可忱', userId: '900003241', maxStudent: '18' },
      { userRealName: '师训-物理', userId: '900001549', maxStudent: '18' },
      { userRealName: '孙超', userId: '900003872', maxStudent: '24' },
      { userRealName: '孙静文', userId: '121128', maxStudent: '24' },
      { userRealName: '王家齐', userId: '900004040', maxStudent: '18' },
      { userRealName: '王童童', userId: '900003860', maxStudent: '24' },
      { userRealName: '王永慧', userId: '900002772', maxStudent: '24' },
      { userRealName: '向平1', userId: '900004001', maxStudent: '100' },
      { userRealName: '小敏一二三', userId: '900003968', maxStudent: '18' },
      { userRealName: '徐敬浩（内部）', userId: '800121352', maxStudent: '30' },
      { userRealName: '张翔云', userId: '900002015', maxStudent: '24' }
    ]
  },
  'get /biz/sales/contract/studyKeeperList': {
    code: '000000',
    msg: 'SUCCESS',
    data: [
      { studyKeeperId: 1, studyKeeperDesc: '父亲' },
      { studyKeeperId: 2, studyKeeperDesc: '母亲' },
      { studyKeeperId: 3, studyKeeperDesc: '学生' },
      { studyKeeperId: 4, studyKeeperDesc: '其他' }
    ]
  },
  'get /biz/sales/contract/freeLessonNetworkList': {
    data: [
      { freeLessonNetworkId: 1, freeLessonNetworkDesc: '优' },
      { freeLessonNetworkId: 2, freeLessonNetworkDesc: '良' },
      { freeLessonNetworkId: 3, freeLessonNetworkDesc: '中' },
      { freeLessonNetworkId: 4, freeLessonNetworkDesc: '差' }
    ]
  },
  'get /biz/sales/dict/gift/getGiftList': {
    data: [
      {
        contractTypeLimit: ',1,2,3,',
        contractAmountLimit: 0,
        giftName: '呵呵呵哒',
        discountPrice: 2000,
        endData: '2019-08-11',
        memo: '3333333',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 1000,
        createdOn: 1564975001000,
        giftId: 20,
        beginDate: '2019-08-04',
        contractPropLimit: ',1,2,',
        giftContent: '啥都没有',
        lastUpdatedOn: 1564975980000,
        realPrice: 99
      },
      {
        contractTypeLimit: ',1,2,3,',
        contractAmountLimit: 0,
        giftName: '测试新增',
        discountPrice: 1,
        endData: '2019-03-31',
        memo: '111等待',
        giftType: 0,
        contractLessonCountLimit: 0,
        viewPrice: 99,
        createdOn: 1552634792000,
        giftId: 19,
        beginDate: '2019-03-15',
        contractPropLimit: ',1,2,',
        giftContent: '测试新增',
        lastUpdatedOn: 1552634845000,
        realPrice: 100
      },
      {
        contractTypeLimit: ',3,',
        contractAmountLimit: 20000,
        giftName: '大礼包（测试专用）',
        discountPrice: 1888,
        endData: '2018-07-31',
        memo: '测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用测试专用------',
        giftType: 1,
        contractLessonCountLimit: 120,
        viewPrice: 2288,
        createdOn: 1531719837000,
        giftId: 18,
        beginDate: '2018-06-01',
        contractPropLimit: ',1,2,',
        giftContent: '儿童手表',
        lastUpdatedOn: 1531730093000,
        realPrice: 2500
      },
      {
        contractTypeLimit: ',2,',
        contractAmountLimit: 0,
        giftName: '2018版  Apple iPad 平板电脑 9.7英寸',
        discountPrice: 3709,
        endData: '2018-09-30',
        memo: '礼品价格：3705\n2018年暑假合同专用',
        giftType: 1,
        contractLessonCountLimit: 90,
        viewPrice: 3705,
        createdOn: 1527680471000,
        giftId: 17,
        beginDate: '2018-05-31',
        contractPropLimit: ',1,2,',
        giftContent: '32G   WLAN版',
        lastUpdatedOn: 1564975269000,
        realPrice: 3705
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '华为（HUAWEI）荣耀畅玩平板2（999元）',
        discountPrice: 999,
        endData: '2018-05-06',
        memo: '华为（HUAWEI）荣耀畅玩平板2（四核 2G/16G 1280x800 4800mAh WiFi版 9.6英寸）苍穹灰',
        giftType: 1,
        contractLessonCountLimit: 180,
        viewPrice: 999,
        createdOn: 1519278824000,
        giftId: 16,
        beginDate: '2018-02-22',
        contractPropLimit: ',1,',
        giftContent: '四核 2G/16G 1280x800 4800mAh WiFi版 9.6英寸',
        lastUpdatedOn: 1531715299000,
        realPrice: 999
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '荣耀畅玩平板2（1088元）',
        discountPrice: 1088,
        endData: '2018-02-21',
        memo: 'WiFi高配版 8英寸 (四核 3G/32G 1280x800 4800mAh ) 苍穹灰',
        giftType: 1,
        contractLessonCountLimit: 180,
        viewPrice: 1088,
        createdOn: 1511332946000,
        giftId: 15,
        beginDate: '2018-01-01',
        contractPropLimit: ',1,',
        giftContent: '8英寸四核32G ',
        lastUpdatedOn: 1531715299000,
        realPrice: 1088
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '2018版  Apple iPad 平板电脑 9.7英寸（2380元）',
        discountPrice: 2380,
        endData: '2019-01-01',
        memo: '礼品价格：2380',
        giftType: 1,
        contractLessonCountLimit: 180,
        viewPrice: 2380,
        createdOn: 1509355734000,
        giftId: 14,
        beginDate: '2018-04-02',
        contractPropLimit: ',1,2,',
        giftContent: '32G   WLAN版',
        lastUpdatedOn: 1531715299000,
        realPrice: 2380
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 30000,
        giftName: '华为(HUAWEI)M3（1888元）',
        discountPrice: 1888,
        endData: '2018-04-15',
        memo: '礼品价格：1888',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 1888,
        createdOn: 1493360290000,
        giftId: 13,
        beginDate: '2018-01-01',
        contractPropLimit: ',1,2,',
        giftContent: '8.4英寸 平板电脑 4G/32G',
        lastUpdatedOn: 1531715299000,
        realPrice: 1888
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '异业·膳魔师不锈钢保温杯（225元）',
        discountPrice: 225,
        endData: '2018-05-23',
        memo: '只在异业活动渠道来的新签可享    礼品价格：225\n',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 225,
        createdOn: 1492582044000,
        giftId: 12,
        beginDate: '2018-01-01',
        contractPropLimit: ',1,',
        giftContent: '膳魔师不锈钢保温杯',
        lastUpdatedOn: 1531715299000,
        realPrice: 135
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '异业·膳魔师不锈钢保鲜焖烧罐（210元）',
        discountPrice: 210,
        endData: '2018-05-23',
        memo: '只在异业活动渠道来的新签可享',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 210,
        createdOn: 1492581817000,
        giftId: 11,
        beginDate: '2018-01-01',
        contractPropLimit: ',1,',
        giftContent: '保鲜焖烧罐',
        lastUpdatedOn: 1531715299000,
        realPrice: 126
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 12360,
        giftName: '测试',
        discountPrice: 1800,
        endData: '2017-04-17',
        memo: '测试',
        giftType: 0,
        contractLessonCountLimit: 120,
        viewPrice: 1800,
        createdOn: 1492427862000,
        giftId: 10,
        beginDate: '2017-04-17',
        contractPropLimit: ',1,2,',
        giftContent: '测试',
        lastUpdatedOn: 1531715299000,
        realPrice: 60
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '新签大礼包（88元）',
        discountPrice: 88,
        endData: '2018-05-24',
        memo: '周年庆礼包   礼品价格：88',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 88,
        createdOn: 1489391236000,
        giftId: 9,
        beginDate: '2018-01-01',
        contractPropLimit: ',1,2,',
        giftContent: '学霸提分笔+学霸单词本+定制错题本+学习100天等',
        lastUpdatedOn: 1531715299000,
        realPrice: 60
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 30000,
        giftName: 'ipad mini 2（1888元）',
        discountPrice: 1888,
        endData: '2018-04-01',
        memo: '不予赠送课时同享\n原16G停止生产                    礼品价格：1988',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 1888,
        createdOn: 1489383772000,
        giftId: 8,
        beginDate: '2018-01-01',
        contractPropLimit: ',1,2,',
        giftContent: '32G',
        lastUpdatedOn: 1531715299000,
        realPrice: 1888
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '【高中】精品课程（1800元）',
        discountPrice: 1800,
        endData: '2017-03-20',
        memo: '录播课形式，通过网盘下载',
        giftType: 0,
        contractLessonCountLimit: 90,
        viewPrice: 1800,
        createdOn: 1489049209000,
        giftId: 7,
        beginDate: '2017-02-18',
        contractPropLimit: ',1,2,',
        giftContent: '内含语、数、外三门学科，纯干货',
        lastUpdatedOn: 1531715299000,
        realPrice: 300
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '【初中】精品课程（1800元）',
        discountPrice: 1800,
        endData: '2017-03-20',
        memo: '录播课的内容，已网盘下载的方式。',
        giftType: 0,
        contractLessonCountLimit: 90,
        viewPrice: 1800,
        createdOn: 1489048992000,
        giftId: 6,
        beginDate: '2017-02-18',
        contractPropLimit: ',1,2,',
        giftContent: '内含语、数、外三门学科，纯干货',
        lastUpdatedOn: 1531715299000,
        realPrice: 300
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 15000,
        giftName: '华为荣耀平板2（999元）',
        discountPrice: 999,
        endData: '2017-11-21',
        memo: '不与赠送课时同享\n礼品价格：999',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 999,
        createdOn: 1489044134000,
        giftId: 5,
        beginDate: '2017-03-09',
        contractPropLimit: ',1,2,',
        giftContent: '8英寸（八核 3G/32G）',
        lastUpdatedOn: 1531715299000,
        realPrice: 999
      },
      {
        contractTypeLimit: ',1,2,',
        contractAmountLimit: 0,
        giftName: '学霸提分笔（45元）',
        discountPrice: 45,
        endData: '2019-06-30',
        memo: '签约礼品\n礼品价格：45',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 45,
        createdOn: 1489039113000,
        giftId: 4,
        beginDate: '2018-01-01',
        contractPropLimit: ',1,',
        giftContent: '电容笔',
        lastUpdatedOn: 1547174767000,
        realPrice: 38
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '开学礼包（100元）',
        discountPrice: 100,
        endData: '2018-05-23',
        memo: '开学季活动礼品\n礼品价格：100',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 100,
        createdOn: 1489038856000,
        giftId: 3,
        beginDate: '2017-02-18',
        contractPropLimit: ',1,',
        giftContent: '学霸提分笔+学霸单词本+学习100天等',
        lastUpdatedOn: 1531715299000,
        realPrice: 60
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 30000,
        giftName: 'iPad mini2（1888元）',
        discountPrice: 1888,
        endData: '2018-04-01',
        memo: '不与赠送课时同享\n礼品价格：1888',
        giftType: 1,
        contractLessonCountLimit: 0,
        viewPrice: 1888,
        createdOn: 1489038799000,
        giftId: 2,
        beginDate: '2017-02-01',
        contractPropLimit: ',1,2,',
        giftContent: 'iPad mini2',
        lastUpdatedOn: 1531715299000,
        realPrice: 1888
      },
      {
        contractTypeLimit: ',1,',
        contractAmountLimit: 0,
        giftName: '【小学】精品课程（1800元）',
        discountPrice: 1800,
        endData: '2017-03-20',
        memo: '录播课的内容，已网盘下载的方式。',
        giftType: 0,
        contractLessonCountLimit: 90,
        viewPrice: 1800,
        createdOn: 1489038562000,
        giftId: 1,
        beginDate: '2017-02-18',
        contractPropLimit: ',1,2,',
        giftContent: '内含语数外',
        lastUpdatedOn: 1531715299000,
        realPrice: 300
      }
    ]
  },
  // 新建合同提交
  'post /biz/sales/contract/addNewContract': {
    data: null
  },
  //分配CR列表
  'get /biz/sales/contract/distributeCrList': {
    data: [
      {
        userId: 900001560,
        userName: 'pm',
        realName: '刘卓'
      },
      {
        userId: 101446,
        userName: 'liyongfeng2',
        realName: '李永丰'
      }
    ]
  },
  //分配cr提交
  'post /biz/sales/contract/distributeCr': {
    data: null
  },
  //分配cr权限
  'get /biz/auth/operation/permission': {
    data: true
  }
}

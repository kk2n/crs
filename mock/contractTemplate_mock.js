module.exports = {
  //模板类型
  'get /orderservice/contract/protocoltemplates/type/list': {
    data: [
      {
        type: 1,
        typeDesc: '常规协议'
      },
      {
        type: 2,
        typeDesc: '寒假协议'
      }
    ]
  },
  //模板列表
  'get /orderservice/contract/protocoltemplates/list': {
    data: {
      pageNum: 2,
      pageSize: 10,
      total: 11,
      'list|11': [
        {
          id: 1001,
          name: '主协议',
          typeDesc: '常规协议',
          statusDesc: '启用中',
          updateByName: '罗伯特帕丁森',
          updateByTime: '2020-02-14 12:00:00',
          'status|1': [2, 3]
        }
      ]
    }
  },
  //新增
  /*
   name
   truestring
   模版名称
   content
   truestring
   模版内容
   assignEnterpriseCode
   truestring
   企业代码*/
  'post /orderservice/contract/protocoltemplates/add': {
    data: null
  },
  //编辑
  /*
   name模版名称
   content模版内容
   id
   企业代码*/
  'post /orderservice/contract/protocoltemplates/update': {
    data: null
  },
  //获取合同模板状态
  'get /orderservice/contract/protocoltemplates/status/list': {
    data: [
      {
        status: 2,
        statusDesc: '启用'
      },
      {
        status: 3,
        statusDesc: '停用'
      }
    ]
  },
  //详情

  'get /orderservice/contract/protocoltemplates/detail/get': {
    code: '000000',
    msg: 'SUCCESS',
    data: {
      templateId: '1',
      name: '测试新建的合同协议模板',
      type: 1,
      status: 2,
      typeDesc: '常规协议',
      statusDesc: '启用',
      content:
        '<p>测试新建的合同协议模板</p><p>$Customer</p><p>合同资料信息</p><p>$contract</p><p>$giftInfo</p><p>以下是合同的内容</p><p>1.合同不可以延长有效期；特殊合同（如寒暑期合同）有效期以实际公布为准。合同有效期开始日期以第一次开课日期为准。</p><p>例如：某学员常规合同签单时间为2019年4月10日15:00，开课时间为2019年5月20日18:00，报名课时数为90课时，则该学员的合同到期时间为：2020年5月19日24:00。</p><p>2. 合同到期后自动终止，如合同有效期内用户提前上完所有课时的或用户申请退费后合同自动终止。</p><p>3.验证合同模板的问题哈哈哈</p><p>4.测试新建的模板哈哈哈</p><p>5.编辑下该合同协议测试</p>',
      enterpriseCode: 'YIMI'
    }
  },
  //启动摸吧
  /*
   templateId
   模板ID
   isEnable
   是否启用（2：启用 3：停用）
   * */
  'post /orderservice/contract/protocoltemplates/enable': {
    data: null
  },
  //删除模板
  'post /orderservice/contract/protocoltemplates/delete': {
    data: null
  }
}

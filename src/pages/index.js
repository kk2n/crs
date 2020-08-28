//路由，导入各个模块的路由1
export default [
  // ...require('./demo2').default,
  ...require('./home').default,
  //试听课管理（一对一）
  ...require('./shiting').default,
  //订单管理（一对一）
  ...require('./order').default,
  //新建试听列表
  ...require('./auditionList').default,
  //课程明细
  ...require('./orderLessonDetails').default,
  //合同管理
  ...require('./contract').default,
  //订单管理（小组课）
  // ...require('./orderManage').default,
  //销售人员管理
  ...require('./saleManage').default,
  //演示课管理
  ...require('./showLesson').default,
  //课时包管理
  // ...require('./classperiodPackage').default,
  //订单管理 新
  // ...require('./newOrderManage').default,
  //订单退款
  // ...require('./refund').default,
  // 报班管理
  // ...require('./appyClasses').default,
  //班级管理
  // ...require('./classesManage').default,
  //教材寄送
  // ...require('./bookDelivery').default,
  //课时包管理
  // ...require('./classPack').default,
  //合同模版
  ...require('./contractTemplate').default,
  //表报，包含通话时长表报
  ...require('./report').default,
  //MGM
  ...require('./MGMManage').default,
  //佣金管理
  ...require('./commissionManage').default
]

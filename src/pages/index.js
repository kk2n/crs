//路由，导入各个模块的路由1
export default [
  ...require('./demo2').default,
  ...require('./home').default,
  //课时包管理
  ...require('./classPack').default,
  //表报，包含通话时长表报
  ...require('./report').default,
  //佣金管理
  ...require('./commissionManage').default
]

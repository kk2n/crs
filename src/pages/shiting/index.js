export default [
  {
    title: '试听课管理（一对一）',
    exact: true,
    // noLayout: true,
    breakData: [{ title: '首页', url: '/' }, { title: '试听课管理（一对一）' }],
    component: require('bundle-loader?lazy&name=[name]!./AuditManage'),
    model: [require('./auditManageModel')],
    path: '/crm/shiTing'
  },
  {
    title: '试听课申请',
    exact: true,
    // noLayout: true,
    breakData: [{ title: '首页', url: '/' }, { title: '试听课申请' }],
    component: require('bundle-loader?lazy&name=[name]!./AuditApplication'),
    model: [require('./auditApplicationModel')],
    path: '/crm/auditApplication'
  }
]

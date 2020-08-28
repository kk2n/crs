export default [
  {
    title: 'MGM管理',
    exact: true,
    component: require('bundle-loader?lazy&name=[name]!./MGMManage'),
    model: [require('./MGMManageModel'), require('./addMGMModel')],
    path: '/crm/MGMManage'
  }
]

export default [
  {
    title: '佣金管理',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '佣金管理' }],
    component: require('bundle-loader?lazy&name=[name]!./CommissionManage'),
    path: '/crm/commissionManage'
  }
]

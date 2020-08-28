export default [
  {
    title: '用户管理',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '用户管理' }],
    component: require('bundle-loader?lazy&name=[name]!./userManage/UserManage.js'),
    model: [require('./userManage/userManageModel')],
    path: '/crm/userManage'
  }
]

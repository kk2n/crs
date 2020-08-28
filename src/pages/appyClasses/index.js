export default [
  {
    title: '报班管理',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '报班管理' }],
    component: require('bundle-loader?lazy&name=[name]!./AppyClassesManage'),
    // model: [require('./refundModel')],
    path: '/crm/appyClassesManage'
  }
]

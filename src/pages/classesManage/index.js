export default [
  {
    title: '班级管理',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '班级管理' }],
    component: require('bundle-loader?lazy&name=[name]!./ClassesManage'),
    path: '/crm/classManage'
  }
]

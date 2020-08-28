export default [
  {
    title: '新建试听列表',
    exact: true,
    noLayout: true,
    component: require('bundle-loader?lazy&name=[name]!./AuditionList'),
    model: [require('./auditionListModel')],
    path: '/auditionList'
  }
]

export default [
  {
    title: '订单管理（小组课）',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '订单管理（小组课）' }],
    component: require('bundle-loader?lazy&name=[name]!./orderManagePage'),
    model: [require('./orderManageModel')],
    path: '/crm/orderListXBK'
  }
]

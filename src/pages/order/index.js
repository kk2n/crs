export default [
  {
    title: '订单管理（一对一）',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '订单管理（一对一）' }],
    component: require('bundle-loader?lazy&name=[name]!./OrderList'),
    model: [require('./orderListModel')],
    path: '/crm/orderList'
  }
]

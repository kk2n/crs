export default [
  {
    title: '订单管理',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '订单管理' }],
    component: require('bundle-loader?lazy&name=[name]!./NewOrderList'),
    model: [require('./orderModel')],
    path: '/crm/newOrderList'
  }
]

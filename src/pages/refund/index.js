export default [
  {
    title: '合同管理(小组课)',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '合同管理(小组课)' }],
    component: require('bundle-loader?lazy&name=[name]!./OrderRefund'),
    // model: [require('./refundModel')],
    path: '/crm/orderRefund'
  }
]

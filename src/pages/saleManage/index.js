export default [
  {
    title: '销售人员管理',
    exact: true,
    noLayout: false,
    component: require('bundle-loader?lazy&name=[name]!./SaleManage'),
    model: [require('./saleManageModel'), require('./components/AddEditModalModel')],
    path: '/crm/saleManage'
  }
]

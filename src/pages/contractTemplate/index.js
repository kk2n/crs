export default [
  {
    title: '合同模版',
    exact: true,
    noLayout: true,
    component: require('bundle-loader?lazy&name=[name]!./contractTemplate'),
    path: '/crm/contractTemplate'
  }
]

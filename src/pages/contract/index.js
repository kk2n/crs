export default [
  {
    title: '合同管理',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '合同管理' }],
    component: require('bundle-loader?lazy&name=[name]!./ContractList'),
    model: [require('./contractListModel')],
    path: '/crm/hetong'
  },
  {
    title: '新增合同（一对一）',
    exact: true,
    noLayout: true,
    breakData: [{ title: '首页', url: '/' }, { title: '新增合同（一对一）' }],
    component: require('bundle-loader?lazy&name=[name]!./addContract/AddContract'),
    model: [require('./addContract/addContractModel')],
    path: '/crm/addContract'
  }
  // {
  //   title: '合同管理(小组课)',
  //   exact: true,
  //   breakData: [{ title: '首页', url: '/' }, { title: '合同管理(小组课)' }],
  //   component: require('bundle-loader?lazy&name=[name]!./subModules/ContractGroup'),
  //   // model: [require('./contractListModel')],
  //   path: '/crm/contractGroup'
  // }
]

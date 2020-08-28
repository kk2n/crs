export default [
  {
    title: '教材管理',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '教材寄送管理' }],
    component: require('bundle-loader?lazy&name=[name]!./BookDelivery'),
    model: [require('./bookDeliveryModel')],
    path: '/crm/bookDelivery'
  }
]

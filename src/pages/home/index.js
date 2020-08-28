export default [
  {
    title: '首页',
    exact: true,
    component: require('bundle-loader?lazy&name=[name]!./Home'),
    model: [require('../commonModel')],
    path: '/'
  }
]

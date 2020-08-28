export default [
  {
    title: '首页',
    exact: true,
    //noLayout: true,
    component: require('bundle-loader?lazy&name=[name]!./Demo'),
    model: [require('./demoModel'), require('../login/loginModel')],
    path: '/demo'
  }
]

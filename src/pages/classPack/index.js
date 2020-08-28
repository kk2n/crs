export default [
  {
    title: '课时包管理',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '课时包管理' }],
    component: require('bundle-loader?lazy&name=[name]!./ClassPackLayout'),
    path: '/lessonPackage'
  },
  {
    title: '课时包管理',
    exact: true,
    noLayout: true,
    component: require('bundle-loader?lazy&name=[name]!./ClassPack'),
    path: '/classPackage'
  }
]

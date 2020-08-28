export default [
  {
    title: '演示课管理',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '演示课管理' }],
    component: require('bundle-loader?lazy&name=[name]!./showLessonPage'),
    model: [require('./showLessonModel')],
    path: '/crm/showLessonPage'
  }
]

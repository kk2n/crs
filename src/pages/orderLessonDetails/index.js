export default [
  {
    title: '课程明细',
    exact: true,
    breakData: [{ title: '首页', url: '/' }, { title: '课程明细' }],
    component: require('bundle-loader?lazy&name=[name]!./orderLessonDetailsPage'),
    model: [require('./orderLessonDetailsModel')],
    path: '/crm/orderLessonDetails'
  }
]

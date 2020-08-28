import template from 'bundle-loader?lazy&name=[name]!./Template'

/**
 * 路由
 * title:标题
 * component 组件
 * path 路径
 * breakData 面包屑数据 例子：breakData: [{ title: '标题', url: '' }],
 * noLayout 没有外框架[菜单，header,foot] 例子：noLayout: true,
 */
export default [
  {
    title: '模板',
    component: template,
    path: '/template'
  }
]

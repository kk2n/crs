/*
基本结构
[
  {
    name: '菜单名',
    key: '1',
    show: true,
    url: '/user',
    icon: 'file',
    default: true,
    defaultOpen:true,
    subMenu:[...]
  }
]
* */

let menuData = [
  {
    name: '潜在客户',
    show: true,
    icon: 'solution',
    url: '/look',
    subMenu: []
  },
  {
    name: '报表',
    show: true,
    icon: 'solution',
    url: '/report',
    subMenu: []
  },
  {
    name: '自助查询',
    show: true,
    icon: 'solution',
    url: '/report',
    subMenu: []
  },
  {
    name: '系统管理',
    show: true,
    icon: 'solution',
    url: '/system',
    subMenu: [
      {
        name: '角色管理',
        show: true,
        url: '/system/role',
        icon: 'solution'
      },
      {
        name: '账号管理',
        show: true,
        url: '/system/account',
        icon: 'solution'
      }
    ]
  }
]
export default menuData

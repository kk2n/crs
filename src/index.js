import React from 'react'
import ReactDom from 'react-dom'
import App from './common/App'
import './Layout/Layout.scss'
import './common/common.scss'
import store from './common/store'
import { actions } from './pages/commonModel'
import { goLogin } from 'ymcmp/goLogin'
import { token } from './utils/axios'
import { permissionDict } from './utils/permissionDict'
;(async function renderPage() {
  if (!token) await goLogin('未找到登录信息，token丢失')
  await store.dispatch(actions.staff())
  await store.dispatch(actions.menu())
  await store.dispatch(actions.getPermission(permissionDict))
  let { staffRes: staff, menuRes: menu } = store.getState().Common
  if (!staff.status || !menu.status) await goLogin('用户信息或菜单获取失败')
  ReactDom.render(<App />, document.getElementById('root'))
})()
module.hot.accept(App)

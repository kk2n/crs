import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Bundle from './Bundle'
import ErrorPage from '../Layout/ErrorPage'
import NotFound from '../Layout/NotFound'
import Loading from '../Layout/Loading'
import Pages from '../pages'
import { connect } from 'ymcore/createModel'
import layout from '../decorators/layout'
import errorCatch from '../decorators/errorCatch'

const createComponent = (component, title, noLayout, breakData) => () => (
  <Bundle load={component}>
    {Component => {
      if (Component) {
        //标题
        document.title = title || ''
        //绑定loction，公共数据，layout等
        let MyComponent = !noLayout
          ? withRouter(connect()(layout(errorCatch(Component))))
          : withRouter(connect()(errorCatch(Component)))
        return <MyComponent breadcrumb={{ Pages, breakData }} />
      }
      return <Loading />
    }}
  </Bundle>
)
//路由
export default () => (
  <Switch>
    {Pages.map(({ title, noLayout, path, component, exact, breakData }, index) => (
      <Route key={index} exact={exact} path={path} component={createComponent(component, title, noLayout, breakData)} />
    ))}
    {/*错误页面*/}
    <Route path="/error" component={ErrorPage} />
    {/*未找到页面，404*/}
    <Route component={NotFound} />
  </Switch>
)

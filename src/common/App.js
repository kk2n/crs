import React, { Component } from 'react'
import Routers from './Router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { Provider } from 'ymcore/createModel'
import store from './store'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ConfigProvider locale={zh_CN}>
            <Routers />
          </ConfigProvider>
        </Router>
      </Provider>
    )
  }
}

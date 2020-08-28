import React from 'react'
import layout from '../decorators/layout'
import { Spin } from 'antd'
import { url } from 'ymcmp/url'
import Pages from '../pages'
let noLayout = Pages.find(a => a.path === url().pathname)?.noLayout
let Loading = () => (
  <Spin tip="Loading...">
    <div style={{ height: '60vh' }} />
  </Spin>
)
export default noLayout ? Loading : layout(Loading)

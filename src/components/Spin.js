import React from 'react'
import { Icon, Spin } from 'antd'
import './Spin.scss'

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1168884_dkvd2gf222g.js',
  extraCommonProps: {
    spin: true,
    style: { fontSize: '60px' }
  }
})

export default props => (
  <Spin
    {...props}
    className={'custom-spin ' + (props?.className || '')}
    indicator={<MyIcon type="icon-loading2" /> || null}
  />
)

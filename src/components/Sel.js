/*
Sel 下拉框组件
说明：1、props继承antd中Select所有props
      2、添加data属性，用来遍历Option
      3、添加vt,用于设置value和text,默认为:'statusId,statusDesc'

 */
import { Select } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const { Option } = Select
class Sel extends Component {
  static defaultProps = {
    vt: 'statusId,statusDesc',
    data: []
  }
  render() {
    return (
      <Select {...this.props}>
        {this.props.data.map((a, key) => {
          //后台接口下拉框规律：value:statusId,text:statusDesc，如变化，请自行设置
          let value = this.props.vt.split(',')[0]
          let text = this.props.vt.split(',')[1]
          return (
            <Option value={a[value]} key={key}>
              {a[text]}
            </Option>
          )
        })}
      </Select>
    )
  }
}

//属性校验
Sel.propTypes = {
  data: PropTypes.array,
  vt: PropTypes.string
}
export default Sel

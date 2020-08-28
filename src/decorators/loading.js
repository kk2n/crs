/**
 *加载Loading
 // 使用
 @loadoading(props => {
   return props.loadingShow == 0;
  })
 */

import React from 'react'
import { Spin } from 'antd'

export default function(isShow) {
  return function(WrappedComponent) {
    return class extends WrappedComponent {
      render() {
        if (isShow(this.props)) {
          return (
            <Spin wrapperClassName={'yimi-loading'} tip="Loading..">
              {super.render()}
            </Spin>
          )
        } else {
          return super.render()
        }
      }
    }
  }
}

import React, { Component } from 'react'
//表单公用的onChange方法,传入的对象为属性fromObj
//返回一个props，handChange
//使用方法：handChange事件
//{...this.props.handChange("zongfen")}相当于onChange={this.props.handChange("zongfen")},里面的"zongfen",为返回对象的键
export default WComp => {
  return class extends Component {
    state = {
      fromObj: this.props.fromObj
    }
    //公共的change
    onChange = (val, key) => {
      this.setState((state, props) => {
        props.fromObj[key] = val
        return props
      })
    }

    render() {
      //绑定操作
      let props = {
        ...this.props,
        handChange: key => ({
          onChange: e => this.onChange(e.target.value, key)
        })
      }
      return <WComp {...props} />
    }
  }
}

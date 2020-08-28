import React, { Component } from 'react'
import { connect } from './demoModel'

@connect
export default class UserInfo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('this.props', this.props)
    return (
      <div>
        同步数据：{this.props.Demo.kk2n}
        <br />
        <br />
        <button
          onClick={() => {
            this.props.kk2nUp('ss')
          }}
        >
          同步
        </button>
        <br />
        <br />
        异步数据：{(this.props.Demo.getListRes || {}).data}
        <br />
        <br />
        <button
          onClick={() => {
            this.props.getList({ kk: 'ss' })
          }}
        >
          异步
        </button>
        <button
          onClick={() => {
            this.props.getData({ kk: 'ss' })
          }}
        >
          异步
        </button>
      </div>
    )
  }
}

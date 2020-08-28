import React, { Component } from 'react'
import { Button } from 'antd'

import img from '../asset/img/err.png'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error) {
    console.log('error', error)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            marginTop: 150,

            textAlign: 'center',
            color: '#FF986D'
          }}
        >
          <img src={img} alt="" />
          <h1
            style={{
              color: '#FF986D',
              marginTop: 20,
              marginBottom: 20
            }}
          >
            非常抱歉，出现错误！
          </h1>
          <h3
            style={{
              color: '#FF986D',
              lineHeight: 2
            }}
          >
            原因可能是页面访问超时，或者缺少数据...
            <br />
            工程师正在拼命抢修中，请耐心等待！
            <br />
            <br />
            <Button
              type={'primary'}
              onClick={() => history.go(-1)}
              size={'large'}
              style={{ backgroundColor: '#FF986D', border: '#FF986D' }}
            >
              返回上一页
            </Button>
          </h3>
        </div>
      )
    }
    return this.props.children
  }
}

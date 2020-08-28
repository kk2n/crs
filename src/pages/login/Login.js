import React, { Component } from 'react'
import { Button, Form, Icon, Input, message, Row, Col } from 'antd'

import './login.scss'
import Api, { domain } from '../../utils/axios'
import { csSet } from 'ymcmp/cookie'
import { mobilePattern } from '../../utils/function'
import { lsSet, lsGet } from 'ymcmp/localStorage'
import { getToken } from 'ymcmp/getToken'
const FormItem = Form.Item
@Form.create({ name: 'login_form' })
export default class Login extends Component {
  constructor() {
    super()
    const loginTypes = [
      { loginType: 1, loginName: '账号密码登录', key: 1 },
      { loginType: 2, loginName: '手机号码登录', key: 2 }
    ]

    // 获取localStoragge中 上次验证码的发送时间  存储的是 (new Date()).toString() 类型字符串
    const verifyCodeLastSent = lsGet('verifyCodeLastSent')

    this.state = {
      loginTypes,
      loginTypeCurrent: loginTypes[0],
      errMsg: '',
      verifyCodeLastSent: verifyCodeLastSent && new Date(verifyCodeLastSent),
      verifyCodeCanSend: true,
      timeRemaining: 60, //手机号码
      shoujihaoma: null
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return false
      }
      //登录请求参数
      const params = {
        loginType: this.state.loginTypeCurrent.loginType
      }
      if (params.loginType === 1) {
        Object.assign(params, {
          userName: values.userName,
          pwd: values.password
        })
      } else if (params.loginType === 2) {
        Object.assign(params, {
          userName: values.mobile,
          pwd: values.verifyCode
        })
      }

      let { data, status, msg } = await Api.post('/biz/open/copartner/login', params)

      if (!status) {
        //登录不成功
        this.setState({ errMsg: msg })
        return false
      }
      csSet('X-MSS-TOKEN', data, 1, '/', domain)
      if (!getToken()) {
        message.error('token为空，登录失败！')
        return false
      }
      clearTimeout(this.timer)
      this.setState({ verifyCodeCanSend: true })
      window.location.href = '/'
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-page">
        <div className="login">
          <div className="login-title">{this.state.loginTypeCurrent.loginName}</div>
          {this.state.errMsg !== '' && <div className="login-err">{this.state.errMsg}</div>}
          <Form onSubmit={this.handleSubmit} className="login-form">
            {(type => {
              if (type === 1)
                return [
                  <FormItem key="userName">
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: '请输入账号！' }]
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入账号"
                        allowClear
                      />
                    )}
                  </FormItem>,
                  <FormItem key="password">
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码！' }]
                    })(
                      <Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入密码"
                      />
                    )}
                  </FormItem>
                ]
              else if (type === 2)
                return [
                  <FormItem key="mobile">
                    {getFieldDecorator('mobile', {
                      rules: [
                        { required: true, message: '请输入手机号！' },
                        { pattern: mobilePattern, message: '请输入正确的11位手机号码' }
                      ]
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入手机号"
                        allowClear
                        onChange={e => {
                          this.setState({
                            shoujihaoma: e.target.value
                          })
                        }}
                      />
                    )}
                  </FormItem>,
                  <FormItem key="verifyCode">
                    <Row gutter={8}>
                      <Col span={16}>
                        {getFieldDecorator('verifyCode', {
                          rules: [
                            //{ max: 6, message: '请输入验证码!' },
                            { pattern: /^[1234567890]\d{0,5}$/, message: '请输入验证码！' },
                            { required: true, message: '请输入验证码！' }
                          ]
                        })(
                          <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入验证码"
                          />
                        )}
                      </Col>
                      <Col span={8}>
                        <Button
                          type="primary"
                          disabled={!this.state.verifyCodeCanSend}
                          className="verify-btn"
                          onClick={async () => {
                            // 是否填写手机号
                            let error = null
                            this.props.form.validateFields(['mobile'], { force: true }, err => (error = err))
                            if (error) return false

                            // 检测localStorage是否有上次发送
                            if (!this.state.verifyCodeCanSend) return false
                            const res = await Api.post(
                              `/biz/open/copartner/sendVerifyCode?mobileNo=` + this.state.shoujihaoma
                              // {
                              //   mobileNo: this.state.shoujihaoma
                              //   // codeType: null
                              // }
                            )

                            if (!res.status) {
                              return false
                            }

                            // 发送成功 记录上次发送时间
                            await this.setState({
                              verifyCodeLastSent: new Date(),
                              verifyCodeCanSend: false
                            })
                            lsSet('verifyCodeLastSent', this.state.verifyCodeLastSent.toString())
                            this.countDown()
                          }}
                        >
                          {this.state.verifyCodeCanSend ? '获取验证码' : this.state.timeRemaining + 's'}
                        </Button>
                      </Col>
                    </Row>
                  </FormItem>
                ]
            })(this.state.loginTypeCurrent.loginType)}

            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登 录
              </Button>
            </FormItem>
          </Form>
          <div className="switch-login-type">
            {this.state.loginTypes
              .filter(item => item.loginType !== this.state.loginTypeCurrent.loginType)
              .map(item => (
                <a
                  key={item.key}
                  onClick={() => {
                    this.setState({ loginTypeCurrent: item, errMsg: '' })
                  }}
                >
                  {item.loginName}
                </a>
              ))}
          </div>
        </div>
      </div>
    )
  }

  // 验证码倒计时
  countDown() {
    let timeRemaining = 60 - Math.floor((new Date() - this.state.verifyCodeLastSent) / 1000)
    if (timeRemaining > 0) {
      this.setState({
        timeRemaining
      })
      this.timer = setTimeout(() => this.countDown(), 1000)
    } else {
      this.setState({
        verifyCodeCanSend: true
      })
    }
  }

  componentDidMount() {
    if (this.state.verifyCodeLastSent !== null && new Date() - this.state.verifyCodeLastSent < 60000) {
      this.setState({
        verifyCodeCanSend: false
      })
      this.countDown()
    }
  }
}

import React, { Component } from 'react'
import { Button, Form, Input, message } from 'antd'
import './login.scss'
import Api from '../../utils/axios'

const FormItem = Form.Item
@Form.create({ name: 'login_form' })
export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return false
      }
      //登录请求参数
      const params = {
        password: values.password,
        password2: values.password2
      }
      let { status } = await Api.post('/biz/open/copartner/login', params)
      if (!status) {
        return false
      }
      message.success('修改成功！')
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-page">
        <div className="login" style={{ border: 'none', width: '50%', right: '18%' }}>
          <div className="login-title" style={{ color: '#333' }}>
            为了您的账户安全性，请设置密码
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{ maxWidth: 338 }}>
            <span style={{ fontSize: 16 }}>请输入新密码：</span>
            <FormItem key="userName">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入新密码！' }]
              })(<Input.Password placeholder="请输入新密码" />)}
            </FormItem>
            <span style={{ fontSize: 16 }}>再输入一次：</span>
            <FormItem key="password">
              {getFieldDecorator('password2', {
                rules: [{ required: true, message: '请再输入新密码！' }]
              })(<Input.Password placeholder="请再输入新密码" />)}
              提示：请输入至少8～32位字母和数字组合的密码
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                确定
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

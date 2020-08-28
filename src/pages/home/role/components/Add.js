import { Modal, Form, Input, Button, message } from 'antd'
import React from 'react'
import './search.scss'
const zhengZe = {
  name: /^([\u4e00-\u9fa5][ \u4e00-\u9fa5]{0,20}[\u4e00-\u9fa5])$/,
  simpleName: /^([ a-zA-Z\+\-+_]{0,20})$/
}
export default Form.create()(props => {
  const { getFieldDecorator } = props.form
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }
  let handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields(async v => {
      if (!v.roleName) {
        message.error('请填写角色名称')
        return false
      }
      if (!v.simpleName) {
        message.error('请填写角色简称')
        return false
      }
      let param = {
        roleName: v.roleName,
        simpleName: v.simpleName
      }
      props.update(param)
      props.onCancel()
    })
  }
  return (
    <Modal title="新建" footer={null} visible={true}>
      <Form onSubmit={handleSubmit} className="add-leads-form" id="from">
        {
          <Form.Item {...formItemLayout} label="角色名称">
            {getFieldDecorator('roleName', {
              rules: [
                {
                  required: true,
                  message: '请输入'
                },
                {
                  pattern: zhengZe.name,
                  message: '仅可输入中文，最大20个字'
                }
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        }
        {
          <Form.Item {...formItemLayout} label="角色简称">
            {getFieldDecorator('simpleName', {
              rules: [
                {
                  required: true,
                  message: '请输入'
                },
                {
                  pattern: zhengZe.simpleName,
                  message: '仅可输入英文+-+_，最大20个字'
                }
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        }
        <Form.Item wrapperCol={{ span: 7, offset: 16 }} style={{ marginBottom: 0 }}>
          <Button onClick={props.onCancel}>取消</Button>
          &nbsp;&nbsp;
          <Button type="primary" htmlType="submit" loading={props.success}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
})

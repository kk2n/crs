import { Modal, Form, Input, Button, message } from 'antd'
import React, { Component } from 'react'
import API from '../../../utils/axios'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}
@Form.create({ name: 'Add' })
export default class Tingke extends Component {
  state = {
    isLoad: false
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) return false
      let params = {
        stopMemo: values.name,
        contractId: this.props.OrderList.orderId
      }
      this.setState({ isLoad: true })
      let { status } = await API.post('/biz/sales/order/stopLesson', params)
      if (!status) {
        this.setState({ isLoad: false })
        return false
      }
      this.setState({ isLoad: false })
      message.success('操作成功！')
      this.props.handleOk()
      this.props.getList()
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        visible={this.props.OrderList.tingkeModal}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={780}
        title={'停课原因'}
        footer={null}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="请填写停课原因">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请填写停课原因'
                }
              ]
            })(<Input maxLength={30} style={{ width: 440 }} placeholder="请填写停课原因" />)}
          </Form.Item>
          <Form.Item wrapperCol={{ span: 6, offset: 10 }}>
            <Button onClick={this.props.handleCancel} style={{ marginRight: 20 }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" loading={this.state.isLoad}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

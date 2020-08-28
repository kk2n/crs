import React from 'react'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
const { RangePicker } = DatePicker
const { Option } = Select
import API from '../../../utils/axios'
import './filterWidget.scss'
import moment from 'moment'
class FromComponent extends React.Component {
  state = {
    expand: false,
    statusList: [],
    channelList: [],
    periodList: [],
    propertyList: []
  }
  componentDidMount() {
    this.getParamsAllList()
  }

  getParamsAllList = () => {
    Promise.all([
      API.get('/biz/coursepack/order/status/list'),
      API.get('/biz/coursepack/shopping/channel/list'),
      API.get('/biz/coursepack/period/form/list'),
      API.get('/biz/coursepack/order/property/list')
    ]).then(res => {
      if (res[0].status) {
        this.setState({ statusList: res[0].data })
      }
      if (res[1].status) {
        this.setState({ channelList: res[1].data })
      }
      if (res[2].status) {
        this.setState({ periodList: res[2].data })
      }
      if (res[3].status) {
        this.setState({ propertyList: res[3].data })
      }
    })
  }

  handleSearch = e => {
    e && e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      console.log(err, fieldsValue, 'reset')
      if (err) return false
      const rangeDate = fieldsValue['range'] || []
      if (this.props.setParams) {
        this.props.setParams({
          ...fieldsValue,
          startTime: rangeDate[0] ? moment(rangeDate[0]).format('YYYY-MM-DD') : '',
          endTime: rangeDate[1] ? moment(rangeDate[1]).format('YYYY-MM-DD') : ''
        })
      }
      this.props.reset()
      if (this.props.getData) {
        this.props.getData()
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
    this.handleSearch()
  }

  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    let { statusList = [], channelList = [], periodList = [], propertyList = [] } = this.state
    return (
      <Form className="fromBox" onSubmit={this.handleSearch}>
        <Row>
          <Col xxl={4} xl={6} lg={6} md={6}>
            <Form.Item label={`合同编号`}>
              {getFieldDecorator('orderId')(<Input allowClear placeholder="请输入合同编号" />)}
            </Form.Item>
          </Col>
          <Col xxl={4} xl={6} lg={6} md={6}>
            <Form.Item label={`用户`}>
              {getFieldDecorator('nameOrMobile')(<Input allowClear placeholder="请输入姓名/手机号" />)}
            </Form.Item>
          </Col>
          <Col xxl={4} xl={6} lg={6} md={6}>
            <Form.Item label={`合同状态`}>
              {getFieldDecorator('orderStatus')(
                <Select allowClear placeholder="请选择">
                  {statusList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xxl={{ span: 4 }} xl={6} lg={6} md={6}>
            <Form.Item label={`下单时间`}>
              {getFieldDecorator('range')(<RangePicker format={'YYYY-MM-DD'} allowClear style={{ width: '210px' }} />)}
            </Form.Item>
          </Col>

          <Col xxl={{ span: 4, offset: 1 }} xl={6} lg={6} md={6}>
            <Form.Item label={`购买渠道`}>
              {getFieldDecorator('shoppingChannel')(
                <Select allowClear placeholder="请选择">
                  {channelList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xxl={4} xl={6} lg={6} md={6}>
            <Form.Item label={`分期形式`}>
              {getFieldDecorator('periodForm')(
                <Select allowClear placeholder="请选择">
                  {periodList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xxl={4} xl={6} lg={6} md={6}>
            <Form.Item label={`合同属性`}>
              {getFieldDecorator(`orderAttribute`)(
                <Select allowClear placeholder="请选择">
                  {propertyList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6}></Col>
          <Col xxl={{ span: 2, offset: 5 }} xl={6} lg={6} md={6} className="buttonBox">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(FromComponent)

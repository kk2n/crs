import React from 'react'
import { Modal, Button, Select, Row, Spin, message } from 'antd'
import API from '../../../utils/axios'
import debounce from 'lodash/debounce'
const Option = Select.Option
import './option.scss'
export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.fetchUser = debounce(this.fetchUser, 800)
  }
  state = {
    visible: false,
    fetching: false,
    gradeList: [],
    userList: [],
    periodList: [],
    payWayList: [],
    periodInfo: {},
    coursepackId: ''
  }

  componentDidMount() {
    this.getGradeList()
    this.getPayWayList()
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }
  getGradeList = async () => {
    let { data, status } = await API.get('/biz/coursepack/conf/grade/list')
    if (status) {
      this.setState({ gradeList: data })
    }
  }

  getPayWayList = async () => {
    let { data, status } = await API.get('/biz/coursepack/payment/way/list')
    if (status) {
      this.setState({ payWayList: data })
    }
  }

  addParams = {
    coursepackId: '',
    shoppingChannel: 'ZYZX',
    belongId: '',
    paymentWay: '',
    clientId: ''
  }
  // 设置年级
  setGrade = (val, record) => {
    console.log(val, record, 'vv')
    this.addParams.gradeId = val
    this.setState({ periodList: record.props.data, coursepackId: '' })
    this.getPeriodPrice()
  }

  // 设置课时包id
  setPeriod = val => {
    this.addParams.coursepackId = val
    this.setState({ coursepackId: val })
    this.getPeriodPrice()
  }

  // 设置支付方式
  setPayWay = val => {
    this.addParams.paymentWay = val
    this.getPeriodPrice()
  }
  // 设置用户信息
  setUserInfo = val => {
    this.addParams.clientId = val
    this.getPeriodPrice()
  }

  handleOk = () => {
    if (!this.addParams.paymentWay) {
      message.error('请选择支付方式')
      return false
    }
    if (!this.addParams.clientId) {
      message.error('请填手机号')
      return false
    }
    if (!this.addParams.gradeId) {
      message.error('请选择年级')
      return false
    }
    if (!this.addParams.coursepackId) {
      message.error('请选择课时')
      return false
    }

    this.addOrder()
    this.setState({
      visible: false
    })
  }
  // 创建订单
  addOrder = async () => {
    let { status, msg } = await API.post('/biz/coursepack/order/create', this.addParams)
    if (!status) return false
    await this.props.getData()
    message.success(msg)
    this.addParams = {
      coursepackId: '',
      shoppingChannel: 'ZYZX',
      belongId: '',
      paymentWay: '',
      clientId: ''
    }
    this.setState({ periodInfo: {}, coursepackId: '' })
  }

  handleCancel = () => {
    this.addParams = {
      coursepackId: '',
      shoppingChannel: 'ZYZX',
      belongId: '',
      paymentWay: '',
      clientId: ''
    }
    this.setState({
      visible: false,
      periodInfo: {},
      coursepackId: ''
    })
  }

  // 获取价格
  getPeriodPrice = async () => {
    let params = this.addParams
    if (!params.clientId) return false
    if (!params.coursepackId) return false
    if (!params.paymentWay) return false
    let { data, status } = await API.post('/biz/coursepack/price', params)
    if (status) {
      this.setState({ periodInfo: data })
    }
  }

  // 查询用户
  fetchUser = async value => {
    this.setState({ fetching: true })
    let params = {
      nameOrPhone: value
    }
    let { data, status } = await API.get('/biz/coursepack/user/like/list', params)
    if (status) {
      this.setState({ userList: data, fetching: false })
    } else {
      this.setState({ fetching: false })
    }
  }

  render() {
    let {
      gradeList = [],
      visible = false,
      fetching = false,
      userList = [],
      periodList = [],
      payWayList = [],
      periodInfo = {},
      coursepackId = ''
    } = this.state
    return (
      <div className="option-warp">
        <Button type="primary" onClick={this.showModal}>
          +新建订单
        </Button>
        <Modal
          destroyOnClose
          width={600}
          title="新建订单*为必填项"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <div className="rowItem">
              <span>* 支付方式:</span>
              <Select className="inputBox" onChange={this.setPayWay} placeholder="请选择">
                {payWayList.map(item => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </Row>
          <Row>
            <div className="rowItem">
              <span>* 选择用户:</span>
              <Select
                placeholder="选择用户"
                showSearch
                allowClear
                className="inputBox"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchUser}
                onChange={this.setUserInfo}
              >
                {userList.map(d => (
                  <Option data={d} key={d.userId}>
                    {d.mobile}
                  </Option>
                ))}
              </Select>
            </div>
          </Row>
          <Row>
            <div className="rowItem">
              <span>* 添加充值:</span>
              <Select className="inputBox" onChange={this.setGrade} placeholder="请选择">
                {gradeList.map(item => {
                  return (
                    <Option key={item.gradeId} data={item.listPeriod} value={item.gradeId}>
                      {item.gradeName}
                    </Option>
                  )
                })}
              </Select>
            </div>
            <div className="rowItem">
              <Select className="inputBox" value={coursepackId} placeholder={'请选择课时'} onChange={this.setPeriod}>
                {periodList.map(item => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.period}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </Row>
          <Row>
            <div className="payInfo">
              <p>支付情况:</p>
              <p className="itemBox">
                <span>原价:</span>
                <span className="account">¥{periodInfo.orderPrice}</span>
              </p>
              <p className="itemBox">
                <span>优惠价:</span>
                <span className="account">¥{periodInfo.discountAmount}</span>
              </p>
              <p className="itemBox">
                <span>实付金额:</span>
                <span className="account">¥{periodInfo.totalPrice}</span>
              </p>
            </div>
          </Row>
        </Modal>
      </div>
    )
  }
}

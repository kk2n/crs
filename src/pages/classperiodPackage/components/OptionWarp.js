import React from 'react'
import moment from 'moment'
import { InputNumber, Radio, DatePicker, Button, Modal, Select, message } from 'antd'
const { RangePicker } = DatePicker
const { confirm } = Modal
const { Option } = Select
import './dynamicFieldSet.scss'
import API from '../../../utils/axios'

// let id = 0

export default class DynamicFieldSet extends React.Component {
  state = {
    addFlag: false,
    newDiscount: '0',
    oldDiscount: '0'
  }

  disabledDate = current => {
    return (
      current &&
      current <=
        moment()
          .add(-1, 'day')
          .endOf('day')
    )
  }

  // 设置value
  setVal = (key, val) => {
    console.log(key, val)
    this.addParams[key] = val
    console.log(this.addParams, 'setVal')
  }
  // 设置时间范围
  setRangeDate = (type, dateString) => {
    if (type === 'new') {
      this.addParams.newDiscountStart = dateString[0]
      this.addParams.newDiscountEnd = dateString[1]
    } else {
      this.addParams.oldDiscountStart = dateString[0]
      this.addParams.oldDiscountEnd = dateString[1]
    }
  }

  resetData = () => {
    this.addParams = {
      gradeId: '',
      period: 0,
      price: 0,
      stagesPrice: 0,
      iosPrice: 0,
      newDiscount: '0',
      newDiscountRate: '',
      newDiscountStart: '',
      newDiscountEnd: '',
      oldDiscount: '0',
      oldDiscountRate: '',
      oldDiscountStart: '',
      oldDiscountEnd: ''
    }
    this.setState({ newDiscount: '0', oldDiscount: '0' })
  }

  //添加课时包
  add = () => {
    this.setState({ addFlag: true })
  }
  //取消
  handleCancel = () => {
    confirm({
      title: '是否确定关闭页面?',
      cancelText: '否',
      okText: '是',
      onOk: () => {
        this.resetData()
        this.setState({ addFlag: false })
      },
      onCancel() {}
    })
  }

  addParams = {
    gradeId: '',
    period: 0,
    price: 0,
    stagesPrice: 0,
    iosPrice: 0,
    newDiscount: '0',
    newDiscountRate: '',
    newDiscountStart: '',
    newDiscountEnd: '',
    oldDiscount: '0',
    oldDiscountRate: '',
    oldDiscountStart: '',
    oldDiscountEnd: ''
  }
  // 设置模态框
  setModalGrade = val => {
    this.addParams.gradeId = val
  }

  // 设置折扣
  setDiscount = (type, val) => {
    if (type === 'newDiscount') {
      this.addParams.newDiscountRate = ''
      this.addParams.newDiscountStart = ''
      this.addParams.newDiscountEnd = ''
    } else {
      this.addParams.oldDiscountRate = ''
      this.addParams.oldDiscountStart = ''
      this.addParams.oldDiscountEnd = ''
    }
    console.log(type, val)
    this.addParams[type] = val
    this.setState({ [type]: val })
  }

  //提交
  addCommit = () => {
    console.log(this.addParams, 'addParams')
    if (!this.addParams.gradeId) {
      message.error('请选择年级')
      return false
    }
    if (!this.addParams.period) {
      message.error('请填写课时')
      return false
    }
    if (!this.addParams.price) {
      message.error('请填写价格')
      return false
    }
    if (!this.addParams.stagesPrice) {
      message.error('请填写分期价格')
      return false
    }
    if (!this.addParams.iosPrice) {
      message.error('请填写ios价格')
      return false
    }
    if (this.addParams.newDiscount === '1' && !this.addParams.newDiscountRate) {
      message.error('请填写折扣')
      return false
    }
    if (this.addParams.newDiscount === '1' && !this.addParams.newDiscountStart) {
      message.error('请选择日期')
      return false
    }
    if (this.addParams.oldDiscount === '1' && !this.addParams.oldDiscountRate) {
      message.error('请填写折扣')
      return false
    }
    if (this.addParams.oldDiscount === '1' && !this.addParams.oldDiscountStart) {
      message.error('请选择日期')
      return false
    }
    if (
      this.addParams.newDiscount === '1' &&
      moment(moment().format('YYYY-MM-DD HH:mm')).valueOf() >=
        moment(moment(this.addParams.newDiscountStart).format('YYYY-MM-DD HH:mm')).valueOf()
    ) {
      message.error('开始时间不能早于当前时间')
      return false
    }
    if (
      this.addParams.oldDiscount === '1' &&
      moment(moment().format('YYYY-MM-DD HH:mm')).valueOf() >=
        moment(moment(this.addParams.oldDiscountStart).format('YYYY-MM-DD HH:mm')).valueOf()
    ) {
      message.error('开始时间不能早于当前时间')
      return false
    }

    // this.addParams.newDiscountRate = this.addParams.newDiscountRate + ''
    // this.addParams.oldDiscountRate = this.addParams.oldDiscountRate + ''
    // console.log(Object.prototype.toString.call(this.addParams.newDiscountRate, 'gggg'))
    confirm({
      title: '请确认金额，是否确定提交?',
      cancelText: '否',
      okText: '是',
      onOk: () => {
        this.commitData()
        this.resetData()
        this.setState({ addFlag: false })
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  commitData = async () => {
    let { status, msg } = await API.post('/biz/coursepack/period/add', this.addParams)
    if (status) {
      message.success(msg)
      this.props.getData()
    }
    this.addParams = {
      gradeId: '',
      period: 0,
      price: 0,
      stagesPrice: 0,
      iosPrice: 0,
      newDiscount: '0',
      newDiscountRate: '',
      newDiscountStart: '',
      newDiscountEnd: '',
      oldDiscount: '0',
      oldDiscountRate: '',
      oldDiscountStart: '',
      oldDiscountEnd: ''
    }
  }

  render() {
    let { gradeList = [] } = this.props
    let { newDiscount, oldDiscount } = this.state
    return (
      <>
        <Button type="primary" onClick={this.add}>
          +添加课时包
        </Button>
        <Modal
          width={1100}
          title="添加课时包"
          destroyOnClose
          maskClosable={false}
          visible={this.state.addFlag}
          onOk={this.addCommit}
          onCancel={this.handleCancel}
        >
          <div className="modelSelectBox">
            *年级:
            <Select style={{ width: 140 }} placeholder="请选择" allowClear onChange={this.setModalGrade}>
              {gradeList.map(item => {
                return (
                  <Option key={item.gradeId} value={item.gradeId}>
                    {item.gradeName}
                  </Option>
                )
              })}
            </Select>
          </div>
          <div className="dynamicRow">
            <div className="rowBase">
              <div className="itemBox">
                <span>*课时:</span>
                <InputNumber
                  max={999}
                  min={1}
                  placeholder="请输入课时数量"
                  className="valueBox"
                  onChange={val => this.setVal('period', val)}
                />
              </div>
              <div className="itemBox">
                <span>原价:</span>
                <InputNumber
                  placeholder="请输入金额"
                  max={999999}
                  min={1}
                  className="valueBox"
                  onChange={val => this.setVal('price', val)}
                />
              </div>
              <div className="itemBox">
                <span>分期价格:</span>
                <InputNumber
                  placeholder="请输入金额"
                  max={999999}
                  min={1}
                  className="valueBox"
                  onChange={val => this.setVal('stagesPrice', val)}
                />
              </div>
              <div className="itemBox">
                <span>ios价格:</span>
                <InputNumber
                  placeholder="请输入金额"
                  max={999999}
                  min={1}
                  className="valueBox"
                  onChange={val => this.setVal('iosPrice', val)}
                />
              </div>
            </div>
            <div className="rowOther">
              <div className="itemBox">
                <span> *设置折扣(新用户):</span>
                <Radio.Group value={newDiscount} onChange={e => this.setDiscount('newDiscount', e.target.value)}>
                  <Radio value={'0'}>无</Radio>
                  <Radio value={'1'}>有</Radio>
                </Radio.Group>
              </div>
              {newDiscount === '1' && (
                <>
                  <div className="discountBox">
                    <span>请设置折扣力度:</span>
                    <InputNumber
                      placeholder="请输入折扣"
                      precision={1}
                      max={9.9}
                      min={1}
                      className="valueBox"
                      onChange={val => this.setVal('newDiscountRate', val)}
                    />
                  </div>
                  <div className="discountBox">
                    <span>请设置折扣时间:</span>
                    <RangePicker
                      format="YYYY-MM-DD HH:mm"
                      showTime={{ format: 'HH:mm' }}
                      disabledDate={this.disabledDate}
                      onChange={(date, dateString) => {
                        this.setRangeDate('new', dateString)
                      }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="rowOther">
              <div className="itemBox">
                <span>*设置折扣(老用户):</span>
                <Radio.Group value={oldDiscount} onChange={e => this.setDiscount('oldDiscount', e.target.value)}>
                  <Radio value={'0'}>无</Radio>
                  <Radio value={'1'}>有</Radio>
                </Radio.Group>
              </div>
              {oldDiscount === '1' && (
                <>
                  <div className="discountBox">
                    <span>请设置折扣力度:</span>
                    <InputNumber
                      placeholder="请输入折扣"
                      precision={1}
                      max={9.9}
                      min={1}
                      className="valueBox"
                      onChange={val => this.setVal('oldDiscountRate', val)}
                    />
                  </div>
                  <div className="discountBox">
                    <span>请设置折扣时间:</span>
                    <RangePicker
                      format="YYYY-MM-DD HH:mm"
                      showTime={{ format: 'HH:mm' }}
                      disabledDate={this.disabledDate}
                      onChange={(date, dateString) => this.setRangeDate('old', dateString)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
      </>
    )
  }
}

import React from 'react'
import moment from 'moment'
import { InputNumber, Radio, DatePicker } from 'antd'
const { RangePicker } = DatePicker
import './dynamicFieldSet.scss'

let id = 0
export default class DynamicFieldSet extends React.Component {
  state = {
    keys: [0]
  }
  remove = (k, index) => {
    let { keys = [] } = this.state

    // We need at least one passenger
    if (keys.length === 1) {
      return
    }
    this.result.splice(index, 1)
    this.setState({ keys: keys.filter(key => key !== k) })
  }

  disabledDate = current => {
    return current && current <= moment().endOf('day')
  }

  result = [{}]

  add = () => {
    let { keys = [] } = this.state
    // can use data-binding to get
    keys.push(++id)
    // can use data-binding to set
    // important! notify form to detect changes
    this.result.push({})
    this.setState({ keys: keys })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values
        console.log('Received values of form: ', values)
        console.log(
          'Merged values:',
          keys.map(key => names[key])
        )
      }
    })
  }
  // 设置value
  setVal = (/*key*/) => {}
  // 设置时间范围
  setRangeDate = (a, b, c) => {
    console.log(a, b, c)
  }

  render() {
    return (
      <div className="dynamicRow">
        <div className="rowBase">
          <div className="itemBox">
            <span>课时:</span>
            <InputNumber
              max={999}
              min={1}
              placeholder="请输入课时数量"
              className="valueBox"
              onClick={e => this.setVal(1, e.target.value)}
            />
          </div>
          <div className="itemBox">
            <span>价格:</span>
            <InputNumber
              placeholder="请输入金额"
              max={999999}
              min={1}
              className="valueBox"
              onClick={e => this.setVal(1, e.target.value)}
            />
          </div>
          <div className="itemBox">
            <span>分期价格:</span>
            <InputNumber
              placeholder="请输入金额"
              max={999999}
              min={1}
              className="valueBox"
              onClick={e => this.setVal(1, e.target.value)}
            />
          </div>
          <div className="itemBox">
            <span>ios价格:</span>
            <InputNumber
              placeholder="请输入金额"
              max={999999}
              min={1}
              className="valueBox"
              onClick={e => this.setVal(1, e.target.value)}
            />
          </div>
        </div>
        <div className="rowOther">
          <div className="itemBox">
            <span>设置折扣(老用户):</span>
            <Radio.Group onChange={e => this.setVal(1, e.target.value)}>
              <Radio value={1}>无</Radio>
              <Radio value={2}>有</Radio>
            </Radio.Group>
          </div>
          <div className="discountBox">
            <span>请设置折扣力度:</span>
            <InputNumber
              placeholder="请输入金额"
              precision={2}
              max={9.99}
              min={1}
              className="valueBox"
              onClick={e => this.setVal(1, e.target.value)}
            />
          </div>
          <div className="discountBox">
            <span>请设置折扣时间:</span>
            <RangePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              disabledDate={this.disabledDate}
              onChange={(date, dateString) => {
                this.setRangeDate(date, dateString)
              }}
            />
          </div>
        </div>
        <div className="rowOther">
          <div className="itemBox">
            <span>设置折扣(新用户):</span>
            <Radio.Group onChange={e => this.setVal(1, e.target.value)}>
              <Radio value={1}>无</Radio>
              <Radio value={2}>有</Radio>
            </Radio.Group>
          </div>
          <div className="discountBox">
            <span>请设置折扣力度:</span>
            <InputNumber
              placeholder="请输入金额"
              precision={2}
              max={9.99}
              min={1}
              className="valueBox"
              onClick={e => this.setVal(1, e.target.value)}
            />
          </div>
          <div className="discountBox">
            <span>请设置折扣时间:</span>
            <RangePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              disabledDate={this.disabledDate}
              onChange={(date, dateString) => {
                this.setRangeDate(date, dateString)
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { DatePicker /*, Radio*/, Modal, message } from 'antd'
import moment from 'moment'
import API from '../../../../utils/axios'

// const format = 'YYYY-MM-DD'
export default class StartClass extends Component {
  state = {
    visible: false
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

  setDate = (date, dateString) => {
    this.paramsInfo.date = dateString
  }

  paramsInfo = {
    date: ''
  }

  resetParamsInfo = () => {
    this.paramsInfo = {
      date: ''
    }
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  doCommit = async () => {
    let params = {
      classGroupId: this.props.data.id,
      beginDate: this.paramsInfo.date
    }
    if (!params.beginDate) {
      message.warning('选择开课日期')
      return false
    }
    let { status, msg } = await API.post('/biz/coursepack/class/group/status', params)
    if (status) {
      message.success(msg)
      this.resetParamsInfo()
      this.props.getData()
      this.handleCancel()
    } else {
      message.error(msg)
      this.handleCancel()
      this.resetParamsInfo()
    }
  }

  render() {
    return (
      <>
        <a onClick={this.showModal}>开课</a>
        {this.state.visible && (
          <Modal
            title="开课"
            destroyOnClose
            visible={this.state.visible}
            onOk={this.doCommit}
            onCancel={this.handleCancel}
          >
            <div style={{ minHeight: 50 }}>
              <span>开课日期:</span>
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{ format: 'HH:mm:ss' }}
                disabledDate={this.disabledDate}
                onChange={this.setDate}
              />
            </div>
          </Modal>
        )}
      </>
    )
  }
}

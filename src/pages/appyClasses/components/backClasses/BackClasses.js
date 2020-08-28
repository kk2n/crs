import React, { Component } from 'react'
import { Modal, message, Tag } from 'antd'
import API from './../../../../utils/axios'
export default class BackClasses extends Component {
  state = { visible: false }
  showModal = (val, record) => {
    this.getHour()
    this.rowData = record
    this.setState({ visible: true, hour: '' })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      hour: ''
    })
  }

  getHour = async () => {
    let params = {
      attendId: this.props.data.id,
      userId: this.props.data.userId
    }
    let { data, status } = await API.post('/biz/coursepack/class/group/exit/lesson/hour', params)
    if (status) {
      this.setState({ hour: data })
    }
  }

  // 退班
  doBack = async () => {
    let params = {
      attendId: this.props.data.id,
      userId: this.props.data.userId
    }
    let { status, msg } = await API.post('/biz/coursepack/class/group/exit', params)
    if (status) {
      this.props.getData()
      this.handleCancel()
      message.success(msg)
    } else {
      message.error(msg)
    }
  }
  render() {
    let { data = {} } = this.props
    return (
      <>
        {data.classState === 1 ? <a onClick={this.showModal}>退班</a> : <Tag color="gray">已退班</Tag>}
        <Modal title="退款" visible={this.state.visible} onOk={this.doBack} onCancel={this.handleCancel}>
          <div>
            <p>
              <span>您确定要给</span>
              <span>{data.studentName}</span>
              <span>学员退</span>
              <span>{data.classCode}</span>
              <span>班的剩余课时</span>
              <span>{this.state.hour}</span>
              <span>吗？</span>
            </p>
          </div>
        </Modal>
      </>
    )
  }
}

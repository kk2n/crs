import React, { Component } from 'react'
import { Radio, Modal, message } from 'antd'
import moment from 'moment'
import API from '../../../../utils/axios'

// const format = 'YYYY-MM-DD'
export default class ReleaseSetting extends Component {
  state = {
    visible: false,
    endDate: null,
    releaseStatusList: [],
    isDate: false,
    onState: '2',
    onStartTime: '',
    onEndTime: ''
  }

  // disabledDate = current => {
  //   return (
  //     current &&
  //     current <=
  //       moment()
  //         .add(-1, 'day')
  //         .endOf('day')
  //   )
  // }

  //获取上架状态
  getReleaseStatusList = async () => {
    let { data, status } = await API.get('/biz/coursepack/class/group/onState/list')
    if (!status) return false
    this.setState({ releaseStatusList: data })
  }

  resetParamsInfo = () => {
    this.setState({ endDate: '', onState: '', isDate: false, onStartTime: '', onEndTime: '' })
  }

  // endDateDisable = current => {
  //   let minDate = this.state.onStartTime
  //   if (!minDate) {
  //     minDate = moment().format(format)
  //   }
  //   return (
  //     current &&
  //     current <=
  //       moment(minDate)
  //         .add(-1, 'day')
  //         .endOf('day')
  //   )
  // }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  formatDate = val => {
    if (val) {
      return moment(val)
    } else {
      return null
    }
  }

  showModal = () => {
    let { data = {} } = this.props
    // if (data.onState === 2 || data.onState === 3) {
    //   this.setState({
    //     visible: true,
    //     onState: data.onState,
    //     onStartTime: this.formatDate(data.onStartTime),
    //     onEndTime: this.formatDate(data.onEndTime),
    //     endDate: this.formatDate(data.onEndTime),
    //     isDate: true
    //   })
    // } else {
    //   this.setState({
    //     visible: true,
    //     onState: data.onState,
    //     onStartTime: this.formatDate(data.onStartTime),
    //     onEndTime: this.formatDate(data.onEndTime),
    //     endDate: this.formatDate(data.onEndTime)
    //   })
    // }
    this.setState({
      visible: true,
      onState: data.onState
    })
    this.getReleaseStatusList()
  }

  doCommit = async () => {
    let params = {
      onState: this.state.onState,
      classGroupId: this.props.data.id
    }
    if (!params.onState) {
      message.warning('请选择上架方式')
      return false
    }

    // if (this.state.isDate && !this.state.onStartTime) {
    //   message.warning('请选择上架日期')
    //   return false
    // }
    // if (this.state.isDate && !this.state.onEndTime) {
    //   message.warning('请选择结束日期')
    //   return false
    // }

    // if (this.state.isDate) {
    //   params.onStartTime = this.state.onStartTime.format(format)
    //   params.onEndTime = this.state.onEndTime.format(format)
    // }

    let { data, msg } = await API.post('/biz/coursepack/class/group/onState', params)
    if (data) {
      await message.success(msg)
      this.props.getData()
      this.resetParamsInfo()
      this.handleCancel()
    } else {
      message.error(msg)
      this.handleCancel()
      this.resetParamsInfo()
    }
  }

  // 设置开始时间
  setStartDate = date => {
    this.setState({ endDate: null, onStartTime: date, onEndTime: '' })
  }

  //结束时间
  setEndDate = date => {
    this.setState({ endDate: date, onEndTime: date })
  }

  //设置上架方式
  setRadio = e => {
    console.log('ggg')
    let val = e.target.value
    this.setState({ onState: val })
    // if (val === '2' || val === '3') {
    //   this.setState({ isDate: true, onState: e.target.value })
    // } else {
    //   this.setState({ isDate: false, onState: e.target.value })
    // }
  }

  render() {
    let { releaseStatusList, visible, onState } = this.state
    return (
      <>
        <a onClick={this.showModal}>上架设置</a>
        {visible && (
          <Modal title="上架设置" destroyOnClose visible={visible} onOk={this.doCommit} onCancel={this.handleCancel}>
            <div>
              <span>上架状态:</span>
              <Radio.Group onChange={this.setRadio} value={String(onState)}>
                {releaseStatusList.map(item => {
                  return (
                    <Radio key={item.id} value={item.id}>
                      {item.name}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </div>
            {/* {isDate && (
              <div style={{ marginTop: 15 }}>
                <span>上架日期:</span>
                <DatePicker
                  value={onStartTime}
                  onChange={this.setStartDate}
                  format={format}
                  disabledDate={this.disabledDate}
                />
                <span>-</span>
                <DatePicker
                  value={endDate}
                  format={format}
                  onChange={this.setEndDate}
                  disabledDate={this.endDateDisable}
                />
              </div>
            )} */}
          </Modal>
        )}
      </>
    )
  }
}

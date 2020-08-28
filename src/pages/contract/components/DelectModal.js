import React, { Component } from 'react'
import { Modal, message } from 'antd'
import API from '../../../utils/axios'

export default class DelectModal extends Component {
  constructor(props) {
    super(props)
  }
  onOk = async () => {
    this.props.handleOk()
    let { status } = await API.post('/biz/sales/contract/delContract', {
      contractId: this.props.ContractList.contractId
    })
    if (!status) {
      return false
    }
    await message.success('您的操作已成功！')
    this.props.showDelectModalUp(false)
    this.props.getContractList()
  }
  render() {
    return (
      <Modal
        title="确认操作"
        visible={this.props.ContractList.showDelectModal}
        onOk={this.onOk}
        onCancel={this.props.handleCancel}
      >
        <p>你是否要删除编号为{this.props.ContractList.contractNo}的合同？</p>
      </Modal>
    )
  }
}

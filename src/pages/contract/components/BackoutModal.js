import React, { Component } from 'react'
import { Modal, Input, message } from 'antd'
import API from '../../../utils/axios'

export default class BackoutModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disable: false
    }
  }
  onOk = async () => {
    console.log('this.props', this.props)

    if (!this.props.ContractList.repealMemo) {
      message.warning('请填写原因')
      return false
    }
    await this.setState({
      disable: true
    })
    this.props.isLoadingUp(true)
    const { status } = await API.post('/biz/sales/contract/repealContract', {
      contractId: this.props.contractId,
      repealMemo: this.props.ContractList.repealMemo
    })
    if (!status) {
      this.props.isLoadingUp(false)
      return false
    }
    await message.success('您的操作已成功！')
    this.props.showBackoutModalUp(false)
    this.props.repealMemoUp('')
    this.props.getContractList()
    this.props.isLoadingUp(false)
  }
  onCancel = () => {
    this.props.handleCancel()
    this.props.repealMemoUp('')
  }
  render() {
    return (
      <Modal
        title="确认操作"
        visible={this.props.ContractList.showBackoutModal}
        onOk={this.onOk}
        onCancel={this.onCancel}
        okButtonProps={{ disabled: this.state.disable }}
      >
        <p>你是否要撤销编号为{this.props.ContractList.contractNo}的合同？</p>

        <Input
          style={{ width: 350, marginTop: 20 }}
          value={this.props.ContractList.repealMemo}
          placeholder="撤销原因"
          onChange={e => this.props.repealMemoUp(e.target.value)}
        />
      </Modal>
    )
  }
}

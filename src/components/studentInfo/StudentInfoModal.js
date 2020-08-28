import React, { Component } from 'react'
import { Modal } from 'antd'
import { host } from './../../utils/axios'

export default class Detail extends Component {
  state = {
    visible: false
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  render() {
    let { visible = false } = this.state
    let { /*data = {},*/ name, id } = this.props
    return (
      <>
        <a onClick={this.showModal} style={{ paddingRight: 6 }}>
          {name}
        </a>
        {visible && (
          <Modal
            centered
            title="学员详情"
            className="studentInfoModal"
            width={1280}
            style={{ height: 'calc(100vh - 40px)' }}
            visible={visible}
            onCancel={this.handleCancel}
            footer={null}
          >
            <iframe
              style={{ width: '100%', height: 'calc(100vh - 140px)' }}
              title={'学员详情'}
              src={`//${host()}/crm/studtenInfo?clientId=${id}`}
            />
          </Modal>
        )}
      </>
    )
  }
}

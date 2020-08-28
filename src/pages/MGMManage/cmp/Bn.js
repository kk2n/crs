import { Button, Modal } from 'antd'
import React, { Component } from 'react'

class Bn extends Component {
  state = {
    loading: false,
    dialogVisible: false
  }
  render() {
    let { dialog, children, hasLoad, onClick, ...props } = this.props
    return (
      <>
        <Button
          {...props}
          loading={hasLoad && this.state.loading}
          onClick={async () => {
            await this.setState({
              loading: true,
              dialogVisible: true
            })
            onClick && onClick()
          }}
        >
          {children}
        </Button>
        {dialog && this.state.dialogVisible && (
          <Modal
            {...dialog}
            visible={this.state.dialogVisible}
            onCancel={async () => {
              await this.setState({
                loading: false,
                dialogVisible: false
              })
              dialog.onCancel && dialog.onCancel()
            }}
          >
            {dialog.children || dialog.body}
          </Modal>
        )}
      </>
    )
  }
}

export default Bn

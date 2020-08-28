import React from 'react'
import { Modal, Button, Divider, Input, message } from 'antd'
import QRCode from 'qrcode'
import { host } from './../../../utils/axios'
export default class Qrcode extends React.Component {
  state = { visible: false, QrUrl: '', reqUrl: '' }
  getQrUrl = async () => {
    let reqUrl = `http://${host('ymxb')}/#/ksbOrderInfoNew?id=${this.props.data.orderId}&more=1`
    QRCode.toDataURL(reqUrl, (err, url) => {
      if (err) throw url
      this.setState({ QrUrl: url, reqUrl: reqUrl })
    })
  }
  showModal = () => {
    this.getQrUrl()
    this.setState({
      visible: true
    })
  }
  handleOk = (/*e*/) => {
    this.setState({ visible: false })
  }
  handleCancel = (/*e*/) => {
    this.setState({ visible: false })
  }

  render() {
    let { QrUrl, reqUrl } = this.state
    return (
      <>
        <Divider type="vertical" />
        <a onClick={this.showModal}>快捷支付</a>
        <Modal title="快速支付" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Input
              id="detail"
              value={reqUrl}
              addonAfter={
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    document.getElementById('detail').select()
                    if (document.execCommand('Copy')) {
                      message.success('复制成功', 5)
                    } else {
                      message.error('复制失败', 5)
                    }
                  }}
                >
                  复制
                </span>
              }
            />
            <img width="190" height="175" id="img" src={QrUrl} alt={'二维码'} />
            <p style={{ marginTop: '30px' }}>
              <a href={QrUrl} download="">
                <Button type="primary" ghost>
                  下载二维码
                </Button>
              </a>
            </p>
          </div>
        </Modal>
      </>
    )
  }
}

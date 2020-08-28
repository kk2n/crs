import React, { Component } from 'react'
import { Modal, Form, message, Button } from 'antd'
import { connect } from '../addMGMModel'
import { Select as UrlSel } from 'ymcmp'
import API from '../../../utils/axios'
import bosUpFile from '../../../utils/BosUpFile'
import UploadImage from './UploadImage'
import './css.scss'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

@connect
@Form.create({
  name: 'ADDMGM_form'
})
class Add extends Component {
  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, value) => {
      if (err) return false
      const params = {
        inviteClientId: value.inviteUserId.key,
        invitedClientId: value.invitedUserId.key,
        relationName: value.relationName.label,
        imgUrls: value.imgUrl
      }
      this.props.loadingUp(true)
      let { status } = await API.post('/biz/sales/mgm/invite/add', params)
      if (!status) {
        this.props.loadingUp(false)
        return false
      }
      this.props.loadingUp(false)
      await message.success('MGM邀请创建成功！')
      this.props.addModalUp(false)
      this.props.refresh()
    })
  }

  componentDidMount() {
    this.props.imageUrlArrClear()
  }

  render() {
    let { getFieldDecorator } = this.props.form
    return (
      <Modal
        footer={false}
        width={1000}
        title={'新建MGM'}
        visible={this.props.MGMManage.addModal}
        onCancel={() => this.props.addModalUp(false)}
      >
        <Form {...formItemLayout} onSubmit={this.onSubmit}>
          <Form.Item label="邀请人：">
            {getFieldDecorator('inviteUserId', {
              rules: [{ required: true, message: '请选择' }]
            })(
              <UrlSel
                debounceTime={800}
                API={API}
                placeholder="请输入姓名/手机"
                noMultiple
                params={{ keyword: this.props.AddMGM.inviteUserTel, userType: 1 }}
                url="/biz/sales/mgm/invite/user/list"
                onSearch={val => this.props.inviteUserTelUp(val)}
              />
            )}
          </Form.Item>
          <Form.Item label="被邀请人：">
            {getFieldDecorator('invitedUserId', {
              rules: [{ required: true, message: '请选择' }]
            })(
              <UrlSel
                debounceTime={800}
                API={API}
                placeholder="请输入姓名/手机"
                noMultiple
                params={{ keyword: this.props.AddMGM.invitedUserTel, userType: 2 }}
                url="/biz/sales/mgm/invite/user/list"
                onSearch={val => this.props.invitedUserTelUp(val)}
              />
            )}
          </Form.Item>
          <Form.Item label="邀请关系：">
            {getFieldDecorator('relationName', {
              rules: [{ required: true, message: '请选择' }]
            })(
              <UrlSel
                API={API}
                placeholder="请选择"
                noMultiple
                params={{ inviteKey: this.props.AddMGM.inviteUserTel }}
                url="/biz/sales/mgm/invite/relation/list"
              />
            )}
          </Form.Item>
          <Form.Item label="上传凭证：">
            {getFieldDecorator('imgUrl', {
              rules: [{ required: true, message: '请上传' }]
            })(
              <>
                {this.props.AddMGM.imageUrlArr.length < 5 && (
                  <UploadImage
                    imageUrl={this.props.AddMGM.imageFrontUrl}
                    onChange={() => {}}
                    loading={this.props.AddMGM.frontLoading}
                    beforeUpload={() => this.props.frontLoadingUp(true)}
                    customRequest={action =>
                      bosUpFile({ action, fileTypeEnum: 'ORDERSERVICE', clientId: this.props.clientId })
                    }
                    onSuccess={async data => {
                      console.log('data', data)
                      message.success('图片上传成功')
                      await this.props.imageUrlArrUp(data.url)
                      this.props.form.setFieldsValue({
                        imgUrl: this.props.AddMGM.imageUrlArr
                      })
                      this.props.frontLoadingUp(false)
                    }}
                    onError={msg => {
                      message.error(`上传失败!`)
                      console.log('msg', msg)
                      this.props.frontLoadingUp(false)
                    }}
                  />
                )}
                <div style={{ display: 'flex' }}>
                  {this.props.AddMGM.imageUrlArr.map((imageUrl, aa) => (
                    <div key={aa}>
                      <Button
                        onClick={() => {
                          this.props.delUpImg(aa)
                        }}
                      >
                        ×
                      </Button>
                      <br />
                      <div
                        style={{ border: '1px solid #d9d9d9', minHeight: 112, minWidth: 112, margin: 4, marginLeft: 0 }}
                      >
                        <img src={imageUrl} style={{ maxWidth: 104, maxHeight: 104, margin: 4 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ clear: 'both' }}>支持文件格式：PNG/JPG，文件大小不超过1M，最多可上传5个文件</div>
              </>
            )}
          </Form.Item>
          <div style={{ textAlign: 'center' }}>
            <Button htmlType={'submit'} type="primary" loading={this.props.AddMGM.loading} style={{ marginRight: 10 }}>
              确定
            </Button>
            <Button onClick={() => this.props.addModalUp(false)}>取消</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}

export default Add

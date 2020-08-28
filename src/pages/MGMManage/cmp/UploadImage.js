import React from 'react'
import { message, Upload, Icon } from 'antd'

export default class UploadImage extends React.Component {
  render() {
    const imageUrl = this.props.imageUrl || ''
    const loading = this.props.loading || false
    const fileLists = this.props.fileList || []
    const uploadProps = {
      accept: '.png, .jpg, .jpeg',
      name: 'uploadImage',
      listType: 'picture-card',
      className: 'uploadImage',
      showUploadList: false,
      fileList: fileLists,
      // onChange: info => {
      //   let fileList = [...info.fileList]
      //   fileList = fileList.slice(-1)
      //   fileList = fileList.map(file => {
      //     if (file.response) {
      //       file.url = file.response.url
      //     }
      //     return file
      //   })
      //   // this.props.onChange(fileList)
      // },
      beforeUpload: file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        if (!isJpgOrPng) {
          message.error('只支持jpg、jpeg、png格式的图片')
          return false
        }
        const isLt1M = file.size / 1024 / 1024 <= 1
        if (!isLt1M) {
          message.error('图片大小不得超过1MB!')
          return false
        }
        message.loading('图片上传中...')
        this.props.beforeUpload(file)
      },
      customRequest: action => {
        this.props.customRequest(action)
      },
      onSuccess: data => {
        this.props.onSuccess(data)
      },
      onError: msg => {
        console.log('错误啦===', msg)
        this.props.onError(msg)
      }
    }
    return (
      <Upload {...uploadProps}>
        {imageUrl ? (
          <img src={imageUrl} style={{ width: '100%' }} alt="" />
        ) : (
          <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">{loading ? '上传中' : '上传'}</div>
          </div>
        )}
      </Upload>
    )
  }
}

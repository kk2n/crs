import React, { PureComponent } from 'react'
import { message } from 'antd'
import config from './UEditConfig'
import { fileToOss } from './../../utils/oss'
import { delay, noop } from 'underscore'

class Editor extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { id, value = '' } = this.props
    this.initEditor(id, value)
  }

  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    window.UE.delEditor(this.props.id)
  }
  componentWillReceiveProps(nextProps) {
    //更新
    if (nextProps.value !== '' && this.props.value !== nextProps.value) {
      this.ue.ready(async () => {
        //异步处理
        await delay(noop, 100)
        this.ue.setContent(nextProps.value)
        this.ue.focus(true) //光标在尾部
      })
    }
    //清空
    if (this.props.value !== '' && nextProps.value === '') {
      this.ue.ready(() => {
        this.ue.setContent(nextProps.value)
      })
    }
  }

  initEditor(id, value) {
    let valChange = this.props.onChange || noop
    let ueEditor = window.UE.getEditor(this.props.id, {
      imageMaxSize: 1,
      initialFrameWidth: this.props.width,
      initialFrameHeight: this.props.height,
      readonly: this.props.readonly,
      ...config
    })
    this.ue = ueEditor

    ueEditor.ready(ue => {
      if (!ue) {
        window.UE.delEditor(id)
        this.initEditor()
      }
      //设置内容
      ueEditor.setContent(value)
      //监控内容变化
      ueEditor.addListener('contentChange', () => {
        valChange(ueEditor.getContent())
      })
      //图片上传
      ueEditor.commands['macros'] = {
        execCommand: () => this.fileInput.click()
      }
    })

    // 监听文件上传事件
    this.fileInput.addEventListener('change', async e => {
      let fileList = e.target.files
      let file = fileList[0]
      if (!file) return
      console.log(this.fileInput.value, 777)
      this.fileInput.value = ''
      if (file.size > 2 * 1024 * 1024) {
        message.error('单张图片大小不能超过2M，请重新上传')
        return
      }
      try {
        let res = await fileToOss({ file, filePath: 'course' })
        ueEditor.execCommand(
          'insertHtml',
          `<center><img style='max-width:100%;vertical-align:middle' src='${res[0]}'/></center>`
        )
      } catch (err) {
        message.error(err.message || '文件上传失败')
      }
      e.target.value = ''
    })
  }

  render() {
    return (
      <div>
        <input
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          ref={input => (this.fileInput = input)}
          accept="image/png, image/gif, image/jpeg, image/x-icon"
        />
        <div id={this.props.id} name="content" type="text/plain" />
        <div style={{ fontSize: '12px', marginTop: '10px', color: '#F32727' }}>
          建议图片宽度900-1200px，JPG、PNG格式，单张图片大小不超过2M
        </div>
      </div>
    )
  }
}

export default Editor

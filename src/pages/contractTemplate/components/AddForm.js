import React, { Component } from 'react'
import { Button, Form, Input, message } from 'antd'
import API from '../../../utils/axios'
import { Select } from 'ymcmp'
import ReactQuill from '../../../components/Quill'
let formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}

@Form.create()
class AddForm extends Component {
  componentDidMount() {
    if (this.props.m.selId) {
      this.props.form.setFieldsValue({
        name: this.props.m.getInfoRes?.data?.name,
        text: this.props.m.getInfoRes?.data?.content,
        type: { key: this.props.m.getInfoRes?.data?.type, label: this.props.m.getInfoRes?.data?.typeDesc }
      })
    }
  }

  quill = null
  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) return false
      let params = {
        id: (this.props.isEdit && this.props.m.selId) || undefined, //只有编辑有
        name: values.name,
        content: values.text,
        assignEnterpriseCode: this.props.assignEnterpriseCode,
        type: values.type?.key
      }
      this.setState({ isLoad: true })
      let { status } = await API.post(
        this.props.isEdit
          ? '/orderservice/contract/protocoltemplates/update'
          : '/orderservice/contract/protocoltemplates/add',
        params
      )
      if (!status) {
        this.setState({ isLoad: false })
        return false
      }
      await message.success('操作成功！')
      this.setState({ isLoad: false })
      this.props.onCancel()
      //刷新列表
      this.props.m.search()
    })
  }
  state = {
    isLoad: false,
    isPreview: false,
    val: '',
    previewContent: ''
  }
  tags = [
    {
      color: '#3bbd15',
      title: '客户资料',
      mark: '$Customer',
      template: '<p>学生姓名：</p><p>用户注册名：</p><p>家长姓名：</p><p>家长联系方式：</p>'
    },
    {
      color: '#259ebd',
      title: '合同资料',
      mark: '$contract',
      template: `<table class="preview-table">
    <tr><td>合同号</td><td>购买课时</td><td>课时单价</td><td>课时总价</td><td>有效期开始日期</td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>赠送课时</td><td>优惠金额</td><td>加价购</td><td>合同应付金额</td><td>有效期结束日期</td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
  </table>`
    },
    {
      color: '#1f52bd',
      title: '赠品',
      mark: '$giftInfo',
      template: `<table class="preview-table">
    <tr><td>编号</td><td>赠品名称</td><td>价值</td></tr>
    <tr><td></td><td></td><td></td></tr>
  </table>`
    },
    {
      color: '#7a28bd',
      title: '重点条款',
      mark: '$$',
      template: '<input class="preview-checkbox js-important" type="checkbox"/>'
    }
  ]
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...formItemLayout} onSubmit={this.onSubmit}>
        <Form.Item label="模板名称">
          {getFieldDecorator('name', { rules: [{ required: true, message: '请填写' }] })(
            <Input style={{ width: 280 }} maxLength={30} />
          )}
        </Form.Item>
        <Form.Item label="模板类型">
          {getFieldDecorator('type', { rules: [{ required: true, message: '请选择' }] })(
            <Select
              API={API}
              url="/orderservice/contract/protocoltemplates/type/list"
              noMultiple
              style={{ width: 280 }}
            />
          )}
        </Form.Item>
        <Form.Item label="模板内容">
          <div>
            {/* 注意：这里不能使用Tag，而是使用Button。使用Tag会导致getSelection无法获取位置 */}
            {this.tags.map(a => (
              <Button
                key={a.title}
                size={'small'}
                style={{
                  marginRight: 6,
                  color: a.color,
                  border: `1px solid ${a.color}`
                }}
                onClick={() => {
                  if (this.state.isPreview) return false
                  let index = this.quill?.getSelection()?.index || 0
                  this.quill.insertText(index, a.mark)
                }}
              >{`${a.title} ${a.mark}`}</Button>
            ))}
          </div>
          <div className="tips_kk">
            <p>在下方编辑器内编辑时，点击上面的标签可插入相应资料</p>
            <p>举例：点击重点条款，在$$后输入条款内容</p>
          </div>
          {getFieldDecorator('text', { rules: [{ required: true, message: '请填写' }] })(
            <div style={{ display: !this.state.isPreview ? 'block' : 'none' }}>
              <ReactQuill
                style={{ height: 260 }}
                defaultValue={this.props.m.getInfoRes?.data?.content}
                getQuill={quill => (this.quill = quill)}
                onChange={value => this.props.form.setFieldsValue({ text: value })}
              />
            </div>
          )}
          {this.state.isPreview && (
            <div className="c-contract-preview" dangerouslySetInnerHTML={{ __html: this.state.previewContent }} />
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 10, offset: 8 }}>
          <Button
            onClick={() => {
              this.props.m.clear()
              this.props.onCancel()
            }}
            style={{ marginRight: 20 }}
          >
            取消
          </Button>
          <Button
            type="primary"
            style={{ marginRight: 20 }}
            onClick={() => {
              let txt = this.props.form.getFieldValue('text') || ''
              let marksReg = new RegExp(this.tags.map(tag => tag.mark.replace(/\$/g, '\\$')).join('|'), 'g')
              let markTemplateMap = this.tags.reduce((prev, tag) => ({ ...prev, [tag.mark]: tag.template }), {})
              let replaceMark = text => text.replace(marksReg, item => markTemplateMap[item])
              let previewContent = replaceMark(txt)
              this.setState({ previewContent, isPreview: !this.state.isPreview })
            }}
          >
            {!this.state.isPreview ? '预览' : '返回'}
          </Button>
          <Button type="primary" htmlType="submit" loading={this.state.isLoad}>
            确定
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default AddForm

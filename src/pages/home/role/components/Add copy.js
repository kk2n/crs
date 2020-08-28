import { Modal, Form, Input } from 'antd'
import React from 'react'
import './search.scss'
function JdSearch(props) {
  const getFromItem = [
    {
      title: '部门编号：',
      name: 'departmentCode',
      decorator: { rules: [{ required: true, message: '请填写部门编号' }] },
      component: <Input style={{ width: 280 }} maxLength={15} />
    },
    {
      title: '部门名称：',
      name: 'departmentName',
      decorator: { rules: [{ required: true, message: '请填写部门名称' }] },
      component: <Input style={{ width: 280 }} maxLength={13} />
    }
  ]
  return (
    <Modal
      title="新建"
      visible={props.addShow}
      onOk={() => {}}
      onCancel={() => {
        this.setState({
          addShow: false
        })
      }}
    >
      {/*<Form.Item {...formItemLayout} label="Name">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name'
                }
              ]
            })(<Input placeholder="Please input your name" />)}
          </Form.Item>*/}
      <Form onSubmit={() => {}}>
        {/*this.getFromItem(this.state.editObj).map((item, index) => {
              return (
                <FormItem {...formItemLayout} label={item.title} key={index} className={item.wrapClass}>
                  <div className={item.className}>{item.other}</div>
                </FormItem>
              )
            })*/}
        {getFromItem.map(a => {
          return (
            <Form.Item key={a.key} {...a.formItemLayout} label={a.label} style={a.style}>
              {/*props.form.getFieldDecorator(a.key, { ...a.getFieldDecorator })(a.component)*/}
            </Form.Item>
          )
        })}
      </Form>
    </Modal>
  )
}

export default JdSearch

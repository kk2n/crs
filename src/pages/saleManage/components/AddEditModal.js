import React, { Component } from 'react'
import { Button, Modal, Form, Input, Select, message, Checkbox } from 'antd'
import { connect as addEditModal } from './AddEditModalModel'

import './AddEditModal.scss'
const { Option } = Select
const error = Modal.error
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
@addEditModal
@Form.create({
  async onValuesChange(props, fields) {
    let key = Object.keys(fields)[0]
    if (key !== 'gradeList' || key !== 'subjectlist') return
    let { selUserId } = this.props.SaleManage
    selUserId
      ? await props.editInfoUp({
          ...props.AddEditModal.editInfo,
          [key]: fields[key]
        })
      : await props.newInfoUp({
          ...props.AddEditModal.newInfo,
          [key]: fields[key]
        })
  },
  mapPropsToFields() {
    // return {
    //   artName: Form.createFormField({
    //     ...props.modalFormParams.artName,
    //     value: props.modalFormParams.artName.value,
    //   }),
  }
})
class AddEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gradeChecked: false, //年级checkbox全选绑定值
      subjectChecked: false, //年级checkbox全选绑定值
      isSuccess: false //新建/编辑账号是否成功
    }
  }
  componentDidMount = async () => {
    this.initialPage()
  }
  // 初始化，请求数据
  initialPage = async () => {
    // 初始化:获取年级、科目、角色、职级
    await this.props.getGradeList()
    await this.props.getSubjectList()
    await this.props.getRoleList()
    await this.props.getLevelList()
    // 判断新增还是编辑selUserId
    if (!this.props.SaleManage.selUserId) return
    //编辑账号
    await this.props.getUserInfoById({
      userId: this.props.SaleManage.selUserId
    })
    let { gradeList, subjectList, editInfo } = this.props.AddEditModal
    // 如果编辑详情中已选的年级等于全年级的长度，证明全选
    if (gradeList.length === editInfo.gradeList.length) this.setState({ gradeChecked: true })
    if (subjectList.length === editInfo.subjectlist.length) this.setState({ subjectChecked: true })
  }
  // 提交表单信息
  submitForm = () => {
    this.props.form.validateFields(async (err, vals) => {
      if (err) {
        error({
          title: '必填项内容未填写或未选择',
          okText: '确定'
        })
        //console.log('错误：', err, vals)
        return
      }
      let subjectList = vals.subjectlist
      !this.props.SaleManage.selUserId
        ? this.props.newInfoUp({ ...vals, subjectlist: subjectList })
        : this.props.editInfoUp({ ...vals, subjectlist: subjectList })
      //vals里面获取的值是subjectlist，要提交的字段是subjectList
      delete vals.subjectlist
      let parmas = {
        ...vals,
        subjectList,
        userId: this.props.SaleManage.selUserId,
        orgId: this.props.SaleManage.selOrgId
      }
      if (!this.props.SaleManage.selUserId) {
        //新建合同不需要userId
        delete parmas.userId
      }
      await this.props.addOrUpdateUser(parmas)
      this.setState({
        isSuccess: true
      })
      let { status, msg } = this.props.AddEditModal.addOrUpdateUserRes
      if (!status) {
        error({
          title: `${this.props.SaleManage.selUserId ? '编辑' : '新建'}错误:${msg}`,
          okText: '确定',
          onOk: () => {
            this.setState({
              isSuccess: false
            })
          }
        })
        return
      }
      message.success(`${this.props.SaleManage.selUserId ? '编辑' : '新建'}成功`, 3, () => {
        this.props.isShowModalUp(false)
        this.props.form.resetFields()
        this.props.selUserIdUp('')
        this.props.newInfoUp({})
        this.props.editInfoUp({})
        this.props.getList()
      })
    })
  }
  // 年级、科目全选、取消全选
  allChecked = (e, type) => {
    let { selUserId } = this.props.SaleManage
    let { subjectList, gradeList } = this.props.AddEditModal
    let allList = (type === 'grade' ? gradeList : subjectList).map(item => item.value)
    let checked = type === 'grade' ? 'gradeChecked' : 'subjectChecked'
    let list = type === 'grade' ? 'gradeList' : 'subjectlist'
    this.setState({
      [checked]: e.target.checked
    })
    //true 全选 false 取消全选
    let values = this.props.form.getFieldsValue()
    selUserId
      ? this.props.editInfoUp({
          ...values,
          [list]: e.target.checked ? allList : []
        })
      : this.props.newInfoUp({
          ...values,
          [list]: e.target.checked ? allList : []
        })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let { isShowModal, selUserId } = this.props.SaleManage
    let { newInfo, editInfo } = this.props.AddEditModal
    let { gradeChecked, subjectChecked, isSuccess } = this.state
    const formItems = [
      {
        name: 'userName',
        label: '账号',
        component: <Input placeholder="请输入账号" disabled={Boolean(selUserId)} />,
        decorator: {
          rules: [
            { required: true, message: '请输入账号' },
            {
              pattern: new RegExp(/^[0-9A-Za-z]{6,18}$/, 'g'),
              //pattern: new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/, 'g'),
              message: '请输入6-18位字符，字母+数字'
            }
          ],
          initialValue: !selUserId ? newInfo.userName : editInfo.userName
        }
      },
      {
        name: 'password',
        label: '密码',
        component: <Input.Password placeholder={selUserId ? '重置密码,不填默认无修改' : '请输入密码'} />,
        decorator: {
          rules: [
            { required: !selUserId, message: '请输入密码' },
            {
              pattern: new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/, 'g'),
              //pattern: new RegExp(/^[0-9A-Za-z]{6,18}$/, 'g'),
              message: '请输入6-18位字符，字母或数字'
            }
          ],
          initialValue: !selUserId ? newInfo.password : ''
        }
      },
      {
        name: 'realName',
        label: '姓名',
        component: <Input placeholder="请输入姓名" />,
        decorator: {
          rules: [{ required: true, message: '请输入姓名' }],
          initialValue: !selUserId ? newInfo.realName : editInfo.realName
        }
      },
      {
        name: 'mobile',
        label: '手机',
        component: <Input placeholder="请输入手机" />,
        decorator: {
          rules: [
            { required: true, message: '请输入手机号' },
            { pattern: new RegExp(/^1(\d){10}$/, 'g'), message: '请输入正确格式的手机号码' }
          ],
          initialValue: !selUserId ? newInfo.mobile : editInfo.mobile
        }
      },
      {
        name: 'email',
        label: '邮箱',
        component: <Input placeholder="请输入邮箱" />,
        decorator: {
          rules: [
            { required: true, message: '请输入邮箱' },
            {
              pattern: new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'g'),
              message: '请输入正确格式的邮箱'
            }
          ],
          initialValue: !selUserId ? newInfo.email : editInfo.email
        }
      },
      {
        name: 'gradeList',
        label: '年级',
        other: (
          <Checkbox checked={gradeChecked} onChange={e => this.allChecked(e, 'grade')}>
            {gradeChecked ? '取消全选' : '全选'}
          </Checkbox>
        ),
        component: (
          <Select
            mode="multiple"
            style={{ width: gradeChecked ? '75%' : '80%' }}
            placeholder="请选择"
            optionFilterProp="children"
            onChange={val => {
              if (gradeChecked) {
                //全选
                this.setState({
                  gradeChecked: false
                })
                return
              }
              //取消全选
              if (val.length === this.props.AddEditModal.gradeList.length) this.setState({ gradeChecked: true })
            }}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {(this.props.AddEditModal.gradeList || []).map(item => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              )
            })}
          </Select>
        ),
        decorator: {
          rules: [{ required: true, message: '请选择年级' }],
          initialValue: !selUserId ? newInfo.gradeList : editInfo.gradeList
        }
      },
      {
        name: 'subjectlist',
        label: '科目',
        other: (
          <Checkbox checked={subjectChecked} onChange={e => this.allChecked(e, 'subect')}>
            {subjectChecked ? '取消全选' : '全选'}
          </Checkbox>
        ),
        component: (
          <Select
            mode="multiple"
            style={{ width: subjectChecked ? '75%' : '80%' }}
            placeholder="请选择"
            optionFilterProp="children"
            onChange={val => {
              if (subjectChecked) {
                //全选
                this.setState({
                  subjectChecked: false
                })
                return
              }
              //取消全选
              if (val.length === this.props.AddEditModal.subjectList.length) this.setState({ subjectChecked: true })
            }}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {(this.props.AddEditModal.subjectList || []).map(item => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              )
            })}
          </Select>
        ),
        decorator: {
          rules: [{ required: true, message: '请选择科目' }],
          initialValue: !selUserId ? newInfo.subjectlist : editInfo.subjectlist
        }
      },
      {
        name: 'roleId',
        label: '角色',
        component: (
          <Select
            style={{ width: '100%' }}
            placeholder="请选择"
            optionFilterProp="children"
            onChange={this.onChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {((this.props.AddEditModal.getRoleListRes || {}).data || []).map(item => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              )
            })}
          </Select>
        ),
        decorator: {
          rules: [{ required: true, message: '请选择角色' }],
          initialValue: !selUserId ? newInfo.roleId : editInfo.roleId
        }
      },
      {
        name: 'salesLevel',
        label: '职级',
        component: (
          <Select
            style={{ width: '100%' }}
            placeholder="请选择"
            optionFilterProp="children"
            onChange={this.onChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {((this.props.AddEditModal.getLevelListRes || {}).data || []).map(item => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              )
            })}
          </Select>
        ),
        decorator: {
          rules: [{ required: true, message: '请选择职级' }],
          initialValue: !selUserId ? newInfo.salesLevel : editInfo.salesLevel
        }
      }
    ]
    return (
      <Modal
        title={`${selUserId ? '编辑' : '新建'}CC账号`}
        width={600}
        maskClosable={false}
        className="addEditModal"
        visible={isShowModal}
        onCancel={() => {
          this.props.isShowModalUp(false)
          this.props.selUserIdUp('')
          this.props.newInfoUp({})
          this.props.editInfoUp({})
          this.props.form.resetFields()
          this.setState({
            isSuccess: false
          })
          this.props.getList()
        }}
        footer={null}
      >
        <Form className="formWrap">
          {formItems.map(item => (
            <Form.Item label={item.label} key={item.name} {...formItemLayout}>
              {getFieldDecorator(item.name, item.decorator)(item.component)}
              {item.other}
            </Form.Item>
          ))}
        </Form>
        <div className="btn">
          <Button type="primary" onClick={this.submitForm} disabled={isSuccess}>
            确定
          </Button>
        </div>
      </Modal>
    )
  }
}
export default AddEditModal

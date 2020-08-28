import React, { Component } from 'react'
import { Button, Form, message, Modal, Steps, Select, Input } from 'antd'
import SearchSel from '../../../components/SearchSel'
import API from '../../../utils/axios'
import { some } from 'underscore'

const { TextArea } = Input
const { Option } = Select
const { Step } = Steps
const formItemLayout1 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}
const formItemLayout2 = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
@Form.create()
export default class FenPeiCR extends Component {
  state = {
    crList: [],
    step: 0,
    studentInfo: {},
    networkList: [],
    studyKeeperList: [],
    teachers: [],
    duijieObj: {}
  }
  async componentDidMount() {
    const { data } = await API.get('/biz/sales/contract/getPreOrderListByContractId', {
      contractId: this.props.ContractList.contractId
    })
    let { data: duijieObj, status } = await API.get('/biz/sales/detail/connection', { leadsId: this.props.clientFid })
    if (!status) return false
    const { data: data1 } = await API.get('/biz/sales/contract/freeLessonNetworkList')
    const { data: data2 } = await API.get('/biz/sales/contract/studyKeeperList')
    const teachers = []
    for (let i = 0; i < data.preOrders.length; i++) {
      const { data: teacher } = await API.get('/biz/sales/contract/getAllocationTeacher', {
        subjectId: data.preOrders[i].subjectId,
        gradeId: data.gradeFId,
        studentId: data.studentId
      })
      teachers.push(teacher)
    }
    console.log('', duijieObj)
    await this.setState({
      duijieObj,
      studentInfo: data,
      networkList: data1,
      studyKeeperList: data2,
      teachers
    })
  }
  //表单提交
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) return false
      this.props.isLoadingUp(true)
      //分配CR
      let { userId, ...oValues } = values
      if (userId) {
        let { status } = await API.post('/biz/sales/contract/distributeCr', {
          crId: userId?.key,
          crName: userId?.label,
          clientId: this.props.ContractList.clientFid
        })
        if (!status) {
          this.props.isLoadingUp(false)
          return false
        }
      }
      let _arr = []
      for (let i = 0; i < this.state.studentInfo.preOrders.length; i++) {
        _arr[i] = this.state.studentInfo.preOrders[i].orderId + '^' + oValues[`teacher${i}`]
      }
      oValues.contractPreOrder = _arr
      let { status: ok } = await API.post('/biz/sales/contract/orderAllocationTeacherByConFid', {
        ...oValues,
        contractId: this.props.ContractList.contractId,
        chargeId: this.state.studentInfo.chargeFid,
        clientFid: this.props.ContractList.clientFid,
        clientName: this.props.ContractList.clientName
      })
      if (!ok) {
        this.props.isLoadingUp(false)
        return false
      }
      await message.success('您的操作已成功！')
      await this.props.isLoadingUp(false)
      this.props.isFenPeiCRUp(false)
      this.props.getContractList()
    })
  }
  stepUp = step => {
    this.setState({ step })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    console.log('', this.state.duijieObj)
    let x = [
      {
        text: '试听网络情况',
        className: 'net',
        key: 'freeLessonNetwork',
        initialValue: this.state.duijieObj?.freeLessonNetwork,
        rules: [
          {
            required: true,
            message: '请选择内容'
          }
        ],
        component: (
          <Select placeholder={'请选择'}>
            {this.state.networkList.map(v => (
              <Option key={v.freeLessonNetworkId} value={v.freeLessonNetworkDesc}>
                {v.freeLessonNetworkDesc}
              </Option>
            ))}
          </Select>
        )
      },
      {
        text: '上课设备',
        className: 'class',
        key: 'lessonDevice',
        initialValue: this.state.duijieObj?.lessonDevice,
        rules: [
          {
            required: true,
            message: '请填写内容'
          }
        ],
        component: <Input />
      },
      {
        text: '学习管理人',
        className: 'admin',
        key: 'studyKeeper',
        initialValue: this.state.duijieObj?.studyKeeper,
        rules: [
          {
            required: true,
            message: '请选择内容'
          }
        ],
        component: (
          <Select placeholder={'请选择'}>
            {this.state.studyKeeperList.map(v => (
              <Option key={v.studyKeeperId} value={v.studyKeeperDesc}>
                {v.studyKeeperDesc}
              </Option>
            ))}
          </Select>
        )
      },
      {
        text: '学科状况',
        className: '',
        key: 'subjectSituation',
        initialValue: this.state.duijieObj?.subjectSituation,
        rules: [
          {
            required: true,
            message: '请填写内容'
          }
        ],
        component: <TextArea placeholder="200字以内" rows={3} maxLength={200} />
      },
      {
        text: '辅导经历',
        className: '',
        key: 'guidanceExperence',
        initialValue: this.state.duijieObj?.guidanceExperence,
        rules: [
          {
            required: true,
            message: '请填写内容'
          }
        ],
        component: <TextArea placeholder="200字以内， 辅导经历及效果" rows={3} maxLength={200} />
      },
      {
        text: '可排时间',
        className: '',
        key: 'arrangeTime',
        initialValue: this.state.duijieObj?.arrangeTime,
        rules: [
          {
            required: true,
            message: '请填写内容'
          }
        ],
        component: <TextArea placeholder="200字以内， 可排课时间及上课频率" rows={3} maxLength={200} />
      },
      {
        text: '学员性格',
        className: '',
        key: 'studentCharacter',
        initialValue: this.state.duijieObj?.studentCharacter,
        rules: [
          {
            required: true,
            message: '请填写内容'
          }
        ],
        component: <TextArea placeholder="200字以内，内向外向，主动被动，爱好" rows={3} maxLength={200} />
      },
      {
        text: '补习目标',
        className: '',
        key: 'guidanceTarget',
        initialValue: this.state.duijieObj?.guidanceTarget,
        rules: [
          {
            required: true,
            message: '请填写内容'
          }
        ],
        component: <TextArea placeholder="200字以内，学员当前需求" rows={3} maxLength={200} />
      },
      {
        text: '家长期望',
        className: '',
        key: 'parentExpectation',
        initialValue: this.state.duijieObj?.parentExpectation,
        rules: [
          {
            required: true,
            message: '请填写内容'
          }
        ],
        component: <TextArea placeholder="200字以内" rows={3} maxLength={200} />
      },
      {
        text: '其他交代',
        className: '',
        key: 'others',
        initialValue: this.state.duijieObj?.others,
        rules: [
          {
            required: true,
            message: '请填写内容'
          }
        ],
        component: <TextArea placeholder="200字以内" rows={3} maxLength={200} />
      }
    ]
    return (
      <Modal
        className={'teacher-modal'}
        title="分配"
        visible={this.props.ContractList.isFenPeiCR}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={null}
        centered
        width={980}
      >
        <div style={{ padding: 20 }}>
          <Steps current={this.state.step}>
            <Step title="分配" />
            <Step title="填写对接信息" />
          </Steps>
        </div>
        <Form onSubmit={this.handleSubmit} id={'fpls'}>
          <div style={{ display: this.state.step === 0 ? 'block' : 'none' }}>
            {!this.props.ContractList.hasCR && (
              <Form.Item label={'请选择CR'} {...formItemLayout2}>
                {getFieldDecorator(`userId`, {
                  rules: [
                    {
                      required: true,
                      message: '请选择'
                    }
                  ]
                })(
                  <SearchSel
                    noMultiple
                    showArrow
                    url={'/biz/sales/contract/distributeCrList'}
                    vt={'userId,realName'}
                    style={{ width: 180 }}
                    placeholder="请选择"
                  />
                )}
              </Form.Item>
            )}
            {this.state.studentInfo.preOrders &&
              this.state.studentInfo.preOrders.map((v, index) => {
                return (
                  <ul key={index} className={'teacher-ul'}>
                    <li className="left">科目: {v.subjectName}</li>
                    <li className="left">初始课时数：{v.realLessonCount}</li>
                    <li className="left">
                      <Form.Item key={index} label={'请选择老师'} {...formItemLayout2}>
                        {getFieldDecorator(`teacher${index}`, {
                          rules: [
                            {
                              required: true,
                              message: '请选择'
                            }
                          ]
                        })(
                          <Select
                            getPopupContainer={() => document.getElementById('fpls')}
                            showSearch
                            placeholder="请选择"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {this.state.teachers[index].map(a => (
                              <Option key={a.userId} value={a.userId}>
                                {a.userRealName}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </li>
                  </ul>
                )
              })}
          </div>
          {this.state.step === 0 && (
            <div style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                onClick={() => {
                  if (!this.props.ContractList.hasCR && !this.props.form.getFieldValue('userId')) {
                    message.error('请选择CR')
                    return false
                  }
                  let temp = this.state.studentInfo.preOrders.map((a, aa) => aa)
                  let valuesArr = []
                  temp.forEach(a => valuesArr.push(this.props.form.getFieldValue(`teacher${a}`)))
                  if (some(valuesArr, a => !a)) {
                    message.error('您还有科目未分配老师')
                    return false
                  }
                  this.setState({ step: 1 })
                }}
              >
                下一步
              </Button>
            </div>
          )}

          <div style={{ display: this.state.step === 1 ? 'block' : 'none' }}>
            <div style={{ marginTop: 20 }}>对接信息：</div>
            {x.map((a, aa) => {
              return (
                <Form.Item {...formItemLayout1} label={a.text} className={a.className} key={aa}>
                  {getFieldDecorator(a.key, {
                    initialValue: a.initialValue,
                    rules: a.rules
                  })(a.component)}
                </Form.Item>
              )
            })}
            <Form.Item label="" className={'noLabel'}>
              <Button style={{ marginRight: 20 }} type="primary" onClick={() => this.setState({ step: 0 })}>
                上一步
              </Button>
              <Button type="primary" htmlType="submit" loading={this.props.ContractList.isLoading}>
                提交
              </Button>
              {/*<Button style={{ marginLeft: 20 }} onClick={this.props.handleCancel}>*/}
              {/*  取消*/}
              {/*</Button>*/}
            </Form.Item>
          </div>
        </Form>
      </Modal>
    )
  }
}

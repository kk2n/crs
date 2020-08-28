import React, { Component } from 'react'
import { message, Form, Button, Input, Select } from 'antd'
const { TextArea } = Input
const { Option } = Select
import API from '../../../utils/axios'
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

export default class TeacherModal extends Component {
  state = {
    studentInfo: {},
    networkList: [],
    studyKeeperList: [],
    teachers: []
  }
  async componentDidMount() {
    console.log('', this.props)
    const { data } = await API.get('/biz/sales/contract/getPreOrderListByContractId', {
      contractId: this.props.ContractList.contractId
    })
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
    await this.setState({
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
      if (err) {
        return false
      }
      this.props.isLoadingUp(true)
      //格式化订单数据
      let _arr = []
      for (let i = 0; i < this.state.studentInfo.preOrders.length; i++) {
        _arr[i] = this.state.studentInfo.preOrders[i].orderId + '^' + values[`teacher${i}`]
      }
      values.contractPreOrder = _arr
      let { status } = await API.post('/biz/sales/contract/orderAllocationTeacherByConFid', {
        ...values,
        contractId: this.props.ContractList.contractId,
        chargeId: this.state.studentInfo.chargeFid || 0,
        clientFid: this.props.ContractList.clientFid,
        clientName: this.props.ContractList.clientName
      })
      if (!status) {
        this.props.isLoadingUp(false)
        return false
      }
      await message.success('您的操作已成功！')
      await this.props.isLoadingUp(false)
      //this.props.showTeacherModalUp(false)
      //this.props.getContractList()
      this.props.stepUp(1)
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let x = [
      {
        text: '试听网络情况',
        className: 'net',
        key: 'freeLessonNetwork',
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
      <Form onSubmit={this.handleSubmit} id={'fpls'}>
        <div style={{ marginTop: 20 }}>对接信息：</div>
        {x.map((a, aa) => {
          return (
            <Form.Item {...formItemLayout1} label={a.text} className={a.className} key={aa}>
              {getFieldDecorator(a.key, {
                rules: a.rules
              })(a.component)}
            </Form.Item>
          )
        })}
        <Form.Item label="" className={'noLabel'}>
          <Button type="primary" htmlType="submit" loading={this.props.ContractList.isLoading}>
            提交
          </Button>
          <Button style={{ marginLeft: 20 }} onClick={() => this.props.showTeacherModalUp(false)}>
            取消
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

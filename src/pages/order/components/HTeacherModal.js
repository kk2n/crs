import { Button, Form, message, Modal } from 'antd'
import React, { Component } from 'react'
import SearchSel from '../../../components/SearchSel'
import Sel from '../../../components/Sel'
import API from '../../../utils/axios'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}

@Form.create()
export default class HTeacherModal extends Component {
  state = {
    info: {},
    yxList: [
      { i: 1, v: '主动换老师' },
      { i: 2, v: '被动换老师' }
    ]
  }

  async componentDidMount() {
    //请求订单详情
    let { data: info } = await API.get('/biz/sales/order/getOrderInfoByOrderId', { contractId: this.props.orderId })
    this.setState({
      info: {
        studentId: info.studentId,
        subjectId: info.subjectId,
        gradeId: info.gradeId,
        dd: info.contractId,
        km: info.subjectName,
        xm: info.realName,
        zt: info.statusDesc,
        ls: info.teacherName,
        lsId: info.teacherId,
        ks: info.remainHours
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        this.props.isLoadingUp(false)
        return false
      }
      let param = {
        contractId: this.state.info.dd,
        newTeacherId: values.teacher.key,
        oldTeacherId: this.state.info.lsId,
        changeTeacherType: !values.yy ? 1 : 2,
        changeTeacherReason: values.yy2
      }
      this.props.isLoadingUp(true)
      let { status } = await API.post('/biz/sales/order/changeOrderTeacher', param)
      if (!status) {
        this.props.isLoadingUp(false)
        return false
      }
      await message.success('您的操作已成功！')
      await this.props.isLoadingUp(false)
      this.props.hTeacherModalShowUp(false)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    let x = [
      {
        text: '新老师',
        className: '',
        key: 'teacher',
        rules: [
          {
            required: true,
            message: '请选择新老师'
          }
        ],
        component: (
          <SearchSel
            param={{
              gradeId: this.state.info.gradeId,
              subjectId: this.state.info.subjectId,
              studentId: this.state.info.studentId
            }}
            noMultiple
            url={'/biz/sales/user/getAllocationTeacher'}
            vt={'userId,userRealName'}
          />
        )
      },
      {
        text: '换老师的原因',
        className: '',
        key: 'yy',
        rules: [
          {
            required: true,
            message: '请选择换老师的原因'
          }
        ],
        component: (
          <Sel
            data={[
              { v: 0, t: '主动换老师' },
              { v: 1, t: '被动换老师' }
            ]}
            vt={'v,t'}
            onChange={v => {
              this.setState({
                yxList: !v
                  ? [
                      {
                        v: 1,
                        t: '教学风格不匹配'
                      },
                      {
                        v: 2,
                        t: '家长主动换老师'
                      },
                      {
                        v: 3,
                        t: '教学不规范'
                      },
                      {
                        v: 7,
                        t: '家长不满意学习效果'
                      },
                      {
                        v: 8,
                        t: '家长不满意老师工作态度'
                      },
                      {
                        v: 9,
                        t: '家长不满意老师工作能力'
                      },
                      {
                        v: 10,
                        t: '家长不满意老师沟通表达'
                      },
                      {
                        v: 11,
                        t: '老师教学环境不佳'
                      },
                      {
                        v: 12,
                        t: '老师和学员风格不匹配'
                      },
                      {
                        v: 13,
                        t: '家长觉得老师性别不匹配'
                      }
                    ]
                  : [
                      {
                        v: 4,
                        t: '老师离职'
                      },
                      {
                        v: 5,
                        t: '老师转岗'
                      },
                      {
                        v: 6,
                        t: '老师休假'
                      },
                      {
                        v: 14,
                        t: '老师拒接'
                      },
                      {
                        v: 15,
                        t: '无法匹配老师上课时间'
                      },
                      {
                        v: 16,
                        t: '学生升学段'
                      }
                    ]
              })
            }}
          />
        )
      },
      {
        text: '.',
        className: 'noLabel',
        key: 'yy2',
        rules: [
          {
            required: true,
            message: '请选择'
          }
        ],
        component: <Sel data={this.state.yxList} vt={'v,t'} />
      }
    ]
    return (
      <Modal
        title={'换老师*为必填'}
        visible={this.props.OrderList.hTeacherModalShow}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={580}
        footer={null}
      >
        <div className={'hanls-css'}>
          <ul>
            <li className={'left'}>订单编号：</li>
            <li>{this.state.info.dd}</li>
          </ul>
          <ul>
            <li className={'left'}>科目：</li>
            <li>{this.state.info.km}</li>
          </ul>
          <ul>
            <li className={'left'}>剩余课时：</li>
            <li>{this.state.info.ks}</li>
          </ul>
          <ul>
            <li className={'left'}>当前老师：</li>
            <li>{this.state.info.ls}</li>
          </ul>
        </div>
        <div style={{ marginTop: 20 }}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            {x.map((a, aa) => {
              return (
                <Form.Item label={a.text} className={a.className} key={aa}>
                  {getFieldDecorator(a.key, {
                    rules: a.rules
                  })(a.component)}
                </Form.Item>
              )
            })}
            <Form.Item label="." className={'noLabel'}>
              <Button type="primary" htmlType="submit" loading={this.props.OrderList.isLoading}>
                提交
              </Button>
              <Button style={{ marginLeft: 20 }} onClick={() => this.props.hTeacherModalShowUp(false)}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
}

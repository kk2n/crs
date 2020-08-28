import React from 'react'
import { Form, Input, InputNumber, Row, Col, Button, message } from 'antd'
import API from '../../../utils/axios'
import { Select } from 'ymcmp'
import moment from 'moment'
import { initial } from 'underscore'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}
let style = { style: { borderLeft: '3px solid #1890ff', paddingLeft: 8, margin: 10, fontSize: 14 } }
function ZengSongForm({ m, ...props }) {
  const { getFieldDecorator } = props.form
  let handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) return false
      //验证订单list
      let isTrue = []
      let tai = 0
      let contractPreOrder = m.item
        .map(a => {
          tai = tai + a.number
          if (!a.subject?.key && !a.number) isTrue.push(true)
          return a.subject?.key + '^' + a.number
        })
        ?.join(',')
      if (isTrue.length) {
        message.error('订单信息未填写完整')
        return false
      }
      if (tai !== values.kss) {
        message.error('订单的初始课时数总和，需等于赠送课时数')
        return false
      }
      let params = {
        studentName: m.studentInfo?.studentName,
        clientId: m.studentInfo?.clientId,
        gradeName: m.studentInfo?.gradeName,
        gradeId: m.studentInfo?.gradeId,
        validBeginDate: m.contractEndDate.split('^')?.[0],
        validEndDate: m.contractEndDate.split('^')?.[1],
        contractPreOrder,
        presentLessonCount: values.kss,
        contractMemo: values.contractMemo,
        presentReason: values.presentReason?.key
      }
      m.isLoadingUp(true)
      //新建合同提交
      let { status } = await API.post('/biz/sales/contract/addPresentContract', params)
      if (!status) {
        m.isLoadingUp(false)
        return false
      }
      m.clear()
      props.onCancel()
    })
  }
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <div {...style}>学员信息：</div>
      <Form.Item label="请选择学员">
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请填写学员编号或手机'
            }
          ]
        })(
          <Input
            placeholder={'学员编号或手机'}
            style={{ width: 180 }}
            onBlur={async e => {
              if (!e.target.value) return false
              props.form.setFieldsValue({ kss: '' })
              let { data, status } = await API.get('/biz/sales/contract/getStudent', {
                searchContent: e.target.value
              })
              if (!status) return false
              if (!data) {
                message.error('未找到该学员！')
                props.form.setFieldsValue({ name: '' })
                return false
              }
              m.studentInfoUp(data)
              m.contractEndDateUp('')
            }}
          />
        )}
        <div>
          &nbsp;
          {m.studentInfo?.clientId && (
            <span>
              学员编号：{m.studentInfo?.clientId}&nbsp;&nbsp;&nbsp;&nbsp;姓名：{m.studentInfo?.studentName}
              &nbsp;&nbsp;&nbsp;&nbsp;年级：{m.studentInfo?.gradeName}
            </span>
          )}
        </div>
      </Form.Item>
      <div {...style}>赠送信息：</div>
      <Form.Item label="赠送课时数">
        {getFieldDecorator('kss', {
          rules: [{ required: true, message: '赠送课时数' }]
        })(
          <InputNumber
            placeholder={'0~1000的整数'}
            max={1000}
            step={1}
            min={1}
            style={{ width: 180 }}
            onBlur={async e => {
              let val = parseInt(e.target.value) || ''
              props.form.setFieldsValue({ kss: val })
              let { data, status } = await API.get('/biz/sales/contract/getContractEndDate', {
                totalLessonCount: val,
                validBeginDate: moment().format('YYYY-MM-DD'),
                contractType: 1,
                gradeFid: m.studentInfo?.gradeId,
                contractProp: 3
              })
              if (!status) return false
              m.contractEndDateUp(data)
            }}
          />
        )}
      </Form.Item>
      <Form.Item label="赠送理由">
        {getFieldDecorator('presentReason', {
          rules: [
            {
              required: true,
              message: '赠送理由'
            }
          ]
        })(
          <Select
            noMultiple
            beforeData={[
              {
                id: 'MGM邀请赠送',
                name: 'MGM邀请赠送'
              },
              {
                id: '其他客户抱怨退款',
                name: '其他客户抱怨退款'
              },
              {
                id: '开业首月赠送',
                name: '开业首月赠送'
              },
              {
                id: '开业次月赠送',
                name: '开业次月赠送'
              },
              {
                id: 'MGM赠送',
                name: 'MGM赠送'
              },
              {
                id: '抱怨退费赠送',
                name: '抱怨退费赠送'
              },
              {
                id: '其他',
                name: '其他'
              }
            ]}
            style={{ width: 180 }}
          />
        )}

        <div>
          &nbsp;
          {m.contractEndDate && (
            <span>
              合同有效期： {m.contractEndDate.split('^')?.[0]}到 {m.contractEndDate.split('^')?.[1]}
            </span>
          )}
        </div>
      </Form.Item>
      <div {...style}>订单信息：</div>
      <Form.Item label="">
        <div style={{ paddingLeft: 40 }}>
          {m.item.map((a, aa) => (
            <Row style={{ marginBottom: 20 }} key={aa}>
              <Col span={16}>
                <span style={{ color: '#f00' }}>*</span>
                {aa + 1}、订单（学科）：
                <Select
                  API={API}
                  url={'/biz/sales/dict/subject'}
                  noMultiple
                  style={{ width: 180 }}
                  value={a.subject}
                  onChange={val => m.itemUp(m.item.map((b, bb) => (bb === aa ? { ...b, subject: val } : b)))}
                />
              </Col>
              <Col span={8}>
                初始课时数：
                <InputNumber
                  min={1}
                  max={60}
                  style={{ width: 100 }}
                  value={a.number}
                  step={1}
                  placeholder="最大60"
                  onChange={val =>
                    m.itemUp(m.item.map((b, bb) => (bb === aa ? { ...b, number: parseInt(val) || '' } : b)))
                  }
                />
              </Col>
            </Row>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button
            size="small"
            type="primary"
            style={{ marginRight: 10, marginLeft: 156 }}
            onClick={() => m.itemUp([...m.item, { subject: undefined, number: undefined }])}
          >
            + 增加
          </Button>
          <Button size="small" onClick={() => m.item.length > 1 && m.itemUp(initial(m.item))}>
            - 删除
          </Button>
        </div>
      </Form.Item>
      <Form.Item label="合同备注">
        {getFieldDecorator('contractMemo', {
          // rules: [{ required: true, message: '请填写合同备注' }]
        })(
          <Input.TextArea
            style={{ width: 580, height: 120 }}
            maxLength={300}
            placeholder="家长的期望与关注点，希望安排的授课时间范围、频数和次数、cc的建议等信息（限300字）"
          />
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 6, offset: 10 }}>
        <Button
          onClick={() => {
            m.clear()
            props.onCancel()
          }}
          style={{ marginRight: 20 }}
        >
          取消
        </Button>
        <Button type="primary" htmlType="submit" loading={m.isLoading}>
          确定
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Form.create()(ZengSongForm)

import React, { Component } from 'react'
import { Form, Input, Table, Button, message, InputNumber } from 'antd'
import './AddForm.scss'
import { Select } from 'ymcmp'
import API, { assignEnterpriseCode } from '../../../utils/axios'
import { isNumber } from 'underscore'
import bosUpFile from '../../../utils/BosUpFile'
import UploadImage from '../../../components/UploadImage'
import { csGet } from 'ymcore/cookie'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 1 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 23 }
  }
}
function isInt(x) {
  return x && parseInt(x) ? parseInt(x) : ''
}
function isNum(x) {
  return x === '0' || Number(x) ? Number(x) : ''
}
@Form.create({ name: 'Add' })
class AddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoad: false,
      guizhe: [],
      frontLoading: false,
      imageFrontUrl: '',
      imageUrlArr: '',
      index: 0,
      tableData: [],
      ksbData: [],
      columns: [
        {
          title: '年级',
          dataIndex: 'name',
          key: 'name',
          width: 80
        },
        {
          title: '课时单价',
          dataIndex: 'danji',
          width: 60,
          render: (val, d) => {
            return (
              <Input
                className="table-input"
                value={isInt(val)}
                data-value={d.index}
                onChange={e => {
                  let v = e.target.value
                  let index = e.target.dataset.value
                  let tableData = this.state.tableData.map(a => {
                    if (d.id === a.id) a.danji = isInt(v)
                    return a
                  })
                  this.state.ksbData.forEach((b, bb) => (tableData[index]['zj' + (bb + 1)] = isInt(v * b)))
                  this.setState({ tableData })
                }}
              />
            )
          }
        }
      ]
    }
  }
  slCom = (myv, putIndex) => (
    <Input
      data-value={this.state.index}
      className="table-input-head"
      placeholder="填写课时包数"
      value={isInt(myv)}
      onChange={async e => {
        let value = parseInt(e.target.value)
        if (Number(value) <= 0 || Number(value) >= 1000) {
          message.error('大于0的整数，小于1000')
          return false
        }
        let ksbData = this.state.ksbData
        ksbData[putIndex - 1] = value
        await this.setState({ ksbData })
        let tableData = this.state.tableData.map(x => {
          x['zj' + putIndex] = isInt(Number(value) * x.danji)
          return x
        })
        let colum = this.state.columns
        colum[putIndex + 1]['title'] = this.slCom(this.state.ksbData[putIndex - 1], putIndex)
        this.setState({
          tableData,
          columns: colum
        })
      }}
    />
  )
  columnsAdd = async () => {
    if (this.state.index === 9) {
      message.info('最多添加9个!')
      return false
    }
    await this.setState({ index: this.state.index + 1 })
    let columns = [
      ...this.state.columns,
      {
        title: '填写课时包',
        children: [
          {
            title: '总价',
            dataIndex: 'zj' + this.state.index,
            key: 'zj' + this.state.index,
            width: 60
          },
          {
            title: '优惠上限',
            dataIndex: 'youhui' + this.state.index,
            key: 'youhui' + this.state.index,
            width: 60
          }
        ]
      }
    ]
    this.setState({
      columns: columns.map((a, aa) => {
        if (a.title === '填写课时包') {
          a.title = this.slCom(this.state.ksbData[aa], aa - 1)
        }
        return {
          ...a,
          children: a.children
            ? a.children.map(b => {
                if (b.title === '优惠上限') {
                  b.render = (v, d) => {
                    return (
                      <Input
                        data-value={d.index}
                        className="table-input"
                        value={v}
                        onBlur={e => {
                          let value = isNum(e.target.value)
                          let index = e.target.dataset.value
                          if (!isNumber(value)) {
                            message.error('请设置为数字')
                            value = ''
                          }
                          let tableData = this.state.tableData
                          tableData[index] = {
                            ...tableData[index],
                            ['youhui' + (aa - 1)]: value
                          }
                          this.setState({
                            tableData
                          })
                        }}
                        onChange={e => {
                          let value = e.target.value
                          let index = e.target.dataset.value
                          //必须设置课时数
                          if (!this.state.ksbData.length) {
                            message.error('请先设置课时包数')
                            return false
                          }
                          let tableData = this.state.tableData
                          if (!tableData[index].danji) {
                            message.error('请先设置课时包单价')
                            return false
                          }
                          if (value > tableData[index]['zj' + (aa - 1)]) {
                            message.error('不能大于总价')
                            return false
                          }
                          tableData[index] = {
                            ...tableData[index],
                            ['youhui' + (aa - 1)]: value
                          }
                          this.setState({
                            tableData
                          })
                        }}
                      />
                    )
                  }
                  return b
                }
                return b
              })
            : undefined
        }
      })
    })
  }
  onChange = async (value, type) => {
    if (type === 'one') {
      let guizhe = this.state.guizhe
      guizhe[0] = value
      await this.setState({
        guizhe
      })
    }
    if (type === 'two') {
      let guizhe = this.state.guizhe
      guizhe[1] = value
      await this.setState({
        guizhe
      })
    }
    if (type === 'three') {
      let guizhe = this.state.guizhe
      guizhe[2] = value
      await this.setState({
        guizhe
      })
    }
    this.props.form.setFieldsValue({
      rule: this.state.guizhe
    })
  }
  async componentDidMount() {
    await this.columnsAdd()
    let { data, status } = await API.get('/orderservice/coursepack/grade/list')
    if (!status) return false
    this.setState({
      tableData: data.map((a, aa) => {
        a.index = aa
        return a
      })
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) return false
      //价格列表
      let errArr = []
      let errArr2 = []
      let errArr3 = []
      let priceList = this.state.tableData.map(a => {
        return {
          gradeId: a.id,
          unitPrice: a.danji,
          details: new Array(this.state.index)
            .join(',')
            .split(',')
            .map((b, bb) => {
              if (a['zj' + (bb + 1)] < a['youhui' + (bb + 1)]) {
                errArr.push({ grade: a.name, ks: this.state.ksbData[bb] })
              }
              if (a['zj' + (bb + 1)] && a['youhui' + (bb + 1)] !== 0 && !a['youhui' + (bb + 1)]) {
                errArr2.push({ grade: a.name, ks: this.state.ksbData[bb] })
              }
              if (!this.state.ksbData[bb]) {
                errArr3.push({ grade: a.name, ks: this.state.ksbData[bb] })
              }
              return {
                lessonHour: this.state.ksbData[bb],
                totalPrice: a['zj' + (bb + 1)],
                maxDiscountAmount: a['youhui' + (bb + 1)]
              }
            })
        }
      })
      if (errArr3.length) {
        message.error(`课时包数必填`, 5)
        return false
      }
      //判断优惠是否大于总价
      if (errArr.length) {
        let gradeArr = errArr.map(a => '【' + a.grade + '的' + a.ks + '课时' + '】')
        message.error(`${gradeArr.join('')}，优惠上限大于总价，请予改正。`, 5)
        return false
      }
      //判断总价有了，但优惠价格没有
      if (errArr2.length) {
        let gradeArr = errArr2.map(a => '【' + a.grade + '的' + a.ks + '课时' + '】')
        message.error(`${gradeArr.join('')}，设置了单价，优惠上限必填。`, 5)
        return false
      }
      //保存参数
      let params = {
        assignEnterpriseCode,
        name: values.name,
        type: values.type?.key,
        imageUrl: values.imageUrl,
        rule: {
          signingDay: values.rule?.[0],
          lessonHour: values.rule?.[1],
          totalLessonHour: values.rule?.[2]
        },
        priceList
      }
      await this.setState({ isLoad: true })
      let { status } = await API.post('/orderservice/coursepack/save', params)
      if (!status) {
        this.setState({ isLoad: false })
        return false
      }
      await message.success('新建课时包成功', 2)
      await this.props.onCancel()
      this.props.searchData()
    })
  }
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请填写名称'
              }
            ]
          })(<Input style={{ width: 240 }} maxLength={30} placeholder="请输入30字以内" />)}
        </Form.Item>
        <Form.Item label="类型">
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '请选择类型'
              }
            ]
          })(
            <Select
              style={{ width: 240 }}
              noMultiple
              API={API}
              url={'/orderservice/coursepack/type/list'}
              maxLength={30}
            />
          )}
        </Form.Item>
        {getFieldValue('type')?.key === 5 && (
          <Form.Item label="规则">
            {getFieldDecorator('rule')(
              <div>
                1、新签学员在签约后 <InputNumber min={0} max={999} onChange={v => this.onChange(v, 'one')} />
                天内再续费，购买 > <InputNumber min={0} max={999} onChange={v => this.onChange(v, 'two')} />
                时都可以享受当前价格表最大的优惠
                <br />
                2、学员累计已购买的常规课时数达到
                <InputNumber min={0} max={999} onChange={v => this.onChange(v, 'three')} />
                课时后，可永久享受当前价格表最大的优惠
              </div>
            )}
          </Form.Item>
        )}
        <Form.Item label="价格">
          {getFieldDecorator('jiage')(
            <div>
              <div style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={this.columnsAdd}>
                  + 添加课时包
                </Button>
              </div>
              <Table
                pagination={false}
                rowKey="id"
                bordered
                columns={this.state.columns}
                dataSource={this.state.tableData}
              />
            </div>
          )}
        </Form.Item>
        <Form.Item label="图片">
          {getFieldDecorator('imageUrl', { rules: [{ required: true, message: '请上传' }] })(
            <>
              <UploadImage
                imageUrl={this.state.imageUrlArr}
                onChange={() => {}}
                loading={this.state.frontLoading}
                beforeUpload={() => this.setState({ frontLoading: true })}
                customRequest={action =>
                  bosUpFile({ action, fileTypeEnum: 'ORDERSERVICE', clientId: csGet('X-MSS-USERID') })
                }
                onSuccess={async data => {
                  message.success('图片上传成功')
                  await this.setState({
                    imageUrlArr: data.url
                  })
                  this.props.form.setFieldsValue({
                    imageUrl: this.state.imageUrlArr
                  })
                  this.setState({
                    frontLoading: true
                  })
                }}
                onError={msg => {
                  message.error(`上传失败!`)
                  console.log('msg', msg)
                  this.setState({
                    frontLoading: true
                  })
                }}
              />
              <span>支持jpg、png，大小1MB以内</span>
            </>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 6, offset: 10 }}>
          <Button onClick={this.props.onCancel} style={{ marginRight: 20 }}>
            取消
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

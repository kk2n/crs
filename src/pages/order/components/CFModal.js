import { Modal, Form, Button, message, Input, Dropdown, Icon, Menu } from 'antd'
import React, { Component } from 'react'
import SearchSel from '../../../components/SearchSel'
import API from '../../../utils/axios'
import { initial } from 'underscore'
import { replaceObj, rejectObj } from 'ymcore/array'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}
@Form.create()
export default class extends Component {
  state = {
    info: {},
    item: [],
    index: 0,
    subjectArr: []
  }
  async componentDidMount() {
    //请求订单详情
    let { data: info } = await API.get('/biz/sales/order/getOrderInfoByOrderId', { contractId: this.props.orderId })
    this.setState({
      info: {
        studentId: info.studentId,
        gradeId: info.gradeId,
        dd: info.contractId,
        km: info.subjectName,
        xm: info.realName,
        xm2: info.refClientName,
        zt: info.statusDesc,
        ls: info.teacherName,
        ks: info.remainHours
      }
    })
    if (this.state.index === 0) {
      this.add()
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        this.props.isLoadingUp(false)
        return false
      }
      if (!(values['d-km1'] || {}).key) {
        message.error('请添加拆分项目')
        return false
      }
      this.props.isLoadingUp(true)
      let params = {
        orderId: this.state.info.dd,
        clientName: this.state.info.xm,
        splitOrderCount: parseInt(values.kes),
        splitOrderReason: values.zfyy, //拆分原因
        splitOrder: []
      }
      let arr = new Array(this.state.index).join(',').split(',')
      arr.forEach((a, aa) => {
        params.splitOrder[aa] = `${(values['d-km' + (aa + 1)] || {}).key}^${(values['d-ls' + (aa + 1)] || {}).key}^${
          values['d-ks' + (aa + 1)]
        }`
      })
      // console.log('params', params)
      let { status } = await API.post('/biz/sales/order/splitOrder', params)
      if (!status) {
        this.props.isLoadingUp(false)
        return false
      }
      await message.success('您的操作已成功！')
      await this.props.isLoadingUp(false)
      this.props.cfModalShowUp(false)
      this.props.getOrderList({ pageNum: this.props.OrderList.pageNum, pageSize: 10 })
    })
  }
  temp = x => [
    {
      text: `（订单${this.state.index}）课时数`,
      className: 'd-cai',
      key: 'd-ks*',
      rules: [
        {
          required: true,
          message: '请填写课时数'
        },
        {
          pattern: /^[+]{0,1}(\d+)$/,
          message: '只能填写正整数'
        }
      ],
      component: <Input />
    },
    {
      text: '科目',
      className: 'd-cai',
      key: 'd-km*',
      rules: [
        {
          required: true,
          message: '请选择科目'
        }
      ],
      component: (
        <SearchSel
          noMultiple
          url={'/biz/sales/dict/subject'}
          vt={'subjectId,subjectName'}
          onChange={async v => {
            if (!this.state.subjectArr[x]) {
              //新增
              let subjectArr = [...this.state.subjectArr]
              subjectArr[x] = v.key
              await this.setState({
                subjectArr
              })

              let item = this.state.item
              let comp = this.temp(this.state.index)[2]
              item = [...item, { ...comp, key: comp.key.replace('*', this.state.index) }]
              this.setState({ item })
            } else {
              //编辑
              let subjectArr = [...this.state.subjectArr]
              subjectArr[x] = v.key
              await this.setState({
                subjectArr
              })
              let comp = this.temp(x)[2]
              let item = replaceObj(this.state.item, { key: 'd-ls' + x }, { ...comp, key: comp.key.replace('*', x) })
              console.log('item', item)
              await this.setState({ item: rejectObj(item, { key: 'd-ls' + x }) })
              this.setState({ item })
            }
          }}
        />
      )
    },
    {
      text: '老师',
      className: 'd-cai',
      key: 'd-ls*',
      rules: [
        {
          required: true,
          message: '请选择新老师'
        }
      ],
      component: (
        <SearchSel
          noMultiple
          url={'/biz/sales/user/getSplitOrderTeacher'}
          param={{
            studentId: this.state.info.studentId,
            subjectId: this.state.subjectArr[x],
            gradeId: this.state.info.gradeId
          }}
          vt={'userId,userRealName'}
        />
      )
    }
  ]

  //增加
  add = async () => {
    if (this.state.index !== 0 && !this.state.subjectArr[this.state.index]) {
      message.error('信息不完整，请选择科目和老师')
      return false
    }
    await this.setState({
      index: this.state.index + 1
    })
    let item = this.state.item
    let comp = this.temp(this.state.index)[0]
    let comp2 = this.temp(this.state.index)[1]
    item = [
      ...item,
      { ...comp, key: comp.key.replace('*', this.state.index) },
      { ...comp2, key: comp2.key.replace('*', this.state.index) }
    ]
    this.setState({ item })
  }
  //减少
  jian = async () => {
    if (this.state.index === 1) {
      message.error('不能再减少了')
      return false
    }
    let item = this.state.item
    if (!this.state.subjectArr[this.state.index]) {
      item = initial(item, 2)
      await this.setState({ item })
    } else {
      item = initial(item, 3)
      await this.setState({ item, subjectArr: initial(this.state.subjectArr) })
    }
    this.setState({
      index: this.state.index - 1
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let x = [
      {
        text: '拆出课时数',
        className: 'caichu1',
        key: 'kes',
        rules: [
          {
            required: true,
            message: '请填写拆出课时数'
          },
          {
            pattern: /^[+]{0,1}(\d+)$/,
            message: '只能填写正整数'
          }
        ],
        component: <Input />
      },
      {
        text: '拆分原因',
        className: 'caichu2',
        key: 'zfyy',
        rules: [
          {
            required: true,
            message: '请选择换老师的原因'
          }
        ],
        component: <Input style={{ width: 180 }} />,
        other: (
          <Dropdown
            overlay={
              <Menu
                onClick={e => {
                  this.props.form.setFieldsValue({
                    zfyy: e.key
                  })
                }}
              >
                <Menu.Item key="换老师">换老师</Menu.Item>
                <Menu.Item key="课时太多">课时太多</Menu.Item>
                <Menu.Item key="对其他科目感兴趣">对其他科目感兴趣</Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <a className="ant-dropdown-link">
              &nbsp;&nbsp;选择 <Icon type="down" />
            </a>
          </Dropdown>
        )
      },
      ...this.state.item
    ]

    return (
      <Modal
        title={'拆分订单*为必填'}
        visible={this.props.OrderList.cfModalShow}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={980}
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
            <li className={'left'}>学员姓名：</li>
            <li>
              {this.state.info.xm}&nbsp;&nbsp;{this.state.info.xm2}
            </li>
          </ul>
          <ul>
            <li className={'left'}>订单状态：</li>
            <li>{this.state.info.zt}</li>
          </ul>
          <ul>
            <li className={'left'}>科目：</li>
            <li>{this.state.info.km}</li>
          </ul>
          <ul>
            <li className={'left'}>老师：</li>
            <li>{this.state.info.ls}</li>
          </ul>
          <ul>
            <li className={'left'}>剩余课时：</li>
            <li>{this.state.info.ks}</li>
          </ul>
        </div>
        <div style={{ marginTop: 20 }}>
          <Form onSubmit={this.handleSubmit}>
            {x.map((a, aa) => {
              return (
                <Form.Item label={a.text} className={a.className} key={aa} {...formItemLayout}>
                  {getFieldDecorator(a.key, {
                    initialValue: a.initialValue,
                    rules: a.rules
                  })(a.component)}
                  {a.other}
                </Form.Item>
              )
            })}
            <div style={{ clear: 'both' }} />
            <Button style={{ marginRight: 20 }} onClick={this.add}>
              +
            </Button>
            <Button onClick={this.jian}>-</Button>
            <Form.Item label="." className={'noLabel'}>
              <Button type="primary" htmlType="submit" loading={this.props.OrderList.isLoading}>
                提交
              </Button>
              <Button style={{ marginLeft: 20 }} onClick={() => this.props.cfModalShowUp(false)}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
}

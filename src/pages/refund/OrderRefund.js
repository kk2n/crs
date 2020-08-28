import React, { Component } from 'react'
import { Table, Modal, Radio, InputNumber, message, Tag } from 'antd'
import lodash from 'lodash'
import FilterWidget from './components/FilterWidget'
import API from '../../utils/axios'
import './refund.scss'

export default class OrderRefund extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      listInfo: {},
      disabled: true,
      deductAmount: 0
    }
  }
  paramsInfo = {}
  pageInfo = {
    pageNum: 1,
    pageSize: 10
  }

  resetPageInfo = () => {
    this.pageInfo = {
      pageNum: 1,
      pageSize: 10
    }
  }

  setParams = obj => {
    if (lodash.isEqual(this.paramsInfo === obj)) {
      this.paramsInfo = obj
    } else {
      this.paramsInfo = obj
      this.pageInfo.pageNum = 1
    }
  }

  componentDidMount() {
    this.getData()
  }
  // 获取数据
  getData = async () => {
    let params = {
      ...this.paramsInfo,
      ...this.pageInfo
    }
    let result = await API.post('/biz/coursepack/order/list', params)
    this.setState({ listInfo: result.data })
  }
  showDetail = (val, record) => {
    this.refundParams.orderId = record.orderId
    this.setState({ visible: true })
  }

  pageIndexChange = (current, pageSize) => {
    this.pageInfo.pageNum = current
    this.pageInfo.pageSize = pageSize
    this.getData()
  }
  pageSizeChange = (current, pageSize) => {
    this.pageInfo.pageNum = 0
    this.pageInfo.pageSize = pageSize
    this.getData()
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  // 选择退款类型
  onChange = e => {
    let val = e.target.value
    this.refundParams.refundType = val
    this.refundParams.deductAmount = 0
    if (val === 'ALL') {
      this.setState({ deductAmount: 0, disabled: true })
    } else {
      this.setState({ deductAmount: 0, disabled: false })
    }
  }
  refundParams = {
    deductAmount: 0,
    orderId: '',
    refundType: 1
  }

  // 获取退款额度
  getAmount = val => {
    this.refundParams.deductAmount = val
    this.setState({ deductAmount: val })
  }

  // 退款
  doRefund = async () => {
    let params = this.refundParams
    if (params.refundType === 'PORTION' && params.deductAmount <= 0) {
      message.error('退款金额必须大于0')
      return false
    }
    let { status, msg } = await API.post('/biz/coursepack/order/refund', params)
    if (!status) return false
    this.handleCancel()
    await message.info(msg)
    this.getData()
  }
  render() {
    let { listInfo = {}, disabled, deductAmount } = this.state
    const columns = [
      {
        title: '合同编号',
        dataIndex: 'orderId',
        render: (val, record) => {
          return (
            <p key={'a' + val}>
              {record.orderAttribute === 'NEW' ? <Tag color="orange">新签</Tag> : <Tag color="blue">续费</Tag>}
              {val}
            </p>
          )
        }
      },
      {
        title: '实付金额(元)',
        dataIndex: 'totalPrice'
      },
      {
        title: '姓名',
        dataIndex: 'realName',
        render: val => {
          return val ? val : '/'
        }
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '年级',
        dataIndex: 'gradeName'
      },
      {
        title: '课时数',
        dataIndex: 'lessonHour'
      },
      {
        title: '合同状态',
        dataIndex: 'orderStatusName'
      },
      {
        title: '分期形式',
        dataIndex: 'periodFormName'
      },
      {
        title: '购买渠道',
        dataIndex: 'shoppingChannelName'
      },
      {
        title: '业绩归属人',
        dataIndex: 'belongName',
        render: val => {
          return val ? val : '/'
        }
      },
      {
        title: '下单时间',
        dataIndex: 'createTime'
      },
      {
        title: '操作',
        dataIndex: '',
        render: (val, record) => {
          return record.orderStatus === 'COMPLETE' ? <a onClick={() => this.showDetail(val, record)}>退款</a> : ''
        }
      }
    ]

    return (
      <div>
        <FilterWidget {...this.props} setParams={this.setParams} getData={this.getData} reset={this.resetPageInfo} />
        <div style={{ marginTop: 10 }}>
          <Table
            rowKey={'orderId'}
            className="tableStyle"
            columns={columns}
            dataSource={listInfo.list || []}
            pagination={{
              current: listInfo.pageNum,
              pageSize: listInfo.pageSize,
              total: listInfo.total,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '40', '80', '100'],
              showTotal: t => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ marginRight: 10 }}>共 {t} 条记录</span>
                  </div>
                )
              },
              onChange: this.pageIndexChange,
              onShowSizeChange: this.pageSizeChange
            }}
          />
        </div>
        <div>
          <Modal title="退款" visible={this.state.visible} onOk={this.doRefund} onCancel={this.handleCancel}>
            <div>
              <Radio.Group defaultValue={'ALL'} onChange={this.onChange}>
                <Radio className="radioSty" value={'ALL'}>
                  全部退款
                </Radio>
                <Radio className="radioSty" value={'PORTION'}>
                  扣除金额
                  <InputNumber
                    className="refundNumber"
                    min={0}
                    placeholder="请输入金额"
                    precision={2}
                    disabled={disabled}
                    value={deductAmount}
                    onChange={this.getAmount}
                  />
                </Radio>
              </Radio.Group>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

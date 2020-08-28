import React, { Component } from 'react'
import { Drawer, Row, Col, Tag, Table } from 'antd'
import lodash from 'lodash'
import Qrcode from './components/Qrcode'
import Filter from './components/FilterWidget'
import OptionWrap from './components/optionWrap'
import API from '../../utils/axios'
import './orderList.scss'
import { connect as newOrderManage } from './orderModel'

@newOrderManage
export default class NewOrderList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {},
      visible: false,
      record: {}
    }
  }
  paramsInfo = {}
  pageInfo = {
    pageNum: 1,
    pageSize: 10
  }

  setParams = obj => {
    if (lodash.isEqual(this.paramsInfo === obj)) {
      this.paramsInfo = obj
    } else {
      this.paramsInfo = obj
      this.pageInfo.pageNum = 1
    }
  }

  resetPageInfo = () => {
    this.pageInfo = {
      pageNum: 1,
      pageSize: 10
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
    let { data, status } = await API.post('/biz/coursepack/order/list', params)
    if (status) {
      this.setState({ listInfo: data })
    }
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
  showDetail = async record => {
    let result = await API.get('/biz/coursepack/order/detail', { orderId: record.orderId })
    this.setState({ record: result.data, visible: true })
  }

  render() {
    let { listInfo = {}, record } = this.state
    console.log(listInfo, 'fff')
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'orderId',
        render: (val, data) => {
          return (
            <p key={'a' + val}>
              {data.orderAttribute === 'NEW' ? <Tag color="orange">新签</Tag> : <Tag color="blue">续费</Tag>}
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
        title: '订单状态',
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
        render: (d, data) => {
          return (
            <div>
              <a key={'n' + d.orderId} onClick={() => this.showDetail(data)}>
                详情
              </a>
              {data.orderStatus === 'WAITPAY' ? <Qrcode data={data} /> : ''}
            </div>
          )
        }
      }
    ]

    return (
      <div>
        <Filter getData={this.getData} setParams={this.setParams} reset={this.resetPageInfo} />
        <OptionWrap getData={this.getData} />
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
        <Drawer
          title="订单详情"
          width={'60%'}
          placement="right"
          onClose={() => this.setState({ visible: false })}
          closable={false}
          visible={this.state.visible}
        >
          <Row className="rowStyle">
            <Col span={8}>
              <span>订单编号：</span>
              <span>{record.orderId}</span>
            </Col>
            <Col span={8}>
              <span>支付类型： </span>
              <span>{record.paymentWayName}</span>
            </Col>
            <Col span={8}>
              <span>下单时间： </span>
              <span>{record.createTime}</span>
            </Col>
          </Row>
          <Row className="rowStyle">
            <Col span={8}>
              <span>支付时间：</span>
              <span>{record.payTime}</span>
            </Col>
            <Col span={8}>
              <span>订单状态： </span>
              <span>{record.orderStatusName}</span>
            </Col>
            <Col span={8}>
              <span>订单购买渠道： </span>
              <span>{record.shoppingChannelName}</span>
            </Col>
          </Row>
          <Row className="rowStyle">
            <Col span={8}>
              <span>购买用户：</span>
              <span>{record.mobile}</span>
            </Col>
            <Col span={8}>
              <span>学生姓名： </span>
              <span>{record.realName}</span>
            </Col>
            <Col span={8}>
              <span>业绩归属人： </span>
              <span>{record.belongName}</span>
            </Col>
          </Row>
          <Row className="rowStyle otherSty">
            <Col span={4}>
              <p>年级</p>
              <p>{record.gradeName}</p>
            </Col>
            <Col span={5}>
              <p>购买课时</p>
              <p>{record.lessonHour}</p>
            </Col>
            <Col span={5}>
              <p>订单总价(元) </p>
              <p>{record.orderPrice}</p>
            </Col>
            <Col span={5}>
              <p>优惠(元) </p>
              <p>{record.discountAmount}</p>
            </Col>
            <Col span={5}>
              <p>实际支付(元) </p>
              <p>{record.totalPrice}</p>
            </Col>
          </Row>
        </Drawer>
      </div>
    )
  }
}

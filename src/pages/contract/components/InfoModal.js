import React, { Component } from 'react'
import { Modal, Row, Col, Table, Icon } from 'antd'
import API, { host } from '../../../utils/axios'
import moment from 'moment'

// @Form.create()
export default class BackoutModal extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    tfModal: false,
    tuiFeiData: {},
    info: {
      htxx: []
    },
    period: {}
  }
  async componentDidMount() {
    let { data } = await API.get('/biz/sales/contract/detail/get', { contractId: this.props.ContractList.contractId })
    let { data: ddList } = await API.get('/biz/sales/contract/order/list', {
      contractId: this.props.ContractList.contractId
    })
    let results = await API.get('/biz/sales/contract/periodDetail', {
      contractId: this.props.ContractList.contractId
    })
    console.log('data', data.contractInfo)
    this.setState({
      info: {
        ddbh: data.contractInfo?.contractNo,
        cjr: data.contractInfo?.createdBy,
        yjgsr: data.contractInfo?.belongTo,
        cjsj: data.contractInfo?.createdOn,
        htsx: data.contractInfo?.contractPropDesc,
        htyxq: data.contractInfo?.validBeginDate + '~' + data.contractInfo?.validEndDate,
        bz: data.contractInfo?.contractMemo,
        ztId: data.contractInfo?.contractStatus,
        zt: data.contractInfo?.contractStatusDesc,
        sfjr: data.contractInfo?.paidPrice,
        isPeriod: data.contractInfo?.isPeriod,
        orderPartner: data.contractInfo?.orderPartner,
        htxx: [
          {
            name: '学员姓名',
            val:
              data.clientInfo?.realName +
              '  ' +
              (data.contractInfo?.refClientName ? data.contractInfo?.refClientName : '')
          },
          {
            name: '客户编号',
            val:
              data.clientInfo?.clientId + '  ' + (data.contractInfo?.refClientId ? data.contractInfo?.refClientId : '')
          },
          {
            name: '年级',
            val: data.contractInfo?.gradeName
          }
          // {
          //   name: '联系电话',
          //   val: data.clientInfo.telephone
          // },
          // {
          //   name: '联系地址',
          //   val: data.clientInfo.address
          // }
        ],
        htKeshishuxx: [
          {
            name: '购买课时数',
            val: data.contractInfo?.lessonCount
          },
          {
            name: '赠送课时数',
            val: data.contractInfo?.freeLessonCount
          },
          {
            name: '额外赠送课时数',
            val: data.contractInfo?.extraLessonCount
          },
          {
            name: '课时单价',
            val: `¥${data.contractInfo?.unitPrice}`
          }
        ],
        yhxx: [
          {
            name: '系统优惠金额',
            val: data.contractInfo?.discountPrice
          },
          {
            name: '手动优惠金额',
            val: data.contractInfo?.manualDiscountPrice
          },
          {
            name: '额外优惠金额',
            val: data.contractInfo?.extraDiscountPrice
          },
          {
            name: '应付金额',
            val: data.contractInfo?.actualPrice
          },
          {
            name: '红包金额',
            val: data.contractInfo?.couponPrice
          },
          {
            name: '实付金额',
            val: data.contractInfo?.paidPrice
          },
          {
            name: '礼品',
            val: data.contractInfo?.hasGift === 0 ? '无' : '有'
          }
        ],
        qtxx: [
          {
            name: '合同有效期',
            val: data.contractInfo?.validBeginDate + '~' + data.contractInfo?.validEndDate
          },
          {
            name: '要求开课',
            val: data.contractInfo?.requestBeginDate
          },
          // {
          //   name: '合同发票',
          //   val: data.contractInfo.extraDiscountPrice
          // },
          // {
          //   name: '加购价',
          //   val: data.contractInfo.actualPrice
          // },
          // {
          //   name: '备注',
          //   val: data.contractInfo.couponPrice
          // },
          {
            name: '实付金额',
            val: data.contractInfo?.paidPrice
          },
          {
            name: '礼品',
            val: data.contractInfo?.hasGift === 0 ? '无' : '有'
          }
        ],
        ddList: ddList.map(a => {
          return {
            ddbh: a.contractId,
            ls: a.teacherName,
            sy: a.remainHours,
            zs: a.realLessonCount,
            ddzt: a.orderStatus
          }
        })
      },
      period: results.data
    })
  }

  render() {
    let h = [
      {
        title: '订单编号',
        dataIndex: 'ddbh',
        key: 'ddbh'
      },
      {
        title: '老师',
        dataIndex: 'ls',
        key: 'ls'
      },
      {
        title: '剩余/总课时',
        dataIndex: 'sy',
        key: 'sy',
        render: (v, d) => v + '/' + d.zs
      },
      {
        title: '订单状态',
        dataIndex: 'ddzt',
        key: 'ddzt'
      }
    ]

    return (
      <Modal
        visible={this.props.ContractList.infoModalShow}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={false}
        width={980}
      >
        <h1>合同编号：{this.state.info.ddbh}</h1>
        <Row>
          <Col span={16} style={{ lineHeight: 2.3 }}>
            <Row>
              <Col span={12}>创建人：{this.state.info?.cjr}</Col>
              <Col span={12}>业绩归属人：{this.state.info?.yjgsr}</Col>
            </Row>
            <Row>
              <Col span={12}>创建时间：{this.state.info?.cjsj}</Col>
              <Col span={12}>合同属性：{this.state.info?.htsx}</Col>
            </Row>
            <Row>
              <Col span={12}>合同有效期：{this.state.info?.htyxq}</Col>
              <Col span={12}>备注：{this.state.info?.bz}</Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={12}>
                <span style={{ color: '#999' }}>状态</span>
                <br />
                <span style={{ fontSize: 18 }}>{this.state.info?.zt}</span>
              </Col>
              <Col span={12}>
                <span style={{ color: '#999' }}>实付金额</span>
                <br />
                <span style={{ fontSize: 18 }}>￥&nbsp;{this.state.info?.sfjr}</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <div style={{ margin: 20, border: '1px solid #ededed' }}>
          <Row>
            <h2 style={{ lineHeight: 3, paddingLeft: 20, borderBottom: '1px solid #ededed' }}>合同信息</h2>
            {this.state.info?.htxx?.map((a, aa) => (
              <Col span={8} style={{ paddingLeft: 20, lineHeight: 3 }} key={aa}>
                {a.name}：{a.val}
              </Col>
            ))}
            <div style={{ fontWeight: 600, lineHeight: 3, clear: 'both', paddingLeft: 20 }}>合同信息</div>
            {this.state.info.htKeshishuxx?.map((a, aa) => {
              return (
                <Col span={8} style={{ paddingLeft: 20, lineHeight: 3 }} key={aa}>
                  {a.name}：{a.val}
                </Col>
              )
            })}
            <div style={{ fontWeight: 600, lineHeight: 3, clear: 'both', paddingLeft: 20 }}>优惠信息</div>
            {this.state.info.yhxx?.map((a, aa) => {
              return (
                <Col span={8} style={{ paddingLeft: 20, lineHeight: 3 }} key={aa}>
                  {a.name}：{a.val}
                </Col>
              )
            })}
          </Row>
        </div>
        <div style={{ margin: 20 }}>
          <h2
            style={{
              lineHeight: 3,
              paddingLeft: 20,
              border: '1px solid #ededed',
              borderBottom: 'none',
              marginBottom: 0
            }}
          >
            订单信息
          </h2>
          <Table bordered rowKey={'ddbh'} columns={h} dataSource={this.state.info?.ddList} pagination={false} />
        </div>
        {this.state.info?.isPeriod === 1 && JSON.stringify(this.state.period) !== '{}' ? (
          <div style={{ margin: 20, border: '1px solid #ededed', borderBottom: 'none' }}>
            <h2 style={{ lineHeight: 3, paddingLeft: 20, borderBottom: '1px solid #ededed' }}>分期信息</h2>
            {this.state.info?.isPeriod === 1 &&
              JSON.stringify(this.state.period) !== '{}' &&
              this.verify(this.state.period.info?.statusId, this.state.period.info?.periodWay)}
          </div>
        ) : (
          ''
        )}

        <div style={{ margin: 20, border: '1px solid #ededed', lineHeight: 4, paddingLeft: 20 }}>
          <a
            onClick={() => {
              window.open(
                `http://${host('mis')}/contract/showAgreement?contractId=${this.props.ContractList.contractId}`
              )
            }}
          >
            查看条款
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {[8, 10].includes(this.state.info.ztId) && (
            <a
              onClick={async () => {
                let { data: tuiFeiData, status } = await API.get('/biz/sales/contract/id/refund/info', {
                  contractId: this.props.ContractList.contractId
                })
                if (!status) return false
                this.setState({ tfModal: true, tuiFeiData })
              }}
            >
              退费详情
            </a>
          )}
          {this.state.tfModal && (
            <Modal
              centered
              width={700}
              title={'退费详情'}
              visible={this.state.tfModal}
              onCancel={() => this.setState({ tfModal: false })}
              onOk={() => this.setState({ tfModal: false })}
            >
              <Row style={{ lineHeight: '46px' }}>
                <Col span={6} style={{ textAlign: 'right' }}>
                  是否无条件退费：
                </Col>
                <Col span={18}>&nbsp;{this.state.tuiFeiData?.unConditionalRefund ? '是' : '否'}&nbsp;</Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  退费课时数：
                </Col>
                <Col span={18}>{this.state.tuiFeiData?.refundLessonCount}&nbsp;</Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  退费金额：
                </Col>
                <Col span={18}>{this.state.tuiFeiData?.refundPrice}&nbsp;</Col>
                {/*         <Col span={6} style={{ textAlign: 'right' }}>
                  加价购退费金额：
                </Col>
                <Col span={18}>{null}&nbsp;</Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  加价购退费米币数量：
                </Col>
                <Col span={16}>{null}&nbsp;</Col>*/}
                <Col span={6} style={{ textAlign: 'right' }}>
                  打款时间：
                </Col>
                <Col span={18}>{this.state.tuiFeiData?.refundTime}&nbsp;</Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  退费方式：
                </Col>
                <Col span={18}>{this.state.tuiFeiData?.refundType}&nbsp;</Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  银行账号：
                </Col>
                <Col span={18}>{this.state.tuiFeiData?.cardNo}&nbsp;</Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  开户姓名：
                </Col>
                <Col span={18}>{this.state.tuiFeiData?.cardName}&nbsp;</Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  开户银行：
                </Col>
                <Col span={18}>{this.state.tuiFeiData?.cardBank}&nbsp;</Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  开户地址：
                </Col>
                <Col span={18}>{this.state.tuiFeiData?.cardProvince + this.state.tuiFeiData?.cardCity}&nbsp;</Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                  退款备注：
                </Col>
                <Col span={18}>{this.state.tuiFeiData?.memo}&nbsp;</Col>
              </Row>
              <div style={{ textAlign: 'center' }}>若信息有误，请及时联系您的主管</div>
            </Modal>
          )}
          {/* &nbsp;&nbsp;&nbsp;&nbsp;
          <a
            onClick={() => {
              window.open(`http://${host('static')}/wap/event/protocol/payment_normal_20180701.jpg`)
            }}
          >
            查看价格包
          </a>*/}
        </div>
      </Modal>
    )
  }

  verify = (status, orderPartner) => {
    let names = {
      JDBT: '京东白条', // 京东白条
      BDFQ: '百度有钱花', // 百度有钱花
      HAIMI: '海米管家', // 海米管家
      HUIFQ: ' 惠学习', // 惠学习
      FDFQ: '分蛋分期', // 分蛋分期
      HAIER: '海尔消费金融', // 海尔消费金融
      KUFQ: '库分期'
    }
    // 库分期
    let cu_stage = [
      {
        title: '支付金额',
        dataIndex: 'payedAmount',
        key: 'payedAmount'
      },
      {
        title: '支付时间',
        dataIndex: 'kuPayedTime',
        key: 'kuPayedTime'
      },
      {
        title: '支付渠道',
        dataIndex: 'orderPartner',
        key: 'orderPartner',
        render: () => '库分期'
      },
      {
        title: '交易流水号',
        dataIndex: 'serialNum',
        key: 'serialNum'
      }
    ]
    // 其他分期
    let ohterTableColumns = [
      {
        title: '期数',
        dataIndex: 'periodNum',
        key: 'periodNum',
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.periodNum - b.periodNum
      },
      {
        title: '应还款时间',
        dataIndex: 'limitPayDate',
        key: 'limitPayDate',
        render: (val, record) => {
          if (record.payedTime && moment(record.payedTime).valueOf() > moment(val).valueOf()) {
            return <span style={{ color: 'red' }}>{val}</span>
          } else if (
            !record.payedTime &&
            val &&
            moment(val)
              .add(-10, 'd')
              .valueOf() < moment(moment().format('YYYY-MM-DD')).valueOf()
          ) {
            return <span style={{ color: 'red' }}>{val}</span>
          } else {
            return <span>{val}</span>
          }
        }
      },
      {
        title: '金额',
        dataIndex: 'shouldPayAmount',
        key: 'shouldPayAmount'
      },
      {
        title: '还款状态',
        dataIndex: 'periodRepayStatus',
        key: 'periodRepayStatus',
        render: val => {
          return val === 1 ? <Icon type="check" /> : ''
        }
      },
      {
        title: '实际还款时间',
        dataIndex: 'payedTime',
        key: 'payedTime'
      }
    ]
    if ([1, 2, 4].includes(status)) {
      return (
        <div style={{ padding: '20px' }}>
          <h2>{status === 4 ? '失败详情' : this.state.period.info.statusDesc}:</h2>
          <p>
            合同编号：<span>{this.state.period.info.contractNo}</span>(
            <span>{names[this.state.period.info.periodWay]}</span> -<span>{this.state.period.info.validPeriod}</span>{' '}
            期-
            <span>{this.state.period.info.statusDesc}</span>)
          </p>
          <p>
            <span>{this.state.period.info.lastUpdatedOn}</span> <span>{this.state.period.info.statusDesc}</span>
          </p>
        </div>
      )
    } else {
      return (
        <div style={{ padding: '20px' }}>
          <p>
            合同编号：<span>{this.state.period.info.contractNo}</span>(
            <span>{names[this.state.period.info.periodWay]}</span> -<span>{this.state.period.info.validPeriod}</span>{' '}
            期-
            <span>{this.state.period.info.statusDesc}</span>)
          </p>
          <p>{this.state.period.info.lastUpdatedOn}</p>
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <h2>支付情况</h2>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '100px' }}>
                <p>￥{this.state.period.info.actualPrice}</p>
                <p>应付总额</p>
              </div>
              <div style={{ width: '30px' }}>
                <p>-</p>
              </div>
              <div style={{ width: '100px' }}>
                <p>￥{this.state.period.info.couponPrice}</p>
                <p>抵扣红包</p>
              </div>
              <div style={{ width: '30px' }}>
                <p>-</p>
              </div>
              <div style={{ width: '100px' }}>
                <p>￥{this.state.period.info.firstAmount}</p>
                <p>首付</p>
              </div>
              <div style={{ width: '30px' }}>
                <p>-</p>
              </div>
              <div style={{ width: '100px' }}>
                <p>￥{this.state.period.info.periodPaidPrice}</p>
                <p>分期已付</p>
              </div>
              <div style={{ width: '30px' }}>
                <p>=</p>
              </div>
              <div style={{ width: '100px' }}>
                <p>
                  ￥
                  {(
                    this.state.period.info.actualPrice -
                    this.state.period.info.couponPrice -
                    this.state.period.info.couponPrice -
                    this.state.period.info.firstAmount -
                    this.state.period.info.periodPaidPrice
                  ).toFixed(2)}
                </p>
                <p>剩余应付</p>
              </div>
            </div>
          </div>
          {orderPartner === 'KUFQ' ? (
            <Table rowKey={'periodNum'} columns={cu_stage} dataSource={this.state.period.detail} pagination={false} />
          ) : (
            <Table
              rowKey={'serialNum'}
              columns={ohterTableColumns}
              dataSource={this.state.period.detail}
              pagination={false}
            />
          )}
        </div>
      )
    }
  }
}

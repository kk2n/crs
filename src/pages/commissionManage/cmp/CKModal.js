import { Modal } from 'antd'
import React from 'react'
import { Row, Col, Divider, Button, Popover } from 'antd'
import API from '../../../utils/axios'

export default ({ m }) => {
  return (
    <Modal
      title={m.selTitle}
      visible={m.ckModal}
      centered
      width={980}
      footer={null}
      onCancel={() => {
        m.update({
          selId: undefined,
          ckModal: false,
          selTitle: undefined
        })
      }}
    >
      <div style={{ lineHeight: '34px' }}>
        <h2>门店信息</h2>
        <Row>
          <Col span={6}>门店编号： {m.getInfoRes.data?.storeNo}</Col>
          <Col span={6}>门店名称： {m.getInfoRes.data?.storeName}</Col>
          <Col span={6}>代理商名称： {m.getInfoRes.data?.agentName}</Col>
          <Col span={6}>开业时间： {m.getInfoRes.data?.openDate}</Col>
        </Row>
        <Divider />
        <h2>销售信息</h2>
        <Row>
          <Col span={8}>
            <Popover content={'支付时间在本人工月内的新签合同金额'}>
              新签金额（本月）： {m.getInfoRes.data?.signPrice}
            </Popover>
          </Col>
          <Col span={8}>
            <Popover content={'支付时间在本人工月内的续费合同金额'}>
              续费金额（本月）： {m.getInfoRes.data?.renewalPrice}
            </Popover>
          </Col>
          <Col span={8}>
            <Popover content={'退费时间在本人工月内且支付时间在本人工月内的合同金额'}>
              退费金额（本月）： {m.getInfoRes.data?.refundPrice}
            </Popover>
          </Col>
          <Col span={8}>
            <Popover content={'新签金额（本月）+续费金额（本月）-退费金额（本月）'}>
              实收金额（本月）： {m.getInfoRes.data?.paidPrice}
            </Popover>
          </Col>
          <Col span={8}>佣金提成比例： {m.getInfoRes.data?.commissionConfigRate}&nbsp;%</Col>
          <Col span={8}>
            销售佣金金额： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.salesCommissionPrice}</span>
          </Col>
          <Col span={8}>
            <Popover content={'退费时间在本人工月内且支付时间在其它人工月内的合同金额'}>
              退费金额（非本月）： {m.getInfoRes.data?.beforeRefundPrice}
            </Popover>
          </Col>
          <Col span={8}>&nbsp;</Col>
          <Col span={8}>
            <Popover content={'X月退费金额乘以（当月佣金提成比例+当月市场补贴比例-本月市场补贴金额）之和'}>
              应扣除佣金： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.deductCommissionPrice}</span>
            </Popover>
          </Col>
        </Row>
        <Divider />
        <h2>MGM信息</h2>
        <Row>
          <Col span={8}>MGM总成本： {m.getInfoRes.data?.mgmTotalPrice}</Col>
          <Col span={8}>MGM承担比例： {m.getInfoRes.data?.mgmConfigRate}&nbsp;%</Col>
          <Col span={8}>
            应扣除成本： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.deductMgmPrice}</span>
          </Col>
        </Row>
        {m.getInfoRes.data?.currentSubsidyPlan === 0 && m.getInfoRes.data?.currentSubsidyPlan === 0 && (
          <>
            <Divider />
            <h2>补贴信息</h2>
            <Row>
              <Col span={8}>
                补贴进度： {m.getInfoRes.data?.currentSubsidyPlan + '/' + m.getInfoRes.data?.totalSubsidyPlan}
              </Col>
              <Col span={8}>市场补贴比例： {m.getInfoRes.data?.subsidyConfigRate}&nbsp;%</Col>
              <Col span={8}>
                补贴金额： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.subsidyPrice}</span>
              </Col>
            </Row>
          </>
        )}
        <Divider />
        <h2>其他信息</h2>
        <Row>
          <Col span={8}>EXTRA奖金： {m.getInfoRes.data?.extarRewardPrice}</Col>
          <Col span={8}>稽核扣罚： {m.getInfoRes.data?.auditDeductPrice}</Col>
          <Col span={8}>其他： {m.getInfoRes.data?.otherPrice}</Col>
          <Col span={16}>备注： {m.getInfoRes.data?.remark}</Col>
          <Col span={8}>
            其他： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.otherTotalPrice}</span>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24} style={{ textAlign: 'right', fontSize: 24 }}>
            应发佣金金额： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.totalCommissionPrice}</span>
          </Col>
        </Row>
        {m.getInfoRes.data?.status === 1 && (
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Button
                loading={m.ling}
                size={'large'}
                type="primary"
                onClick={async () => {
                  await m.lingUp(true)
                  let { status } = await API.post('/biz/sales/commission/confirm', { id: m.selId })
                  if (!status) return !(await m.lingUp(false))
                  m.update({ ckModal: false, ref: Math.random(), ling: false })
                }}
              >
                我已确认
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </Modal>
  )
}

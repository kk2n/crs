import { InputNumber, Modal, Input, message } from 'antd'
import React from 'react'
import { Row, Col, Divider } from 'antd'
import API from '../../../utils/axios'

export default ({ m }) => {
  return (
    <Modal
      title={m.selTitle}
      visible={m.editModal}
      centered
      width={980}
      okButtonProps={{
        loading: m.ling
      }}
      onOk={async () => {
        let params = {
          id: m.selId,
          commissionAdjustRate: m.editObj?.commissionAdjustRate,
          mgmAdjustRate: m.editObj?.mgmAdjustRate,
          subsidyAdjustRate: m.editObj?.subsidyAdjustRate,
          extarRewardPrice: m.editObj?.extarRewardPrice,
          auditDeductPrice: m.editObj?.auditDeductPrice,
          otherPrice: m.editObj?.otherPrice,
          remark: m.editObj?.remark
        }
        await m.lingUp(true)
        let { status } = await API.get('/biz/commission/update', params)
        if (!status) return !(await m.lingUp(false))
        await message.success('操作成功')
        await m.lingUp(false)
        await m.update({
          selId: undefined,
          editModal: false,
          selTitle: undefined
        })
        m.refUp(Math.random())
      }}
      okText="我已确认并发送至代理商"
      onCancel={() => {
        m.update({
          selId: undefined,
          editModal: false,
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
          <Col span={8}>新签金额（本月）： {m.getInfoRes.data?.signPrice}</Col>
          <Col span={8}>续费金额（本月）： {m.getInfoRes.data?.renewalPrice}</Col>
          <Col span={8}>退费金额（本月）： {m.getInfoRes.data?.refundPrice}</Col>
          <Col span={8}>实收金额（本月）： {m.getInfoRes.data?.paidPrice}</Col>
          <Col span={8}>
            佣金提成比例：
            <InputNumber
              min={0}
              max={99}
              defaultValue={m.getInfoRes.data?.commissionConfigRate}
              style={{ width: 120 }}
              onChange={e => {
                m.editObjUp({
                  ...m.editObj,
                  commissionAdjustRate: e
                })
              }}
            />
            &nbsp;%
          </Col>
          <Col span={8}>
            销售佣金金额： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.salesCommissionPrice}</span>
          </Col>
          <Col span={8}>退费金额（非本月）： {m.getInfoRes.data?.beforeRefundPrice}</Col>
          <Col span={8}>&nbsp;</Col>
          <Col span={8}>
            应扣除佣金： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.deductCommissionPrice}</span>
          </Col>
        </Row>
        <Divider />
        <h2>MGM信息</h2>
        <Row>
          <Col span={8}>MGM总成本： {m.getInfoRes.data?.mgmTotalPrice}</Col>
          <Col span={8}>
            MGM承担比例：
            <InputNumber
              min={0}
              max={99}
              defaultValue={m.getInfoRes.data?.mgmConfigRate}
              style={{ width: 120 }}
              onChange={e => {
                m.editObjUp({
                  ...m.editObj,
                  mgmAdjustRate: e
                })
              }}
            />
            &nbsp;%
          </Col>
          <Col span={8}>
            应扣除成本： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.deductMgmPrice}</span>
          </Col>
        </Row>
        <Divider />
        <h2>补贴信息</h2>
        <Row>
          <Col span={8}>
            补贴进度： {m.getInfoRes.data?.currentSubsidyPlan + '/' + m.getInfoRes.data?.totalSubsidyPlan}
          </Col>
          <Col span={8}>
            市场补贴比例：
            <InputNumber
              min={0}
              max={99}
              defaultValue={m.getInfoRes.data?.subsidyConfigRate}
              style={{ width: 120 }}
              onChange={e => {
                m.editObjUp({
                  ...m.editObj,
                  subsidyAdjustRate: e
                })
              }}
            />
            &nbsp;%
          </Col>
          <Col span={8}>
            补贴金额： <span style={{ color: '#f00' }}>{m.getInfoRes.data?.subsidyPrice}</span>
          </Col>
        </Row>
        <Divider />
        <h2>其他信息</h2>
        <Row>
          <Col span={8}>
            EXTRA奖金：
            <InputNumber
              min={0}
              max={99}
              defaultValue={m.getInfoRes.data?.extarRewardPrice}
              style={{ width: 120 }}
              onChange={e => {
                m.editObjUp({
                  ...m.editObj,
                  extarRewardPrice: e
                })
              }}
            />
          </Col>
          <Col span={8}>
            稽核扣罚：
            <InputNumber
              min={0}
              max={99}
              defaultValue={m.getInfoRes.data?.auditDeductPrice}
              style={{ width: 120 }}
              onChange={e => {
                m.editObjUp({
                  ...m.editObj,
                  auditDeductPrice: e
                })
              }}
            />
          </Col>
          <Col span={8}>
            其他：
            <InputNumber
              min={0}
              max={99}
              defaultValue={m.getInfoRes.data?.otherPrice}
              style={{ width: 120 }}
              onChange={e => {
                m.editObjUp({
                  ...m.editObj,
                  otherPrice: e
                })
              }}
            />
          </Col>
          <Col span={24} style={{ paddingTop: 10 }} />
          <Col span={16}>
            备注： <Input.TextArea style={{ width: '90%', height: 34 }} defaultValue={m.getInfoRes.data?.remark} />
          </Col>
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
      </div>
    </Modal>
  )
}

import rj from '../../../utils/jsonRender'
import { Modal, Icon, Input, Row, Col, Button, message } from 'antd'
import API from '../../../utils/axios'
import { Select as UrlSel } from 'ymcmp'
import { Item } from 'ymcmp'
import React from 'react'

function num(x) {
  if (isNaN(x)) return undefined
  return x
}

let TData = []
let T1 = ({ invite, isIinvite, ...props }) => {
  let enterpriseCode = props.Common.staffRes.data.enterpriseCode

  async function bnShow(v, type, data) {
    if (type === 'KMUp') TData = data
    let d = isIinvite ? 'invite' : 'invited'
    let MGM = props.MGMManage
    let KM = MGM[`${d}KM`]
    let KS = MGM[`${d}KS`]
    let ty = t => (t === 'KSUp' ? KM : KS)
    let ty2 = t => (t === 'KSUp' ? v : KS)
    let key = t => TData.find(a => a.id === (t === 'KSUp' ? KM?.key : v?.key))
    key = key(type)?.remainCount || 0

    //如果是直营，单独处理
    let isym = enterpriseCode?.toLowerCase() === 'yimi'
    let x = isym ? (isIinvite ? props.MGMManage?.info?.inviteCountLimit : props.MGMManage?.info?.invitedCountLimit) : v
    if (isym) {
      props[`${d + 'KSUp'}`](x)
      props[`${d + type}`](v)
      props[`${d}BnUp`](v?.key)
      return false
    }
    if (type === 'KMUp' && Number(ty2(type)) + Number(key) > 60) message.error('赠送课时上限为60课时，请不要超过上限')
    if (type === 'KMUp' && ty2(type) > MGM.info[`${d}CountLimit`])
      message.error(`${isIinvite ? '邀请人' : '被邀请人'}赠送上限为${MGM.info[`${d}CountLimit`]}课时，请不要超过上限`)
    props[`${d}BnUp`](v && ty(type) && ty2(type) <= MGM.info[`${d}CountLimit`] && ty2(type) + key <= 60)
    props[`${d + type}`](v)
  }
  return (
    !invite?.isPresent && (
      <div className="bg" key={23} id={'zhengsong'}>
        <Row>
          <Col span={16}>
            <div>
              编号：{invite?.clientId}{' '}
              <span style={{ marginRight: 20 }}>{`姓名：${invite?.clientName}${
                invite?.showNoDeal ? '（非成交学员）' : ''
              }`}</span>
            </div>
            <br />
            <div>
              <span style={{ color: '#f00' }}>*</span>赠送课时：
              <span>
                <Input
                  maxLength={2}
                  disabled={enterpriseCode?.toLowerCase() === 'yimi'}
                  value={
                    enterpriseCode?.toLowerCase() === 'yimi'
                      ? isIinvite
                        ? props.MGMManage?.info?.inviteCountLimit
                        : props.MGMManage?.info?.invitedCountLimit
                      : isIinvite
                      ? props.MGMManage.inviteKS
                      : props.MGMManage.invitedKS
                  }
                  onChange={v => bnShow(num(parseInt(v.target.value)), 'KSUp')}
                  style={{ marginRight: 20, width: '50%' }}
                />
                （合同金额：0）
              </span>
            </div>
            <br />
            <div>
              <span style={{ color: '#f00' }}>*</span>选择科目：
              <UrlSel
                noMultiple
                API={API}
                url="/biz/sales/mgm/subject/list"
                params={{ clientId: invite?.clientId }}
                style={{ marginRight: 20, width: '50%' }}
                value={isIinvite ? props.MGMManage.inviteKM : props.MGMManage.invitedKM}
                onChange={(v, data) => bnShow(v, 'KMUp', data)}
                getPopupContainer={() => document.getElementById('zhengsong')}
              />
            </div>
          </Col>
          <Col span={6}>
            <Button
              loading={props.MGMManage.load}
              type="primary"
              disabled={isIinvite ? !props.MGMManage.inviteBn : !props.MGMManage.invitedBn}
              style={{ marginTop: 70, textAlign: 'center' }}
              onClick={async () => {
                if (isIinvite ? !props.MGMManage.inviteKS : !props.MGMManage.invitedKS)
                  return !message.error('请填写赠送课时')
                if (isIinvite ? !props.MGMManage.inviteKM : !props.MGMManage.invitedKM)
                  return !message.error('请选择科目')
                await props.loadUp(true)
                let { status } = await API.post('/biz/sales/mgm/present', {
                  inviteId: props.MGMManage.selInviteId,
                  clientId: invite?.clientId,
                  subjectId: isIinvite ? props.MGMManage.inviteKM?.key : props.MGMManage.invitedKM?.key,
                  presentCount: isIinvite ? props.MGMManage.inviteKS : props.MGMManage.invitedKS
                })
                await setTimeout(() => {}, 1000)
                await props.loadUp(false)
                if (!status) return false
                await message.success('操作成功！')
                let { data, status: ok } = await API.get('/biz/sales/mgm/present/info', {
                  inviteId: props.MGMManage.selInviteId
                })
                if (!ok) return false
                await props.infoUp(data)
                props.isEditUp(true)
              }}
            >
              确定赠送
            </Button>
          </Col>
        </Row>
      </div>
    )
  )
}
let T2 = ({ invite }) => (
  <div className={'nobg'} key={45}>
    {invite?.isPresent && (
      <Item
        colNum={2}
        rowStyle={{ width: '86%' }}
        data={[
          { name: '编号', value: invite?.clientId },
          { name: '姓名', value: `${invite?.clientName}${invite?.showNoDeal ? '（非成交学员）' : ''}` },
          { name: '赠送合同号', value: invite?.contractId },
          { name: '赠送课时', value: invite?.presentCount + ' （合同金额：0）' },
          { name: '科目', value: invite?.subject },
          { name: '操作时间', value: `${invite?.createdBy}操作于${invite?.createdOn}` }
        ]}
      />
    )}
  </div>
)
let tpl = ({ invite, isIinvite, props }) => (
  <div key={'8633' + isIinvite} style={{ marginTop: 20 }}>
    {isIinvite ? '||  邀请人：' : '||  被邀请人：'}
    <T1 {...props} invite={invite} isIinvite={isIinvite} />
    <T2 {...props} invite={invite} isIinvite={isIinvite} />
  </div>
)

function ZengSong(props) {
  return rj({
    tag: Modal,
    className: 'zs-css',
    visible: props.MGMManage.zsModal,
    width: 880,
    onCancel: () => {
      props.inviteKSUp('')
      props.invitedKSUp('')
      props.inviteKMUp(undefined)
      props.invitedKMUp(undefined)
      props.zsModalUp(false)
      props.inviteBnUp(false)
      props.invitedBnUp(false)
      props.MGMManage.isEdit && props.refresh()
    },
    footer: false,
    title: '赠送课时',
    body: [
      { tag: Icon, type: 'check-circle', style: { fontSize: 21, color: '#238903' } },
      { tag: 'span', body: 'MGM邀请成功！', style: { fontSize: 16, marginLeft: 10 } },
      `(合同编号：${props.MGMManage.info?.contractId}，购买课时数：${props.MGMManage.info?.lessonCount})`,
      { tag: 'br' },
      props.MGMManage.info?.inviteCountLimit &&
        props.MGMManage.info?.invitedCountLimit && {
          body: [
            { body: '您可赠送的邀请人上限：' },
            {
              tag: 'span',
              style: { fontSize: 20, color: '#f00' },
              body: props.MGMManage.info?.inviteCountLimit
            },
            { body: '课时，' },
            { body: '被邀请人上限：' },
            {
              tag: 'span',
              style: { fontSize: 20, color: '#f00' },
              body: props.MGMManage.info?.invitedCountLimit
            },
            '课时'
          ]
        },
      tpl({ invite: props.MGMManage.info?.invite, isIinvite: true, props }),
      tpl({ invite: props.MGMManage.info?.invited, props })
    ]
  })
}

export default ZengSong

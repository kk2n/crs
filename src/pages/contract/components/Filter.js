import { Button, Input, DatePicker } from 'antd'
import React from 'react'
import { isNaN } from 'underscore'
import { Select } from 'ymcmp'
import API from '../../../utils/axios'
const { RangePicker } = DatePicker
function num(x) {
  if (isNaN(x)) return undefined
  return x
}
export default function Filter(props) {
  return (
    <div className="topShow">
      客户编号：
      <Input
        style={{ width: 160, marginRight: 10 }}
        value={props.ContractList.searchUserId}
        placeholder="请输入"
        maxLength={8}
        onChange={e => props.searchUserIdUp(num(parseInt(e.target.value)))}
      />
      合同编号：
      <Input
        style={{ width: 160, marginRight: 10 }}
        value={props.ContractList.searchContractId}
        placeholder="请输入"
        maxLength={8}
        onChange={e => props.searchContractIdUp(num(parseInt(e.target.value)))}
      />
      合同状态：
      <Select
        API={API}
        style={{ width: 160, marginRight: 10 }}
        placeholder="请选择"
        value={props.ContractList.selContractStatus}
        url={'/biz/sales/dict/getContractStatusList'}
        onChange={props.selContractStatusUp}
      />
      年级：
      <Select
        vt={'gradeId,gradeName'}
        API={API}
        url={'/biz/sales/dict/grade'}
        style={{ width: 160, marginRight: 10 }}
        placeholder="请选择"
        value={props.ContractList.grade}
        onChange={props.gradeUp}
      />
      <div style={{ height: 10 }} />
      合同类型：
      <Select
        API={API}
        noMultiple
        url={'/biz/sales/dict/getContractTypeList'}
        style={{ width: 160, marginRight: 10 }}
        placeholder="请选择"
        value={props.ContractList.selContractType}
        onChange={props.selContractTypeUp}
      />
      {props.Common.permission?.DRW_SHOP_LIST_SHOW && (
        <span>
          门店：
          <Select
            API={API}
            allowClear
            noMultiple
            style={{ width: 160, marginRight: 10 }}
            placeholder="请选择"
            value={props.ContractList.mendianList}
            url="/biz/sales/contract/getShopList"
            vt="staffList,shopName"
            onChange={async v => {
              await props.pageNumUp(1)
              props.mendianListUp(v)
            }}
          />
        </span>
      )}
      班主任：
      <Select
        API={API}
        noMultiple
        url={'/biz/sales/contract/distributeCrList'}
        style={{ width: 160, marginRight: 10 }}
        placeholder="请选择"
        value={props.ContractList.selCR}
        vt={'userId,realName'}
        onChange={props.selCRUp}
      />
      合同属性：
      <Select
        noMultiple
        API={API}
        url={'/biz/sales/dict/getContractPropList'}
        style={{ width: 160, marginRight: 10 }}
        placeholder="请选择"
        value={props.ContractList.contractProp}
        onChange={props.contractPropUp}
      />
      <div style={{ height: 10 }} />
      支付时间：
      <RangePicker style={{ width: 220, marginRight: 10 }} value={props.ContractList.zfsj} onChange={props.zfsjUp} />
      退费时间：
      <RangePicker style={{ width: 220, marginRight: 10 }} value={props.ContractList.tfsj} onChange={props.tfsjUp} />
      学生：
      <Input
        style={{ width: 140, marginRight: 10 }}
        value={props.ContractList.studentName}
        placeholder="请输入学生姓名"
        maxLength={8}
        onChange={e => props.studentNameUp(e.target.value)}
      />
      电话：
      <Input
        maxLength={11}
        style={{ width: 140, marginRight: 10 }}
        value={props.ContractList.searchNumber}
        placeholder="请输入"
        onChange={e => props.searchNumberUp(num(parseInt(e.target.value)))}
      />
      <div style={{ height: 10 }} />
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <Button
          type="primary"
          style={{ marginRight: 10 }}
          onClick={async () => {
            await props.pageSizeUp(10)
            await props.pageNumUp(1)
            props.getContractList()
          }}
        >
          查询
        </Button>
        <Button
          onClick={async () => {
            await props.filterClear()
            props.history.push('/crm/hetong')
            props.getContractList()
          }}
        >
          重置
        </Button>
      </div>
    </div>
  )
}

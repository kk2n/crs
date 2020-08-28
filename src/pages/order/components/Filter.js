import { Button, Input } from 'antd'
import SearchSel from '../../../components/SearchSel'
import React from 'react'
import { isNaN } from 'underscore'
import { Select } from 'ymcmp'
import API from '../../../utils/axios'

function num(x) {
  if (isNaN(x)) return undefined
  return x
}

export default function Filter(props) {
  return (
    <div className="topShow">
      客户编号：
      <Input
        style={{ width: 180, marginRight: 20 }}
        value={props.OrderList.searchUserId}
        placeholder="请输入"
        maxLength={8}
        onChange={e => props.searchUserIdUp(num(parseInt(e.target.value)))}
      />
      电话号码：
      <Input
        style={{ width: 180, marginRight: 20 }}
        value={props.OrderList.searchNumber}
        placeholder="请输入"
        maxLength={11}
        onChange={e => props.searchNumberUp(num(parseInt(e.target.value)))}
      />
      订单状态：
      <SearchSel
        showArrow
        allowClear
        url={'/biz/sales/dict/getOrderStatusList'}
        vt={'statusId,statusDesc'}
        style={{ width: 280, marginRight: 20 }}
        placeholder="请选择"
        value={props.OrderList.selOrderStatus}
        onChange={props.selOrderStatusUp}
      />
      <div style={{ height: 10 }} />
      订单编号：
      <Input
        style={{ width: 180, marginRight: 20 }}
        value={props.OrderList.searchOrderId}
        placeholder="请输入"
        maxLength={8}
        onChange={e => props.searchOrderIdUp(num(parseInt(e.target.value)))}
      />
      {/*订单类别：*/}
      {/*<Sel*/}
      {/*vt="id,val"*/}
      {/*data={[{ id: -1, val: '全部' }, { id: 0, val: '线上' }, { id: 1, val: '线下' }]}*/}
      {/*style={{ width: 180, marginRight: 20 }}*/}
      {/*placeholder="请选择"*/}
      {/*value={props.OrderList.selOrderType}*/}
      {/*onChange={props.selOrderTypeUp}*/}
      {/*/>*/}
      订单属性：
      <SearchSel
        noMultiple
        showArrow
        allowClear
        url={'/biz/sales/dict/getOrderPropList'}
        vt={'statusId,statusDesc'}
        style={{ width: 180, marginRight: 20 }}
        placeholder="请选择"
        value={props.OrderList.selProperty}
        onChange={props.selPropertyUp}
      />
      合同编号：
      <Input
        style={{ width: 280, marginRight: 20 }}
        value={props.OrderList.searchContractId}
        placeholder="请输入"
        maxLength={8}
        onChange={e => props.searchContractIdUp(num(parseInt(e.target.value)))}
      />
      <div style={{ height: 10 }} />
      学生姓名：
      <Input
        style={{ width: 180, marginRight: 20 }}
        value={props.OrderList.studentName}
        placeholder="请输入"
        maxLength={8}
        onChange={e => props.studentNameUp(e.target.value)}
      />
      科目：
      <SearchSel
        showArrow
        allowClear
        url={'/biz/sales/stk/plan/subject/list'}
        vt={'value,label'}
        style={{ width: 208, marginRight: 20 }}
        placeholder="请选择"
        value={props.OrderList.selSubject}
        onChange={props.selSubjectUp}
      />
      班主任：
      <Select
        API={API}
        noMultiple
        url={'/biz/sales/contract/distributeCrList'}
        style={{ width: 150, marginRight: 10 }}
        placeholder="请选择"
        value={props.OrderList.selCR}
        vt={'userId,realName'}
        onChange={props.selCRUp}
      />
      老师：
      <Select
        debounceTime={1500}
        API={API}
        noMultiple
        url={'/biz/sales/order/list/teacher'}
        params={{ teacherName: props.OrderList.selTeacher }}
        style={{ width: 150, marginRight: 10 }}
        placeholder="请输入老师姓名"
        value={props.OrderList.selTeacher}
        vt={'teacherId,teacherName'}
        onChange={props.selTeacherUp}
        onSearch={props.selTeacherUp}
      />
      <div style={{ height: 10 }} />
      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          onClick={async () => {
            await props.pageNumUp(1)
            props.getList()
          }}
          style={{ marginRight: 10 }}
        >
          查询
        </Button>
        <Button
          onClick={async () => {
            await props.filterClear()
            props.history.push('/crm/orderList')
            //props.getList()
          }}
        >
          重置
        </Button>
      </div>
    </div>
  )
}

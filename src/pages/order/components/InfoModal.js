import { Modal, Table, Row, Col } from 'antd'
import React, { Component } from 'react'
import API from '../../../utils/axios'

export default class Filter extends Component {
  state = {
    keList: [],
    lx: {},
    liuData: []
  }
  async componentDidMount() {
    //获取订单流
    let { data: liuData } = await API.get('/biz/sales/order/orderFlowList', { contractId: this.props.orderId })
    //课时列表
    let { data } = await API.get('/biz/sales/lesson/getLessonListByContractId', { contractId: this.props.orderId })
    this.setState({
      liuData,
      keList: data.map(a => {
        return {
          id: a.lessonId,
          ks: a.courseHours,
          time: a.startTime + '~' + (a.endTime && a.endTime.split(' ')[1]),
          status: a.statusDesc
        }
      })
    })
    //联系人
    let { data: data3 } = await API.get('/biz/sales/order/orderLinkman', { contractId: this.props.orderId })
    await this.setState({
      lx: {
        ddh: data3.contractId,
        htbh: data3.contractNo,
        fzr: data3.chargeInfo.chargeRealName,
        fzrTel: data3.chargeInfo.chargeMobile,
        zg: data3.chargeManagerInfo.chargeManagerRealName,
        zgTel: data3.chargeManagerInfo.chargeManagerMobile,
        xkTeacher: data3.teacherInfo.teacherRealName,
        xkTeacherTel: data3.teacherInfo.teacherMobile,
        jxTeacher: data3.teacherManageInfo.teacherManagerRealName,
        jxTeacherTel: data3.teacherManageInfo.teacherManagerMobile
      }
    })
  }
  render() {
    let kebiaoHeader = [
      {
        title: '课程编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '课时',
        dataIndex: 'ks',
        key: 'ks'
      },
      {
        title: '上课时间',
        dataIndex: 'time',
        key: 'time'
      },
      {
        title: '课程状态',
        dataIndex: 'status',
        key: 'status'
      }
    ]
    let liuHeader = [
      {
        title: '操作时间',
        dataIndex: 'createdOn',
        key: 'createdOn'
      },
      {
        title: '操作状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus'
      },
      {
        title: '操作人',
        dataIndex: 'createdBy',
        key: 'createdBy'
      },
      {
        title: '操作备注',
        dataIndex: 'memo',
        key: 'memo'
      }
    ]
    return (
      <Modal
        centered
        visible={this.props.OrderList.infoModalShow}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={780}
        footer={null}
      >
        <h1 style={{ marginBottom: 20 }}>
          订单号：{this.state.lx.ddh}
          <span style={{ fontSize: 19 }}>&nbsp;&nbsp;&nbsp;&nbsp;所属合同编号：{this.state.lx.htbh}</span>
        </h1>
        <div className={'lxr-yangs'}>
          <Row style={{ lineHeight: 3 }}>
            <Col span={12}>负责人：{this.state.lx.fzr}</Col>
            <Col span={12}>电话：{this.state.lx.fzrTel}</Col>
            <Col span={12}>负责人主管：{this.state.lx.zg}</Col>
            <Col span={12}>电话：{this.state.lx.zgTel}</Col>
            <Col span={12}>学科老师：{this.state.lx.xkTeacher}</Col>
            <Col span={12}>电话：{this.state.lx.xkTeacherTel}</Col>
            <Col span={12}>教学经理：{this.state.lx.jxTeacher}</Col>
            <Col span={12}>电话：{this.state.lx.jxTeacherTel}</Col>
          </Row>
        </div>
        <div style={{ marginTop: 30 }}>
          <h2 style={{ marginBottom: 10 }}>课表</h2>
          <Table rowKey={'id'} dataSource={this.state.keList} columns={kebiaoHeader} bordered pagination={false} />
        </div>
        <div style={{ marginTop: 30 }}>
          <h2 style={{ marginBottom: 10 }}>订单流</h2>
          <Table
            rowKey={'createdOn'}
            dataSource={this.state.liuData || []}
            columns={liuHeader}
            bordered
            pagination={false}
          />
        </div>
      </Modal>
    )
  }
}

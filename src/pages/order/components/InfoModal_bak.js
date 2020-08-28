import { Modal, Tabs, Table } from 'antd'
import React, { Component } from 'react'
import API from '../../../utils/axios'

const { TabPane } = Tabs
export default class Filter extends Component {
  state = {
    keList: [],
    ddlList: [],
    lx: {}
  }
  async componentDidMount() {
    //课时列表
    let { data } = await API.get('/biz/open/copartner/dict/kechengList', { orderId: this.props.orderId })
    this.setState({
      keList: data
    })

    //订单流
    let { data: data2 } = await API.get('/biz/open/copartner/dict/ddlList', { orderId: this.props.orderId })
    this.setState({
      ddlList: data2
    })

    //联系人
    let { data: data3 } = await API.get('/biz/open/copartner/dict/lxr', { orderId: this.props.orderId })
    await this.setState({
      lx: data3
    })
    console.log('this.state.lx', this.state.lx)
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
    let ddlHeader = [
      {
        title: '操作时间',
        dataIndex: 'time',
        key: 'time'
      },
      {
        title: '操作状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '操作人',
        dataIndex: 'ren',
        key: 'ren'
      },
      {
        title: '操作备注',
        dataIndex: 'bz',
        key: 'bz'
      }
    ]
    return (
      <Modal
        visible={this.props.OrderList.infoModalShow}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={600}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="课表" key="1">
            <Table rowKey={'id'} dataSource={this.state.keList} columns={kebiaoHeader} />
          </TabPane>
          <TabPane tab="订单流" key="2">
            <Table rowKey={'id'} dataSource={this.state.keList} columns={ddlHeader} />
          </TabPane>
          <TabPane tab="联系人" key="3">
            <div className={'lxr-yangs'}>
              <ul>
                <li className={'left'}>负责人：</li>
                <li>{this.state.lx.fzr}</li>
              </ul>
              <ul>
                <li className={'left'}>电话：</li>
                <li>{this.state.lx.fzrTel}</li>
              </ul>
              <ul>
                <li className={'left'}>负责人主管：</li>
                <li>{this.state.lx.zg}</li>
              </ul>
              <ul>
                <li className={'left'}>负责人主管：</li>
                <li>{this.state.lx.zgTel}</li>
              </ul>
              <ul>
                <li className={'left'}>学科老师：</li>
                <li>{this.state.lx.xkTeacher}</li>
              </ul>
              <ul>
                <li className={'left'}>电话：</li>
                <li>{this.state.lx.xkTeacherTel}</li>
              </ul>
              <ul>
                <li className={'left'}>教学经理：</li>
                <li>{this.state.lx.jxTeacher}</li>
              </ul>
              <ul>
                <li className={'left'}>电话：</li>
                <li>{this.state.lx.jxTeacherTel}</li>
              </ul>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}

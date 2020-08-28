import React, { Component } from 'react'
import { connect } from './orderListModel'
import './orderList.scss'
import Filter from './components/Filter'
import OrderTable from './components/OrderTable'
import InfoModal from './components/InfoModal'
import HTeacherModal from './components/HTeacherModal'
import CFModal from './components/CFModal'
import PKModal from './components/PKModal'
import TingkeModal from './components/TingkeModal'

@connect
export default class OrderList extends Component {
  async componentDidMount() {
    if (this.props.history.location.search.indexOf('index=6') !== -1) {
      let clientId = this.props.history.location.search.split('=')[2]
      await this.props.searchUserIdUp(clientId)
    }
    this.getOrderList()
  }
  //请求表格数据
  getOrderList = () => {
    let orderList = this.props.OrderList
    console.log('orderList', orderList)
    let params = {
      teacherId: orderList.selTeacher?.key,
      pageNum: orderList.pageNum,
      pageSize: orderList.pageSize,
      clientId: orderList.searchUserId,
      studentParentTel: orderList.searchNumber,
      orderStatusIdList: orderList.selOrderStatus?.map(a => a.key),
      orderId: orderList.searchOrderId,
      isUnderLine: orderList.selOrderType,
      orderProp: orderList.selProperty?.key,
      contractNo: orderList.searchContractId,
      studentName: orderList.studentName,
      subjectIdsList: orderList.selSubject?.map(a => a.key),
      crId: orderList.selCR?.key
    }
    this.props.getOrderList(params)
  }
  render() {
    return (
      <div className="orderList">
        <Filter {...this.props} getList={this.getOrderList} />
        <OrderTable
          {...this.props}
          getList={this.getOrderList}
          showModal={() => this.props.infoModalShowUp(true)}
          showHTeacherModal={() => this.props.hTeacherModalShowUp(true)}
          showCFModal={() => this.props.cfModalShowUp(true)}
          showPKModal={() => this.props.pkModalShowUp(true)}
        />
        {/*详情*/}
        {this.props.OrderList.infoModalShow && (
          <InfoModal
            {...this.props}
            orderId={this.props.OrderList.orderId}
            handleOk={() => this.props.infoModalShowUp(false)}
            handleCancel={() => this.props.infoModalShowUp(false)}
          />
        )}
        {/*换老师*/}
        {this.props.OrderList.hTeacherModalShow && (
          <HTeacherModal
            {...this.props}
            orderId={this.props.OrderList.orderId}
            handleOk={() => this.props.hTeacherModalShowUp(false)}
            handleCancel={() => this.props.hTeacherModalShowUp(false)}
          />
        )}
        {/*订单拆分*/}
        {this.props.OrderList.cfModalShow && (
          <CFModal
            {...this.props}
            orderId={this.props.OrderList.orderId}
            handleOk={() => this.props.cfModalShowUp(false)}
            handleCancel={() => this.props.cfModalShowUp(false)}
          />
        )}
        {/*排课*/}
        {this.props.OrderList.pkModalShow && (
          <PKModal
            {...this.props}
            getList={this.getOrderList}
            orderId={this.props.OrderList.orderId}
            handleOk={() => this.props.pkModalShowUp(false)}
            handleCancel={() => this.props.pkModalShowUp(false)}
          />
        )}
        {/*停课原因*/}
        {this.props.OrderList.tingkeModal && (
          <TingkeModal
            {...this.props}
            getList={this.getOrderList}
            handleOk={() => this.props.tingkeModalUp(false)}
            handleCancel={() => this.props.tingkeModalUp(false)}
          />
        )}
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Button, message } from 'antd'
import './contractList.scss'
import { connect } from './contractListModel'
import SearchInfo from './components/Filter'
import ContractTable from './components/ContractTable'
import BackoutModal from './components/BackoutModal'
import DelectModal from './components/DelectModal'
import TeacherModal from './components/TeacherModel'
import EditModal from './components/EditModal'
import InfoModal from './components/InfoModal'
import FenPeiCR from './components/FenPeiCR'
// import moment from 'moment'
import AddZengSong from './components/AddZengSong'
import { rest } from 'underscore'
import { fmoment } from '../../utils/function'
import API from '../../utils/axios'
import downAPI, { download } from '../../utils/downAjax'

@connect
export default class ContractList extends Component {
  async componentDidMount() {
    if (this.props.history.location.search.indexOf('index=4') !== -1) {
      await this.props.selContractStatusUp([{ key: 1, label: '未支付' }])
    }
    this.getContractList()
  }
  //请求表格数据
  getContractList = () => {
    let obj = this.props.ContractList
    let params = {
      contractPropList: obj.contractProp?.key,
      gradeIds: obj.grade?.map(a => a.key),
      studentName: obj.studentName,
      pageNum: obj.pageNum,
      pageSize: obj.pageSize,
      clientFid: obj.searchUserId,
      studentParentTel: obj.searchNumber,
      orderPartner: obj.selPaymentType?.key,
      contractType: obj.selContractType?.key,
      crId: obj.selCR?.key,
      contractStatusIdList: obj.selContractStatus?.map(a => a.key),
      contractNo: obj.searchContractId,
      payTimeStart: fmoment(obj.zfsj[0]),
      payTimeEnd: fmoment(obj.zfsj[1]),
      refundStartDate: fmoment(obj.tfsj[0]),
      refundEndDate: fmoment(obj.tfsj[1]),
      shopStaffIdList: rest(obj.mendianList?.key || [])
    }
    this.props.getContractList(params)
  }
  //导出
  daochu = async () => {
    let obj = this.props.ContractList
    let params = {
      contractPropList: obj.contractProp?.key,
      gradeIds: obj.grade?.map(a => a.key),
      studentName: obj.studentName,
      pageNum: obj.pageNum,
      pageSize: obj.pageSize,
      clientFid: obj.searchUserId,
      studentParentTel: obj.searchNumber,
      orderPartner: obj.selPaymentType?.key,
      contractType: obj.selContractType?.key,
      crId: obj.selCR?.key,
      contractStatusIdList: obj.selContractStatus?.map(a => a.key),
      contractNo: obj.searchContractId,
      payTimeStart: fmoment(obj.zfsj[0]),
      payTimeEnd: fmoment(obj.zfsj[1]),
      refundStartDate: fmoment(obj.tfsj[0]),
      refundEndDate: fmoment(obj.tfsj[1]),
      shopStaffIdList: rest(obj.mendianList?.key || [])
    }
    let { status } = await API.post('/biz/sales/contract/export/list', { ...params, checkFlag: true })
    if (!status) return false
    let { data } = await downAPI.post('/biz/sales/contract/export/list', { ...params, checkFlag: false })
    if (data?.type !== 'text/xml') {
      message.error('出现错误！')
      return false
    }
    download(data, `合同报表.xls`)
  }
  render() {
    return (
      <div className="contractList">
        <SearchInfo {...this.props} getContractList={this.getContractList} />
        <div style={{ margin: '10px 0 10px auto', height: 'auto', overflow: 'hidden' }}>
          {this.props.Common.permission?.DRW_CONTRACT_MANAGE_PRESENT_CONTRACT && (
            <Button
              type="primary"
              style={{ float: 'right', marginLeft: 10 }}
              onClick={() => this.props.zengSongModalShowUp(true)}
            >
              赠送合同
            </Button>
          )}
          <Button type="primary" style={{ float: 'right' }} onClick={this.daochu}>
            导出报表
          </Button>
        </div>
        <ContractTable
          {...this.props}
          getContractList={this.getContractList}
          showBackoutModal={() => this.props.showBackoutModalUp(true)}
        />
        {/*详情*/}
        {this.props.ContractList.infoModalShow && (
          <InfoModal
            {...this.props}
            orderId={this.props.ContractList.orderId}
            handleOk={() => this.props.infoModalShowUp(false)}
            handleCancel={() => this.props.infoModalShowUp(false)}
          />
        )}
        {/*撤销合同*/}
        {this.props.ContractList.showBackoutModal && (
          <BackoutModal
            {...this.props}
            getContractList={this.getContractList}
            contractId={this.props.ContractList.contractId}
            handleOk={() => this.props.showBackoutModalUp(false)}
            handleCancel={() => this.props.showBackoutModalUp(false)}
          />
        )}
        {/*删除合同*/}
        {this.props.ContractList.showDelectModal && (
          <DelectModal
            {...this.props}
            getContractList={this.getContractList}
            contractId={this.props.ContractList.contractId}
            handleOk={() => this.props.showDelectModalUp(false)}
            handleCancel={() => this.props.showDelectModalUp(false)}
          />
        )}
        {/*分配老师*/}
        {this.props.ContractList.showTeacherModal && (
          <TeacherModal
            {...this.props}
            getContractList={this.getContractList}
            contractId={this.props.ContractList.contractId}
            clientName={this.props.ContractList.clientName}
            handleOk={() => this.props.showTeacherModalUp(false)}
            handleCancel={() => this.props.showTeacherModalUp(false)}
          />
        )}
        {/*修改合同*/}
        {this.props.ContractList.showEditModal && (
          <EditModal
            {...this.props}
            getContractList={this.getContractList}
            contractId={this.props.ContractList.contractId}
            handleOk={() => this.props.showEditModalUp(false)}
            handleCancel={() => this.props.showEditModalUp(false)}
          />
        )}
        {/*分配CR*/}
        {this.props.ContractList.isFenPeiCR && (
          <FenPeiCR
            {...this.props}
            getContractList={this.getContractList}
            clientFid={this.props.ContractList.fenPeiClientFid}
            contractId={this.props.ContractList.contractId}
            handleOk={() => this.props.isFenPeiCRUp(false)}
            handleCancel={() => this.props.isFenPeiCRUp(false)}
            clientName={this.props.ContractList.clientName}
          />
        )}
        {/*新增赠送合同*/}
        {this.props.ContractList.zengSongModalShow && <AddZengSong {...this.props} />}
      </div>
    )
  }
}

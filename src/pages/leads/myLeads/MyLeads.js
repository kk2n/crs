import React, { Component } from 'react'
import { connect } from './myLeadsModel'
import './myleads.scss'
import Sel from '../../../components/Sel'
import { Input, DatePicker, Button, Table, Modal, message } from 'antd'
import SearchSel from '../../../components/SearchSel'
import moment from 'moment'
import API from '../../../utils/axios'

const { confirm } = Modal
const { RangePicker } = DatePicker

@connect
export default class MyLeads extends Component {
  componentDidMount() {
    //获取门店
    this.props.getShopList()
    //获取leads
    this.getMyLeadsList()
  }
  //获取leads列表
  getMyLeadsList = () => {
    let {
      getListParam,
      selGrade,
      searchVal,
      tabIndex,
      selSubject,
      takeDate = [],
      followDate,
      selShop,
      clientFrom
    } = this.props.MyLeads
    this.props.getleadsList({
      orderField: getListParam[tabIndex].orderField,
      currentGradeIds: selGrade,
      pageSize: getListParam[tabIndex].pageSize,
      pageNum: getListParam[tabIndex].pageNum,
      likeField: searchVal,
      clientFrom: clientFrom, //E: 手动导入 B: 后台新建
      orderType: getListParam[tabIndex].orderType,
      interestSubjects: selSubject,
      clientStatus: tabIndex,
      shopId: selShop,
      takeStartDate: takeDate[0] ? moment(takeDate[0]).format('YYYY-MM-DD') : null,
      takeEndDate: takeDate[1] ? moment(takeDate[1]).format('YYYY-MM-DD') : null,
      followStartDate: followDate[0] ? moment(followDate[0]).format('YYYY-MM-DD') : null,
      followEndDate: followDate[1] ? moment(followDate[1]).format('YYYY-MM-DD') : null
    })
  }
  //复活
  fuhuOpen = params => {
    confirm({
      title: params.operateType === 2 ? '是否复活该leads并加入自己的联系中？' : '是否确定将该leads放入死海?',
      content: '',
      onOk: async () => {
        let { status } = await API.post('/biz/open/copartner/leads/abandonAndResurgence', params)
        if (!status) {
          return false
        }
        message.success(params.operateType === 2 ? '恭喜操作成功' : '加入死海成功')
      }
    })
  }
  //表头
  columns = () => [
    {
      title: 'Leads姓名',
      dataIndex: 'leadsName',
      key: 'leadsName',
      render: (value, info) => {
        return (
          <div>
            <div className="myleads-table">
              <span className="myleads-name">{value}</span>
            </div>
            <div className="myleads-tag">
              {info.interestSubject && <i className="ke-mu">{info.interestSubject}</i>}
              {info.currentGrade && <i className="grade">{info.currentGrade}</i>}
            </div>
          </div>
        )
      }
    },
    {
      title: '手机号',
      dataIndex: 'phoneNo',
      key: 'phoneNo'
    },
    this.props.MyLeads.tabIndex === 3 ? { title: '来源', dataIndex: 'clientFrom', key: 'clientFrom' } : {},
    {
      title: '加入时间',
      dataIndex: 'takeDate',
      key: 'takeDate'
    },
    [2, 3].includes(this.props.MyLeads.tabIndex)
      ? { title: '追踪状态', dataIndex: 'followStatus', key: 'followStatus' }
      : {},
    [2, 3].includes(this.props.MyLeads.tabIndex)
      ? { title: '最近沟通时间', dataIndex: 'newFollowDate', key: 'newFollowDate' }
      : {},
    {
      title: '操作',
      dataIndex: 'leadsId',
      key: 'leadsId',
      render: v => {
        if (this.props.MyLeads.tabIndex === 1) {
          return (
            <div>
              <span style={{ paddingRight: 10 }}>编辑</span>
              <span>追踪</span>
            </div>
          )
        } else if (this.props.MyLeads.tabIndex === 2) {
          return (
            <div>
              <span style={{ color: '#4a82ff', cursor: 'pointer', paddingRight: 10 }}>编辑</span>
              <span style={{ color: '#4a82ff', cursor: 'pointer', paddingRight: 10 }}>追踪</span>
              <span style={{ color: '#4a82ff', cursor: 'pointer', paddingRight: 10 }}>放弃</span>
              <span style={{ color: '#4a82ff', cursor: 'pointer', paddingRight: 10 }}>试听</span>
              <span style={{ color: '#4a82ff', cursor: 'pointer' }}>新建合同</span>
            </div>
          )
        } else if (this.props.MyLeads.tabIndex === 3) {
          return (
            <div>
              <span
                style={{ color: '#4a82ff', cursor: 'pointer' }}
                onClick={() =>
                  this.fuhuOpen({
                    leadsId: v,
                    operateType: 2
                  })
                }
              >
                复活
              </span>
            </div>
          )
        }
        return null
      }
    }
  ]

  render() {
    return (
      <div>
        当前门店：
        <Sel
          value={this.props.MyLeads.selShop}
          data={this.props.MyLeads.shopList}
          vt={'shopId,shopName'}
          style={{ width: 200 }}
          onChange={async v => {
            await this.props.selShopUp(v)
            this.getMyLeadsList()
          }}
        />
        <div className={'filter-css'}>
          <Input
            placeholder="请输入Leads姓名/编号/手机"
            value={this.props.MyLeads.searchVal}
            style={{ width: 210, marginRight: 10 }}
            onChange={v => this.props.searchValUp(v.target.value)}
          />
          <SearchSel
            url={'/biz/open/copartner/dict/grade'}
            vt={'gradeId,gradeName'}
            style={{ width: 110, marginRight: 10 }}
            placeholder="年级"
            value={this.props.MyLeads.selGrade}
            onChange={this.props.selGradeUp}
          />
          <SearchSel
            url={'/biz/open/copartner/dict/subject'}
            vt={'subjectId,subjectName'}
            style={{ width: 110, marginRight: 10 }}
            placeholder="科目"
            value={this.props.MyLeads.selSubject}
            onChange={this.props.selSubjectUp}
          />
          加入时间：
          <RangePicker
            value={this.props.MyLeads.takeDate}
            className="search-gaoji-sel"
            onChange={this.props.takeDateUp}
          />
          {[2, 3].includes(this.props.MyLeads.tabIndex) && <div style={{ marginTop: 10 }} />}
          {[2, 3].includes(this.props.MyLeads.tabIndex) && <span>来源：</span>}
          {[2, 3].includes(this.props.MyLeads.tabIndex) && (
            <Sel
              value={this.props.MyLeads.clientFrom}
              data={[
                { value: null, name: '全部' },
                { value: 'E', name: '手动导入' },
                { value: 'B', name: ' 后台新建' }
              ]}
              vt={'value,name'}
              style={{ width: 100 }}
              onChange={async v => {
                await this.props.clientFromUp(v)
                this.getMyLeadsList()
              }}
            />
          )}
          {this.props.MyLeads.tabIndex === 2 && <span>&nbsp;&nbsp;最近沟通时间：</span>}
          {this.props.MyLeads.tabIndex === 2 && (
            <RangePicker
              value={this.props.MyLeads.followDate}
              className="search-gaoji-sel"
              onChange={this.props.followDateUp}
            />
          )}
          <Button style={{ float: 'right' }} onClick={this.props.filterCleal}>
            清空
          </Button>
          <Button type={'primary'} style={{ float: 'right', marginRight: 10 }} onClick={this.getMyLeadsList}>
            查询
          </Button>
        </div>
        <div style={{ marginTop: 20 }}>
          <div className={'change-sel-css'}>
            <span
              className={this.props.MyLeads.tabIndex === 1 ? 'tab on-it' : 'tab'}
              onClick={async () => {
                await this.props.tabIndexUp(1)
                await this.props.clientFromUp(null)
                await this.props.followDateUp([])
                this.getMyLeadsList()
              }}
            >
              新leads
            </span>
            <span
              className={this.props.MyLeads.tabIndex === 2 ? 'tab on-it' : 'tab'}
              onClick={async () => {
                await this.props.tabIndexUp(2)
                this.getMyLeadsList()
              }}
            >
              联系中
            </span>
            <span
              className={this.props.MyLeads.tabIndex === 3 ? 'tab on-it' : 'tab'}
              onClick={async () => {
                await this.props.tabIndexUp(3)
                await this.props.followDateUp([])
                this.getMyLeadsList()
              }}
            >
              死海
            </span>
            <Button
              type={'primary'}
              style={{ float: 'right', marginRight: 10, marginTop: 16 }}
              onClick={this.getMyLeadsList}
            >
              新建Leads
            </Button>
          </div>
        </div>
        <div style={{ marginTop: 10, borderTop: '1px solid #dedede' }}>
          <Table
            rowKey={'leadsId'}
            columns={this.columns()}
            dataSource={(this.props.MyLeads.getleadsListRes.data || {}).list || []}
            pagination={{
              current: (this.props.MyLeads.getleadsListRes.data || {}).pageNum,
              pageSize: (this.props.MyLeads.getleadsListRes.data || {}).pageSize,
              total: (this.props.MyLeads.getleadsListRes.data || {}).total,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30', '50', '100'],
              showTotal: (t, r) => (
                <div style={{ float: 'left' }}>
                  当前显示{r[0]}-{r[1]}条/共{t}条
                </div>
              ),
              onChange: async page => {
                await this.props.pageNumUp({ pageNum: page, type: this.props.MyLeads.tabIndex })
                this.getMyLeadsList()
              },
              onShowSizeChange: async (_, size) => {
                await this.props.pageNumUp({ pageNum: 1, type: this.props.MyLeads.tabIndex })
                await this.props.pageSizeUp({ pageSize: size, type: this.props.MyLeads.tabIndex })
                this.getMyLeadsList()
              }
            }}
          />
        </div>
      </div>
    )
  }
}

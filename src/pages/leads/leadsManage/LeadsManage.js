import React, { Component } from 'react'
import { connect } from './leadsManageModel'
import './leadsManage.scss'
import Sel from '../../../components/Sel'
import { Input, DatePicker, Button, Tabs, Table, Tag } from 'antd'
import SearchSel from '../../../components/SearchSel'
const { RangePicker } = DatePicker
const { TabPane } = Tabs
const moreTabBarExtraContent = (
  <div>
    <Button style={{ marginRight: '20px' }}>分配店员</Button>
    <Button type={'primary'}>导入leads</Button>
  </div>
)
// 表格假数据
const columns = [
  {
    align: 'center',
    title: 'Name',
    dataIndex: 'name',
    render: text => (
      <div>
        <a>{text}</a>
        <div>
          <Tag color="green">八年级</Tag>
          <Tag color="magenta">数学</Tag>
        </div>
      </div>
    ),
    width: 150
  },
  {
    align: 'center',
    title: 'Age',
    dataIndex: 'age'
  },
  {
    align: 'center',
    title: 'Address',
    dataIndex: 'address'
  },
  {
    align: 'center',
    title: '加入时间',
    dataIndex: 'time',
    sorter: (a, b) => a.time - b.time
  },
  {
    align: 'center',
    title: '操作',
    render: () => (
      <div>
        <a style={{ marginRight: '10px' }}>编辑</a>
        <a>追踪</a>
      </div>
    )
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    time: 1
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    time: 2
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    time: 3
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
    time: 4
  }
]

// tab栏的数据
const tabTitle = [{ title: '新leads', key: '1' }, { title: '联系中', key: '2' }, { title: '死海', key: '3' }]
//
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  }
}
@connect
export default class LeadsManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabLeads1: [],
      tabLeads2: [],
      tabLeads3: [],
      colums1: [],
      activeKey: '1'
    }
  }
  async componentDidMount() {
    //获取门店
    this.props.getShopList()
    await this.props.getLeadsList()

    this.getTabLeads()
    // console.log(this.state)
  }
  getTabLeads() {
    this.props.MyLeads.leadsList.forEach(item => {
      if (item.clientStatus === 1) {
        this.state.tabLeads1.push(item)
      } else if (item.clientStatus === 2) {
        this.state.tabLeads2.push(item)
      } else {
        this.state.tabLeads3.push(item)
      }
    })
  }
  getDatas() {
    if (this.state.activeKey == 1) {
      return this.state.tabLeads1
    } else if (this.state.activeKey == 2) {
      return this.state.tabLeads2
    } else {
      return this.state.tabLeads3
    }
  }
  getColums = () => [
    {
      align: 'center',
      width: 150,
      title: 'Leads姓名',
      dataIndex: 'leadsName',
      key: 'leadsName',
      render: (value, info) => {
        return (
          <div>
            <a>{value}</a>
            <div>
              {info.currentGrade && <Tag color="green">{info.currentGrade}</Tag>}
              {info.interestSubject && <Tag color="magenta">{info.interestSubject}</Tag>}
            </div>
          </div>
        )
      }
    },
    {
      align: 'center',
      title: '手机号',
      dataIndex: 'phoneNo',
      key: 'phoneNo'
    },
    this.state.activeKey === '1'
      ? {
          align: 'center',
          title: '归属',
          dataIndex: 'shopUserName',
          key: 'shopUserName'
        }
      : {},

    {
      align: 'center',
      title: '加入时间',
      dataIndex: 'takeDate',
      key: 'takeDate',
      sorter: (a, b) => Date.parse(new Date(a.takeDate)) - Date.parse(new Date(b.takeDate))
    },
    this.state.activeKey === '2' || this.state.activeKey === '3'
      ? { align: 'center', title: '追踪状态', dataIndex: 'followStatus', key: 'followStatus' }
      : {},
    {
      align: 'center',
      title: '操作',
      render: () => (
        <div>
          {(this.state.activeKey === '1' || this.state.activeKey === '2') && <a style={{ marginRight: 10 }}>编辑</a>}
          {(this.state.activeKey === '1' || this.state.activeKey === '2') && <a style={{ marginRight: 10 }}>追踪</a>}
          {this.state.activeKey === '2' && <a style={{ marginRight: 10 }}>放弃</a>}
          {this.state.activeKey === '2' && <a style={{ marginRight: 10 }}>试听</a>}
          {this.state.activeKey === '2' && <a style={{ marginRight: 10 }}>新建合同</a>}
          {this.state.activeKey === '3' && <a>复活</a>}
        </div>
      )
    }
  ]
  // 点击tabs
  clickTab(key) {
    this.setState(
      {
        activeKey: key
      },
      () => console.log(this.state.activeKey)
    )
  }
  render() {
    console.log('this.props.MyLeads', this.props)
    const { pageNum, pageSize, leadsList } = this.props.MyLeads
    return (
      <div className="leadsManage">
        当前门店：
        <Sel
          value={this.props.MyLeads.selShop}
          data={this.props.MyLeads.shopList}
          vt={'shopId,shopName'}
          style={{ width: 200 }}
          onChange={this.props.selShopUp}
        />
        <div className={'filter-css'}>
          <Input
            placeholder="请输入Leads姓名/编号/手机"
            value={this.props.MyLeads.searchVal}
            style={{ width: 210, marginRight: 20 }}
            onChange={v => this.props.searchValUp(v.target.value)}
          />
          <SearchSel
            noMultiple
            url={'/biz/open/copartner/dict/grade'}
            vt={'gradeId,gradeName'}
            style={{ width: 110, marginRight: 20 }}
            placeholder="年级"
            value={this.props.MyLeads.selGrade}
            onChange={this.props.selGradeUp}
          />
          <SearchSel
            url={'/biz/open/copartner/dict/subject'}
            vt={'subjectId,subjectName'}
            style={{ width: 110, marginRight: 20 }}
            placeholder="科目"
            value={this.props.MyLeads.selSubject}
            onChange={this.props.selSubjectUp}
          />
          <RangePicker className="search-gaoji-sel" />
          来源
          <SearchSel
            noMultiple
            url={'/biz/open/copartner/dict/source/leads'}
            vt={'statusId,statusDesc'}
            style={{ width: 110, marginRight: 10, marginLeft: 10 }}
            placeholder="全部"
            value={this.props.MyLeads.selSource}
            onChange={this.props.selSourceUp}
          />
          店员
          <SearchSel
            noMultiple
            url={'/biz/open/copartner/dict/shopUser'}
            vt={'shopUserId,shopUserName'}
            style={{ width: 110, marginRight: 10, marginLeft: 10 }}
            placeholder="全部"
            value={this.props.MyLeads.selShopUser}
            onChange={this.props.selShopUserUp}
          />
          <Button style={{ float: 'right' }} onClick={this.props.filterCleal}>
            清空
          </Button>
          <Button type={'primary'} style={{ float: 'right', marginRight: 10 }} onClick={this.getMyLeadsList}>
            查询
          </Button>
        </div>
        {/* tabs栏 */}
        <Tabs tabBarExtraContent={moreTabBarExtraContent} onChange={key => this.clickTab(key)}>
          {tabTitle.map(item => {
            return (
              <TabPane tab={item.title} key={item.key}>
                <Table
                  rowKey={'leadsId'}
                  rowSelection={rowSelection}
                  columns={this.getColums()}
                  dataSource={this.getDatas()}
                />
              </TabPane>
            )
          })}
        </Tabs>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Table, /*Row, Col, Modal, Radio, InputNumber, message, Tag,*/ Divider } from 'antd'
import lodash from 'lodash'
import FilterWidget from './components/filter/FilterWidget'
import BackClasses from './components/backClasses/BackClasses'
import Address from './components/address/Address'
import StudentInfoModal from './../../components/studentInfo/StudentInfoModal'
import API from '../../utils/axios'
import './appyClassesManage.scss'
// import { connect as newOrderManage } from './orderModel'

export default class AppyClassesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listInfo: {
        pageNum: 1,
        pageSize: 20
      },
      disabled: true,
      deductAmount: 0
    }
  }
  paramsInfo = {}
  pageInfo = {
    pageNum: 1,
    pageSize: 20
  }

  resetPageInfo = () => {
    this.pageInfo = {
      pageNum: 1,
      pageSize: 20
    }
  }

  setParams = obj => {
    if (lodash.isEqual(this.paramsInfo === obj)) {
      this.paramsInfo = obj
    } else {
      this.paramsInfo = obj
      this.pageInfo.pageNum = 1
    }
  }

  componentDidMount() {
    this.getData()
  }
  // 获取数据
  getData = async () => {
    let params = {
      ...this.paramsInfo,
      ...this.pageInfo
    }
    let { status, data } = await API.get('/biz/coursepack/classgroup/attend/list', params)
    if (status) {
      this.setState({ listInfo: data })
    }
  }

  pageIndexChange = (current, pageSize) => {
    this.pageInfo.pageNum = current
    this.pageInfo.pageSize = pageSize
    this.getData()
  }
  pageSizeChange = (current, pageSize) => {
    this.pageInfo.pageNum = 1
    this.pageInfo.pageSize = pageSize
    this.getData()
  }

  render() {
    let { listInfo = {} /*, disabled, deductAmount*/ } = this.state
    const columns = [
      {
        title: '学员姓名',
        dataIndex: 'studentName',
        render: (txt, d) => <StudentInfoModal name={txt} data={d} id={d.clientId} />
      },
      {
        title: '班级编号',
        dataIndex: 'classCode'
      },
      {
        title: '课程名称',
        dataIndex: 'courseName'
      },
      {
        title: '课程时间',
        dataIndex: 'categoryName'
      },
      {
        title: '报班时间',
        dataIndex: 'attendTime'
      },
      {
        title: '预计首课时间',
        dataIndex: 'preFirstTime'
      },
      {
        title: '首次开课时间',
        dataIndex: 'firstTime'
      },
      {
        title: '进度',
        dataIndex: 'orderStatusName',
        render: (txt, d) => (d.totalClassHours === 0 ? '-' : `${d.usedClassHours}/${d.totalClassHours}`)
      },
      {
        title: '授课教师',
        dataIndex: 'teacherName'
      },
      {
        title: '操作',
        dataIndex: '',
        width: 150,
        render: (txt, d) => {
          return (
            <>
              <Address getData={this.getData} data={d} />
              <Divider type="vertical" />
              <BackClasses data={d} getData={this.getData} />
            </>
          )
        }
      }
    ]

    return (
      <div>
        <FilterWidget {...this.props} setParams={this.setParams} getData={this.getData} reset={this.resetPageInfo} />
        <div style={{ marginTop: 10 }}>
          <Table
            rowKey={'id'}
            className="tableStyle"
            columns={columns}
            dataSource={listInfo.list || []}
            pagination={{
              current: listInfo.pageNum,
              pageSize: listInfo.pageSize,
              total: listInfo.total,
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '40', '80', '100'],
              showTotal: (t /*, r*/) => {
                return (
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ marginRight: 10 }}>共 {t} 条记录</span>
                  </div>
                )
              },
              onChange: this.pageIndexChange,
              onShowSizeChange: this.pageSizeChange
            }}
          />
        </div>
      </div>
    )
  }
}

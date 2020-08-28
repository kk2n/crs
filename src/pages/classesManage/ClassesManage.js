import React, { Component } from 'react'
import { Table, message, Divider, Popconfirm /*Row, Col, Modal, Radio, InputNumber, Select, Button, Tag*/ } from 'antd'
// import lodash from 'lodash'
import FilterWidget from './components/fliter/FilterWidget'
import ChangeTeacher from './components/changeTeacher/ChangeTeacher'
import OptionWidget from './components/optionsWidget/OptionsWidget'
import ReleaseSetting from './components/releaseSetting/ReleaseSetting'
import ClassesStudent from './components/classesStudent/ClassStudent'
import ChangeStudentModal from './components/changeStudent/changeStudentModal'
import StartClass from './components/startClass/StartClass'
import API from '../../utils/axios'
import './classesManage.scss'

export default class ClassesManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changeTeacherFlag: false,
      listInfo: {},
      disabled: true,
      deductAmount: 0,
      selectedRowKeys: [],
      rowData: {}
    }
  }
  paramsInfo = {}
  pageInfo = {
    pageNum: 1,
    pageSize: 10
  }

  resetPageInfo = () => {
    this.pageInfo = {
      pageNum: 1,
      pageSize: 10
    }
  }

  setParams = obj => {
    this.paramsInfo = obj
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
    let { status, data } = await API.post('/biz/coursepack/class/group/list', params)
    if (status) {
      this.setState({ listInfo: data })
    }
  }
  // showDetail = (val, record) => {
  //   this.refundParams.orderId = record.orderId
  //   this.setState({ visible: true })
  // }

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
  handleCancel = () => {
    this.setState({
      changeTeacherFlag: false
    })
  }

  //展示修改老师的模态框
  showChangeTeacherModal = record => {
    this.setState({
      changeTeacherFlag: true,
      rowData: record
    })
  }

  // 选择退款类型
  onChange = e => {
    let val = e.target.value
    this.refundParams.refundType = val
    this.refundParams.deductAmount = 0
    if (val === 'ALL') {
      this.setState({ deductAmount: 0, disabled: true })
    } else {
      this.setState({ deductAmount: 0, disabled: false })
    }
  }
  refundParams = {
    deductAmount: 0,
    orderId: '',
    refundType: 1
  }

  // // 获取退款额度
  // getAmount = val => {
  //   this.refundParams.deductAmount = val
  //   this.setState({ deductAmount: val })
  // }

  // 结课
  endClass = async id => {
    let params = {
      classGroupId: id
    }
    let { status, msg } = await API.post('/biz/coursepack/class/group/status/end', params)
    if (status) {
      message.success(msg)
      this.getData()
    } else {
      message.error(msg)
    }
  }

  render() {
    let { listInfo = {}, changeTeacherFlag, rowData /*changeStudentFlag, disabled, deductAmount*/ } = this.state
    const columns = [
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
        dataIndex: '课程时间',
        render: (txt, d) => {
          return (
            <>
              <p>{d.categoryName}</p>
              <p>{`${d.startTime}-${d.endTime}`}</p>
            </>
          )
        }
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
        title: '人数',
        dataIndex: 'divideNumbers',
        render: (txt, record) => {
          return <ClassesStudent data={record} />
        }
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
        title: '班级状态',
        dataIndex: 'statusDesc'
      },
      {
        title: '上架状态',
        dataIndex: 'onStateDesc'
      },
      {
        title: '操作',
        dataIndex: '',
        width: 150,
        render: (val, record) => {
          return (
            <>
              {record.status === 3 ? (
                '-'
              ) : (
                <>
                  <div>
                    {record.status === 1 && <StartClass name={'开课'} data={record} getData={this.getData} />}
                    {record.status === 2 && (
                      <Popconfirm
                        title="确定结课？"
                        onConfirm={() => {
                          this.endClass(record.id)
                        }}
                        onCancel={() => {}}
                        okText="是"
                        cancelText="否"
                      >
                        <a href="#">结课</a>
                      </Popconfirm>
                    )}
                    <Divider type="vertical" />
                    <a onClick={() => this.showChangeTeacherModal(record)}>调老师</a>
                  </div>
                  <div>
                    <ChangeStudentModal
                      title="调班"
                      width={1000}
                      showLeft={true}
                      limit={2}
                      //当前选中的数据
                      baseData={record}
                      getData={this.getData}
                      //年级/学科信息
                    />
                    <Divider type="vertical" />
                    <ReleaseSetting data={record} name={'上架设置'} getData={this.getData} />
                  </div>
                </>
              )}
            </>
          )
        }
      }
    ]

    return (
      <div>
        <FilterWidget {...this.props} setParams={this.setParams} getData={this.getData} reset={this.resetPageInfo} />
        <OptionWidget getData={this.getData} />
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
        {/* 分配老师 */}
        <ChangeTeacher
          visible={changeTeacherFlag}
          getData={this.getData}
          data={rowData}
          handleCancel={this.handleCancel}
        />
      </div>
    )
  }
}

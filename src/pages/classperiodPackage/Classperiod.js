import React, { Component } from 'react'
import { Table, Button, Select, message, Modal } from 'antd'
import moment from 'moment'
import { connect as classperiodConnect } from './classperiodModel'
import OptionWarp from './components/OptionWarp'
import API from './../../utils/axios'
import './classperiod.scss'
const Option = Select.Option
const { confirm } = Modal
const dateFormat = 'YYYY.MM.DD HH:mm'
@classperiodConnect
export default class extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    listInfo: [],
    gradeId: undefined,
    gradeList: []
  }

  pageInfo = {
    pageNum: 1,
    pageSize: 10
  }

  componentDidMount() {
    this.getData()
    this.getGradeList()
  }

  // 获取年级
  getGradeList = async () => {
    let { data, status } = await API.get('/biz/coursepack/grade/list')
    if (status) {
      this.setState({ gradeList: data })
    }
  }

  // 获取表格数据
  getData = async () => {
    let params = {
      ...this.pageInfo,
      gradeId: this.state.gradeId
    }
    let { data, msg, status } = await API.post('/biz/coursepack/period/list', params)
    if (status) {
      this.setState({ listInfo: data })
    } else {
      message.error(msg)
    }
  }

  // 分页
  pageIndexChange = (current, pageSize) => {
    this.pageInfo.pageNum = current
    this.pageInfo.pageSize = pageSize
    this.getData()
  }
  //分页
  pageSizeChange = (current, pageSize) => {
    this.pageInfo.pageNum = 0
    this.pageInfo.pageSize = pageSize
    this.getData()
  }

  // 设计年级id
  setGradeId = val => {
    this.pageInfo.pageNum = 1
    this.setState({ gradeId: val })
  }

  //清空
  handleReset = async () => {
    await this.setState(() => ({
      gradeId: undefined
    }))
    this.pageInfo = {
      pageNum: 1,
      pageSize: 10
    }
    this.getData()
  }

  // 删除课时包
  deletePeriod = obj => {
    confirm({
      title: '请谨慎操作，是否确定删除?',
      cancelText: '否',
      okText: '是',
      onOk: async () => {
        let params = {
          periodId: obj.id
        }
        let { status, msg } = await API.post('/biz/coursepack/period/del', params)
        if (status) {
          message.success(msg)
          this.getData()
        } else {
          message.error(msg)
        }
      },
      onCancel() {}
    })
  }

  render() {
    let { gradeList = [], listInfo = {}, gradeId } = this.state
    let columns = [
      {
        title: '年级',
        dataIndex: 'gradeName'
      },
      {
        title: '课时数',
        dataIndex: 'period'
      },
      {
        title: '原价',
        dataIndex: 'price'
      },
      {
        title: '分期价格',
        dataIndex: 'stagesPrice'
      },
      {
        title: 'ios价格',
        dataIndex: 'iosPrice'
      },
      {
        title: '折扣时间(新)',
        dataIndex: 'newDiscountStart',
        render: (val, record) => {
          return (
            <>
              {record.newDiscountStart ? (
                <>
                  <p>{moment(record.newDiscountStart).format(dateFormat)}-</p>
                  <p>{moment(record.newDiscountEnd).format(dateFormat)}</p>
                </>
              ) : (
                '/'
              )}
            </>
          )
        }
      },
      {
        title: '折扣力度(新)',
        dataIndex: 'newDiscountRate',
        render: (val, data) => {
          return data.newDiscount === 0 ? '/' : val
        }
      },
      {
        title: '折扣时间(老)',
        dataIndex: '',
        render: (val, record) => {
          return (
            <>
              {record.oldDiscountStart ? (
                <>
                  <p>{moment(record.oldDiscountStart).format(dateFormat)}-</p>
                  <p>{moment(record.oldDiscountEnd).format(dateFormat)}</p>
                </>
              ) : (
                '/'
              )}
            </>
          )
        }
      },
      {
        title: '折扣力度(老)',
        dataIndex: 'oldDiscountRate',
        render: (val, data) => {
          return data.oldDiscount === 0 ? '/' : val
        }
      },
      {
        title: '操作',
        dataIndex: '',
        render: (val, obj) => {
          return <a onClick={this.deletePeriod.bind(this, obj)}>删除</a>
        }
      }
    ]

    return (
      <div className="course-content">
        <div className="searchBox">
          <div className="leftBox">
            <OptionWarp gradeList={gradeList} getData={this.getData} />
            <div className="selectBox">
              <span>年级:</span>
              <Select
                style={{ width: 120, marginLeft: 10 }}
                placeholder="请选择"
                value={gradeId}
                allowClear
                onChange={this.setGradeId}
              >
                {gradeList.map(item => {
                  return (
                    <Option key={item.gradeId} value={item.gradeId}>
                      {item.gradeName}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </div>
          <div className="rightBox">
            <Button type="primary" onClick={this.getData}>
              查询
            </Button>
            <Button onClick={this.handleReset}>清空</Button>
          </div>
        </div>
        {/*用户列表-表格*/}
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

import React, { Component } from 'react'
import { connect } from './orderLessonDetailsModel'
import './orderLessonDetails.scss'
import { message, Modal, Table } from 'antd'
import API from '../../utils/axios'
import Filter from './cmp/Filter'
import TiaoKe from './cmp/TiaoKe'
import StudentInfo from './cmp/StudentInfo'
import { fmoment } from '../../utils/function'
let arr = ['预排', '完成', '请假', '¥请假', '旷课', '全部']
@connect
export default class OrderLessonDetails extends Component {
  componentDidMount = () => this.getList()
  getList = async () => {
    let info = this.props.OrderLessonDetails
    let params = {
      weekId: info.selXingQi?.key ?? undefined,
      courseHour: info.selKeShi?.key || undefined,
      //childStaffIds: null,
      lessonId: info.lessonId || undefined,
      pageNum: info.pageNum,
      pageSize: info.pageSize,
      studentIdOrName: info.studentIdOrName || undefined,
      contractId: info.contractId || undefined,
      gradeId: info.gradeId?.key || undefined,
      subjectId: info.subjectId?.key || undefined,
      lessonStatus: info?.lessonStatus?.key ?? 5,
      teacherName: info.teacherName?.label || undefined,
      startTimeStart: fmoment(info.startTime[0]) || undefined,
      startTimeEnd: fmoment(info.startTime[1]) || undefined,
      crId: info.selCR?.key
    }
    this.props.lessonList(params)
  }
  render() {
    //表格属性
    let rowSelection = {
      selectedRowKeys: this.props.OrderLessonDetails.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.props.selectedRowKeysUp(selectedRowKeys)
        this.props.selectedRowsUp(selectedRows)
      }
      // getCheckboxProps: data => ({
      //   //disabled: ![0].includes(data.lessonStatus)
      // })
    }
    const columns = [
      {
        title: '课时编号',
        dataIndex: 'lessonId',
        key: 'lessonId',
        render: (v, d) => {
          return d.lessonStatus === 0 ? (
            <a
              onClick={async () => {
                let { data } = await API.get('/biz/sales/getScheduleTimeList', {
                  date: fmoment(d.startTime) || null,
                  type: 'S'
                })
                await this.props.kscsStartUp(data)
                await this.props.tkStartTimeUp(d && d.startTime)
                await this.props.startSDUp({ key: d.startTime?.slice(11, 16), label: d.startTime?.slice(11, 16) })
                await this.props.tkEndTimeUp(d && d.endTime)
                await this.props.endSDUp({ key: d.endTime?.slice(11, 16), label: d.endTime?.slice(11, 16) })
                await this.props.tkPostParamUp(d)
                this.props.tiaokeUp(true)
              }}
            >
              {v}
            </a>
          ) : (
            <span>{v}</span>
          )
        }
      },
      {
        title: '学员姓名',
        dataIndex: 'studentName',
        key: 'studentName',
        render: (v, d) => {
          return (
            <div>
              <a
                style={{ paddingRight: 8 }}
                onClick={async () => {
                  await this.props.lessonIdUp(d.clientId)
                  this.props.infoModalUp(true)
                }}
              >
                {v}
              </a>
              <a
                onClick={async () => {
                  await this.props.lessonIdUp(d.refClientId)
                  this.props.infoModalUp(true)
                }}
              >
                {d.refClientName}
              </a>
            </div>
          )
        }
      },
      {
        title: '学员编号',
        dataIndex: 'clientId',
        key: 'clientId'
      },
      {
        title: '负责人',
        dataIndex: 'chargeName',
        key: 'chargeName',
        width: 150
      },
      {
        title: '上课时间',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 104
      },
      {
        title: '星期',
        dataIndex: 'week',
        key: 'week'
      },
      {
        title: '年级',
        dataIndex: 'gradeName',
        key: 'gradeName'
      },
      {
        title: '科目',
        dataIndex: 'subjectName',
        key: 'subjectName'
      },
      {
        title: '学科老师',
        dataIndex: 'teacherName',
        key: 'teacherName'
      },
      {
        title: '课程状态',
        dataIndex: 'lessonStatus',
        key: 'lessonStatus',
        render: v => arr[v] || ''
      },
      {
        title: '课时数',
        dataIndex: 'courseHours',
        key: 'courseHours'
      },
      {
        title: '累计课时数',
        dataIndex: 'num',
        key: 'num'
      },
      {
        title: '操作',
        render: d => {
          return (
            this.props.Common.permission.DRW_LESSON_LIST_CANCEL_LEAVE && (
              <a
                onClick={() => {
                  Modal.confirm({
                    title: '温馨提示',
                    content: '您确认要销假吗?',
                    cancelText: '点错了',
                    okText: '确定销假',
                    onOk: async () => {
                      let { status } = await API.post('/biz/sales/lesson/cancelLeave', {
                        lessonIdList: [d.lessonId]
                      })
                      if (!status) return false
                      await message.success('操作成功', 2)
                      this.getList()
                    }
                  })
                }}
              >
                销假
              </a>
            )
          )
        }
      }
    ]
    return (
      <div className="orderLessonDetailsPage">
        {this.props.OrderLessonDetails.infoModal && <StudentInfo {...this.props} />}
        {/*调课*/}
        {this.props.OrderLessonDetails.tiaoke && <TiaoKe {...this.props} getList={this.getList} />}
        <Filter {...this.props} getList={this.getList} />
        <div className="leads-tab-com">
          <div className="leads-table">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={this.props.OrderLessonDetails.lessonListRes.data?.list || []}
              rowKey="lessonId"
              pagination={{
                current: this.props.OrderLessonDetails.lessonListRes?.data?.pageNum,
                pageSize: this.props.OrderLessonDetails.lessonListRes?.data?.pageSize,
                total: this.props.OrderLessonDetails.lessonListRes?.data?.total,
                showTotal: (t, r) => `当前显示${r[0]}-${r[1]}条/共${t}条`,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: async pageNum => {
                  await this.props.pageNumUp(pageNum)
                  this.getList()
                },
                onShowSizeChange: async (current, size) => {
                  await this.props.pageNumUp(1)
                  await this.props.pageSizeUp(size)
                  this.getList()
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

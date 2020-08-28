import React, { Component } from 'react'
import { connect } from './showLessonModel'
import './showLesson.scss'
import { Button, Input, Table, DatePicker, /*Select,*/ Modal, message } from 'antd'
import SearchSel from '../../components/SearchSel'
// import Sel from '../../components/Sel'
import moment from 'moment'
// import API from '../../utils/axios'
// import { findObj } from 'ymcore/array'
const { RangePicker } = DatePicker
const ft = 'YYYY-MM-DD'
// function disabledDate(current) {
//   return current && current <= moment().subtract(1, 'days')
// }
function num(x) {
  if (isNaN(x)) return undefined
  return x
}
@connect
export default class ShowLesson extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount = () => {
    this.getList()
  }
  getList = async pageNum => {
    let params = {
      lessonId: this.props.ShowLessonModel.lessonId || '',
      pageNum: pageNum || 1,
      pageSize: 10,
      likeField: this.props.ShowLessonModel.leadsIdOrName || '',
      gradeId: (this.props.ShowLessonModel.gradeId || {}).key || '',
      startTime: this.props.ShowLessonModel.startTime[0]
        ? moment(this.props.ShowLessonModel.startTime[0]).format(ft)
        : null,
      endTime: this.props.ShowLessonModel.startTime[1]
        ? moment(this.props.ShowLessonModel.startTime[1]).format(ft)
        : null
    }
    this.props.lessonList(params)
  }
  render() {
    //表格属性
    let rowSelection = {
      selectedRowKeys: this.props.ShowLessonModel.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows, 'selectedRows')
        this.props.selectedRowKeysUp(selectedRowKeys)
        this.props.selectedRowsUp(selectedRows)
      }
    }
    const columns = [
      {
        title: '课时编号',
        dataIndex: 'lessonId',
        key: 'lessonId'
      },
      {
        title: 'Leads编号',
        dataIndex: 'clientId',
        key: 'clientId'
      },
      {
        title: 'Leads姓名',
        dataIndex: 'clientName',
        key: 'clientName'
      },
      {
        title: 'CC姓名',
        dataIndex: 'consultantName',
        key: 'consultantName'
      },
      {
        title: '上课时间',
        dataIndex: 'startTime',
        key: 'startTime'
      },
      {
        title: '年级',
        dataIndex: 'gradeName',
        key: 'gradeName'
      },
      {
        title: '课程状态',
        dataIndex: 'lessonStatusDesc',
        key: 'lessonStatusDesc'
      }
    ]
    return (
      <div className="myleadsPage">
        <div>
          <div className="search-div">
            <Input
              className="search-inp"
              value={this.props.ShowLessonModel.lessonId}
              placeholder="课时编号"
              onChange={async e => this.props.lessonIdUp(num(parseInt(e.target.value)))}
            />
            <Input
              className="search-sel"
              value={this.props.ShowLessonModel.leadsIdOrName}
              placeholder="Leads编号/姓名"
              onChange={e => {
                this.props.leadsIdOrNameUp(e.target.value)
              }}
            />
            <SearchSel
              noMultiple
              style={{ width: 110, marginRight: 20 }}
              url={'/biz/sales/gradeList'}
              vt={'gradeId,gradeName'}
              placeholder="全部年级"
              value={this.props.ShowLessonModel.gradeId}
              onChange={this.props.gradeIdUp}
            />

            <RangePicker
              className="search-gaoji-sel rili-wid"
              value={this.props.ShowLessonModel.startTime}
              onChange={val => this.props.startTimeUp(val)}
            />
            <Button
              type="primary"
              className="search-bn"
              onClick={async () => {
                this.getList()
              }}
            >
              查询
            </Button>
            <Button
              className="search-bn"
              onClick={async () => {
                await this.props.clearFilter()
                this.getList()
              }}
            >
              清空
            </Button>
          </div>
          <div className="btn-box">
            <Button
              type="primary"
              className="search-bn btn-right"
              onClick={() => {
                if (this.props.ShowLessonModel.selectedRows.length) {
                  Modal.confirm({
                    title: '温馨提示',
                    content: '是否删除?',
                    cancelText: '点错了',
                    zIndex: 1021,
                    okText: '确定删除',
                    onOk: async () => {
                      let arr = this.props.ShowLessonModel.selectedRows.map(
                        item => [0].includes(item.lessonStatus) && item.lessonStatus
                      )
                      if (arr.includes(false)) {
                        message.error('已完成、旷课、请假、￥请假的课程不可删除!')
                        return false
                      }
                      //提交
                      await this.props.deleteLesson({ lessonIds: this.props.ShowLessonModel.selectedRowKeys })
                      //判断
                      if (this.props.ShowLessonModel.deleteLessonRes.status) {
                        await this.props.selectedRowsUp([])
                        await this.props.selectedRowKeysUp([])
                        await message.success('删除成功', 2)
                        this.getList()
                      }
                    }
                  })
                } else {
                  Modal.info({ title: '请选择需要删除的课程', content: '请勾选' })
                }
              }}
            >
              删除
            </Button>
          </div>
        </div>
        <div className="leads-tab-com">
          <div className="leads-table">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={
                this.props.ShowLessonModel.lessonListRes.data && this.props.ShowLessonModel.lessonListRes.data.list
              }
              rowKey="lessonId"
              pagination={{
                current: ((this.props.ShowLessonModel.lessonListRes || {}).data || {}).pageNum,
                pageSize: (this.props.ShowLessonModel.lessonListRes.data || {}).pageSize,
                total: (this.props.ShowLessonModel.lessonListRes.data || {}).total,
                onChange: async pageNum => {
                  this.getList(pageNum)
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

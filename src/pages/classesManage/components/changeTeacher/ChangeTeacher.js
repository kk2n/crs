import React, { Component } from 'react'
import { Modal, Input, Table, Button, message } from 'antd'
import API from './../../../../utils/axios'

const teacherInfo_columns = [
  {
    title: '教师姓名',
    dataIndex: 'teacherName'
  },
  {
    title: '学段',
    dataIndex: 'professionDtos',
    render: arr => {
      return arr.map(item => {
        return item.gradeName
      })
    }
  },
  {
    title: '学科',
    dataIndex: '',
    render: (arr, record) => {
      return (
        record.professionDtos &&
        record.professionDtos.map(item => {
          return item.subjectName
        })
      )
    }
  }
]

// let dataArr = [
//   {
//     id: '237164826290294784',
//     teacherName: '黄霜霜',
//     professionDtos: [
//       {
//         phaseId: '234736012197105664',
//         phaseName: '初中',
//         gradeId: '234737374012116992',
//         gradeName: '七年级',
//         subjectId: '234737499149176832',
//         subjectName: '语文'
//       }
//     ]
//   }
// ]

export default class ChangeTeacher extends Component {
  state = {
    selectedRowKeys: [],
    listInfo: {}
  }

  //分页信息
  pageInfo = {
    pageNum: 1,
    pageSize: 10
  }

  resetInfo = () => {
    this.pageInfo = { pageNum: 1, pageSize: 10 }
    this.setState({ selectedRowKeys: [], listInfo: {} })
  }

  pageIndexChange = (current, pageSize) => {
    this.pageInfo.pageNum = current
    this.pageInfo.pageSize = pageSize
    this.getTeacherList()
  }
  pageSizeChange = (current, pageSize) => {
    this.pageInfo.pageNum = 0
    this.pageInfo.pageSize = pageSize
    this.getTeacherList()
  }
  doCommit = async () => {
    let params = {
      classGroupId: this.props.data.id,
      teacherId: this.state.selectedRowKeys[0]
    }
    if (!params.teacherId) {
      message.warning('请选择老师')
      return false
    }
    let { data, msg } = await API.post('/biz/coursepack/class/group/teacher', params)
    if (data) {
      this.resetInfo()
      this.props.handleCancel()
      this.props.getData()
      message.success(msg)
    } else {
      message.error(msg)
    }
  }

  // 显示选择框
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  // 获取数据
  getTeacherList = async () => {
    let params = {
      teacherName: this.state.teacherName,
      classGroupId: this.props.data.id,
      courseSkuId: this.props.data.skuId,
      ...this.pageInfo
    }
    // if (!params.teacherName) {
    //   message.warning('请输入老师姓名')
    //   return false
    // }
    let result = await API.post('/biz/coursepack/class/group/teacher/list', params)
    this.setState({ listInfo: result.data })
  }

  handleCancel = () => {
    this.resetInfo()
    this.props.handleCancel()
  }

  // 设置老师
  setTeacherInfo = e => {
    this.setState({ teacherName: e.target.value })
  }
  render() {
    let { visible } = this.props
    let { selectedRowKeys, listInfo = {} } = this.state

    return (
      <Modal width={800} title="调老师" visible={visible} onOk={this.doCommit} onCancel={this.handleCancel}>
        <div style={{ maxHeight: 700 }}>
          <Input
            style={{ width: 150, marginRight: 15 }}
            placeholder="请输入老师姓名"
            allowClear
            onChange={this.setTeacherInfo}
          />
          <Button type="primary" onClick={this.getTeacherList}>
            搜索
          </Button>
          <Table
            columns={teacherInfo_columns}
            rowKey={'id'}
            style={{ overflowY: 'auto', maxHeight: 600 }}
            rowSelection={{ type: 'radio', selectedRowKeys, onChange: this.onSelectChange }}
            dataSource={listInfo.list || []}
            // dataSource={dataArr}
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
      </Modal>
    )
  }
}

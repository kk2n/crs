import React, { Component } from 'react'
import { Modal, Table } from 'antd'
import API from '../../../../utils/axios'

const BOOK_STATUS = {
  '1': '确认收货地址',
  '2': '已确认'
}
export default class ClassesStudent extends Component {
  state = { visible: false, dataList: [] }
  handleCancel = () => {
    this.setState({ visible: false, dataList: [] })
  }

  showModal = () => {
    this.getStudentList()
    this.setState({ visible: true })
  }

  getStudentList = async () => {
    let params = { classGroupId: this.props.data.id }
    let { data, status } = await API.post('/biz/coursepack/class/group/member/list', params)
    if (status) {
      this.setState({ dataList: data })
    }
  }
  render() {
    let { visible, dataList = [] } = this.state
    let { data = {} } = this.props
    const studentInfo_columns = [
      {
        title: '学员姓名',
        dataIndex: 'studentName'
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
        dataIndex: 'progress'
      },
      {
        title: '教材状态',
        dataIndex: 'bookStatusDesc'
      }
    ]
    return (
      <>
        <a onClick={this.showModal}>{data.divideNumbers}</a>
        {visible && (
          <Modal width={800} title="班级学员" visible={visible} footer={null} onCancel={this.handleCancel}>
            <Table rowKey="id" columns={studentInfo_columns} dataSource={dataList} />
          </Modal>
        )}
      </>
    )
  }

  //教材状态
  renderBookStatus = (obj = {}) => {
    if (obj.bookStatus === 3) {
      return obj.logisticsStr
    } else {
      return BOOK_STATUS[obj.bookStatus]
    }
  }
}

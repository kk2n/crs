import React, { Component } from 'react'
import { Button, Icon, Input } from 'antd'
import FilterWidget from './components/filter/FilterWidget'
import DeliveryAddress from './components/deliveryAddress/DeliveryAddress'
import StudentInfoModal from './../../components/studentInfo/StudentInfoModal'
import './bookDelivery.scss'
import { Table as UrlTable } from 'ymcmp'
import { connect } from './bookDeliveryModel'
import API from '../../utils/axios'

@connect
export default class BookDelivery extends Component {
  state = {
    subjectData: []
  }
  setSubjectData = (arr = []) => {
    this.setState({ subjectData: arr })
  }
  render() {
    const columns = [
      {
        title: '学员姓名',
        dataIndex: 'studentName',
        render: (txt, d) => <StudentInfoModal key={d.classCode} name={txt} data={d} id={d.clientId} />
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
        render: d => <DeliveryAddress key={d.id} data={d} getData={this.props.paramsUp} />
      }
    ]
    return (
      <div>
        <div className="base-filter" style={{ height: 'auto', overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ float: 'left' }}>
            <Input
              style={{ width: 240, marginRight: 10 }}
              placeholder="请输入学员姓名/编号/手机"
              value={this.props.BookDelivery.filter.fieldLike}
              onChange={e => this.props.filterUp({ value: e.target.value, key: 'fieldLike' })}
            />
            <Button type="primary" style={{ marginRight: 10 }} onClick={this.props.paramsUp}>
              查询
            </Button>
            <Button
              onClick={() => {
                this.props.clear()
                this.setSubjectData()
              }}
            >
              清空
            </Button>
          </div>
          <div style={{ float: 'right' }}>
            <a
              style={{ marginLeft: 8, fontSize: 12 }}
              onClick={() => this.props.gjFilterUp(!this.props.BookDelivery.gjFilter)}
            >
              高级搜索 <Icon type={this.props.BookDelivery.gjFilter ? 'up' : 'down'} />
            </a>
          </div>
        </div>
        {this.props.BookDelivery.gjFilter && (
          <FilterWidget {...this.props} subjectData={this.state.subjectData} setSubjectData={this.setSubjectData} />
        )}
        <UrlTable
          columns={columns}
          API={API}
          url="/biz/coursepack/book/send/list"
          params={this.props.BookDelivery.params}
        />
      </div>
    )
  }
}

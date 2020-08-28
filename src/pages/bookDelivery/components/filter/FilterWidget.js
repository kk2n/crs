import React, { Component } from 'react'
import './filterWidget.scss'
import { Input, DatePicker } from 'antd'
import API from './../../../../utils/axios'
import { Select, Filter } from 'ymcmp'
const { RangePicker } = DatePicker
export default class FilterWidget extends Component {
  state = {
    selGradeId: '',
    selSubjectId: ''
  }

  render() {
    return (
      <Filter
        data={[
          {
            component: (
              <Select
                key={'gradeId'}
                value={this.props.BookDelivery.filter.gradeId}
                placeholder="年级"
                noMultiple
                API={API}
                url={'/biz/coursepack/student/gradesubject/list'}
                onChange={(val = {}, data) => {
                  let subjectData = data.find(a => a.id === val.key)
                  this.setState({
                    selGradeId: val.key
                  })
                  this.props.filterUp({ value: val, key: 'gradeId' })
                  subjectData && this.props.setSubjectData(subjectData.childer)
                }}
              />
            )
          },
          {
            component: (
              <Select
                key={'subjectId'}
                noMultiple
                value={this.props.BookDelivery.filter.subjectId}
                afterData={this.props.subjectData}
                placeholder="科目"
                onChange={(val = {}) => {
                  this.setState({
                    selSubjectId: val.key
                  })
                  this.props.filterUp({ value: val, key: 'subjectId' })
                }}
              />
            )
          },
          {
            component: (
              <Select
                key={'courseId'}
                noMultiple
                value={this.props.BookDelivery.filter.courseId}
                API={API}
                url={'/biz/coursepack/student/course/list'}
                method="post"
                params={{
                  gradeId: this.state.selGradeId,
                  subjectId: this.state.selSubjectId
                }}
                placeholder="课程名称"
                onChange={value => this.props.filterUp({ value, key: 'courseId' })}
              />
            )
          },
          {
            component: (
              <Input
                key={'classCode'}
                placeholder="班级编号"
                value={this.props.BookDelivery.filter.classCode}
                onChange={e => this.props.filterUp({ value: e.target.value, key: 'classCode' })}
              />
            )
          },
          {
            component: (
              <Select
                key={'classState'}
                noMultiple
                API={API}
                url="/biz/coursepack/class/group/attend/status/list"
                value={this.props.BookDelivery.filter.classState}
                onChange={value => this.props.filterUp({ value, key: 'classState' })}
              />
            )
          },
          {
            component: (
              <RangePicker
                key={'preFirstTimeStart'}
                placeholder={['预计首课时间', '']}
                value={this.props.BookDelivery.filter.preFirstTimeStart}
                onChange={value => this.props.filterUp({ value, key: 'preFirstTimeStart' })}
              />
            )
          },
          {
            component: (
              <RangePicker
                key={'firstTimeStart'}
                placeholder={['首次开课时间', '']}
                value={this.props.BookDelivery.filter.firstTimeStart}
                onChange={value => this.props.filterUp({ value, key: 'firstTimeStart' })}
              />
            )
          },
          {
            component: (
              <RangePicker
                key={'attendTimeStart'}
                placeholder={['报班时间', '']}
                value={this.props.BookDelivery.filter.attendTimeStart}
                onChange={value => this.props.filterUp({ value, key: 'attendTimeStart' })}
              />
            )
          },
          {
            component: (
              <Select
                key={'bookStatus'}
                noMultiple
                API={API}
                url="/biz/coursepack/book/status/list"
                placeholder={'教材状态'}
                value={this.props.BookDelivery.filter.bookStatus}
                onChange={value => this.props.filterUp({ value, key: 'bookStatus' })}
              />
            )
          },
          {
            component: (
              <Select
                key={'teacherId'}
                noMultiple
                API={API}
                url="/biz/coursepack/xzk/teacher/list"
                placeholder={'授课老师'}
                value={this.props.BookDelivery.filter.teacherId}
                onChange={value => this.props.filterUp({ value, key: 'teacherId' })}
              />
            )
          }
        ]}
      />
    )
  }
}

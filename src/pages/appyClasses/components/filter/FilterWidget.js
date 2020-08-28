import React, { Component } from 'react'
import './filterWidget.scss'
import { Select, Input, Button, Icon, DatePicker, Form, Spin } from 'antd'
import lodash from 'lodash'
import API from './../../../../utils/axios'
const { Option } = Select
const { RangePicker } = DatePicker
const DATE_FORMAT = 'YYYY-MM-DD'

@Form.create()
export default class FilterWidget extends Component {
  state = {
    expand: false,
    gradeSubjectList: [],
    courseList: [],
    subjectList: [],
    fetching: false,
    attendList: [],
    bookList: [],
    teacherList: []
  }
  componentDidMount() {
    this.getGradeSubjectList()
    this.getAttendClassList()
    this.getBookStatusList()
    this.getTeacterList()
  }

  // fetch
  getGradeSubjectList = async () => {
    let { data, status } = await API.get('/biz/coursepack/student/gradesubject/list')
    if (!status) return false
    this.setState({ gradeSubjectList: data })
  }

  // 获取课程名
  getCourseList = async val => {
    this.setState({ fetching: true })
    let params = {
      gradeId: this.props.form.getFieldValue('gradeId'),
      subjectId: this.props.form.getFieldValue('subjectId'),
      courseName: val
    }
    let { data, status } = await API.post('/biz/coursepack/student/course/list', params)
    if (!status) return false
    this.setState({ courseList: data, fetching: false })
  }

  // 获取报班状态
  getAttendClassList = async () => {
    let { data, status } = await API.get('/biz/coursepack/class/group/attend/status/list')
    if (!status) return false
    this.setState({ attendList: data })
  }

  // 获取教材状态
  getBookStatusList = async () => {
    let { data, status } = await API.get('/biz/coursepack/book/status/list')
    if (!status) return false
    this.setState({ bookList: data })
  }

  // 获取老师
  getTeacterList = async () => {
    let { data, status } = await API.get('/biz/coursepack/xzk/teacher/list')
    if (!status) return false
    this.setState({ teacherList: data })
  }

  gradeChange = (val, data) => {
    if (data) {
      this.setState({ subjectList: data.props.data })
    } else {
      this.setState({ subjectList: [] })
    }
    this.props.form.setFieldsValue({ subjectId: undefined })
  }
  toggle = () => {
    const { expand } = this.state
    this.setState({ expand: !expand })
  }

  preParams = {}

  handleSearch = e => {
    e && e.preventDefault()
    let formatFuc = (date, index) => {
      if (date && date.length !== 0) {
        return date[index].format(DATE_FORMAT)
      } else {
        return null
      }
    }
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return false
      let params = {
        ...fieldsValue,
        preFirstTimeStart: formatFuc(fieldsValue['preFirstTimeStart'], 0),
        preFirstTimeEnd: formatFuc(fieldsValue['preFirstTimeStart'], 1),
        firstTimeStart: formatFuc(fieldsValue['firstTimeStart'], 0),
        firstTimeEnd: formatFuc(fieldsValue['firstTimeStart'], 1),
        attendTimeStart: formatFuc(fieldsValue['attendTimeStart'], 0),
        attendTimEnd: formatFuc(fieldsValue['attendTimeStart'], 1)
      }
      console.log(params, 'params')
      if (!lodash.isEqual(params, this.preParams)) {
        this.props.reset()
      }
      this.preParams = { ...params }
      if (this.props.setParams) {
        this.props.setParams(params)
      }
      if (this.props.getData) {
        this.props.getData()
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
    this.setState({ subjectList: [] })
    this.handleSearch()
  }

  render() {
    let { expand, gradeSubjectList, courseList, fetching, bookList, attendList, teacherList, subjectList } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Form className="myStudent-filterWidget-warp" onSubmit={this.handleSearch}>
        <div className="base-filter">
          <div className="base-left">
            <Form.Item>
              {getFieldDecorator(`fieldLike`)(<Input style={{ width: 240 }} placeholder="请输入学员姓名/编号/手机" />)}
            </Form.Item>

            <Button className="submit" htmlType="submit" type="primary">
              查询
            </Button>
            <Button onClick={this.handleReset}>清空</Button>
          </div>
          <div>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              高级搜索 <Icon type={expand ? 'up' : 'down'} />
            </a>
          </div>
        </div>
        {expand ? (
          <div className="more-filter">
            <Form.Item>
              {getFieldDecorator(`gradeId`)(
                <Select className="select-box" placeholder="年级" allowClear onChange={this.gradeChange}>
                  {gradeSubjectList.map(item => {
                    return (
                      <Option key={item.id} data={item.childer} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator(`subjectId`)(
                <Select className="select-box" allowClear placeholder="科目">
                  {subjectList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`courseId`)(
                <Select
                  className="select-box"
                  placeholder="课程名称"
                  style={{ width: 200 }}
                  showSearch
                  allowClear
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onFocus={this.getCourseList}
                >
                  {courseList.map(item => {
                    return (
                      <Option value={item.id} key={item.id} data={item.childer}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item>{getFieldDecorator(`classCode`)(<Input placeholder="班级编号" />)}</Form.Item>
            <Form.Item>
              {getFieldDecorator(`classState`)(
                <Select className="select-box" allowClear placeholder="报班状态">
                  {attendList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`preFirstTimeStart`)(<RangePicker placeholder={['预计首课时间', '']} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`firstTimeStart`)(<RangePicker placeholder={['首次开课时间', '']} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`attendTimeStart`)(<RangePicker placeholder={['报班时间', '']} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`bookStatus`)(
                <Select className="select-box" placeholder="教材状态">
                  {bookList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`teacherId`)(
                <Select className="select-box" allowClear placeholder="授课老师">
                  {teacherList.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              )}
            </Form.Item>
          </div>
        ) : (
          ''
        )}
      </Form>
    )
  }
}

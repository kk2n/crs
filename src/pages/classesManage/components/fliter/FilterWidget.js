import React, { Component } from 'react'
import './filterWidget.scss'
import { Select, Input, Button, Icon, DatePicker, Form, Spin, InputNumber } from 'antd'
// import moment from 'moment'
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
    teacherList: [],
    classesStatusList: [],
    releaseStatusList: [],
    minNumber: 0
  }
  componentDidMount() {
    this.getGradeSubjectList()
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

  //获取班级状态
  getClassStatusList = async () => {
    let { data, status } = await API.get('/biz/coursepack/class/group/status/list')
    if (!status) return
    this.setState({ classesStatusList: data })
  }

  //获取上架状态
  getReleaseStatusList = async () => {
    let { data, status } = await API.get('/biz/coursepack/class/group/onState/list')
    if (!status) return
    this.setState({ releaseStatusList: data })
  }

  // 获取老师
  getTeacterList = async () => {
    let { data, status } = await API.get('/biz/coursepack/xzk/teacher/list')
    if (!status) return false
    this.setState({ teacherList: data })
  }

  minNumChange = val => {
    this.setState({ minNumber: val })
  }

  getMaxNumberMin = () => {
    if (this.props.form.getFieldValue('startLessonHour')) {
      return { min: this.props.form.getFieldValue('startLessonHour') }
    } else {
      return {}
    }
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
        onStartTime: formatFuc(fieldsValue['onStartTime'], 0),
        onEndTime: formatFuc(fieldsValue['onStartTime'], 1),
        preFirstTimeBegin: formatFuc(fieldsValue['preFirstTimeBegin'], 0),
        preFirstTimeEnd: formatFuc(fieldsValue['preFirstTimeBegin'], 1),
        startTimeBegin: formatFuc(fieldsValue['startTimeBegin'], 0),
        startTimeEnd: formatFuc(fieldsValue['startTimeBegin'], 1)
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
    let {
      expand,
      gradeSubjectList = [],
      courseList = [],
      fetching,
      teacherList = [],
      subjectList = [],
      classesStatusList = [],
      releaseStatusList = []
    } = this.state
    const { getFieldDecorator } = this.props.form
    let MaxNum = this.getMaxNumberMin()
    return (
      <Form className="calssManage-filterWidget-warp" onSubmit={this.handleSearch}>
        <div className="base-filter">
          <div className="base-left">
            <Form.Item>
              {getFieldDecorator(`keyword`)(<Input style={{ width: 240 }} placeholder="请输入学员姓名/编号/手机" />)}
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
        {expand && (
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
                  showSearch
                  allowClear
                  style={{ width: 200 }}
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onFocus={this.getCourseList}
                  // onSearch={this.getCourseList}
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
              {getFieldDecorator(`status`)(
                <Select className="select-box" allowClear placeholder="班级状态" onFocus={this.getClassStatusList}>
                  {classesStatusList.map(item => {
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
              {getFieldDecorator(`onState`)(
                <Select className="select-box" allowClear placeholder="上架状态" onFocus={this.getReleaseStatusList}>
                  {releaseStatusList.map(item => {
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
              {getFieldDecorator(`onStartTime`)(<RangePicker style={{ width: 200 }} placeholder={['上架时间', '']} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`preFirstTimeBegin`)(
                <RangePicker style={{ width: 200 }} placeholder={['预计首次开课时间', '']} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`startTimeBegin`)(
                <RangePicker style={{ width: 200 }} placeholder={['首次课程时间', '']} />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`beginCount`)(
                <InputNumber style={{ width: 150 }} placeholder="班级人数" max={999} onChange={this.minNumChange} />
              )}
            </Form.Item>
            <p style={{ lineHeight: '35px', marginRight: '5px' }}>-</p>
            <Form.Item>
              {getFieldDecorator(`endCount`)(
                <InputNumber
                  {...MaxNum}
                  style={{ width: 150 }}
                  onChange={this.setMaxNum}
                  placeholder={'大于起始班级人数'}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator(`teacherId`)(
                <Select className="select-box" placeholder="授课老师" allowClear onFocus={this.getTeacterList}>
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
        )}
      </Form>
    )
  }
}

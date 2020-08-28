import React from 'react'
import { Modal, Button, Select, message, Form, Cascader, Input, InputNumber } from 'antd'
import API from '../../../../utils/axios'
const Option = Select.Option
const { TextArea } = Input
import './options.scss'

@Form.create()
export default class Add extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    visible: false,
    gradeSubjectList: [],
    courseList: [],
    courseDateRangeList: [],
    courseTimeRangeList: [],
    attendClassesList: [],
    teacherList: []
  }

  addParams = {
    gradeId: '',
    subjectId: '',
    courseId: '',
    numbers: '',
    courseSkuId: '',
    teacherIds: []
  }

  showModal = () => {
    this.getGradeSubjectList()
    this.setState({
      visible: true
    })
  }
  // fetch 班级科目
  getGradeSubjectList = async () => {
    let { data, status } = await API.get('/biz/coursepack/student/gradesubject/list')
    if (status) {
      this.setState({ gradeSubjectList: data })
    }
  }
  // fetch 课程
  getCourseList = async a => {
    let params = {
      gradeId: a[0],
      subjectId: a[1]
    }
    this.props.form.setFieldsValue({ courseId: '', date: '', courseSkuId: '', attendDate: '', teacherIds: [] })
    this.addParams.gradeId = a[0]
    this.addParams.subjectId = a[1]
    let { data, status } = await API.post('/biz/coursepack/student/course/list', params)
    if (status) {
      this.setState({ courseList: data })
    }
  }

  // 获取开课日期
  getCourseDateRangeList = async val => {
    let params = {
      courseId: val
    }
    this.props.form.setFieldsValue({ date: '', courseSkuId: '', attendDate: '', teacherIds: [] })
    let { data, status } = await API.get('/biz/coursepack/course/category/list', params)
    if (status) {
      this.setState({ courseDateRangeList: data })
    }
  }

  // 获取 上课时段
  getCourseTimeRange = async val => {
    let params = {
      categoryId: val
    }
    this.props.form.setFieldsValue({ courseSkuId: '', attendDate: '', teacherIds: [] })
    this.addParams.courseId = val
    let { data, status } = await API.get('/biz/coursepack/course/category/sku/list', params)
    if (status) {
      this.setState({ courseTimeRangeList: data })
    }
  }

  // 获取上课日期
  getAttendClassesList = async val => {
    let params = {
      skuId: val
    }
    let { data, status } = await API.get('/biz/coursepack/course/category/execution/list', params)
    if (status) {
      this.setState({ attendClassesList: data })
    }
  }

  setAttendClasses = val => {
    this.props.form.setFieldsValue({ attendDate: '', teacherIds: [] })
    this.addParams.courseSkuId = val
    this.getAttendClassesList(val)
    this.getTeacherList(val)
  }

  // 获取授课老师
  getTeacherList = async () => {
    let params = {
      ...this.addParams,
      classGroupId: 1
    }
    let { data, status } = await API.post('/biz/coursepack/class/group/teacher/valid/list', params)
    if (status) {
      this.setState({ teacherList: data })
    }
  }

  setTeacher = arr => {
    if (arr.length > 3) {
      message.error('')
    }
  }

  handleOk = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue, 'fieldsValue')
      if (err) return false
      this.createClasses(fieldsValue)
    })
  }
  // 创建班级
  createClasses = async params => {
    let { data, msg } = await API.post('/biz/coursepack/class/group/save', params)
    if (data) {
      message.success(msg, 3)
      this.props.getData()
      this.handleCancel()
    } else {
      message.error(msg, 5)
    }
    // this.setState({ })
  }

  handleCancel = () => {
    this.addParams = {
      gradeId: '',
      subjectId: '',
      courseId: '',
      numbers: '',
      courseSkuId: '',
      teacherIds: []
    }
    this.setState({
      visible: false,
      gradeSubjectList: [],
      courseList: [],
      courseDateRangeList: [],
      courseTimeRangeList: [],
      attendClassesList: [],
      teacherList: []
    })
  }

  render() {
    let {
      visible = false,
      gradeSubjectList = [],
      courseList = [],
      courseDateRangeList = [],
      courseTimeRangeList = [],
      attendClassesList = [],
      teacherList = []
    } = this.state
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 12 }
      }
    }
    return (
      <div className="classesManage-option-warp">
        <Button type="primary" onClick={this.showModal}>
          新建
        </Button>
        {visible && (
          <Modal
            destroyOnClose
            width={600}
            title="新建班级"
            visible={visible}
            maskClosable={false}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="年级科目">
                {getFieldDecorator('grade-course', {
                  rules: [{ required: true, message: '必填字段' }]
                })(
                  <Cascader
                    options={gradeSubjectList}
                    fieldNames={{ label: 'name', value: 'id', children: 'childer' }}
                    placeholder="请选择"
                    allowClear={false}
                    onChange={this.getCourseList}
                  />
                )}
              </Form.Item>
              <Form.Item label="课程">
                {getFieldDecorator('courseId', {
                  rules: [{ required: true, message: '必填字段' }]
                })(
                  <Select
                    placeholder="请选择"
                    showSearch
                    onChange={this.getCourseDateRangeList}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {courseList.map(item => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      )
                    })}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="上线时间">
                {getFieldDecorator('date', {
                  rules: [{ required: true, message: '必填字段' }]
                })(
                  <Select placeholder="请选择" onChange={this.getCourseTimeRange}>
                    {courseDateRangeList.map(item => {
                      return (
                        <Option key={item.courseId} value={item.id}>
                          {item.startDate + '-' + item.endDate}
                        </Option>
                      )
                    })}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="上课时段">
                {getFieldDecorator('courseSkuId', {
                  rules: [{ required: true, message: '必填字段' }]
                })(
                  <Select placeholder="请选择" onChange={this.setAttendClasses}>
                    {courseTimeRangeList.map(item => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.startTime + '-' + item.endTime}
                        </Option>
                      )
                    })}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="上课时间">
                {getFieldDecorator('attendDate', {
                  rules: [{ required: false, message: '必填字段' }]
                })(
                  <TextArea
                    disabled
                    rows={3}
                    placeholder={attendClassesList.map(item => {
                      return item.date
                    })}
                  />
                )}
              </Form.Item>
              <Form.Item label="授课教师">
                {getFieldDecorator('teacherIds', {
                  rules: [
                    { required: true, message: '必填字段', type: 'array' },
                    { type: 'array', max: 3, message: '最多可选择三位老师' }
                  ]
                })(
                  <Select placeholder="请选择" mode="multiple">
                    {teacherList.map(item => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {`${item.teacherName}-${item.graduatedUniversity}`}
                        </Option>
                      )
                    })}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="班级人数">
                {getFieldDecorator('numbers', {
                  initialValue: 6,
                  rules: [{ required: true, message: '必填字段' }]
                })(<InputNumber min={1} max={6} />)}
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    )
  }
}

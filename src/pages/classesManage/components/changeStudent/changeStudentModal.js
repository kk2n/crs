import React, { Component } from 'react'
import { Modal, Button, message, Table, Select } from 'antd'
import API from './../../../../utils/axios'
import './index.scss'

const Option = Select.Option
const left_columns = [
  {
    title: '姓名',
    dataIndex: 'userName'
  },
  {
    title: '手机号',
    dataIndex: 'phone'
  }
]
export default class ChangeClassModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changeStudentFlag: false,
      selectedRowKeys: [],
      studentList: [],
      classList: [],
      dateList: [],
      timeList: [],
      categoryId: undefined,
      skuId: undefined
    }
  }

  //获取班级的学生
  getClassesStudent = async val => {
    let params = {
      classGroupId: val
    }
    let { data, status } = await API.get('/biz/coursepack/class/group/divide/already', params)
    if (!status) return
    this.setState({ studentList: data })
  }

  // 获取开课日期
  getCourseDateRangeList = async val => {
    let params = {
      courseId: val
    }
    let { data, status } = await API.get('/biz/coursepack/course/category/list', params)
    if (!status) return
    this.setState({ dateList: data })
  }

  // 获取 上课时段
  getCourseTimeRange = async val => {
    let params = {
      categoryId: val
    }
    let { data, status } = await API.get('/biz/coursepack/course/category/sku/list', params)
    if (!status) return
    this.setState({ timeList: data })
  }

  //查询可加入的班级
  getNotFullClasses = async () => {
    let params = {
      phaseId: this.props.baseData.phaseId,
      gradeId: this.props.baseData.gradeId,
      subjectId: this.props.baseData.subjectId,
      courseId: this.props.baseData.courseId,
      courseCategoryId: this.state.categoryId,
      courseSkuId: this.state.skuId,
      name: '',
      classGroupId: this.props.baseData.id
    }
    let { data, status } = await API.post('/biz/coursepack/class/group/divide/list', params)
    if (status) {
      this.setState({ classList: data })
    }
  }

  // 打开调学生模态框
  showChangeStudentModal = () => {
    let data = this.props.baseData
    this.getClassesStudent(data.id)
    this.getCourseDateRangeList(data.courseId)
    this.setState({
      changeStudentFlag: true,
      rowData: this.props.baseData
    })
  }

  //管理调学生模态框
  closeChangeClassModal = () => {
    this.setState({
      changeStudentFlag: false
    })
    this.resetAllParams()
  }

  // 显示选择框
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
    this.setState({ selectedRowKeys })
  }

  // 设置时间段id
  setCategoryId = val => {
    this.setState({ categoryId: val })
    this.getCourseTimeRange(val)
  }

  // 设置时间段id
  setSkuId = val => {
    this.setState({ skuId: val })
  }

  // 设置参数
  resetParams = async () => {
    await this.setState({ skuId: undefined, categoryId: undefined })
    this.getNotFullClasses()
  }

  //关闭页面重置参数
  resetAllParams = () => {
    this.setState({ selectedRowKeys: [], skuId: undefined, categoryId: undefined, classList: [], studentList: [] })
  }

  // 加入班级
  insertData = async id => {
    let params = {
      classGroupId: id,
      ids: this.state.selectedRowKeys
    }
    if (!params.ids || params.ids.length === 0) {
      message.error('请选择学生')
      return false
    }
    let { data, msg } = await API.post('/biz/coursepack/class/group/divide', params)
    if (data) {
      message.success(msg)
      this.closeChangeClassModal()
      this.props.getData()
    } else {
      message.error(msg)
    }
  }

  render() {
    let { baseData, title } = this.props
    let {
      changeStudentFlag,
      selectedRowKeys,
      studentList,
      dateList,
      timeList,
      categoryId,
      skuId,
      classList = []
    } = this.state
    const right_columns = [
      {
        title: '班级编号',
        dataIndex: 'code'
      },
      {
        title: '班级人数',
        dataIndex: 'numbers',
        render: (txt, d) => {
          return `${d.divideNumbers}/${d.numbers}`
        }
      },
      {
        title: '操作',
        dataIndex: '',
        render: (txt, d) => {
          return <a onClick={() => this.insertData(d.id)}>加入</a>
        }
      }
    ]
    return (
      <>
        <a onClick={this.showChangeStudentModal}>调学员</a>
        {changeStudentFlag && (
          <Modal
            width={1000}
            title={title}
            visible={changeStudentFlag}
            onCancel={this.closeChangeClassModal}
            footer={null}
          >
            <div className="change_modal">
              <div className="change_modal_left">
                <div className="classInfo_container">
                  <h3>已经选择的班级: </h3>
                  <div className="class_Info">
                    <p title={baseData.code}>班级id: {baseData.classCode}</p>
                    {/* <p title={baseData.name}>班级名称: {baseData.name}</p> */}
                    <p title={baseData.courseName}>课程名称: {baseData.courseName}</p>
                    <p title={baseData.categoryName}>上课日期: {baseData.categoryName}</p>
                    <p title={`${baseData.startTime} ~ ${baseData.endTime}`}>
                      上课时段: {baseData.startTime}~{baseData.endTime}
                    </p>
                  </div>
                  <Table
                    columns={left_columns}
                    dataSource={studentList}
                    rowKey="id"
                    bordered
                    pagination={false}
                    rowSelection={{
                      selectedRowKeys,
                      onChange: this.onSelectChange
                    }}
                  />
                </div>
              </div>
              <div className="change_modal_right">
                <div className="classInfo_container">
                  <h3>可加入的班级: </h3>
                  <div className="class_Info rightFilfter">
                    <Select
                      className="select-box"
                      value={categoryId}
                      style={{ width: 200 }}
                      placeholder={'选择开课日期'}
                      onChange={this.setCategoryId}
                    >
                      {dateList.map(item => {
                        return (
                          <Option key={item.courseId} value={item.id}>
                            {item.startDate + '-' + item.endDate}
                          </Option>
                        )
                      })}
                    </Select>
                    <Select className="select-box" value={skuId} placeholder={'选择上课时段'} onChange={this.setSkuId}>
                      {timeList.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.startTime + '-' + item.endTime}
                          </Option>
                        )
                      })}
                    </Select>
                    <Button className="btnSubmit" type="primary" onClick={this.getNotFullClasses}>
                      查询
                    </Button>
                    <Button className="btnSubmit" onClick={this.resetParams}>
                      清空
                    </Button>
                  </div>
                  <Table columns={right_columns} dataSource={classList} rowKey="id" bordered pagination={false} />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
    )
  }
}

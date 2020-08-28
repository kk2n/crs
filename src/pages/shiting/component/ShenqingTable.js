import { message, Table, Tooltip } from 'antd'
import React from 'react'
import API, { host } from '../../../utils/axios'
import StudentInfoModal from '../../../components/studentInfo/StudentInfoModal'
import moment from 'moment'

export default () => {
  const columns = [
    {
      title: '试听主题',
      dataIndex: 'lessonTopic',
      key: 'lessonTopic',
      render: (v, d) => (
        <div>
          <div className="myleads-table">
            <Tooltip placement="top" title={v}>
              <span
                className="myleads-name"
                onClick={async () => {
                  await this.setState({ selLeads: d.id })
                  let { status, msg } = await API.get('/biz/auth/detail/staff') //检测token,如果失败跳至登陆页
                  if (!status) return !message.error(msg)
                  this.setState({ isShowDetial: true })
                }}
              >
                {v}
              </span>
            </Tooltip>
          </div>
          <div className="myleads-tag">
            {d.tryProperty === 0 && <i className="type">新</i>}
            {d.tryProperty === 1 && <i className="type">扩</i>}
            {d.tryProperty === 2 && <i className="type">换</i>}
            {d.subjectName && <i className="ke-mu">{d.subjectName}</i>}
            {d.gradeName && <i className="grade">{d.gradeName}</i>}
            {d.selfDefineTopic === 1 && <i className="custom">自定义</i>}
          </div>
        </div>
      )
    },
    {
      title: '学员姓名',
      key: 'leadsName',
      dataIndex: 'leadsName',
      align: 'center',
      render: (txt, d) => <StudentInfoModal name={txt} data={d} id={d.leadsId} />
    },
    {
      title: '创建人',
      key: 'createdBy',
      dataIndex: 'createdBy',
      align: 'center'
    },
    {
      title: '协作人',
      key: 'cooperateConsultant',
      dataIndex: 'cooperateConsultant',
      align: 'center',
      render: t => {
        return t ? t : '-'
      }
    },
    {
      title: '老师姓名',
      key: 'teacherName',
      dataIndex: 'teacherName',
      align: 'center',
      render: (v, d) => {
        return (
          <a
            onClick={async () => {
              await this.setState({ teacherId: d.teacherId })
              this.setState({ teacherInfo: true })
            }}
          >
            {v}
          </a>
        )
      }
    },
    {
      title: '预排时间',
      key: 'startTimeSchedule',
      dataIndex: 'startTimeSchedule',
      align: 'center',
      render: (val, data) => (
        <div className={moment(val && val.split(' ')[0]).isBefore(moment()) && data.lessonStatus === 1 ? 'red' : ''}>
          {val}
        </div>
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (val, data) => {
        return (
          <div>
            <a
              href={`http://${host('h5')}/classroomreport?lessonId=${data.lessonId}`}
              target="_blank"
              rel="noopener noreferrer"
              disabled={!data.lessonReport}
            >
              报告
            </a>
            <a
              style={{ marginLeft: '10px' }}
              disabled={data.teachingFeedBack !== 1}
              onClick={() => this.setState({ isShowFeedback: true, applicationId: data.id })}
            >
              授课反馈
            </a>
          </div>
        )
      }
    }
  ]
  return (
    <div className="leads-table">
      <Table
        className="auditionTable"
        columns={columns}
        dataSource={(this.props.auditDetail || {}).list}
        rowKey="id"
        pagination={{
          current: (this.props.auditDetail || {}).pageNum,
          pageSize: (this.props.auditDetail || {}).pageSize,
          total: (this.props.auditDetail || {}).total,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100', '200', '500'],
          showTotal: (t, r) => (
            <div style={{ float: 'left' }}>
              当前显示{r[0]}-{r[1]}条/共{t}条
            </div>
          ),
          onChange: page => {
            this.getDetailList(page)
            this.setState({
              pageNum: page
            })
          },
          onShowSizeChange: async (current, size) => {
            await this.setState({
              pageSize: size
            })
            this.getDetailList(1)
          }
        }}
      />
    </div>
  )
}

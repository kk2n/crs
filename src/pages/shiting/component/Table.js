import { Table, Tooltip } from 'antd'
import React from 'react'

export default props => {
  const columns = [
    {
      title: '试听主题',
      dataIndex: 'lessonTopic',
      key: 'lessonTopic',
      render: (v, d) => (
        <div>
          <div className="myleads-table">
            <Tooltip placement="top" title={v}>
              <span className="myleads-name" style={{ color: '#333' }}>
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
            {d.lessonTopicType === 1 && <i className="custom">自定义</i>}
          </div>
        </div>
      )
    },
    {
      title: '学员姓名',
      key: 'clientName',
      dataIndex: 'clientName',
      align: 'center',
      render: (v, d) => (
        <span>
          <a
            onClick={async () => {
              await props.selStudentIdUp(d.clientId)
              props.studentInfoModalUp(true)
            }}
          >
            {v}
          </a>
          &nbsp;&nbsp;
          {d.refClientName && (
            <a
              onClick={async () => {
                await props.selStudentIdUp(d.refClientId)
                props.studentInfoModalUp(true)
              }}
            >
              {d.refClientName}
            </a>
          )}
        </span>
      )
    },
    {
      title: '预排时间',
      key: 'lessonTime',
      dataIndex: 'lessonTime',
      align: 'center'
    },
    {
      title: '创建人',
      key: 'createName',
      dataIndex: 'createName',
      align: 'center'
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
              await props.selTeacherIdUp(d.teacherId)
              props.teacherInfoModalUp(true)
            }}
          >
            {v}
          </a>
        )
      }
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: v => (
        <a>
          {v === 1 ? (
            <span style={{ color: '#8b9ba2' }}>申请中</span>
          ) : v === 2 ? (
            <span style={{ color: '#26b313' }}>已同意</span>
          ) : v === 3 ? (
            <span style={{ color: '#f00' }}>已拒绝</span>
          ) : v === 4 ? (
            <span style={{ color: '#8b9ba2' }}>过期未响应</span>
          ) : (
            ''
          )}
        </a>
      )
    }
  ]
  return (
    <div className="leads-table">
      <Table
        className="auditionTable"
        columns={columns}
        dataSource={props.AuditApp?.getListRes?.data?.list}
        rowKey="applyId"
        pagination={{
          current: props.AuditApp?.getListRes?.data?.pageNum,
          pageSize: props.AuditApp?.getListRes?.data?.pageSize,
          total: props.AuditApp?.getListRes?.data?.total,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '25', '50', '100', '200', '500'],
          showTotal: (t, r) => (
            <div style={{ float: 'left' }}>
              当前显示{r[0]}-{r[1]}条/共{t}条
            </div>
          ),
          onChange: async page => {
            await props.pageUp(page)
            props.getList()
          },
          onShowSizeChange: async (current, pageSize) => {
            await props.pageSizeUp(pageSize)
            await props.pageUp(1)
            props.getList()
          }
        }}
      />
    </div>
  )
}

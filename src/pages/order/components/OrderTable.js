import { Table, Badge, message, Modal, Tabs, Tag } from 'antd'
import React from 'react'
import API, { host } from '../../../utils/axios'
import StudentInfoModal from './../../../components/studentInfo/StudentInfoModal'
const { TabPane } = Tabs
export default function Filter(props) {
  //状态小图标的数据
  const statusData = [
    { statusId: 1, color: 'processing' },
    { statusId: 2, color: 'error' },
    { statusId: 3, color: 'success' },
    { statusId: 4, color: 'default' },
    { statusId: 5, color: 'warning' },
    { statusId: 6, color: 'default' },
    { statusId: 7, color: 'default' }
  ]
  //订单表格头
  let getColums = [
    {
      title: '订单编号',
      dataIndex: 'contractId',
      key: 'contractId',
      render: (text, d) => (
        <div>
          <a
            onClick={async () => {
              await props.orderIdUp(text)
              props.showModal()
            }}
          >
            {text}
          </a>
          &nbsp;&nbsp;
          {d.subjectName && <Tag color="purple">{d.subjectName}</Tag>}
        </div>
      )
    },
    {
      title: '学员姓名',
      dataIndex: 'parentRealName',
      key: 'parentRealName',
      width: 160,
      render: (txt, d) => (
        <div>
          <StudentInfoModal name={txt} data={d} id={d.leadsId} />
          {d.refClientName && <StudentInfoModal name={d.refClientName} data={d} id={d.refClientId} />}
        </div>
      )
    },
    {
      title: '老师',
      key: 'teacherName',
      dataIndex: 'teacherName',
      render: (v, d) => {
        return (
          <a
            onClick={async () => {
              await props.teacherIdUp(d.teacherId)
              props.teacherInfoUp(true)
            }}
          >
            {v}
          </a>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      key: 'statusDesc',
      render: (text, d) => (
        <div>
          {<Badge status={(statusData[d.statusId] || {}).color} />}
          <span>{text}</span>
        </div>
      )
    },
    {
      title: '课时数',
      dataIndex: 'realLessonCount',
      key: 'realLessonCount'
    },
    {
      title: '剩余课时',
      dataIndex: 'remainHours',
      key: 'remainHours'
    },
    {
      title: '未排课时',
      dataIndex: 'remainUnscheduledHours',
      key: 'remainUnscheduledHours'
    },
    {
      title: '操作',
      render: (text, d) => (
        <div>
          {props.Common.permission['MIS_ORDER_BUTTON_SPLIT_ORDER'] && (
            <a
              style={{ marginRight: 10 }}
              onClick={async () => {
                await props.orderIdUp(d.contractId)
                props.showCFModal()
              }}
            >
              订单拆分
            </a>
          )}
          {props.Common.permission['MIS_ORDER_BUTTON_EXCHANGE_TEACHER'] && (
            <a
              style={{ marginRight: 10 }}
              onClick={async () => {
                await props.orderIdUp(d.contractId)
                props.showHTeacherModal()
              }}
            >
              换老师
            </a>
          )}
          <br />
          {props.Common.permission['MIS_ORDER_BUTTON_LESSON_ARRANGE'] && (d.statusId === 1 || d.statusId === 2) && (
            <a
              style={{ marginRight: 10 }}
              onClick={async () => {
                await props.orderIdUp(d.contractId)
                //订单排课操作校验
                let { status } = await API.post('/biz/sales/order/checkOrderSchedule', {
                  contractId: d.contractId
                })
                if (!status) return false
                props.showPKModal()
              }}
            >
              排课
            </a>
          )}

          {props.Common.permission['MIS_ORDER_BUTTON_PAUSE'] && [1, 2].includes(d.statusId) && (
            <a
              style={{ marginRight: 10 }}
              onClick={async () => {
                await props.orderIdUp(d.contractId)
                props.tingkeModalUp(true)
              }}
            >
              停课
            </a>
          )}
          {props.Common.permission['MIS_ORDER_BUTTON_PAUSE'] && d.statusId === 6 && (
            <a
              style={{ marginRight: 10 }}
              onClick={async () => {
                Modal.confirm({
                  title: '确定要对此订单执行复课操作吗？',
                  okText: '确定',
                  cancelText: '取消',
                  onOk: async () => {
                    let { status: ok } = await API.post('/biz/sales/order/restoreLesson', {
                      contractId: d.contractId
                    })
                    if (!ok) return false
                    await message.success('操作成功！', 2)
                    props.getList()
                  }
                })
              }}
            >
              复课
            </a>
          )}
        </div>
      )
    }
  ]
  return (
    <div className={'dingdanTable'}>
      <Table
        columns={getColums}
        dataSource={(props.OrderList.getOrderListRes.data || {}).list || []}
        rowKey={'contractId'}
        pagination={{
          current: (props.OrderList.getOrderListRes.data || {}).pageNum,
          pageSize: (props.OrderList.getOrderListRes.data || {}).pageSize,
          total: (props.OrderList.getOrderListRes.data || {}).total,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '40', '80', '100'],
          showTotal: (t, r) => (
            <div style={{ textAlign: 'right' }}>
              <span style={{ marginRight: 10 }}>共 {t} 条记录</span>
              <span>
                第 {r[0] === 1 ? r[0] : Math.ceil(r[0] / (props.OrderList.getOrderListRes.data || {}).pageSize)} /{' '}
                {Math.ceil(t / (props.OrderList.getOrderListRes.data || {}).pageSize)} 页
              </span>
            </div>
          ),
          onChange: async page => {
            await props.pageNumUp(page)
            props.getList()
          },
          onShowSizeChange: async (_, size) => {
            await props.pageNumUp(1)
            await props.pageSizeUp(size)
            props.getList()
          }
        }}
      />
      {props.OrderList.teacherInfo && (
        <Modal
          title="教师详情"
          maskClosable={false}
          className="detailModal2"
          visible={props.OrderList.teacherInfo}
          style={{ height: 'calc(100vh - 40px)' }}
          width={1080}
          onCancel={() => props.teacherInfoUp(false)}
          footer={null}
          centered
        >
          <Tabs type="card">
            <TabPane tab="教师信息" key="1">
              <iframe
                src={`//${host()}/crm/teacherInfo?teacherId=${props.OrderList.teacherId}&r=${Math.random()}`}
                width="100%"
                style={{ height: 'calc(100vh - 200px)' }}
              />
            </TabPane>
            <TabPane tab="教师课表" key="2">
              <iframe
                src={`//${host()}/crm/teacherKB?teacherId=${props.OrderList.teacherId}&r=${Math.random()}`}
                width="100%"
                style={{ height: 'calc(100vh - 200px)' }}
              />
            </TabPane>
          </Tabs>
        </Modal>
      )}
    </div>
  )
}

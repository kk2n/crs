import { Table, Badge, message, Tag } from 'antd'
import React from 'react'
import API from '../../../utils/axios'
import StudentInfoModal from './../../../components/studentInfo/StudentInfoModal'

export default function Filter(props) {
  //状态小图标的数据
  const statusData = {
    1: 'processing',
    2: 'error',
    3: 'success',
    4: 'default',
    5: 'warning',
    6: 'warning'
  }

  let periodStr = {
    JDBT: '京', // 京东白条
    BDFQ: '百', // 百度有钱花
    HAIMI: '海米', // 海米管家
    HUIFQ: '惠', // 惠学习
    FDFQ: '分蛋', // 分蛋分期
    HAIER: '海尔', // 海尔消费金融
    KUFQ: '库'
  }

  //表格头
  let getColums = [
    {
      title: '合同编号',
      dataIndex: 'contractId',
      key: 'contractId',
      render: (text, d) => (
        <>
          <a
            onClick={async () => {
              await props.contractIdUp(text)
              props.infoModalShowUp(true)
            }}
          >
            {d.contractNo}
          </a>
          {d.isPeriod === 1 && d.orderPartner !== null ? (
            <span style={{ marginLeft: '10px' }}>
              <Tag color="#027db4">{periodStr[d.orderPartner]}</Tag>
              <Tag color="#ec808d">{d.validPeriod}</Tag>
            </span>
          ) : (
            ''
          )}
        </>
      )
    },
    {
      title: '学员姓名',
      dataIndex: 'clientName',
      key: 'clientName',
      width: 180,
      render: (txt, d) => (
        <div>
          <StudentInfoModal name={txt} data={d} id={d.clientFid} />
          {d.refClientName && <StudentInfoModal name={d.refClientName} data={d} id={d.refClientId} />}
        </div>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createdOn',
      key: 'createdOn'
    },
    {
      title: '业绩归属人',
      dataIndex: 'belongTo',
      key: 'belongTo'
    },
    {
      title: '状态',
      dataIndex: 'contractStatusDesc',
      key: 'contractStatusDesc',
      render: (text, d) => (
        <div>
          {<Badge status={statusData[d.contractStatus]} />}
          <span>{text}</span>
        </div>
      )
    },
    {
      title: '合同金额',
      dataIndex: 'actualPrice',
      key: 'actualPrice'
    },
    {
      title: '实付金额',
      dataIndex: 'paidPrice',
      key: 'paidPrice'
    },
    {
      title: '剩余课时/总课时',
      dataIndex: 'remainHours',
      key: 'remainHours',
      render: (t, d) => (d.remainHours || '0') + '/' + (d.totalLessonCount || '0')
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      key: 'payTime'
    },
    {
      title: '操作',
      render: (text, d) => (
        <div>
          <a
            style={{ marginRight: 10 }}
            onClick={async () => {
              await props.contractIdUp(d.contractId)
              await props.contractNoUp(d.contractNo)
              let { status, msg } = await API.get('/biz/sales/contract/updateOrRepealContractLimit', {
                contractId: d.contractId,
                operation: 'REPEAL_CONTRACT'
              })
              if (!status) {
                message.error(msg)
                return
              }
              props.showBackoutModalUp(true)
            }}
          >
            撤销合同
          </a>
          <br />
          <a
            style={{ marginRight: 10 }}
            onClick={async () => {
              await props.contractIdUp(d.contractId)
              let { status, msg } = await API.get('/biz/sales/contract/updateOrRepealContractLimit', {
                contractId: d.contractId,
                operation: 'UPDATE_CONTRACT'
              })
              if (!status) {
                message.error(msg)
                return
              }
              props.showEditModalUp(true)
            }}
          >
            修改
          </a>
          {/*<a
            style={{ marginRight: 10 }}
            onClick={async () => {
              await props.contractIdUp(d.contractId)
              await props.clientFidUp(d.clientFid)
              await props.clientNameUp(d.clientName)
              if (d.contractStatus !== 2) {
                message.error('仅能为待分配状态的合同分配老师')
                return
              }
              props.showTeacherModalUp(true)
            }}
          >
            分配老师
          </a>*/}
          {d.contractStatus === 2 && (
            <a
              style={{ marginRight: 10 }}
              onClick={async () => {
                await props.contractIdUp(d.contractId)
                await props.clientFidUp(d.clientFid)
                await props.clientNameUp(d.clientName)
                await props.fenPeiClientFidUp(d.clientFid)
                await props.hasCRUp(d.hasCr)
                if (0 && d.contractStatus !== 2 && d.contractStatus !== 3) {
                  message.error('仅待分配或执行中的合同可以分配CR')
                  return
                }
                props.isFenPeiCRUp(true)
              }}
            >
              分配
            </a>
          )}
          {d.contractStatus !== 11 && (
            <a
              style={{ marginRight: 10 }}
              onClick={async () => {
                await props.contractIdUp(d.contractId)
                await props.contractNoUp(d.contractNo)
                let { status, msg } = await API.get('/biz/sales/contract/delContractLimit', {
                  contractId: d.contractId
                })
                if (!status) {
                  message.error(msg)
                  return
                }
                props.showDelectModalUp(true)
              }}
            >
              删除
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
        dataSource={(props.ContractList.getContractListRes.data || {}).list || []}
        rowKey={'contractId'}
        pagination={{
          current: (props.ContractList.getContractListRes.data || {}).pageNum,
          pageSize: (props.ContractList.getContractListRes.data || {}).pageSize,
          total: (props.ContractList.getContractListRes.data || {}).total,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '40', '80', '100'],
          showTotal: (t, r) => (
            <div style={{ textAlign: 'right' }}>
              <span style={{ marginRight: 10 }}>共 {t} 条记录</span>
              <span>
                第 {r[0] === 1 ? r[0] : Math.ceil(r[0] / (props.ContractList.getContractListRes.data || {}).pageSize)} /{' '}
                {Math.ceil(t / (props.ContractList.getContractListRes.data || {}).pageSize)} 页
              </span>
            </div>
          ),
          onChange: async page => {
            await props.pageNumUp(page)
            props.getContractList()
          },
          onShowSizeChange: async (_, size) => {
            await props.pageSizeUp(size)
            props.getContractList()
          }
        }}
      />
    </div>
  )
}

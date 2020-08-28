import React from 'react'
import { model, useModel } from 'ymcore/useModel'
import { Select, Table } from 'ymcmp'
import API from '../../utils/axios'
import { Badge } from 'antd'
import CKModal from './cmp/CKModal'

model({
  namespace: 'CommissionManage',
  API,
  editModal: false,
  ckModal: false,
  selId: undefined,
  selTitle: undefined,
  getInfo: 'get /biz/sales/commission/detail',
  editObj: {},
  ref: undefined,
  ling: false,
  selTime: undefined,
  selStore: undefined,
  selStatus: undefined,
  pageNum: 1,
  pageSize: 10
})
export default () => {
  let m = useModel('CommissionManage')
  return (
    <div>
      <div>
        月份：
        <Select
          noMultiple
          style={{ width: 280, marginRight: 10 }}
          API={API}
          url={'/reportservice/list/artificial/month'}
          value={m.selTime}
          onChange={m.selTimeUp}
        />
      </div>
      <br />
      <Table
        pageSizeOptions={['10', '20', '30', '50', '100']}
        onChange={p =>
          m.update({
            pageNum: p.current,
            pageSize: p.pageSize
          })
        }
        API={API}
        method={'post'}
        params={{
          type: 2, //类型（1：运营 2：门店）
          ref: m.ref,
          storeId: m.selStore?.key,
          statusIds: m.selStatus?.map(a => a.key),
          beginDate: m.selTime?.key?.split('^')?.[0],
          endDate: m.selTime?.key?.split('^')?.[1],
          pageNum: m.pageNum,
          pageSize: m.pageSize
        }}
        url={'/biz/sales/commission/list'}
        columns={[
          {
            title: '月份',
            dataIndex: 'date'
          },
          {
            title: '门店名称',
            dataIndex: 'storeName'
          },
          {
            title: '代理商',
            dataIndex: 'agentName'
          },
          {
            title: '佣金金额',
            dataIndex: 'totalCommissionPrice'
          },
          {
            title: '状态',
            dataIndex: 'statusDesc',
            render: (v, d) => {
              return (
                <div key={'s'}>
                  <Badge
                    color={d.status === 0 ? '#f00' : d.status === 1 ? '#00c130' : d.status === 2 ? '#0de1e2' : ''}
                  />
                  <span>{v}</span>
                </div>
              )
            }
          },
          {
            title: '操作',
            render: d => {
              return (
                <div key={'0'}>
                  <span>
                    <a
                      onClick={async () => {
                        await m.getInfo({ id: m.selId })
                        m.update({
                          selId: d.id,
                          selTitle: `${d.date}佣金结算单——${d.storeName}`,
                          ckModal: true
                        })
                      }}
                    >
                      {[0, 1].includes(d.status) ? '确认' : '查看'}
                    </a>
                    &nbsp;&nbsp;
                  </span>
                </div>
              )
            }
          }
        ]}
      />
      {m.ckModal && <CKModal m={m} />}
    </div>
  )
}

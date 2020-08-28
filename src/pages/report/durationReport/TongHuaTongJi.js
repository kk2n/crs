import React from 'react'
import { model, useModel } from 'ymcore/useModel'
import { Search, Rangepicker, Table } from 'ymcmp'
import { Button, message } from 'antd'
import down, { download } from '../../../utils/downAjax'
import API from '../../../utils/axios'
model({
  namespace: 'TongHuaTongJi',
  time: undefined,
  async daochu() {
    if (!this.time?.[0] || !this.time?.[1]) {
      message.error('请选择时间范围')
      return false
    }
    let { data } = await down.post('/biz/sales/report/exportCallReportList', {
      startDate: this.time?.[0],
      endDate: this.time?.[1]
    })
    if (data?.type !== 'text/xml') return false
    download(data, `通时通次报表(${this.time?.[0]}至${this.time?.[1]}).xls`)
  }
})
export default () => {
  let m = useModel('TongHuaTongJi')
  let columns = [
    {
      title: '用户名',
      dataIndex: 'staffName'
    },
    {
      title: '总次数',
      dataIndex: 'callTimes',
      render: v => (v === null ? 0 : v)
    },
    {
      title: '接通次数',
      dataIndex: 'connectTimes',
      render: v => (v === null ? 0 : v)
    },
    {
      title: '通话时长',
      dataIndex: 'callDuration',
      render: v => (v === null ? 0 : v)
    }
  ]
  return (
    <div className="TongHuaTongJi">
      <Search hideBn span={3} inline m={m} data={{ time: ['选择时间：', Rangepicker, { allowClear: false }] }} />
      <div style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={m.daochu} style={{ marginBottom: 10 }}>
          导出报表
        </Button>
      </div>
      <Table
        initNoGet
        columns={columns}
        API={API}
        pageSizeOptions={['10', '20', '30', '50', '100']}
        url="/biz/sales/report/callReportList"
        params={{ pageNum: 1, pageSize: 10, startDate: m.time?.[0] || undefined, endDate: m.time?.[1] || undefined }}
      />
    </div>
  )
}

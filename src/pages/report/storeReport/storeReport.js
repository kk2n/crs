import React from 'react'
import { model, useModel } from 'ymcore/useModel'
import Filter from './cmp/Filter'
import './css.scss'
import { Button, message } from 'antd'
import Table from './cmp/Table'
import API from '../../../utils/axios'
import downAPI, { download } from '../../../utils/downAjax'

model({
  namespace: 'StoreReport',
  dateType: 1,
  rengongTime: undefined,
  time: undefined,
  orgId: undefined,
  initParams: {
    pageNum: 1,
    pageSize: 10
  },
  getListParams: undefined,
  search() {
    if (this.dateType === 1 && !this.rengongTime) return !message.error('请选择人工月')
    if (this.dateType === 2 && !this.rengongTime) return !message.error('请选择人工周')
    if (this.dateType === 3 && !this.time) return !message.error('请选择时间范围')
    let time = [1, 2].includes(this.dateType) ? this.rengongTime?.key.split('^') : this.time
    this.getListParams = {
      orgIds: this.orgId,
      beginDate: time?.[0],
      endDate: time?.[1],
      ref: Math.random()
    }
  },
  clear() {
    this.time = undefined
    this.orgId = undefined
    this.rengongTime = undefined
    this.getListParams = undefined
  },
  async daochu() {
    if (this.dateType === 1 && !this.rengongTime) return !message.error('请选择人工月')
    if (this.dateType === 2 && !this.rengongTime) return !message.error('请选择人工周')
    if (this.dateType === 3 && !this.time) return !message.error('请选择时间范围')
    let time = [1, 2].includes(this.dateType) ? this.rengongTime?.key.split('^') : this.time
    let params = {
      orgIds: this.orgId,
      beginDate: time?.[0],
      endDate: time?.[1]
    }
    let { status } = await API.post('/reportservice/list/store/operate', params)
    if (!status) return false
    let { data } = await downAPI.post('/reportservice/export/list/store/operate', params)
    if (data?.type !== 'text/xml') return !message.error('出现错误！')
    download(data, `门店运营总表.xls`)
  }
})
export default () => {
  let m = useModel('StoreReport')
  return (
    <div className={'StoreReport'}>
      <Filter m={m} />
      <div style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={m.daochu}>
          导出报表
        </Button>
      </div>
      <Table m={m} />
    </div>
  )
}

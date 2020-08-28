import React from 'react'
import './classPage.scss'
import API, { assignEnterpriseCode } from '../../utils/axios'
import { Button } from 'antd'
import { model, useModel } from 'ymcore/useModel'
import Filter from './component/Filter'
import CKksb from './component/CKksb'
import Addksb from './component/Addksb'
import Fzksb from './component/Fzksb'
import Table from './component/Table'
model({
  API,
  namespace: 'ClassPack',
  status: undefined,
  keyword: undefined,
  //查看层状态
  chakanModalShow: false,
  //新建层状态
  addModalShow: false,
  fzModalShow: false,
  getListParams: {
    assignEnterpriseCode,
    pageNum: 1,
    pageSize: 10
  },
  del: 'post /orderservice/coursepack/delete',
  startOrStop: 'post /orderservice/coursepack/enable',
  classDetail: 'get /orderservice/coursepack/detail/get',
  searchData() {
    this.getListParams = {
      ...this.getListParams,
      name: this.keyword,
      type: this.status?.key,
      refresh: new Date().getTime()
    }
  },
  clear() {
    this.status = undefined
    this.keyword = undefined
    this.getListParams = {
      assignEnterpriseCode,
      pageNum: 1,
      pageSize: 10
    }
  }
})

export default () => {
  let ClassPack = useModel('ClassPack')
  return (
    <div className="class-pack">
      <Filter ClassPack={ClassPack} />
      <div style={{ textAlign: 'right', marginBottom: 10 }}>
        <Button type="primary" onClick={() => ClassPack.addModalShowUp(true)}>
          + 新&nbsp;&nbsp;建
        </Button>
      </div>
      <Table ClassPack={ClassPack} />
      {/*查看*/}
      {ClassPack.chakanModalShow && <CKksb ClassPack={ClassPack} />}
      {/*add*/}
      {ClassPack.addModalShow && <Addksb ClassPack={ClassPack} />}
      {/*复制*/}
      {ClassPack.fzModalShow && <Fzksb ClassPack={ClassPack} />}
    </div>
  )
}

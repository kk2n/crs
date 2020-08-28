import React from 'react'
import FilterWidget from './components/FilterWidget'
import API, { assignEnterpriseCode } from './../../utils/axios'
import { model, useModel } from 'ymcore/useModel'
import Table from './components/Table'
import { Button } from 'antd'
import './index.scss'
import Add from './components/Add'
import Edit from './components/Edit'
import FuZhi from './components/FuZhi'
import Info from './components/Info'

model({
  API,
  namespace: 'ContractTemplate',
  type: undefined,
  keywords: undefined,
  addModalShow: false,
  editModalShow: false,
  infoModalShow: false,
  fuZhiModalShow: false,
  seachParams: { pageNum: 1, pageSize: 10 },
  showAddContractModal: false,
  selId: '',
  search(pageNum = 1, pageSize = 10) {
    this.seachParams = {
      pageNum: pageNum,
      pageSize: pageSize,
      type: this.type?.key,
      name: this.keywords,
      update: Math.random()
    }
  },
  clear() {
    this.keywords = undefined
    this.type = undefined
    this.seachParams = { pageNum: 1, pageSize: 10 }
  },
  getInfo: 'get /orderservice/contract/protocoltemplates/detail/get',
  qidongAndTingYong: 'post /orderservice/contract/protocoltemplates/enable',
  del: 'post /orderservice/contract/protocoltemplates/delete'
})
export default () => {
  let m = useModel('ContractTemplate')
  return (
    <div className="contractTemplate">
      <FilterWidget m={m} />
      <div className="OptionsWrap">
        <Button type="primary" onClick={() => m.addModalShowUp(true)}>
          + 新建合同模版
        </Button>
      </div>
      <Table m={m} assignEnterpriseCode={assignEnterpriseCode} />
      {m.addModalShow && <Add m={m} assignEnterpriseCode={assignEnterpriseCode} />}
      {m.editModalShow && <Edit m={m} assignEnterpriseCode={assignEnterpriseCode} />}
      {m.fuZhiModalShow && <FuZhi m={m} assignEnterpriseCode={assignEnterpriseCode} />}
      {m.infoModalShow && <Info m={m} />}
    </div>
  )
}

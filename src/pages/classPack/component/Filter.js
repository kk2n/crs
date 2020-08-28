import { Select } from 'ymcmp'
import API from '../../../utils/axios'
import { Button, Input } from 'antd'
import React from 'react'

export default ({ ClassPack }) => (
  <div>
    类型：
    <Select
      style={{ width: 180 }}
      noMultiple
      API={API}
      url={'/orderservice/coursepack/type/list'}
      placeholder="请选择"
      beforeData={[{ id: null, name: '全部' }]}
      value={ClassPack.status}
      onChange={async val => {
        await ClassPack.statusUp(val)
        ClassPack.searchData()
      }}
    />
    &nbsp; &nbsp;
    <Input
      style={{ width: 220 }}
      placeholder="请输入名称"
      value={ClassPack.keyword}
      onChange={e => ClassPack.keywordUp(e.target.value)}
    />
    &nbsp;&nbsp;
    <Button type="primary" onClick={ClassPack.searchData}>
      搜索
    </Button>
    &nbsp;&nbsp;
    <Button onClick={ClassPack.clear}>清空</Button>
  </div>
)

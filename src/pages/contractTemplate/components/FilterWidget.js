import React from 'react'
import API from '../../../utils/axios'
import { Input, Search, Sel } from 'ymcmp'
export default ({ m }) => {
  let data = {
    type: ['类型：', Sel, { API, url: '/orderservice/contract/protocoltemplates/type/list', noMultiple: true }],
    keywords: ['名称：', Input, { p: '请输入模板名称' }]
  }
  return <Search inline m={m} data={data} />
}

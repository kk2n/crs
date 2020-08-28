import { Button, Input } from 'antd'
import React from 'react'
import './search.scss'
function JdSearch(props) {
  // search = e => {}
  let likeField = ''
  return (
    <div>
      <div className="search-div">
        <div className="search-inp-wrap">
          <Input
            className="search-inp"
            placeholder="请输入Leads姓名/编号/手机号"
            onChange={e => {
              likeField = e.target.value
              // props.likeFieldUp(e.target.value)
            }}
          />
        </div>
        <div className="search-bn-wrap">
          <Button
            type="primary"
            className="search-bn bn-mr"
            onClick={() => {
              // props.getRoleList({ pageNum: 1, pageSize: 10, likeField })
            }}
          >
            查询
          </Button>
        </div>
      </div>
      <div className="space" />
    </div>
  )
}

export default JdSearch

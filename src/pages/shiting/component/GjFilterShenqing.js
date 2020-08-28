import { Button, Input } from 'antd'
import React from 'react'
export default props => {
  return (
    <div>
      <div className="search-div">
        <div className="search-inp-wrap">
          <Input
            className="search-inp"
            value={props.keyword}
            placeholder={'请输入Leads/学员姓名'}
            onChange={e => props.keywordUp(e.target.value)}
          />
        </div>
        <div className="search-bn-wrap">
          <Button type="primary" className="search-bn bn-mr" onClick={props.getList}>
            查询
          </Button>
          <Button className="search-bn" onClick={props.clear}>
            清空
          </Button>
        </div>
      </div>
    </div>
  )
}

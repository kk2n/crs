import { Button, Icon, Input } from 'antd'
import React from 'react'
import './search.scss'
function JdSearch(props) {
  return (
    <div>
      <div className="search-div">
        <div className="search-inp-wrap">
          <Input
            className="search-inp"
            value={props.likeField}
            placeholder="请输入Leads姓名/编号/手机号"
            onChange={e => {
              // searchValueUp(e.target.value)
              // this.setState({
              //   searchValue: e.target.value
              // })
            }}
          />
        </div>
        <div className="search-bn-wrap">
          <Button
            type="primary"
            className="search-bn bn-mr"
            onClick={async () => {
              props.getList()
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

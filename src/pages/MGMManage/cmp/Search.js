import React from 'react'
import { Filter } from 'ymcmp'
import { Button, Input, DatePicker } from 'antd'
import { Select as UrlSel } from 'ymcmp'
import API from '../../../utils/axios'
const { RangePicker } = DatePicker

function Search(props) {
  let filterData = [
    {
      span: 4,
      component: [
        <span key="q1">姓名或手机：</span>,
        <Input
          key="q2"
          placeholder="请输入姓名/手机"
          value={props.MGMManage.filter.fieldLike}
          onChange={e => props.filterUp({ value: e.target.value, key: 'fieldLike' })}
        />
      ]
    },
    {
      span: 7,
      component: [
        <span key="q3">渠道：</span>,
        <UrlSel
          allowClear
          noMultiple
          key="qudao"
          API={API}
          url="/biz/sales/mgm/channel/list"
          value={props.MGMManage.filter.channelId}
          onChange={value => props.filterUp({ value, key: 'channelId' })}
        />
      ]
    },
    {
      span: 6,
      component: [
        <div key="q4">邀请时间：</div>,
        <RangePicker
          key={'preFirstTimeStart'}
          value={props.MGMManage.filter.inviteTime}
          onChange={value => props.filterUp({ value, key: 'inviteTime' })}
        />
      ]
    },
    {
      span: 4,
      component: [
        <span key="q5">赠送状态：</span>,
        <UrlSel
          allowClear
          noMultiple
          key="qudao"
          API={API}
          url="/biz/sales/mgm/bestow/status/list"
          value={props.MGMManage.filter.inviteStatusId}
          onChange={value => props.filterUp({ value, key: 'inviteStatusId' })}
        />
      ]
    },
    {
      span: 3,
      component: [
        <span key="q6">被邀请人状态：</span>,
        <UrlSel
          noMultiple
          allowClear
          key="qudao"
          beforeData={[{ id: null, name: '全部' }]}
          API={API}
          url="/biz/sales/mgm/invited/status/list"
          value={props.MGMManage.filter.invitedStatusId}
          onChange={value => props.filterUp({ value, key: 'invitedStatusId' })}
        />
      ]
    },
    {
      span: 4,
      component: (
        <div key="q7">
          <Button type={'primary'} style={{ marginRight: 10 }} onClick={props.onSearch}>
            查询
          </Button>
          <Button onClick={props.clear}>清空</Button>
        </div>
      )
    }
  ]
  return <Filter gutter={6} span={6} data={filterData} />
}

export default Search

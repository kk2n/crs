import React, { useEffect, useState } from 'react'
import { Row, Col, Radio, TreeSelect, Button } from 'antd'
import { Select, Rangepicker } from 'ymcmp'
import API from '../../../../utils/axios'
import moment from 'moment'

export default ({ m }) => {
  let [zzTree, zzTreeUp] = useState([])
  let init = () => {
    !(async () => {
      let { data, status } = await API.get('/reportservice/org/tree')
      if (!status) return false
      let dgTree = arr =>
        arr?.map(({ name: title, id: key, children = [] }) =>
          children?.length ? { title, value: key, key, children: dgTree(children) } : { title, value: key, key }
        )
      zzTreeUp(dgTree(data))
    })()
  }
  useEffect(init, [])
  return (
    <div>
      <Row>
        <Col span={24}>
          选择日期：
          <Radio.Group
            value={m.dateType}
            onChange={async e => {
              await m.rengongTimeUp(undefined)
              await m.timeUp(undefined)
              m.dateTypeUp(e.target.value)
            }}
          >
            <Radio value={1}>人工月</Radio>
            <Radio value={2}>人工周</Radio>
            <Radio value={3}>自定义</Radio>
          </Radio.Group>
        </Col>
        <Col span={12}>
          {m.dateType === 1 && (
            <div>
              人工月：
              <Select
                value={m.rengongTime}
                onChange={m.rengongTimeUp}
                noMultiple
                API={API}
                url={'/reportservice/list/artificial/month'}
                style={{ width: 340 }}
              />
            </div>
          )}
          {m.dateType === 2 && (
            <div>
              人工周：
              <Select
                noMultiple
                value={m.rengongTime}
                onChange={m.rengongTimeUp}
                API={API}
                url={'/reportservice/list/artificial/week'}
                style={{ width: 340 }}
              />
            </div>
          )}
          {m.dateType === 3 && (
            <div>
              时间范围：
              <Rangepicker
                disabledDate={current => current && current > moment().endOf('day')}
                value={
                  m.time?.length && m.time?.[0] && m.time?.[1] ? [moment(m.time?.[0]), moment(m.time?.[1])] : undefined
                }
                onChange={(v, vv) => m.timeUp(vv)}
              />
              &nbsp;
              <a
                onClick={() => {
                  m.timeUp([
                    moment()
                      .subtract(8, 'd')
                      .format('YYYY-MM-DD'),
                    moment()
                      .subtract(1, 'd')
                      .format('YYYY-MM-DD')
                  ])
                }}
              >
                7天
              </a>
              &nbsp;
              <a
                onClick={() => {
                  m.timeUp([
                    moment()
                      .subtract(15, 'd')
                      .format('YYYY-MM-DD'),
                    moment()
                      .subtract(1, 'd')
                      .format('YYYY-MM-DD')
                  ])
                }}
              >
                14天
              </a>
              &nbsp;
              <a
                onClick={() => {
                  m.timeUp([
                    moment()
                      .subtract(31, 'd')
                      .format('YYYY-MM-DD'),
                    moment()
                      .subtract(1, 'd')
                      .format('YYYY-MM-DD')
                  ])
                }}
              >
                30天
              </a>
            </div>
          )}
        </Col>
        <Col span={12}>
          选择组织：
          <TreeSelect
            maxTagPlaceholder={v => '+更多(' + v.length + '条)'}
            maxTagCount={2}
            value={m.orgId}
            style={{ width: 340 }}
            dropdownStyle={{ maxHeight: 380, overflow: 'auto', maxWidth: 340 }}
            placeholder="请选择"
            treeDefaultExpandAll
            onChange={m.orgIdUp}
            treeData={zzTree}
            multiple
            treeCheckable
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" style={{ marginRight: 10 }} onClick={m.search}>
            查询
          </Button>
          <Button onClick={m.clear}>重置</Button>
        </Col>
      </Row>
    </div>
  )
}

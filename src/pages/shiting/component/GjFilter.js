import { Button, Icon, Input, Row, Col, Select, DatePicker } from 'antd'
import React, { Component } from 'react'
import moment from 'moment'
import { toArr } from 'ymcmp/array'
import { Select as UrlSel } from 'ymcmp'
import API from '../../../utils/axios'
const Option = Select.Option
const { RangePicker } = DatePicker

export default class GjFilter extends Component {
  render() {
    console.log('this.props', this.props)
    return (
      <div>
        <div className="search-div">
          <div className="search-inp-wrap">
            <Input
              className="search-inp"
              value={this.props.gjFilterData.keyword}
              placeholder={this.props.isShiTing ? '请输入试听编号/leads/学员姓名' : '请输入Leads/学员姓名'}
              onChange={e => this.props.gjFilterDataUp({ keyword: e.target.value })}
            />
          </div>
          <div className="search-bn-wrap">
            <Button type="primary" className="search-bn bn-mr" onClick={async () => this.props.getDetailList()}>
              查询
            </Button>
            <Button
              className="search-bn"
              onClick={async () => {
                await this.props.clearFilter()
                this.props.history.push('/crm/shiTing')
                //this.props.getDetailList()
              }}
            >
              清空
            </Button>
          </div>
          {!this.props.isShenQing && (
            <div className="gaoji-search" onClick={() => this.props.gjIsShowUp(!this.props.gjIsShow)}>
              <span>高级筛选</span>
              <Icon type={this.props.gjIsShow ? 'up' : 'down'} />
            </div>
          )}
        </div>
        {this.props.gjIsShow && (
          <div className="filterArea">
            <Row gutter={20}>
              {/* <Col span={4}>
                <span className="label">组织</span>
                <Select
                  placeholder="全部"
                  value={this.props.gjFilterData.orgIds}
                  onChange={val => this.props.gjFilterDataUp({ orgIds: [val] })}
                >
                  {(this.props.organizeList || []).map(item => {
                    return (
                      <Option value={item.userId} key={item.userId}>
                        {item.userRealName}
                      </Option>
                    )
                  })}
                </Select>
              </Col> */}
              {/*<Col span={4}>*/}
              {/*  <span className="label">协作人</span>*/}
              {/*  <Input*/}
              {/*    allowClear*/}
              {/*    value={this.props.gjFilterData.cooperateConsultant}*/}
              {/*    placeholder="请输入协作人姓名"*/}
              {/*    onChange={e => this.props.gjFilterDataUp({ cooperateConsultant: e.target.value })}*/}
              {/*  />*/}
              {/*</Col>*/}
              {this.props.Common.permission['DRW_SHOP_LIST_SHOW'] && (
                <Col span={4}>
                  <span className="label">门店</span>
                  <UrlSel
                    noMultiple
                    placeholder="全部"
                    API={API}
                    url="/biz/sales/contract/getShopList"
                    vt="staffList,shopName"
                    value={this.props.gjFilterData.selMenDian}
                    onChange={v => this.props.selMenDianUp(v)}
                  />
                </Col>
              )}
              <Col span={4}>
                <span className="label">老师</span>
                <Input
                  allowClear
                  placeholder="请输入老师姓名"
                  value={this.props.gjFilterData.teacher}
                  onChange={e => this.props.gjFilterDataUp({ teacher: e.target.value })}
                />
              </Col>
              <Col span={4}>
                <span className="label">试听属性</span>
                <Select
                  mode="multiple"
                  placeholder="全部"
                  optionFilterProp="children"
                  value={this.props.gjFilterData.tryProperty}
                  onChange={val => this.props.gjFilterDataUp({ tryProperty: val })}
                >
                  {this.props.tryPropertyArr.map(item => {
                    return (
                      <Option value={item.value} key={item.value}>
                        {item.name}
                      </Option>
                    )
                  })}
                </Select>
              </Col>
              <Col span={4}>
                <span className="label">科目</span>
                <Select
                  mode="multiple"
                  placeholder="全部"
                  optionFilterProp="children"
                  value={this.props.gjFilterData.subjectIds}
                  onChange={val => this.props.gjFilterDataUp({ subjectIds: val })}
                >
                  {toArr(this.props.subjectList).map(item => {
                    return (
                      <Option value={item.value} key={item.value}>
                        {item.label}
                      </Option>
                    )
                  })}
                </Select>
              </Col>
              <Col span={4}>
                <span className="label">年级</span>
                <Select
                  mode="multiple"
                  placeholder="全部"
                  optionFilterProp="children"
                  value={this.props.gjFilterData.gradeIds}
                  onChange={val => this.props.gjFilterDataUp({ gradeIds: val })}
                >
                  {toArr(this.props.gradeList).map(a => (
                    <Option value={a.value} key={a.value}>
                      {a.label}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={6}>
                <span className="label">预排时间</span>
                <RangePicker
                  className="rangePicker"
                  value={this.props.lessonDate}
                  onChange={dates => {
                    this.props.gjFilterDataUp({
                      lessonBeginDate: dates && dates.length !== 0 ? moment(dates[0]).format('YYYY-MM-DD') : '',
                      lessonEndDate: dates && dates.length !== 0 ? moment(dates[1]).format('YYYY-MM-DD') : ''
                    })
                    this.props.lessonDateUp(dates) //预排日期
                  }}
                />
              </Col>
              <Col span={6}>
                <span className="label">试听创建时间</span>
                <RangePicker
                  className="rangePicker"
                  value={this.props.lessonCreateDate}
                  onChange={dates => {
                    this.props.gjFilterDataUp({
                      lessonCreateBeginDate: dates && dates.length !== 0 ? moment(dates[0]).format('YYYY-MM-DD') : '',
                      lessonCreateEndDate: dates && dates.length !== 0 ? moment(dates[1]).format('YYYY-MM-DD') : ''
                    })
                    this.props.lessonCreateDateUp(dates) //预排日期
                  }}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    )
  }
}

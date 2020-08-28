import React, { Component } from 'react'
import { Select, Spin, message } from 'antd'
import API from '../utils/axios'
import { last } from 'underscore'
import { isEqual } from 'underscore'
import './SearchSel.scss'
import PropTypes from 'prop-types'
// import Sel from './Sel'

const Option = Select.Option
class SearchSel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: this.props.url,
      param: this.props.param,
      data: [],
      fetching: false,
      value: undefined
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(prevState.param, nextProps.param)) {
      return {
        param: nextProps.param,
        data: []
      }
    } else if (nextProps.url !== prevState.url) {
      return {
        url: nextProps.url,
        param: nextProps.param,
        data: []
      }
    }
    return null
  }

  //打开下拉框数据
  selOpen = async open => {
    //排除关闭事件
    if (!open) {
      return false
    }
    //排除已有数据时
    if ((this.state.data || []).length) {
      return false
    }
    this.setState({
      fetching: true
    })
    let { data, status, msg } = await API.get(this.state.url, this.state.param || {}, { load: false })
    if (!status) {
      message.error(msg)
      return false
    }
    this.setState({
      data,
      fetching: false
    })
  }
  //没有多选，也就是下拉框单选
  noMultiple = () => {
    return this.props.noMultiple
      ? {
          className: `${this.props.className} SearchSel-noMultiple`,
          ref: sel => (this.sel = sel),
          onChange: async val => {
            if (!val) {
              await this.setState({
                value: undefined
              })
              this.props.onChange(val, this.state.data)
              this.sel.blur()
            } else {
              await this.setState({
                value: last(val)
              })
              this.props.onChange(last(val), this.state.data)
              this.sel.blur()
            }
          }
        }
      : {
          onChange: async val => {
            if (!val) {
              await this.setState({
                value: undefined
              })
              this.props.onChange(val, this.state.data)
            } else {
              //let temp = new Set(val)
              //val = Array.from(temp)
              this.props.onChange(val, this.state.data)
            }
          }
        }
  }

  render() {
    let data = this.state.data || []
    if (this.props.hasAll) {
      data = [this.props.hasAll, ...data]
    }
    return (
      <Select
        optionFilterProp={'children'}
        labelInValue
        mode="multiple"
        style={this.props.style}
        onDropdownVisibleChange={this.selOpen}
        notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
        value={this.props.value || this.state.value}
        {...this.props}
        {...this.noMultiple()}
      >
        {data.map((d, dd) => {
          let vt = (this.props.vt || 'id,name').split(',')
          return (
            <Option key={d[vt[0]] + dd} value={d[vt[0]]}>
              {d[vt[1]]}
            </Option>
          )
        })}
      </Select>
    )
  }
}
SearchSel.propTypes = {
  url: PropTypes.string,
  param: PropTypes.any,
  noMultiple: PropTypes.bool,
  vt: PropTypes.string
}
export default SearchSel

/*
多选
例子：
<SearchSel
  placeholder="全部"
  className="search-gaoji-sel"
  url="/biz/sales/list/staff/cc"
  vt={'ccid,ccname'}
  value={props.CCId}
  onChange={val => props.CCIdUp(val)}
/>


单选

<SearchSel
  noMultiple
  placeholder="请选择"
  className="search-gaoji-sel"
  url="/biz/sales/list/org/staff"
  param={{ orgIds: props.fenPeiSelZuzhiId }}
  vt={'staffId,staffRealName'}
/>

//注意：使用此组件是onChange会返回两个数据，单选时onChange={(val,data)=>{}},val:是对象eg:{key:*,label:*},data:是接口请求到的数据，也就是下拉框的option

 */

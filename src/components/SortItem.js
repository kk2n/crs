import React from 'react'
import { Icon } from 'antd'

import './SortItem.scss'

export const sortAsc = 'ASC'
export const sortDesc = 'DESC'

export default ({ sort, label, changeHandler }) => {
  return (
    <span
      className="sort-item"
      onClick={() => {
        // 下面这一句达到2个效果：1.props未设置默认排序时 默认为倒序 2.排序反转
        const sortWill = sort === sortDesc ? sortAsc : sortDesc
        changeHandler(sortWill)
      }}
    >
      {label}
      <Icon type="caret-up" className={'sort-up' + (sort === sortAsc ? ' sort-highlight' : '')} />
      <Icon type="caret-down" className={'sort-down' + (sort === sortDesc ? ' sort-highlight' : '')} />
    </span>
  )
}

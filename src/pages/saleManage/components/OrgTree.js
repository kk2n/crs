import { Tree, Icon } from 'antd'
import React, { Component } from 'react'
const { TreeNode } = Tree

class OrgTree extends Component {
  //递归数据整理
  digui = data => {
    return (data || []).map(a => {
      return a.children
        ? {
            title: a.label,
            key: a.value,
            children: this.digui(a.children)
          }
        : {
            title: a.label,
            key: a.value
          }
    })
  }
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }
  render() {
    const loop = data =>
      (data || {}).map(item => {
        const index = (item.title || '').indexOf(this.state.searchValue)
        const beforeStr = (item.title || '').substr(0, index)
        const afterStr = (item.title || '').substr(index + this.state.searchValue.length)
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{this.state.searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          )
        if (item.children) {
          return (
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          )
        }
        return <TreeNode key={item.key} title={title} />
      })
    return (
      <Tree
        switcherIcon={<Icon type="down" />}
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onSelect={async v => {
          let val = v[0]
          //如果是移动用户
          if (this.props.isYd) {
            await this.props.selYDOrgIdUp(val)
            return false
          }
          if (val) {
            await this.props.selOrgIdUp(val)
            this.props.getList()
          }
        }}
      >
        {loop(this.digui(this.props.data))}
      </Tree>
    )
  }
}

export default OrgTree

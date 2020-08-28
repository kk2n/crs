import React, { Component } from 'react'
import { Table, Row, Col, Tree, Input, Modal, Checkbox } from 'antd'
import { connect } from './organizationModel'
import './organization.scss'
const { TreeNode } = Tree
const { Search } = Input
const CheckboxGroup = Checkbox.Group
const getParentKey = (key, tree) => {
  let parentKey = []
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}
@connect
export default class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //所属角色选中项
      roleCheckedList: [],
      //所属角色
      userRole: [],
      //功能权限选中项
      checkedList: [],
      //数据权限选中项
      listRoleChecked: [],
      //字段权限选中项
      listFieldChecked: [],
      indeterminate: true,
      //数据权限全选
      listRoleCheck: false,
      //功能权限全选
      checkAll: false,
      //数据权限全选
      listRoleCheckAll: false,
      //字段权限全选
      listFieldCheckAll: false,
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      dataList: [],
      gData: [],
      leadsName: '',
      listRole: [],
      listFunc: [],
      listField: [],
      listRoleSimpledataauth: [{ label: 'Apple', value: 'Apple', id: 1 }],
      sysMenuView: [],
      //功能权限数据
      listFuncAll: [],
      //数据权限数据Î
      listRoleAll: [],
      //字段权限数据
      listFieldAll: [],
      //所属角色所以选项
      userRoleAll: [],
      //树结构数组
      listDepNode: []
    }
  }
  componentDidMount() {
    //树结构
    this.props.orgTree()
    //数结构处理
    const x = 3
    const y = 2
    const z = 1
    const generateData = (_level, _preKey, _tns) => {
      const preKey = _preKey || '0'
      const tns = _tns || this.state.gData
      const children = []
      for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`
        tns.push({ title: key, key })
        if (i < y) {
          children.push(key)
        }
      }
      if (_level < 0) {
        return tns
      }
      const level = _level - 1
      children.forEach((key, index) => {
        tns[index].children = []
        return generateData(level, key, tns[index].children)
      })
    }
    generateData(z)
    const generateList = data => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const { key } = node
        this.state.dataList.push({ key, title: key })
        if (node.children) {
          generateList(node.children)
        }
      }
    }
    generateList(this.state.gData)
  }
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }
  //搜索
  organizationOnChange = e => {
    const { value } = e.target
    const expandedKeys = this.state.listDepNode
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, this.state.listDepNode)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    console.log(4, this.state.listDepNode, expandedKeys, value)
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true
    })
  }
  //权限调整
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} dataRef={item} />
    })
  render() {
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ]
    const columns = [
      {
        title: '姓名',
        dataIndex: 'empName',
        key: 'empName'
      },
      {
        title: '工号',
        dataIndex: 'empCode',
        key: 'empCode'
      },
      {
        title: '权限',
        dataIndex: 'roleName',
        key: 'roleName'
      },
      {
        title: '操作',
        key: 'action',
        render: (v, record) => (
          <span>
            <a
              onClick={async () => {
                //用户角色
                await this.props.userRoleAuthView({ userId: v.sysId })
                //树结构
                await this.props.sysMenuView()
                this.setState({
                  jurisdictionShow: true,
                  leadsName: v.roleName,
                  roleId: v.sysId
                })
                //用户角色接口数据处理
                if (this.props.Organization.userRoleAuthViewRes.data) {
                  let temp = []
                  this.state.userRoleAll = this.props.Organization.userRoleAuthViewRes.data.listUserRole
                  this.props.Organization.userRoleAuthViewRes.data.listUserRole.map(item => {
                    temp.push(item.roleName.toString())
                    this.setState({
                      userRole: temp
                    })
                  })
                }
              }}
            >
              权限调整
            </a>
          </span>
        )
      }
    ]
    const { searchValue, expandedKeys, autoExpandParent } = this.state
    const loop = loopData =>
      loopData.map(item => {
        const index = item.title.indexOf(searchValue)
        const beforeStr = item.title.substr(0, index)
        const afterStr = item.title.substr(index + searchValue.length)
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
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
    //处理树数据
    this.state.sysMenuView = []
    if (this.props.Organization.sysMenuViewRes.data) {
      if (this.props.Organization.sysMenuViewRes.data[0].listMenuNode) {
        this.props.Organization.sysMenuViewRes.data[0].listMenuNode.map(item => {
          let temp = JSON.parse(
            JSON.stringify(item)
              .replace(/name/g, 'title')
              .replace(/sysId/g, 'key')
          )
          this.state.sysMenuView.push(temp)
        })
      }
    }
    //权限的数据处理
    let menu = this.props.Organization.menuFuncViewRes.data
    if (menu) {
      //功能权限
      this.state.listFunc = []
      this.state.listRole = []
      this.state.listField = []
      this.state.listFuncAll = menu.listFunc
      //功能权限
      menu.listFunc.map(item => {
        item.funcName && this.state.listFunc.push(item.funcName)
      })
      //数据权限
      this.state.listRoleAll = menu.listRoleSimpledataauth
      menu.listRoleSimpledataauth.map(item => {
        item.orgTypeName && this.state.listRole.push(item.orgTypeName)
        item.personTypeName && this.state.listRole.push(item.personTypeName)
        item.allTypeName && this.state.listRole.push(item.allTypeName)
      })
      //字段权限
      this.state.listFieldAll = menu.listField
      menu.listField.map(item => {
        item.fieldName && this.state.listField.push(item.fieldName)
      })
    }
    //页面树结构
    this.state.listDepNode = []
    if (this.props.Organization.orgTreeRes.data) {
      if (this.props.Organization.orgTreeRes.data[0].listDepNode) {
        this.props.Organization.orgTreeRes.data[0].listDepNode.map(item => {
          let temp = JSON.parse(
            JSON.stringify(item)
              .replace(/name/g, 'title')
              .replace(/sysId/g, 'key')
          )
          this.state.listDepNode.push(temp)
        })
      }
    }
    //控制角色权限的弹窗
    if (this.props.Organization.saveUserAuthRes.status) {
      this.state.jurisdictionShow = false
      this.props.Organization.saveUserAuthRes.status = false
    }
    console.log(1, this.props)
    return (
      <div className="myleadsPage">
        <Row>
          <Col span={10}>
            <div>
              <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.organizationOnChange} />
              <Tree
                onExpand={this.onExpand}
                onSelect={async key => {
                  await this.props.getUserByDep({ depId: key[0] })
                }}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
              >
                {loop(this.state.listDepNode || [])}
              </Tree>
            </div>
          </Col>
          <Col span={12}>
            <Table columns={columns} dataSource={this.props.Organization.getUserByDepRes.data} />
          </Col>
        </Row>
        <Modal
          title={`${this.state.leadsName}权限`}
          visible={this.state.jurisdictionShow}
          onOk={() => {
            //所属角色
            let listUserRole = this.state.roleCheckedList.map(item => {
              return this.state.userRoleAll.find(i => i.roleName === item)
            })
            listUserRole.map(item => {
              if (item) {
                delete item.roleName
              }
            })
            //找到选中的选项
            let listUserFunc = this.state.checkedList.map(item => {
              return this.state.listFuncAll.find(i => i.funcName === item)
            })
            //对一些参数的处理
            listUserFunc.map(item => {
              if (item) {
                delete item.funcName
                delete item.sysId
              }
            })
            let listUserSimpledataauth = this.state.listRoleChecked.map(item => {
              return this.state.listRoleAll.find(i => i.funcName === item.funcName)
            })
            listUserSimpledataauth.map(item => {
              if (item) {
                item['userId'] = this.state.userId
                delete item.allTypeName
                delete item.orgTypeName
                delete item.allTypeName
                delete item.userId
                delete item.sysId
                delete item.personTypeName
              }
            })
            let listUserField = this.state.listFieldChecked.map(item => {
              return this.state.listFieldAll.find(i => i.fieldName === item)
            })
            listUserField.map(item => {
              if (item) {
                delete item.fieldName
                delete item.sysId
              }
            })
            let param = {
              userId: this.state.roleId,
              menuId: this.state.menuId,
              listUserRole,
              listUserFunc,
              listUserSimpledataauth,
              listUserField
            }
            this.props.saveUserAuth(param)
          }}
          onCancel={() => {
            this.setState({
              jurisdictionShow: false
            })
          }}
        >
          <div className="line">所属角色</div>
          <Checkbox.Group
            className="line"
            options={this.state.userRole}
            value={this.state.roleCheckedList}
            onChange={v => {
              this.setState({
                roleCheckedList: v
              })
            }}
          />
          <Row>
            <Col span={10}>
              <div>自定义权限</div>
              <Tree
                onSelect={selectedKeys => {
                  //权限接口
                  this.props.menuFuncView({
                    menuId: selectedKeys[0],
                    // roleId: this.state.roleId
                    roleId: 337541146796545
                  })
                }}
              >
                {this.renderTreeNodes(this.state.sysMenuView)}
              </Tree>
            </Col>
            <Col span={12}>
              <div className="line">
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  功能权限
                  <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={e => {
                      this.setState({
                        checkedList: e.target.checked ? this.state.listFunc : [],
                        indeterminate: false,
                        checkAll: e.target.checked
                      })
                    }}
                    checked={this.state.checkAll}
                  >
                    全选
                  </Checkbox>
                </div>
                <br />
                <CheckboxGroup
                  options={this.state.listFunc}
                  value={this.state.checkedList}
                  onChange={v => {
                    this.setState({
                      checkedList: v,
                      indeterminate: !!v.length && v.length < this.state.listFunc.length,
                      checkAll: v.length === this.state.listFunc.length
                    })
                  }}
                />
              </div>
              <div className="line">
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  数据权限
                  <Checkbox
                    indeterminate={this.state.listRoleCheck}
                    onChange={e => {
                      this.setState({
                        listRoleChecked: e.target.checked ? this.state.listRole : [],
                        listRoleCheck: false,
                        listRoleCheckAll: e.target.checked
                      })
                    }}
                    checked={this.state.listRoleCheckAll}
                  >
                    全选
                  </Checkbox>
                </div>
                <br />
                <CheckboxGroup
                  options={this.state.listRole}
                  value={this.state.listRoleChecked}
                  onChange={v => {
                    this.setState({
                      listRoleChecked: v,
                      indeterminate: !!v.length && v.length < this.state.listRole.length,
                      listRoleCheckAll: v.length === this.state.listRole.length
                    })
                  }}
                />
              </div>
              <div className="line">
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  字段权限
                  <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={e => {
                      this.setState({
                        listFieldChecked: e.target.checked ? this.state.listField : [],
                        indeterminate: false,
                        listFieldCheckAll: e.target.checked
                      })
                    }}
                    checked={this.state.listFieldCheckAll}
                  >
                    全选
                  </Checkbox>
                </div>
                <br />
                <CheckboxGroup
                  options={this.state.listField}
                  value={this.state.listFieldChecked}
                  onChange={v => {
                    this.setState({
                      listFieldChecked: v,
                      indeterminate: !!v.length && v.length < this.state.listField.length,
                      listFieldCheckAll: v.length === this.state.listField.length
                    })
                  }}
                />
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Table, Button, Modal, Input, Select, Checkbox, Divider, Row, Col, Tree } from 'antd'
import { connect } from './roleModel'
import Add from './components/Add'
import './role.scss'

const { Option } = Select
const { confirm } = Modal
const { TreeNode } = Tree
const CheckboxGroup = Checkbox.Group

@connect
export default class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRole: [
        {
          key: '1',
          name: 'John Brown',
          userName: 32,
          companyName: '1',
          depName: 1
        }
      ],
      addShow: false,
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
      leadsName: '',
      ableShow: false,
      likeField: '',
      //功能权限选项
      listFunc: [],
      //数据权限选项Î
      listRole: [],
      //字段权限选项
      listField: [],
      sysMenuView: [],
      //功能权限数据
      listFuncAll: [],
      //数据权限数据Î
      listRoleAll: [],
      //字段权限数据
      listFieldAll: []
    }
  }
  async componentDidMount() {
    await this.props.getRoleList({
      pageNum: 1,
      pageSize: 10,
      likeField: this.state.likeField
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
    console.log(3, this.props, this.props.Home.roleStatusRes.status)
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName'
      },
      {
        title: '角色编号',
        dataIndex: 'roleCode',
        key: 'roleCode'
      },
      {
        title: '角色简称',
        dataIndex: 'simpleName',
        key: 'simpleName'
      },
      {
        title: '启用账号数',
        dataIndex: 'users',
        key: 'users',
        render: (v, d) => (
          <span
            onClick={() => {
              this.props.userByRole({ pageNum: 1, pageSize: 10, roleId: d.sysId })
              this.setState({
                useShow: true
              })
            }}
          >
            {v}
          </span>
        )
      },
      {
        title: '操作',
        key: 'action',
        render: (v, record) => (
          <span>
            <a
              onClick={() => {
                this.props.sysMenuView()
                this.setState({
                  roleShow: true,
                  leadsName: v.roleName,
                  roleId: v.sysId
                })
              }}
            >
              配置权限
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                confirm({
                  title: `您确定要启用/禁用${v.roleName}（角色名称）角色吗?`,
                  content: '',
                  onOk: async () => {
                    await this.props.roleStatus({ sysId: v.sysId, status: this.state.ableShow })
                    if (this.props.Home.roleStatusRes.status) {
                      await this.props.getRoleList({
                        pageNum: 1,
                        pageSize: 10,
                        likeField: this.state.likeField
                      })
                    }
                  },
                  onCancel() {
                    console.log('Cancel')
                  }
                })
              }}
            >
              {v.status ? '启用' : '禁用'}
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                this.props.queryAllPage()
                this.setState({
                  copyShow: true,
                  leadsName: v.roleName,
                  roleId: v.sysId
                })
              }}
            >
              复制
            </a>
          </span>
        )
      }
    ]
    const useColumns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: v => <a href="javascript:;">{v}</a>
      },
      {
        title: '账号',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '公司',
        dataIndex: 'companyName',
        key: 'companyName'
      },
      {
        title: '部门',
        dataIndex: 'depName',
        key: 'depName'
      }
    ]
    //处理树数据
    this.state.sysMenuView = []
    if (this.props.Home.sysMenuViewRes.data) {
      if (this.props.Home.sysMenuViewRes.data[0].listMenuNode) {
        this.props.Home.sysMenuViewRes.data[0].listMenuNode.map(item => {
          let temp = JSON.parse(
            JSON.stringify(item)
              .replace(/name/g, 'title')
              .replace(/sysId/g, 'key')
          )
          this.state.sysMenuView.push(temp)
        })
      }
    }
    let menu = this.props.Home.menuFuncViewRes.data
    if (menu) {
      //功能权限
      this.state.listFunc = []
      this.state.listRole = []
      this.state.listField = []
      this.state.listFuncAll = menu.listFunc
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
    //控制复制的弹窗
    if (this.props.Home.copyRoleAuthRes.status) {
      this.state.copyShow = false
    }
    //控制角色权限的弹窗
    if (this.props.Home.saveRoleAuthRes.status) {
      this.state.roleShow = false
      this.props.Home.saveRoleAuthRes.status = false
    }
    console.log(1, this.state.sysMenuView)
    return (
      <div className="myleadsPage">
        <div>
          <div className="search-div">
            <div className="search-inp-wrap">
              <Input
                className="search-inp"
                placeholder="请输入Leads姓名/编号/手机号"
                onChange={e => {
                  this.state.likeField = e.target.value
                }}
              />
            </div>
            <div className="search-bn-wrap">
              <Button
                type="primary"
                className="search-bn bn-mr"
                onClick={() => {
                  this.props.getRoleList({ pageNum: 1, pageSize: 10, likeField: this.state.likeField })
                }}
              >
                查询
              </Button>
            </div>
          </div>
          <div className="space" />
        </div>
        <Button
          type="primary"
          className="addBtn"
          ghost
          onClick={async () => {
            this.setState({
              addShow: true
            })
          }}
        >
          添加
        </Button>
        <Table
          columns={columns}
          dataSource={this.props.Home.getRoleListRes.data && this.props.Home.getRoleListRes.data.list}
        />
        {this.state.addShow ? (
          <Add
            addShow={this.state.addShow}
            addShowUp
            update={this.props.update}
            onCancel={() => {
              this.setState({
                addShow: false
              })
            }}
          />
        ) : null}
        <Modal
          title="启用账号数"
          footer={null}
          visible={this.state.useShow}
          onOk={() => {}}
          onCancel={() => {
            this.setState({
              useShow: false
            })
          }}
        >
          <Table columns={useColumns} dataSource={this.props.Home.userByRoleRes.data} />
        </Modal>
        <Modal
          title="复制角色权限"
          visible={this.state.copyShow}
          onOk={() => {
            this.props.copyRoleAuth({ oldRoleId: this.state.roleId, newRoleId: this.state.newRoleId })
          }}
          onCancel={() => {
            this.setState({
              copyShow: false
            })
          }}
        >
          {`将${this.state.leadsName}的权限复制到`}
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="角色名称"
            optionFilterProp="children"
            onChange={v => {
              this.setState({
                newRoleId: v
              })
            }}
          >
            {this.props.Home.queryAllPageRes.data
              ? this.props.Home.queryAllPageRes.data.map(item => {
                  return (
                    <Option key={item.sysId} value={item.sysId}>
                      {item.roleName}
                    </Option>
                  )
                })
              : null}
          </Select>
        </Modal>
        <Modal
          title={`${this.state.leadsName}角色权限`}
          visible={this.state.roleShow}
          onOk={() => {
            //找到选中的选项
            let listFunc = this.state.checkedList.map(item => {
              return this.state.listFuncAll.find(i => i.funcName === item)
            })
            //对一些参数的处理
            listFunc.map(item => {
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
                item['roleId'] = item.userId
                delete item.allTypeName
                delete item.orgTypeName
                delete item.allTypeName
                delete item.userId
                delete item.sysId
                delete item.personTypeName
              }
            })
            let listField = this.state.listFieldChecked.map(item => {
              console.log(9, this.state.listFieldChecked, this.state.listFieldAll)
              return this.state.listFieldAll.find(i => i.fieldName === item)
            })
            listField.map(item => {
              if (item) {
                delete item.fieldName
                delete item.sysId
              }
            })
            let param = {
              roleId: this.state.roleId,
              menuId: this.state.menuId,
              listFunc,
              listUserSimpledataauth,
              listField
            }
            this.props.saveRoleAuth(param)
          }}
          onCancel={() => {
            this.setState({
              roleShow: false
            })
          }}
        >
          <Row>
            <Col span={10}>
              <Tree
                onSelect={v => {
                  this.props.menuFuncView({ menuId: v[0], roleId: this.state.roleId })
                  this.state.menuId = +v[0]
                }}
              >
                {this.renderTreeNodes(this.state.sysMenuView || [])}
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
                        // checkedList: e.target.checked ? plainOptions : [],
                        // indeterminate: false,
                        // checkAll: e.target.checked
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
                    console.log(9, v)
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
                    console.log(10, v)
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
